import { z } from 'zod';
import { baseEntitySchema, yearGroupSchema, subjectSchema } from './common';

export const courseInstructorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().url().optional(),
  bio: z.string().optional()
});

export const quizQuestionSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple-choice', 'true-false', 'short-answer', 'essay']),
  question: z.string().min(1),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().optional(),
  points: z.number().min(0)
});

export const assignmentRubricSchema = z.object({
  criteria: z.string(),
  description: z.string(),
  maxPoints: z.number().min(0)
});

export const videoContentSchema = z.object({
  type: z.literal('video'),
  videoUrl: z.string().url(),
  transcript: z.string().optional(),
  captions: z.string().optional(),
  thumbnailUrl: z.string().url().optional()
});

export const textContentSchema = z.object({
  type: z.literal('text'),
  content: z.string().min(1),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    type: z.string()
  })).optional()
});

export const interactiveContentSchema = z.object({
  type: z.literal('interactive'),
  embedUrl: z.string().url(),
  instructions: z.string()
});

export const quizContentSchema = z.object({
  type: z.literal('quiz'),
  questions: z.array(quizQuestionSchema),
  passingScore: z.number().min(0).max(100),
  allowRetakes: z.boolean(),
  timeLimit: z.number().min(1).optional()
});

export const assignmentContentSchema = z.object({
  type: z.literal('assignment'),
  instructions: z.string().min(1),
  submissionType: z.enum(['text', 'file', 'url']),
  maxScore: z.number().min(0),
  dueDate: z.date().optional(),
  rubric: z.array(assignmentRubricSchema).optional()
});

export const lessonContentSchema = z.discriminatedUnion('type', [
  videoContentSchema,
  textContentSchema,
  interactiveContentSchema,
  quizContentSchema,
  assignmentContentSchema
]);

export const lessonSchema = baseEntitySchema.extend({
  moduleId: z.string(),
  title: z.string().min(1).max(200),
  description: z.string(),
  order: z.number().min(0),
  
  type: z.enum(['video', 'text', 'interactive', 'quiz', 'assignment']),
  content: lessonContentSchema,
  duration: z.number().min(0),
  
  isPublished: z.boolean(),
  isOptional: z.boolean()
});

export const courseModuleSchema = baseEntitySchema.extend({
  courseId: z.string(),
  title: z.string().min(1).max(200),
  description: z.string(),
  order: z.number().min(0),
  
  lessons: z.array(lessonSchema),
  duration: z.number().min(0),
  
  isLocked: z.boolean(),
  unlockConditions: z.object({
    previousModuleId: z.string().optional(),
    minimumScore: z.number().min(0).max(100).optional(),
    requiredLessons: z.array(z.string()).optional()
  }).optional()
});

export const courseSchema = baseEntitySchema.extend({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  shortDescription: z.string().min(1).max(500),
  thumbnail: z.string().url(),
  
  subject: subjectSchema,
  yearGroups: z.array(yearGroupSchema).min(1),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  
  modules: z.array(courseModuleSchema),
  totalDuration: z.number().min(0),
  totalLessons: z.number().min(0),
  
  instructor: courseInstructorSchema,
  
  status: z.enum(['draft', 'published', 'archived']),
  isPublic: z.boolean(),
  isFeatured: z.boolean(),
  
  enrollmentCount: z.number().min(0),
  completionRate: z.number().min(0).max(100),
  averageRating: z.number().min(0).max(5),
  reviewCount: z.number().min(0),
  
  prerequisites: z.array(z.string()),
  learningOutcomes: z.array(z.string()),
  
  isPremium: z.boolean(),
  price: z.number().min(0).optional()
});

export const courseEnrollmentSchema = baseEntitySchema.extend({
  userId: z.string(),
  courseId: z.string(),
  
  status: z.enum(['enrolled', 'in-progress', 'completed', 'dropped']),
  progress: z.number().min(0).max(100),
  completedLessons: z.array(z.string()),
  currentLessonId: z.string().optional(),
  
  totalScore: z.number().min(0),
  maxScore: z.number().min(0),
  quizScores: z.record(z.string(), z.number()),
  assignmentScores: z.record(z.string(), z.number()),
  
  enrolledAt: z.date(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  lastAccessedAt: z.date().optional()
});

export const courseReviewSchema = baseEntitySchema.extend({
  userId: z.string(),
  courseId: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string().optional(),
  isPublic: z.boolean(),
  isVerified: z.boolean()
});

// Form validation schemas
export const createCourseSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  shortDescription: z.string().min(1).max(500),
  subject: subjectSchema,
  yearGroups: z.array(yearGroupSchema).min(1),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  prerequisites: z.array(z.string()),
  learningOutcomes: z.array(z.string()),
  isPremium: z.boolean(),
  price: z.number().min(0).optional()
});

export const enrollInCourseSchema = z.object({
  courseId: z.string()
});

export const submitCourseReviewSchema = z.object({
  courseId: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string().max(1000).optional()
});
