'use client';

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

export function initializeFirebase() {
  if (typeof window === 'undefined') return null;
  
  if (!firebaseConfig.apiKey) {
    console.error('Firebase config missing - check environment variables');
    return null;
  }

  try {
    if (!app) {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
      
      console.log('Firebase initialized successfully');
      console.log('Project ID:', firebaseConfig.projectId);
      console.log('Auth Domain:', firebaseConfig.authDomain);
      console.log('Storage Bucket:', firebaseConfig.storageBucket);
    }
    
    return { app, auth, db, storage };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
}

export async function testFirestoreConnection() {
  const firebase = initializeFirebase();
  if (!firebase) return false;

  try {
    // Test writing to Firestore
    const testDoc = doc(firebase.db, 'test', 'connection-test');
    await setDoc(testDoc, {
      message: 'Firebase connection test',
      timestamp: new Date().toISOString(),
      status: 'working'
    });

    // Test reading from Firestore
    const docSnap = await getDoc(testDoc);
    if (docSnap.exists()) {
      console.log('✅ Firestore connection successful:', docSnap.data());
      return true;
    } else {
      console.error('❌ Firestore test document not found');
      return false;
    }
  } catch (error) {
    console.error('❌ Firestore connection error:', error);
    return false;
  }
}

export async function testAuthConnection() {
  const firebase = initializeFirebase();
  if (!firebase) return false;

  try {
    // Check if auth is working
    console.log('Auth current user:', firebase.auth.currentUser);
    console.log('✅ Firebase Auth initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Firebase Auth error:', error);
    return false;
  }
}

export async function testStorageConnection() {
  const firebase = initializeFirebase();
  if (!firebase) return false;

  try {
    // Just check if storage is initialized
    console.log('Storage bucket:', firebase.storage.app.options.storageBucket);
    console.log('✅ Firebase Storage initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Firebase Storage error:', error);
    return false;
  }
}

export async function runAllFirebaseTests() {
  console.log('🔥 Running Firebase connection tests...');
  
  const results = {
    initialization: !!initializeFirebase(),
    auth: await testAuthConnection(),
    firestore: await testFirestoreConnection(),
    storage: await testStorageConnection()
  };

  console.log('📊 Firebase Test Results:', results);
  
  const allPassed = Object.values(results).every(result => result === true);
  console.log(allPassed ? '✅ All Firebase tests passed!' : '❌ Some Firebase tests failed');
  
  return results;
}
