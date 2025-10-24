'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { canAccessRoute, getRedirectForRole } from '@/lib/role-permissions';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
  requireAuth?: boolean;
}

export function RoleGuard({ 
  children, 
  allowedRoles = [],
  redirectTo,
  requireAuth = true 
}: RoleGuardProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If authentication is required but user is not logged in
      if (requireAuth && !user) {
        router.push('/login');
        return;
      }

      // If user is logged in and profile is available
      if (user && userProfile) {
        // Check if user has permission for specific roles
        if (allowedRoles.length > 0 && !allowedRoles.includes(userProfile.role)) {
          // Redirect to role-specific dashboard or specified redirect
          const defaultRedirect = getRedirectForRole(userProfile.role);
          router.push(redirectTo || defaultRedirect);
          return;
        }

        // For content creators, ensure they only access creator-specific routes
        if (userProfile.role === 'content-creator') {
          const currentPath = window.location.pathname;
          
          // Allow access to creator-specific routes
          const allowedCreatorRoutes = [
            '/creator-dashboard',
            '/creator-signup',
            '/login',
            '/logout',
            '/profile'
          ];
          
          const isAllowedRoute = allowedCreatorRoutes.some(route => 
            currentPath.startsWith(route)
          );
          
          if (!isAllowedRoute) {
            router.push('/creator-dashboard');
            return;
          }
        }
      }
    }
  }, [user, userProfile, loading, allowedRoles, redirectTo, requireAuth, router]);

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

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return null;
  }

  // If specific roles are required and user doesn't have permission
  if (allowedRoles.length > 0 && userProfile && !allowedRoles.includes(userProfile.role)) {
    return null;
  }

  return <>{children}</>;
}

// Higher-order component for protecting routes
export function withRoleGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<RoleGuardProps, 'children'> = {}
) {
  return function ProtectedComponent(props: P) {
    return (
      <RoleGuard {...options}>
        <Component {...props} />
      </RoleGuard>
    );
  };
}

// Specific guards for different user types
export function StudentOnlyGuard({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['student', 'admin']}>
      {children}
    </RoleGuard>
  );
}

export function ContentCreatorOnlyGuard({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['content-creator', 'admin']}>
      {children}
    </RoleGuard>
  );
}

export function InstitutionOnlyGuard({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['institution', 'admin']}>
      {children}
    </RoleGuard>
  );
}

export function ParentOnlyGuard({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['parent', 'admin']}>
      {children}
    </RoleGuard>
  );
}

export function AdminOnlyGuard({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin']}>
      {children}
    </RoleGuard>
  );
}
