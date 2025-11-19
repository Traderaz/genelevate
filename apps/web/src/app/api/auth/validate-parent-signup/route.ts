import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { childEmail } = await request.json();

    if (!childEmail) {
      return NextResponse.json(
        { error: 'Child email is required' },
        { status: 400 }
      );
    }

    // Find child account by email
    const usersRef = adminDb.collection('users');
    const childQuery = await usersRef
      .where('email', '==', childEmail)
      .limit(1)
      .get();

    if (childQuery.empty) {
      return NextResponse.json({
        childExists: false,
        hasActiveSubscription: false,
        parentCount: 0,
      });
    }

    const childDoc = childQuery.docs[0];
    const childData = childDoc.data();

    // Check if child has active paid subscription
    const subscription = childData.subscription || {};
    const hasActiveSubscription = 
      subscription.status === 'active' &&
      subscription.plan !== 'free' &&
      (!subscription.expiresAt || new Date(subscription.expiresAt.toDate()) > new Date());

    // Count existing parent accounts linked to this child
    const parentQuery = await usersRef
      .where('role', '==', 'parent')
      .where('linkedChildEmail', '==', childEmail)
      .get();

    const parentCount = parentQuery.size;

    return NextResponse.json({
      childExists: true,
      childId: childDoc.id,
      hasActiveSubscription,
      parentCount,
      childName: childData.displayName || 'Student',
    });

  } catch (error) {
    console.error('Error validating parent signup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

