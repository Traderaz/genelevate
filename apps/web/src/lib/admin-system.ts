'use client';

import { 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';

export interface AdminAccount {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: 'admin';
  isSuperAdmin: boolean;
  permissions: AdminPermissions;
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
  lastLogin?: Date;
  adminLevel: 'super' | 'standard' | 'support';
  notes?: string;
}

export interface AdminPermissions {
  // User Management
  canViewAllUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canCreateUsers: boolean;
  canManageRoles: boolean;
  
  // Content Management
  canViewAllContent: boolean;
  canEditContent: boolean;
  canDeleteContent: boolean;
  canApproveContent: boolean;
  canCreateContent: boolean;
  
  // System Management
  canViewSystemMetrics: boolean;
  canManageSettings: boolean;
  canViewLogs: boolean;
  canManageDatabase: boolean;
  
  // Financial Management
  canViewPayments: boolean;
  canManageSubscriptions: boolean;
  canViewRevenue: boolean;
  canProcessRefunds: boolean;
  
  // Support Management
  canViewTickets: boolean;
  canResolveTickets: boolean;
  canEscalateTickets: boolean;
  
  // Institution Management
  canManageInstitutions: boolean;
  canViewInstitutionData: boolean;
  
  // Override Permissions
  canOverrideAllRules: boolean;
  canAccessAnyData: boolean;
}

export const ADMIN_LEVELS = {
  super: {
    name: 'Super Administrator',
    description: 'Full system access with override capabilities',
    permissions: {
      canViewAllUsers: true,
      canEditUsers: true,
      canDeleteUsers: true,
      canCreateUsers: true,
      canManageRoles: true,
      canViewAllContent: true,
      canEditContent: true,
      canDeleteContent: true,
      canApproveContent: true,
      canCreateContent: true,
      canViewSystemMetrics: true,
      canManageSettings: true,
      canViewLogs: true,
      canManageDatabase: true,
      canViewPayments: true,
      canManageSubscriptions: true,
      canViewRevenue: true,
      canProcessRefunds: true,
      canViewTickets: true,
      canResolveTickets: true,
      canEscalateTickets: true,
      canManageInstitutions: true,
      canViewInstitutionData: true,
      canOverrideAllRules: true,
      canAccessAnyData: true,
    } as AdminPermissions
  },
  standard: {
    name: 'Administrator',
    description: 'Standard admin access for daily operations',
    permissions: {
      canViewAllUsers: true,
      canEditUsers: true,
      canDeleteUsers: false,
      canCreateUsers: true,
      canManageRoles: false,
      canViewAllContent: true,
      canEditContent: true,
      canDeleteContent: false,
      canApproveContent: true,
      canCreateContent: true,
      canViewSystemMetrics: true,
      canManageSettings: false,
      canViewLogs: true,
      canManageDatabase: false,
      canViewPayments: true,
      canManageSubscriptions: true,
      canViewRevenue: false,
      canProcessRefunds: false,
      canViewTickets: true,
      canResolveTickets: true,
      canEscalateTickets: true,
      canManageInstitutions: false,
      canViewInstitutionData: true,
      canOverrideAllRules: false,
      canAccessAnyData: false,
    } as AdminPermissions
  },
  support: {
    name: 'Support Administrator',
    description: 'Support-focused admin for user assistance',
    permissions: {
      canViewAllUsers: true,
      canEditUsers: true,
      canDeleteUsers: false,
      canCreateUsers: false,
      canManageRoles: false,
      canViewAllContent: true,
      canEditContent: false,
      canDeleteContent: false,
      canApproveContent: false,
      canCreateContent: false,
      canViewSystemMetrics: false,
      canManageSettings: false,
      canViewLogs: false,
      canManageDatabase: false,
      canViewPayments: true,
      canManageSubscriptions: false,
      canViewRevenue: false,
      canProcessRefunds: false,
      canViewTickets: true,
      canResolveTickets: true,
      canEscalateTickets: true,
      canManageInstitutions: false,
      canViewInstitutionData: false,
      canOverrideAllRules: false,
      canAccessAnyData: false,
    } as AdminPermissions
  }
};

export class AdminSystem {
  
  /**
   * Create a new admin account
   */
  static async createAdminAccount(
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    adminLevel: keyof typeof ADMIN_LEVELS = 'standard',
    createdBy: string,
    notes?: string
  ): Promise<AdminAccount> {
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
      
      // Create admin profile
      const adminAccount: AdminAccount = {
        uid: user.uid,
        email: user.email!,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        role: 'admin',
        isSuperAdmin: adminLevel === 'super',
        permissions: ADMIN_LEVELS[adminLevel].permissions,
        createdAt: new Date(),
        createdBy,
        isActive: true,
        adminLevel,
        notes
      };
      
      // Save to Firestore
      await setDoc(doc(db, 'users', user.uid), adminAccount);
      
      console.log(`✅ Created ${ADMIN_LEVELS[adminLevel].name}: ${email}`);
      return adminAccount;
      
    } catch (error) {
      console.error('Error creating admin account:', error);
      throw error;
    }
  }
  
  /**
   * Make existing user an admin
   */
  static async makeUserAdmin(
    userId: string, 
    adminLevel: keyof typeof ADMIN_LEVELS = 'standard',
    updatedBy: string,
    notes?: string
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const userData = userDoc.data();
      
      const adminUpdates = {
        role: 'admin',
        isSuperAdmin: adminLevel === 'super',
        permissions: ADMIN_LEVELS[adminLevel].permissions,
        adminLevel,
        isActive: true,
        updatedAt: serverTimestamp(),
        updatedBy,
        adminNotes: notes,
        // Ensure they have premium access
        subscription: {
          plan: 'premium',
          status: 'active',
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        }
      };
      
      await updateDoc(userRef, adminUpdates);
      
      console.log(`✅ Made user admin: ${userData.email} (${ADMIN_LEVELS[adminLevel].name})`);
      
    } catch (error) {
      console.error('Error making user admin:', error);
      throw error;
    }
  }
  
  /**
   * Get current user's admin permissions
   */
  static async getCurrentAdminPermissions(): Promise<AdminPermissions | null> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return null;
      
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (!userDoc.exists()) return null;
      
      const userData = userDoc.data();
      if (userData.role !== 'admin') return null;
      
      return userData.permissions || ADMIN_LEVELS.standard.permissions;
      
    } catch (error) {
      console.error('Error getting admin permissions:', error);
      return null;
    }
  }
  
  /**
   * Check if current user has specific permission
   */
  static async hasPermission(permission: keyof AdminPermissions): Promise<boolean> {
    try {
      const permissions = await this.getCurrentAdminPermissions();
      if (!permissions) return false;
      
      return permissions[permission] || false;
      
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }
  
  /**
   * List all admin accounts
   */
  static async getAllAdmins(): Promise<AdminAccount[]> {
    try {
      const adminsQuery = query(
        collection(db, 'users'),
        where('role', '==', 'admin')
      );
      
      const snapshot = await getDocs(adminsQuery);
      const admins: AdminAccount[] = [];
      
      snapshot.forEach((doc) => {
        admins.push({ ...doc.data(), uid: doc.id } as AdminAccount);
      });
      
      return admins.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
    } catch (error) {
      console.error('Error getting admins:', error);
      throw error;
    }
  }
  
  /**
   * Deactivate admin account
   */
  static async deactivateAdmin(userId: string, deactivatedBy: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        isActive: false,
        deactivatedAt: serverTimestamp(),
        deactivatedBy,
        role: 'student' // Downgrade to student
      });
      
      console.log(`✅ Deactivated admin: ${userId}`);
      
    } catch (error) {
      console.error('Error deactivating admin:', error);
      throw error;
    }
  }
}

/**
 * Quick function to make current user super admin
 */
export async function makeCurrentUserSuperAdmin(): Promise<void> {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No authenticated user');
    }
    
    await AdminSystem.makeUserAdmin(
      currentUser.uid, 
      'super', 
      currentUser.uid, 
      'Self-promoted to super admin for system setup'
    );
    
    console.log('✅ Current user is now a Super Administrator!');
    console.log('🔄 Refresh the page to see admin access');
    
  } catch (error) {
    console.error('Error making current user super admin:', error);
    throw error;
  }
}
