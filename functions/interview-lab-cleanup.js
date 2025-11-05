/**
 * Cloud Function to automatically delete expired interview responses
 * This function should be scheduled to run daily
 * 
 * Deployment:
 * firebase deploy --only functions:cleanupExpiredInterviewResponses
 * 
 * Schedule setup in Firebase Console:
 * Cloud Scheduler → Create Job → Run daily at 2:00 AM
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const storage = admin.storage();

exports.cleanupExpiredInterviewResponses = functions
  .runWith({
    timeoutSeconds: 540, // 9 minutes (max for scheduled functions)
    memory: '256MB',
  })
  .pubsub.schedule('every day 02:00')
  .timeZone('Europe/London') // Adjust to your timezone
  .onRun(async (context) => {
    console.log('Starting cleanup of expired interview responses...');

    try {
      const now = admin.firestore.Timestamp.now();
      
      // Query for expired responses
      const snapshot = await db
        .collection('interviewResponses')
        .where('expiresAt', '<=', now)
        .get();

      if (snapshot.empty) {
        console.log('No expired responses found');
        return null;
      }

      console.log(`Found ${snapshot.size} expired responses to delete`);

      const deletePromises = [];
      const bucket = storage.bucket();

      snapshot.forEach((doc) => {
        const data = doc.data();
        
        // Delete video from Cloud Storage
        if (data.videoPath) {
          console.log(`Deleting video: ${data.videoPath}`);
          const file = bucket.file(data.videoPath);
          deletePromises.push(
            file.delete().catch((error) => {
              console.error(`Failed to delete video ${data.videoPath}:`, error);
              // Continue even if video delete fails (might already be deleted)
            })
          );
        }

        // Delete Firestore document
        deletePromises.push(
          db.collection('interviewResponses').doc(doc.id).delete()
        );
      });

      await Promise.all(deletePromises);

      console.log(`Successfully deleted ${snapshot.size} expired interview responses`);
      
      return {
        success: true,
        deletedCount: snapshot.size,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error cleaning up expired interview responses:', error);
      throw error; // Re-throw to mark function as failed in logs
    }
  });

/**
 * HTTP-triggered function for manual cleanup (for testing/admin use)
 * Only callable by authenticated admins
 */
exports.manualCleanupExpiredResponses = functions
  .https.onCall(async (data, context) => {
    // Check authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    // Check if user is admin
    const userDoc = await db.collection('users').doc(context.auth.uid).get();
    if (!userDoc.exists || userDoc.data().role !== 'admin') {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Only admins can manually trigger cleanup'
      );
    }

    try {
      const now = admin.firestore.Timestamp.now();
      
      const snapshot = await db
        .collection('interviewResponses')
        .where('expiresAt', '<=', now)
        .get();

      if (snapshot.empty) {
        return {
          success: true,
          deletedCount: 0,
          message: 'No expired responses found',
        };
      }

      const deletePromises = [];
      const bucket = storage.bucket();

      snapshot.forEach((doc) => {
        const data = doc.data();
        
        if (data.videoPath) {
          const file = bucket.file(data.videoPath);
          deletePromises.push(
            file.delete().catch((error) => {
              console.error(`Failed to delete video ${data.videoPath}:`, error);
            })
          );
        }

        deletePromises.push(
          db.collection('interviewResponses').doc(doc.id).delete()
        );
      });

      await Promise.all(deletePromises);

      return {
        success: true,
        deletedCount: snapshot.size,
        message: `Successfully deleted ${snapshot.size} expired responses`,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error in manual cleanup:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Failed to cleanup expired responses',
        error
      );
    }
  });

