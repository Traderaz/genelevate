import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';

const auth = getAuth();
const db = getFirestore();

/**
 * Set custom claims for a user
 */
export const setCustomClaims = onCall(async (request) => {
  const { uid, claims } = request.data;
  
  // Verify the caller has admin permissions
  if (!request.auth?.token?.role || request.auth.token.role !== 'admin') {
    throw new HttpsError('permission-denied', 'Only admins can set custom claims');
  }

  try {
    await auth.setCustomUserClaims(uid, claims);
    
    // Log the action
    await db.collection('auditLogs').add({
      action: 'custom_claims_updated',
      targetUserId: uid,
      performedBy: request.auth.uid,
      claims,
      timestamp: new Date().toISOString(),
      ipAddress: request.rawRequest.ip,
    });

    logger.info(`Custom claims set for user ${uid}`, { claims });
    return { success: true };
  } catch (error) {
    logger.error('Error setting custom claims', { uid, claims, error });
    throw new HttpsError('internal', 'Failed to set custom claims');
  }
});

/**
 * Automatically set custom claims when user document is created
 */
export const onUserCreated = onDocumentCreated('users/{userId}', async (event) => {
  const userData = event.data?.data();
  const userId = event.params.userId;

  if (!userData) return;

  const customClaims = {
    role: userData.role,
    institutionId: userData.institutionId || null,
    permissions: getPermissionsForRole(userData.role),
    isVerified: userData.emailVerified || false,
    cohortIds: userData.cohortIds || [],
    parentIds: userData.parentIds || [],
    studentIds: userData.studentIds || [],
  };

  try {
    await auth.setCustomUserClaims(userId, customClaims);
    logger.info(`Custom claims set for new user ${userId}`, { customClaims });
  } catch (error) {
    logger.error('Error setting custom claims for new user', { userId, error });
  }
});

/**
 * Update custom claims when user document is updated
 */
export const onUserUpdated = onDocumentUpdated('users/{userId}', async (event) => {
  const beforeData = event.data?.before.data();
  const afterData = event.data?.after.data();
  const userId = event.params.userId;

  if (!beforeData || !afterData) return;

  // Check if role-related fields changed
  const roleChanged = beforeData.role !== afterData.role;
  const institutionChanged = beforeData.institutionId !== afterData.institutionId;
  const cohortsChanged = JSON.stringify(beforeData.cohortIds) !== JSON.stringify(afterData.cohortIds);

  if (roleChanged || institutionChanged || cohortsChanged) {
    const customClaims = {
      role: afterData.role,
      institutionId: afterData.institutionId || null,
      permissions: getPermissionsForRole(afterData.role),
      isVerified: afterData.emailVerified || false,
      cohortIds: afterData.cohortIds || [],
      parentIds: afterData.parentIds || [],
      studentIds: afterData.studentIds || [],
    };

    try {
      await auth.setCustomUserClaims(userId, customClaims);
      logger.info(`Custom claims updated for user ${userId}`, { customClaims });
    } catch (error) {
      logger.error('Error updating custom claims', { userId, error });
    }
  }
});

/**
 * Get permissions based on user role
 */
function getPermissionsForRole(role: string): string[] {
  const permissions: Record<string, string[]> = {
    admin: [
      'users:read',
      'users:write',
      'institutions:read',
      'institutions:write',
      'courses:read',
      'courses:write',
      'webinars:read',
      'webinars:write',
      'analytics:read',
      'system:admin'
    ],
    institution: [
      'users:read:own_institution',
      'users:write:own_institution',
      'courses:read:own_institution',
      'courses:write:own_institution',
      'webinars:read:own_institution',
      'webinars:write:own_institution',
      'analytics:read:own_institution',
      'referrals:create',
      'cohorts:manage'
    ],
    student: [
      'profile:read:own',
      'profile:write:own',
      'courses:read:enrolled',
      'courses:write:progress',
      'webinars:read:enrolled',
      'webinars:write:attendance',
      'progress:read:own',
      'progress:write:own'
    ],
    parent: [
      'profile:read:own',
      'profile:write:own',
      'students:read:linked',
      'progress:read:linked_students',
      'courses:read:linked_students',
      'webinars:read:linked_students'
    ]
  };

  return permissions[role] || [];
}

/**
 * Verify user has required permission
 */
export const verifyPermission = onCall(async (request) => {
  const { permission } = request.data;
  
  if (!request.auth?.token) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  const userPermissions = request.auth.token.permissions || [];
  const hasPermission = userPermissions.includes(permission);

  return { hasPermission };
});

/**
 * Get user's current custom claims
 */
export const getCurrentClaims = onCall(async (request) => {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const userRecord = await auth.getUser(request.auth.uid);
    return { customClaims: userRecord.customClaims || {} };
  } catch (error) {
    logger.error('Error getting user claims', { uid: request.auth.uid, error });
    throw new HttpsError('internal', 'Failed to get user claims');
  }
});
