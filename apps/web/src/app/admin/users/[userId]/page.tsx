'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc, collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { RoleGuard } from '@/components/auth/role-guard';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Activity, 
  CreditCard, 
  FileText, 
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Save,
  X,
  Crown,
  Zap,
  Star,
  Ban,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface UserDetails {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  role: string;
  status: string;
  createdAt: any;
  lastActive: any;
  subscription?: {
    status: string;
    plan: string;
    expiresAt?: any;
    startedAt?: any;
    cancelledAt?: any;
    paymentMethod?: string;
    billingCycle?: string;
    amount?: number;
    currency?: string;
    autoRenew?: boolean;
  };
  profile?: {
    bio?: string;
    yearGroup?: string;
    institution?: string;
    subjects?: string[];
  };
  hasIssues?: boolean;
  issueNote?: string;
  issueUpdatedAt?: any;
  loginHistory?: any[];
  activityHistory?: any[];
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: any;
  details?: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: any;
  lastUpdated: any;
}

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = params.userId as string;
  const editMode = searchParams.get('edit') === 'true';
  
  const [user, setUser] = useState<UserDetails | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(editMode);
  const [editedUser, setEditedUser] = useState<Partial<UserDetails>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
      fetchActivityLogs();
      fetchSupportTickets();
    }
  }, [userId]);

  // Update editing state when URL parameter changes
  useEffect(() => {
    setIsEditing(editMode);
  }, [editMode]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userDetails: UserDetails = {
          id: userDoc.id,
          email: userData.email || userData.userEmail || '',
          firstName: userData.firstName || userData.first_name || '',
          lastName: userData.lastName || userData.last_name || '',
          displayName: userData.displayName || userData.display_name || '',
          role: userData.role || 'student',
          status: userData.status || 'active',
          createdAt: userData.createdAt,
          lastActive: userData.lastActive,
          subscription: userData.subscription || { status: 'inactive', plan: 'free' },
          profile: userData.profile || {},
          hasIssues: userData.hasIssues || false,
          issueNote: userData.issueNote || '',
          issueUpdatedAt: userData.issueUpdatedAt,
          loginHistory: userData.loginHistory || [],
          activityHistory: userData.activityHistory || []
        };
        
        setUser(userDetails);
        setEditedUser(userDetails);
      } else {
        setError('User not found');
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      // This would fetch from an activity logs collection if it exists
      // For now, we'll use mock data based on user activity
      const mockLogs: ActivityLog[] = [
        {
          id: '1',
          action: 'User Login',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          details: 'Successful login from Chrome browser'
        },
        {
          id: '2',
          action: 'Profile Updated',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          details: 'Updated profile information'
        },
        {
          id: '3',
          action: 'Course Enrolled',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          details: 'Enrolled in Mathematics Advanced'
        }
      ];
      setActivityLogs(mockLogs);
    } catch (err) {
      console.error('Error fetching activity logs:', err);
    }
  };

  const fetchSupportTickets = async () => {
    try {
      // This would fetch from a support tickets collection if it exists
      const mockTickets: SupportTicket[] = [
        {
          id: '1',
          subject: 'Cannot access course materials',
          status: 'open',
          priority: 'medium',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        }
      ];
      setSupportTickets(mockTickets);
    } catch (err) {
      console.error('Error fetching support tickets:', err);
    }
  };

  const handleSave = async () => {
    if (!user || !editedUser) return;
    
    try {
      setSaving(true);
      await updateDoc(doc(db, 'users', userId), {
        firstName: editedUser.firstName,
        lastName: editedUser.lastName,
        displayName: editedUser.displayName,
        role: editedUser.role,
        status: editedUser.status,
        profile: editedUser.profile,
        subscription: editedUser.subscription,
        updatedAt: new Date()
      });
      
      setUser({ ...user, ...editedUser });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  const handleSubscriptionAction = async (action: string, planType?: string) => {
    if (!user) return;
    
    try {
      setSaving(true);
      const now = new Date();
      let updatedSubscription = { ...user.subscription };

      switch (action) {
        case 'upgrade':
          if (planType) {
            const planDetails = getSubscriptionPlanDetails(planType);
            updatedSubscription = {
              ...updatedSubscription,
              plan: planType,
              status: 'active',
              startedAt: now,
              expiresAt: new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)), // 30 days
              amount: planDetails.price,
              currency: 'GBP',
              autoRenew: true,
              billingCycle: 'monthly'
            };
          }
          break;
          
        case 'downgrade':
          if (planType) {
            const planDetails = getSubscriptionPlanDetails(planType);
            updatedSubscription = {
              ...updatedSubscription,
              plan: planType,
              status: 'active',
              amount: planDetails.price,
              currency: 'GBP'
            };
          }
          break;
          
        case 'cancel':
          updatedSubscription = {
            ...updatedSubscription,
            status: 'cancelled',
            cancelledAt: now,
            autoRenew: false
          };
          break;
          
        case 'reactivate':
          updatedSubscription = {
            ...updatedSubscription,
            status: 'active',
            cancelledAt: null,
            autoRenew: true,
            expiresAt: new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000))
          };
          break;
          
        case 'extend':
          const currentExpiry = updatedSubscription.expiresAt ? new Date(updatedSubscription.expiresAt) : now;
          updatedSubscription = {
            ...updatedSubscription,
            expiresAt: new Date(currentExpiry.getTime() + (30 * 24 * 60 * 60 * 1000))
          };
          break;
      }

      await updateDoc(doc(db, 'users', userId), {
        subscription: updatedSubscription,
        updatedAt: now
      });

      setUser({ ...user, subscription: updatedSubscription });
      setEditedUser({ ...editedUser, subscription: updatedSubscription });
      
      // Sync to auth context format
      await syncSubscriptionToAuthContext(updatedSubscription);
    } catch (err) {
      console.error('Error updating subscription:', err);
      setError('Failed to update subscription');
    } finally {
      setSaving(false);
    }
  };

  const getSubscriptionPlanDetails = (plan: string) => {
    const plans = {
      'basic': { name: 'Basic', price: 9.99, features: ['All courses', 'All webinars', 'Downloads', 'Progress tracking'] },
      'premium': { name: 'Premium', price: 19.99, features: ['Everything in Basic', 'AI tools', 'Premium content', 'Priority support'] },
      'pro': { name: 'Pro', price: 39.99, features: ['Everything in Premium', '1 paid addon/month', 'Personal tutoring', 'Dedicated support'] }
    };
    return plans[plan as keyof typeof plans] || plans.basic;
  };

  // Update user's subscription in auth context format as well
  const syncSubscriptionToAuthContext = async (updatedSubscription: any) => {
    try {
      // Update the subscription in the format expected by auth context
      const authContextSubscription = {
        plan: updatedSubscription.plan,
        status: updatedSubscription.status,
        expiresAt: updatedSubscription.expiresAt,
        stripeCustomerId: updatedSubscription.stripeCustomerId || null,
        stripeSubscriptionId: updatedSubscription.stripeSubscriptionId || null,
        pendingPlanChange: null
      };

      await updateDoc(doc(db, 'users', userId), {
        subscription: authContextSubscription,
        // Also store detailed subscription info for admin management
        subscriptionDetails: updatedSubscription,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error syncing subscription:', error);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'Never';
    if (date.toDate) return date.toDate().toLocaleString();
    if (date instanceof Date) return date.toLocaleString();
    return new Date(date).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'text-purple-600 bg-purple-100';
      case 'institution': return 'text-blue-600 bg-blue-100';
      case 'student': return 'text-green-600 bg-green-100';
      case 'parent': return 'text-orange-600 bg-orange-100';
      case 'content-creator': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'basic': return 'text-blue-600 bg-blue-100';
      case 'premium': return 'text-purple-600 bg-purple-100';
      case 'pro': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'basic': return Zap;
      case 'premium': return Star;
      case 'pro': return Crown;
      default: return User;
    }
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={['admin']}>
        <NetflixDashboardLayout>
          <div className="min-h-screen bg-black text-white p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading user details...</p>
              </div>
            </div>
          </div>
        </NetflixDashboardLayout>
      </RoleGuard>
    );
  }

  if (error || !user) {
    return (
      <RoleGuard allowedRoles={['admin']}>
        <NetflixDashboardLayout>
          <div className="min-h-screen bg-black text-white p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <p className="text-red-400 mb-4">{error || 'User not found'}</p>
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </NetflixDashboardLayout>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['admin']}>
      <NetflixDashboardLayout>
        <div className="min-h-screen bg-black text-white p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold">User Details</h1>
                <p className="text-gray-400">Complete account information and management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-semibold">Account Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.firstName || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      />
                    ) : (
                      <p className="text-white">{user.firstName || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.lastName || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      />
                    ) : (
                      <p className="text-white">{user.lastName || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <p className="text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {user.email}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.displayName || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, displayName: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      />
                    ) : (
                      <p className="text-white">{user.displayName || 'Not set'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                    {isEditing ? (
                      <select
                        value={editedUser.role || user.role}
                        onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      >
                        <option value="student">Student</option>
                        <option value="parent">Parent</option>
                        <option value="institution">Institution</option>
                        <option value="content-creator">Content Creator</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                    {isEditing ? (
                      <select
                        value={editedUser.status || user.status}
                        onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="pending">Pending</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        <Activity className="w-3 h-3 mr-1" />
                        {user.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity History */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-semibold">Activity History</h2>
                </div>
                
                <div className="space-y-4">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-white">{log.action}</h3>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(log.timestamp)}
                          </span>
                        </div>
                        {log.details && (
                          <p className="text-gray-400 text-sm">{log.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Dates */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold">Account Timeline</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Joined</p>
                    <p className="text-white">{formatDate(user.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Active</p>
                    <p className="text-white">{formatDate(user.lastActive)}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Management */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold">Subscription Management</h3>
                  </div>
                  {user.subscription?.status === 'cancelled' && (
                    <button
                      onClick={() => handleSubscriptionAction('reactivate')}
                      disabled={saving}
                      className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Reactivate
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {/* Current Plan */}
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const PlanIcon = getPlanIcon(user.subscription?.plan || 'basic');
                          return <PlanIcon className="w-4 h-4" />;
                        })()}
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(user.subscription?.plan || 'basic')}`}>
                          {(user.subscription?.plan || 'No Plan').toUpperCase()}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.subscription?.status || 'inactive')}`}>
                        {user.subscription?.status || 'inactive'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Amount</p>
                        <p className="text-white">
                          {user.subscription?.amount ? `£${user.subscription.amount}/month` : 'No subscription'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Auto Renew</p>
                        <p className="text-white">
                          {user.subscription?.autoRenew ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Started</p>
                        <p className="text-white">{formatDate(user.subscription?.startedAt)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Expires</p>
                        <p className="text-white">{formatDate(user.subscription?.expiresAt)}</p>
                      </div>
                    </div>
                    
                    {user.subscription?.cancelledAt && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-sm text-red-400">
                          Cancelled: {formatDate(user.subscription.cancelledAt)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Plan Management Actions */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Plan Management</h4>
                    
                    {/* Upgrade Options */}
                    <div className="grid grid-cols-2 gap-2">
                      {['basic', 'premium', 'pro'].map((plan) => {
                        const planDetails = getSubscriptionPlanDetails(plan);
                        const currentPlan = user.subscription?.plan || null;
                        const isCurrentPlan = currentPlan === plan;
                        const planHierarchy = ['basic', 'premium', 'pro'];
                        const currentIndex = currentPlan ? planHierarchy.indexOf(currentPlan) : -1;
                        const targetIndex = planHierarchy.indexOf(plan);
                        const isUpgrade = currentIndex < targetIndex;
                        const isDowngrade = currentIndex > targetIndex;
                        
                        if (isCurrentPlan) return null;
                        
                        return (
                          <button
                            key={plan}
                            onClick={() => {
                              const action = isUpgrade ? 'upgrade' : 'downgrade';
                              const confirmMessage = isUpgrade 
                                ? `Upgrade user to ${planDetails.name} plan (£${planDetails.price}/month)?`
                                : `Downgrade user to ${planDetails.name} plan (£${planDetails.price}/month)?`;
                              
                              if (confirm(confirmMessage)) {
                                handleSubscriptionAction(action, plan);
                              }
                            }}
                            disabled={saving}
                            className={`p-2 rounded text-xs font-medium transition-colors disabled:opacity-50 ${
                              isUpgrade 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'bg-orange-600 hover:bg-orange-700 text-white'
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              {isUpgrade ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {isUpgrade ? 'Upgrade to' : 'Downgrade to'} {planDetails.name}
                            </div>
                            <div className="text-xs opacity-75">£{planDetails.price}/month</div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Subscription Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSubscriptionAction('extend')}
                        disabled={saving}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        <Calendar className="w-3 h-3 mr-1 inline" />
                        Extend 30 Days
                      </button>
                      
                      {user.subscription?.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            if (confirm('Cancel this user\'s subscription?\n\nThis will:\n- Stop future billing\n- Maintain access until expiry\n- Can be reactivated later')) {
                              handleSubscriptionAction('cancel');
                            }
                          }}
                          disabled={saving}
                          className="flex-1 px-3 py-2 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          <Ban className="w-3 h-3 mr-1 inline" />
                          Cancel Plan
                        </button>
                      )}
                    </div>

                    {/* Compliance Actions */}
                    <div className="pt-3 border-t border-gray-700">
                      <h5 className="text-xs font-medium text-gray-400 mb-2">Terms & Compliance</h5>
                      <button
                        onClick={() => {
                          if (confirm('⚠️ COMPLIANCE ACTION ⚠️\n\nTerminate subscription for Terms & Conditions violation?\n\nThis will:\n- Immediately cancel subscription\n- Revoke premium access\n- Flag account for review\n- Log compliance action\n\nThis action should only be used for serious violations.')) {
                            handleSubscriptionAction('cancel');
                            // Also flag the user for review
                            updateDoc(doc(db, 'users', userId), {
                              hasIssues: true,
                              issueNote: 'Subscription terminated for T&C violation',
                              issueUpdatedAt: new Date()
                            });
                          }
                        }}
                        disabled={saving}
                        className="w-full px-3 py-2 bg-red-800 text-red-200 rounded text-xs hover:bg-red-900 transition-colors disabled:opacity-50 border border-red-600"
                      >
                        <AlertTriangle className="w-3 h-3 mr-1 inline" />
                        Terminate for T&C Violation
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues */}
              {user.hasIssues && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-400">Active Issues</h3>
                  </div>
                  
                  {user.issueNote && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-400">Issue Note</p>
                      <p className="text-red-300">{user.issueNote}</p>
                    </div>
                  )}
                  
                  {user.issueUpdatedAt && (
                    <div>
                      <p className="text-sm text-gray-400">Last Updated</p>
                      <p className="text-red-300">{formatDate(user.issueUpdatedAt)}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Support Tickets */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold">Support Tickets</h3>
                </div>
                
                {supportTickets.length > 0 ? (
                  <div className="space-y-3">
                    {supportTickets.map((ticket) => (
                      <div key={ticket.id} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white text-sm">{ticket.subject}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Created: {formatDate(ticket.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No support tickets</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </NetflixDashboardLayout>
    </RoleGuard>
  );
}
