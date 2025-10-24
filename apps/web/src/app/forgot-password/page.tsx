'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { NetflixAuthLayout } from '@/components/layout/netflix-auth-layout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many requests. Please try again later.';
      default:
        return 'Failed to send reset email. Please try again.';
    }
  };

  if (success) {
    return (
      <NetflixAuthLayout>
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Check Your Email</h1>
          <p className="text-muted-foreground mb-8">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          
          <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-4 rounded-lg text-sm mb-8">
            <div className="font-semibold mb-2">Next Steps:</div>
            <div className="text-left space-y-1">
              <div>1. Check your email inbox (and spam folder)</div>
              <div>2. Click the reset link in the email</div>
              <div>3. Create a new password</div>
              <div>4. Sign in with your new password</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/login"
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-semibold transition-all duration-200 text-center"
            >
              Back to Sign In
            </Link>
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="w-full border border-border text-foreground py-3 px-6 rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
            >
              Send Another Email
            </button>
          </div>
        </div>
      </NetflixAuthLayout>
    );
  }

  return (
    <NetflixAuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Reset Your Password</h1>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Reset Password Form */}
        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:opacity-50"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Sending Reset Email...
              </div>
            ) : (
              'Send Reset Email'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <Link 
            href="/login"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>
        </div>

        {/* Help Text */}
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">Having trouble?</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Make sure you enter the email address associated with your account</li>
            <li>• Check your spam/junk folder if you don't see the email</li>
            <li>• The reset link will expire after 1 hour for security</li>
            <li>• Contact support if you continue having issues</li>
          </ul>
        </div>
      </div>
    </NetflixAuthLayout>
  );
}
