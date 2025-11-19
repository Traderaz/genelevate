'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

// TEMPORARY: Manual subscription activation for testing
// DELETE THIS FILE IN PRODUCTION!

export default function TestActivatePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const activateSubscription = async () => {
    if (!user) {
      setResult('❌ Not logged in');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/test-subscription-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ Success! Subscription activated. Refresh the page to see changes.`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🧪 Test Subscription Activation
        </h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>For Testing Only!</strong><br />
            This manually activates your subscription because Stripe webhooks don't work on localhost.
          </p>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="font-mono text-sm">{user.email}</p>
              <p className="font-mono text-xs text-gray-500 mt-1">{user.uid}</p>
            </div>

            <button
              onClick={activateSubscription}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Activating...' : '✅ Activate All-Access Subscription'}
            </button>

            {result && (
              <div className={`p-4 rounded ${
                result.startsWith('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{result}</p>
                {result.startsWith('✅') && (
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Go to Dashboard →
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please log in first</p>
            <a
              href="/login"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
            >
              Log In
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

