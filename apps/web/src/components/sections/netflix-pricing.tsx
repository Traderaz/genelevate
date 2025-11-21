'use client';

import { Check, Star, Sparkles, Users } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export function NetflixPricing() {
  const { user } = useAuth();
  const router = useRouter();
  
  const plan = {
    name: 'All-Access Membership',
    icon: Star,
    description: 'Everything you need to excel in your studies',
    price: 29.99,
    currency: '£',
    features: [
      'Access to ALL courses (11+, GCSE, A-Level)',
      'ALL webinars and live sessions',
      'AI Assistant & unlimited AI questions',
      'Download all resources',
      'Progress tracking & advanced analytics',
      'Mobile app access',
      'Community access',
      'Mentorship program access',
      'Priority email support',
      'Certificates of completion',
      'Career explorer & guidance',
      'Life skills modules',
      'Premium content library',
      'Study planner & tools',
      'Exam preparation resources',
    ],
    cta: 'Start Your Journey',
  };

  const handleStartJourney = async () => {
    if (user) {
      try {
        // Get Firebase ID token
        const idToken = await user.getIdToken();
        // User is logged in - redirect to Stripe checkout with auth token
        window.location.href = `/api/stripe/create-checkout-session?token=${idToken}`;
      } catch (error) {
        console.error('Error getting auth token:', error);
        router.push('/login?redirect=/pricing');
      }
    } else {
      // User not logged in - redirect to sign in page
      router.push('/login?redirect=/pricing');
    }
  };

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Simple, <span className="text-teal-gold font-black">All-Inclusive</span> Pricing
          </h2>
          <p className="text-4xl md:text-6xl font-bold text-green-400 mb-4">
            <span className="text-2xl md:text-3xl">c.</span>98p PER DAY!
          </p>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            One membership, unlimited access to everything. No tiers, no limits, no confusion.
          </p>
        </div>

        {/* Two Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Individual Membership Card - Left */}
          <div className="relative rounded-2xl p-8 teal-card border-2 border-teal-gold shadow-2xl">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="gold-gradient text-brand-navy px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-gold-glow">
                <Sparkles className="w-3 h-3" />
                Everything Included
              </div>
            </div>

            {/* Plan Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-teal-blue-medium to-teal-primary shadow-lg">
                <plan.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-teal-card-text mb-2">{plan.name}</h3>
              <p className="text-base text-teal-card-text-muted">{plan.description}</p>
            </div>

            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-xl font-bold text-teal-card-text">{plan.currency}</span>
                <span className="text-5xl font-bold text-teal-card-text mx-2">
                  {plan.price.toFixed(2)}
                </span>
                <span className="text-lg text-teal-card-text-muted">
                  /month
                </span>
              </div>
              <p className="text-xs text-teal-card-text-muted">
                Billed monthly • Cancel anytime
              </p>
            </div>

            {/* Features - Compact */}
            <div className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span className="text-brand-navy text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleStartJourney}
              className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 gold-gradient text-brand-navy shadow-gold-glow hover:shadow-gold-glow-hover"
            >
              {user ? 'Subscribe Now' : 'Start Your Journey'}
            </button>

            {/* Plan Note */}
            <div className="text-center mt-4">
              <p className="text-xs text-brand-navy-light">
                ✓ Instant access • No hidden fees • Cancel anytime
              </p>
            </div>
          </div>

          {/* Institution Card - Right */}
          <div className="relative rounded-2xl p-8 teal-card border-2 border-teal-primary/30 hover:border-teal-primary shadow-lg transition-all">
            {/* Icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-teal-primary/20 to-teal-blue-light/20">
                <Users className="w-8 h-8 text-teal-primary" />
              </div>
              <h3 className="text-2xl font-bold text-teal-card-text mb-2">For Schools & Institutions</h3>
              <p className="text-base text-teal-card-text-muted">
                Custom solutions for educational organizations
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span className="text-brand-navy text-sm">Bulk student licenses</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span className="text-brand-navy text-sm">Dedicated account manager</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span className="text-brand-navy text-sm">Custom pricing & invoicing</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span className="text-brand-navy text-sm">School-wide analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span className="text-brand-navy text-sm">Teacher training & support</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span className="text-brand-navy text-sm">Integration with school systems</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 bg-white border-2 border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-white shadow-lg">
              Contact Us
            </button>

            <p className="text-center text-xs text-brand-navy-light mt-4">
              Perfect for schools with 50+ students
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="text-center mt-12">
          <p className="text-white/70 text-sm">
            Trusted by students and schools across the UK 🇬🇧
          </p>
        </div>
      </div>
    </section>
  );
}
