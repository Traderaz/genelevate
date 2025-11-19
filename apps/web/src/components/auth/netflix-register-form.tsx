'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';

interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  role: 'student' | 'parent';
  childEmail?: string; // Required for parent accounts
  gdprConsent: boolean;
  marketingConsent: boolean;
}

export function NetflixRegisterForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 'student',
    childEmail: '',
    gdprConsent: false,
    marketingConsent: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  // Pre-fill email from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      setError('Please enter your full name.');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return false;
    }
    if (formData.role === 'parent') {
      if (!formData.childEmail?.trim()) {
        setError('Please enter your child\'s email address to link your parent account.');
        return false;
      }
      if (formData.childEmail === formData.email) {
        setError('Your email cannot be the same as your child\'s email.');
        return false;
      }
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (!formData.gdprConsent) {
      setError('You must agree to our Terms of Service and Privacy Policy.');
      return false;
    }
    return true;
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // For parent accounts, verify child exists and has paid subscription
      if (formData.role === 'parent' && formData.childEmail) {
        const response = await fetch('/api/auth/validate-parent-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ childEmail: formData.childEmail }),
        });

        const result = await response.json();
        
        if (!response.ok) {
          setError(result.error || 'Unable to validate child account.');
          setIsLoading(false);
          return;
        }

        if (!result.childExists) {
          setError('No account found with that email address. Please check and try again.');
          setIsLoading(false);
          return;
        }

        if (!result.hasActiveSubscription) {
          setError('Your child must have an active paid subscription before you can create a parent account.');
          setIsLoading(false);
          return;
        }

        if (result.parentCount >= 2) {
          setError('Maximum of 2 parent accounts per child has been reached.');
          setIsLoading(false);
          return;
        }
      }

      // Prepare user data
      const userData = {
        firstName: formData.displayName.split(' ')[0] || '',
        lastName: formData.displayName.split(' ').slice(1).join(' ') || '',
        displayName: formData.displayName,
        role: formData.role,
        linkedChildEmail: formData.role === 'parent' ? formData.childEmail : undefined,
        yearGroup: null, // Will set in profile
        subjects: [],
        preferences: {
          theme: 'dark' as const,
          notifications: true,
          emailUpdates: formData.marketingConsent,
        },
        subscription: {
          // Parents get free read-only access
          plan: formData.role === 'parent' ? ('free' as const) : ('free' as const),
          status: 'active' as const,
        },
        stats: {
          totalHours: 0,
          coursesCompleted: 0,
          currentStreak: 0,
          totalPoints: 0,
        },
      };

      await signUp(formData.email, formData.password, userData);
      
      // Different redirects for students vs parents
      if (formData.role === 'parent') {
        router.push('/dashboard?newParent=true');
      } else {
        router.push('/pricing?newUser=true');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      default:
        return 'Registration failed. Please try again.';
    }
  };

  const handleGoogleSignup = async () => {
    // Parent accounts cannot use Google signup - they must provide child email
    if (formData.role === 'parent') {
      setError('Parent accounts must use email registration to link to your child\'s account.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      // Redirect new users to pricing page to subscribe
      router.push('/pricing?newUser=true');
    } catch (err: any) {
      console.error('Google signup error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 'weak', color: 'text-red-500' };
    if (password.length < 8) return { strength: 'medium', color: 'text-yellow-500' };
    return { strength: 'strong', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Google Sign Up */}
      <div className="relative">
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isLoading || formData.role === 'parent'}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        {formData.role === 'parent' && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            🔒 Parent accounts must use email registration to link to your child's account
          </p>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleRegistration} className="space-y-5">
        {/* Role Selection */}
        <div className="space-y-2">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            I am signing up as:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-teal-primary transition-all duration-200 disabled:opacity-50"
          >
            <option value="student">🎓 Student</option>
            <option value="parent">👨‍👩‍👧‍👦 Parent/Guardian</option>
          </select>
          {formData.role === 'parent' && (
            <p className="text-xs text-gray-600 mt-2">
              ℹ️ Parent accounts are free and provide read-only access to monitor your child's progress
            </p>
          )}
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-teal-primary transition-all duration-200 disabled:opacity-50"
              placeholder="Enter your full name"
              value={formData.displayName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Child Email (for parents only) */}
        {formData.role === 'parent' && (
          <div className="space-y-2 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <label htmlFor="childEmail" className="block text-sm font-medium text-gray-700">
              Your Child's Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="childEmail"
                name="childEmail"
                type="email"
                required={formData.role === 'parent'}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-teal-primary transition-all duration-200 disabled:opacity-50"
                placeholder="Enter your child's email"
                value={formData.childEmail}
                onChange={handleInputChange}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              ⚠️ Your child must have an active paid subscription. Maximum 2 parents per child account.
            </p>
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {formData.role === 'parent' ? 'Your Email Address' : 'Email address'}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-teal-primary transition-all duration-200 disabled:opacity-50"
              placeholder={formData.role === 'parent' ? 'Enter your email (parent)' : 'Enter your email'}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-teal-primary transition-all duration-200 disabled:opacity-50"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.password && (
            <p className={`text-xs ${passwordStrength.color}`}>
              Password strength: {passwordStrength.strength}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-teal-primary transition-all duration-200 disabled:opacity-50"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <div className="flex items-center gap-2 text-green-500">
              <span className="text-xs">✓ Passwords match</span>
            </div>
          )}
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="gdprConsent"
              checked={formData.gdprConsent}
              onChange={handleInputChange}
              className="w-4 h-4 text-teal-primary bg-white border-gray-300 rounded focus:ring-teal-primary focus:ring-2 mt-0.5"
              required
            />
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms" className="text-teal-primary hover:text-teal-blue-medium transition-colors font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-teal-primary hover:text-teal-blue-medium transition-colors font-medium">
                Privacy Policy
              </a>
            </span>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleInputChange}
              className="w-4 h-4 text-teal-primary bg-white border-gray-300 rounded focus:ring-teal-primary focus:ring-2 mt-0.5"
            />
            <span className="text-sm text-gray-700">
              I'd like to receive updates, tips, and special offers by email
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-gradient-to-r from-teal-primary to-teal-blue-medium hover:from-teal-blue-medium hover:to-teal-primary text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg"
        >
          {isLoading ? 'Creating your account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
