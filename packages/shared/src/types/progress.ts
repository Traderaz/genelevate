import { BaseEntity } from './common';

export interface Progress extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  // User and content references
  userId: string;
  contentType: 'course' | 'lesson' | 'webinar' | 'assignment' | 'quiz';
  contentId: string;
  
  // Progress tracking
  status: 'not-started' | 'in-progress' | 'completed' | 'failed' | 'skipped';
  progressPercentage: number; // 0-100
  
  // Time tracking
  timeSpent: number; // minutes
  startedAt?: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
  
  // Performance
  score?: number;
  maxScore?: number;
  attempts: number;
  
  // Metadata
  metadata: Record<string, any>; // Additional tracking data
  
  // Cohort context
  cohortId?: string;
}

export interface Attendance extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  // Event references
  userId: string;
  eventType: 'webinar' | 'live-session' | 'debate' | 'workshop';
  eventId: string;
  
  // Attendance details
  status: 'registered' | 'attended' | 'no-show' | 'cancelled' | 'late';
  registeredAt: Date;
  joinedAt?: Date;
  leftAt?: Date;
  duration: number; // minutes actually attended
  
  // Engagement metrics
  chatMessages: number;
  questionsAsked: number;
  pollsAnswered: number;
  interactionScore: number; // 0-100
  
  // Cohort context
  cohortId?: string;
  
  // Feedback
  rating?: number; // 1-5
  feedback?: string;
}

export interface Reward extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  // Reward details
  userId: string;
  type: 'badge' | 'points' | 'certificate' | 'achievement' | 'milestone';
  name: string;
  description: string;
  icon?: string;
  
  // Point value
  pointsAwarded: number;
  
  // Criteria
  criteria: {
    type: string;
    value: any;
    description: string;
  }[];
  
  // Context
  sourceType: 'course' | 'webinar' | 'debate' | 'assignment' | 'participation' | 'streak';
  sourceId?: string;
  cohortId?: string;
  
  // Status
  isVisible: boolean;
  isRevoked: boolean;
  revokedAt?: Date;
  revokedReason?: string;
}

export interface Leaderboard extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  // Leaderboard details
  name: string;
  description?: string;
  type: 'points' | 'completion' | 'streak' | 'participation' | 'custom';
  
  // Scope
  scope: 'global' | 'institution' | 'cohort' | 'year-group' | 'subject';
  scopeId?: string; // cohortId, yearGroup, or subject
  
  // Time period
  period: 'daily' | 'weekly' | 'monthly' | 'term' | 'academic-year' | 'all-time';
  startDate?: Date;
  endDate?: Date;
  
  // Settings
  isActive: boolean;
  isPublic: boolean;
  maxEntries: number;
  
  // Entries
  entries: LeaderboardEntry[];
  
  // Last updated
  lastCalculated: Date;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  avatar?: string;
  score: number;
  rank: number;
  change: number; // Position change from last period
  metadata: Record<string, any>; // Additional display data
}
