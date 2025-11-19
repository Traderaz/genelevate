import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover' as any,
});

export async function GET(request: NextRequest) {
  try {
    // Get Firebase ID token from Authorization header or query parameter
    const authHeader = request.headers.get('authorization');
    const idToken = authHeader?.split('Bearer ')[1] || request.nextUrl.searchParams.get('token');
    
    console.log('🔍 Checkout Session Debug:', {
      hasAuthHeader: !!authHeader,
      hasIdToken: !!idToken,
    });
    
    if (!idToken) {
      console.log('❌ No auth token found - redirecting to login');
      return NextResponse.redirect(
        new URL('/login?redirect=/pricing', request.url)
      );
    }

    // Verify the Firebase ID token
    const decodedClaims = await adminAuth.verifyIdToken(idToken);
    const userId = decodedClaims.uid;
    console.log('✅ Token verified for user:', userId);

    // Get user email from Firestore
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (!userData) {
      return NextResponse.redirect(
        new URL('/login?redirect=/pricing', request.url)
      );
    }

    const userEmail = userData.email || decodedClaims.email;

    console.log('✅ User authenticated:', { userId, email: userEmail, plan: userData.subscription?.plan });

    // Check if user already has an active subscription
    if (userData.subscription?.plan === 'all-access' && userData.subscription?.status === 'active') {
      console.log('🔄 User has active subscription - redirecting to portal');
      // Redirect to customer portal to manage existing subscription
      if (userData.subscription.stripeCustomerId) {
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: userData.subscription.stripeCustomerId,
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/dashboard`,
        });
        return NextResponse.redirect(portalSession.url);
      }
    }

    console.log('💳 Creating new Stripe checkout session...');

    // Create Stripe checkout session for new subscription
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'All-Access Membership',
              description: 'Everything you need to excel in your studies (11+, GCSE, A-Level)',
            },
            unit_amount: 2999, // £29.99 in pence
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/dashboard?subscription=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/pricing?cancelled=true`,
      customer_email: userEmail,
      client_reference_id: userId,
      metadata: {
        userId: userId,
        plan: 'all-access',
      },
      subscription_data: {
        metadata: {
          userId: userId,
          plan: 'all-access',
        },
      },
      allow_promotion_codes: true,
    });

    console.log('✅ Stripe checkout session created:', session.id);
    console.log('🔗 Redirecting to:', session.url);

    return NextResponse.redirect(session.url!);

  } catch (error: any) {
    console.error('❌ Stripe checkout error:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
    });
    return NextResponse.redirect(
      new URL('/pricing?error=checkout_failed', request.url)
    );
  }
}

