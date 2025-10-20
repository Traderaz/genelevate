'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  X,
  Check,
  Crown,
  Zap,
  Users,
  Star,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface SubscriptionManagerProps {
  onClose: () => void;
}

export function SubscriptionManager({ onClose }: SubscriptionManagerProps) {
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plans = [
    {
      id: 'student',
      name: 'Student',
      price: 9.99,
      priceDisplay: '£9.99',
      period: 'per month',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      description: 'Perfect for individual learners',
      features: [
        'Access to 200+ courses',
        '5 live webinars per month',
        'Basic AI tutoring',
        'Progress tracking',
        'Mobile app access',
        'Community forums'
      ],
      limitations: [
        'No offline downloads',
        'Standard video quality'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      priceDisplay: '£19.99',
      period: 'per month',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      popular: true,
      description: 'Most popular for serious students',
      features: [
        'Access to all 500+ courses',
        'Unlimited live webinars',
        'Advanced AI tutoring',
        'Personalized learning paths',
        'Offline downloads',
        'HD video quality',
        'Priority support',
        'Certificates of completion',
        '1-on-1 mentoring sessions'
      ],
      limitations: []
    },
    {
      id: 'institution',
      name: 'Institution',
      price: 49.99,
      priceDisplay: '£49.99',
      period: 'per month',
      icon: Crown,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      description: 'For schools and organizations',
      features: [
        'Everything in Premium',
        'Up to 100 student accounts',
        'Admin dashboard',
        'Custom branding',
        'Advanced analytics',
        'Bulk enrollment',
        'API access',
        'Dedicated support',
        'Custom content creation',
        'White-label solution'
      ],
      limitations: [],
      isInstitutional: true
    }
  ];

  const currentPlan = userProfile?.subscription?.plan || 'free';
  const pendingChange = userProfile?.subscription?.pendingPlanChange;

  // Determine plan order for upgrade/downgrade logic
  const planOrder = ['free', 'student', 'premium', 'institution'];
  const getCurrentPlanIndex = () => planOrder.indexOf(currentPlan);
  
  const isUpgrade = (targetPlanId: string) => {
    return planOrder.indexOf(targetPlanId) > getCurrentPlanIndex();
  };

  const isDowngrade = (targetPlanId: string) => {
    return planOrder.indexOf(targetPlanId) < getCurrentPlanIndex();
  };

  const isCurrentPlan = (planId: string) => {
    return currentPlan === planId;
  };

  const handlePlanChange = async (newPlanId: string) => {
    if (!user || !userProfile) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Call the API to manage subscription
      const response = await fetch('/api/manage-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          currentPlan: currentPlan,
          newPlan: newPlanId,
          action: 'change',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change subscription');
      }

      // Handle institutional plans
      if (data.requiresContact) {
        alert('Please contact our sales team at sales@genelevate.com for institutional pricing and setup.');
        setIsLoading(false);
        return;
      }

      // Handle upgrades (immediate + Stripe checkout)
      if (data.immediate && data.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl;
        return;
      }

      // Handle downgrades (30-day delay)
      if (!data.immediate && data.effectiveDate) {
        const userRef = doc(db as any, 'users', user.uid);
        await updateDoc(userRef, {
          'subscription.pendingPlanChange': {
            newPlan: newPlanId,
            effectiveDate: Timestamp.fromDate(new Date(data.effectiveDate)),
            type: 'downgrade',
          },
          updatedAt: Timestamp.now(),
        });

        alert(data.message);
        window.location.reload();
        return;
      }

      // Default success
      alert(data.message || 'Subscription updated successfully!');
      window.location.reload();

    } catch (error: any) {
      console.error('Error changing subscription:', error);
      setError(error.message || 'Failed to change subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!user || !userProfile) return;
    
    const confirmed = window.confirm(
      'Are you sure you want to cancel your subscription? You will retain access to your current features for 30 days, then your plan will revert to the free tier.'
    );

    if (!confirmed) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/manage-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          currentPlan: currentPlan,
          newPlan: 'free',
          action: 'cancel',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      // Update Firestore with pending cancellation
      const userRef = doc(db as any, 'users', user.uid);
      await updateDoc(userRef, {
        'subscription.status': 'cancelled',
        'subscription.pendingPlanChange': {
          newPlan: 'free',
          effectiveDate: Timestamp.fromDate(new Date(data.effectiveDate)),
          type: 'cancel',
        },
        updatedAt: Timestamp.now(),
      });

      alert(data.message || 'Your subscription has been cancelled. You will retain access until the end of your billing period.');
      window.location.reload();

    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      setError(error.message || 'Failed to cancel subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelPendingChange = async () => {
    if (!user || !pendingChange) return;

    const confirmed = window.confirm('Are you sure you want to cancel this pending change?');
    if (!confirmed) return;

    setIsLoading(true);
    setError(null);

    try {
      const userRef = doc(db as any, 'users', user.uid);
      await updateDoc(userRef, {
        'subscription.pendingPlanChange': null,
        'subscription.status': 'active',
        updatedAt: Timestamp.now(),
      });

      alert('Pending change cancelled successfully.');
      window.location.reload();
    } catch (error: any) {
      console.error('Error cancelling pending change:', error);
      setError(error.message || 'Failed to cancel pending change.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Manage Subscription</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Current Plan: <span className="font-semibold text-foreground capitalize">{currentPlan}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-500">Error</p>
              <p className="text-sm text-red-400 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Pending Change Banner */}
        {pendingChange && (
          <div className="mx-6 mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {pendingChange.type === 'downgrade' ? (
                  <TrendingDown className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium text-orange-500">Pending Change</p>
                  <p className="text-sm text-orange-400 mt-1">
                    Your plan will change to <span className="font-semibold capitalize">{pendingChange.newPlan}</span> on{' '}
                    {pendingChange.effectiveDate?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancelPendingChange}
                disabled={isLoading}
                className="px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 text-sm font-medium rounded-md transition-colors disabled:opacity-50"
              >
                Cancel Change
              </button>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isActive = isCurrentPlan(plan.id);
              const willUpgrade = isUpgrade(plan.id);
              const willDowngrade = isDowngrade(plan.id);
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`relative border-2 rounded-2xl p-6 transition-all ${
                    isActive
                      ? `${plan.borderColor} ${plan.bgColor} border-opacity-100`
                      : 'border-border hover:border-primary/30'
                  } ${plan.popular ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}

                  {/* Current Plan Badge */}
                  {isActive && (
                    <div className="absolute -top-3 right-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      Current Plan
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 ${plan.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${plan.color}`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">{plan.priceDisplay}</span>
                      <span className="text-sm text-muted-foreground">/{plan.period.split(' ')[1]}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start gap-2 opacity-60">
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handlePlanChange(plan.id)}
                    disabled={isLoading || isActive || !!pendingChange}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      isActive
                        ? 'bg-muted text-muted-foreground cursor-default'
                        : willUpgrade
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2'
                        : willDowngrade
                        ? 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border border-orange-500/30 flex items-center justify-center gap-2'
                        : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }`}
                  >
                    {isActive ? (
                      'Current Plan'
                    ) : willUpgrade ? (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        Upgrade Now
                      </>
                    ) : willDowngrade ? (
                      <>
                        <TrendingDown className="w-4 h-4" />
                        Downgrade (30 days)
                      </>
                    ) : (
                      'Select Plan'
                    )}
                  </button>

                  {/* Upgrade/Downgrade Note */}
                  {willUpgrade && !isActive && (
                    <p className="text-xs text-green-500 text-center mt-2">
                      ✨ Takes effect immediately
                    </p>
                  )}
                  {willDowngrade && !isActive && (
                    <p className="text-xs text-orange-500 text-center mt-2">
                      ⏱️ Takes effect in 30 days
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cancel Subscription */}
          {currentPlan !== 'free' && !pendingChange && (
            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-center">
                <button
                  onClick={handleCancelSubscription}
                  disabled={isLoading}
                  className="text-sm text-red-500 hover:text-red-400 underline transition-colors disabled:opacity-50"
                >
                  Cancel Subscription
                </button>
                <p className="text-xs text-muted-foreground mt-2">
                  You'll retain access for 30 days before reverting to the free plan
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
