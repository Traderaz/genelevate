/**
 * DNA Questionnaire Functions
 * 
 * Handle DNA questionnaire submissions and scoring
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import type {
  DNAQuestionnaire,
  DNAResponse,
  QuestionResponse,
  CognitiveDimension,
} from '@gen-elevate/shared/types/dna';

const db = admin.firestore();

// ============================================================================
// Submit Questionnaire Response
// ============================================================================

export const submitDNAQuestionnaire = functions
  .region('europe-west2')
  .https.onCall(async (data, context) => {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    const userId = context.auth.uid;
    
    // Validate input
    if (!data.questionnaireId || !data.responses) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'questionnaireId and responses are required'
      );
    }
    
    try {
      // Get questionnaire
      const questionnaireDoc = await db
        .collection('dnaQuestionnaires')
        .doc(data.questionnaireId)
        .get();
      
      if (!questionnaireDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Questionnaire not found');
      }
      
      const questionnaire = questionnaireDoc.data() as DNAQuestionnaire;
      
      if (questionnaire.status !== 'active') {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'Questionnaire is not active'
        );
      }
      
      // Calculate explicit scores from responses
      const explicitScores = calculateScoresFromResponses(
        questionnaire,
        data.responses
      );
      
      // Check if response already exists (update vs create)
      const existingResponseQuery = await db
        .collection('dnaResponses')
        .where('userId', '==', userId)
        .where('questionnaireId', '==', data.questionnaireId)
        .limit(1)
        .get();
      
      const isComplete = data.isComplete || false;
      const now = admin.firestore.Timestamp.now();
      
      const responseData: Omit<DNAResponse, 'id'> = {
        userId,
        questionnaireId: data.questionnaireId,
        questionnaireVersion: questionnaire.version,
        responses: data.responses.map((r: any) => ({
          questionId: r.questionId,
          answer: r.answer,
          timestamp: admin.firestore.Timestamp.fromDate(
            r.timestamp ? new Date(r.timestamp) : new Date()
          ),
        })),
        explicitScores,
        startedAt: existingResponseQuery.empty
          ? now
          : existingResponseQuery.docs[0].data().startedAt,
        completedAt: isComplete ? now : null,
        isComplete,
        progressPercentage: calculateProgress(
          data.responses.length,
          questionnaire.questions.length
        ),
        createdAt: existingResponseQuery.empty
          ? now
          : existingResponseQuery.docs[0].data().createdAt,
        updatedAt: now,
      };
      
      let responseId: string;
      
      if (existingResponseQuery.empty) {
        // Create new response
        const newDoc = await db.collection('dnaResponses').add(responseData);
        responseId = newDoc.id;
      } else {
        // Update existing response
        responseId = existingResponseQuery.docs[0].id;
        await db
          .collection('dnaResponses')
          .doc(responseId)
          .set(responseData, { merge: true });
      }
      
      // If completed, trigger immediate DNA recalculation
      if (isComplete) {
        console.log(`Questionnaire completed by user ${userId}, triggering DNA calculation`);
        // Note: This would normally call the calculateUserDNA function
        // For now, we'll let the nightly function handle it
      }
      
      return {
        success: true,
        responseId,
        explicitScores,
        isComplete,
      };
    } catch (error: any) {
      console.error('Error submitting questionnaire:', error);
      
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      
      throw new functions.https.HttpsError('internal', error.message);
    }
  });

// ============================================================================
// Get User's Questionnaire Responses
// ============================================================================

export const getUserDNAResponses = functions
  .region('europe-west2')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    const userId = data.userId || context.auth.uid;
    
    // Check permissions
    const isAdmin = context.auth.token.role === 'admin';
    const isParent = await isParentOf(context.auth.uid, userId);
    
    if (userId !== context.auth.uid && !isAdmin && !isParent) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Cannot access other user\'s responses'
      );
    }
    
    try {
      const responsesSnapshot = await db
        .collection('dnaResponses')
        .where('userId', '==', userId)
        .orderBy('updatedAt', 'desc')
        .get();
      
      const responses = responsesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      return { success: true, responses };
    } catch (error: any) {
      console.error('Error fetching responses:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  });

// ============================================================================
// Create/Update Questionnaire (Admin Only)
// ============================================================================

export const manageDNAQuestionnaire = functions
  .region('europe-west2')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    if (context.auth.token.role !== 'admin') {
      throw new functions.https.HttpsError('permission-denied', 'Admin access required');
    }
    
    const action = data.action; // 'create', 'update', 'activate', 'archive'
    
    try {
      if (action === 'create') {
        const questionnaire: Omit<DNAQuestionnaire, 'id' | 'createdAt' | 'updatedAt'> = {
          version: data.version || '1.0',
          title: data.title,
          description: data.description,
          questions: data.questions,
          targetAgeRange: data.targetAgeRange || null,
          targetYearGroups: data.targetYearGroups || null,
          estimatedMinutes: data.estimatedMinutes || 10,
          status: data.status || 'draft',
        };
        
        const newDoc = await db.collection('dnaQuestionnaires').add({
          ...questionnaire,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        return { success: true, questionnaireId: newDoc.id };
      } else if (action === 'update') {
        if (!data.questionnaireId) {
          throw new functions.https.HttpsError(
            'invalid-argument',
            'questionnaireId required for update'
          );
        }
        
        await db
          .collection('dnaQuestionnaires')
          .doc(data.questionnaireId)
          .update({
            ...data.updates,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        
        return { success: true };
      } else if (action === 'activate' || action === 'archive') {
        if (!data.questionnaireId) {
          throw new functions.https.HttpsError(
            'invalid-argument',
            'questionnaireId required'
          );
        }
        
        await db
          .collection('dnaQuestionnaires')
          .doc(data.questionnaireId)
          .update({
            status: action === 'activate' ? 'active' : 'archived',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        
        return { success: true };
      } else {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'Invalid action'
        );
      }
    } catch (error: any) {
      console.error('Error managing questionnaire:', error);
      
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      
      throw new functions.https.HttpsError('internal', error.message);
    }
  });

// ============================================================================
// Helper Functions
// ============================================================================

function calculateScoresFromResponses(
  questionnaire: DNAQuestionnaire,
  responses: QuestionResponse[]
): Record<CognitiveDimension, number> {
  const scores: Record<CognitiveDimension, number> = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    logical: 0,
    creative: 0,
    social: 0,
    solitary: 0,
  };
  
  const weights: Record<CognitiveDimension, number> = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    logical: 0,
    creative: 0,
    social: 0,
    solitary: 0,
  };
  
  responses.forEach((response) => {
    // Find the question
    const question = questionnaire.questions.find((q) => q.id === response.questionId);
    
    if (!question) return;
    
    // Process based on question type
    if (question.type === 'scale') {
      // Scale questions: answer is a number (e.g., 1-5)
      const scaleValue = typeof response.answer === 'number' ? response.answer : 0;
      const scaleMax = question.scaleMax || 5;
      const normalizedValue = (scaleValue / scaleMax) * 100; // Convert to 0-100
      
      question.affectsDimensions.forEach((dim) => {
        scores[dim.dimension] += normalizedValue * dim.weight;
        weights[dim.dimension] += dim.weight;
      });
    } else if (question.type === 'multiple_choice') {
      // Multiple choice: answer is option ID
      const selectedOption = question.options?.find((opt) => opt.id === response.answer);
      
      if (selectedOption) {
        Object.entries(selectedOption.scores).forEach(([dimension, score]) => {
          const dim = dimension as CognitiveDimension;
          scores[dim] += score;
          weights[dim] += 1;
        });
      }
    } else if (question.type === 'ranking') {
      // Ranking: answer is array of ranked items
      if (Array.isArray(response.answer)) {
        response.answer.forEach((item, index) => {
          // Higher rank (lower index) = more weight
          const rankWeight = response.answer.length - index;
          
          question.affectsDimensions.forEach((dim) => {
            scores[dim.dimension] += rankWeight * dim.weight;
            weights[dim.dimension] += dim.weight;
          });
        });
      }
    }
  });
  
  // Normalize scores by weights
  Object.keys(scores).forEach((key) => {
    const dim = key as CognitiveDimension;
    if (weights[dim] > 0) {
      scores[dim] = Math.round((scores[dim] / weights[dim]));
    } else {
      scores[dim] = 0;
    }
  });
  
  return scores;
}

function calculateProgress(answeredCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((answeredCount / totalCount) * 100);
}

async function isParentOf(parentUserId: string, studentUserId: string): Promise<boolean> {
  const parentDoc = await db.collection('users').doc(parentUserId).get();
  
  if (!parentDoc.exists) return false;
  
  const parentData = parentDoc.data();
  const linkedStudents = parentData?.linkedStudents || [];
  
  return linkedStudents.includes(studentUserId);
}

