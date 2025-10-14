import { z } from 'zod';
import { userRoleSchema } from './common';

export const loginCredentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const registerCredentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  yearGroup: z.string().optional(),
  schoolId: z.string().optional(),
  parentEmail: z.string().email('Invalid parent email').optional()
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const authUserSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  displayName: z.string().optional(),
  photoURL: z.string().url().optional(),
  phoneNumber: z.string().optional(),
  disabled: z.boolean(),
  metadata: z.object({
    creationTime: z.string(),
    lastSignInTime: z.string().optional()
  }),
  customClaims: z.object({
    role: userRoleSchema.optional(),
    schoolId: z.string().optional(),
    subscriptionTier: z.string().optional()
  }).optional()
});

export const authSessionSchema = z.object({
  user: authUserSchema,
  token: z.string(),
  expiresAt: z.number()
});

export const authErrorSchema = z.object({
  code: z.string(),
  message: z.string()
});
