'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  yearGroup: string;
  role: 'student' | 'parent' | 'institution';
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
    yearGroup: '',
    role: 'student',
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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
      // Prepare user data for the auth context
      const userData = {
        firstName: formData.displayName.split(' ')[0] || '',
        lastName: formData.displayName.split(' ').slice(1).join(' ') || '',
        displayName: formData.displayName,
        role: formData.role as 'student' | 'parent' | 'institution' | 'admin',
        yearGroup: formData.yearGroup,
        subjects: [],
        preferences: {
          theme: 'dark' as const,
          notifications: true,
          emailUpdates: formData.marketingConsent,
        },
        subscription: {
          plan: 'free' as const,
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
      router.push('/dashboard?welcome=true');
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
    setIsLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      router.push('/dashboard?welcome=true');
    } catch (err: any) {
      console.error('Google signup error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 'weak', color: 'text-destructive' };
    if (password.length < 8) return { strength: 'medium', color: 'text-yellow-500' };
    return { strength: 'strong', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleRegistration} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="displayName" className="block text-sm font-medium text-foreground">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:opacity-50"
              placeholder="Enter your full name"
              value={formData.displayName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Email */}
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <label htmlFor="role" className="block text-sm font-medium text-foreground">
            I am a:
          </label>
          <select
            id="role"
            name="role"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:opacity-50"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="student">Student</option>
            <option value="parent">Parent/Guardian</option>
            <option value="institution">Institution Admin</option>
          </select>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:opacity-50"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:opacity-50"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs">Passwords match</span>
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
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2 mt-0.5"
              required
            />
            <span className="text-sm text-foreground">
              I agree to the{' '}
              <a href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
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
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2 mt-0.5"
            />
            <span className="text-sm text-muted-foreground">
              I'd like to receive updates about new courses and features
            </span>
          </label>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.gdprConsent}
          className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg netflix-button disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-background border border-border text-foreground font-semibold rounded-lg netflix-button hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {isLoading ? 'Creating account...' : 'Continue with Google'}
      </button>

      {/* Free Trial Info */}
      <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <p className="text-sm text-primary font-medium">
          🎉 Start your 14-day free trial
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          No credit card required • Cancel anytime
        </p>
      </div>
    </div>
  );
}
