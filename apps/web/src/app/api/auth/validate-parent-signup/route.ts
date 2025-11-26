import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

interface ValidationResponse {
  valid: boolean;
  childExists: boolean;
  childId?: string;
  childName?: string;
  hasActiveSubscription: boolean;
  parentCount: number;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { childEmail, parentEmail } = await request.json();

    if (!childEmail) {
      return NextResponse.json({
        valid: false,
        childExists: false,
        hasActiveSubscription: false,
        parentCount: 0,
        error: 'Child email is required'
      } as ValidationResponse);
    }

    // Check if parent email is same as child email (only if parentEmail is provided)
    if (parentEmail && childEmail.toLowerCase() === parentEmail.toLowerCase()) {
      return NextResponse.json({
        valid: false,
        childExists: false,
        hasActiveSubscription: false,
        parentCount: 0,
        error: 'Parent email cannot be the same as child email'
      } as ValidationResponse);
    }

    // 1. Check if child account exists
    const usersRef = collection(db, 'users');
    const childQuery = query(usersRef, where('email', '==', childEmail.toLowerCase()));
    const childSnapshot = await getDocs(childQuery);

    if (childSnapshot.empty) {
      return NextResponse.json({
        valid: false,
        childExists: false,
        hasActiveSubscription: false,
        parentCount: 0,
        error: 'No account found with that email address'
      } as ValidationResponse);
    }

    const childDoc = childSnapshot.docs[0];
    const childData = childDoc.data();
    const childId = childDoc.id;

    // 2. Check if child has active subscription
    const hasActiveSubscription = childData.subscription && 
      childData.subscription.status === 'active' && 
      childData.subscription.plan !== 'free' &&
      (!childData.subscription.expiresAt || new Date(childData.subscription.expiresAt.toDate()) > new Date());

    if (!hasActiveSubscription) {
      return NextResponse.json({
        valid: false,
        childExists: true,
        childId,
        childName: childData.displayName || childData.name,
        hasActiveSubscription: false,
        parentCount: 0,
        error: 'Child must have an active paid subscription'
      } as ValidationResponse);
    }

    // 3. Count existing parent accounts linked to this child
    const parentQuery = query(usersRef, where('linkedChildEmail', '==', childEmail.toLowerCase()));
    const parentSnapshot = await getDocs(parentQuery);
    const parentCount = parentSnapshot.size;

    if (parentCount >= 2) {
      return NextResponse.json({
        valid: false,
        childExists: true,
        childId,
        childName: childData.displayName || childData.name,
        hasActiveSubscription: true,
        parentCount,
        error: 'Maximum of 2 parent accounts per child has been reached'
      } as ValidationResponse);
    }

    // 4. Check if this parent email is already linked to this child
    const existingParentQuery = query(usersRef, where('email', '==', parentEmail.toLowerCase()));
    const existingParentSnapshot = await getDocs(existingParentQuery);
    
    if (!existingParentSnapshot.empty) {
      const existingParentData = existingParentSnapshot.docs[0].data();
      if (existingParentData.linkedChildEmail === childEmail.toLowerCase()) {
        return NextResponse.json({
          valid: false,
          childExists: true,
          childId,
          childName: childData.displayName || childData.name,
          hasActiveSubscription: true,
          parentCount,
          error: 'This parent account is already linked to this child'
        } as ValidationResponse);
      }
    }

    // All validations passed
    return NextResponse.json({
      valid: true,
      childExists: true,
      childId,
      childName: childData.displayName || childData.name,
      hasActiveSubscription: true,
      parentCount
    } as ValidationResponse);

  } catch (error) {
    console.error('Error validating parent signup:', error);
    return NextResponse.json({
      valid: false,
      childExists: false,
      hasActiveSubscription: false,
      parentCount: 0,
      error: 'An error occurred while validating the signup'
    } as ValidationResponse, { status: 500 });
  }
}