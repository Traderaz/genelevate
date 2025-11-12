// Admin-side review service functions using Firebase Admin SDK
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { StudentReview } from '@/types/review';

/**
 * Get all reviews with optional filtering (admin only)
 */
export async function getAllReviews(
  status?: 'pending' | 'approved' | 'rejected'
): Promise<StudentReview[]> {
  try {
    let query = adminDb.collection('studentReviews');

    if (status) {
      query = query.where('status', '==', status) as any;
    }

    const snapshot = await query.orderBy('submittedAt', 'desc').get();
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
        featured: data.featured || false,
        featuredAt: data.featuredAt?.toDate(),
        reviewedBy: data.reviewedBy,
        reviewedAt: data.reviewedAt?.toDate(),
      });
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
}

/**
 * Approve a review (admin only)
 */
export async function approveReview(
  reviewId: string,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await adminDb.collection('studentReviews').doc(reviewId).update({
      status: 'approved',
      reviewedBy: adminId,
      reviewedAt: FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error approving review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to approve review',
    };
  }
}

/**
 * Reject a review (admin only)
 */
export async function rejectReview(
  reviewId: string,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await adminDb.collection('studentReviews').doc(reviewId).update({
      status: 'rejected',
      reviewedBy: adminId,
      reviewedAt: FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error rejecting review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reject review',
    };
  }
}

/**
 * Feature a review on homepage (admin only)
 */
export async function featureReview(
  reviewId: string,
  featured: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: any = {
      featured: featured,
    };

    if (featured) {
      updateData.featuredAt = FieldValue.serverTimestamp();
    }

    await adminDb.collection('studentReviews').doc(reviewId).update(updateData);

    return { success: true };
  } catch (error) {
    console.error('Error featuring review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to feature review',
    };
  }
}

/**
 * Delete a review (admin only)
 */
export async function deleteReview(
  reviewId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await adminDb.collection('studentReviews').doc(reviewId).delete();

    return { success: true };
  } catch (error) {
    console.error('Error deleting review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete review',
    };
  }
}

/**
 * Get featured reviews count
 */
export async function getFeaturedReviewsCount(): Promise<number> {
  try {
    const snapshot = await adminDb
      .collection('studentReviews')
      .where('status', '==', 'approved')
      .where('featured', '==', true)
      .get();

    return snapshot.size;
  } catch (error) {
    console.error('Error getting featured reviews count:', error);
    return 0;
  }
}

