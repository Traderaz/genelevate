'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

// User profile interface
import { YearGroup } from '@/types/year-groups';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  photoURL?: string;
  yearGroup: YearGroup | null;
  subjects: string[];
  institutionId?: string;
  role: 'student' | 'parent' | 'institution' | 'admin' | 'content-creator';
  subscription: {
    plan: 'free' | 'student' | 'premium' | 'institution';
    status: 'active' | 'inactive' | 'cancelled';
    expiresAt?: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    pendingPlanChange?: {
      newPlan: 'free' | 'student' | 'premium' | 'institution';
      effectiveDate: Date;
      type: 'upgrade' | 'downgrade' | 'cancel';
    };
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailUpdates: boolean;
  };
  stats: {
    totalHours: number;
    coursesCompleted: number;
    currentStreak: number;
    totalPoints: number;
  };
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}

// Authentication context interface
interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Create or update user profile in Firestore
  const createUserProfile = async (user: User, additionalData: Partial<UserProfile> = {}) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email } = user;
      const [firstName = '', lastName = ''] = displayName?.split(' ') || ['', ''];

      const defaultProfile: Partial<UserProfile> = {
        uid: user.uid,
        email: email || '',
        displayName: displayName || `${firstName} ${lastName}`.trim(),
        firstName,
        lastName,
        yearGroup: '',
        subjects: [],
        role: 'student',
        subscription: {
          plan: 'free',
          status: 'active',
        },
        preferences: {
          theme: 'dark',
          notifications: true,
          emailUpdates: true,
        },
        stats: {
          totalHours: 0,
          coursesCompleted: 0,
          currentStreak: 0,
          totalPoints: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
        ...additionalData,
      };

      try {
        await setDoc(userRef, {
          ...defaultProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
      }
    } else {
      // Update last login time
      try {
        await updateDoc(userRef, {
          lastLoginAt: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error updating last login:', error);
      }
    }
  };

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
          subscription: {
            ...data.subscription,
            expiresAt: data.subscription?.expiresAt?.toDate(),
            pendingPlanChange: data.subscription?.pendingPlanChange ? {
              ...data.subscription.pendingPlanChange,
              effectiveDate: data.subscription.pendingPlanChange.effectiveDate?.toDate(),
            } : undefined,
          },
        } as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createUserProfile(result.user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: Partial<UserProfile> = {}) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (userData.firstName && userData.lastName) {
        await updateProfile(result.user, {
          displayName: `${userData.firstName} ${userData.lastName}`,
        });
      }

      await createUserProfile(result.user, userData);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      
      // Handle specific Google sign-in errors
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Pop-up was blocked by your browser. Please allow pop-ups and try again.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error('Google sign-in failed. Please try again.');
      }
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          ...updates,
          updatedAt: new Date(),
        });
      }

      // Update Firebase Auth profile if display name changed
      if (updates.displayName && updates.displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: updates.displayName,
        });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Update user password
  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !user.email) throw new Error('No user logged in');

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };

  // Refresh user profile
  const refreshUserProfile = async () => {
    if (!user) return;

    try {
      const profile = await fetchUserProfile(user.uid);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        const profile = await fetchUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value: AuthContextType = useMemo(() => ({
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    updateUserPassword,
    refreshUserProfile,
  }), [user, userProfile, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
