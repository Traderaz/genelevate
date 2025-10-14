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

export interface LessonProgress extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  userId: string;
  courseId: string;
  lessonId: string;
  moduleId: string;
  
  // Progress tracking
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number; // 0-100 percentage
  timeSpent: number; // seconds
  
  // Interaction tracking
  interactions: LessonInteraction[];
  
  // Quiz/Assignment results
  quizAttempts: QuizAttempt[];
  bestQuizScore?: number;
  assignmentSubmission?: AssignmentSubmission;
  
  // Points & Rewards
  pointsEarned: number;
  badgesEarned: string[];
  
  // Timestamps
  startedAt?: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
}

export interface LessonInteraction {
  type: 'video_play' | 'video_pause' | 'video_seek' | 'text_scroll' | 'quiz_start' | 'quiz_submit' | 'resource_download';
  timestamp: Date;
  data?: Record<string, any>; // Additional context data
}

export interface QuizAttempt extends BaseEntity {
  userId: string;
  quizId: string;
  lessonId: string;
  courseId: string;
  
  // Attempt data
  answers: QuizAnswer[];
  score: number; // percentage
  pointsEarned: number;
  timeSpent: number; // seconds
  
  // Status
  status: 'in_progress' | 'completed' | 'abandoned';
  
  // Timestamps
  startedAt: Date;
  completedAt?: Date;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[]; // Support multiple answers
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent?: number; // seconds on this question
}

export interface AssignmentSubmission extends BaseEntity {
  userId: string;
  assignmentId: string;
  lessonId: string;
  courseId: string;
  
  // Submission data
  submissionType: 'text' | 'file' | 'url';
  content?: string; // For text submissions
  fileUrl?: string; // For file submissions
  submissionUrl?: string; // For URL submissions
  
  // Grading
  status: 'submitted' | 'graded' | 'returned';
  score?: number;
  maxScore: number;
  feedback?: string;
  rubricScores?: Record<string, number>;
  
  // Timestamps
  submittedAt: Date;
  gradedAt?: Date;
  dueDate?: Date;
}

export interface CourseProgress extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  userId: string;
  courseId: string;
  
  // Overall progress
  overallProgress: number; // 0-100 percentage
  completedModules: string[];
  completedLessons: string[];
  currentModuleId?: string;
  currentLessonId?: string;
  
  // Performance metrics
  totalPointsEarned: number;
  totalPointsAvailable: number;
  averageQuizScore: number;
  totalTimeSpent: number; // seconds
  
  // Streaks & Engagement
  currentStreak: number; // consecutive days
  longestStreak: number;
  lastActivityDate: Date;
  
  // Completion tracking
  estimatedCompletionDate?: Date;
  actualCompletionDate?: Date;
  
  // Certificates & Achievements
  certificateEarned?: boolean;
  certificateUrl?: string;
  badgesEarned: string[];
  milestonesReached: string[];
}
