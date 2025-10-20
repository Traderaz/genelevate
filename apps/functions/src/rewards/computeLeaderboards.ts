import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * Cloud Function: Compute Leaderboards
 * 
 * Scheduled to run every Monday at 6:00 AM UTC
 * Computes weekly and monthly leaderboards based on points earned
 * 
 * Leaderboard Types:
 * - Weekly: Points earned in the last 7 days
 * - Monthly: Points earned in the current calendar month
 * - All-Time: Total points earned
 */

interface UserPoints {
  userId: string;
  displayName: string;
  institutionId?: string;
  points: number;
  previousRank?: number;
}

interface LeaderboardEntry extends UserPoints {
  rank: number;
  change: number; // Position change from previous period
}

/**
 * Scheduled function to compute leaderboards weekly
 */
export const computeLeaderboards = functions.pubsub
  .schedule('0 6 * * 1') // Every Monday at 6:00 AM UTC
  .timeZone('Europe/London')
  .onRun(async (context) => {
    const db = admin.firestore();
    
    try {
      console.log('Starting leaderboard computation...');
      
      // Compute all leaderboard types
      await Promise.all([
        computeWeeklyLeaderboard(db),
        computeMonthlyLeaderboard(db),
        computeAllTimeLeaderboard(db)
      ]);
      
      console.log('Leaderboard computation completed successfully');
      
      return { success: true };
    } catch (error) {
      console.error('Error computing leaderboards:', error);
      throw error;
    }
  });

/**
 * Compute weekly leaderboard (last 7 days)
 */
async function computeWeeklyLeaderboard(db: admin.firestore.Firestore): Promise<void> {
  console.log('Computing weekly leaderboard...');
  
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Get all point transactions from the last 7 days
  const pointsSnapshot = await db.collection('pointTransactions')
    .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(weekAgo))
    .get();
  
  // Aggregate points by user
  const userPointsMap = new Map<string, UserPoints>();
  
  for (const doc of pointsSnapshot.docs) {
    const data = doc.data();
    const userId = data.userId;
    
    if (!userPointsMap.has(userId)) {
      // Fetch user profile
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      
      userPointsMap.set(userId, {
        userId,
        displayName: userData?.displayName || 'Unknown User',
        institutionId: userData?.institutionId,
        points: 0
      });
    }
    
    const userPoints = userPointsMap.get(userId)!;
    userPoints.points += data.points || 0;
  }
  
  // Get previous week's leaderboard for rank changes
  const previousLeaderboard = await getPreviousLeaderboard(db, 'weekly');
  
  // Sort by points and assign ranks
  const sortedUsers = Array.from(userPointsMap.values())
    .sort((a, b) => b.points - a.points);
  
  const leaderboard: LeaderboardEntry[] = sortedUsers.map((user, index) => {
    const previousRank = previousLeaderboard.get(user.userId);
    const change = previousRank ? previousRank - (index + 1) : 0;
    
    return {
      ...user,
      rank: index + 1,
      change
    };
  });
  
  // Save to Firestore
  await saveLeaderboard(db, 'weekly', leaderboard);
  
  console.log(`Weekly leaderboard computed with ${leaderboard.length} entries`);
}

/**
 * Compute monthly leaderboard (current calendar month)
 */
async function computeMonthlyLeaderboard(db: admin.firestore.Firestore): Promise<void> {
  console.log('Computing monthly leaderboard...');
  
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  // Get all point transactions from this month
  const pointsSnapshot = await db.collection('pointTransactions')
    .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(monthStart))
    .get();
  
  // Aggregate points by user
  const userPointsMap = new Map<string, UserPoints>();
  
  for (const doc of pointsSnapshot.docs) {
    const data = doc.data();
    const userId = data.userId;
    
    if (!userPointsMap.has(userId)) {
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      
      userPointsMap.set(userId, {
        userId,
        displayName: userData?.displayName || 'Unknown User',
        institutionId: userData?.institutionId,
        points: 0
      });
    }
    
    const userPoints = userPointsMap.get(userId)!;
    userPoints.points += data.points || 0;
  }
  
  // Get previous month's leaderboard
  const previousLeaderboard = await getPreviousLeaderboard(db, 'monthly');
  
  // Sort and assign ranks
  const sortedUsers = Array.from(userPointsMap.values())
    .sort((a, b) => b.points - a.points);
  
  const leaderboard: LeaderboardEntry[] = sortedUsers.map((user, index) => {
    const previousRank = previousLeaderboard.get(user.userId);
    const change = previousRank ? previousRank - (index + 1) : 0;
    
    return {
      ...user,
      rank: index + 1,
      change
    };
  });
  
  await saveLeaderboard(db, 'monthly', leaderboard);
  
  console.log(`Monthly leaderboard computed with ${leaderboard.length} entries`);
}

/**
 * Compute all-time leaderboard
 */
async function computeAllTimeLeaderboard(db: admin.firestore.Firestore): Promise<void> {
  console.log('Computing all-time leaderboard...');
  
  // Get all users with their total points
  const usersSnapshot = await db.collection('users')
    .where('totalPoints', '>', 0)
    .orderBy('totalPoints', 'desc')
    .limit(100) // Top 100 users
    .get();
  
  // Get previous all-time leaderboard
  const previousLeaderboard = await getPreviousLeaderboard(db, 'all-time');
  
  const leaderboard: LeaderboardEntry[] = usersSnapshot.docs.map((doc, index) => {
    const data = doc.data();
    const previousRank = previousLeaderboard.get(doc.id);
    const change = previousRank ? previousRank - (index + 1) : 0;
    
    return {
      userId: doc.id,
      displayName: data.displayName || 'Unknown User',
      institutionId: data.institutionId,
      points: data.totalPoints || 0,
      rank: index + 1,
      change
    };
  });
  
  await saveLeaderboard(db, 'all-time', leaderboard);
  
  console.log(`All-time leaderboard computed with ${leaderboard.length} entries`);
}

/**
 * Get previous leaderboard for rank change calculation
 */
async function getPreviousLeaderboard(
  db: admin.firestore.Firestore,
  type: string
): Promise<Map<string, number>> {
  const leaderboardDoc = await db.collection('leaderboards')
    .doc(type)
    .get();
  
  if (!leaderboardDoc.exists) {
    return new Map();
  }
  
  const data = leaderboardDoc.data();
  const entries = data?.entries || [];
  
  const rankMap = new Map<string, number>();
  entries.forEach((entry: LeaderboardEntry) => {
    rankMap.set(entry.userId, entry.rank);
  });
  
  return rankMap;
}

/**
 * Save leaderboard to Firestore
 */
async function saveLeaderboard(
  db: admin.firestore.Firestore,
  type: string,
  entries: LeaderboardEntry[]
): Promise<void> {
  await db.collection('leaderboards').doc(type).set({
    type,
    entries,
    computedAt: admin.firestore.FieldValue.serverTimestamp(),
    totalEntries: entries.length
  });
}

/**
 * Award points to a user
 * Called by other functions when users complete activities
 */
export const awardPoints = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { userId, points, source, sourceId, description } = data;
  
  // Verify user can only award points to themselves (or admin can award to anyone)
  if (context.auth.uid !== userId && !context.auth.token.role === 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Cannot award points to other users');
  }
  
  const db = admin.firestore();
  
  try {
    // Create point transaction
    await db.collection('pointTransactions').add({
      userId,
      points,
      source, // 'course', 'webinar', 'event', 'achievement'
      sourceId,
      description,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Update user's total points
    await db.collection('users').doc(userId).update({
      totalPoints: admin.firestore.FieldValue.increment(points),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`Awarded ${points} points to user ${userId} for ${source}`);
    
    return { success: true, points };
  } catch (error) {
    console.error('Error awarding points:', error);
    throw new functions.https.HttpsError('internal', 'Failed to award points');
  }
});

/**
 * Manual trigger for leaderboard computation (admin only)
 */
export const manualComputeLeaderboards = functions.https.onCall(async (data, context) => {
  // Verify admin authentication
  if (!context.auth || context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only administrators can manually compute leaderboards'
    );
  }
  
  const db = admin.firestore();
  
  try {
    console.log('Manual leaderboard computation triggered by:', context.auth.uid);
    
    await Promise.all([
      computeWeeklyLeaderboard(db),
      computeMonthlyLeaderboard(db),
      computeAllTimeLeaderboard(db)
    ]);
    
    return { success: true };
  } catch (error) {
    console.error('Error in manual computation:', error);
    throw new functions.https.HttpsError('internal', 'Failed to compute leaderboards');
  }
});
