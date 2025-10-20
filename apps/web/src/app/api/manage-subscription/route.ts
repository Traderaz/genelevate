import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover' as any,
});

export async function POST(request: NextRequest) {
  try {
    const { userId, currentPlan, newPlan, action } = await request.json();

    if (!userId || !newPlan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Plan pricing
    const planPrices: Record<string, { monthlyPrice: number; name: string }> = {
      student: { monthlyPrice: 9.99, name: 'Student Plan' },
      premium: { monthlyPrice: 19.99, name: 'Premium Plan' },
      institution: { monthlyPrice: 49.99, name: 'Institution Plan' }
    };

    // Handle institution plans separately
    if (newPlan === 'institution') {
      return NextResponse.json({
        success: false,
        requiresContact: true,
        message: 'Please contact our sales team for institutional pricing.',
      });
    }

    // Determine if this is an upgrade or downgrade
    const planOrder = ['student', 'premium', 'institution'];
    const currentIndex = planOrder.indexOf(currentPlan || 'student');
    const newIndex = planOrder.indexOf(newPlan);
    const isUpgrade = newIndex > currentIndex;
    const isDowngrade = newIndex < currentIndex;

    // Handle cancellation
    if (action === 'cancel') {
      return NextResponse.json({
        success: true,
        action: 'cancel',
        effectiveDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        message: 'Your subscription will be cancelled at the end of your billing period.',
      });
    }

    // Handle reactivation
    if (action === 'reactivate') {
      return NextResponse.json({
        success: true,
        action: 'reactivate',
        immediate: true,
        message: 'Your subscription has been reactivated.',
      });
    }

    // Create Stripe Checkout Session for upgrades or new subscriptions
    if (isUpgrade || !currentPlan || currentPlan === 'free') {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      
      // Create or get Stripe price for the plan
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: planPrices[newPlan].name,
                description: `Gen Elevate ${planPrices[newPlan].name}`,
              },
              unit_amount: Math.round(planPrices[newPlan].monthlyPrice * 100),
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/dashboard/profile?subscription=success`,
        cancel_url: `${baseUrl}/dashboard/profile?subscription=cancelled`,
        client_reference_id: userId,
        metadata: {
          userId,
          plan: newPlan,
          action: isUpgrade ? 'upgrade' : 'new',
        },
      });

      return NextResponse.json({
        success: true,
        action: isUpgrade ? 'upgrade' : 'new',
        immediate: true,
        checkoutUrl: session.url,
        message: isUpgrade ? 'Upgrade will be applied immediately.' : 'Starting new subscription.',
      });
    }

    // Handle downgrades (30-day delay)
    if (isDowngrade) {
      return NextResponse.json({
        success: true,
        action: 'downgrade',
        immediate: false,
        effectiveDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        newPlan,
        message: `Your plan will be downgraded to ${planPrices[newPlan].name} in 30 days. You will continue to have access to your current features until then.`,
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid subscription change request',
    }, { status: 400 });

  } catch (error: any) {
    console.error('Error managing subscription:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to manage subscription' },
      { status: 500 }
    );
  }
}

