import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const db = getFirestore();

/**
 * Cloud Function: Process Pending Subscription Changes
 * 
 * Runs daily at 2 AM UTC to check for pending subscription changes
 * that have reached their effective date and apply them.
 * 
 * Handles:
 * - Downgrades (after 30-day grace period)
 * - Cancellations (after billing period ends)
 */
export const processPendingSubscriptionChanges = onSchedule(
  {
    schedule: '0 2 * * *', // Every day at 2 AM UTC
    timeZone: 'Europe/London',
    retryCount: 3,
  },
  async (event) => {
    console.log('Starting pending subscription changes processing...');

    try {
      const now = Timestamp.now();
      
      // Query all users with pending plan changes that are due
      const usersSnapshot = await db.collection('users')
        .where('subscription.pendingPlanChange', '!=', null)
        .get();

      let processedCount = 0;
      let errorCount = 0;

      const batch = db.batch();
      let batchCount = 0;
      const MAX_BATCH_SIZE = 500;

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const pendingChange = userData.subscription?.pendingPlanChange;

        if (!pendingChange || !pendingChange.effectiveDate) {
          continue;
        }

        // Check if the effective date has passed
        const effectiveDate = pendingChange.effectiveDate;
        if (effectiveDate.toMillis() <= now.toMillis()) {
          console.log(`Processing pending change for user ${userDoc.id}: ${pendingChange.type} to ${pendingChange.newPlan}`);

          // Apply the pending change
          batch.update(userDoc.ref, {
            'subscription.plan': pendingChange.newPlan,
            'subscription.status': pendingChange.newPlan === 'free' ? 'inactive' : 'active',
            'subscription.pendingPlanChange': null,
            'subscription.expiresAt': pendingChange.newPlan === 'free' 
              ? null 
              : Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
            updatedAt: Timestamp.now(),
          });

          processedCount++;
          batchCount++;

          // Commit batch if it reaches the limit
          if (batchCount >= MAX_BATCH_SIZE) {
            await batch.commit();
            console.log(`Committed batch of ${batchCount} updates`);
            batchCount = 0;
          }

          // TODO: Send email notification to user about the change
          // await sendSubscriptionChangeEmail(userDoc.id, pendingChange);
        }
      }

      // Commit any remaining updates
      if (batchCount > 0) {
        await batch.commit();
        console.log(`Committed final batch of ${batchCount} updates`);
      }

      console.log(`✅ Processing complete: ${processedCount} changes applied, ${errorCount} errors`);

      return {
        success: true,
        processed: processedCount,
        errors: errorCount,
        timestamp: now.toDate().toISOString(),
      };

    } catch (error) {
      console.error('❌ Error processing pending subscription changes:', error);
      throw error;
    }
  }
);

/**
 * Callable function to manually trigger processing
 * (Admin only)
 */
import { onCall, HttpsError } from 'firebase-functions/v2/https';

export const manualProcessPendingChanges = onCall(
  {
    enforceAppCheck: false,
  },
  async (request) => {
    // Check if user is admin
    if (!request.auth || request.auth.token.role !== 'admin') {
      throw new HttpsError(
        'permission-denied',
        'Only admins can manually process pending changes'
      );
    }

    console.log(`Manual processing triggered by admin: ${request.auth.uid}`);

    try {
      const now = Timestamp.now();
      
      const usersSnapshot = await db.collection('users')
        .where('subscription.pendingPlanChange', '!=', null)
        .get();

      let processedCount = 0;

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const pendingChange = userData.subscription?.pendingPlanChange;

        if (!pendingChange || !pendingChange.effectiveDate) {
          continue;
        }

        // For manual processing, apply all pending changes regardless of date
        console.log(`Manually processing change for user ${userDoc.id}: ${pendingChange.type} to ${pendingChange.newPlan}`);

        await userDoc.ref.update({
          'subscription.plan': pendingChange.newPlan,
          'subscription.status': pendingChange.newPlan === 'free' ? 'inactive' : 'active',
          'subscription.pendingPlanChange': null,
          'subscription.expiresAt': pendingChange.newPlan === 'free' 
            ? null 
            : Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
          updatedAt: Timestamp.now(),
        });

        processedCount++;
      }

      console.log(`✅ Manual processing complete: ${processedCount} changes applied`);

      return {
        success: true,
        processed: processedCount,
        timestamp: now.toDate().toISOString(),
      };

    } catch (error: any) {
      console.error('❌ Error in manual processing:', error);
      throw new HttpsError('internal', error.message);
    }
  }
);

