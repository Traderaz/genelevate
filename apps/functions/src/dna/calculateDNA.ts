/**
 * DNA Calculation Cloud Functions
 * 
 * Scheduled function that runs nightly to calculate and update
 * student Learning DNA profiles based on behavioral signals
 * and questionnaire responses.
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import type {
  LearningDNA,
  LearningSignal,
  DNAResponse,
  CognitiveDimension,
  CognitiveProfile,
  LearningPatterns,
  SubjectAffinity,
} from '@gen-elevate/shared/types/dna';

const db = admin.firestore();

// ============================================================================
// Main Scheduled Function
// ============================================================================

/**
 * Runs every night at 2 AM GMT
 * Processes all users who had activity in the past 24 hours
 */
export const calculateLearningDNA = functions
  .region('europe-west2')
  .pubsub.schedule('0 2 * * *')
  .timeZone('Europe/London')
  .onRun(async (context) => {
    console.log('🧬 Starting nightly DNA calculation...');
    
    const startTime = Date.now();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    try {
      // Get all users who had activity yesterday
      const activeUserIds = await getActiveUsers(yesterday);
      console.log(`Found ${activeUserIds.length} active users to process`);
      
      let successCount = 0;
      let errorCount = 0;
      
      // Process in batches of 10
      const batchSize = 10;
      for (let i = 0; i < activeUserIds.length; i += batchSize) {
        const batch = activeUserIds.slice(i, i + batchSize);
        
        await Promise.all(
          batch.map(async (userId) => {
            try {
              await updateUserDNA(userId);
              successCount++;
            } catch (error) {
              console.error(`Error processing user ${userId}:`, error);
              errorCount++;
            }
          })
        );
        
        console.log(`Processed batch ${Math.floor(i / batchSize) + 1}, progress: ${i + batch.length}/${activeUserIds.length}`);
      }
      
      const duration = Date.now() - startTime;
      console.log(`✅ DNA calculation complete. Success: ${successCount}, Errors: ${errorCount}, Duration: ${duration}ms`);
      
      // Log metrics
      await logMetrics({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        totalUsers: activeUserIds.length,
        successCount,
        errorCount,
        durationMs: duration,
      });
      
      return { success: true, processed: successCount, errors: errorCount };
    } catch (error) {
      console.error('Fatal error in DNA calculation:', error);
      throw error;
    }
  });

// ============================================================================
// Manual Trigger (for testing or on-demand calculation)
// ============================================================================

export const calculateUserDNA = functions
  .region('europe-west2')
  .https.onCall(async (data, context) => {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    const userId = data.userId || context.auth.uid;
    
    // Only allow users to calculate their own DNA (unless admin)
    const isAdmin = context.auth.token.role === 'admin';
    if (userId !== context.auth.uid && !isAdmin) {
      throw new functions.https.HttpsError('permission-denied', 'Cannot calculate DNA for other users');
    }
    
    try {
      await updateUserDNA(userId);
      return { success: true, message: 'DNA profile updated successfully' };
    } catch (error: any) {
      console.error('Error calculating DNA:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  });

// ============================================================================
// Core DNA Calculation Logic
// ============================================================================

async function updateUserDNA(userId: string): Promise<void> {
  console.log(`Calculating DNA for user ${userId}`);
  
  // 1. Fetch explicit data (questionnaire responses)
  const explicitData = await getExplicitScores(userId);
  
  // 2. Fetch implicit data (learning signals from last 90 days)
  const implicitData = await getImplicitScores(userId);
  
  // If no data at all, skip this user
  if (explicitData.totalQuestions === 0 && implicitData.totalSignals === 0) {
    console.log(`No data for user ${userId}, skipping`);
    return;
  }
  
  // 3. Merge scores
  const cognitiveProfile = mergeScores(explicitData, implicitData);
  
  // 4. Calculate learning patterns
  const learningPatterns = await calculateLearningPatterns(userId);
  
  // 5. Calculate subject affinities
  const subjectAffinities = await calculateSubjectAffinities(userId);
  
  // 6. Calculate confidence
  const confidence = calculateConfidence(
    implicitData.totalSignals,
    explicitData.totalQuestions
  );
  
  // 7. Get existing DNA (for consent/sharing settings)
  const existingDNA = await getDNA(userId);
  
  // 8. Update Firestore
  const dnaUpdate: Partial<LearningDNA> = {
    userId,
    cognitiveProfile,
    learningPatterns,
    subjectAffinities,
    lastCalculated: admin.firestore.FieldValue.serverTimestamp() as any,
    dataPoints: implicitData.totalSignals + explicitData.totalQuestions,
    confidence,
    updatedAt: admin.firestore.FieldValue.serverTimestamp() as any,
  };
  
  // Preserve consent and sharing settings if they exist
  if (existingDNA) {
    dnaUpdate.consent = existingDNA.consent;
    dnaUpdate.sharing = existingDNA.sharing;
  } else {
    // First time - set defaults
    dnaUpdate.consent = {
      dataCollection: true,
      parentalConsent: false,
      consentDate: admin.firestore.FieldValue.serverTimestamp() as any,
      consentVersion: '1.0',
    };
    dnaUpdate.sharing = {
      isPublic: false,
      parentCanView: true,
      institutionCanView: false,
      sharedWith: [],
    };
    dnaUpdate.createdAt = admin.firestore.FieldValue.serverTimestamp() as any;
  }
  
  await db.collection('learningDNA').doc(userId).set(dnaUpdate, { merge: true });
  
  // 9. Check if we should create a snapshot
  await checkAndCreateSnapshot(userId, existingDNA, cognitiveProfile);
  
  console.log(`✅ DNA updated for user ${userId}, confidence: ${confidence}%`);
}

// ============================================================================
// Explicit Scores (from Questionnaires)
// ============================================================================

async function getExplicitScores(userId: string): Promise<{
  scores: Record<CognitiveDimension, number>;
  totalQuestions: number;
}> {
  const responsesSnapshot = await db
    .collection('dnaResponses')
    .where('userId', '==', userId)
    .where('isComplete', '==', true)
    .get();
  
  if (responsesSnapshot.empty) {
    return {
      scores: {
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 0,
        creative: 0,
        social: 0,
        solitary: 0,
      },
      totalQuestions: 0,
    };
  }
  
  const scores = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    logical: 0,
    creative: 0,
    social: 0,
    solitary: 0,
  };
  
  let totalQuestions = 0;
  
  responsesSnapshot.forEach((doc) => {
    const response = doc.data() as DNAResponse;
    
    // Add explicit scores from this response
    Object.keys(scores).forEach((dimension) => {
      const dim = dimension as CognitiveDimension;
      scores[dim] += response.explicitScores[dim] || 0;
    });
    
    totalQuestions += response.responses.length;
  });
  
  // Normalize to 0-100 (assuming 5-point Likert scale)
  if (totalQuestions > 0) {
    Object.keys(scores).forEach((key) => {
      const dim = key as CognitiveDimension;
      scores[dim] = Math.min(100, Math.round((scores[dim] / totalQuestions) * 20));
    });
  }
  
  return { scores, totalQuestions };
}

// ============================================================================
// Implicit Scores (from Behavioral Signals)
// ============================================================================

async function getImplicitScores(userId: string): Promise<{
  scores: Record<CognitiveDimension, number>;
  totalSignals: number;
}> {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const signalsSnapshot = await db
    .collection('learningSignals')
    .where('userId', '==', userId)
    .where('timestamp', '>=', ninetyDaysAgo)
    .limit(5000) // Cap for performance
    .get();
  
  const scores = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    logical: 0,
    creative: 0,
    social: 0,
    solitary: 0,
  };
  
  if (signalsSnapshot.empty) {
    return { scores, totalSignals: 0 };
  }
  
  signalsSnapshot.forEach((doc) => {
    const signal = doc.data() as LearningSignal;
    
    // Media type preferences
    if (signal.mediaType === 'video') scores.visual += 2;
    if (signal.mediaType === 'audio') scores.auditory += 2;
    if (signal.mediaType === 'interactive') scores.kinesthetic += 2;
    if (signal.mediaType === 'text') {
      scores.visual += 0.5; // Reading is somewhat visual
      scores.solitary += 0.5; // Often done alone
    }
    
    // Interaction types
    if (signal.interactionType === 'watching') scores.visual += 1;
    if (signal.interactionType === 'doing') scores.kinesthetic += 1;
    if (signal.interactionType === 'discussing') scores.social += 2;
    if (signal.interactionType === 'reading') scores.auditory += 0.5;
    
    // Subject-based inference
    if (signal.subject) {
      const subject = signal.subject.toLowerCase();
      if (subject.includes('math') || subject.includes('science') || subject.includes('physics')) {
        scores.logical += 1.5;
      }
      if (subject.includes('art') || subject.includes('music') || subject.includes('design')) {
        scores.creative += 1.5;
      }
      if (subject.includes('english') || subject.includes('literature')) {
        scores.creative += 0.5;
        scores.visual += 0.5;
      }
    }
    
    // Activity type
    if (signal.type === 'webinar_join') scores.social += 1.5;
    if (signal.type === 'ai_chat') {
      scores.solitary += 1;
      if (signal.hourOfDay >= 22 || signal.hourOfDay <= 6) {
        scores.solitary += 0.5; // Late night/early morning solo study
      }
    }
    if (signal.type === 'quiz_attempt') {
      scores.logical += 0.5;
      scores.solitary += 0.5;
    }
    
    // Performance indicators
    if (signal.score !== undefined) {
      if (signal.score >= 80) {
        scores.logical += 0.5; // High performers often have strong logical reasoning
      }
    }
    
    // Engagement level
    if (signal.engagementLevel && signal.engagementLevel > 70) {
      // High engagement suggests good learning style match
      if (signal.mediaType) {
        if (signal.mediaType === 'video') scores.visual += 0.5;
        if (signal.mediaType === 'audio') scores.auditory += 0.5;
        if (signal.mediaType === 'interactive') scores.kinesthetic += 0.5;
      }
    }
  });
  
  // Normalize to 0-100
  const maxScore = Math.max(...Object.values(scores), 1); // Avoid division by zero
  Object.keys(scores).forEach((key) => {
    const dim = key as CognitiveDimension;
    scores[dim] = Math.round((scores[dim] / maxScore) * 100);
  });
  
  return { scores, totalSignals: signalsSnapshot.size };
}

// ============================================================================
// Merge Scores
// ============================================================================

function mergeScores(
  explicitData: { scores: Record<CognitiveDimension, number>; totalQuestions: number },
  implicitData: { scores: Record<CognitiveDimension, number>; totalSignals: number }
): CognitiveProfile {
  const merged: Record<CognitiveDimension, number> = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    logical: 0,
    creative: 0,
    social: 0,
    solitary: 0,
  };
  
  // Determine weights based on data availability
  let explicitWeight = 0.3;
  let implicitWeight = 0.7;
  
  // New users: rely more on explicit
  if (implicitData.totalSignals < 100) {
    explicitWeight = 0.6;
    implicitWeight = 0.4;
  }
  
  // No questionnaire: 100% implicit
  if (explicitData.totalQuestions === 0) {
    explicitWeight = 0;
    implicitWeight = 1;
  }
  
  // No signals: 100% explicit
  if (implicitData.totalSignals === 0) {
    explicitWeight = 1;
    implicitWeight = 0;
  }
  
  // Merge
  Object.keys(merged).forEach((key) => {
    const dim = key as CognitiveDimension;
    merged[dim] = Math.round(
      (explicitData.scores[dim] * explicitWeight) +
      (implicitData.scores[dim] * implicitWeight)
    );
  });
  
  // Identify dominant and secondary styles
  const sorted = Object.entries(merged)
    .sort((a, b) => b[1] - a[1])
    .map(([dim]) => dim as CognitiveDimension);
  
  const profile: CognitiveProfile = {
    ...merged,
    dominantStyle: sorted[0],
  };
  
  if (merged[sorted[1]] > 60) {
    profile.secondaryStyle = sorted[1];
  }
  
  return profile;
}

// ============================================================================
// Learning Patterns
// ============================================================================

async function calculateLearningPatterns(userId: string): Promise<LearningPatterns> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const signalsSnapshot = await db
    .collection('learningSignals')
    .where('userId', '==', userId)
    .where('timestamp', '>=', thirtyDaysAgo)
    .get();
  
  if (signalsSnapshot.empty) {
    return {
      peakHours: [],
      avgSessionDuration: 0,
      preferredDayOfWeek: [],
      consistencyScore: 0,
      focusScore: 0,
      completionRate: 0,
      retentionRate: 0,
    };
  }
  
  const hourCounts = new Array(24).fill(0);
  const dayCounts: Record<string, number> = {};
  const sessionDurations: number[] = [];
  
  signalsSnapshot.forEach((doc) => {
    const signal = doc.data() as LearningSignal;
    
    hourCounts[signal.hourOfDay]++;
    dayCounts[signal.dayOfWeek] = (dayCounts[signal.dayOfWeek] || 0) + 1;
    
    if (signal.duration) {
      sessionDurations.push(signal.duration);
    }
  });
  
  // Peak hours (top 3)
  const peakHours = hourCounts
    .map((count, hour) => ({ hour, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map((item) => item.hour);
  
  // Preferred days (top 3)
  const preferredDayOfWeek = Object.entries(dayCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([day]) => day);
  
  // Average session duration (in minutes)
  const avgSessionDuration = sessionDurations.length > 0
    ? Math.round(sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length / 60)
    : 0;
  
  // Consistency score (how evenly distributed are study sessions)
  const consistencyScore = calculateConsistencyScore(signalsSnapshot.docs.map(d => d.data() as LearningSignal));
  
  // Focus, completion, and retention scores
  const focusScore = await calculateFocusScore(userId);
  const { completionRate, retentionRate } = await calculateCompletionAndRetention(userId);
  
  return {
    peakHours,
    avgSessionDuration,
    preferredDayOfWeek,
    consistencyScore,
    focusScore,
    completionRate,
    retentionRate,
  };
}

function calculateConsistencyScore(signals: LearningSignal[]): number {
  if (signals.length < 7) return 0;
  
  // Group by day
  const dayMap: Record<string, number> = {};
  signals.forEach((signal) => {
    const day = signal.timestamp.toDate().toISOString().split('T')[0];
    dayMap[day] = (dayMap[day] || 0) + 1;
  });
  
  const daysActive = Object.keys(dayMap).length;
  const totalDays = 30;
  
  // Consistency = % of days with activity
  return Math.round((daysActive / totalDays) * 100);
}

async function calculateFocusScore(userId: string): Promise<number> {
  // Focus = average quiz attempts per completion (lower is better)
  const quizAttempts = await db
    .collection('learningSignals')
    .where('userId', '==', userId)
    .where('type', '==', 'quiz_attempt')
    .count()
    .get();
  
  const quizCompletions = await db
    .collection('learningSignals')
    .where('userId', '==', userId)
    .where('type', '==', 'quiz_complete')
    .count()
    .get();
  
  if (quizCompletions.data().count === 0) return 50;
  
  const attemptsPerCompletion = quizAttempts.data().count / quizCompletions.data().count;
  
  // Ideal is 1 attempt per completion = 100 score
  // 2 attempts = 80, 3 = 60, etc.
  const focusScore = Math.max(0, Math.min(100, 100 - ((attemptsPerCompletion - 1) * 20)));
  
  return Math.round(focusScore);
}

async function calculateCompletionAndRetention(userId: string): Promise<{
  completionRate: number;
  retentionRate: number;
}> {
  // Completion rate: % of started courses that are completed
  const userDoc = await db.collection('users').doc(userId).get();
  const userData = userDoc.data();
  
  if (!userData) {
    return { completionRate: 0, retentionRate: 0 };
  }
  
  const enrolledCourses = userData.enrolledCourses || [];
  const completedCourses = userData.completedCourses || [];
  
  const completionRate = enrolledCourses.length > 0
    ? Math.round((completedCourses.length / enrolledCourses.length) * 100)
    : 0;
  
  // Retention rate: average quiz score across all quizzes
  const quizSignals = await db
    .collection('learningSignals')
    .where('userId', '==', userId)
    .where('type', '==', 'quiz_complete')
    .where('score', '!=', null)
    .limit(100)
    .get();
  
  if (quizSignals.empty) {
    return { completionRate, retentionRate: 0 };
  }
  
  let totalScore = 0;
  quizSignals.forEach((doc) => {
    const signal = doc.data() as LearningSignal;
    totalScore += signal.score || 0;
  });
  
  const retentionRate = Math.round(totalScore / quizSignals.size);
  
  return { completionRate, retentionRate };
}

// ============================================================================
// Subject Affinities
// ============================================================================

async function calculateSubjectAffinities(userId: string): Promise<Record<string, SubjectAffinity>> {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const signalsSnapshot = await db
    .collection('learningSignals')
    .where('userId', '==', userId)
    .where('timestamp', '>=', ninetyDaysAgo)
    .get();
  
  const subjects: Record<string, {
    totalTime: number;
    totalScore: number;
    scoreCount: number;
    engagement: number;
  }> = {};
  
  signalsSnapshot.forEach((doc) => {
    const signal = doc.data() as LearningSignal;
    
    if (!signal.subject) return;
    
    if (!subjects[signal.subject]) {
      subjects[signal.subject] = {
        totalTime: 0,
        totalScore: 0,
        scoreCount: 0,
        engagement: 0,
      };
    }
    
    const subj = subjects[signal.subject];
    
    if (signal.duration) {
      subj.totalTime += signal.duration;
    }
    
    if (signal.score !== undefined) {
      subj.totalScore += signal.score;
      subj.scoreCount++;
    }
    
    subj.engagement += signal.completed ? 2 : 1;
  });
  
  // Calculate affinity scores
  const affinities: Record<string, SubjectAffinity> = {};
  
  Object.entries(subjects).forEach(([subject, data]) => {
    const avgPerformance = data.scoreCount > 0
      ? data.totalScore / data.scoreCount
      : 50;
    
    const timeScore = Math.min(100, (data.totalTime / 3600) * 10); // Hours to score
    const engagementScore = Math.min(100, data.engagement * 2);
    
    // Affinity = weighted combination
    const affinity = Math.round(
      (timeScore * 0.4) +
      (avgPerformance * 0.4) +
      (engagementScore * 0.2)
    );
    
    affinities[subject] = {
      affinity,
      performance: Math.round(avgPerformance),
      engagement: Math.round(engagementScore),
      lastUpdated: admin.firestore.FieldValue.serverTimestamp() as any,
    };
  });
  
  return affinities;
}

// ============================================================================
// Helper Functions
// ============================================================================

function calculateConfidence(signalCount: number, questionCount: number): number {
  const signalConfidence = Math.min(70, (signalCount / 500) * 70);
  const questionConfidence = Math.min(30, (questionCount / 50) * 30);
  
  return Math.round(signalConfidence + questionConfidence);
}

async function getActiveUsers(since: Date): Promise<string[]> {
  const signalsSnapshot = await db
    .collection('learningSignals')
    .where('timestamp', '>=', since)
    .select('userId')
    .get();
  
  const userIds = new Set<string>();
  signalsSnapshot.forEach((doc) => {
    userIds.add(doc.data().userId);
  });
  
  return Array.from(userIds);
}

async function getDNA(userId: string): Promise<LearningDNA | null> {
  const dnaDoc = await db.collection('learningDNA').doc(userId).get();
  return dnaDoc.exists ? (dnaDoc.data() as LearningDNA) : null;
}

async function checkAndCreateSnapshot(
  userId: string,
  oldDNA: LearningDNA | null,
  newProfile: CognitiveProfile
): Promise<void> {
  if (!oldDNA) return; // First time, no snapshot needed
  
  // Check if dominant style changed
  const dominantChanged = oldDNA.cognitiveProfile.dominantStyle !== newProfile.dominantStyle;
  
  if (dominantChanged) {
    console.log(`Creating snapshot for user ${userId} - dominant style changed`);
    await db.collection('dnaSnapshots').add({
      userId,
      dnaData: oldDNA,
      changesSinceLast: {
        cognitiveProfile: {
          dominantStyle: newProfile.dominantStyle,
        },
      },
      reason: 'significant_change',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
}

async function logMetrics(metrics: any): Promise<void> {
  await db.collection('dnaMetrics').add(metrics);
}

