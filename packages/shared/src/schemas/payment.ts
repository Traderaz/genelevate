import { z } from 'zod';
import { baseEntitySchema, subscriptionTierSchema } from './common';

export const billingDetailsSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().optional(),
    postal_code: z.string().min(1),
    country: z.string().min(2).max(2)
  }).optional()
});

export const subscriptionFeaturesSchema = z.object({
  maxCourses: z.union([z.number().min(0), z.literal('unlimited')]),
  maxWebinars: z.union([z.number().min(0), z.literal('unlimited')]),
  aiAssistant: z.boolean(),
  debateRoom: z.boolean(),
  academicDNA: z.boolean(),
  prioritySupport: z.boolean(),
  customBranding: z.boolean(),
  analytics: z.boolean(),
  parentDashboard: z.boolean(),
  schoolIntegration: z.boolean()
});

export const subscriptionSchema = baseEntitySchema.extend({
  userId: z.string(),
  schoolId: z.string().optional(),
  
  tier: subscriptionTierSchema,
  status: z.enum(['active', 'cancelled', 'past_due', 'unpaid', 'trialing']),
  
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string(),
  stripePriceId: z.string(),
  
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
  trialStart: z.date().optional(),
  trialEnd: z.date().optional(),
  cancelledAt: z.date().optional(),
  cancelAtPeriodEnd: z.boolean(),
  
  amount: z.number().min(0),
  currency: z.string().length(3),
  interval: z.enum(['month', 'year']),
  
  features: subscriptionFeaturesSchema
});

export const paymentSchema = baseEntitySchema.extend({
  userId: z.string(),
  subscriptionId: z.string().optional(),
  
  stripePaymentIntentId: z.string(),
  amount: z.number().min(0),
  currency: z.string().length(3),
  
  status: z.enum(['pending', 'succeeded', 'failed', 'cancelled', 'refunded']),
  
  description: z.string(),
  type: z.enum(['subscription', 'course', 'webinar', 'one-time']),
  itemId: z.string().optional(),
  
  billingDetails: billingDetailsSchema,
  
  refundAmount: z.number().min(0).optional(),
  refundReason: z.string().optional(),
  refundedAt: z.date().optional()
});

export const invoiceLineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string().length(3),
  quantity: z.number().min(1),
  periodStart: z.date().optional(),
  periodEnd: z.date().optional()
});

export const invoiceSchema = baseEntitySchema.extend({
  userId: z.string(),
  subscriptionId: z.string(),
  paymentId: z.string(),
  
  stripeInvoiceId: z.string(),
  invoiceNumber: z.string(),
  amount: z.number().min(0),
  currency: z.string().length(3),
  
  status: z.enum(['draft', 'open', 'paid', 'void', 'uncollectible']),
  
  periodStart: z.date(),
  periodEnd: z.date(),
  dueDate: z.date(),
  paidAt: z.date().optional(),
  
  invoicePdfUrl: z.string().url().optional(),
  lineItems: z.array(invoiceLineItemSchema)
});

export const paymentMethodSchema = baseEntitySchema.extend({
  userId: z.string(),
  stripePaymentMethodId: z.string(),
  
  type: z.literal('card'),
  card: z.object({
    brand: z.string(),
    last4: z.string().length(4),
    expMonth: z.number().min(1).max(12),
    expYear: z.number().min(new Date().getFullYear())
  }),
  
  isDefault: z.boolean(),
  isActive: z.boolean()
});

export const couponSchema = baseEntitySchema.extend({
  code: z.string().min(1).max(50).regex(/^[A-Z0-9_-]+$/),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(0),
  currency: z.string().length(3).optional(),
  
  isActive: z.boolean(),
  validFrom: z.date(),
  validUntil: z.date().optional(),
  maxRedemptions: z.number().min(1).optional(),
  currentRedemptions: z.number().min(0),
  
  applicableTiers: z.array(subscriptionTierSchema),
  firstTimeOnly: z.boolean(),
  minimumAmount: z.number().min(0).optional()
});

export const couponRedemptionSchema = baseEntitySchema.extend({
  userId: z.string(),
  couponId: z.string(),
  subscriptionId: z.string().optional(),
  paymentId: z.string().optional(),
  
  discountAmount: z.number().min(0),
  currency: z.string().length(3)
});

// Form validation schemas
export const createSubscriptionSchema = z.object({
  tier: subscriptionTierSchema,
  interval: z.enum(['month', 'year']),
  paymentMethodId: z.string(),
  couponCode: z.string().optional()
});

export const updateSubscriptionSchema = z.object({
  tier: subscriptionTierSchema.optional(),
  cancelAtPeriodEnd: z.boolean().optional()
});

export const createPaymentMethodSchema = z.object({
  stripePaymentMethodId: z.string(),
  isDefault: z.boolean().optional()
});

export const processPaymentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().length(3),
  paymentMethodId: z.string(),
  description: z.string(),
  type: z.enum(['course', 'webinar', 'one-time']),
  itemId: z.string().optional()
});

export const applyCouponSchema = z.object({
  code: z.string().min(1).max(50)
});
