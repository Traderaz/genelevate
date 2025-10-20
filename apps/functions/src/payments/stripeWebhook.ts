import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Stripe Webhook Handler
 * Processes Stripe events for payment processing
 * 
 * In production:
 * 1. Install Stripe SDK: npm install stripe
 * 2. Verify webhook signatures
 * 3. Process events based on type
 */
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    // In production, verify Stripe signature
    // const sig = req.headers['stripe-signature'];
    // const event = stripe.webhooks.constructEvent(
    //   req.rawBody,
    //   sig,
    //   process.env.STRIPE_WEBHOOK_SECRET
    // );

    // Mock event for development
    const event = req.body;

    console.log(`Received Stripe event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handleSubscriptionPayment(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error}`);
  }
});

/**
 * Handle successful checkout session
 */
async function handleCheckoutCompleted(session: any) {
  console.log('Processing checkout.session.completed:', session.id);

  try {
    const { metadata } = session;
    const { addOnId, userId, institutionId } = metadata || {};

    if (!addOnId || !userId) {
      console.error('Missing required metadata in checkout session');
      return;
    }

    // Fetch add-on details
    const addOnDoc = await db.collection('addons').doc(addOnId).get();
    if (!addOnDoc.exists) {
      console.error(`Add-on ${addOnId} not found`);
      return;
    }

    const addOn = addOnDoc.data();

    // Create purchase record
    const purchaseData = {
      userId,
      institutionId: institutionId || null,
      addOnId,
      addOnTitle: addOn?.title || 'Unknown Service',
      addOnType: addOn?.type || 'unknown',
      
      // Stripe details
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
      stripeCustomerId: session.customer,
      
      // Payment details
      amount: session.amount_total / 100, // Convert from cents
      currency: session.currency.toUpperCase(),
      paymentStatus: 'paid',
      
      // Status
      status: 'completed',
      
      // Timestamps
      purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const purchaseRef = await db.collection('purchases').add(purchaseData);
    console.log(`Created purchase record: ${purchaseRef.id}`);

    // Update user's purchased add-ons
    await db.collection('users').doc(userId).update({
      purchasedAddOns: admin.firestore.FieldValue.arrayUnion(addOnId),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Send confirmation email (in production)
    // await sendPurchaseConfirmationEmail(userId, purchaseRef.id);

    console.log(`Successfully processed purchase for user ${userId}`);
  } catch (error) {
    console.error('Error handling checkout completion:', error);
    throw error;
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentSucceeded(paymentIntent: any) {
  console.log('Processing payment_intent.succeeded:', paymentIntent.id);

  try {
    // Update purchase status
    const purchasesSnapshot = await db
      .collection('purchases')
      .where('stripePaymentIntentId', '==', paymentIntent.id)
      .get();

    if (purchasesSnapshot.empty) {
      console.log('No purchase found for payment intent:', paymentIntent.id);
      return;
    }

    const batch = db.batch();
    purchasesSnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        paymentStatus: 'paid',
        status: 'completed',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();
    console.log(`Updated ${purchasesSnapshot.size} purchase(s) to paid status`);
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

/**
 * Handle failed payment intent
 */
async function handlePaymentFailed(paymentIntent: any) {
  console.log('Processing payment_intent.payment_failed:', paymentIntent.id);

  try {
    const purchasesSnapshot = await db
      .collection('purchases')
      .where('stripePaymentIntentId', '==', paymentIntent.id)
      .get();

    if (purchasesSnapshot.empty) {
      console.log('No purchase found for payment intent:', paymentIntent.id);
      return;
    }

    const batch = db.batch();
    purchasesSnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        paymentStatus: 'failed',
        status: 'failed',
        error: paymentIntent.last_payment_error?.message || 'Payment failed',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();
    console.log(`Updated ${purchasesSnapshot.size} purchase(s) to failed status`);

    // Send failure notification (in production)
    // await sendPaymentFailureEmail(userId, purchaseId);
  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
}

/**
 * Handle refund
 */
async function handleRefund(charge: any) {
  console.log('Processing charge.refunded:', charge.id);

  try {
    const refundAmount = charge.amount_refunded / 100;

    // Find purchase by payment intent
    const purchasesSnapshot = await db
      .collection('purchases')
      .where('stripePaymentIntentId', '==', charge.payment_intent)
      .get();

    if (purchasesSnapshot.empty) {
      console.log('No purchase found for charge:', charge.id);
      return;
    }

    const batch = db.batch();
    
    for (const doc of purchasesSnapshot.docs) {
      const purchase = doc.data();

      // Update purchase status
      batch.update(doc.ref, {
        status: 'refunded',
        paymentStatus: 'refunded',
        refundedAmount: refundAmount,
        refundedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Remove from user's purchased add-ons
      const userRef = db.collection('users').doc(purchase.userId);
      batch.update(userRef, {
        purchasedAddOns: admin.firestore.FieldValue.arrayRemove(purchase.addOnId),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Revoked access to ${purchase.addOnId} for user ${purchase.userId}`);
    }

    await batch.commit();
    console.log(`Processed refund for ${purchasesSnapshot.size} purchase(s)`);

    // Send refund confirmation (in production)
    // await sendRefundConfirmationEmail(userId, purchaseId);
  } catch (error) {
    console.error('Error handling refund:', error);
    throw error;
  }
}

/**
 * Handle subscription payment (for monthly mentorship)
 */
async function handleSubscriptionPayment(invoice: any) {
  console.log('Processing invoice.payment_succeeded:', invoice.id);

  try {
    const { subscription, customer, metadata } = invoice;
    const { userId, addOnId } = metadata || {};

    if (!userId || !addOnId) {
      console.log('Missing metadata in invoice');
      return;
    }

    // Create purchase record for subscription payment
    const purchaseData = {
      userId,
      addOnId,
      stripeInvoiceId: invoice.id,
      stripeSubscriptionId: subscription,
      stripeCustomerId: customer,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency.toUpperCase(),
      paymentStatus: 'paid',
      status: 'completed',
      type: 'subscription',
      billingPeriod: {
        start: new Date(invoice.period_start * 1000),
        end: new Date(invoice.period_end * 1000),
      },
      purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('purchases').add(purchaseData);
    console.log(`Created subscription payment record for user ${userId}`);
  } catch (error) {
    console.error('Error handling subscription payment:', error);
    throw error;
  }
}
