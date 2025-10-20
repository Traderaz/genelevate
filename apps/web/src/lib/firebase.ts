import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
  console.warn('Firebase initialization failed:', error);
  // Create a minimal app for build purposes
  app = getApps().length === 0 ? initializeApp({
    apiKey: 'demo-key',
    authDomain: 'demo-project.firebaseapp.com',
    projectId: 'demo-project',
  }) : getApps()[0];
}

// Initialize Firebase services with explicit types
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn('Firebase services initialization failed:', error);
  // For build purposes, create minimal services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { auth, db, storage };

// Connect to emulators in development (only if explicitly enabled)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  const isEmulatorConnected = {
    auth: false,
    firestore: false,
    storage: false,
  };

  // Connect Auth emulator
  if (!isEmulatorConnected.auth) {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      isEmulatorConnected.auth = true;
      console.log('Connected to Firebase Auth emulator');
    } catch (error) {
      console.warn('Failed to connect to Auth emulator, using production Firebase');
    }
  }

  // Connect Firestore emulator
  if (!isEmulatorConnected.firestore) {
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      isEmulatorConnected.firestore = true;
      console.log('Connected to Firestore emulator');
    } catch (error) {
      console.warn('Failed to connect to Firestore emulator, using production Firebase');
    }
  }

  // Connect Storage emulator
  if (!isEmulatorConnected.storage) {
    try {
      connectStorageEmulator(storage, 'localhost', 9199);
      isEmulatorConnected.storage = true;
      console.log('Connected to Storage emulator');
    } catch (error) {
      console.warn('Failed to connect to Storage emulator, using production Firebase');
    }
  }
}

export default app;