import { initializeApp } from 'firebase-admin/app';
import { setGlobalOptions } from 'firebase-functions/v2';

// Initialize Firebase Admin
initializeApp();

// Set global options for all functions
setGlobalOptions({
  region: 'europe-west2', // London region
  maxInstances: 10,
});

// Export all functions
export { authFunctions } from './auth';
export { userFunctions } from './users';
export { courseFunctions } from './courses';
export { webinarFunctions } from './webinars';
export { paymentFunctions } from './payments';
export { notificationFunctions } from './notifications';
export { utilityFunctions } from './utilities';
