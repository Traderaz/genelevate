import { BaseEntity, SubscriptionTier } from './common';

export interface Subscription extends BaseEntity {
  userId: string;
  schoolId?: string;
  
  // Subscription Details
  tier: SubscriptionTier;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid' | 'trialing';
  
  // Billing
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  
  // Dates
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialStart?: Date;
  trialEnd?: Date;
  cancelledAt?: Date;
  cancelAtPeriodEnd: boolean;
  
  // Pricing
  amount: number; // in pence/cents
  currency: string;
  interval: 'month' | 'year';
  
  // Features
  features: SubscriptionFeatures;
}

export interface SubscriptionFeatures {
  maxCourses: number | 'unlimited';
  maxWebinars: number | 'unlimited';
  aiAssistant: boolean;
  debateRoom: boolean;
  academicDNA: boolean;
  prioritySupport: boolean;
  customBranding: boolean;
  analytics: boolean;
  parentDashboard: boolean;
  schoolIntegration: boolean;
}

export interface Payment extends BaseEntity {
  userId: string;
  subscriptionId?: string;
  
  // Payment Details
  stripePaymentIntentId: string;
  amount: number; // in pence/cents
  currency: string;
  
  // Status
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled' | 'refunded';
  
  // Metadata
  description: string;
  type: 'subscription' | 'course' | 'webinar' | 'one-time';
  itemId?: string; // course/webinar ID for one-time payments
  
  // Billing
  billingDetails: BillingDetails;
  
  // Refund
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: Date;
}

export interface BillingDetails {
  name: string;
  email: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
}

export interface Invoice extends BaseEntity {
  userId: string;
  subscriptionId: string;
  paymentId: string;
  
  // Invoice Details
  stripeInvoiceId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  
  // Status
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  
  // Dates
  periodStart: Date;
  periodEnd: Date;
  dueDate: Date;
  paidAt?: Date;
  
  // PDF
  invoicePdfUrl?: string;
  
  // Line Items
  lineItems: InvoiceLineItem[];
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  amount: number;
  currency: string;
  quantity: number;
  periodStart?: Date;
  periodEnd?: Date;
}

export interface PaymentMethod extends BaseEntity {
  userId: string;
  stripePaymentMethodId: string;
  
  // Card Details (for display)
  type: 'card';
  card: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  
  // Status
  isDefault: boolean;
  isActive: boolean;
}

export interface Coupon extends BaseEntity {
  code: string;
  name: string;
  description?: string;
  
  // Discount
  type: 'percentage' | 'fixed';
  value: number; // percentage (0-100) or fixed amount in pence/cents
  currency?: string; // required for fixed amount
  
  // Validity
  isActive: boolean;
  validFrom: Date;
  validUntil?: Date;
  maxRedemptions?: number;
  currentRedemptions: number;
  
  // Restrictions
  applicableTiers: SubscriptionTier[];
  firstTimeOnly: boolean;
  minimumAmount?: number;
}

export interface CouponRedemption extends BaseEntity {
  userId: string;
  couponId: string;
  subscriptionId?: string;
  paymentId?: string;
  
  discountAmount: number;
  currency: string;
}
