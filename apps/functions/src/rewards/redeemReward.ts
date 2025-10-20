import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * Cloud Function: Redeem Reward
 * 
 * Allows users to redeem rewards using their points
 * Handles gift cards, add-ons, and physical rewards
 */

interface RewardRedemption {
  userId: string;
  rewardId: string;
  pointsCost: number;
  type: 'gift-card' | 'addon' | 'physical';
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export const redeemReward = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { rewardId } = data;
  const userId = context.auth.uid;
  
  const db = admin.firestore();
  
  try {
    // Get reward details
    const rewardDoc = await db.collection('rewards').doc(rewardId).get();
    
    if (!rewardDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Reward not found');
    }
    
    const reward = rewardDoc.data()!;
    
    // Check if reward is available
    if (!reward.available) {
      throw new functions.https.HttpsError('failed-precondition', 'Reward is not available');
    }
    
    // Get user's current points
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    const userPoints = userData?.totalPoints || 0;
    
    // Check if user has enough points
    if (userPoints < reward.pointsCost) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        `Insufficient points. Need ${reward.pointsCost}, have ${userPoints}`
      );
    }
    
    // Create redemption record
    const redemption: RewardRedemption = {
      userId,
      rewardId,
      pointsCost: reward.pointsCost,
      type: reward.type,
      status: 'pending'
    };
    
    const redemptionRef = await db.collection('redemptions').add({
      ...redemption,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Deduct points from user
    await db.collection('users').doc(userId).update({
      totalPoints: admin.firestore.FieldValue.increment(-reward.pointsCost),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Create point transaction record
    await db.collection('pointTransactions').add({
      userId,
      points: -reward.pointsCost,
      source: 'redemption',
      sourceId: redemptionRef.id,
      description: `Redeemed: ${reward.title}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Process redemption based on type
    await processRedemption(db, redemptionRef.id, reward, userId);
    
    console.log(`User ${userId} redeemed reward ${rewardId}`);
    
    return {
      success: true,
      redemptionId: redemptionRef.id,
      pointsRemaining: userPoints - reward.pointsCost
    };
  } catch (error) {
    console.error('Error redeeming reward:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to redeem reward');
  }
});

/**
 * Process redemption based on reward type
 */
async function processRedemption(
  db: admin.firestore.Firestore,
  redemptionId: string,
  reward: any,
  userId: string
): Promise<void> {
  try {
    switch (reward.type) {
      case 'gift-card':
        await processGiftCardRedemption(db, redemptionId, reward, userId);
        break;
      case 'addon':
        await processAddonRedemption(db, redemptionId, reward, userId);
        break;
      case 'physical':
        await processPhysicalRedemption(db, redemptionId, reward, userId);
        break;
      default:
        throw new Error(`Unknown reward type: ${reward.type}`);
    }
    
    // Update redemption status
    await db.collection('redemptions').doc(redemptionId).update({
      status: 'completed',
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Error processing redemption:', error);
    
    // Update redemption status to failed
    await db.collection('redemptions').doc(redemptionId).update({
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    throw error;
  }
}

/**
 * Process gift card redemption
 * In production, integrate with gift card provider API
 */
async function processGiftCardRedemption(
  db: admin.firestore.Firestore,
  redemptionId: string,
  reward: any,
  userId: string
): Promise<void> {
  console.log(`Processing gift card redemption for user ${userId}`);
  
  // In production:
  // 1. Call gift card provider API (e.g., Tango Card, Giftbit)
  // 2. Generate gift card code
  // 3. Email code to user
  // 4. Store code in redemption record
  
  // Mock implementation
  const mockGiftCardCode = `GC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  await db.collection('redemptions').doc(redemptionId).update({
    giftCardCode: mockGiftCardCode,
    giftCardProvider: reward.provider || 'Mock Provider',
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  // Send email notification (integrate with SendGrid, AWS SES, etc.)
  console.log(`Gift card code ${mockGiftCardCode} generated for user ${userId}`);
}

/**
 * Process course add-on redemption
 */
async function processAddonRedemption(
  db: admin.firestore.Firestore,
  redemptionId: string,
  reward: any,
  userId: string
): Promise<void> {
  console.log(`Processing add-on redemption for user ${userId}`);
  
  // Grant access to premium course or feature
  if (reward.addonType === 'course') {
    // Add course to user's accessible courses
    await db.collection('purchases').add({
      userId,
      type: 'addon',
      addonId: reward.addonId,
      source: 'redemption',
      sourceId: redemptionId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } else if (reward.addonType === 'webinar-recording') {
    // Grant access to webinar recording
    await db.collection('purchases').add({
      userId,
      type: 'webinar-recording',
      webinarId: reward.webinarId,
      source: 'redemption',
      sourceId: redemptionId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
  
  console.log(`Add-on granted to user ${userId}`);
}

/**
 * Process physical reward redemption
 */
async function processPhysicalRedemption(
  db: admin.firestore.Firestore,
  redemptionId: string,
  reward: any,
  userId: string
): Promise<void> {
  console.log(`Processing physical reward redemption for user ${userId}`);
  
  // Get user's shipping address
  const userDoc = await db.collection('users').doc(userId).get();
  const userData = userDoc.data();
  
  if (!userData?.shippingAddress) {
    throw new Error('User shipping address not found');
  }
  
  // Create shipping order
  // In production, integrate with fulfillment service
  await db.collection('shippingOrders').add({
    userId,
    redemptionId,
    rewardId: reward.id,
    rewardTitle: reward.title,
    shippingAddress: userData.shippingAddress,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  console.log(`Shipping order created for user ${userId}`);
}
