'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { searchSchools, getSchoolById, UK_YEAR_GROUPS, HOMESCHOOL_OPTION, type School } from '@/data/uk-schools';

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
  schoolId?: string;
  schoolName?: string;
  yearGroup?: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [schoolSearchResults, setSchoolSearchResults] = useState<School[]>([]);
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const router = useRouter();
  const { signUp } = useAuth();

  // School search effect
  useEffect(() => {
    if (schoolSearchQuery.length >= 2) {
      const results = searchSchools(schoolSearchQuery);
      setSchoolSearchResults(results);
      setShowSchoolDropdown(true);
    } else {
      setSchoolSearchResults([]);
      setShowSchoolDropdown(false);
    }
  }, [schoolSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setSchoolSearchQuery(school.name);
    setFormData(prev => ({
      ...prev,
      schoolId: school.id,
      schoolName: school.name,
    }));
    setShowSchoolDropdown(false);
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
        yearGroup: (formData.yearGroup || null) as any,
        subjects: [],
        schoolId: formData.schoolId || null,
        schoolName: formData.schoolName || null,
        dateOfBirth: formData.dateOfBirth || null,
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

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <form onSubmit={handleRegistration} className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {formData.role === 'student' && 'Student Registration'}
            {formData.role === 'parent' && 'Parent/Guardian Registration'}
            {formData.role === 'institution' && 'Institution Registration'}
          </h2>
          <p className="text-gray-600 mt-2">
            {formData.role === 'student' && 'Join thousands of students on Gen Elevate'}
            {formData.role === 'parent' && 'Monitor your child\'s learning progress'}
            {formData.role === 'institution' && 'Manage your students and cohorts'}
          </p>
        </div>

        {/* Role Selector */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-900 mb-2">
            I am registering as:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-base font-medium"
          >
            <option value="student">🎓 Student (Year 6-13)</option>
            <option value="parent">👨‍👩‍👧‍👦 Parent/Guardian</option>
            <option value="institution">🏫 School/Institution</option>
          </select>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                {formData.role === 'institution' ? 'Contact Name *' : 'Full Name *'}
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                required
                placeholder={formData.role === 'institution' ? 'e.g., Dr. John Smith' : 'e.g., John Smith'}
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
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Referral Code (Optional for all roles) */}
          {formData.role !== 'institution' && (
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
                Referral Code <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                value={formData.referralCode || ''}
                onChange={handleInputChange}
                placeholder="Enter code from your school or institution"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Security */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          
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
                placeholder="Minimum 8 characters"
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
                placeholder="Re-enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Role-specific fields */}
        {formData.role === 'student' && (
          <div className="space-y-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              🎓 Student Information
            </h3>
            
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

          <div>
            <label htmlFor="yearGroup" className="block text-sm font-medium text-gray-700 mb-2">
              Year Group *
            </label>
            <select
              id="yearGroup"
              name="yearGroup"
              value={formData.yearGroup || ''}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your year group</option>
              {UK_YEAR_GROUPS.map(year => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label htmlFor="schoolSearch" className="block text-sm font-medium text-gray-700 mb-2">
              School/Institution *
            </label>
            <input
              type="text"
              id="schoolSearch"
              value={schoolSearchQuery}
              onChange={(e) => setSchoolSearchQuery(e.target.value)}
              onFocus={() => schoolSearchQuery.length >= 2 && setShowSchoolDropdown(true)}
              placeholder="Search for your school or type 'Homeschool'"
              required={!selectedSchool}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showSchoolDropdown && schoolSearchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {schoolSearchResults.map((school) => (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => handleSchoolSelect(school)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{school.name}</div>
                    {school.id !== 'homeschool' && (
                      <div className="text-sm text-gray-500">{school.city} • {school.postcode}</div>
                    )}
                  </button>
                ))}
              </div>
            )}
            {selectedSchool && (
              <div className="mt-2 flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2 rounded-md">
                <div>
                  <div className="text-sm font-medium text-green-900">✓ {selectedSchool.name}</div>
                  {selectedSchool.id !== 'homeschool' && (
                    <div className="text-xs text-green-700">{selectedSchool.city}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSchool(null);
                    setSchoolSearchQuery('');
                    setFormData(prev => ({ ...prev, schoolId: undefined, schoolName: undefined }));
                  }}
                  className="text-green-700 hover:text-green-900 text-sm font-medium"
                >
                  Change
                </button>
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Start typing your school name. Can't find it? Type "Homeschool" or contact support.
            </p>
          </div>
        </div>
      )}

        {formData.role === 'parent' && (
          <div className="space-y-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              👨‍👩‍👧‍👦 Link to Student Account
            </h3>
            <p className="text-sm text-gray-600">
              Enter your child's email address to link their account. They will need to approve this connection.
            </p>
            
            <div>
              <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Student's Email Address <span className="text-gray-500 text-xs">(You can add more later)</span>
              </label>
              <input
                type="email"
                id="studentEmail"
                name="studentEmail"
                value={formData.studentEmail || ''}
                onChange={handleInputChange}
                placeholder="student@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-2 text-xs text-gray-500">
                💡 <strong>Note:</strong> Your child must be registered on Gen Elevate first. After registration, you can link additional children from your dashboard.
              </p>
            </div>
          </div>
        )}

        {formData.role === 'institution' && (
          <div className="space-y-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              🏫 Institution Details
            </h3>
            
            <div>
              <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-2">
                School/Institution Name *
              </label>
              <input
                type="text"
                id="institutionName"
                name="institutionName"
                value={formData.institutionName || ''}
                onChange={handleInputChange}
                required
                placeholder="e.g., Springfield Academy"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-2 text-xs text-gray-500">
                📋 You'll be able to create cohorts, generate referral links, and manage students after registration.
              </p>
            </div>
          </div>
        )}

        {/* GDPR Consent */}
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900">Privacy & Consent</h3>
          
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
              <a href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a> *
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
            <div className="flex items-start bg-yellow-50 border border-yellow-200 rounded p-3">
              <input
                type="checkbox"
                id="parentalConsent"
                name="parentalConsent"
                checked={formData.parentalConsent || false}
                onChange={handleInputChange}
                required
                className="mt-1 mr-3"
              />
              <label htmlFor="parentalConsent" className="text-sm text-gray-900 font-medium">
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            `Create ${formData.role === 'student' ? 'Student' : formData.role === 'parent' ? 'Parent' : 'Institution'} Account`
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
