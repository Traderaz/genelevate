'use client';

import { useState } from 'react';
import { FileText, Video, Users, GraduationCap, MessageSquare, CheckCircle, ShoppingCart } from 'lucide-react';

interface AddOn {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  priceLabel: string;
  icon: any;
  color: string;
  bgColor: string;
  features: string[];
  popular?: boolean;
  stripePriceId?: string; // Stripe Price ID for checkout
}

export function AddOnsGrid() {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Mock add-ons - In production, fetch from Firestore
  const addOns: AddOn[] = [
    {
      id: 'cv-help',
      title: 'CV Writing Service',
      description: 'Professional CV review and optimization by career experts',
      price: 29.99,
      currency: 'GBP',
      priceLabel: 'One-time',
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      features: [
        'Professional CV review',
        'ATS optimization',
        'Industry-specific formatting',
        '2 rounds of revisions',
        '48-hour turnaround',
        'Downloadable templates'
      ],
      stripePriceId: 'price_cv_help_2999'
    },
    {
      id: 'personal-statement',
      title: 'Personal Statement Help',
      description: 'Expert guidance for university and job applications',
      price: 39.99,
      currency: 'GBP',
      priceLabel: 'One-time',
      icon: MessageSquare,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      features: [
        'Statement structure guidance',
        'Content review and feedback',
        'Grammar and style editing',
        '3 rounds of revisions',
        'University-specific advice',
        'Examples and templates'
      ],
      stripePriceId: 'price_personal_statement_3999'
    },
    {
      id: 'mock-interview',
      title: 'Mock Interview Session',
      description: '1-hour practice interview with detailed feedback',
      price: 49.99,
      currency: 'GBP',
      priceLabel: 'Per session',
      icon: Video,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      features: [
        '1-hour video interview',
        'Industry-specific questions',
        'Real-time feedback',
        'Recorded session access',
        'Written evaluation report',
        'Follow-up tips and resources'
      ],
      popular: true,
      stripePriceId: 'price_mock_interview_4999'
    },
    {
      id: 'tuition-single',
      title: '1-on-1 Tuition (Single)',
      description: 'One hour of personalized tutoring in your subject',
      price: 39.99,
      currency: 'GBP',
      priceLabel: 'Per hour',
      icon: GraduationCap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      features: [
        '1 hour of personalized tuition',
        'Subject specialist tutor',
        'Customized learning plan',
        'Practice materials included',
        'Progress tracking',
        'Flexible scheduling'
      ],
      stripePriceId: 'price_tuition_single_3999'
    },
    {
      id: 'tuition-package',
      title: '1-on-1 Tuition (5-Pack)',
      description: 'Five hours of tutoring at a discounted rate',
      price: 179.99,
      currency: 'GBP',
      priceLabel: '5 hours',
      icon: GraduationCap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      features: [
        '5 hours of personalized tuition',
        'Save £20 vs single sessions',
        'Subject specialist tutor',
        'Comprehensive learning plan',
        'Progress tracking',
        'Valid for 3 months'
      ],
      popular: true,
      stripePriceId: 'price_tuition_package_17999'
    },
    {
      id: 'mentorship-monthly',
      title: 'Monthly Mentorship',
      description: 'Ongoing guidance from an experienced mentor',
      price: 99.99,
      currency: 'GBP',
      priceLabel: 'Per month',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      features: [
        '2 video calls per month',
        'Unlimited email support',
        'Personalized goal setting',
        'Career pathway planning',
        'University application help',
        'Cancel anytime'
      ],
      stripePriceId: 'price_mentorship_monthly_9999'
    }
  ];

  const handlePurchase = async (addOn: AddOn) => {
    setIsProcessing(addOn.id);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addonId: addOn.id,
          title: addOn.title,
          description: addOn.description,
          price: addOn.price,
          type: addOn.id === 'mentorship' ? 'subscription' : 'one-time'
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error initiating checkout:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Premium Add-Ons</h2>
          <p className="text-muted-foreground mt-1">Choose the services that fit your needs</p>
        </div>
      </div>

      {/* Add-Ons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addOns.map((addOn) => (
          <div
            key={addOn.id}
            className={`bg-card border rounded-xl p-6 netflix-card relative ${
              addOn.popular ? 'border-primary' : 'border-border'
            }`}
          >
            {addOn.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  POPULAR
                </span>
              </div>
            )}

            {/* Icon */}
            <div className={`w-14 h-14 ${addOn.bgColor} rounded-lg flex items-center justify-center mb-4`}>
              <addOn.icon className={`w-7 h-7 ${addOn.color}`} />
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-foreground mb-2">{addOn.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{addOn.description}</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  £{addOn.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">{addOn.priceLabel}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {addOn.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Purchase Button */}
            <button
              onClick={() => handlePurchase(addOn)}
              disabled={isProcessing === addOn.id}
              className={`w-full px-6 py-3 rounded-lg font-semibold netflix-button flex items-center justify-center gap-2 ${
                addOn.popular
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isProcessing === addOn.id ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Now
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-2">Secure Payment with Stripe</h3>
        <p className="text-sm text-muted-foreground">
          All payments are processed securely through Stripe. We never store your payment information. 
          You'll receive instant access to your purchased services, and email confirmation with next steps.
        </p>
      </div>
    </div>
  );
}
