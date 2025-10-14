import { YearGroup, Subject, SubscriptionTier, UserRole } from '../types/common';

export const YEAR_GROUPS: Record<YearGroup, { label: string; ages: string }> = {
  'year-6': { label: 'Year 6', ages: '10-11' },
  'year-7': { label: 'Year 7', ages: '11-12' },
  'year-8': { label: 'Year 8', ages: '12-13' },
  'year-9': { label: 'Year 9', ages: '13-14' },
  'year-10': { label: 'Year 10', ages: '14-15' },
  'year-11': { label: 'Year 11', ages: '15-16' },
  'year-12': { label: 'Year 12', ages: '16-17' },
  'year-13': { label: 'Year 13', ages: '17-18' }
};

export const SUBJECTS: Record<Subject, { label: string; icon: string; color: string }> = {
  'mathematics': { label: 'Mathematics', icon: '🔢', color: '#3B82F6' },
  'english': { label: 'English', icon: '📚', color: '#EF4444' },
  'science': { label: 'Science', icon: '🔬', color: '#10B981' },
  'history': { label: 'History', icon: '🏛️', color: '#F59E0B' },
  'geography': { label: 'Geography', icon: '🌍', color: '#06B6D4' },
  'modern-languages': { label: 'Modern Languages', icon: '🗣️', color: '#8B5CF6' },
  'computer-science': { label: 'Computer Science', icon: '💻', color: '#6366F1' },
  'business': { label: 'Business', icon: '💼', color: '#059669' },
  'economics': { label: 'Economics', icon: '📈', color: '#DC2626' },
  'psychology': { label: 'Psychology', icon: '🧠', color: '#7C3AED' },
  'sociology': { label: 'Sociology', icon: '👥', color: '#0891B2' },
  'philosophy': { label: 'Philosophy', icon: '🤔', color: '#BE185D' },
  'art': { label: 'Art', icon: '🎨', color: '#EC4899' },
  'music': { label: 'Music', icon: '🎵', color: '#F97316' },
  'drama': { label: 'Drama', icon: '🎭', color: '#84CC16' },
  'physical-education': { label: 'Physical Education', icon: '⚽', color: '#22C55E' },
  'life-skills': { label: 'Life Skills', icon: '🏠', color: '#6B7280' },
  'careers': { label: 'Careers', icon: '🎯', color: '#1F2937' },
  'wellbeing': { label: 'Wellbeing', icon: '🧘', color: '#14B8A6' }
};

export const SUBSCRIPTION_TIERS: Record<SubscriptionTier, { 
  label: string; 
  description: string; 
  monthlyPrice: number; 
  yearlyPrice: number;
  features: string[];
}> = {
  'free': {
    label: 'Free',
    description: 'Basic access to platform',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Limited course access',
      'Basic webinars',
      'Community features'
    ]
  },
  'basic': {
    label: 'Basic',
    description: 'Enhanced learning experience',
    monthlyPrice: 999, // £9.99
    yearlyPrice: 9999, // £99.99
    features: [
      'Full course library',
      'All webinars',
      'AI assistant',
      'Progress tracking'
    ]
  },
  'premium': {
    label: 'Premium',
    description: 'Complete learning platform',
    monthlyPrice: 1999, // £19.99
    yearlyPrice: 19999, // £199.99
    features: [
      'Everything in Basic',
      'Debate room access',
      'Academic DNA',
      'Priority support',
      'Parent dashboard'
    ]
  },
  'school': {
    label: 'School',
    description: 'Institutional access',
    monthlyPrice: 4999, // £49.99 per student
    yearlyPrice: 49999, // £499.99 per student
    features: [
      'Everything in Premium',
      'School dashboard',
      'Custom branding',
      'Analytics',
      'Bulk management'
    ]
  }
};

export const USER_ROLES: Record<UserRole, { label: string; description: string }> = {
  'student': { label: 'Student', description: 'Learning platform access' },
  'teacher': { label: 'Teacher', description: 'Classroom management' },
  'parent': { label: 'Parent', description: 'Child progress monitoring' },
  'admin': { label: 'Admin', description: 'School administration' },
  'super-admin': { label: 'Super Admin', description: 'Platform administration' }
};

export const FILE_UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  ALLOWED_DOCUMENT_TYPES: ['pdf', 'doc', 'docx', 'txt'],
  ALLOWED_VIDEO_TYPES: ['mp4', 'webm', 'ogg']
};

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
};

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  COURSES: '/api/courses',
  WEBINARS: '/api/webinars',
  PAYMENTS: '/api/payments',
  SCHOOLS: '/api/schools'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  WEBINARS: '/webinars',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: '/admin'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'gen_elevate_auth_token',
  USER_PREFERENCES: 'gen_elevate_user_preferences',
  THEME: 'gen_elevate_theme'
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const;

export const DEBATE_SCORING_CRITERIA = {
  CLARITY: { label: 'Clarity', weight: 0.2, maxScore: 10 },
  STRUCTURE: { label: 'Structure', weight: 0.2, maxScore: 10 },
  REASONING: { label: 'Reasoning', weight: 0.25, maxScore: 10 },
  EVIDENCE: { label: 'Evidence', weight: 0.25, maxScore: 10 },
  DELIVERY: { label: 'Delivery', weight: 0.1, maxScore: 10 }
};

export const ACADEMIC_DNA_CATEGORIES = {
  COGNITIVE_STRENGTHS: [
    'Analytical Thinking',
    'Creative Problem Solving',
    'Memory Retention',
    'Pattern Recognition',
    'Logical Reasoning',
    'Spatial Intelligence'
  ],
  LEARNING_STYLES: [
    'Visual Learner',
    'Auditory Learner',
    'Kinesthetic Learner',
    'Reading/Writing Learner'
  ],
  STUDY_PREFERENCES: [
    'Morning Person',
    'Afternoon Focus',
    'Evening Learner',
    'Short Bursts',
    'Long Sessions',
    'Group Study',
    'Solo Study'
  ]
};
