export interface SuccessStory {
  id: string;
  studentName: string;
  achievement: string;
  story: string;
  imageUrl: string;
  order: number;
  grade?: string;
  subject?: string;
  university?: string;
  beforeAfter?: {
    before: string; // e.g., "Grade C"
    after: string;  // e.g., "Grade A*"
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

