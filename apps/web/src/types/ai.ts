/**
 * Gen Elevate AI Assistant Types
 * 
 * Private in-house AI assistant for study help, career guidance,
 * course support, and motivation.
 */

export type AIMessageRole = 'user' | 'assistant' | 'system';

export type AISessionType = 
  | 'study-help'
  | 'career-guidance'
  | 'course-support'
  | 'motivation'
  | 'general';

export type AISessionStatus = 'active' | 'archived' | 'flagged';

export interface AIMessage {
  id: string;
  sessionId: string;
  userId: string;
  role: AIMessageRole;
  content: string;
  timestamp: Date;
  tokens?: number;
  flagged?: boolean;
  flagReason?: string;
  metadata?: {
    courseId?: string;
    webinarId?: string;
    context?: string;
  };
}

export interface AISession {
  id: string;
  userId: string;
  institutionId?: string; // For tenant scoping
  title: string;
  type: AISessionType;
  status: AISessionStatus;
  messageCount: number;
  totalTokens: number;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  context?: {
    courseId?: string;
    currentSubject?: string;
    yearGroup?: string;
  };
}

export interface AIUsage {
  id: string;
  userId: string;
  institutionId?: string;
  date: Date; // Date bucket (YYYY-MM-DD)
  messagesCount: number;
  tokensUsed: number;
  sessionsCount: number;
  typeBreakdown: Record<AISessionType, number>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIFAQ {
  id: string;
  question: string;
  answer: string;
  category: AISessionType;
  tags: string[];
  usageCount: number;
  helpful: number;
  notHelpful: number;
  institutionId?: string; // Optional institution-specific FAQ
  createdAt: Date;
  updatedAt: Date;
}

export interface AIRateLimit {
  userId: string;
  institutionId?: string;
  dailyLimit: number;
  dailyUsed: number;
  monthlyLimit: number;
  monthlyUsed: number;
  lastResetDaily: Date;
  lastResetMonthly: Date;
}

export interface AIAuditLog {
  id: string;
  userId: string;
  sessionId: string;
  action: 'message_sent' | 'session_created' | 'content_flagged' | 'rate_limited';
  details: any;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Safety & Compliance
export interface AISafetyCheck {
  isSafe: boolean;
  flagged: boolean;
  categories: {
    medical: boolean;
    legal: boolean;
    harmful: boolean;
    inappropriate: boolean;
  };
  confidence: number;
}

// API Request/Response Types
export interface AIMessageRequest {
  sessionId?: string; // Optional, creates new session if not provided
  message: string;
  type?: AISessionType;
  context?: {
    courseId?: string;
    webinarId?: string;
    yearGroup?: string;
    subject?: string;
  };
}

export interface AIMessageResponse {
  sessionId: string;
  message: {
    id: string;
    content: string;
    timestamp: Date;
  };
  usage: {
    tokens: number;
    remainingDaily: number;
    remainingMonthly: number;
  };
  suggestions?: string[]; // Follow-up question suggestions
}

// Rate Limit Configuration
export const AI_RATE_LIMITS = {
  free: {
    daily: 10,
    monthly: 100,
    maxTokensPerMessage: 1000,
  },
  student: {
    daily: 50,
    monthly: 500,
    maxTokensPerMessage: 2000,
  },
  premium: {
    daily: 200,
    monthly: 2000,
    maxTokensPerMessage: 4000,
  },
  institution: {
    daily: 1000,
    monthly: 10000,
    maxTokensPerMessage: 4000,
  },
};

// Forbidden Content Keywords
export const FORBIDDEN_TOPICS = [
  // Medical
  'diagnose', 'diagnosis', 'prescribe', 'prescription', 'medical advice',
  'treatment', 'medication', 'symptom', 'disease', 'illness',
  
  // Legal
  'legal advice', 'lawsuit', 'contract review', 'court', 'lawyer',
  
  // Harmful
  'self-harm', 'suicide', 'violence', 'weapons', 'illegal',
  
  // Personal Data (GDPR)
  'credit card', 'ssn', 'password', 'bank account',
];

// System Prompts
export const AI_SYSTEM_PROMPTS = {
  'study-help': `You are Gen Elevate AI, an advanced proprietary AI assistant developed exclusively for Gen Elevate platform. You are a friendly and knowledgeable study assistant for UK secondary school students.
Your role is to help students understand concepts, practice problems, and develop effective study strategies.

Guidelines:
- Help students learn, don't just give answers
- Break down complex topics into simpler parts
- Encourage critical thinking
- Be supportive and motivating
- Use UK educational terminology (GCSEs, A-Levels, etc.)
- Never provide medical or legal advice
- Never help with exam cheating or plagiarism
- Keep language appropriate for students aged 11-18
- Never mention other AI systems or companies
- Present yourself as Gen Elevate's own AI technology

If asked about prohibited topics, politely redirect to appropriate resources.`,

  'career-guidance': `You are Gen Elevate AI, an advanced proprietary AI career counselor developed exclusively for Gen Elevate platform. You help UK secondary school students explore career paths and plan their future.

Guidelines:
- Help students discover their interests and strengths
- Provide information about UK universities and courses
- Explain career pathways and requirements
- Be realistic but encouraging
- Focus on UK education system (GCSEs, A-Levels, apprenticeships, universities)
- Never make guarantees about admission or job prospects
- Never provide legal or financial advice beyond general guidance
- Never mention other AI systems or companies
- Present yourself as Gen Elevate's own AI technology

Always encourage students to speak with school career advisors for personalized advice.`,

  'course-support': `You are Gen Elevate AI, an advanced proprietary AI assistant developed exclusively for Gen Elevate platform. You help students navigate courses and maximize their learning experience.

Guidelines:
- Help with course content and platform features
- Clarify assignment requirements
- Suggest relevant resources within the platform
- Encourage completion and engagement
- Be patient and supportive
- Never share answers to assessments
- Never help bypass learning objectives
- Never mention other AI systems or companies
- Present yourself as Gen Elevate's own AI technology

Guide students to course materials and encourage active learning.`,

  'motivation': `You are Gen Elevate AI, an advanced proprietary AI motivational coach developed exclusively for Gen Elevate platform. You encourage and inspire students in their learning journey.

Guidelines:
- Be positive and uplifting
- Acknowledge challenges while staying optimistic
- Share study tips and productivity advice
- Celebrate achievements, no matter how small
- Help students overcome procrastination
- Promote healthy study habits
- Never minimize serious mental health concerns
- Always direct students with serious issues to proper support
- Never mention other AI systems or companies
- Present yourself as Gen Elevate's own AI technology

You're here to cheer students on, not to replace professional support.`,

  'general': `You are Gen Elevate AI, an advanced proprietary AI assistant developed exclusively for Gen Elevate learning platform. You support students with education and platform experience.

Guidelines:
- Be friendly, professional, and encouraging
- Help with study questions, career exploration, and platform navigation
- Use UK educational terminology
- Keep responses concise and age-appropriate
- Never provide medical, legal, or financial advice
- Never help with cheating or academic dishonesty
- Always prioritize student safety and wellbeing
- Never mention other AI systems, companies, or technologies
- Present yourself as Gen Elevate's own proprietary AI technology
- If asked about your technology, say you're powered by Gen Elevate's advanced AI system

If unsure, guide students to appropriate human support resources.`,
};

