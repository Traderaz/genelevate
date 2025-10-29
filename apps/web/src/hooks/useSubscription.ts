/**
 * React Hook for Subscription Management
 * Provides easy access to subscription features and enforcement
 */

import { useAuth } from '@/contexts/auth-context';
import {
  SubscriptionDetails,
  SubscriptionPlan,
  SUBSCRIPTION_PLANS,
  isSubscriptionActive,
  getEffectivePlan,
  hasFeatureAccess,
  canAccessPremiumContent,
  canAccessAI,
  getAIQuestionsRemaining,
  canJoinWebinar,
  canDownloadResource,
  canAccessCourse,
  getUpgradeSuggestions,
  formatSubscription,
  checkUsageLimits,
  UsageTracking
} from '@/lib/subscription-system';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useSubscription() {
  const { userProfile } = useAuth();
  const [usage, setUsage] = useState<UsageTracking>({
    aiQuestionsToday: 0,
    coursesThisMonth: 0,
    downloadsThisMonth: 0,
    webinarsThisMonth: 0,
    lastReset: new Date()
  });
  const [loading, setLoading] = useState(true);

  // Get subscription from user profile
  const subscription: SubscriptionDetails | undefined = userProfile?.subscription as SubscriptionDetails;

  // Load usage data from Firebase
  useEffect(() => {
    if (userProfile?.uid) {
      loadUsageData();
    }
  }, [userProfile?.uid]);

  const loadUsageData = async () => {
    if (!userProfile?.uid) return;
    
    try {
      setLoading(true);
      const usageDoc = await getDoc(doc(db, 'userUsage', userProfile.uid));
      
      if (usageDoc.exists()) {
        const data = usageDoc.data();
        const lastReset = data.lastReset?.toDate() || new Date();
        const today = new Date();
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        // Reset daily counters if it's a new day
        const isNewDay = lastReset.toDateString() !== today.toDateString();
        // Reset monthly counters if it's a new month
        const isNewMonth = lastReset < thisMonth;
        
        setUsage({
          aiQuestionsToday: isNewDay ? 0 : (data.aiQuestionsToday || 0),
          coursesThisMonth: isNewMonth ? 0 : (data.coursesThisMonth || 0),
          downloadsThisMonth: isNewMonth ? 0 : (data.downloadsThisMonth || 0),
          webinarsThisMonth: isNewMonth ? 0 : (data.webinarsThisMonth || 0),
          lastReset: today
        });
        
        // Update reset date if needed
        if (isNewDay || isNewMonth) {
          await updateDoc(doc(db, 'userUsage', userProfile.uid), {
            aiQuestionsToday: isNewDay ? 0 : data.aiQuestionsToday,
            coursesThisMonth: isNewMonth ? 0 : data.coursesThisMonth,
            downloadsThisMonth: isNewMonth ? 0 : data.downloadsThisMonth,
            webinarsThisMonth: isNewMonth ? 0 : data.webinarsThisMonth,
            lastReset: today
          });
        }
      } else {
        // Initialize usage tracking for new user
        const initialUsage = {
          aiQuestionsToday: 0,
          coursesThisMonth: 0,
          downloadsThisMonth: 0,
          webinarsThisMonth: 0,
          lastReset: new Date()
        };
        
        setUsage(initialUsage);
        await updateDoc(doc(db, 'userUsage', userProfile.uid), initialUsage);
      }
    } catch (error) {
      console.error('Error loading usage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUsage = async (type: keyof Omit<UsageTracking, 'lastReset'>, increment: number = 1) => {
    if (!userProfile?.uid) return false;
    
    try {
      const newUsage = { ...usage, [type]: usage[type] + increment };
      setUsage(newUsage);
      
      await updateDoc(doc(db, 'userUsage', userProfile.uid), {
        [type]: newUsage[type],
        lastReset: new Date()
      });
      
      return true;
    } catch (error) {
      console.error('Error updating usage:', error);
      return false;
    }
  };

  // Subscription status
  const isActive = isSubscriptionActive(subscription);
  const effectivePlan = getEffectivePlan(subscription);
  const planDetails = SUBSCRIPTION_PLANS[effectivePlan];
  const formattedSubscription = formatSubscription(subscription);
  const usageLimits = checkUsageLimits(subscription, usage);

  // Feature access checks
  const canAccessFeature = (feature: keyof typeof planDetails.access) => 
    hasFeatureAccess(subscription, feature);

  // Specific access checks with usage tracking
  const checkAIAccess = () => {
    if (!canAccessAI(subscription)) return { allowed: false, reason: 'AI not included in your plan' };
    
    const remaining = getAIQuestionsRemaining(subscription, usage.aiQuestionsToday);
    if (remaining === 0) return { allowed: false, reason: 'Daily AI question limit reached' };
    
    return { allowed: true, remaining };
  };

  const checkCourseAccess = (courseType: 'basic' | 'premium' = 'basic') => {
    if (!canAccessCourse(subscription, courseType, usage.coursesThisMonth)) {
      if (courseType === 'premium' && !canAccessPremiumContent(subscription)) {
        return { allowed: false, reason: 'Premium content not included in your plan' };
      }
      return { allowed: false, reason: 'Monthly course limit reached' };
    }
    return { allowed: true };
  };

  const checkDownloadAccess = () => {
    if (!canDownloadResource(subscription, usage.downloadsThisMonth)) {
      return { allowed: false, reason: 'Monthly download limit reached' };
    }
    return { allowed: true };
  };

  const checkWebinarAccess = (isExclusive: boolean = false) => {
    if (!canJoinWebinar(subscription, isExclusive)) {
      if (isExclusive) {
        return { allowed: false, reason: 'Exclusive webinars not included in your plan' };
      }
      return { allowed: false, reason: 'Webinars not included in your plan' };
    }
    
    if (usageLimits.webinars.exceeded) {
      return { allowed: false, reason: 'Monthly webinar limit reached' };
    }
    
    return { allowed: true };
  };

  // Usage tracking functions
  const trackAIQuestion = () => updateUsage('aiQuestionsToday');
  const trackCourseAccess = () => updateUsage('coursesThisMonth');
  const trackDownload = () => updateUsage('downloadsThisMonth');
  const trackWebinarJoin = () => updateUsage('webinarsThisMonth');

  // Upgrade suggestions
  const upgradeSuggestions = getUpgradeSuggestions(subscription);

  return {
    // Subscription info
    subscription,
    isActive,
    effectivePlan,
    planDetails,
    formattedSubscription,
    
    // Usage tracking
    usage,
    usageLimits,
    loading,
    
    // Access checks
    canAccessFeature,
    checkAIAccess,
    checkCourseAccess,
    checkDownloadAccess,
    checkWebinarAccess,
    
    // Specific feature checks
    canAccessPremium: () => canAccessPremiumContent(subscription),
    canAccessAI: () => canAccessAI(subscription),
    canJoinWebinars: () => hasFeatureAccess(subscription, 'exclusiveWebinars'),
    hasPrioritySupport: () => planDetails.limits.prioritySupport,
    hasPersonalTutoring: () => planDetails.limits.personalTutoring,
    hasAdvancedAnalytics: () => planDetails.limits.advancedAnalytics,
    
    // Usage tracking
    trackAIQuestion,
    trackCourseAccess,
    trackDownload,
    trackWebinarJoin,
    
    // Upgrade info
    upgradeSuggestions,
    
    // Utility functions
    refreshUsage: loadUsageData
  };
}
