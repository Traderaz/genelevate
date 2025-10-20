import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { addonId, title, description, price, type } = await request.json();

    // Validate required fields
    if (!addonId || !title || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine mode based on type (subscription vs one-time)
    const mode = type === 'subscription' ? 'subscription' : 'payment';

    // Get the base URL (fallback to localhost if not set)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Create a Stripe Checkout Session with dynamic pricing
    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: title,
              description: description || '',
            },
            unit_amount: Math.round(price * 100), // Convert to pence
            ...(mode === 'subscription' && {
              recurring: {
                interval: 'month',
              },
            }),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/addons/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/addons`,
      metadata: {
        addonId,
        type,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}
