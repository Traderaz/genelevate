export type ID = string;

export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type FirestoreTimestamp = Timestamp;

export interface BaseEntity {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type YearGroup = 
  | 'year-6'
  | 'year-7'
  | 'year-8' 
  | 'year-9'
  | 'year-10'
  | 'year-11'
  | 'year-12'
  | 'year-13';

export type Subject = 
  | 'mathematics'
  | 'english'
  | 'science'
  | 'history'
  | 'geography'
  | 'modern-languages'
  | 'computer-science'
  | 'business'
  | 'economics'
  | 'psychology'
  | 'sociology'
  | 'philosophy'
  | 'art'
  | 'music'
  | 'drama'
  | 'physical-education'
  | 'life-skills'
  | 'careers'
  | 'wellbeing';

export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'school';

export type UserRole = 'admin' | 'institution' | 'student' | 'parent' | 'content-creator';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
