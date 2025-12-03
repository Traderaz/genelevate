'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionPlan } from '@/lib/subscription-system';
import { Loader2, Lock, Crown, Star, Zap, Check } from 'lucide-react';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  requiredPlan?: SubscriptionPlan;
  feature?: 'aiAssistant' | 'premiumContent' | 'exclusiveWebinars' | 'allCourses';
  redirectTo?: string;
}

const planIcons = {
  'all-access': Star,
  basic: Zap,
  premium: Star,
  pro: Crown
};

const planColors = {
  'all-access': 'text-teal-600 bg-teal-100',
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
  
  // STRICT SUBSCRIPTION ENFORCEMENT - No bypass
  const effectivePlan = (userProfile?.subscription?.plan || 'free') as SubscriptionPlan; // Default to free (no access)
  const subscriptionStatus = userProfile?.subscription?.status || 'inactive';
  const expiresAt = userProfile?.subscription?.expiresAt;
  
  // Check if subscription is active
  const isSubscriptionActive = subscriptionStatus === 'active' && (
    !expiresAt || new Date(expiresAt) > new Date()
  );
  
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

  // STRICT ACCESS CONTROL
  let hasAccess = false;
  let accessReason = '';

  // Must be logged in
  if (!user) {
    hasAccess = false;
    accessReason = 'Please log in to access this content';
  }
  // Admin and content creators bypass subscription checks
  else if (userProfile?.role === 'admin' || userProfile?.role === 'content-creator') {
    hasAccess = true; // Admins and content creators always have full access
  }
  // Parent accounts get free read-only access (they're linked to paid students)
  else if (userProfile?.role === 'parent') {
    hasAccess = true; // Parents always have access (read-only)
  }
  // Must have active subscription (not free)
  else if (!isSubscriptionActive || effectivePlan === 'free') {
    hasAccess = false;
    accessReason = 'Active subscription required to access this content';
  }
  // Check if plan meets requirements
  else if (requiredPlan) {
    // all-access is accepted for any requirement
    const hasValidPlan = effectivePlan === 'all-access' || 
                          effectivePlan === requiredPlan ||
                          (effectivePlan === 'pro' || effectivePlan === 'premium' || effectivePlan === 'basic');
    if (!hasValidPlan) {
      hasAccess = false;
      accessReason = `This content requires an active subscription`;
    } else {
      hasAccess = true;
    }
  }
  // Check specific feature access
  else if (feature) {
    // all-access and paid plans get all features
    const hasPaidPlan = (effectivePlan as string) !== 'free' && isSubscriptionActive;
    if (hasPaidPlan) {
      hasAccess = true;
    } else {
      hasAccess = false;
      accessReason = `This feature requires an active subscription`;
    }
  }
  // If no specific requirements, still require paid subscription
  else {
    // Must have active subscription and NOT be on free plan
    const isFree = (effectivePlan as string) === 'free';
    hasAccess = isSubscriptionActive && !isFree;
    if (!hasAccess) {
      accessReason = 'Active paid subscription required to access the dashboard';
    }
  }

  // If user has access, render children
  if (hasAccess) {
    return <>{children}</>;
  }

  // Show subscription required page - redirect to pricing
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-primary via-teal-blue-medium to-[#0B5C9E] text-white flex items-center justify-center p-6">
      <div className="max-w-lg mx-auto text-center space-y-8">
        {/* Lock Icon */}
        <div className="flex justify-center">
          <div className="p-8 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20">
            <Lock className="w-16 h-16" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Subscription Required</h1>
          <p className="text-white/90 text-xl leading-relaxed">
            {accessReason}
          </p>
          <p className="text-white/70 text-base">
            Get instant access to all courses, AI tools, webinars, and more with our All-Access Membership.
          </p>
        </div>

        {/* Current Status */}
        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            {(() => {
              const CurrentIcon = planIcons[effectivePlan as keyof typeof planIcons] || Lock;
              return <CurrentIcon className="w-6 h-6" />;
            })()}
            <p className="text-xl font-bold capitalize">{effectivePlan} Plan</p>
          </div>
          {effectivePlan === 'free' && (
            <p className="text-white/70 text-sm">
              Free accounts have limited access. Upgrade to unlock everything!
            </p>
          )}
          {expiresAt && new Date(expiresAt) < new Date() && (
            <p className="text-red-300 text-sm font-semibold mt-2">
              ⚠️ Your subscription expired on {new Date(expiresAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <button
            onClick={() => router.push('/pricing')}
            className="w-full px-8 py-4 bg-gradient-to-r from-teal-gold to-yellow-500 hover:from-teal-gold hover:to-teal-gold text-brand-navy font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View Pricing & Subscribe
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
          >
            Go Back
          </button>
        </div>

        {/* Benefits Preview */}
        <div className="pt-6 border-t border-white/20">
          <p className="text-sm text-white/60 mb-4">With All-Access Membership (£29.99/month):</p>
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-gold flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/80">All courses</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-gold flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/80">AI Assistant</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-gold flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/80">Live webinars</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-gold flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/80">Career guidance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Convenience components for specific requirements
// Note: With single all-access plan, all these guards behave the same
export function BasicPlanGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'requiredPlan'>) {
  return (
    <SubscriptionGuard requiredPlan="all-access" {...props}>
      {children}
    </SubscriptionGuard>
  );
}

export function PremiumPlanGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'requiredPlan'>) {
  return (
    <SubscriptionGuard requiredPlan="all-access" {...props}>
      {children}
    </SubscriptionGuard>
  );
}

export function ProPlanGuard({ children, ...props }: Omit<SubscriptionGuardProps, 'requiredPlan'>) {
  return (
    <SubscriptionGuard requiredPlan="all-access" {...props}>
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
