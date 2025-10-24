'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
// Using native HTML elements with Tailwind CSS instead of separate UI components
import { Eye, EyeOff, Users, Video, BookOpen, Shield } from 'lucide-react';
import Link from 'next/link';
import { NetflixAuthLayout } from '@/components/layout/netflix-auth-layout';

interface CreatorRegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  displayName: string;
  bio: string;
  expertise: string[];
  linkedinUrl?: string;
  websiteUrl?: string;
  gdprConsent: boolean;
  termsConsent: boolean;
}

export default function CreatorSignupPage() {
  const [formData, setFormData] = useState<CreatorRegistrationData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    displayName: '',
    bio: '',
    expertise: [],
    gdprConsent: false,
    termsConsent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const expertiseOptions = [
    'Mathematics', 'English', 'Science', 'History', 'Geography',
    'Computer Science', 'Business', 'Economics', 'Psychology',
    'Art & Design', 'Music', 'Drama', 'Physical Education',
    'Life Skills', 'Career Guidance', 'Study Skills', 'Wellbeing'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      expertise: checked 
        ? [...prev.expertise, expertise]
        : prev.expertise.filter(e => e !== expertise)
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Please fill in all required fields');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.expertise.length === 0) {
      setError('Please select at least one area of expertise');
      return false;
    }

    if (!formData.gdprConsent || !formData.termsConsent) {
      setError('Please accept the terms and privacy policy');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        displayName: formData.displayName || `${formData.firstName} ${formData.lastName}`,
        role: 'content-creator',
        bio: formData.bio,
        expertise: formData.expertise,
        linkedinUrl: formData.linkedinUrl || null,
        websiteUrl: formData.websiteUrl || null,
        subscription: {
          plan: 'free',
          status: 'active'
        },
        isActive: true,
        emailVerified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        // Content creator specific fields
        contentCreated: 0,
        totalViews: 0,
        rating: 0,
        isApproved: false, // Requires admin approval
        approvedAt: null,
        subjects: formData.expertise.map(e => e.toLowerCase().replace(/\s+/g, '-')),
        yearGroup: null,
        institutionId: null,
        totalPoints: 0,
        level: 1,
        badges: [],
      });

      // Send email verification
      await sendEmailVerification(user);

      setSuccess(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <NetflixAuthLayout>
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Registration Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Your content creator account has been created successfully.
          </p>
          
          <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-4 rounded-lg text-sm mb-8">
            <div className="font-semibold mb-2">Next Steps:</div>
            <div className="text-left space-y-1">
              <div>1. Check your email and verify your account</div>
              <div>2. Wait for admin approval (you'll be notified via email)</div>
              <div>3. Once approved, you can start creating content</div>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/login')} 
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-semibold transition-all duration-200"
          >
            Go to Login
          </button>
        </div>
      </NetflixAuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40"></div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Gen Elevate
            </span>
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-8">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Content Creator Registration
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our team of expert educators and create engaging content for students
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-lg p-8 lg:p-12">
          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 p-8 bg-primary/5 border border-primary/10 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Create Webinars</h3>
              <p className="text-muted-foreground">Host live and recorded sessions for students</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Build Courses</h3>
              <p className="text-muted-foreground">Develop comprehensive learning paths</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">Protected content creation tools</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground border-b border-border pb-3">Basic Information</h3>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-foreground mb-2">Display Name (Optional)</label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="How you'd like to be known to students"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Password *</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">Confirm Password *</label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground border-b border-border pb-3">Professional Information</h3>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-2">Bio/Background *</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground resize-none"
                  rows={4}
                  placeholder="Tell us about your background, qualifications, and teaching experience..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-4">Areas of Expertise *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {expertiseOptions.map((expertise) => (
                    <div key={expertise} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={expertise}
                        checked={formData.expertise.includes(expertise)}
                        onChange={(e) => handleExpertiseChange(expertise, e.target.checked)}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <label htmlFor={expertise} className="text-sm text-foreground cursor-pointer">
                        {expertise}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="linkedinUrl" className="block text-sm font-medium text-foreground mb-2">LinkedIn Profile (Optional)</label>
                  <input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="websiteUrl" className="block text-sm font-medium text-foreground mb-2">Personal Website (Optional)</label>
                  <input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="gdprConsent"
                  checked={formData.gdprConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, gdprConsent: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="gdprConsent" className="text-sm text-foreground">
                  I agree to the processing of my personal data in accordance with the{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/80 underline">
                    Privacy Policy
                  </Link>
                  *
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="termsConsent"
                  checked={formData.termsConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, termsConsent: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="termsConsent" className="text-sm text-foreground">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:text-primary/80 underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/creator-terms" className="text-primary hover:text-primary/80 underline">
                    Content Creator Agreement
                  </Link>
                  *
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 font-semibold text-lg transition-all duration-200"
            >
              {isLoading ? 'Creating Account...' : 'Create Content Creator Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary/80 underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6">
        <p className="text-sm text-muted-foreground">
          © 2024 Gen Elevate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
