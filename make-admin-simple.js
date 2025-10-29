// SUPER ADMIN SCRIPT - Run this in browser console while logged into GenElevate
// This creates a SUPER ADMINISTRATOR with full system access

(async function makeCurrentUserSuperAdmin() {
  try {
    console.log('🛡️ Creating SUPER ADMINISTRATOR account...');
    
    // Get current user from Firebase Auth
    const auth = window.firebase?.auth?.() || window.getAuth?.();
    if (!auth) {
      console.error('❌ Firebase Auth not found. Make sure you are on the GenElevate website.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      console.error('❌ No authenticated user found. Please log in first.');
      return;
    }

    console.log('👤 Current user:', user.email);
    console.log('🔑 User ID:', user.uid);

    // Try to get Firestore instance
    const db = window.firebase?.firestore?.() || window.getFirestore?.();
    if (!db) {
      console.error('❌ Firestore not found. Make sure you are on the GenElevate website.');
      return;
    }

    // Create SUPER ADMIN with full permissions
    const superAdminData = {
      // Basic Info
      uid: user.uid,
      email: user.email,
      firstName: user.displayName?.split(' ')[0] || 'Super',
      lastName: user.displayName?.split(' ').slice(1).join(' ') || 'Admin',
      displayName: user.displayName || 'Super Administrator',
      photoURL: user.photoURL || null,
      emailVerified: user.emailVerified || false,
      
      // Admin Role
      role: 'admin',
      isSuperAdmin: true,
      adminLevel: 'super',
      isActive: true,
      
      // Full Permissions
      permissions: {
        // User Management
        canViewAllUsers: true,
        canEditUsers: true,
        canDeleteUsers: true,
        canCreateUsers: true,
        canManageRoles: true,
        
        // Content Management
        canViewAllContent: true,
        canEditContent: true,
        canDeleteContent: true,
        canApproveContent: true,
        canCreateContent: true,
        
        // System Management
        canViewSystemMetrics: true,
        canManageSettings: true,
        canViewLogs: true,
        canManageDatabase: true,
        
        // Financial Management
        canViewPayments: true,
        canManageSubscriptions: true,
        canViewRevenue: true,
        canProcessRefunds: true,
        
        // Support Management
        canViewTickets: true,
        canResolveTickets: true,
        canEscalateTickets: true,
        
        // Institution Management
        canManageInstitutions: true,
        canViewInstitutionData: true,
        
        // Override Permissions
        canOverrideAllRules: true,
        canAccessAnyData: true,
      },
      
      // Premium Access
      subscription: {
        plan: 'premium',
        status: 'active',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      },
      
      // Admin Metadata
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: user.uid,
      adminNotes: 'Super Administrator - Full system access',
      
      // Legacy fields for compatibility
      isAdmin: true,
      canApproveContent: true,
      canManageUsers: true,
      totalPoints: 10000,
      level: 10,
      yearGroup: null,
      subjects: [],
      institutionId: null,
      badges: []
    };

    console.log('📝 Creating Super Administrator profile...');
    
    // Update user document in Firestore
    const userDocRef = db.collection('users').doc(user.uid);
    await userDocRef.set(superAdminData, { merge: true });
    
    console.log('');
    console.log('🎉 SUCCESS! SUPER ADMINISTRATOR CREATED!');
    console.log('');
    console.log('🛡️ You now have FULL SYSTEM ACCESS:');
    console.log('  ✅ Complete User Management (view, edit, delete, create)');
    console.log('  ✅ Complete Content Management (approve, edit, delete)');
    console.log('  ✅ System Administration (settings, database, logs)');
    console.log('  ✅ Financial Management (payments, subscriptions, refunds)');
    console.log('  ✅ Support Management (tickets, escalation)');
    console.log('  ✅ Institution Management (full control)');
    console.log('  ✅ OVERRIDE ALL FIRESTORE RULES');
    console.log('  ✅ ACCESS ANY DATA IN THE SYSTEM');
    console.log('');
    console.log('🔄 REFRESH THE PAGE NOW to activate admin access!');
    console.log('📍 Then go to /admin to access the full admin panel');
    console.log('');
    console.log('⚠️  With great power comes great responsibility!');

  } catch (error) {
    console.error('❌ Error creating Super Administrator:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Make sure you are logged into GenElevate');
    console.log('2. Make sure you are on the GenElevate website');
    console.log('3. Try refreshing the page and running the script again');
    console.log('4. Check browser console for detailed error messages');
  }
})();

console.log('🛡️ SUPER ADMIN SCRIPT LOADED - Creating administrator now...');
