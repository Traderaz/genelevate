export interface StudentReview {
  id: string;
  studentId: string;
  studentName: string;
  yearGroup: string; // e.g., "Year 11", "Year 13"
  subject?: string; // e.g., "Mathematics & Physics"
  rating: number; // 1-5
  reviewText: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean; // Admin chooses which reviews to feature on homepage
  featuredAt?: Date;
  reviewedBy?: string; // Admin who approved/rejected
  reviewedAt?: Date;
}

export interface ReviewFormData {
  rating: number;
  subject?: string;
  reviewText: string;
}

