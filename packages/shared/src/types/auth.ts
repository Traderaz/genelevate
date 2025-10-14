import { UserRole } from './common';

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  disabled: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime?: string;
  };
  customClaims?: {
    role?: UserRole;
    schoolId?: string;
    subscriptionTier?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  yearGroup?: string;
  schoolId?: string;
  parentEmail?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

export interface AuthError {
  code: string;
  message: string;
}
