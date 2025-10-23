/**
 * Learning Signal Tracking
 * 
 * Functions to track and record student behavioral data
 * for DNA profile calculation
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import type { LearningSignal, LearningSignalType } from '@gen-elevate/shared/types/dna';

const db = admin.firestore();

// ============================================================================
// Track Learning Signal (Callable Function)
// ============================================================================

export const trackLearningSignal = functions
  .region('europe-west2')
  .https.onCall(async (data, context) => {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    const userId = context.auth.uid;
    
    // Validate required fields
    if (!data.type) {
      throw new functions.https.HttpsError('invalid-argument', 'Signal type is required');
    }
    
    // Check if user has consented to tracking
    const dnaDoc = await db.collection('learningDNA').doc(userId).get();
    if (dnaDoc.exists) {
      const dna = dnaDoc.data();
      if (!dna?.consent?.dataCollection) {
        // User has opted out, silently skip
        return { success: true, tracked: false, reason: 'user_opted_out' };
      }
    }
    
    try {
      const now = new Date();
      
      const signal: Omit<LearningSignal, 'id' | 'createdAt'> = {
        userId,
        type: data.type as LearningSignalType,
        
        subject: data.subject || null,
        topic: data.topic || null,
        courseId: data.courseId || null,
        
        timestamp: admin.firestore.Timestamp.fromDate(now) as any,
        duration: data.duration || null,
        hourOfDay: now.getHours(),
        dayOfWeek: getDayOfWeek(now.getDay()),
        
        score: data.score || null,
        completed: data.completed || false,
        engagementLevel: data.engagementLevel || null,
        
        mediaType: data.mediaType || null,
        interactionType: data.interactionType || null,
        
        sessionId: data.sessionId || null,
        deviceType: data.deviceType || detectDeviceType(context),
      };
      
      await db.collection('learningSignals').add({
        ...signal,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      return { success: true, tracked: true };
    } catch (error: any) {
      console.error('Error tracking learning signal:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  });

// ============================================================================
// Batch Track Signals (for bulk operations)
// ============================================================================

export const batchTrackSignals = functions
  .region('europe-west2')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    const userId = context.auth.uid;
    const signals = data.signals;
    
    if (!Array.isArray(signals) || signals.length === 0) {
      throw new functions.https.HttpsError('invalid-argument', 'Signals array is required');
    }
    
    if (signals.length > 100) {
      throw new functions.https.HttpsError('invalid-argument', 'Maximum 100 signals per batch');
    }
    
    // Check consent
    const dnaDoc = await db.collection('learningDNA').doc(userId).get();
    if (dnaDoc.exists) {
      const dna = dnaDoc.data();
      if (!dna?.consent?.dataCollection) {
        return { success: true, tracked: false, reason: 'user_opted_out' };
      }
    }
    
    try {
      const batch = db.batch();
      const now = new Date();
      
      signals.forEach((signalData: any) => {
        const signalRef = db.collection('learningSignals').doc();
        
        const signal = {
          userId,
          type: signalData.type,
          subject: signalData.subject || null,
          topic: signalData.topic || null,
          courseId: signalData.courseId || null,
          timestamp: admin.firestore.Timestamp.fromDate(
            signalData.timestamp ? new Date(signalData.timestamp) : now
          ),
          duration: signalData.duration || null,
          hourOfDay: signalData.timestamp
            ? new Date(signalData.timestamp).getHours()
            : now.getHours(),
          dayOfWeek: signalData.timestamp
            ? getDayOfWeek(new Date(signalData.timestamp).getDay())
            : getDayOfWeek(now.getDay()),
          score: signalData.score || null,
          completed: signalData.completed || false,
          engagementLevel: signalData.engagementLevel || null,
          mediaType: signalData.mediaType || null,
          interactionType: signalData.interactionType || null,
          sessionId: signalData.sessionId || null,
          deviceType: signalData.deviceType || detectDeviceType(context),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        
        batch.set(signalRef, signal);
      });
      
      await batch.commit();
      
      return { success: true, tracked: signals.length };
    } catch (error: any) {
      console.error('Error batch tracking signals:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  });

// ============================================================================
// Automatic Signal Tracking (Firestore Triggers)
// ============================================================================

/**
 * Track quiz completion automatically
 */
export const onQuizComplete = functions
  .region('europe-west2')
  .firestore.document('quizAttempts/{attemptId}')
  .onCreate(async (snap, context) => {
    const attempt = snap.data();
    
    if (!attempt.completed) return;
    
    const userId = attempt.userId;
    const now = new Date();
    
    await db.collection('learningSignals').add({
      userId,
      type: 'quiz_complete',
      subject: attempt.subject || null,
      topic: attempt.topic || null,
      courseId: attempt.courseId || null,
      timestamp: admin.firestore.Timestamp.fromDate(now),
      duration: attempt.duration || null,
      hourOfDay: now.getHours(),
      dayOfWeek: getDayOfWeek(now.getDay()),
      score: attempt.score || null,
      completed: true,
      engagementLevel: calculateEngagement(attempt.score, attempt.duration),
      mediaType: 'interactive',
      interactionType: 'doing',
      sessionId: attempt.sessionId || null,
      deviceType: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

/**
 * Track course enrollment
 */
export const onCourseEnroll = functions
  .region('europe-west2')
  .firestore.document('enrollments/{enrollmentId}')
  .onCreate(async (snap, context) => {
    const enrollment = snap.data();
    const userId = enrollment.userId;
    const now = new Date();
    
    await db.collection('learningSignals').add({
      userId,
      type: 'course_view',
      subject: enrollment.subject || null,
      courseId: enrollment.courseId || null,
      timestamp: admin.firestore.Timestamp.fromDate(now),
      hourOfDay: now.getHours(),
      dayOfWeek: getDayOfWeek(now.getDay()),
      completed: false,
      mediaType: null,
      interactionType: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

/**
 * Track webinar attendance
 */
export const onWebinarJoin = functions
  .region('europe-west2')
  .firestore.document('webinarAttendance/{attendanceId}')
  .onCreate(async (snap, context) => {
    const attendance = snap.data();
    const userId = attendance.userId;
    const now = new Date();
    
    // Get webinar details
    const webinarDoc = await db.collection('webinars').doc(attendance.webinarId).get();
    const webinar = webinarDoc.data();
    
    await db.collection('learningSignals').add({
      userId,
      type: 'webinar_join',
      subject: webinar?.category || null,
      topic: webinar?.title || null,
      timestamp: admin.firestore.Timestamp.fromDate(now),
      duration: attendance.duration || null,
      hourOfDay: now.getHours(),
      dayOfWeek: getDayOfWeek(now.getDay()),
      completed: attendance.completed || false,
      engagementLevel: attendance.engagementScore || null,
      mediaType: 'video',
      interactionType: 'watching',
      sessionId: attendance.webinarId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

// ============================================================================
// Helper Functions
// ============================================================================

function getDayOfWeek(dayIndex: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
}

function detectDeviceType(context: functions.https.CallableContext): string {
  // Try to detect from user agent if available
  // This is a simple heuristic
  return 'web'; // Default, can be enhanced
}

function calculateEngagement(score: number | null, duration: number | null): number {
  let engagement = 50; // Base
  
  if (score !== null) {
    engagement = score; // Score is a good engagement indicator
  }
  
  if (duration !== null) {
    // Longer duration generally means higher engagement (up to a point)
    const durationMinutes = duration / 60;
    if (durationMinutes > 30) {
      engagement = Math.min(100, engagement + 10);
    } else if (durationMinutes < 5) {
      engagement = Math.max(0, engagement - 10);
    }
  }
  
  return Math.round(engagement);
}

