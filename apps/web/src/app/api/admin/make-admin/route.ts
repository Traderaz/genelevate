import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  try {
    // Check if all required environment variables are present
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      console.warn('Firebase Admin SDK: Missing required environment variables. API routes may not work in production.');
      // Initialize with minimal config for build-time compatibility
      initializeApp({
        projectId: projectId || 'gen-elevate-default',
      });
    } else {
      initializeApp({
        credential: cert({
          project_id: projectId,
          client_email: clientEmail,
          private_key: privateKey,
        } as any),
        projectId: projectId,
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Firebase Admin is properly configured
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      return NextResponse.json(
        { 
          error: 'Firebase Admin SDK not properly configured', 
          details: 'Missing required environment variables' 
        },
        { status: 500 }
      );
    }

    const { userEmail, userId } = await request.json();

    if (!userEmail && !userId) {
      return NextResponse.json(
        { error: 'User email or ID is required' },
        { status: 400 }
      );
    }

    const auth = getAuth();
    const db = getFirestore();

    // Get user by email or ID
    let user;
    if (userId) {
      user = await auth.getUser(userId);
    } else {
      user = await auth.getUserByEmail(userEmail);
    }

    // Set custom claims to make user admin
    await auth.setCustomUserClaims(user.uid, {
      role: 'admin',
      isAdmin: true,
      canManageUsers: true,
      canApproveContent: true,
      canAccessAdminPanel: true
    });

    // Update user document in Firestore
    const userDocRef = db.collection('users').doc(user.uid);
    const userDoc = await userDocRef.get();

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
      adminNotes: 'Account upgraded to admin via API'
    };

    if (userDoc.exists) {
      await userDocRef.update(adminData);
    } else {
      const fullAdminProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Admin User',
        firstName: user.displayName?.split(' ')[0] || 'Admin',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || 'User',
        photoURL: user.photoURL || null,
        yearGroup: null,
        subjects: [],
        institutionId: null,
        badges: [],
        createdAt: new Date(),
        emailVerified: user.emailVerified,
        ...adminData
      };
      await userDocRef.set(fullAdminProfile);
    }

    return NextResponse.json({
      success: true,
      message: `User ${user.email} has been made admin successfully`,
      user: {
        uid: user.uid,
        email: user.email,
        customClaims: await auth.getUser(user.uid).then(u => u.customClaims)
      }
    });

  } catch (error) {
    console.error('Error making user admin:', error);
    return NextResponse.json(
      { 
        error: 'Failed to make user admin', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Admin API endpoint. Use POST to make a user admin.',
    usage: {
      method: 'POST',
      body: {
        userEmail: 'user@example.com',
        // OR
        userId: 'firebase-user-id'
      }
    }
  });
}
