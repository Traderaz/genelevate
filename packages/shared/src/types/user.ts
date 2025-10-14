import { BaseEntity, YearGroup, UserRole, SubscriptionTier, Subject } from './common';

export interface User extends BaseEntity {
  // Basic Info
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar?: string;
  
  // Multi-tenant scoping
  institutionId?: string; // null for global admins
  
  // Academic Info (students only)
  yearGroup?: YearGroup;
  subjects: Subject[];
  cohortIds: string[]; // Multiple cohorts a student can belong to
  
  // Account Info
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  isActive: boolean;
  emailVerified: boolean;
  
  // Parent/Guardian linking (for students)
  parentIds: string[]; // Multiple parents can be linked
  
  // Student linking (for parents)
  studentIds: string[]; // Multiple students can be linked
  
  // Preferences
  preferences: UserPreferences;
  
  // Academic DNA (students only)
  academicDNA?: AcademicDNA;
  
  // Progress Tracking (students only)
  totalPoints: number;
  level: number;
  badges: Badge[];
  
  // Institution-specific data
  referralCode?: string; // For institutions
  referredBy?: string; // User ID who referred this user
  
  // Timestamps
  lastLoginAt?: Date;
  onboardingCompletedAt?: Date;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    webinar: boolean;
    course: boolean;
    debate: boolean;
  };
  privacy: {
    profileVisible: boolean;
    progressVisible: boolean;
    leaderboardVisible: boolean;
  };
  learning: {
    preferredStudyTime: 'morning' | 'afternoon' | 'evening';
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  };
}

export interface AcademicDNA {
  cognitiveStrengths: string[];
  bestStudyHours: string[];
  subjectAffinities: Record<Subject, number>;
  learningPatterns: {
    focusSpan: number; // minutes
    retentionRate: number; // percentage
    preferredContentType: 'video' | 'text' | 'interactive' | 'mixed';
  };
  lastUpdated: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'academic' | 'participation' | 'achievement' | 'milestone';
  earnedAt: Date;
}

export interface Institution extends BaseEntity {
  // Basic Info
  name: string;
  type: 'school' | 'college' | 'university' | 'training-center' | 'other';
  address: string;
  postcode: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  logo?: string;
  
  // Subscription Info
  subscriptionTier: SubscriptionTier;
  maxStudents: number;
  currentStudents: number;
  
  // Referral System
  referralCode: string; // Unique code for this institution
  referralLinks: ReferralLink[];
  
  // Settings
  settings: InstitutionSettings;
  
  // Admin Users
  adminIds: string[]; // Users with 'institution' role
  
  // Stats
  stats: InstitutionStats;
  
  // Billing
  billingContact: string; // User ID
  subscriptionId?: string;
}

export interface ReferralLink extends BaseEntity {
  institutionId: string;
  code: string;
  name: string; // e.g., "Year 10 Physics Class"
  description?: string;
  isActive: boolean;
  expiresAt?: Date;
  maxUses?: number;
  currentUses: number;
  targetRole: 'student' | 'parent';
  metadata: Record<string, any>; // Additional data like cohort assignment
}

export interface InstitutionSettings {
  allowSelfRegistration: boolean;
  requireParentConsent: boolean;
  enableLeaderboards: boolean;
  enableDebateRoom: boolean;
  customBranding: boolean;
  dataRetentionDays: number;
  allowParentAccess: boolean;
  requireEmailVerification: boolean;
  defaultYearGroup?: YearGroup;
  defaultSubjects: Subject[];
}

export interface InstitutionStats {
  totalStudents: number;
  activeStudents: number;
  totalParents: number;
  coursesCompleted: number;
  webinarsAttended: number;
  averageEngagement: number;
  topPerformers: string[];
  monthlyActiveUsers: number;
  retentionRate: number;
}

export interface Cohort extends BaseEntity {
  institutionId: string;
  name: string; // e.g., "Year 10 Physics", "A-Level Mathematics"
  description?: string;
  yearGroup: YearGroup;
  subject?: Subject;
  
  // Members
  studentIds: string[];
  teacherIds: string[];
  maxStudents?: number;
  
  // Academic Info
  academicYear: string; // e.g., "2024-2025"
  term: 'autumn' | 'spring' | 'summer';
  
  // Settings
  isActive: boolean;
  isPublic: boolean; // Visible to all institution members
  
  // Progress Tracking
  averageProgress: number;
  completionRate: number;
}
