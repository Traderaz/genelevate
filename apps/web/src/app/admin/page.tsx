'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { RoleGuard } from '@/components/auth/role-guard';
import { 
  Users, 
  BookOpen, 
  Video, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Database,
  Shield,
  Activity,
  MessageSquare,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAdminStats, useAdminUsers } from '@/hooks/useAdminData';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

interface ActivityLog {
  id: string;
  type: 'user_signup' | 'content_issue' | 'payment_issue' | 'system_alert' | 'user_action';
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
  userId?: string;
  details?: any;
}

export default function AdminDashboard() {
  const { stats, loading: statsLoading, error: statsError } = useAdminStats();
  const { users } = useAdminUsers();
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

  // Listen to real activity from Firebase
  useEffect(() => {
    const fetchRealActivity = async () => {
      try {
        const activities: ActivityLog[] = [];
        
        // Real recent user signups (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const recentUsers = users
          .filter(user => {
            const createdAt = new Date(user.createdAt);
            return createdAt > sevenDaysAgo;
          })
          .slice(0, 5);

        recentUsers.forEach((user) => {
          activities.push({
            id: `signup_${user.id}`,
            type: 'user_signup',
            message: `New user registration: ${user.email}`,
            timestamp: user.createdAt,
            severity: 'info',
            userId: user.id
          });
        });

        // Real users with issues
        const usersWithIssues = users.filter(user => user.hasIssues).slice(0, 3);
        usersWithIssues.forEach(user => {
          activities.push({
            id: `issue_${user.id}`,
            type: 'user_action',
            message: `User account requires attention: ${user.email}`,
            timestamp: new Date().toISOString(),
            severity: 'warning',
            userId: user.id
          });
        });

        // Real system events
        if (statsError) {
          activities.push({
            id: 'system_error',
            type: 'system_alert',
            message: 'System monitoring detected an error in data fetching',
            timestamp: new Date().toISOString(),
            severity: 'error'
          });
        }

        if (stats.pendingIssues > 0) {
          activities.push({
            id: 'pending_issues',
            type: 'system_alert',
            message: `${stats.pendingIssues} user issues require admin attention`,
            timestamp: new Date().toISOString(),
            severity: stats.pendingIssues > 5 ? 'error' : 'warning'
          });
        }

        // Sort by timestamp (most recent first)
        activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        setRecentActivity(activities.slice(0, 8));
        setActivityLoading(false);
      } catch (error) {
        console.error('Error fetching real activity:', error);
        setActivityLoading(false);
      }
    };

    if (users.length >= 0) { // Run even with 0 users to show system status
      fetchRealActivity();
    }
  }, [users, stats, statsError]);

  const adminSections = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500',
      stats: `${stats.totalUsers} total users`,
      available: true
    },
    {
      title: 'Content Management',
      description: 'Manage courses, webinars, and educational content',
      icon: BookOpen,
      href: '/admin/content',
      color: 'bg-green-500',
      stats: `${stats.totalCourses} courses, ${stats.totalWebinars} webinars`,
      available: true
    },
    {
      title: 'Events Management',
      description: 'Create and manage platform events and workshops',
      icon: Calendar,
      href: '/admin/events',
      color: 'bg-cyan-500',
      stats: 'Upcoming events',
      available: true
    },
    {
      title: 'Founders Management',
      description: 'Manage founder profiles on homepage',
      icon: Users,
      href: '/admin/founders',
      color: 'bg-emerald-500',
      stats: 'Meet the team',
      available: true
    },
    {
      title: 'System Monitoring',
      description: 'Monitor system health, performance, and analytics',
      icon: Activity,
      href: '/admin/monitoring',
      color: 'bg-purple-500',
      stats: `System ${stats.systemHealth}`,
      available: true
    },
    {
      title: 'Reviews Management',
      description: 'Manage platform reviews and feedback',
      icon: MessageSquare,
      href: '/admin/reviews',
      color: 'bg-yellow-500',
      stats: 'User feedback',
      available: true
    },
    {
      title: 'Interview Lab',
      description: 'Manage interview practice submissions and responses',
      icon: Video,
      href: '/admin/interview-lab',
      color: 'bg-pink-500',
      stats: 'Video submissions',
      available: true
    },
    {
      title: 'Creator Dashboard',
      description: 'Content creator tools and analytics',
      icon: FileText,
      href: '/creator-dashboard',
      color: 'bg-indigo-500',
      stats: 'Content creation',
      available: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'text-red-500 bg-red-500/10';
      case 'warning':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'info':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return XCircle;
      case 'warning':
        return AlertTriangle;
      case 'info':
        return CheckCircle;
      default:
        return Eye;
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
                <Shield className="w-8 h-8 text-primary" />
                Administration Dashboard
              </h1>
              <p className="text-muted-foreground">
                Complete system management and user support tools
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Activity className="w-3 h-3 mr-1" />
                System Healthy
              </Badge>
              <Button variant="outline" size="sm">
                <Database className="w-4 h-4 mr-2" />
                System Backup
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-6 bg-muted rounded w-16 mb-1"></div>
                        <div className="h-4 bg-muted rounded w-20"></div>
                      </div>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-6 bg-muted rounded w-16 mb-1"></div>
                        <div className="h-4 bg-muted rounded w-20"></div>
                      </div>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-foreground">{stats.activeUsers}</p>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-6 bg-muted rounded w-16 mb-1"></div>
                        <div className="h-4 bg-muted rounded w-20"></div>
                      </div>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
                        <p className="text-sm text-muted-foreground">Courses</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-6 bg-muted rounded w-16 mb-1"></div>
                        <div className="h-4 bg-muted rounded w-20"></div>
                      </div>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-foreground">{stats.pendingIssues}</p>
                        <p className="text-sm text-muted-foreground">Pending Issues</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Sections */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Administration Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Card key={section.title} className="hover:shadow-lg transition-all duration-200 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-lg ${section.color}/10`}>
                          <IconComponent className={`w-6 h-6 ${section.color.replace('bg-', 'text-')}`} />
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={section.href}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {section.title}
                      </CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{section.stats}</p>
                      <Button asChild className="w-full mt-4" variant="outline">
                        <Link href={section.href}>
                          Manage {section.title}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent System Activity</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Activity Log
                </CardTitle>
                <CardDescription>
                  Latest system events and user activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const SeverityIcon = getSeverityIcon(activity.severity);
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                        <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                          <SeverityIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline" className={getSeverityColor(activity.severity)}>
                          {activity.severity}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/admin/activity">
                      View Full Activity Log
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </NetflixDashboardLayout>
    </RoleGuard>
  );
}
