# Make User Admin Script

## Quick Setup Instructions

1. **Log into your GenElevate account** in your browser
2. **Open Developer Tools** (F12 or right-click → Inspect)
3. **Go to Console tab**
4. **Copy and paste this script:**

```javascript
// Make current user admin - Paste this in browser console while logged in
(async function makeCurrentUserAdmin() {
  // Import Firebase functions
  const { doc, updateDoc, getDoc, setDoc, getFirestore } = await import('firebase/firestore');
  const { getAuth } = await import('firebase/auth');
  
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  if (!user) {
    console.log('❌ No authenticated user found. Please log in first.');
    return;
  }

  console.log('🔍 Making user admin:', user.email);

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    const adminData = {
      role: 'admin',
      subscription: {
        plan: 'premium',
        status: 'active',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      },
      isActive: true,
      totalPoints: 10000,
      level: 10,
      updatedAt: new Date(),
      isAdmin: true,
      canApproveContent: true,
      canManageUsers: true,
      adminNotes: 'Account upgraded to admin for testing'
    };
    
    if (userDoc.exists()) {
      await updateDoc(userDocRef, adminData);
      console.log('✅ Updated existing profile to admin');
    } else {
      const fullAdminProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Admin User',
        firstName: user.displayName?.split(' ')[0] || 'Admin',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || 'User',
        photoURL: user.photoURL || null,
        yearGroup: null,
        subjects: [],
        institutionId: null,
        badges: [],
        createdAt: new Date(),
        emailVerified: user.emailVerified,
        ...adminData
      };
      await setDoc(userDocRef, fullAdminProfile);
      console.log('✅ Created new admin profile');
    }
    
    console.log('🎉 SUCCESS! You now have admin privileges:');
    console.log('✅ Full access to all courses and webinars');
    console.log('✅ AI assistant access');
    console.log('✅ Content creation and management');
    console.log('✅ User management capabilities');
    console.log('✅ Premium features access');
    console.log('');
    console.log('🔄 Refresh the page to see changes!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

5. **Press Enter** to run the script
6. **Refresh the page** to see your new admin privileges!

## What This Script Does

- ✅ Sets your account role to `admin`
- ✅ Gives you premium subscription access
- ✅ Sets high level (10) and points (10,000) for testing
- ✅ Enables all admin permissions:
  - Full access to courses, webinars, AI, debates
  - Content creation and management
  - User management capabilities
  - Analytics and progress viewing
  - Content approval permissions
  - Premium features access

## Admin Permissions You'll Get

Based on your role permissions system, admin users have:

```typescript
'admin': {
  canAccessCourses: true,
  canAccessWebinars: true,
  canAccessDebates: true,
  canAccessAI: true,
  canAccessPremiumFeatures: true,
  canCreateContent: true,
  canEditContent: true,
  canDeleteContent: true,
  canManageUsers: true,
  canManageInstitution: true,
  canApproveContent: true,
  canViewAnalytics: true,
  canViewStudentProgress: true,
  canAccessPaymentFeatures: true,
  canManageSubscriptions: true,
}
```

## Troubleshooting

- **"No authenticated user found"**: Make sure you're logged into GenElevate first
- **Import errors**: Make sure you're on the GenElevate website when running this
- **Permission errors**: The script updates your own user profile, which should be allowed
- **Changes not visible**: Refresh the page after running the script

## Security Note

This script only works when you're logged in and only affects your own account. It's safe for testing purposes.
