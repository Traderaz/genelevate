import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover' as any,
});

// Initialize Firebase Admin
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        project_id: process.env.FIREBASE_PROJECT_ID || 'dummy-project-id',
        client_email: process.env.FIREBASE_CLIENT_EMAIL || 'dummy@example.com',
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || 'dummy-key',
      } as any),
    });
  } catch (error) {
    console.warn('Firebase Admin initialization failed during build:', error);
    // This is expected during build time when env vars aren't available
  }
}

const db = getFirestore();

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      // Subscription events
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      // One-time payment events (for add-ons)
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Handle checkout completion (both subscriptions and one-time payments)
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id);

  const userId = session.client_reference_id || session.metadata?.userId;
  if (!userId) {
    console.error('No userId found in checkout session');
    return;
  }

  // Handle subscription checkout
  if (session.mode === 'subscription') {
    const subscriptionId = session.subscription as string;
    const customerId = session.customer as string;
    const plan = session.metadata?.plan || 'premium';

    await db.collection('users').doc(userId).update({
      'subscription.plan': plan,
      'subscription.status': 'active',
      'subscription.stripeCustomerId': customerId,
      'subscription.stripeSubscriptionId': subscriptionId,
      'subscription.expiresAt': Timestamp.fromDate(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      ),
      'subscription.pendingPlanChange': null, // Clear any pending changes
      updatedAt: Timestamp.now(),
    });

    console.log(`Subscription activated for user ${userId}: ${plan}`);
  }

  // Handle one-time payment (add-ons)
  if (session.mode === 'payment') {
    const addOnId = session.metadata?.addOnId;
    
    if (addOnId) {
      await db.collection('purchases').add({
        userId,
        addOnId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency,
        status: 'completed',
        paymentStatus: 'paid',
        purchasedAt: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      console.log(`Add-on purchase completed for user ${userId}: ${addOnId}`);
    }
  }
}

// Handle subscription creation
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id);

  const userId = subscription.metadata?.userId;
  if (!userId) {
    console.error('No userId found in subscription');
    return;
  }

  const plan = subscription.metadata?.plan || 'premium';

  await db.collection('users').doc(userId).update({
    'subscription.plan': plan,
    'subscription.status': 'active',
    'subscription.stripeSubscriptionId': subscription.id,
    'subscription.stripeCustomerId': subscription.customer as string,
    'subscription.expiresAt': Timestamp.fromDate(
      new Date((subscription as any).current_period_end * 1000)
    ),
    updatedAt: Timestamp.now(),
  });
}

// Handle subscription updates
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);

  const userId = subscription.metadata?.userId;
  if (!userId) {
    // Try to find user by subscription ID
    const usersSnapshot = await db.collection('users')
      .where('subscription.stripeSubscriptionId', '==', subscription.id)
      .limit(1)
      .get();

    if (usersSnapshot.empty) {
      console.error('No user found for subscription:', subscription.id);
      return;
    }

    const userDoc = usersSnapshot.docs[0];
    await userDoc.ref.update({
      'subscription.status': subscription.status === 'active' ? 'active' : 'inactive',
      'subscription.expiresAt': Timestamp.fromDate(
        new Date((subscription as any).current_period_end * 1000)
      ),
      updatedAt: Timestamp.now(),
    });
  } else {
    await db.collection('users').doc(userId).update({
      'subscription.status': subscription.status === 'active' ? 'active' : 'inactive',
      'subscription.expiresAt': Timestamp.fromDate(
        new Date((subscription as any).current_period_end * 1000)
      ),
      updatedAt: Timestamp.now(),
    });
  }
}

// Handle subscription deletion/cancellation
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);

  const usersSnapshot = await db.collection('users')
    .where('subscription.stripeSubscriptionId', '==', subscription.id)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    console.error('No user found for subscription:', subscription.id);
    return;
  }

  const userDoc = usersSnapshot.docs[0];
  await userDoc.ref.update({
    'subscription.plan': 'free',
    'subscription.status': 'inactive',
    'subscription.expiresAt': null,
    'subscription.pendingPlanChange': null,
    updatedAt: Timestamp.now(),
  });
}

// Handle successful invoice payment
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id);

  const subscriptionId = (invoice as any).subscription as string;
  if (!subscriptionId) return;

  const usersSnapshot = await db.collection('users')
    .where('subscription.stripeSubscriptionId', '==', subscriptionId)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    console.error('No user found for subscription:', subscriptionId);
    return;
  }

  const userDoc = usersSnapshot.docs[0];
  await userDoc.ref.update({
    'subscription.status': 'active',
    'subscription.expiresAt': Timestamp.fromDate(
      new Date(invoice.period_end * 1000)
    ),
    updatedAt: Timestamp.now(),
  });
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id);

  const subscriptionId = (invoice as any).subscription as string;
  if (!subscriptionId) return;

  const usersSnapshot = await db.collection('users')
    .where('subscription.stripeSubscriptionId', '==', subscriptionId)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    console.error('No user found for subscription:', subscriptionId);
    return;
  }

  const userDoc = usersSnapshot.docs[0];
  await userDoc.ref.update({
    'subscription.status': 'inactive',
    updatedAt: Timestamp.now(),
  });

  // TODO: Send payment failure notification to user
}

// Handle one-time payment success (add-ons)
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);

  await db.collection('purchases')
    .where('stripePaymentIntentId', '==', paymentIntent.id)
    .limit(1)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.update({
          paymentStatus: 'paid',
          status: 'completed',
          updatedAt: Timestamp.now(),
        });
      });
    });
}

// Handle one-time payment failure (add-ons)
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id);

  await db.collection('purchases')
    .where('stripePaymentIntentId', '==', paymentIntent.id)
    .limit(1)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.update({
          paymentStatus: 'failed',
          status: 'failed',
          error: paymentIntent.last_payment_error?.message,
          updatedAt: Timestamp.now(),
        });
      });
    });
}

// Handle refunds
async function handleRefund(charge: Stripe.Charge) {
  console.log('Refund processed:', charge.id);

  const refundAmount = charge.amount_refunded / 100;
  
  await db.collection('purchases')
    .where('stripeSessionId', '==', charge.id)
    .limit(1)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.update({
          status: 'refunded',
          paymentStatus: 'refunded',
          refundedAmount: refundAmount,
          refundedAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      });
    });
}
