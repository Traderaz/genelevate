/**
 * Subscription Guard Component
 * Protects features based on subscription tier and shows upgrade prompts
 */

'use client';

import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionPlan } from '@/lib/subscription-system';
import { Crown, Zap, Star, Lock, TrendingUp } from 'lucide-react';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  requiredPlan?: SubscriptionPlan;
  feature?: 'premiumContent' | 'aiAssistant' | 'exclusiveWebinars' | 'allCourses' | 'advancedAnalytics';
  fallback?: React.ReactNode;
  showUpgradePrompt?: boolean;
  className?: string;
}

const planIcons = {
  basic: Zap,
  premium: Star,
  pro: Crown
};

const planColors = {
  basic: 'text-blue-600 bg-blue-100',
  premium: 'text-purple-600 bg-purple-100',
  pro: 'text-yellow-600 bg-yellow-100'
};

export function SubscriptionGuard({
  children,
  requiredPlan,
  feature,
  fallback,
  showUpgradePrompt = true,
  className = ''
}: SubscriptionGuardProps) {
  const {
    effectivePlan,
    canAccessFeature,
    planDetails,
    upgradeSuggestions,
    formattedSubscription
  } = useSubscription();

  // Check access based on required plan or feature
  let hasAccess = true;
  let accessReason = '';

  if (requiredPlan) {
    const planHierarchy: SubscriptionPlan[] = ['basic', 'premium', 'pro'];
    const currentPlanIndex = effectivePlan ? planHierarchy.indexOf(effectivePlan) : -1;
    const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
    
    hasAccess = currentPlanIndex >= requiredPlanIndex;
    if (!hasAccess) {
      accessReason = effectivePlan 
        ? `This feature requires ${requiredPlan} plan or higher`
        : `This feature requires a ${requiredPlan} subscription`;
    }
  } else if (feature) {
    hasAccess = canAccessFeature(feature);
    if (!hasAccess) {
      accessReason = effectivePlan 
        ? `This feature is not included in your ${effectivePlan} plan`
        : 'This feature requires an active subscription';
    }
  }

  // If user has access, render children
  if (hasAccess) {
    return <>{children}</>;
  }

  // If custom fallback provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // If upgrade prompt disabled, render nothing
  if (!showUpgradePrompt) {
    return null;
  }

  // Render upgrade prompt
  const suggestedPlan = requiredPlan || upgradeSuggestions[0]?.plan;
  const PlanIcon = suggestedPlan ? planIcons[suggestedPlan] : Lock;
  const planColor = suggestedPlan ? planColors[suggestedPlan] : 'text-gray-600 bg-gray-100';

  return (
    <div className={`relative ${className}`}>
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none opacity-50">
        {children}
      </div>
      
      {/* Upgrade overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 text-center shadow-xl border">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full ${planColor}`}>
              {PlanIcon && <PlanIcon className="w-6 h-6" />}
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Upgrade Required
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {accessReason}
          </p>
          
          <div className="space-y-3">
            {/* Current plan */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Current: {formattedSubscription.planName} ({formattedSubscription.price})
            </div>
            
            {/* Upgrade suggestions */}
            {upgradeSuggestions.slice(0, 2).map((suggestion) => {
              const SuggestionIcon = planIcons[suggestion.plan];
              const suggestionColor = planColors[suggestion.plan];
              
              return (
                <button
                  key={suggestion.plan}
                  onClick={() => {
                    // Navigate to upgrade page or open upgrade modal
                    window.location.href = `/upgrade?plan=${suggestion.plan}`;
                  }}
                  className={`w-full p-3 rounded-lg border-2 border-transparent hover:border-current transition-colors ${suggestionColor}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {SuggestionIcon && <SuggestionIcon className="w-4 h-4" />}
                      <span className="font-medium text-sm">
                        Upgrade to {suggestion.plan.charAt(0).toUpperCase() + suggestion.plan.slice(1)}
                      </span>
                    </div>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-xs opacity-75 mt-1">
                    {suggestion.reason}
                  </div>
                </button>
              );
            })}
            
            {/* View all plans link */}
            <button
              onClick={() => {
                window.location.href = '/pricing';
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Convenience components for specific features
export function PremiumContentGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'feature'>) {
  return (
    <SubscriptionGuard feature="premiumContent" {...props}>
      {children}
    </SubscriptionGuard>
  );
}

export function AIAssistantGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'feature'>) {
  return (
    <SubscriptionGuard feature="aiAssistant" {...props}>
      {children}
    </SubscriptionGuard>
  );
}

export function ExclusiveWebinarGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'feature'>) {
  return (
    <SubscriptionGuard feature="exclusiveWebinars" {...props}>
      {children}
    </SubscriptionGuard>
  );
}

export function BasicPlanGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'requiredPlan'>) {
  return (
    <SubscriptionGuard requiredPlan="basic" {...props}>
      {children}
    </SubscriptionGuard>
  );
}

export function PremiumPlanGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'requiredPlan'>) {
  return (
    <SubscriptionGuard requiredPlan="premium" {...props}>
      {children}
    </SubscriptionGuard>
  );
}

export function ProPlanGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'requiredPlan'>) {
  return (
    <SubscriptionGuard requiredPlan="pro" {...props}>
      {children}
    </SubscriptionGuard>
  );
}
