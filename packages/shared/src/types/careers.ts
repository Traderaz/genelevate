import { BaseEntity, Subject } from './common';

export interface Career extends BaseEntity {
  // Career details
  title: string;
  description: string;
  summary: string; // Short description
  
  // Classification
  category: string; // e.g., "Healthcare", "Technology", "Finance"
  subcategory?: string;
  level: 'entry' | 'mid' | 'senior' | 'executive';
  
  // Requirements
  requiredSubjects: Subject[];
  recommendedSubjects: Subject[];
  requiredQualifications: string[];
  recommendedQualifications: string[];
  
  // Pathways
  educationPathways: EducationPathway[];
  apprenticeshipPathways: ApprenticeshipPathway[];
  
  // Market data
  averageSalary: {
    entry: number;
    mid: number;
    senior: number;
    currency: string;
  };
  jobGrowth: number; // Percentage growth projection
  demandLevel: 'low' | 'medium' | 'high' | 'very-high';
  
  // Skills
  technicalSkills: string[];
  softSkills: string[];
  
  // Work environment
  workEnvironment: string[];
  workSchedule: string[];
  travelRequirements: 'none' | 'minimal' | 'moderate' | 'extensive';
  
  // Related careers
  relatedCareers: string[]; // Career IDs
  
  // Content
  dayInTheLife?: string;
  careerProgression?: string;
  challenges?: string;
  rewards?: string;
  
  // Media
  images: string[];
  videos: string[];
  
  // Status
  isActive: boolean;
  isFeatured: boolean;
  
  // SEO
  slug: string;
  tags: string[];
}

export interface EducationPathway {
  type: 'university' | 'college' | 'vocational' | 'online';
  qualification: string; // e.g., "Bachelor's in Computer Science"
  duration: string; // e.g., "3-4 years"
  entryRequirements: string[];
  institutions: string[]; // Institution names
  cost?: {
    tuition: number;
    living: number;
    currency: string;
  };
}

export interface ApprenticeshipPathway {
  title: string;
  level: number; // Apprenticeship level 2-7
  duration: string;
  employer?: string;
  entryRequirements: string[];
  salary: {
    starting: number;
    qualified: number;
    currency: string;
  };
  availability: 'high' | 'medium' | 'low';
}

export interface IndustryNews extends BaseEntity {
  // Content
  title: string;
  content: string;
  summary: string;
  
  // Classification
  category: string;
  tags: string[];
  relatedCareers: string[]; // Career IDs
  relatedSubjects: Subject[];
  
  // Source
  source: string;
  sourceUrl?: string;
  author?: string;
  
  // Publishing
  publishedAt: Date;
  isPublished: boolean;
  isFeatured: boolean;
  
  // Media
  featuredImage?: string;
  images: string[];
  
  // Engagement
  views: number;
  likes: number;
  shares: number;
  
  // SEO
  slug: string;
  metaDescription?: string;
}

export interface Event extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  // Event details
  title: string;
  description: string;
  type: 'workshop' | 'seminar' | 'career-fair' | 'networking' | 'competition' | 'social';
  
  // Scheduling
  startDate: Date;
  endDate: Date;
  timezone: string;
  location: EventLocation;
  
  // Capacity
  maxAttendees?: number;
  currentAttendees: number;
  waitlistCount: number;
  
  // Target audience
  targetYearGroups: string[];
  targetSubjects: Subject[];
  
  // Registration
  requiresRegistration: boolean;
  registrationDeadline?: Date;
  registrationFee?: number;
  
  // Content
  agenda: EventAgendaItem[];
  speakers: EventSpeaker[];
  materials: EventMaterial[];
  
  // Status
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  
  // Cohort context
  cohortIds: string[];
  
  // Follow-up
  followUpSurvey?: string;
  certificateTemplate?: string;
}

export interface EventLocation {
  type: 'online' | 'physical' | 'hybrid';
  venue?: string;
  address?: string;
  room?: string;
  onlineLink?: string;
  instructions?: string;
}

export interface EventAgendaItem {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  speaker?: string;
  location?: string;
}

export interface EventSpeaker {
  id: string;
  name: string;
  title: string;
  company?: string;
  bio: string;
  avatar?: string;
  linkedIn?: string;
  twitter?: string;
}

export interface EventMaterial {
  id: string;
  name: string;
  type: 'document' | 'presentation' | 'video' | 'link';
  url: string;
  description?: string;
  availableAt: 'before' | 'during' | 'after';
}

export interface Addon extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  // Addon details
  name: string;
  description: string;
  type: 'tutoring' | 'mentoring' | 'coaching' | 'assessment' | 'resource' | 'service';
  
  // Provider
  providerId: string; // User ID of the provider
  providerName: string;
  providerRating: number;
  
  // Pricing
  pricing: {
    type: 'free' | 'one-time' | 'subscription' | 'per-session';
    amount?: number;
    currency?: string;
    interval?: 'hour' | 'session' | 'week' | 'month';
  };
  
  // Availability
  isActive: boolean;
  maxCapacity?: number;
  currentBookings: number;
  
  // Target audience
  targetYearGroups: string[];
  targetSubjects: Subject[];
  
  // Content
  features: string[];
  requirements: string[];
  duration?: string;
  
  // Media
  images: string[];
  videos: string[];
  
  // Reviews
  averageRating: number;
  reviewCount: number;
}

export interface Purchase extends BaseEntity {
  // Multi-tenant scoping
  institutionId?: string;
  
  // Purchase details
  userId: string;
  itemType: 'course' | 'webinar' | 'addon' | 'subscription' | 'event';
  itemId: string;
  itemName: string;
  
  // Pricing
  amount: number;
  currency: string;
  discountAmount?: number;
  finalAmount: number;
  
  // Payment
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  stripePaymentIntentId?: string;
  
  // Access
  accessGranted: boolean;
  accessExpiresAt?: Date;
  
  // Refund
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: Date;
}
