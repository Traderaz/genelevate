'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  allowedRoles?: string[];
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login',
  allowedRoles = []
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If authentication is required but user is not logged in
      if (requireAuth && !user) {
        router.push(redirectTo);
        return;
      }

      // If specific roles are required
      if (allowedRoles.length > 0 && userProfile) {
        if (!allowedRoles.includes(userProfile.role)) {
          router.push('/unauthorized');
          return;
        }
      }

      // If user is logged in but trying to access auth pages
      if (!requireAuth && user) {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, userProfile, loading, requireAuth, allowedRoles, router, redirectTo]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not logged in, don't render children
  if (requireAuth && !user) {
    return null;
  }

  // If specific roles are required and user doesn't have permission
  if (allowedRoles.length > 0 && userProfile && !allowedRoles.includes(userProfile.role)) {
    return null;
  }

  // If user is logged in but trying to access auth pages, don't render children
  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
}
