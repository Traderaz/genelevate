import { initializeApp, getApps, cert, App, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App;
let adminDb: Firestore;

// Initialize Firebase Admin SDK
function initializeFirebaseAdmin() {
  try {
    if (getApps().length === 0) {
      // Check if service account is provided
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
      
      if (serviceAccountJson) {
        // Production: Use service account from environment
        const serviceAccount = JSON.parse(serviceAccountJson) as ServiceAccount;
        adminApp = initializeApp({
          credential: cert(serviceAccount),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
      } else {
        // Development: Create a minimal service account from individual env vars
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'gen-elevate';
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || `firebase-adminsdk@${projectId}.iam.gserviceaccount.com`;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
        
        if (privateKey) {
          // Use individual credentials
          adminApp = initializeApp({
            credential: cert({
              project_id: projectId,
              client_email: clientEmail,
              private_key: privateKey,
            } as any),
            projectId,
          });
        } else {
          // Last resort: initialize without credentials (will fail on production Firebase)
          console.warn('⚠️  Firebase Admin SDK: No credentials found. API routes may fail.');
          adminApp = initializeApp({
            projectId,
          });
        }
      }

      // Get Firestore instance and configure settings immediately
      adminDb = getFirestore(adminApp);
      adminDb.settings({
        ignoreUndefinedProperties: true,
      });

      console.log('✅ Firebase Admin SDK initialized successfully');
    } else {
      // Already initialized, just get the existing instances
      adminApp = getApps()[0];
      adminDb = getFirestore(adminApp);
    }
  } catch (error: any) {
    console.error('❌ Firebase Admin SDK initialization failed:', error);
    // Don't throw, just log - allow the app to continue
    // Rethrow only if it's not a settings error
    if (!error.message?.includes('already been initialized')) {
      throw error;
    }
  }
}

// Initialize immediately
initializeFirebaseAdmin();

export { adminApp, adminDb, initializeFirebaseAdmin };

