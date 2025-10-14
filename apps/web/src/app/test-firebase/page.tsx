'use client';

import { useState, useEffect } from 'react';
import { runAllFirebaseTests } from '@/lib/firebase-test';

export default function TestFirebasePage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    try {
      const results = await runAllFirebaseTests();
      setTestResults(results);
    } catch (error) {
      console.error('Test error:', error);
      setTestResults({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auto-run tests on page load
    runTests();
  }, []);

  const getStatusIcon = (status: boolean) => {
    return status ? '✅' : '❌';
  };

  const getStatusText = (status: boolean) => {
    return status ? 'Working' : 'Failed';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            🔥 Firebase Connection Test
          </h1>

          <div className="mb-6">
            <button
              onClick={runTests}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
            >
              {isLoading ? 'Running Tests...' : 'Run Tests Again'}
            </button>
          </div>

          {testResults && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Test Results:</h2>
              
              {testResults.error ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">Error: {testResults.error}</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Firebase Initialization</span>
                      <span className="flex items-center">
                        {getStatusIcon(testResults.initialization)}
                        <span className="ml-2">{getStatusText(testResults.initialization)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Firebase Authentication</span>
                      <span className="flex items-center">
                        {getStatusIcon(testResults.auth)}
                        <span className="ml-2">{getStatusText(testResults.auth)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Firestore Database</span>
                      <span className="flex items-center">
                        {getStatusIcon(testResults.firestore)}
                        <span className="ml-2">{getStatusText(testResults.firestore)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Firebase Storage</span>
                      <span className="flex items-center">
                        {getStatusIcon(testResults.storage)}
                        <span className="ml-2">{getStatusText(testResults.storage)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-900 mb-2">Environment Variables Check:</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</div>
                  <div>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</div>
                  <div>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</div>
                  <div>Storage Bucket: {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing'}</div>
                  <div>Messaging Sender ID: {process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing'}</div>
                  <div>App ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'}</div>
                  <div>Measurement ID: {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ? '✅ Set' : '❌ Missing'}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-600">
            <p>This page tests the connection to Firebase services. Check the browser console for detailed logs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
