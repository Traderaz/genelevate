import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// TEMPORARY: Manual subscription update for testing
// DELETE THIS FILE IN PRODUCTION!

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Update user to all-access subscription
    await adminDb.collection('users').doc(userId).update({
      'subscription.plan': 'all-access',
      'subscription.status': 'active',
      'subscription.expiresAt': Timestamp.fromDate(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      ),
      updatedAt: Timestamp.now(),
    });

    console.log(`✅ Manually updated subscription for user: ${userId}`);

    return NextResponse.json({ 
      success: true,
      message: 'Subscription updated to all-access',
      userId 
    });

  } catch (error: any) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

