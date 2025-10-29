// Simple script to check Firebase environment variables
console.log('🔍 Checking Firebase Admin SDK Environment Variables...\n');

const requiredVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL', 
  'FIREBASE_PRIVATE_KEY'
];

let allPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '❌';
  const display = value ? (varName === 'FIREBASE_PRIVATE_KEY' ? '[HIDDEN]' : value) : 'MISSING';
  
  console.log(`${status} ${varName}: ${display}`);
  
  if (!value) {
    allPresent = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('✅ All Firebase Admin SDK environment variables are present!');
} else {
  console.log('❌ Some Firebase Admin SDK environment variables are missing.');
  console.log('\nTo fix this, add the missing variables to your .env.local file:');
  console.log('FIREBASE_PROJECT_ID=your-project-id');
  console.log('FIREBASE_CLIENT_EMAIL=your-service-account-email');
  console.log('FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"');
  console.log('\nNote: The private key should be wrapped in quotes and use \\n for line breaks.');
}

console.log('\n🔧 Build will now work even with missing variables (using fallback configuration).');
