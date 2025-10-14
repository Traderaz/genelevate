import { z } from 'zod';
import { baseEntitySchema, yearGroupSchema, userRoleSchema, subscriptionTierSchema, subjectSchema } from './common';

export const userPreferencesSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    webinar: z.boolean(),
    course: z.boolean(),
    debate: z.boolean()
  }),
  privacy: z.object({
    profileVisible: z.boolean(),
    progressVisible: z.boolean(),
    leaderboardVisible: z.boolean()
  }),
  learning: z.object({
    preferredStudyTime: z.enum(['morning', 'afternoon', 'evening']),
    difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']),
    learningStyle: z.enum(['visual', 'auditory', 'kinesthetic', 'reading'])
  })
});

export const academicDNASchema = z.object({
  cognitiveStrengths: z.array(z.string()),
  bestStudyHours: z.array(z.string()),
  subjectAffinities: z.record(subjectSchema, z.number().min(0).max(1)),
  learningPatterns: z.object({
    focusSpan: z.number().min(1),
    retentionRate: z.number().min(0).max(100),
    preferredContentType: z.enum(['video', 'text', 'interactive', 'mixed'])
  }),
  lastUpdated: z.date()
});

export const badgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  category: z.enum(['academic', 'participation', 'achievement', 'milestone']),
  earnedAt: z.date()
});

export const userSchema = baseEntitySchema.extend({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  displayName: z.string(),
  avatar: z.string().url().optional(),
  
  yearGroup: yearGroupSchema.optional(),
  subjects: z.array(subjectSchema),
  schoolId: z.string().optional(),
  
  role: userRoleSchema,
  subscriptionTier: subscriptionTierSchema,
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  
  parentEmail: z.string().email().optional(),
  parentName: z.string().optional(),
  
  preferences: userPreferencesSchema,
  academicDNA: academicDNASchema.optional(),
  
  totalPoints: z.number().min(0),
  level: z.number().min(1),
  badges: z.array(badgeSchema),
  
  lastLoginAt: z.date().optional(),
  onboardingCompletedAt: z.date().optional()
});

export const schoolSettingsSchema = z.object({
  allowSelfRegistration: z.boolean(),
  requireParentConsent: z.boolean(),
  enableLeaderboards: z.boolean(),
  enableDebateRoom: z.boolean(),
  customBranding: z.boolean(),
  dataRetentionDays: z.number().min(30).max(2555) // 30 days to 7 years
});

export const schoolStatsSchema = z.object({
  totalStudents: z.number().min(0),
  activeStudents: z.number().min(0),
  coursesCompleted: z.number().min(0),
  webinarsAttended: z.number().min(0),
  averageEngagement: z.number().min(0).max(100),
  topPerformers: z.array(z.string())
});

export const schoolSchema = baseEntitySchema.extend({
  name: z.string().min(1).max(100),
  address: z.string().min(1),
  postcode: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
  
  subscriptionTier: subscriptionTierSchema,
  maxStudents: z.number().min(1),
  currentStudents: z.number().min(0),
  
  settings: schoolSettingsSchema,
  adminIds: z.array(z.string()),
  stats: schoolStatsSchema
});

// Form validation schemas
export const updateUserProfileSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  avatar: z.string().url().optional(),
  subjects: z.array(subjectSchema).optional(),
  preferences: userPreferencesSchema.optional()
});

export const updateUserPreferencesSchema = userPreferencesSchema.partial();
