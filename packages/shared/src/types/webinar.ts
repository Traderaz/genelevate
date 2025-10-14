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

// Enhanced Attendance Tracking
export interface WebinarAttendance extends BaseEntity {
  userId: string;
  webinarId: string;
  registrationId: string;
  
  // Session Tracking
  sessionId: string; // unique per join session
  joinedAt: Date;
  leftAt?: Date;
  isActive: boolean;
  
  // Heartbeat Monitoring
  lastHeartbeat: Date;
  heartbeatCount: number;
  missedHeartbeats: number;
  
  // Idle Detection
  isIdle: boolean;
  idleStartTime?: Date;
  totalIdleTime: number; // seconds
  
  // Engagement
  interactions: WebinarInteraction[];
  
  // Provider Integration
  providerSessionId?: string;
  providerData?: Record<string, any>;
}

export interface WebinarInteraction {
  type: 'join' | 'leave' | 'chat' | 'question' | 'poll' | 'reaction' | 'heartbeat' | 'idle_start' | 'idle_end' | 'mouse_move' | 'key_press';
  timestamp: Date;
  data?: Record<string, any>;
}

// Provider Adapter Pattern
export interface WebinarProvider {
  name: string;
  createMeeting(webinar: Webinar): Promise<WebinarProviderMeeting>;
  updateMeeting(meetingId: string, updates: Partial<Webinar>): Promise<void>;
  deleteMeeting(meetingId: string): Promise<void>;
  getMeetingInfo(meetingId: string): Promise<WebinarProviderMeeting>;
  generateJoinUrl(meetingId: string, userId: string, userName: string): Promise<string>;
  getParticipants(meetingId: string): Promise<WebinarProviderParticipant[]>;
  startMeeting(meetingId: string): Promise<void>;
  endMeeting(meetingId: string): Promise<void>;
}

export interface WebinarProviderMeeting {
  id: string;
  joinUrl: string;
  startUrl?: string; // for hosts
  password?: string;
  status: 'scheduled' | 'live' | 'ended';
  participants: WebinarProviderParticipant[];
  settings: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebinarProviderParticipant {
  id: string;
  userId?: string; // our internal user ID
  name: string;
  email?: string;
  joinTime: Date;
  leaveTime?: Date;
  duration: number; // seconds
  isHost: boolean;
  isMuted: boolean;
  hasVideo: boolean;
  isActive: boolean;
}

// Heartbeat System for Anti-Idle
export interface WebinarHeartbeat {
  userId: string;
  webinarId: string;
  sessionId: string;
  timestamp: Date;
  
  // Client State
  isActive: boolean;
  isVisible: boolean; // tab visibility
  isFocused: boolean; // window focus
  
  // Network Info
  connectionQuality?: 'excellent' | 'good' | 'fair' | 'poor';
  latency?: number; // ms
  
  // Engagement Indicators
  lastInteraction?: Date;
  mouseMovement?: boolean;
  keyboardActivity?: boolean;
  scrollActivity?: boolean;
}

// Enhanced Webinar Configuration
export interface WebinarConfig {
  // Provider Settings
  provider: 'mock' | 'zoom' | 'teams' | 'meet' | 'custom';
  providerMeetingId?: string;
  providerJoinUrl?: string;
  providerSettings?: Record<string, any>;
  
  // Attendance Monitoring
  heartbeatInterval: number; // seconds (default: 30)
  maxIdleTime: number; // seconds before marking as idle (default: 300)
  attendanceThreshold: number; // percentage of time required for attendance credit (default: 75)
  maxMissedHeartbeats: number; // before marking as disconnected (default: 3)
  
  // Capacity Management
  maxParticipants: number;
  waitingRoomEnabled: boolean;
  autoAdmit: boolean;
  
  // Security
  requirePassword: boolean;
  allowAnonymous: boolean;
  moderationEnabled: boolean;
  
  // Features
  recordingEnabled: boolean;
  chatEnabled: boolean;
  qaEnabled: boolean;
  pollsEnabled: boolean;
  screenShareEnabled: boolean;
  breakoutRoomsEnabled: boolean;
}

// Real-time Events
export interface WebinarEvent {
  type: 'participant_joined' | 'participant_left' | 'chat_message' | 'question_asked' | 'poll_started' | 'poll_ended' | 'recording_started' | 'recording_stopped' | 'meeting_started' | 'meeting_ended';
  webinarId: string;
  userId?: string;
  timestamp: Date;
  data: Record<string, any>;
}
