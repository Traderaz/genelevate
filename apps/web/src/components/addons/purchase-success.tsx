'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

interface PurchaseSuccessProps {
  sessionId?: string;
}

export function PurchaseSuccess({ sessionId }: PurchaseSuccessProps) {
  const [purchaseDetails, setPurchaseDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // In production, fetch session details from Stripe
      // const fetchSessionDetails = async () => {
      //   const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
      //   const data = await response.json();
      //   setPurchaseDetails(data);
      //   setIsLoading(false);
      // };
      // fetchSessionDetails();

      // Mock data for development
      setPurchaseDetails({
        addOnTitle: 'Mock Interview Session',
        amount: 49.99,
        currency: 'GBP',
        email: 'student@example.com'
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Success Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Purchase Successful!
        </h1>
        <p className="text-lg text-muted-foreground">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
      </div>

      {/* Purchase Details */}
      {purchaseDetails && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-foreground mb-4">Purchase Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-foreground">{purchaseDetails.addOnTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-medium text-foreground">
                £{purchaseDetails.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Receipt Email</span>
              <span className="font-medium text-foreground">{purchaseDetails.email}</span>
            </div>
            {sessionId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-xs text-foreground">{sessionId}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          What Happens Next?
        </h2>
        
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <span>
              You'll receive a confirmation email with detailed instructions within the next few minutes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>
              Our team will contact you within 24 hours to schedule your session or begin your service.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
            <span>
              You can view your purchase history and access your services from your dashboard.
            </span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/addons"
          className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg netflix-button text-center font-medium"
        >
          View All Add-Ons
        </Link>
        <Link
          href="/dashboard"
          className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg netflix-button text-center font-medium flex items-center justify-center gap-2"
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Support */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Need help? Contact us at{' '}
          <a href="mailto:support@genelevate.com" className="text-primary hover:underline">
            support@genelevate.com
          </a>
        </p>
      </div>
    </div>
  );
}
