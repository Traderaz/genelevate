/**
 * AI-Moderated Debate Room Types
 * 
 * Weekly debates with AI scoring on clarity, structure, reasoning, evidence, and delivery
 */

export type DebateStatus = 'upcoming' | 'active' | 'voting' | 'completed' | 'archived';
export type DebatePosition = 'for' | 'against' | 'neutral';
export type SubmissionType = 'video' | 'audio' | 'text';
export type DebateDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface DebateTopic {
  id: string;
  title: string;
  description: string;
  category: 'ethics' | 'technology' | 'society' | 'environment' | 'politics' | 'science' | 'culture';
  difficulty: DebateDifficulty;
  targetYearGroups: string[]; // e.g., ['Year 10', 'Year 11']
  suggestedBy: 'ai' | 'admin' | 'student';
  createdAt: Date;
  usageCount: number;
}

export interface Debate {
  id: string;
  topicId: string;
  title: string;
  description: string;
  category: string;
  difficulty: DebateDifficulty;
  
  // Timeline
  status: DebateStatus;
  weekNumber: number; // Week number of the academic year
  startDate: Date;
  submissionDeadline: Date;
  votingDeadline?: Date;
  endDate: Date;
  
  // Participation
  submissionCount: number;
  participantCount: number;
  viewCount: number;
  
  // Institution scoping
  institutionId?: string; // null for global debates
  isGlobal: boolean; // If true, visible to all institutions
  
  // Rewards
  pointsReward: number;
  badgeId?: string;
  
  // Media requirements
  allowedSubmissionTypes: SubmissionType[];
  maxDurationSeconds: number; // For video/audio
  maxTextWords: number; // For text
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // admin userId or 'ai'
}

export interface DebateSubmission {
  id: string;
  debateId: string;
  userId: string;
  institutionId?: string;
  
  // Submission content
  type: SubmissionType;
  position: DebatePosition;
  content: string; // Text content or URL to video/audio
  mediaUrl?: string; // Firebase Storage URL
  mediaDuration?: number; // seconds, for video/audio
  wordCount?: number; // for text
  transcript?: string; // Auto-generated for video/audio
  
  // Status
  status: 'submitted' | 'processing' | 'scored' | 'flagged' | 'rejected';
  isPublic: boolean; // Student can choose to make submission public
  
  // AI Scoring (out of 100 each)
  scores?: {
    clarity: number; // How clear and understandable the argument is
    structure: number; // Organization and flow of argument
    reasoning: number; // Logical reasoning and critical thinking
    evidence: number; // Use of facts, examples, and supporting evidence
    delivery: number; // Presentation quality (confidence, pace, tone)
    overall: number; // Weighted average
  };
  
  // AI Feedback
  aiFeedback?: {
    strengths: string[];
    improvements: string[];
    detailedFeedback: string;
    scoringBreakdown: {
      clarity: string;
      structure: string;
      reasoning: string;
      evidence: string;
      delivery: string;
    };
  };
  
  // Peer voting (optional feature)
  upvotes: number;
  downvotes: number;
  
  // Rewards
  pointsEarned: number;
  badgesEarned: string[];
  
  // Metadata
  submittedAt: Date;
  scoredAt?: Date;
  processingTime?: number; // seconds
  flagReason?: string;
}

export interface DebateScore {
  id: string;
  debateId: string;
  submissionId: string;
  userId: string;
  institutionId?: string;
  
  // Individual scores
  clarity: number;
  structure: number;
  reasoning: number;
  evidence: number;
  delivery: number;
  overall: number;
  
  // Ranking
  rank?: number;
  percentile?: number;
  
  // Points & Rewards
  pointsEarned: number;
  bonusPoints: number; // For top performers
  badgesEarned: string[];
  
  // Metadata
  createdAt: Date;
}

export interface DebateLeaderboard {
  id: string;
  debateId: string;
  
  // Scope
  institutionId?: string; // null for global leaderboard
  isGlobal: boolean;
  
  // Top performers
  topSubmissions: {
    submissionId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    position: DebatePosition;
    overallScore: number;
    rank: number;
    pointsEarned: number;
    excerpt: string; // First 150 chars
  }[];
  
  // Statistics
  stats: {
    totalSubmissions: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    positionBreakdown: {
      for: number;
      against: number;
      neutral: number;
    };
  };
  
  // Updated timestamp
  lastUpdated: Date;
}

export interface UserDebateStats {
  userId: string;
  institutionId?: string;
  
  // Overall performance
  totalDebates: number;
  totalSubmissions: number;
  averageOverallScore: number;
  
  // Score breakdown
  averageClarity: number;
  averageStructure: number;
  averageReasoning: number;
  averageEvidence: number;
  averageDelivery: number;
  
  // Rankings
  currentRank?: number;
  bestRank: number;
  topPercentile: number; // Best percentile achieved
  
  // Achievements
  debatesWon: number; // Times ranked #1
  topThreeFinishes: number;
  totalPoints: number;
  badgesEarned: string[];
  
  // Preferences
  favoriteCategories: string[];
  preferredSubmissionType: SubmissionType;
  
  // Recent activity
  lastDebateDate?: Date;
  currentStreak: number; // Consecutive weeks participated
  longestStreak: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface InstitutionDebateAnalytics {
  institutionId: string;
  weekNumber: number;
  debateId?: string; // null for weekly aggregate
  
  // Participation metrics
  totalParticipants: number;
  participationRate: number; // % of institution students
  activeDebaters: number; // Students who submitted
  
  // Performance metrics
  averageOverallScore: number;
  medianScore: number;
  scoreDistribution: {
    range: string; // e.g., "80-90"
    count: number;
  }[];
  
  // Category breakdown
  averageClarity: number;
  averageStructure: number;
  averageReasoning: number;
  averageEvidence: number;
  averageDelivery: number;
  
  // Submission types
  submissionTypeBreakdown: {
    video: number;
    audio: number;
    text: number;
  };
  
  // Top performers
  topStudents: {
    userId: string;
    userName: string;
    overallScore: number;
    rank: number;
  }[];
  
  // Engagement
  averageSubmissionsPerStudent: number;
  peakSubmissionTime: string; // Hour of day
  
  // Comparison
  institutionRank?: number; // Rank among all institutions
  aboveNationalAverage: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// API Request/Response Types
export interface CreateDebateRequest {
  topicId?: string; // Use existing topic
  customTopic?: {
    title: string;
    description: string;
    category: string;
    difficulty: DebateDifficulty;
  };
  startDate: Date;
  submissionDeadline: Date;
  endDate: Date;
  institutionId?: string;
  isGlobal: boolean;
  allowedSubmissionTypes: SubmissionType[];
  maxDurationSeconds: number;
  maxTextWords: number;
  pointsReward: number;
}

export interface SubmitDebateRequest {
  debateId: string;
  type: SubmissionType;
  position: DebatePosition;
  content: string; // Text or transcript
  mediaFile?: File; // For video/audio upload
  isPublic: boolean;
}

export interface DebateSubmissionResponse {
  submissionId: string;
  status: 'submitted' | 'processing';
  estimatedScoringTime: number; // seconds
  message: string;
}

export interface DebateScoringResponse {
  submissionId: string;
  scores: {
    clarity: number;
    structure: number;
    reasoning: number;
    evidence: number;
    delivery: number;
    overall: number;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    detailedFeedback: string;
    scoringBreakdown: {
      clarity: string;
      structure: string;
      reasoning: string;
      evidence: string;
      delivery: string;
    };
  };
  rank?: number;
  percentile?: number;
  pointsEarned: number;
  badgesEarned: string[];
}

export interface GenerateDebateTopicsRequest {
  count: number;
  category?: string;
  difficulty?: DebateDifficulty;
  yearGroups?: string[];
}

export interface GenerateDebateTopicsResponse {
  topics: DebateTopic[];
}

// Constants
export const DEBATE_SCORING_WEIGHTS = {
  clarity: 0.20,      // 20%
  structure: 0.20,    // 20%
  reasoning: 0.25,    // 25%
  evidence: 0.20,     // 20%
  delivery: 0.15,     // 15%
};

export const DEBATE_CATEGORIES = [
  'ethics',
  'technology',
  'society',
  'environment',
  'politics',
  'science',
  'culture',
] as const;

export const DEBATE_POINTS = {
  participation: 50,
  top1: 500,
  top3: 300,
  top10: 150,
  highScore: 100, // Score > 85
};

export const VIDEO_CONSTRAINTS = {
  maxSizeMB: 100,
  maxDurationSeconds: 60,
  allowedFormats: ['video/mp4', 'video/webm', 'video/quicktime'],
};

export const AUDIO_CONSTRAINTS = {
  maxSizeMB: 20,
  maxDurationSeconds: 60,
  allowedFormats: ['audio/mp3', 'audio/wav', 'audio/webm', 'audio/m4a'],
};

export const TEXT_CONSTRAINTS = {
  minWords: 50,
  maxWords: 500,
};

