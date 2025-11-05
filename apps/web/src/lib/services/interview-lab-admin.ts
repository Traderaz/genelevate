import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// Types (matching client-side types)
export interface InterviewQuestion {
  id: string;
  question: string;
  description?: string;
  createdBy: string;
  createdAt: any;
  active: boolean;
  order: number;
}

export interface InterviewResponse {
  id: string;
  questionId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  videoUrl: string;
  videoPath: string;
  submittedAt: any;
  expiresAt: any;
  feedback?: {
    strengths: string;
    improvements: string;
    rating?: number;
    providedBy: string;
    providedAt: any;
  };
  viewed: boolean;
}

// ADMIN: Create Interview Question
export async function createInterviewQuestion(
  createdBy: string,
  data: {
    question: string;
    description?: string;
    active?: boolean;
    order?: number;
  }
) {
  try {
    // Get current max order
    const questionsSnapshot = await adminDb.collection('interviewQuestions').get();
    const maxOrder = questionsSnapshot.docs.reduce((max, doc) => {
      const order = doc.data().order || 0;
      return order > max ? order : max;
    }, 0);

    const docRef = await adminDb.collection('interviewQuestions').add({
      question: data.question,
      description: data.description || '',
      createdBy: createdBy,
      createdAt: FieldValue.serverTimestamp(),
      active: data.active ?? true,
      order: data.order ?? maxOrder + 1,
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating interview question:', error);
    throw new Error('Failed to create interview question');
  }
}

// ADMIN: Update Interview Question
export async function updateInterviewQuestion(
  questionId: string,
  data: {
    question?: string;
    description?: string;
    active?: boolean;
    order?: number;
  }
) {
  try {
    await adminDb.collection('interviewQuestions').doc(questionId).update({
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating interview question:', error);
    throw new Error('Failed to update interview question');
  }
}

// ADMIN: Delete Interview Question
export async function deleteInterviewQuestion(questionId: string) {
  try {
    // Check if there are any responses for this question
    const responsesSnapshot = await adminDb
      .collection('interviewResponses')
      .where('questionId', '==', questionId)
      .get();

    if (!responsesSnapshot.empty) {
      throw new Error('Cannot delete question with existing responses');
    }

    await adminDb.collection('interviewQuestions').doc(questionId).delete();
    return { success: true };
  } catch (error) {
    console.error('Error deleting interview question:', error);
    throw error;
  }
}

// Get All Interview Questions
export async function getInterviewQuestions(activeOnly: boolean = false) {
  try {
    let query = adminDb.collection('interviewQuestions');
    
    if (activeOnly) {
      query = query.where('active', '==', true) as any;
    }

    const snapshot = await query.get();
    const questions: InterviewQuestion[] = [];

    snapshot.forEach((doc) => {
      questions.push({
        id: doc.id,
        ...doc.data(),
      } as InterviewQuestion);
    });

    // Sort by order
    questions.sort((a, b) => a.order - b.order);

    return questions;
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    return [];
  }
}

// Get Single Interview Question
export async function getInterviewQuestion(questionId: string) {
  try {
    const docSnap = await adminDb.collection('interviewQuestions').doc(questionId).get();

    if (!docSnap.exists) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as InterviewQuestion;
  } catch (error) {
    console.error('Error fetching interview question:', error);
    return null;
  }
}

// STUDENT: Submit Interview Response
export async function submitInterviewResponse(data: {
  questionId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  videoUrl: string;
  videoPath: string;
}) {
  try {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000); // 60 days

    const docRef = await adminDb.collection('interviewResponses').add({
      questionId: data.questionId,
      studentId: data.studentId,
      studentName: data.studentName,
      studentEmail: data.studentEmail,
      videoUrl: data.videoUrl,
      videoPath: data.videoPath,
      submittedAt: FieldValue.serverTimestamp(),
      expiresAt: expiresAt,
      viewed: false,
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting interview response:', error);
    throw new Error('Failed to submit interview response');
  }
}

// ADMIN: Add Feedback to Response
export async function addInterviewFeedback(
  responseId: string,
  feedback: {
    strengths: string;
    improvements: string;
    rating?: number;
    providedBy: string;
  }
) {
  try {
    await adminDb.collection('interviewResponses').doc(responseId).update({
      feedback: {
        ...feedback,
        providedAt: FieldValue.serverTimestamp(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding interview feedback:', error);
    throw new Error('Failed to add feedback');
  }
}

// ADMIN: Get All Responses (optionally filtered by question)
export async function getInterviewResponses(questionId?: string) {
  try {
    let query = adminDb.collection('interviewResponses');

    if (questionId) {
      query = query.where('questionId', '==', questionId) as any;
    }

    const snapshot = await query.get();
    const responses: InterviewResponse[] = [];

    snapshot.forEach((doc) => {
      responses.push({
        id: doc.id,
        ...doc.data(),
      } as InterviewResponse);
    });

    // Sort by submittedAt descending
    responses.sort((a, b) => {
      const aTime = a.submittedAt?.toDate?.() || new Date(0);
      const bTime = b.submittedAt?.toDate?.() || new Date(0);
      return bTime.getTime() - aTime.getTime();
    });

    return responses;
  } catch (error) {
    console.error('Error fetching interview responses:', error);
    return [];
  }
}

// STUDENT: Get Own Responses
export async function getStudentInterviewResponses(studentId: string) {
  try {
    const snapshot = await adminDb
      .collection('interviewResponses')
      .where('studentId', '==', studentId)
      .get();

    const responses: InterviewResponse[] = [];

    snapshot.forEach((doc) => {
      responses.push({
        id: doc.id,
        ...doc.data(),
      } as InterviewResponse);
    });

    // Sort by submittedAt descending
    responses.sort((a, b) => {
      const aTime = a.submittedAt?.toDate?.() || new Date(0);
      const bTime = b.submittedAt?.toDate?.() || new Date(0);
      return bTime.getTime() - aTime.getTime();
    });

    return responses;
  } catch (error) {
    console.error('Error fetching student interview responses:', error);
    return [];
  }
}

// Get Single Response
export async function getInterviewResponse(responseId: string) {
  try {
    const docRef = adminDb.collection('interviewResponses').doc(responseId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    // Mark as viewed if not already
    if (!docSnap.data()?.viewed) {
      await docRef.update({ viewed: true });
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as InterviewResponse;
  } catch (error) {
    console.error('Error fetching interview response:', error);
    return null;
  }
}

// ADMIN: Manually Delete Response
export async function deleteInterviewResponse(responseId: string) {
  try {
    await adminDb.collection('interviewResponses').doc(responseId).delete();
    return { success: true };
  } catch (error) {
    console.error('Error deleting interview response:', error);
    throw error;
  }
}

