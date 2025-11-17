import { Metadata } from 'next';
import { NetflixLoginForm } from '@/components/auth/netflix-login-form';
import { NetflixAuthLayout } from '@/components/layout/netflix-auth-layout';

export const metadata: Metadata = {
  title: 'Sign In - Gen Elevate',
  description: 'Sign in to your Gen Elevate account to access premium courses and live webinars.',
};

export default function LoginPage() {
  return (
    <NetflixAuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Sign In</h1>
          <p className="text-lg text-brand-navy-light">
            Welcome back to your learning journey
          </p>
        </div>
        <NetflixLoginForm />
        <div className="mt-8 text-center">
          <p className="text-brand-navy-light">
            New to Gen Elevate?{' '}
            <a href="/register" className="font-semibold text-brand-teal hover:text-brand-blue-medium transition-colors">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </NetflixAuthLayout>
  );
}
