import { NextRequest, NextResponse } from 'next/server';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// TEMPORARY API endpoint to make a user admin
// Remove this after testing!
export async function POST(request: NextRequest) {
  try {
    const { email, secret } = await request.json();
    
    // Simple security check - replace with your own secret
    if (secret !== 'make-me-admin-2024') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
    console.log('🔍 Looking for user with email:', email);
    
    // Note: In a real app, you'd need to query by email
    // For now, this assumes you know the user ID
    // You can find your user ID in Firebase console or by logging in and checking localStorage
    
    return NextResponse.json({ 
      message: 'Manual method required',
      instructions: [
        '1. Go to Firebase Console',
        '2. Open Firestore Database',
        '3. Find users collection',
        `4. Find document with email: ${email}`,
        '5. Update role to "admin"',
        '6. Add subscription: { plan: "premium", status: "active" }',
        '7. Set totalPoints: 10000, level: 10'
      ]
    });
    
  } catch (error) {
    console.error('Error making user admin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Alternative: Direct user ID method
export async function PUT(request: NextRequest) {
  try {
    const { userId, secret } = await request.json();
    
    if (secret !== 'make-me-admin-2024') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    const adminData = {
      role: 'admin',
      subscription: {
        plan: 'premium',
        status: 'active',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      },
      isActive: true,
      totalPoints: 10000,
      level: 10,
      updatedAt: new Date(),
      isAdmin: true,
      canApproveContent: true,
      canManageUsers: true,
      adminNotes: 'Account upgraded to admin for testing'
    };
    
    if (userDoc.exists()) {
      await updateDoc(userDocRef, adminData);
      console.log('✅ Updated existing profile to admin');
      
      return NextResponse.json({ 
        success: true,
        message: 'User updated to admin successfully',
        userData: { ...userDoc.data(), ...adminData }
      });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
  } catch (error) {
    console.error('Error making user admin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
