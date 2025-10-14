import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { registerCredentialsSchema, loginCredentialsSchema } from '@gen-elevate/shared/schemas';
import { UserRole } from '@gen-elevate/shared/types';

const auth = getAuth();
const db = getFirestore();

/**
 * Create a new user account
 */
export const createUser = onCall(async (request) => {
  try {
    const { email, password, firstName, lastName, yearGroup, schoolId, parentEmail } = 
      registerCredentialsSchema.parse(request.data);

    // Create Firebase Auth user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      emailVerified: false,
    });

    // Set custom claims
    const role: UserRole = schoolId ? 'student' : 'student';
    await auth.setCustomUserClaims(userRecord.uid, {
      role,
      schoolId: schoolId || null,
    });

    // Create user document in Firestore
    const userData = {
      id: userRecord.uid,
      email,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      yearGroup: yearGroup || null,
      subjects: [],
      schoolId: schoolId || null,
      role,
      subscriptionTier: 'free',
      isActive: true,
      emailVerified: false,
      parentEmail: parentEmail || null,
      preferences: {
        notifications: {
          email: true,
          push: true,
          webinar: true,
          course: true,
          debate: true,
        },
        privacy: {
          profileVisible: true,
          progressVisible: true,
          leaderboardVisible: true,
        },
        learning: {
          preferredStudyTime: 'afternoon',
          difficultyLevel: 'beginner',
          learningStyle: 'visual',
        },
      },
      totalPoints: 0,
      level: 1,
      badges: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    return {
      success: true,
      uid: userRecord.uid,
      message: 'User created successfully',
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new HttpsError('internal', 'Failed to create user');
  }
});

/**
 * Verify user email
 */
export const verifyEmail = onCall(async (request) => {
  try {
    const { uid } = request.auth || {};
    if (!uid) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    // Update Firebase Auth user
    await auth.updateUser(uid, {
      emailVerified: true,
    });

    // Update Firestore document
    await db.collection('users').doc(uid).update({
      emailVerified: true,
      updatedAt: new Date(),
    });

    return { success: true, message: 'Email verified successfully' };
  } catch (error) {
    console.error('Error verifying email:', error);
    throw new HttpsError('internal', 'Failed to verify email');
  }
});

/**
 * Update user role (admin only)
 */
export const updateUserRole = onCall(async (request) => {
  try {
    const { uid: adminUid } = request.auth || {};
    if (!adminUid) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    // Check if user is admin
    const adminUser = await auth.getUser(adminUid);
    const adminRole = adminUser.customClaims?.role;
    if (adminRole !== 'admin' && adminRole !== 'super-admin') {
      throw new HttpsError('permission-denied', 'Insufficient permissions');
    }

    const { userId, role } = request.data;
    if (!userId || !role) {
      throw new HttpsError('invalid-argument', 'Missing required fields');
    }

    // Update custom claims
    await auth.setCustomUserClaims(userId, { role });

    // Update Firestore document
    await db.collection('users').doc(userId).update({
      role,
      updatedAt: new Date(),
    });

    return { success: true, message: 'User role updated successfully' };
  } catch (error) {
    console.error('Error updating user role:', error);
    throw new HttpsError('internal', 'Failed to update user role');
  }
});

/**
 * Handle new user creation (trigger)
 */
export const onUserCreate = onDocumentCreated('users/{userId}', async (event) => {
  const userData = event.data?.data();
  if (!userData) return;

  try {
    // Send welcome email
    // TODO: Implement email service
    console.log(`Welcome email should be sent to ${userData.email}`);

    // If user has a school, add them to school's student list
    if (userData.schoolId) {
      await db.collection('schools').doc(userData.schoolId).update({
        currentStudents: db.FieldValue.increment(1),
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Error in onUserCreate trigger:', error);
  }
});

export const authFunctions = {
  createUser,
  verifyEmail,
  updateUserRole,
  onUserCreate,
};
