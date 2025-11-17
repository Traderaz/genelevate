import { Metadata } from 'next';
import { NetflixRegisterForm } from '@/components/auth/netflix-register-form';
import { NetflixAuthLayout } from '@/components/layout/netflix-auth-layout';

export const metadata: Metadata = {
  title: 'Sign Up - Gen Elevate',
  description: 'Join Gen Elevate and start your personalized learning journey with premium courses and live webinars.',
};

export default function RegisterPage() {
  return (
    <NetflixAuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-card-text mb-4">Join Gen Elevate</h1>
          <p className="text-lg text-teal-card-text-muted">
            Start your learning journey today
          </p>
        </div>
        <NetflixRegisterForm />
        <div className="mt-8 text-center">
          <p className="text-teal-card-text-muted">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-teal-primary hover:text-teal-blue-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </NetflixAuthLayout>
  );
}
