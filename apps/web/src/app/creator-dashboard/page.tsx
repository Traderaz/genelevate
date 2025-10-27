'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Using native HTML elements with Tailwind CSS instead of separate UI components
import { 
  Video, 
  BookOpen, 
  Plus, 
  Eye, 
  Users, 
  Star, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut
} from 'lucide-react';
// Badge component replaced with Tailwind classes
import Link from 'next/link';

interface ContentItem {
  id: string;
  title: string;
  type: 'webinar' | 'course';
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  views: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function CreatorDashboard() {
  const { user, userProfile, loading, logout } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState({
    totalContent: 0,
    totalViews: 0,
    averageRating: 0,
    pendingApproval: 0
  });

  useEffect(() => {
    if (!loading && (!user || !userProfile)) {
      router.push('/login');
      return;
    }

    if (userProfile && userProfile.role !== 'content-creator') {
      router.push('/dashboard');
      return;
    }

    // TODO: Fetch content creator's content from Firestore
    // For now, using mock data
    const mockContent: ContentItem[] = [
      {
        id: '1',
        title: 'Advanced Calculus Techniques',
        type: 'webinar',
        status: 'approved',
        views: 245,
        rating: 4.8,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Complete Physics Course - Mechanics',
        type: 'course',
        status: 'pending',
        views: 0,
        rating: 0,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      }
    ];

    setContent(mockContent);
    setStats({
      totalContent: mockContent.length,
      totalViews: mockContent.reduce((sum, item) => sum + item.views, 0),
      averageRating: mockContent.filter(item => item.rating > 0).reduce((sum, item) => sum + item.rating, 0) / mockContent.filter(item => item.rating > 0).length || 0,
      pendingApproval: mockContent.filter(item => item.status === 'pending').length
    });
  }, [user, userProfile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !userProfile || userProfile.role !== 'content-creator') {
    return null;
  }

  // Check if creator is approved
  const isApproved = userProfile.isApproved !== false; // Assuming this field exists

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Content Creator Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userProfile.displayName}</p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/creator-dashboard/create-webinar"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                <Video className="w-4 h-4 mr-2" />
                Create Webinar
              </Link>
              <Link 
                href="/creator-dashboard/create-course"
                className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Create Course
              </Link>
              <button
                onClick={async () => {
                  try {
                    await logout();
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="inline-flex items-center px-4 py-2 border border-destructive/20 text-destructive rounded-lg hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Approval Status Alert */}
        {!isApproved && (
          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-4 py-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-3 flex-shrink-0" />
              <p className="text-sm">
                Your content creator account is pending approval. You can create content, but it won't be visible to students until your account is approved by an administrator.
              </p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card/80 backdrop-blur-sm border border-border p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Content</h3>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.totalContent}</div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-border p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-border p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Average Rating</h3>
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-border p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Pending Approval</h3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.pendingApproval}</div>
          </div>
        </div>

        {/* Content List */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Your Content</h2>
            <p className="text-muted-foreground mt-1">
              Manage your webinars and courses
            </p>
          </div>
          <div className="p-6">
            {content.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No content yet</h3>
                <p className="text-muted-foreground mb-6">Start creating webinars and courses to engage with students.</p>
                <div className="flex justify-center gap-3">
                  <Link 
                    href="/creator-dashboard/create-webinar"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Create Your First Webinar
                  </Link>
                  <Link 
                    href="/creator-dashboard/create-course"
                    className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Create Your First Course
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {content.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {item.type === 'webinar' ? (
                          <Video className="w-5 h-5 text-blue-600" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{item.type}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{item.views} views</span>
                          </div>
                          {item.rating > 0 && (
                            <>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3" />
                                <span>{item.rating.toFixed(1)}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(item.status)}
                          <span className="capitalize">{item.status}</span>
                        </div>
                      </span>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <Link 
                href="/creator-dashboard/create-webinar"
                className="flex items-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Webinar
              </Link>
              <Link 
                href="/creator-dashboard/create-course"
                className="flex items-center w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Link>
              <Link 
                href="/creator-dashboard/analytics"
                className="flex items-center w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Analytics
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Resources</h2>
            </div>
            <div className="p-6 space-y-3">
              <Link 
                href="/creator-dashboard/guidelines"
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Content Guidelines
              </Link>
              <Link 
                href="/creator-dashboard/help"
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <Users className="w-4 h-4 mr-2" />
                Creator Support
              </Link>
              <Link 
                href="/creator-dashboard/profile"
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <Users className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
