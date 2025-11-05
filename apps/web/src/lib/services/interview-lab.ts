import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Types
export interface InterviewQuestion {
  id: string;
  question: string;
  description?: string;
  createdBy: string;
  createdAt: Timestamp;
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
  submittedAt: Timestamp;
  expiresAt: Timestamp; // Auto-delete after 60 days
  feedback?: {
    strengths: string;
    improvements: string;
    rating?: number;
    providedBy: string;
    providedAt: Timestamp;
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
    const questionsSnapshot = await getDocs(collection(db, 'interviewQuestions'));
    const maxOrder = questionsSnapshot.docs.reduce((max, doc) => {
      const order = doc.data().order || 0;
      return order > max ? order : max;
    }, 0);

    const docRef = await addDoc(collection(db, 'interviewQuestions'), {
      question: data.question,
      description: data.description || '',
      createdBy: createdBy,
      createdAt: serverTimestamp(),
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
    const questionRef = doc(db, 'interviewQuestions', questionId);
    await updateDoc(questionRef, {
      ...data,
      updatedAt: serverTimestamp(),
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
    const responsesQuery = query(
      collection(db, 'interviewResponses'),
      where('questionId', '==', questionId)
    );
    const responsesSnapshot = await getDocs(responsesQuery);

    if (!responsesSnapshot.empty) {
      throw new Error('Cannot delete question with existing responses');
    }

    await deleteDoc(doc(db, 'interviewQuestions', questionId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting interview question:', error);
    throw error;
  }
}

// Get All Interview Questions
export async function getInterviewQuestions(activeOnly: boolean = false) {
  try {
    let q;
    
    if (activeOnly) {
      // Filter by active first, then sort client-side to avoid composite index
      q = query(
        collection(db, 'interviewQuestions'),
        where('active', '==', true)
      );
    } else {
      q = query(
        collection(db, 'interviewQuestions'),
        orderBy('order', 'asc')
      );
    }

    const snapshot = await getDocs(q);
    const questions: InterviewQuestion[] = [];

    snapshot.forEach((doc) => {
      questions.push({
        id: doc.id,
        ...doc.data(),
      } as InterviewQuestion);
    });

    // Sort client-side if we filtered by active
    if (activeOnly) {
      questions.sort((a, b) => a.order - b.order);
    }

    return questions;
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    return [];
  }
}

// Get Single Interview Question
export async function getInterviewQuestion(questionId: string) {
  try {
    const docRef = doc(db, 'interviewQuestions', questionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
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

// STUDENT: Submit Interview Response (metadata only - video uploaded separately)
export async function submitInterviewResponse(data: {
  questionId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  videoUrl: string;
  videoPath: string;
}) {
  try {
    const now = Timestamp.now();
    const expiresAt = Timestamp.fromMillis(now.toMillis() + 60 * 24 * 60 * 60 * 1000); // 60 days

    const docRef = await addDoc(collection(db, 'interviewResponses'), {
      questionId: data.questionId,
      studentId: data.studentId,
      studentName: data.studentName,
      studentEmail: data.studentEmail,
      videoUrl: data.videoUrl,
      videoPath: data.videoPath,
      submittedAt: now,
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
    const responseRef = doc(db, 'interviewResponses', responseId);
    await updateDoc(responseRef, {
      feedback: {
        ...feedback,
        providedAt: serverTimestamp(),
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
    let q = query(
      collection(db, 'interviewResponses'),
      orderBy('submittedAt', 'desc')
    );

    if (questionId) {
      q = query(q, where('questionId', '==', questionId));
    }

    const snapshot = await getDocs(q);
    const responses: InterviewResponse[] = [];

    snapshot.forEach((doc) => {
      responses.push({
        id: doc.id,
        ...doc.data(),
      } as InterviewResponse);
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
    const q = query(
      collection(db, 'interviewResponses'),
      where('studentId', '==', studentId),
      orderBy('submittedAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const responses: InterviewResponse[] = [];

    snapshot.forEach((doc) => {
      responses.push({
        id: doc.id,
        ...doc.data(),
      } as InterviewResponse);
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
    const docRef = doc(db, 'interviewResponses', responseId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    // Mark as viewed if not already
    if (!docSnap.data().viewed) {
      await updateDoc(docRef, { viewed: true });
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

// SYSTEM: Delete Expired Responses (run via Cloud Function or cron)
export async function deleteExpiredInterviewResponses() {
  try {
    const now = Timestamp.now();
    const q = query(
      collection(db, 'interviewResponses'),
      where('expiresAt', '<=', now)
    );

    const snapshot = await getDocs(q);
    const deletePromises: Promise<void>[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      
      // Delete video from storage
      if (data.videoPath) {
        const videoRef = ref(storage, data.videoPath);
        deletePromises.push(
          deleteObject(videoRef).catch((error) => {
            console.error(`Failed to delete video: ${data.videoPath}`, error);
          })
        );
      }

      // Delete Firestore document
      deletePromises.push(deleteDoc(doc(db, 'interviewResponses', docSnap.id)));
    });

    await Promise.all(deletePromises);

    console.log(`Deleted ${snapshot.size} expired interview responses`);
    return { success: true, deletedCount: snapshot.size };
  } catch (error) {
    console.error('Error deleting expired interview responses:', error);
    throw new Error('Failed to delete expired responses');
  }
}

// ADMIN: Manually Delete Response and Video
export async function deleteInterviewResponse(responseId: string) {
  try {
    const responseRef = doc(db, 'interviewResponses', responseId);
    const responseSnap = await getDoc(responseRef);

    if (!responseSnap.exists()) {
      throw new Error('Response not found');
    }

    const data = responseSnap.data();

    // Delete video from storage
    if (data.videoPath) {
      const videoRef = ref(storage, data.videoPath);
      await deleteObject(videoRef).catch((error) => {
        console.error(`Failed to delete video: ${data.videoPath}`, error);
      });
    }

    // Delete Firestore document
    await deleteDoc(responseRef);

    return { success: true };
  } catch (error) {
    console.error('Error deleting interview response:', error);
    throw error;
  }
}

// Get Response Statistics
export async function getInterviewStatistics() {
  try {
    const [questionsSnapshot, responsesSnapshot] = await Promise.all([
      getDocs(collection(db, 'interviewQuestions')),
      getDocs(collection(db, 'interviewResponses')),
    ]);

    const activeQuestions = questionsSnapshot.docs.filter(
      (doc) => doc.data().active
    ).length;

    const totalResponses = responsesSnapshot.size;
    const withFeedback = responsesSnapshot.docs.filter(
      (doc) => doc.data().feedback
    ).length;
    const unviewed = responsesSnapshot.docs.filter(
      (doc) => !doc.data().viewed
    ).length;

    return {
      totalQuestions: questionsSnapshot.size,
      activeQuestions,
      totalResponses,
      withFeedback,
      unviewed,
      pendingFeedback: totalResponses - withFeedback,
    };
  } catch (error) {
    console.error('Error fetching interview statistics:', error);
    return {
      totalQuestions: 0,
      activeQuestions: 0,
      totalResponses: 0,
      withFeedback: 0,
      unviewed: 0,
      pendingFeedback: 0,
    };
  }
}
