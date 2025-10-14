import { z } from 'zod';
import { baseEntitySchema, yearGroupSchema, subjectSchema } from './common';

export const webinarHostSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  credentials: z.string().optional()
});

export const webinarAgendaItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  startTime: z.number().min(0),
  duration: z.number().min(1),
  type: z.enum(['presentation', 'discussion', 'qa', 'poll', 'break'])
});

export const webinarMaterialSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['pdf', 'document', 'link', 'video']),
  url: z.string().url(),
  description: z.string().optional(),
  availableAt: z.enum(['before', 'during', 'after'])
});

export const webinarSchema = baseEntitySchema.extend({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  shortDescription: z.string().min(1).max(500),
  thumbnail: z.string().url(),
  
  subject: subjectSchema.optional(),
  yearGroups: z.array(yearGroupSchema).min(1),
  tags: z.array(z.string()),
  
  scheduledAt: z.date(),
  duration: z.number().min(15).max(480), // 15 minutes to 8 hours
  timezone: z.string(),
  
  host: webinarHostSchema,
  
  type: z.enum(['live', 'recorded', 'hybrid']),
  maxAttendees: z.number().min(1).optional(),
  currentAttendees: z.number().min(0),
  
  agenda: z.array(webinarAgendaItemSchema),
  materials: z.array(webinarMaterialSchema),
  
  isPublic: z.boolean(),
  isPremium: z.boolean(),
  price: z.number().min(0).optional(),
  accessLevel: z.enum(['free', 'basic', 'premium', 'school-only']),
  
  status: z.enum(['scheduled', 'live', 'ended', 'cancelled']),
  
  recordingUrl: z.string().url().optional(),
  recordingAvailable: z.boolean(),
  
  allowChat: z.boolean(),
  allowQA: z.boolean(),
  allowPolls: z.boolean(),
  
  requiresRegistration: z.boolean(),
  registrationDeadline: z.date().optional(),
  registrationCount: z.number().min(0),
  
  followUpSurvey: z.string().optional(),
  certificateAvailable: z.boolean()
});

export const webinarRegistrationSchema = baseEntitySchema.extend({
  userId: z.string(),
  webinarId: z.string(),
  
  status: z.enum(['registered', 'attended', 'no-show', 'cancelled']),
  registeredAt: z.date(),
  
  joinedAt: z.date().optional(),
  leftAt: z.date().optional(),
  attendanceDuration: z.number().min(0),
  
  chatMessages: z.number().min(0),
  questionsAsked: z.number().min(0),
  pollsAnswered: z.number().min(0),
  
  surveyCompleted: z.boolean(),
  certificateIssued: z.boolean(),
  rating: z.number().min(1).max(5).optional(),
  feedback: z.string().optional()
});

export const webinarChatSchema = baseEntitySchema.extend({
  webinarId: z.string(),
  userId: z.string(),
  message: z.string().min(1).max(500),
  isPublic: z.boolean(),
  isModerated: z.boolean(),
  replyToId: z.string().optional()
});

export const webinarQuestionSchema = baseEntitySchema.extend({
  webinarId: z.string(),
  userId: z.string(),
  question: z.string().min(1).max(500),
  isAnswered: z.boolean(),
  answer: z.string().optional(),
  answeredBy: z.string().optional(),
  answeredAt: z.date().optional(),
  upvotes: z.number().min(0),
  isPublic: z.boolean()
});

export const webinarPollOptionSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  votes: z.number().min(0)
});

export const webinarPollSchema = baseEntitySchema.extend({
  webinarId: z.string(),
  question: z.string().min(1),
  options: z.array(webinarPollOptionSchema).min(2).max(10),
  isActive: z.boolean(),
  allowMultiple: z.boolean(),
  isAnonymous: z.boolean(),
  totalVotes: z.number().min(0)
});

export const webinarPollResponseSchema = baseEntitySchema.extend({
  pollId: z.string(),
  userId: z.string(),
  selectedOptions: z.array(z.string()).min(1)
});

// Form validation schemas
export const createWebinarSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  shortDescription: z.string().min(1).max(500),
  subject: subjectSchema.optional(),
  yearGroups: z.array(yearGroupSchema).min(1),
  tags: z.array(z.string()),
  scheduledAt: z.date().min(new Date()),
  duration: z.number().min(15).max(480),
  timezone: z.string(),
  type: z.enum(['live', 'recorded', 'hybrid']),
  maxAttendees: z.number().min(1).optional(),
  isPublic: z.boolean(),
  isPremium: z.boolean(),
  price: z.number().min(0).optional(),
  requiresRegistration: z.boolean(),
  registrationDeadline: z.date().optional()
});

export const registerForWebinarSchema = z.object({
  webinarId: z.string()
});

export const submitWebinarFeedbackSchema = z.object({
  webinarId: z.string(),
  rating: z.number().min(1).max(5),
  feedback: z.string().max(1000).optional()
});

export const sendChatMessageSchema = z.object({
  webinarId: z.string(),
  message: z.string().min(1).max(500),
  replyToId: z.string().optional()
});

export const askQuestionSchema = z.object({
  webinarId: z.string(),
  question: z.string().min(1).max(500)
});
