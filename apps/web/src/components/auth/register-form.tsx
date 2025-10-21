'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  role: 'student' | 'parent' | 'institution';
  referralCode?: string;
  institutionName?: string;
  parentEmail?: string;
  studentEmail?: string;
  dateOfBirth?: string;
  gdprConsent: boolean;
  marketingConsent: boolean;
  parentalConsent?: boolean;
}

export function RegisterForm() {
  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 'student',
    gdprConsent: false,
    marketingConsent: false,
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [referralInfo, setReferralInfo] = useState<any>(null);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleReferralValidation = async () => {
    if (!formData.referralCode) {
      setStep(2);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Add referral code validation via Firebase function if needed
      // For now, just proceed to step 2
      setStep(2);
    } catch (err: any) {
      setError('Failed to validate referral code');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    if (!formData.gdprConsent) {
      setError('You must consent to data processing to create an account');
      setIsLoading(false);
      return;
    }

    // Age verification for students
    if (formData.role === 'student' && formData.dateOfBirth) {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 13) {
        setError('Users must be at least 13 years old');
        setIsLoading(false);
        return;
      }
      if (age < 16 && !formData.parentalConsent) {
        setError('Parental consent is required for users under 16');
        setIsLoading(false);
        return;
      }
    }

    try {
      // Prepare user data for registration
      const userData = {
        firstName: formData.displayName.split(' ')[0] || '',
        lastName: formData.displayName.split(' ').slice(1).join(' ') || '',
        displayName: formData.displayName,
        role: formData.role,
        yearGroup: null,
        subjects: [],
        // Additional fields if needed
      };

      // Use the auth context's signUp method
      await signUp(formData.email, formData.password, userData);

      router.push('/dashboard?welcome=true');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Join Gen Elevate</h2>
        <p className="text-gray-600 mt-2">Start your learning journey today</p>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          I am a:
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="student">Student</option>
          <option value="parent">Parent/Guardian</option>
          <option value="institution">Institution/School</option>
        </select>
      </div>

      <div>
        <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
          Referral Code (Optional)
        </label>
        <input
          type="text"
          id="referralCode"
          name="referralCode"
          value={formData.referralCode || ''}
          onChange={handleInputChange}
          placeholder="Enter referral code from your school"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleReferralValidation}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Validating...' : 'Continue'}
      </button>
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={handleRegistration} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
        {referralInfo && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mt-2">
            ✓ Joining {referralInfo.institutionName}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Role-specific fields */}
      {formData.role === 'student' && (
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth || ''}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {formData.role === 'parent' && (
        <div>
          <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Student's Email Address
          </label>
          <input
            type="email"
            id="studentEmail"
            name="studentEmail"
            value={formData.studentEmail || ''}
            onChange={handleInputChange}
            placeholder="Link to your child's account"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {formData.role === 'institution' && (
        <div>
          <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-2">
            Institution Name *
          </label>
          <input
            type="text"
            id="institutionName"
            name="institutionName"
            value={formData.institutionName || ''}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* GDPR Consent */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="gdprConsent"
            name="gdprConsent"
            checked={formData.gdprConsent}
            onChange={handleInputChange}
            required
            className="mt-1 mr-3"
          />
          <label htmlFor="gdprConsent" className="text-sm text-gray-700">
            I consent to the processing of my personal data in accordance with the{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> *
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="marketingConsent"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={handleInputChange}
            className="mt-1 mr-3"
          />
          <label htmlFor="marketingConsent" className="text-sm text-gray-700">
            I would like to receive marketing communications and updates
          </label>
        </div>

        {formData.role === 'student' && formData.dateOfBirth && calculateAge(formData.dateOfBirth) < 16 && (
          <div className="flex items-start">
            <input
              type="checkbox"
              id="parentalConsent"
              name="parentalConsent"
              checked={formData.parentalConsent || false}
              onChange={handleInputChange}
              required
              className="mt-1 mr-3"
            />
            <label htmlFor="parentalConsent" className="text-sm text-gray-700">
              I confirm that I have parental consent to create this account *
            </label>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {step === 1 ? renderStep1() : renderStep2()}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
