import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Handle Refund Request
 * Callable function for admins to process refunds
 * 
 * In production:
 * 1. Verify admin permissions
 * 2. Create refund in Stripe
 * 3. Update purchase status
 * 4. Revoke service access
 */
export const handleRefund = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  // Verify admin role
  const userRole = context.auth.token.role;
  if (userRole !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can process refunds'
    );
  }

  const { purchaseId, reason, amount } = data;

  // Validate input
  if (!purchaseId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Purchase ID is required'
    );
  }

  try {
    // Fetch purchase details
    const purchaseDoc = await db.collection('purchases').doc(purchaseId).get();
    
    if (!purchaseDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Purchase not found'
      );
    }

    const purchase = purchaseDoc.data();

    // Check if already refunded
    if (purchase?.status === 'refunded') {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Purchase has already been refunded'
      );
    }

    // Check if payment was successful
    if (purchase?.paymentStatus !== 'paid') {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Cannot refund unpaid purchase'
      );
    }

    // In production, create refund in Stripe
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // 
    // const refund = await stripe.refunds.create({
    //   payment_intent: purchase.stripePaymentIntentId,
    //   amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
    //   reason: reason || 'requested_by_customer',
    //   metadata: {
    //     purchaseId,
    //     userId: purchase.userId,
    //     addOnId: purchase.addOnId,
    //   },
    // });

    // Mock refund for development
    const refundAmount = amount || purchase.amount;
    console.log(`Processing refund of £${refundAmount} for purchase ${purchaseId}`);

    // Update purchase status
    await purchaseDoc.ref.update({
      status: 'refunded',
      paymentStatus: 'refunded',
      refundedAmount: refundAmount,
      refundReason: reason || 'Admin initiated refund',
      refundedAt: admin.firestore.FieldValue.serverTimestamp(),
      refundedBy: context.auth.uid,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Revoke service access
    await db.collection('users').doc(purchase.userId).update({
      purchasedAddOns: admin.firestore.FieldValue.arrayRemove(purchase.addOnId),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Log refund activity
    await db.collection('activityLogs').add({
      type: 'refund_processed',
      userId: purchase.userId,
      adminId: context.auth.uid,
      purchaseId,
      addOnId: purchase.addOnId,
      amount: refundAmount,
      reason: reason || 'Admin initiated refund',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Send refund confirmation email (in production)
    // await sendRefundConfirmationEmail(purchase.userId, purchaseId, refundAmount);

    console.log(`Successfully processed refund for purchase ${purchaseId}`);

    return {
      success: true,
      purchaseId,
      refundedAmount: refundAmount,
      message: 'Refund processed successfully',
    };

  } catch (error: any) {
    console.error('Error processing refund:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError(
      'internal',
      'Failed to process refund',
      error.message
    );
  }
});
