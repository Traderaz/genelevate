// Script to make a user account admin with full permissions
// Usage: Copy this code into your browser console on the Gen Elevate website while logged in

import { doc, updateDoc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

async function makeCurrentUserAdmin() {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  if (!user) {
    console.log('❌ No authenticated user found. Please log in first.');
    return;
  }

  console.log('🔍 Current user:', user.email);

  try {
    // First, get the current user profile to see what we're working with
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.log('❌ User profile not found in Firestore. Creating admin profile...');
      
      // Create a new admin profile
      const adminProfileData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Admin User',
        firstName: user.displayName?.split(' ')[0] || 'Admin',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || 'User',
        photoURL: user.photoURL || null,
        role: 'admin', // 🔑 ADMIN ROLE
        
        // Admin gets premium subscription
        subscription: {
          plan: 'premium',
          status: 'active',
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        },
        
        // Full access settings
        isActive: true,
        emailVerified: user.emailVerified,
        yearGroup: null, // Admins don't need year groups
        subjects: [], // Admins have access to all subjects
        institutionId: null,
        totalPoints: 10000, // Give some points for testing
        level: 10, // High level for testing
        badges: [],
        
        // Timestamps
        createdAt: new Date(),
        updatedAt: new Date(),
        
        // Admin-specific fields
        isAdmin: true,
        canApproveContent: true,
        canManageUsers: true,
        adminNotes: 'Account upgraded to admin for testing purposes',
      };
      
      await setDoc(userDocRef, adminProfileData);
      console.log('✅ Admin profile created successfully!');
    } else {
      console.log('📝 Existing profile found. Updating to admin...');
      
      // Update existing profile to admin
      const updateData = {
        role: 'admin', // 🔑 ADMIN ROLE
        subscription: {
          plan: 'premium',
          status: 'active',
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
        isActive: true,
        totalPoints: Math.max(userDoc.data().totalPoints || 0, 10000),
        level: Math.max(userDoc.data().level || 1, 10),
        updatedAt: new Date(),
        
        // Admin flags
        isAdmin: true,
        canApproveContent: true,
        canManageUsers: true,
        adminNotes: 'Account upgraded to admin for testing purposes',
      };
      
      await updateDoc(userDocRef, updateData);
      console.log('✅ User profile updated to admin successfully!');
    }
    
    // Show the updated profile
    const updatedDoc = await getDoc(userDocRef);
    const profileData = updatedDoc.data();
    
    console.log('🎉 Admin Profile Summary:');
    console.log('📧 Email:', profileData?.email);
    console.log('👤 Name:', profileData?.displayName);
    console.log('🔑 Role:', profileData?.role);
    console.log('💎 Subscription:', profileData?.subscription?.plan);
    console.log('⭐ Level:', profileData?.level);
    console.log('🏆 Points:', profileData?.totalPoints);
    console.log('');
    console.log('🚀 Admin Permissions Granted:');
    console.log('✅ Full access to all courses and webinars');
    console.log('✅ AI assistant access');
    console.log('✅ Debate room access');
    console.log('✅ Content creation and management');
    console.log('✅ User management capabilities');
    console.log('✅ Analytics and progress viewing');
    console.log('✅ Content approval permissions');
    console.log('✅ Premium features access');
    console.log('');
    console.log('🔄 Please refresh the page to see the changes take effect!');
    
  } catch (error) {
    console.error('❌ Error updating user to admin:', error);
  }
}

// Alternative function to make ANY user admin by email
async function makeUserAdminByEmail(email: string) {
  const db = getFirestore();
  
  console.log(`🔍 Looking for user with email: ${email}`);
  
  try {
    // Note: This requires a cloud function or admin SDK in production
    // For now, this is a placeholder - you'd need to implement user lookup
    console.log('⚠️  This function requires admin SDK or cloud function to lookup users by email');
    console.log('💡 Use makeCurrentUserAdmin() instead while logged in as the target user');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Export functions for use
window.makeCurrentUserAdmin = makeCurrentUserAdmin;
window.makeUserAdminByEmail = makeUserAdminByEmail;

console.log('🛠️  Admin Script Loaded!');
console.log('📋 Available functions:');
console.log('   • makeCurrentUserAdmin() - Make currently logged in user admin');
console.log('   • makeUserAdminByEmail(email) - Make specific user admin (requires admin SDK)');
console.log('');
console.log('🚀 To make yourself admin, run: makeCurrentUserAdmin()');
