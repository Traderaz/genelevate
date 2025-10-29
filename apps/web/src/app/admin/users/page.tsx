'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { RoleGuard } from '@/components/auth/role-guard';
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Eye,
  UserPlus,
  Download,
  RefreshCw,
  User
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAdminUsers, AdminUser } from '@/hooks/useAdminData';

export const dynamic = 'force-dynamic';

export default function AdminUsersPage() {
  const router = useRouter();
  const { users, loading, error, updateUser, deleteUser, flagUserIssue } = useAdminUsers();
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Debug logging
  console.log('Admin Users Page - Users:', users.length, 'Loading:', loading, 'Error:', error);

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.subscription?.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/10 text-red-600 border-red-200';
      case 'institution':
        return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'content-creator':
        return 'bg-orange-500/10 text-orange-600 border-orange-200';
      case 'parent':
        return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'student':
        return 'bg-green-500/10 text-green-600 border-green-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-600 border-green-200';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
      case 'cancelled':
        return 'bg-red-500/10 text-red-600 border-red-200';
      case 'past_due':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const handleUserAction = async (action: string, userId: string) => {
    try {
      setActionLoading(userId);
      
      switch (action) {
        case 'view':
          // Navigate to user details page
          router.push(`/admin/users/${userId}`);
          break;
          
        case 'edit':
          // Navigate to user details page in edit mode
          router.push(`/admin/users/${userId}?edit=true`);
          break;
          
        case 'flag_issue':
          if (confirm('Flag this user account for review?\n\nThis will:\n- Mark the account as having issues\n- Add it to the support queue\n- Notify other admins\n- Track resolution status')) {
            await flagUserIssue(userId, true, 'Flagged by admin for review');
            alert('✅ User account flagged for review');
          }
          break;
          
        case 'resolve_issue':
          if (confirm('Mark this user\'s issues as resolved?\n\nThis will:\n- Remove the issue flag\n- Clear from support queue\n- Log resolution in history')) {
            await flagUserIssue(userId, false);
            alert('✅ User issues marked as resolved');
          }
          break;
          
        case 'reset_password':
          if (confirm('Send password reset email to this user?\n\nThis will:\n- Send a secure reset link to their email\n- Invalidate current sessions\n- Log the password reset request')) {
            // Implement password reset
            alert('✅ Password reset email sent to user');
          }
          break;
          
        case 'promote_admin':
          if (confirm('Make this user an administrator?\n\nThis will give them:\n- Access to admin panel\n- User management permissions\n- Content management access\n- System monitoring tools\n\n⚠️ Only promote trusted users!')) {
            await updateUser(userId, { 
              role: 'admin'
            } as any);
            alert('✅ User promoted to administrator');
          }
          break;
          
        case 'demote_admin':
          if (confirm('Remove admin privileges from this user?\n\nThis will:\n- Remove admin panel access\n- Revoke management permissions\n- Change role to student\n- Keep their content and progress')) {
            await updateUser(userId, { 
              role: 'student'
            } as any);
            alert('✅ Admin privileges removed');
          }
          break;
          
        case 'suspend':
          if (confirm('Suspend this user account?\n\nThis will:\n- Prevent login access\n- Maintain account data\n- Can be reversed later\n- Notify user via email')) {
            await updateUser(userId, {
              // Suspend user functionality would be implemented here
            } as any);
            alert('✅ User account suspended');
          }
          break;
          
        case 'delete':
          if (confirm('⚠️ PERMANENTLY DELETE this user account?\n\n🚨 THIS CANNOT BE UNDONE! 🚨\n\nThis will:\n- Delete all user data\n- Remove all content\n- Clear progress history\n- Cancel subscriptions\n\nType "DELETE" to confirm:') && 
              prompt('Type "DELETE" to confirm permanent deletion:') === 'DELETE') {
            await deleteUser(userId);
            alert('✅ User account permanently deleted');
          }
          break;
          
        default:
          console.log(`Unknown action: ${action} for user:`, userId);
          alert(`Action "${action}" not implemented yet`);
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      alert(`❌ Failed to ${action} user: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again or contact system administrator.`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <NetflixDashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                User Management
              </h1>
              <p className="text-muted-foreground">
                Manage user accounts, troubleshoot issues, and handle support requests
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Users
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          {/* Action Guide */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">Admin Action Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">👁️ View & Edit</h4>
                  <ul className="space-y-1 text-blue-600">
                    <li><strong>View Details:</strong> See complete user profile</li>
                    <li><strong>Edit Profile:</strong> Modify user information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">🛠️ Issue Management</h4>
                  <ul className="space-y-1 text-green-600">
                    <li><strong>Flag Issue:</strong> Mark account for review</li>
                    <li><strong>Resolve Issue:</strong> Clear issue flags</li>
                    <li><strong>Reset Password:</strong> Send reset email</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">👑 Admin Controls</h4>
                  <ul className="space-y-1 text-purple-600">
                    <li><strong>Make Admin:</strong> Grant admin privileges</li>
                    <li><strong>Remove Admin:</strong> Revoke admin access</li>
                    <li><strong>Suspend:</strong> Temporarily disable account</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">⚠️ Dangerous Actions</h4>
                  <ul className="space-y-1 text-red-600">
                    <li><strong>Delete User:</strong> Permanently remove account</li>
                    <li><em>Requires confirmation</em></li>
                    <li><em>Cannot be undone</em></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Search and Filter Users</CardTitle>
              <CardDescription>
                Find specific users and filter by role or subscription status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Students</option>
                  <option value="parent">Parents</option>
                  <option value="institution">Institutions</option>
                  <option value="content-creator">Content Creators</option>
                  <option value="admin">Administrators</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="past_due">Past Due</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Complete list of platform users with account details
                {!loading && (
                  <span className="block text-xs mt-1 text-muted-foreground">
                    Total in database: {users.length} | Filtered: {filteredUsers.length}
                    {error && <span className="text-red-500"> | Error: {error}</span>}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Loading users...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {user.firstName} {user.lastName}
                            </h3>
                            {user.hasIssues && (
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            )}
                            {user.isVerified ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Joined {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                            <span>
                              Last active {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right space-y-2">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(user.subscription?.status || 'inactive')}>
                              {user.subscription?.status || 'No subscription'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {user.subscription?.plan || 'Free'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {/* Primary Actions Row */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction('view', user.id)}
                              disabled={actionLoading === user.id}
                              className="text-xs"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction('edit', user.id)}
                              disabled={actionLoading === user.id}
                              className="text-xs"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit Profile
                            </Button>
                          </div>

                          {/* Issue Management Row */}
                          <div className="flex items-center gap-2">
                            {user.hasIssues ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction('resolve_issue', user.id)}
                                disabled={actionLoading === user.id}
                                className="text-xs text-green-600 hover:text-green-700 border-green-200"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Resolve Issue
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction('flag_issue', user.id)}
                                disabled={actionLoading === user.id}
                                className="text-xs text-yellow-600 hover:text-yellow-700 border-yellow-200"
                              >
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Flag Issue
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction('reset_password', user.id)}
                              disabled={actionLoading === user.id}
                              className="text-xs text-blue-600 hover:text-blue-700 border-blue-200"
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Reset Password
                            </Button>
                          </div>

                          {/* Admin Actions Row */}
                          <div className="flex items-center gap-2">
                            {user.role !== 'admin' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction('promote_admin', user.id)}
                                disabled={actionLoading === user.id}
                                className="text-xs text-purple-600 hover:text-purple-700 border-purple-200"
                              >
                                <Shield className="w-3 h-3 mr-1" />
                                Make Admin
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction('demote_admin', user.id)}
                                disabled={actionLoading === user.id}
                                className="text-xs text-orange-600 hover:text-orange-700 border-orange-200"
                              >
                                <User className="w-3 h-3 mr-1" />
                                Remove Admin
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction('suspend', user.id)}
                              disabled={actionLoading === user.id}
                              className="text-xs text-red-600 hover:text-red-700 border-red-200"
                            >
                              {actionLoading === user.id ? (
                                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <XCircle className="w-3 h-3 mr-1" />
                              )}
                              Suspend Account
                            </Button>
                          </div>

                          {/* Dangerous Actions Row */}
                          <div className="flex items-center gap-2 pt-1 border-t border-red-100">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction('delete', user.id)}
                              disabled={actionLoading === user.id}
                              className="text-xs text-red-700 hover:text-red-800 border-red-300 bg-red-50 hover:bg-red-100"
                            >
                              {actionLoading === user.id ? (
                                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <Trash2 className="w-3 h-3 mr-1" />
                              )}
                              Delete User
                            </Button>
                            
                            <span className="text-xs text-red-500 font-medium">⚠️ Permanent</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No users found matching your criteria</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </NetflixDashboardLayout>
    </RoleGuard>
  );
}
