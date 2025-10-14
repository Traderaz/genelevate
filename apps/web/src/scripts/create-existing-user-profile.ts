// Run this script to create a Firestore profile for existing authenticated users
// Usage: Copy this code into your browser console on the Gen Elevate website

import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

async function createProfileForCurrentUser() {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  if (!user) {
    console.log('No authenticated user found. Please log in first.');
    return;
  }

  const profileData = {
    id: user.uid,
    email: user.email,
    displayName: user.displayName || 'User',
    role: 'student', // Default role
    institutionId: null,
    referralCode: null,
    institutionName: null,
    parentEmail: null,
    studentEmail: null,
    dateOfBirth: null,
    gdprConsent: true,
    marketingConsent: false,
    parentalConsent: null,
    
    // Additional profile fields
    firstName: user.displayName?.split(' ')[0] || 'User',
    lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
    isActive: true,
    emailVerified: user.emailVerified,
    subscriptionTier: 'free',
    totalPoints: 0,
    level: 1,
    badges: [],
    cohortIds: [],
    parentIds: [],
    studentIds: [],
    
    // Preferences
    preferences: {
      notifications: {
        email: true,
        push: true,
        webinar: true,
        course: true,
      },
      privacy: {
        profileVisible: true,
        progressVisible: true,
        leaderboardVisible: true,
      },
      learning: {
        preferredStudyTime: 'afternoon',
        difficultyLevel: 'beginner',
        learningStyle: 'visual',
      },
    },
    
    // Timestamps
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await setDoc(doc(db, 'users', user.uid), profileData);
    console.log('✅ User profile created successfully!');
    console.log('Profile data:', profileData);
  } catch (error) {
    console.error('❌ Error creating user profile:', error);
  }
}

// Call the function
createProfileForCurrentUser();
