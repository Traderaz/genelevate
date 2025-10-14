import { BaseEntity, YearGroup, Subject } from './common';

export interface Course extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string; // null for global courses
  
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  
  // Academic Info
  subject: Subject;
  yearGroups: YearGroup[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // Content
  modules: CourseModule[];
  totalDuration: number; // minutes
  totalLessons: number;
  
  // Metadata
  instructor: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  
  // Status
  status: 'draft' | 'published' | 'archived';
  isPublic: boolean;
  isFeatured: boolean;
  
  // Access control
  accessLevel: 'public' | 'institution' | 'cohort' | 'premium';
  allowedCohortIds: string[];
  
  // Engagement
  enrollmentCount: number;
  completionRate: number;
  averageRating: number;
  reviewCount: number;
  
  // Requirements
  prerequisites: string[];
  learningOutcomes: string[];
  
  // Pricing (for premium content)
  isPremium: boolean;
  price?: number;
}

export interface CourseModule extends BaseEntity {
  courseId: string;
  title: string;
  description: string;
  order: number;
  
  // Content
  lessons: Lesson[];
  duration: number; // minutes
  
  // Requirements
  isLocked: boolean;
  unlockConditions?: {
    previousModuleId?: string;
    minimumScore?: number;
    requiredLessons?: string[];
  };
}

export interface Lesson extends BaseEntity {
  moduleId: string;
  title: string;
  description: string;
  order: number;
  
  // Content
  type: 'video' | 'text' | 'interactive' | 'quiz' | 'assignment';
  content: LessonContent;
  duration: number; // minutes
  
  // Status
  isPublished: boolean;
  isOptional: boolean;
}

export type LessonContent = 
  | VideoContent
  | TextContent
  | InteractiveContent
  | QuizContent
  | AssignmentContent;

export interface VideoContent {
  type: 'video';
  videoUrl: string;
  transcript?: string;
  captions?: string;
  thumbnailUrl?: string;
}

export interface TextContent {
  type: 'text';
  content: string; // Markdown or HTML
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface InteractiveContent {
  type: 'interactive';
  embedUrl: string;
  instructions: string;
}

export interface QuizContent {
  type: 'quiz';
  questions: QuizQuestion[];
  passingScore: number;
  allowRetakes: boolean;
  timeLimit?: number; // minutes
}

export interface AssignmentContent {
  type: 'assignment';
  instructions: string;
  submissionType: 'text' | 'file' | 'url';
  maxScore: number;
  dueDate?: Date;
  rubric?: AssignmentRubric[];
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface AssignmentRubric {
  criteria: string;
  description: string;
  maxPoints: number;
}

export interface CourseEnrollment extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  userId: string;
  courseId: string;
  
  // Progress
  status: 'enrolled' | 'in-progress' | 'completed' | 'dropped';
  progress: number; // percentage
  completedLessons: string[];
  currentLessonId?: string;
  
  // Performance
  totalScore: number;
  maxScore: number;
  quizScores: Record<string, number>;
  assignmentScores: Record<string, number>;
  
  // Context
  cohortId?: string;
  enrollmentSource: 'self' | 'institution' | 'cohort' | 'referral';
  
  // Timestamps
  enrolledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  lastAccessedAt?: Date;
}

export interface CourseReview extends BaseEntity {
  userId: string;
  courseId: string;
  rating: number; // 1-5
  review?: string;
  isPublic: boolean;
  isVerified: boolean;
}
