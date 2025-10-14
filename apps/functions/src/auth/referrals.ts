import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';
import { customAlphabet } from 'nanoid';

const db = getFirestore();
const generateCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

/**
 * Create a referral link for an institution
 */
export const createReferralLink = onCall(async (request) => {
  const { institutionId, expiresInDays = 30, maxUses } = request.data;
  
  // Verify the caller is an institution admin
  if (!request.auth?.token?.role || 
      (request.auth.token.role !== 'institution' && request.auth.token.role !== 'admin') ||
      (request.auth.token.role === 'institution' && request.auth.token.institutionId !== institutionId)) {
    throw new HttpsError('permission-denied', 'Only institution admins can create referral links');
  }

  try {
    // Get institution details
    const institutionDoc = await db.collection('institutions').doc(institutionId).get();
    if (!institutionDoc.exists) {
      throw new HttpsError('not-found', 'Institution not found');
    }

    const institutionData = institutionDoc.data()!;
    const referralCode = generateCode();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const referralData = {
      code: referralCode,
      institutionId,
      institutionName: institutionData.name,
      createdBy: request.auth.uid,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      maxUses: maxUses || null,
      currentUses: 0,
      isActive: true,
      type: 'institution_signup'
    };

    // Save referral link
    await db.collection('referralLinks').doc(referralCode).set(referralData);

    // Update institution's referral links
    await db.collection('institutions').doc(institutionId).update({
      referralLinks: FieldValue.arrayUnion(referralCode),
      updatedAt: new Date().toISOString()
    });

    logger.info(`Referral link created`, { referralCode, institutionId });

    return {
      referralCode,
      referralUrl: `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${referralCode}`,
      expiresAt: expiresAt.toISOString()
    };
  } catch (error) {
    logger.error('Error creating referral link', { institutionId, error });
    throw new HttpsError('internal', 'Failed to create referral link');
  }
});

/**
 * Validate and use a referral code
 */
export const validateReferralCode = onCall(async (request) => {
  const { referralCode } = request.data;

  if (!referralCode) {
    throw new HttpsError('invalid-argument', 'Referral code is required');
  }

  try {
    const referralDoc = await db.collection('referralLinks').doc(referralCode).get();
    
    if (!referralDoc.exists) {
      return { valid: false, reason: 'Invalid referral code' };
    }

    const referralData = referralDoc.data()!;
    const now = new Date();
    const expiresAt = new Date(referralData.expiresAt);

    // Check if expired
    if (now > expiresAt) {
      return { valid: false, reason: 'Referral code has expired' };
    }

    // Check if inactive
    if (!referralData.isActive) {
      return { valid: false, reason: 'Referral code is no longer active' };
    }

    // Check usage limit
    if (referralData.maxUses && referralData.currentUses >= referralData.maxUses) {
      return { valid: false, reason: 'Referral code usage limit reached' };
    }

    return {
      valid: true,
      institutionId: referralData.institutionId,
      institutionName: referralData.institutionName,
      referralData
    };
  } catch (error) {
    logger.error('Error validating referral code', { referralCode, error });
    throw new HttpsError('internal', 'Failed to validate referral code');
  }
});

/**
 * Use a referral code (increment usage count)
 */
export const useReferralCode = onCall(async (request) => {
  const { referralCode, userId } = request.data;

  if (!referralCode || !userId) {
    throw new HttpsError('invalid-argument', 'Referral code and user ID are required');
  }

  try {
    await db.runTransaction(async (transaction) => {
      const referralRef = db.collection('referralLinks').doc(referralCode);
      const referralDoc = await transaction.get(referralRef);

      if (!referralDoc.exists) {
        throw new HttpsError('not-found', 'Referral code not found');
      }

      const referralData = referralDoc.data()!;
      
      // Increment usage count
      transaction.update(referralRef, {
        currentUses: FieldValue.increment(1),
        lastUsedAt: new Date().toISOString(),
        lastUsedBy: userId
      });

      // Log referral usage
      const usageLogRef = db.collection('referralUsage').doc();
      transaction.set(usageLogRef, {
        referralCode,
        userId,
        institutionId: referralData.institutionId,
        usedAt: new Date().toISOString(),
        userAgent: request.rawRequest.headers['user-agent'],
        ipAddress: request.rawRequest.ip
      });
    });

    logger.info(`Referral code used`, { referralCode, userId });
    return { success: true };
  } catch (error) {
    logger.error('Error using referral code', { referralCode, userId, error });
    throw new HttpsError('internal', 'Failed to use referral code');
  }
});

/**
 * Get referral statistics for an institution
 */
export const getReferralStats = onCall(async (request) => {
  const { institutionId } = request.data;

  // Verify permissions
  if (!request.auth?.token?.role || 
      (request.auth.token.role !== 'institution' && request.auth.token.role !== 'admin') ||
      (request.auth.token.role === 'institution' && request.auth.token.institutionId !== institutionId)) {
    throw new HttpsError('permission-denied', 'Insufficient permissions');
  }

  try {
    // Get all referral links for the institution
    const referralLinksSnapshot = await db.collection('referralLinks')
      .where('institutionId', '==', institutionId)
      .get();

    const referralLinks = referralLinksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get usage statistics
    const usageSnapshot = await db.collection('referralUsage')
      .where('institutionId', '==', institutionId)
      .get();

    const totalUsages = usageSnapshot.size;
    const usageByCode: Record<string, number> = {};
    
    usageSnapshot.docs.forEach(doc => {
      const data = doc.data();
      usageByCode[data.referralCode] = (usageByCode[data.referralCode] || 0) + 1;
    });

    // Calculate conversion rates
    const stats = {
      totalReferralLinks: referralLinks.length,
      activeReferralLinks: referralLinks.filter(link => link.isActive).length,
      totalUsages,
      averageUsagesPerLink: referralLinks.length > 0 ? totalUsages / referralLinks.length : 0,
      referralLinks: referralLinks.map(link => ({
        ...link,
        usageCount: usageByCode[link.code] || 0
      }))
    };

    return stats;
  } catch (error) {
    logger.error('Error getting referral stats', { institutionId, error });
    throw new HttpsError('internal', 'Failed to get referral statistics');
  }
});

/**
 * Deactivate a referral link
 */
export const deactivateReferralLink = onCall(async (request) => {
  const { referralCode } = request.data;

  if (!referralCode) {
    throw new HttpsError('invalid-argument', 'Referral code is required');
  }

  try {
    const referralDoc = await db.collection('referralLinks').doc(referralCode).get();
    
    if (!referralDoc.exists) {
      throw new HttpsError('not-found', 'Referral link not found');
    }

    const referralData = referralDoc.data()!;

    // Verify permissions
    if (!request.auth?.token?.role || 
        (request.auth.token.role !== 'institution' && request.auth.token.role !== 'admin') ||
        (request.auth.token.role === 'institution' && request.auth.token.institutionId !== referralData.institutionId)) {
      throw new HttpsError('permission-denied', 'Insufficient permissions');
    }

    await db.collection('referralLinks').doc(referralCode).update({
      isActive: false,
      deactivatedAt: new Date().toISOString(),
      deactivatedBy: request.auth.uid
    });

    logger.info(`Referral link deactivated`, { referralCode });
    return { success: true };
  } catch (error) {
    logger.error('Error deactivating referral link', { referralCode, error });
    throw new HttpsError('internal', 'Failed to deactivate referral link');
  }
});
