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
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    totalWebinars: 0,
    pendingIssues: 0,
    systemHealth: 'healthy'
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'user_signup',
      message: 'New user registration: john.doe@email.com',
      timestamp: new Date().toISOString(),
      severity: 'info'
    },
    {
      id: 2,
      type: 'content_issue',
      message: 'Course "Advanced Mathematics" reported as not loading',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      severity: 'warning'
    },
    {
      id: 3,
      type: 'payment_issue',
      message: 'Payment failed for user: jane.smith@email.com',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      severity: 'error'
    }
  ]);

  useEffect(() => {
    // Load admin stats - replace with real API calls
    setStats({
      totalUsers: 1247,
      activeUsers: 892,
      totalCourses: 156,
      totalWebinars: 23,
      pendingIssues: 7,
      systemHealth: 'healthy'
    });
  }, []);

  const adminSections = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500',
      stats: `${stats.totalUsers} total users`
    },
    {
      title: 'Content Management',
      description: 'Manage courses, webinars, and educational content',
      icon: BookOpen,
      href: '/admin/content',
      color: 'bg-green-500',
      stats: `${stats.totalCourses} courses, ${stats.totalWebinars} webinars`
    },
    {
      title: 'System Monitoring',
      description: 'Monitor system health, performance, and analytics',
      icon: Activity,
      href: '/admin/monitoring',
      color: 'bg-purple-500',
      stats: `System ${stats.systemHealth}`
    },
    {
      title: 'Support Tickets',
      description: 'Handle user support requests and issues',
      icon: MessageSquare,
      href: '/admin/support',
      color: 'bg-orange-500',
      stats: `${stats.pendingIssues} pending issues`
    },
    {
      title: 'Financial Management',
      description: 'Manage subscriptions, payments, and billing',
      icon: BarChart3,
      href: '/admin/finance',
      color: 'bg-red-500',
      stats: 'Revenue tracking'
    },
    {
      title: 'System Settings',
      description: 'Configure system settings and preferences',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-500',
      stats: 'Global configuration'
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
                    <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
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
                    <p className="text-2xl font-bold text-foreground">{stats.activeUsers}</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
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
                    <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
                    <p className="text-sm text-muted-foreground">Courses</p>
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
                    <p className="text-2xl font-bold text-foreground">{stats.pendingIssues}</p>
                    <p className="text-sm text-muted-foreground">Pending Issues</p>
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
