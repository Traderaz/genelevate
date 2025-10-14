export interface CustomClaims {
  role: 'admin' | 'institution' | 'student' | 'parent';
  institutionId?: string;
  permissions: string[];
  isVerified: boolean;
  cohortIds?: string[];
  parentIds?: string[];
  studentIds?: string[];
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  customClaims?: CustomClaims;
  createdAt: string;
  lastLoginAt: string;
}

export interface ReferralData {
  code: string;
  institutionId: string;
  institutionName: string;
  createdBy: string;
  expiresAt: string;
  maxUses?: number;
  currentUses: number;
  isActive: boolean;
}

export interface RegistrationData {
  email: string;
  password: string;
  displayName: string;
  role: 'student' | 'parent' | 'institution';
  referralCode?: string;
  institutionId?: string;
  parentEmail?: string; // For student registration
  studentEmail?: string; // For parent registration
  gdprConsent: boolean;
  marketingConsent: boolean;
  dateOfBirth?: string; // For age verification
  parentalConsent?: boolean; // For under-16 users
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: RegistrationData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

export interface SecurityAuditLog {
  id: string;
  userId: string;
  action: 'login' | 'logout' | 'password_change' | 'profile_update' | 'data_access' | 'data_export' | 'data_deletion';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details?: Record<string, any>;
}