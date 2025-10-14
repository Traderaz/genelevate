import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { logger } from 'firebase-functions';

const db = getFirestore();
const auth = getAuth();

/**
 * GDPR Data Export - User can request all their data
 */
export const exportUserData = onCall(async (request) => {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  const userId = request.auth.uid;

  try {
    // Log the data export request
    await db.collection('auditLogs').add({
      action: 'data_export',
      userId,
      timestamp: new Date().toISOString(),
      ipAddress: request.rawRequest.ip,
      userAgent: request.rawRequest.headers['user-agent'],
      success: false // Will be updated to true if successful
    });

    const userData: any = {};

    // Collect user profile data
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      userData.profile = userDoc.data();
    }

    // Collect progress data
    const progressSnapshot = await db.collection('progress')
      .where('userId', '==', userId)
      .get();
    userData.progress = progressSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Collect attendance data
    const attendanceSnapshot = await db.collection('attendance')
      .where('userId', '==', userId)
      .get();
    userData.attendance = attendanceSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Collect purchase data
    const purchasesSnapshot = await db.collection('purchases')
      .where('userId', '==', userId)
      .get();
    userData.purchases = purchasesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Collect audit logs
    const auditSnapshot = await db.collection('auditLogs')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(100) // Last 100 actions
      .get();
    userData.auditLogs = auditSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Create GDPR request record
    const gdprRequestRef = await db.collection('gdprRequests').add({
      userId,
      type: 'data_export',
      status: 'completed',
      requestedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      dataSize: JSON.stringify(userData).length,
      ipAddress: request.rawRequest.ip
    });

    // Update audit log to success
    const auditLogs = await db.collection('auditLogs')
      .where('userId', '==', userId)
      .where('action', '==', 'data_export')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();

    if (!auditLogs.empty) {
      await auditLogs.docs[0].ref.update({ success: true });
    }

    logger.info(`Data export completed for user ${userId}`, { 
      requestId: gdprRequestRef.id,
      dataSize: JSON.stringify(userData).length 
    });

    return {
      requestId: gdprRequestRef.id,
      data: userData,
      exportedAt: new Date().toISOString()
    };

  } catch (error) {
    logger.error('Error exporting user data', { userId, error });
    throw new HttpsError('internal', 'Failed to export user data');
  }
});

/**
 * GDPR Data Deletion - User can request deletion of their data
 */
export const deleteUserData = onCall(async (request) => {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { confirmDeletion } = request.data;
  const userId = request.auth.uid;

  if (!confirmDeletion) {
    throw new HttpsError('invalid-argument', 'User must confirm deletion');
  }

  try {
    // Log the deletion request
    await db.collection('auditLogs').add({
      action: 'data_deletion',
      userId,
      timestamp: new Date().toISOString(),
      ipAddress: request.rawRequest.ip,
      userAgent: request.rawRequest.headers['user-agent'],
      success: false
    });

    // Create GDPR request record before deletion
    const gdprRequestRef = await db.collection('gdprRequests').add({
      userId,
      type: 'data_deletion',
      status: 'processing',
      requestedAt: new Date().toISOString(),
      ipAddress: request.rawRequest.ip
    });

    // Collections to delete user data from
    const collectionsToClean = [
      'users',
      'progress',
      'attendance',
      'purchases',
      'webinar_chats',
      'webinar_questions'
    ];

    const batch = db.batch();
    let deletedDocuments = 0;

    // Delete user data from each collection
    for (const collectionName of collectionsToClean) {
      const snapshot = await db.collection(collectionName)
        .where('userId', '==', userId)
        .get();

      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
        deletedDocuments++;
      });
    }

    // Delete the user profile (but keep audit trail)
    const userRef = db.collection('users').doc(userId);
    batch.update(userRef, {
      email: '[DELETED]',
      displayName: '[DELETED]',
      photoURL: null,
      personalData: FieldValue.delete(),
      gdprDeleted: true,
      deletedAt: new Date().toISOString()
    });

    // Commit the batch deletion
    await batch.commit();

    // Delete Firebase Auth user
    await auth.deleteUser(userId);

    // Update GDPR request status
    await gdprRequestRef.update({
      status: 'completed',
      completedAt: new Date().toISOString(),
      deletedDocuments
    });

    // Update audit log to success
    const auditLogs = await db.collection('auditLogs')
      .where('userId', '==', userId)
      .where('action', '==', 'data_deletion')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();

    if (!auditLogs.empty) {
      await auditLogs.docs[0].ref.update({ success: true });
    }

    logger.info(`User data deleted`, { 
      userId, 
      requestId: gdprRequestRef.id,
      deletedDocuments 
    });

    return {
      requestId: gdprRequestRef.id,
      deletedDocuments,
      deletedAt: new Date().toISOString()
    };

  } catch (error) {
    logger.error('Error deleting user data', { userId, error });
    throw new HttpsError('internal', 'Failed to delete user data');
  }
});

/**
 * Update user consent preferences
 */
export const updateConsent = onCall(async (request) => {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { gdprConsent, marketingConsent, analyticsConsent } = request.data;
  const userId = request.auth.uid;

  try {
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (typeof gdprConsent === 'boolean') {
      updateData.gdprConsent = gdprConsent;
      updateData.gdprConsentDate = new Date().toISOString();
    }

    if (typeof marketingConsent === 'boolean') {
      updateData.marketingConsent = marketingConsent;
      updateData.marketingConsentDate = new Date().toISOString();
    }

    if (typeof analyticsConsent === 'boolean') {
      updateData.analyticsConsent = analyticsConsent;
      updateData.analyticsConsentDate = new Date().toISOString();
    }

    await db.collection('users').doc(userId).update(updateData);

    // Log consent update
    await db.collection('auditLogs').add({
      action: 'consent_update',
      userId,
      timestamp: new Date().toISOString(),
      details: { gdprConsent, marketingConsent, analyticsConsent },
      ipAddress: request.rawRequest.ip,
      success: true
    });

    logger.info(`Consent updated for user ${userId}`, updateData);

    return { success: true, updatedAt: updateData.updatedAt };

  } catch (error) {
    logger.error('Error updating consent', { userId, error });
    throw new HttpsError('internal', 'Failed to update consent');
  }
});

/**
 * Scheduled function to clean up old data (GDPR retention compliance)
 */
export const cleanupOldData = onSchedule('0 2 * * 0', async () => { // Weekly on Sunday at 2 AM
  logger.info('Starting GDPR data retention cleanup');

  const sevenYearsAgo = new Date();
  sevenYearsAgo.setFullYear(sevenYearsAgo.getFullYear() - 7);

  try {
    // Collections with retention policies
    const collectionsToClean = [
      { name: 'auditLogs', field: 'timestamp' },
      { name: 'securityLogs', field: 'timestamp' },
      { name: 'referralUsage', field: 'usedAt' },
      { name: 'gdprRequests', field: 'requestedAt' }
    ];

    let totalDeleted = 0;

    for (const collection of collectionsToClean) {
      const snapshot = await db.collection(collection.name)
        .where(collection.field, '<', sevenYearsAgo.toISOString())
        .limit(500) // Process in batches
        .get();

      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      if (!snapshot.empty) {
        await batch.commit();
        totalDeleted += snapshot.size;
        logger.info(`Deleted ${snapshot.size} old records from ${collection.name}`);
      }
    }

    // Clean up deleted user profiles (keep for audit but remove PII)
    const deletedUsersSnapshot = await db.collection('users')
      .where('gdprDeleted', '==', true)
      .where('deletedAt', '<', sevenYearsAgo.toISOString())
      .limit(100)
      .get();

    if (!deletedUsersSnapshot.empty) {
      const batch = db.batch();
      deletedUsersSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      totalDeleted += deletedUsersSnapshot.size;
      logger.info(`Permanently deleted ${deletedUsersSnapshot.size} old user records`);
    }

    logger.info(`GDPR cleanup completed. Total records deleted: ${totalDeleted}`);

  } catch (error) {
    logger.error('Error during GDPR cleanup', error);
  }
});

/**
 * Get user's data processing summary (for transparency)
 */
export const getDataProcessingSummary = onCall(async (request) => {
  if (!request.auth?.uid) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  const userId = request.auth.uid;

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      throw new HttpsError('not-found', 'User not found');
    }

    const userData = userDoc.data()!;

    // Count data across collections
    const collections = ['progress', 'attendance', 'purchases', 'auditLogs'];
    const dataSummary: any = {
      userId,
      email: userData.email,
      createdAt: userData.createdAt,
      lastLoginAt: userData.lastLoginAt,
      gdprConsent: userData.gdprConsent || false,
      marketingConsent: userData.marketingConsent || false,
      analyticsConsent: userData.analyticsConsent || false,
      dataRetention: '7 years from last activity',
      collections: {}
    };

    for (const collectionName of collections) {
      const snapshot = await db.collection(collectionName)
        .where('userId', '==', userId)
        .get();
      
      dataSummary.collections[collectionName] = {
        documentCount: snapshot.size,
        lastUpdated: snapshot.docs.length > 0 
          ? Math.max(...snapshot.docs.map(doc => 
              new Date(doc.data().updatedAt || doc.data().createdAt || doc.data().timestamp).getTime()
            ))
          : null
      };
    }

    return dataSummary;

  } catch (error) {
    logger.error('Error getting data processing summary', { userId, error });
    throw new HttpsError('internal', 'Failed to get data processing summary');
  }
});
