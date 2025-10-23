/**
 * Academic DNA Profile Types
 * 
 * Defines the structure for student learning fingerprints,
 * including cognitive strengths, learning patterns, and subject affinities.
 */

import { Timestamp } from 'firebase/firestore';

// ============================================================================
// Core DNA Types
// ============================================================================

export type CognitiveDimension = 
  | 'visual'
  | 'auditory'
  | 'kinesthetic'
  | 'logical'
  | 'creative'
  | 'social'
  | 'solitary';

export type LearningSignalType =
  | 'course_view'
  | 'quiz_attempt'
  | 'quiz_complete'
  | 'webinar_join'
  | 'ai_chat'
  | 'video_watch'
  | 'resource_download'
  | 'study_session';

export type MediaType = 'video' | 'audio' | 'text' | 'interactive';
export type InteractionType = 'watching' | 'reading' | 'doing' | 'discussing';

// ============================================================================
// Learning DNA Profile
// ============================================================================

export interface CognitiveProfile {
  visual: number;              // 0-100
  auditory: number;            // 0-100
  kinesthetic: number;         // 0-100
  logical: number;             // 0-100
  creative: number;            // 0-100
  social: number;              // 0-100
  solitary: number;            // 0-100
  
  dominantStyle: CognitiveDimension;
  secondaryStyle?: CognitiveDimension;
}

export interface LearningPatterns {
  peakHours: number[];                // Array of hours (0-23)
  avgSessionDuration: number;         // Minutes
  preferredDayOfWeek: string[];       // ['Monday', 'Wednesday']
  consistencyScore: number;           // 0-100
  focusScore: number;                 // 0-100
  completionRate: number;             // 0-100
  retentionRate: number;              // 0-100
}

export interface SubjectAffinity {
  affinity: number;                   // 0-100 natural inclination
  performance: number;                // 0-100 actual performance
  engagement: number;                 // 0-100 time/engagement
  lastUpdated: Timestamp;
}

export interface DNASharing {
  isPublic: boolean;
  parentCanView: boolean;
  institutionCanView: boolean;
  shareableLink?: string;
  sharedWith: string[];                // User IDs
}

export interface DNAConsent {
  dataCollection: boolean;
  parentalConsent: boolean;
  consentDate: Timestamp;
  consentVersion: string;
}

export interface LearningDNA {
  id: string;                          // matches userId
  userId: string;
  
  cognitiveProfile: CognitiveProfile;
  learningPatterns: LearningPatterns;
  subjectAffinities: Record<string, SubjectAffinity>;
  
  lastCalculated: Timestamp;
  dataPoints: number;
  confidence: number;                  // 0-100
  
  sharing: DNASharing;
  consent: DNAConsent;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================================================
// Learning Signals (Behavioral Data)
// ============================================================================

export interface LearningSignal {
  id: string;
  userId: string;
  
  type: LearningSignalType;
  
  subject?: string;
  topic?: string;
  courseId?: string;
  
  timestamp: Timestamp;
  duration?: number;                   // Seconds
  hourOfDay: number;                   // 0-23
  dayOfWeek: string;                   // 'Monday'
  
  score?: number;                      // For quizzes
  completed: boolean;
  engagementLevel?: number;            // 0-100
  
  mediaType?: MediaType;
  interactionType?: InteractionType;
  
  sessionId?: string;
  deviceType?: string;
  
  createdAt: Timestamp;
}

// ============================================================================
// DNA Questionnaires
// ============================================================================

export type QuestionType = 'scale' | 'multiple_choice' | 'ranking';
export type QuestionCategory = 'cognitive' | 'preference' | 'habit' | 'personality';

export interface DimensionWeight {
  dimension: CognitiveDimension;
  weight: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  scores: Partial<Record<CognitiveDimension, number>>;
}

export interface DNAQuestion {
  id: string;
  category: QuestionCategory;
  affectsDimensions: DimensionWeight[];
  
  question: string;
  type: QuestionType;
  
  // For scale questions
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: {
    min: string;
    max: string;
  };
  
  // For multiple choice
  options?: QuestionOption[];
  
  // For ranking
  itemsToRank?: string[];
  
  required: boolean;
}

export interface DNAQuestionnaire {
  id: string;
  version: string;
  
  title: string;
  description: string;
  
  questions: DNAQuestion[];
  
  targetAgeRange?: [number, number];
  targetYearGroups?: string[];
  
  estimatedMinutes: number;
  status: 'draft' | 'active' | 'archived';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================================================
// DNA Questionnaire Responses
// ============================================================================

export interface QuestionResponse {
  questionId: string;
  answer: any;                         // number | string | array
  timestamp: Timestamp;
}

export interface DNAResponse {
  id: string;
  userId: string;
  questionnaireId: string;
  questionnaireVersion: string;
  
  responses: QuestionResponse[];
  
  explicitScores: Record<CognitiveDimension, number>;
  
  startedAt: Timestamp;
  completedAt?: Timestamp;
  isComplete: boolean;
  progressPercentage: number;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================================================
// DNA Snapshots (Historical Records)
// ============================================================================

export type SnapshotReason = 'monthly' | 'significant_change' | 'manual' | 'year_end';

export interface DNASnapshot {
  id: string;
  userId: string;
  
  dnaData: LearningDNA;
  
  changesSinceLast?: {
    cognitiveProfile?: Partial<CognitiveProfile>;
    learningPatterns?: Partial<LearningPatterns>;
    subjectAffinities?: Record<string, Partial<SubjectAffinity>>;
  };
  
  reason: SnapshotReason;
  
  createdAt: Timestamp;
}

// ============================================================================
// Analytics & Aggregations
// ============================================================================

export interface DNADistribution {
  dimension: CognitiveDimension;
  distribution: {
    low: number;                       // 0-33
    medium: number;                    // 34-66
    high: number;                      // 67-100
  };
  average: number;
  median: number;
}

export interface CohortDNAInsights {
  cohortId: string;
  cohortName: string;
  studentCount: number;
  
  dominantStyles: Record<CognitiveDimension, number>;  // Count per style
  distributions: DNADistribution[];
  
  avgConfidence: number;
  dataQuality: number;                 // 0-100
  
  peakLearningHours: number[];
  topSubjects: Array<{
    subject: string;
    avgAffinity: number;
    studentCount: number;
  }>;
  
  calculatedAt: Timestamp;
}

// ============================================================================
// Shareable DNA Card
// ============================================================================

export interface ShareableDNACard {
  userId: string;
  studentName: string;
  shareId: string;                     // UUID for public access
  
  highlights: {
    dominantStyle: CognitiveDimension;
    secondaryStyle?: CognitiveDimension;
    topStrengths: CognitiveDimension[];
    topSubjects: string[];
    peakLearningTime: string;          // e.g., "Evening (8-10 PM)"
  };
  
  visualData: {
    cognitiveScores: Record<CognitiveDimension, number>;
    topThreeSubjects: Array<{
      name: string;
      score: number;
    }>;
  };
  
  createdAt: Timestamp;
  expiresAt?: Timestamp;
  viewCount: number;
}

// ============================================================================
// DNA Recommendations
// ============================================================================

export interface DNARecommendation {
  type: 'course' | 'study_method' | 'resource' | 'time_optimization';
  
  title: string;
  description: string;
  reason: string;                      // Why this is recommended based on DNA
  
  relevantDimensions: CognitiveDimension[];
  confidence: number;                  // 0-100
  
  actionUrl?: string;
  actionLabel?: string;
  
  createdAt: Timestamp;
}

// ============================================================================
// Exports
// ============================================================================

export type {
  LearningDNA as default,
};

