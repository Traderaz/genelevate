'use client';

import { useState } from 'react';
import { Check, Star, Crown, Zap, Users } from 'lucide-react';

export function NetflixPricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Basic',
      icon: Zap,
      description: 'Perfect for dedicated learners',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      yearlyDiscount: '17% off',
      features: [
        'Access to ALL courses',
        'ALL webinars and live sessions',
        'Download all resources',
        'Progress tracking',
        'Mobile app access',
        'Community access',
        'Email support',
        'Certificates of completion',
      ],
      limitations: [
        'No AI assistant or tools',
        'No premium content access',
      ],
      popular: false,
      cta: 'Get Started',
    },
    {
      name: 'Premium',
      icon: Star,
      description: 'Most popular - includes AI tools',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      yearlyDiscount: '17% off',
      features: [
        'Everything in Basic',
        'AI Assistant & Tools',
        'Unlimited AI questions',
        'Premium content access',
        'Advanced analytics',
        'Priority support',
        'Mentorship program access',
      ],
      limitations: [],
      popular: true,
      cta: 'Get Started',
    },
    {
      name: 'Pro',
      icon: Crown,
      description: 'Ultimate plan with personal tutoring',
      monthlyPrice: 39.99,
      yearlyPrice: 399.99,
      yearlyDiscount: '17% off',
      features: [
        'Everything in Premium',
        '1 paid addon per month included',
        '1-on-1 personal tutoring',
        'Custom content creation',
        'Dedicated support manager',
        'API access',
        'White-label features',
      ],
      limitations: [],
      popular: false,
      cta: 'Get Started',
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (billingCycle === 'yearly') {
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlyCost = plan.yearlyPrice;
      return monthlyCost - yearlyCost;
    }
    return 0;
  };

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your <span className="netflix-text-gradient">Learning Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Unlock your potential with our flexible subscription plans. 
            Choose the perfect plan for your learning journey.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-card border border-border rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 relative ${
                billingCycle === 'yearly'
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-netflix-red text-white text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 netflix-card ${
                plan.popular
                  ? 'bg-gradient-to-b from-netflix-red/10 to-background border-2 border-netflix-red scale-105'
                  : 'bg-card border border-border hover:border-netflix-red/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-netflix-red text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-netflix-red/10 rounded-full mb-4">
                  <plan.icon className="w-8 h-8 text-netflix-red" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    ${getPrice(plan).toFixed(0)}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingCycle === 'yearly' && getSavings(plan) > 0 && (
                  <div className="text-sm text-netflix-red font-medium">
                    Save ${getSavings(plan).toFixed(0)} per year
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-netflix-red flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-start gap-3 opacity-60">
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                      <div className="w-3 h-3 border border-muted-foreground rounded-full mx-auto mt-1"></div>
                    </div>
                    <span className="text-muted-foreground">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 netflix-button ${
                  plan.popular
                    ? 'bg-netflix-red hover:bg-netflix-red-dark text-white'
                    : 'bg-card border-2 border-netflix-red text-netflix-red hover:bg-netflix-red hover:text-white'
                }`}
              >
                {plan.cta}
              </button>

              {/* Plan Note */}
              <p className="text-center text-sm text-muted-foreground mt-4">
                Cancel anytime • Instant access
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Need a custom plan for your organization?
          </p>
          <button className="px-8 py-3 bg-card border border-border text-foreground font-semibold rounded-lg netflix-button hover:border-netflix-red hover:text-netflix-red transition-all duration-300">
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </section>
  );
}
