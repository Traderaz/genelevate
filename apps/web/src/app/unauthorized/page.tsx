'use client';

import { useAuth } from '@/contexts/auth-context';
// Using native HTML elements with Tailwind CSS instead of separate UI components
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getRedirectForRole } from '@/lib/role-permissions';

export default function UnauthorizedPage() {
  const { userProfile } = useAuth();

  const getDashboardLink = () => {
    if (userProfile) {
      return getRedirectForRole(userProfile.role);
    }
    return '/dashboard';
  };

  const getRoleMessage = () => {
    if (!userProfile) return 'You need to be logged in to access this page.';
    
    switch (userProfile.role) {
      case 'content-creator':
        return 'As a content creator, you have access to create and manage your own content, but cannot access student features or paid content.';
      case 'student':
        return 'This page is not available for students. Please check your subscription or contact support if you believe this is an error.';
      case 'parent':
        return 'This page is only available to students and institutions.';
      case 'institution':
        return 'This page is not available for institutional accounts.';
      default:
        return 'You do not have permission to access this page.';
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40"></div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-destructive/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Access Restricted</h1>
            <p className="text-muted-foreground">
              You don't have permission to access this page
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="text-center text-muted-foreground">
              <p>{getRoleMessage()}</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Link 
                href={getDashboardLink()}
                className="flex items-center justify-center w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Link>
              
              {userProfile?.role === 'content-creator' && (
                <Link 
                  href="/creator-dashboard"
                  className="flex items-center justify-center w-full px-4 py-3 border border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                >
                  Go to Creator Dashboard
                </Link>
              )}
              
              <Link 
                href="/contact"
                className="flex items-center justify-center w-full px-4 py-3 text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
