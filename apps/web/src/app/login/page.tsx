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
          <h1 className="text-4xl font-bold text-foreground mb-4">Sign In</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back to your learning journey
          </p>
        </div>
        <NetflixLoginForm />
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            New to Gen Elevate?{' '}
            <a href="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </NetflixAuthLayout>
  );
}
