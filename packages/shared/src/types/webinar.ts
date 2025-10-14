import { BaseEntity, YearGroup, Subject } from './common';

export interface Webinar extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string; // null for global webinars
  
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  
  // Academic Info
  subject?: Subject;
  yearGroups: YearGroup[];
  tags: string[];
  
  // Scheduling
  scheduledAt: Date;
  duration: number; // minutes
  timezone: string;
  
  // Host Info
  host: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    credentials?: string;
  };
  
  // Webinar Details
  type: 'live' | 'recorded' | 'hybrid';
  maxAttendees?: number;
  currentAttendees: number;
  
  // Content
  agenda: WebinarAgendaItem[];
  materials: WebinarMaterial[];
  
  // Access control
  isPublic: boolean;
  isPremium: boolean;
  price?: number;
  accessLevel: 'public' | 'institution' | 'cohort' | 'premium';
  allowedCohortIds: string[];
  
  // Status
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  
  // Recording
  recordingUrl?: string;
  recordingAvailable: boolean;
  
  // Engagement
  allowChat: boolean;
  allowQA: boolean;
  allowPolls: boolean;
  
  // Registration
  requiresRegistration: boolean;
  registrationDeadline?: Date;
  registrationCount: number;
  
  // Follow-up
  followUpSurvey?: string;
  certificateAvailable: boolean;
}

export interface WebinarAgendaItem {
  id: string;
  title: string;
  description?: string;
  startTime: number; // minutes from webinar start
  duration: number; // minutes
  type: 'presentation' | 'discussion' | 'qa' | 'poll' | 'break';
}

export interface WebinarMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'document' | 'link' | 'video';
  url: string;
  description?: string;
  availableAt: 'before' | 'during' | 'after';
}

export interface WebinarRegistration extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  userId: string;
  webinarId: string;
  
  // Registration Info
  status: 'registered' | 'attended' | 'no-show' | 'cancelled';
  registeredAt: Date;
  registrationSource: 'self' | 'institution' | 'cohort' | 'referral';
  
  // Attendance
  joinedAt?: Date;
  leftAt?: Date;
  attendanceDuration: number; // minutes
  
  // Engagement
  chatMessages: number;
  questionsAsked: number;
  pollsAnswered: number;
  
  // Context
  cohortId?: string;
  
  // Follow-up
  surveyCompleted: boolean;
  certificateIssued: boolean;
  rating?: number; // 1-5
  feedback?: string;
}

export interface WebinarChat extends BaseEntity {
  webinarId: string;
  userId: string;
  message: string;
  isPublic: boolean;
  isModerated: boolean;
  replyToId?: string;
}

export interface WebinarQuestion extends BaseEntity {
  webinarId: string;
  userId: string;
  question: string;
  isAnswered: boolean;
  answer?: string;
  answeredBy?: string;
  answeredAt?: Date;
  upvotes: number;
  isPublic: boolean;
}

export interface WebinarPoll extends BaseEntity {
  webinarId: string;
  question: string;
  options: WebinarPollOption[];
  isActive: boolean;
  allowMultiple: boolean;
  isAnonymous: boolean;
  totalVotes: number;
}

export interface WebinarPollOption {
  id: string;
  text: string;
  votes: number;
}

export interface WebinarPollResponse extends BaseEntity {
  pollId: string;
  userId: string;
  selectedOptions: string[];
}
