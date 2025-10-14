import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const auth = getAuth();

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    uid: string;
    email?: string;
    role?: string;
    institutionId?: string;
    permissions?: string[];
    isVerified?: boolean;
  };
}

/**
 * Middleware to verify Firebase ID tokens and extract user claims
 */
export async function verifyAuth(request: NextRequest): Promise<AuthenticatedRequest> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return request as AuthenticatedRequest;
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    
    (request as AuthenticatedRequest).user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role,
      institutionId: decodedToken.institutionId,
      permissions: decodedToken.permissions || [],
      isVerified: decodedToken.isVerified || false,
    };

    return request as AuthenticatedRequest;
  } catch (error) {
    console.error('Error verifying auth token:', error);
    return request as AuthenticatedRequest;
  }
}

/**
 * Check if user has required permission
 */
export function hasPermission(user: AuthenticatedRequest['user'], permission: string): boolean {
  if (!user) return false;
  return user.permissions?.includes(permission) || false;
}

/**
 * Check if user has required role
 */
export function hasRole(user: AuthenticatedRequest['user'], role: string): boolean {
  if (!user) return false;
  return user.role === role;
}

/**
 * Check if user belongs to the same institution
 */
export function belongsToInstitution(user: AuthenticatedRequest['user'], institutionId: string): boolean {
  if (!user) return false;
  return user.institutionId === institutionId;
}

/**
 * Middleware factory for role-based access control
 */
export function requireAuth(options: {
  roles?: string[];
  permissions?: string[];
  institutionId?: string;
  verified?: boolean;
} = {}) {
  return async (request: NextRequest) => {
    const authenticatedRequest = await verifyAuth(request);
    const { user } = authenticatedRequest;

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user is verified (if required)
    if (options.verified && !user.isVerified) {
      return NextResponse.json(
        { error: 'Account verification required' },
        { status: 403 }
      );
    }

    // Check roles
    if (options.roles && !options.roles.includes(user.role || '')) {
      return NextResponse.json(
        { error: 'Insufficient role permissions' },
        { status: 403 }
      );
    }

    // Check permissions
    if (options.permissions) {
      const hasRequiredPermissions = options.permissions.every(permission =>
        hasPermission(user, permission)
      );
      
      if (!hasRequiredPermissions) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
    }

    // Check institution access
    if (options.institutionId && !belongsToInstitution(user, options.institutionId)) {
      return NextResponse.json(
        { error: 'Institution access denied' },
        { status: 403 }
      );
    }

    return authenticatedRequest;
  };
}

/**
 * GDPR compliance middleware
 */
export function requireGDPRConsent() {
  return async (request: NextRequest) => {
    const authenticatedRequest = await verifyAuth(request);
    const { user } = authenticatedRequest;

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check GDPR consent (this would typically be checked against the user's profile in Firestore)
    // For now, we'll assume it's part of the custom claims or check it via API
    
    return authenticatedRequest;
  };
}

/**
 * Rate limiting middleware
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(options: {
  windowMs: number;
  maxRequests: number;
} = { windowMs: 60000, maxRequests: 100 }) {
  return async (request: NextRequest) => {
    const authenticatedRequest = await verifyAuth(request);
    const { user } = authenticatedRequest;
    
    const key = user?.uid || request.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const windowStart = now - options.windowMs;

    const userLimit = rateLimitMap.get(key);
    
    if (!userLimit || userLimit.resetTime < windowStart) {
      rateLimitMap.set(key, { count: 1, resetTime: now });
      return authenticatedRequest;
    }

    if (userLimit.count >= options.maxRequests) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    userLimit.count++;
    return authenticatedRequest;
  };
}

/**
 * Security headers middleware
 */
export function securityHeaders() {
  return (request: NextRequest) => {
    const response = NextResponse.next();
    
    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.stripe.com https://*.googleapis.com https://*.firebaseapp.com wss://*.firebaseapp.com;"
    );

    return response;
  };
}

/**
 * Audit logging middleware
 */
export function auditLog(action: string) {
  return async (request: NextRequest) => {
    const authenticatedRequest = await verifyAuth(request);
    const { user } = authenticatedRequest;

    // Log the action (in a real app, this would write to Firestore)
    console.log('Audit Log:', {
      action,
      userId: user?.uid,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent'),
      url: request.url,
    });

    return authenticatedRequest;
  };
}

/**
 * Compose multiple middleware functions
 */
export function compose(...middlewares: Array<(request: NextRequest) => Promise<NextRequest | NextResponse>>) {
  return async (request: NextRequest) => {
    let currentRequest = request;
    
    for (const middleware of middlewares) {
      const result = await middleware(currentRequest);
      
      if (result instanceof NextResponse) {
        return result; // Early return if middleware returns a response
      }
      
      currentRequest = result;
    }
    
    return currentRequest;
  };
}
