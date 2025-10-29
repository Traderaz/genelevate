/**
 * Comprehensive Subscription System
 * Handles tier enforcement, feature access, and subscription management
 */

export type SubscriptionPlan = 'basic' | 'premium' | 'pro';
export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled' | 'expired' | 'past_due';

export interface SubscriptionDetails {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  expiresAt?: Date | any;
  startedAt?: Date | any;
  cancelledAt?: Date | any;
  amount?: number;
  currency?: string;
  autoRenew?: boolean;
  billingCycle?: string;
  paymentMethod?: string;
}

export interface PlanFeatures {
  name: string;
  price: number;
  currency: string;
  features: string[];
  limits: {
    coursesPerMonth: number;
    aiQuestionsPerDay: number;
    downloadableResources: number;
    liveWebinars: number;
    personalTutoring: boolean;
    prioritySupport: boolean;
    advancedAnalytics: boolean;
    customContent: boolean;
    offlineAccess: boolean;
    certificatesIncluded: boolean;
  };
  access: {
    allCourses: boolean;
    premiumContent: boolean;
    exclusiveWebinars: boolean;
    aiAssistant: boolean;
    progressTracking: boolean;
    mobileApp: boolean;
    communityAccess: boolean;
    mentorshipProgram: boolean;
  };
}

// Define subscription plans and their features
export const SUBSCRIPTION_PLANS: Record<SubscriptionPlan, PlanFeatures> = {
  basic: {
    name: 'Basic',
    price: 9.99,
    currency: 'GBP',
    features: [
      'Access to ALL courses',
      'ALL webinars and live sessions',
      'Download all resources',
      'Progress tracking',
      'Mobile app access',
      'Community access',
      'Email support'
    ],
    limits: {
      coursesPerMonth: -1, // Unlimited courses
      aiQuestionsPerDay: 0, // No AI access
      downloadableResources: -1, // Unlimited downloads
      liveWebinars: -1, // Unlimited webinars
      personalTutoring: false,
      prioritySupport: false,
      advancedAnalytics: false,
      customContent: false,
      offlineAccess: true,
      certificatesIncluded: true
    },
    access: {
      allCourses: true,
      premiumContent: false, // No premium content
      exclusiveWebinars: true,
      aiAssistant: false, // No AI tools
      progressTracking: true,
      mobileApp: true,
      communityAccess: true,
      mentorshipProgram: false
    }
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    currency: 'GBP',
    features: [
      'Everything in Basic',
      'AI Assistant & Tools',
      'Unlimited AI questions',
      'Advanced analytics',
      'Priority support',
      'Premium content access'
    ],
    limits: {
      coursesPerMonth: -1,
      aiQuestionsPerDay: -1, // Unlimited AI
      downloadableResources: -1,
      liveWebinars: -1,
      personalTutoring: false,
      prioritySupport: true,
      advancedAnalytics: true,
      customContent: false,
      offlineAccess: true,
      certificatesIncluded: true
    },
    access: {
      allCourses: true,
      premiumContent: true,
      exclusiveWebinars: true,
      aiAssistant: true, // AI tools included
      progressTracking: true,
      mobileApp: true,
      communityAccess: true,
      mentorshipProgram: true
    }
  },
  pro: {
    name: 'Pro',
    price: 39.99,
    currency: 'GBP',
    features: [
      'Everything in Premium',
      '1 paid addon per month included',
      '1-on-1 personal tutoring',
      'Custom content creation',
      'Dedicated support manager',
      'API access'
    ],
    limits: {
      coursesPerMonth: -1,
      aiQuestionsPerDay: -1,
      downloadableResources: -1,
      liveWebinars: -1,
      personalTutoring: true,
      prioritySupport: true,
      advancedAnalytics: true,
      customContent: true,
      offlineAccess: true,
      certificatesIncluded: true
    },
    access: {
      allCourses: true,
      premiumContent: true,
      exclusiveWebinars: true,
      aiAssistant: true,
      progressTracking: true,
      mobileApp: true,
      communityAccess: true,
      mentorshipProgram: true
    }
  }
};

/**
 * Check if a subscription is currently active
 */
export function isSubscriptionActive(subscription?: SubscriptionDetails): boolean {
  if (!subscription) return false;
  
  if (subscription.status !== 'active') return false;
  
  if (subscription.expiresAt) {
    const expiryDate = subscription.expiresAt instanceof Date 
      ? subscription.expiresAt 
      : subscription.expiresAt.toDate ? subscription.expiresAt.toDate() 
      : new Date(subscription.expiresAt);
    
    return expiryDate > new Date();
  }
  
  return true;
}

/**
 * Get the effective plan (considering subscription status)
 */
export function getEffectivePlan(subscription?: SubscriptionDetails): SubscriptionPlan | null {
  if (!subscription || !isSubscriptionActive(subscription)) {
    return null; // No access if subscription is inactive
  }
  return subscription.plan;
}

/**
 * Check if user has access to a specific feature
 */
export function hasFeatureAccess(
  subscription: SubscriptionDetails | undefined,
  feature: keyof PlanFeatures['access']
): boolean {
  const effectivePlan = getEffectivePlan(subscription);
  if (!effectivePlan) return false; // No access without active subscription
  return SUBSCRIPTION_PLANS[effectivePlan].access[feature];
}

/**
 * Check if user can access premium content
 */
export function canAccessPremiumContent(subscription?: SubscriptionDetails): boolean {
  return hasFeatureAccess(subscription, 'premiumContent');
}

/**
 * Check if user can access AI assistant
 */
export function canAccessAI(subscription?: SubscriptionDetails): boolean {
  return hasFeatureAccess(subscription, 'aiAssistant');
}

/**
 * Get remaining AI questions for today
 */
export function getAIQuestionsRemaining(
  subscription: SubscriptionDetails | undefined,
  usedToday: number = 0
): number {
  const effectivePlan = getEffectivePlan(subscription);
  if (!effectivePlan) return 0; // No access without subscription
  
  const dailyLimit = SUBSCRIPTION_PLANS[effectivePlan].limits.aiQuestionsPerDay;
  
  if (dailyLimit === -1) return -1; // Unlimited
  if (dailyLimit === 0) return 0; // No AI access
  return Math.max(0, dailyLimit - usedToday);
}

/**
 * Check if user can join a webinar
 */
export function canJoinWebinar(
  subscription: SubscriptionDetails | undefined,
  isExclusive: boolean = false
): boolean {
  if (isExclusive) {
    return hasFeatureAccess(subscription, 'exclusiveWebinars');
  }
  return hasFeatureAccess(subscription, 'allCourses');
}

/**
 * Check if user can download resources
 */
export function canDownloadResource(
  subscription: SubscriptionDetails | undefined,
  downloadsThisMonth: number = 0
): boolean {
  const effectivePlan = getEffectivePlan(subscription);
  if (!effectivePlan) return false; // No access without subscription
  
  const monthlyLimit = SUBSCRIPTION_PLANS[effectivePlan].limits.downloadableResources;
  
  if (monthlyLimit === -1) return true; // Unlimited
  return downloadsThisMonth < monthlyLimit;
}

/**
 * Check if user can access a course
 */
export function canAccessCourse(
  subscription: SubscriptionDetails | undefined,
  courseType: 'basic' | 'premium' = 'basic',
  coursesAccessedThisMonth: number = 0
): boolean {
  const effectivePlan = getEffectivePlan(subscription);
  if (!effectivePlan) return false; // No access without subscription
  
  const plan = SUBSCRIPTION_PLANS[effectivePlan];
  
  // Check course type access
  if (courseType === 'premium' && !plan.access.premiumContent) {
    return false;
  }
  
  // All paid plans have unlimited course access
  return true;
}

/**
 * Get subscription upgrade suggestions
 */
export function getUpgradeSuggestions(
  currentSubscription?: SubscriptionDetails
): { plan: SubscriptionPlan; reason: string; benefits: string[] }[] {
  const currentPlan = getEffectivePlan(currentSubscription);
  const suggestions: { plan: SubscriptionPlan; reason: string; benefits: string[] }[] = [];
  
  // If no subscription, suggest Basic first
  if (!currentPlan) {
    suggestions.push({
      plan: 'basic',
      reason: 'Get access to all courses and webinars',
      benefits: ['All courses', 'All webinars', 'Download resources', 'Progress tracking']
    });
  }
  
  // If Basic, suggest Premium for AI tools
  if (!currentPlan || currentPlan === 'basic') {
    suggestions.push({
      plan: 'premium',
      reason: 'Add AI tools and premium content',
      benefits: ['AI Assistant', 'Premium content', 'Advanced analytics', 'Priority support']
    });
  }
  
  // Always suggest Pro (unless already Pro)
  if (currentPlan !== 'pro') {
    suggestions.push({
      plan: 'pro',
      reason: 'Get everything plus 1 paid addon per month',
      benefits: ['1 paid addon/month', 'Personal tutoring', 'Custom content', 'Dedicated support']
    });
  }
  
  return suggestions;
}

/**
 * Format subscription for display
 */
export function formatSubscription(subscription?: SubscriptionDetails): {
  planName: string;
  status: string;
  price: string;
  expiryText: string;
} {
  const effectivePlan = getEffectivePlan(subscription);
  
  if (!effectivePlan) {
    return {
      planName: 'No Subscription',
      status: 'inactive',
      price: 'No access',
      expiryText: 'Subscribe to access content'
    };
  }
  
  const planDetails = SUBSCRIPTION_PLANS[effectivePlan];
  
  let expiryText = '';
  if (subscription?.expiresAt) {
    const expiryDate = subscription.expiresAt instanceof Date 
      ? subscription.expiresAt 
      : subscription.expiresAt.toDate ? subscription.expiresAt.toDate() 
      : new Date(subscription.expiresAt);
    
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      expiryText = 'Expired';
    } else if (daysUntilExpiry === 0) {
      expiryText = 'Expires today';
    } else if (daysUntilExpiry === 1) {
      expiryText = 'Expires tomorrow';
    } else if (daysUntilExpiry <= 7) {
      expiryText = `Expires in ${daysUntilExpiry} days`;
    } else {
      expiryText = `Expires ${expiryDate.toLocaleDateString()}`;
    }
  }
  
  return {
    planName: planDetails.name,
    status: subscription?.status || 'inactive',
    price: planDetails.price === 0 ? 'Free' : `£${planDetails.price}/month`,
    expiryText
  };
}

/**
 * Create a usage tracking object for subscription limits
 */
export interface UsageTracking {
  aiQuestionsToday: number;
  coursesThisMonth: number;
  downloadsThisMonth: number;
  webinarsThisMonth: number;
  lastReset: Date;
}

/**
 * Check if user has exceeded their usage limits
 */
export function checkUsageLimits(
  subscription: SubscriptionDetails | undefined,
  usage: UsageTracking
): {
  aiQuestions: { allowed: number; used: number; remaining: number; exceeded: boolean };
  courses: { allowed: number; used: number; remaining: number; exceeded: boolean };
  downloads: { allowed: number; used: number; remaining: number; exceeded: boolean };
  webinars: { allowed: number; used: number; remaining: number; exceeded: boolean };
} {
  const effectivePlan = getEffectivePlan(subscription);
  
  if (!effectivePlan) {
    // No access without subscription
    const noAccess = { allowed: 0, used: 0, remaining: 0, exceeded: true };
    return {
      aiQuestions: noAccess,
      courses: noAccess,
      downloads: noAccess,
      webinars: noAccess
    };
  }
  
  const limits = SUBSCRIPTION_PLANS[effectivePlan].limits;
  
  const checkLimit = (allowed: number, used: number) => ({
    allowed: allowed === -1 ? Infinity : allowed,
    used,
    remaining: allowed === -1 ? Infinity : Math.max(0, allowed - used),
    exceeded: allowed !== -1 && used >= allowed
  });
  
  return {
    aiQuestions: checkLimit(limits.aiQuestionsPerDay, usage.aiQuestionsToday),
    courses: checkLimit(limits.coursesPerMonth, usage.coursesThisMonth),
    downloads: checkLimit(limits.downloadableResources, usage.downloadsThisMonth),
    webinars: checkLimit(limits.liveWebinars, usage.webinarsThisMonth)
  };
}
