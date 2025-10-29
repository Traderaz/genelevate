'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionPlan } from '@/lib/subscription-system';
import { Loader2, Lock, Crown, Star, Zap } from 'lucide-react';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  requiredPlan?: SubscriptionPlan;
  feature?: 'aiAssistant' | 'premiumContent' | 'exclusiveWebinars' | 'allCourses';
  redirectTo?: string;
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
  redirectTo 
}: SubscriptionGuardProps) {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  
  // Temporarily bypass subscription checking for testing
  const effectivePlan = userProfile?.subscription?.plan || 'pro'; // Default to pro for testing
  const canAccessFeature = () => true; // Allow all features for testing
  const subscriptionLoading = false;
  const upgradeSuggestions: Array<{ plan: keyof typeof planIcons; description: string; price: string; reason: string }> = [];

  // Combine all effects into one to maintain hooks order
  useEffect(() => {
    // First, handle loading state
    if (!authLoading && !subscriptionLoading) {
      setChecking(false);
    }
    
    // Then handle redirect if needed
    if (!checking && !user && !authLoading) {
      if (redirectTo) {
        router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
      } else {
        router.push('/login');
      }
    }
  }, [authLoading, subscriptionLoading, checking, user, router, redirectTo]);

  // Show loading while checking auth and subscription
  if (checking || authLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
          <p className="text-gray-400">Checking access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show loading while redirecting
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
          <p className="text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Temporarily allow all access for testing
  let hasAccess = true;
  let accessReason = '';

  // For testing: always allow access if user is logged in
  if (!user) {
    hasAccess = false;
    accessReason = 'Please log in to access this content';
  }

  // If user has access, render children
  if (hasAccess) {
    return <>{children}</>;
  }

  // Show subscription required page
  const suggestedPlan = requiredPlan || upgradeSuggestions[0]?.plan;
  const PlanIcon = suggestedPlan ? (planIcons[suggestedPlan as keyof typeof planIcons] || Lock) : Lock;
  const planColor = suggestedPlan ? (planColors[suggestedPlan as keyof typeof planColors] || 'text-gray-600 bg-gray-100') : 'text-gray-600 bg-gray-100';

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center space-y-8">
        {/* Lock Icon */}
        <div className="flex justify-center">
          <div className={`p-6 rounded-full ${planColor}`}>
            <PlanIcon className="w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Subscription Required</h1>
          <p className="text-gray-400 text-lg">
            {accessReason}
          </p>
        </div>

        {/* Current Plan */}
        {effectivePlan && (
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
            <p className="text-sm text-gray-400 mb-2">Your current plan:</p>
            <div className="flex items-center justify-center gap-2">
              {(() => {
                const CurrentIcon = planIcons[effectivePlan as keyof typeof planIcons] || Lock;
                return <CurrentIcon className="w-5 h-5" />;
              })()}
              <span className="font-semibold capitalize">{effectivePlan}</span>
            </div>
          </div>
        )}

        {/* Upgrade Options */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Choose Your Plan</h3>
          
          <div className="space-y-3">
            {upgradeSuggestions.slice(0, 2).map((suggestion) => {
              const SuggestionIcon = planIcons[suggestion.plan] || Lock;
              const suggestionColor = planColors[suggestion.plan] || 'text-gray-600 bg-gray-100';
              
              return (
                <button
                  key={suggestion.plan}
                  onClick={() => router.push(`/pricing?plan=${suggestion.plan}`)}
                  className={`w-full p-4 rounded-lg border-2 border-transparent hover:border-current transition-colors ${suggestionColor} text-black`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SuggestionIcon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">
                          {suggestion.plan.charAt(0).toUpperCase() + suggestion.plan.slice(1)}
                        </div>
                        <div className="text-sm opacity-75">
                          {suggestion.reason}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        £{suggestion.plan === 'basic' ? '9.99' : suggestion.plan === 'premium' ? '19.99' : '39.99'}
                      </div>
                      <div className="text-xs opacity-75">/month</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/pricing')}
            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            View All Plans
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500">
          Need help? <a href="/contact" className="text-red-400 hover:text-red-300">Contact support</a>
        </p>
      </div>
    </div>
  );
}

// Convenience components for specific requirements
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

export function AIFeatureGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'feature'>) {
  return (
    <SubscriptionGuard feature="aiAssistant" {...props}>
      {children}
    </SubscriptionGuard>
  );
}
