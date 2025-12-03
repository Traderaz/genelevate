// Check Admin Status - Run this in browser console on GenElevate
// This will show your current role and subscription status

(async function checkAdminStatus() {
  try {
    console.log('🔍 Checking your admin status...\n');
    
    // Get Firebase Auth
    const auth = window.firebase?.auth?.() || window.getAuth?.();
    if (!auth) {
      console.error('❌ Firebase Auth not found. Make sure you are on the GenElevate website.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      console.error('❌ Not logged in. Please log in first.');
      return;
    }

    console.log('👤 Email:', user.email);
    console.log('🔑 User ID:', user.uid);
    console.log('');

    // Get Firestore
    const db = window.firebase?.firestore?.() || window.getFirestore?.();
    if (!db) {
      console.error('❌ Firestore not found.');
      return;
    }

    // Get user document
    const userDocRef = db.collection('users').doc(user.uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      console.log('⚠️  User profile not found in database!');
      return;
    }

    const userData = userDoc.data();
    
    console.log('📋 YOUR CURRENT STATUS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Role:', userData.role || 'Not set');
    console.log('');
    console.log('Subscription Plan:', userData.subscription?.plan || 'free');
    console.log('Subscription Status:', userData.subscription?.status || 'inactive');
    console.log('Expires At:', userData.subscription?.expiresAt || 'N/A');
    console.log('');
    
    // Check admin status
    const isAdmin = userData.role === 'admin';
    const isContentCreator = userData.role === 'content-creator';
    
    if (isAdmin) {
      console.log('✅ YOU ARE AN ADMIN!');
      console.log('   You should have full access to all features.');
    } else if (isContentCreator) {
      console.log('✅ YOU ARE A CONTENT CREATOR!');
      console.log('   You should have full access to all features.');
    } else {
      console.log('❌ YOU ARE NOT AN ADMIN');
      console.log('   Current role:', userData.role || 'student');
      console.log('');
      console.log('🔧 TO BECOME ADMIN:');
      console.log('   Run the script from make-admin-simple.js');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error checking status:', error);
  }
})();

console.log('🔍 Admin Status Checker loaded...');

