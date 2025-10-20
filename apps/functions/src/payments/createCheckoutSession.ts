import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Create Stripe Checkout Session
 * Callable function to initiate payment flow
 * 
 * In production:
 * 1. Install Stripe SDK: npm install stripe
 * 2. Initialize Stripe with secret key
 * 3. Create checkout session with line items
 */
export const createCheckoutSession = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to create checkout session'
    );
  }

  const userId = context.auth.uid;
  const { addOnId, successUrl, cancelUrl } = data;

  // Validate input
  if (!addOnId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Add-on ID is required'
    );
  }

  try {
    // Fetch add-on details
    const addOnDoc = await db.collection('addons').doc(addOnId).get();
    
    if (!addOnDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Add-on not found'
      );
    }

    const addOn = addOnDoc.data();

    if (!addOn?.isActive) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Add-on is not available for purchase'
      );
    }

    // Fetch user details
    const userDoc = await db.collection('users').doc(userId).get();
    const user = userDoc.data();

    // In production, create Stripe checkout session
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // 
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price: addOn.stripePriceId,
    //       quantity: 1,
    //     },
    //   ],
    //   success_url: successUrl || `${process.env.APP_URL}/addons/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: cancelUrl || `${process.env.APP_URL}/addons`,
    //   customer_email: user?.email,
    //   metadata: {
    //     addOnId,
    //     userId,
    //     institutionId: user?.institutionId || null,
    //   },
    //   allow_promotion_codes: true,
    // });
    //
    // return {
    //   sessionId: session.id,
    //   url: session.url,
    // };

    // Mock response for development
    console.log(`Creating checkout session for user ${userId}, add-on ${addOnId}`);
    
    return {
      sessionId: `mock_session_${Date.now()}`,
      url: `/addons/success?session_id=mock_session_${Date.now()}`,
      message: 'Mock checkout session created. In production, this will redirect to Stripe.',
    };

  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError(
      'internal',
      'Failed to create checkout session',
      error.message
    );
  }
});
