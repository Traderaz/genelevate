// Client-side review service functions
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { StudentReview, ReviewFormData } from '@/types/review';

/**
 * Submit a new review (student-facing)
 */
export async function submitReview(
  userId: string,
  userName: string,
  yearGroup: string,
  reviewData: ReviewFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    await addDoc(collection(db, 'studentReviews'), {
      studentId: userId,
      studentName: userName,
      yearGroup: yearGroup,
      subject: reviewData.subject || '',
      rating: reviewData.rating,
      reviewText: reviewData.reviewText,
      submittedAt: serverTimestamp(),
      status: 'pending',
      featured: false,
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting review:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit review' 
    };
  }
}

/**
 * Get featured reviews for homepage (public)
 */
export async function getFeaturedReviews(): Promise<StudentReview[]> {
  try {
    const q = query(
      collection(db, 'studentReviews'),
      where('status', '==', 'approved'),
      where('featured', '==', true),
      orderBy('featuredAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const reviews: StudentReview[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        studentId: data.studentId,
        studentName: data.studentName,
        yearGroup: data.yearGroup,
        subject: data.subject,
        rating: data.rating,
        reviewText: data.reviewText,
        submittedAt: data.submittedAt?.toDate() || new Date(),
        status: data.status,
        featured: data.featured,
        featuredAt: data.featuredAt?.toDate(),
        reviewedBy: data.reviewedBy,
        reviewedAt: data.reviewedAt?.toDate(),
      });
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
    return [];
  }
}

/**
 * Check if user has already submitted a review
 */
export async function hasUserSubmittedReview(userId: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'studentReviews'),
      where('studentId', '==', userId)
    );

    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking user review:', error);
    return false;
  }
}

