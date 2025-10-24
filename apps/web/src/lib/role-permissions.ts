export type UserRole = 'student' | 'parent' | 'institution' | 'admin' | 'content-creator';

export interface RolePermissions {
  // Content access
  canAccessCourses: boolean;
  canAccessWebinars: boolean;
  canAccessDebates: boolean;
  canAccessAI: boolean;
  canAccessPremiumFeatures: boolean;
  
  // Content creation
  canCreateContent: boolean;
  canEditContent: boolean;
  canDeleteContent: boolean;
  
  // Administrative
  canManageUsers: boolean;
  canManageInstitution: boolean;
  canApproveContent: boolean;
  
  // Analytics and data
  canViewAnalytics: boolean;
  canViewStudentProgress: boolean;
  
  // Payment and subscription
  canAccessPaymentFeatures: boolean;
  canManageSubscriptions: boolean;
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  'student': {
    canAccessCourses: true,
    canAccessWebinars: true,
    canAccessDebates: true,
    canAccessAI: true,
    canAccessPremiumFeatures: false, // Based on subscription
    canCreateContent: false,
    canEditContent: false,
    canDeleteContent: false,
    canManageUsers: false,
    canManageInstitution: false,
    canApproveContent: false,
    canViewAnalytics: false,
    canViewStudentProgress: false,
    canAccessPaymentFeatures: true,
    canManageSubscriptions: true,
  },
  
  'parent': {
    canAccessCourses: false,
    canAccessWebinars: false,
    canAccessDebates: false,
    canAccessAI: false,
    canAccessPremiumFeatures: false,
    canCreateContent: false,
    canEditContent: false,
    canDeleteContent: false,
    canManageUsers: false,
    canManageInstitution: false,
    canApproveContent: false,
    canViewAnalytics: true, // For their children
    canViewStudentProgress: true, // For their children
    canAccessPaymentFeatures: true,
    canManageSubscriptions: true,
  },
  
  'institution': {
    canAccessCourses: false,
    canAccessWebinars: false,
    canAccessDebates: false,
    canAccessAI: false,
    canAccessPremiumFeatures: false,
    canCreateContent: false,
    canEditContent: false,
    canDeleteContent: false,
    canManageUsers: true, // Within their institution
    canManageInstitution: true,
    canApproveContent: false,
    canViewAnalytics: true, // For their students
    canViewStudentProgress: true, // For their students
    canAccessPaymentFeatures: true,
    canManageSubscriptions: true,
  },
  
  'admin': {
    canAccessCourses: true,
    canAccessWebinars: true,
    canAccessDebates: true,
    canAccessAI: true,
    canAccessPremiumFeatures: true,
    canCreateContent: true,
    canEditContent: true,
    canDeleteContent: true,
    canManageUsers: true,
    canManageInstitution: true,
    canApproveContent: true,
    canViewAnalytics: true,
    canViewStudentProgress: true,
    canAccessPaymentFeatures: true,
    canManageSubscriptions: true,
  },
  
  'content-creator': {
    canAccessCourses: false, // Cannot access other creators' content
    canAccessWebinars: false, // Cannot access other creators' content
    canAccessDebates: false,
    canAccessAI: false,
    canAccessPremiumFeatures: false,
    canCreateContent: true, // Can create their own content
    canEditContent: true, // Can edit their own content
    canDeleteContent: true, // Can delete their own content
    canManageUsers: false,
    canManageInstitution: false,
    canApproveContent: false,
    canViewAnalytics: true, // For their own content only
    canViewStudentProgress: false,
    canAccessPaymentFeatures: false, // No payment features
    canManageSubscriptions: false, // No subscription management
  },
};

export function getRolePermissions(role: UserRole): RolePermissions {
  return rolePermissions[role] || rolePermissions['student'];
}

export function hasPermission(role: UserRole, permission: keyof RolePermissions): boolean {
  const permissions = getRolePermissions(role);
  return permissions[permission];
}

export function canAccessRoute(role: UserRole, route: string): boolean {
  const permissions = getRolePermissions(role);
  
  // Define route access rules
  const routeRules: Record<string, keyof RolePermissions> = {
    '/courses': 'canAccessCourses',
    '/webinars': 'canAccessWebinars',
    '/debates': 'canAccessDebates',
    '/ai': 'canAccessAI',
    '/premium': 'canAccessPremiumFeatures',
    '/creator-dashboard': 'canCreateContent',
    '/institution': 'canManageInstitution',
    '/parent': 'canViewStudentProgress',
    '/admin': 'canManageUsers',
    '/analytics': 'canViewAnalytics',
    '/subscription': 'canManageSubscriptions',
    '/payment': 'canAccessPaymentFeatures',
  };
  
  // Check if route has specific permission requirements
  for (const [routePattern, permission] of Object.entries(routeRules)) {
    if (route.startsWith(routePattern)) {
      return permissions[permission];
    }
  }
  
  // Default allow for routes without specific restrictions
  return true;
}

export function getRedirectForRole(role: UserRole): string {
  switch (role) {
    case 'content-creator':
      return '/creator-dashboard';
    case 'admin':
      return '/admin';
    case 'institution':
      return '/institution';
    case 'parent':
      return '/parent';
    case 'student':
    default:
      return '/dashboard';
  }
}

export function getRestrictedRoutes(role: UserRole): string[] {
  const permissions = getRolePermissions(role);
  const restrictedRoutes: string[] = [];
  
  if (!permissions.canAccessCourses) restrictedRoutes.push('/courses');
  if (!permissions.canAccessWebinars) restrictedRoutes.push('/webinars');
  if (!permissions.canAccessDebates) restrictedRoutes.push('/debates');
  if (!permissions.canAccessAI) restrictedRoutes.push('/ai');
  if (!permissions.canAccessPremiumFeatures) restrictedRoutes.push('/premium');
  if (!permissions.canAccessPaymentFeatures) restrictedRoutes.push('/payment', '/subscription');
  if (!permissions.canManageInstitution) restrictedRoutes.push('/institution');
  if (!permissions.canManageUsers) restrictedRoutes.push('/admin');
  
  return restrictedRoutes;
}
