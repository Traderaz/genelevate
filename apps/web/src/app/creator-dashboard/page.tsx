'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  LogOut,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  Edit,
  Trash2,
  Play,
  FileText,
  Award,
  Target,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ContentItem {
  id: string;
  title: string;
  type: 'webinar' | 'course';
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  views: number;
  rating: number;
  enrollments: number;
  completionRate: number;
  revenue: number;
  duration: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  lastViewedAt?: Date;
}

interface AnalyticsData {
  totalContent: number;
  totalViews: number;
  totalEnrollments: number;
  averageRating: number;
  pendingApproval: number;
  totalRevenue: number;
  averageCompletionRate: number;
  monthlyGrowth: number;
  topPerformingContent: ContentItem[];
  recentActivity: {
    type: 'view' | 'enrollment' | 'completion' | 'rating';
    contentTitle: string;
    timestamp: Date;
    value?: number;
  }[];
}

export default function CreatorDashboard() {
  const { user, userProfile, loading, logout } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalContent: 0,
    totalViews: 0,
    totalEnrollments: 0,
    averageRating: 0,
    pendingApproval: 0,
    totalRevenue: 0,
    averageCompletionRate: 0,
    monthlyGrowth: 0,
    topPerformingContent: [],
    recentActivity: []
  });

  useEffect(() => {
    if (!loading && (!user || !userProfile)) {
      router.push('/login');
      return;
    }

    // Allow content creators and admins (for testing/management)
    if (userProfile && userProfile.role !== 'content-creator' && userProfile.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    // Fetch creator's content from Firestore
    const fetchCreatorContent = async () => {
      if (!user) return;

      try {
        const { collection, query, where, getDocs, orderBy } = await import('firebase/firestore');
        const { db } = await import('@/lib/firebase-client');

        // Fetch creator's courses
        const coursesRef = collection(db, 'courses');
        const coursesQuery = query(coursesRef, where('createdBy', '==', user.uid));
        const coursesSnapshot = await getDocs(coursesQuery);
        
        const courses: ContentItem[] = coursesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            type: 'course',
            status: data.status || 'draft',
            views: data.views || 0,
            rating: data.rating || 0,
            enrollments: data.enrollmentCount || 0,
            completionRate: data.completionRate || 0,
            revenue: 0, // TODO: Calculate from enrollments
            duration: `${data.chapters?.length || 0} chapters`,
            thumbnail: data.thumbnail,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            publishedAt: data.publishedAt?.toDate(),
          };
        });

        // Fetch creator's webinars
        const webinarsRef = collection(db, 'webinars');
        const webinarsQuery = query(webinarsRef, where('createdBy', '==', user.uid));
        const webinarsSnapshot = await getDocs(webinarsQuery);
        
        const webinars: ContentItem[] = webinarsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            type: 'webinar',
            status: data.status || 'scheduled',
            views: data.views || 0,
            rating: data.rating || 0,
            enrollments: data.registeredCount || 0,
            completionRate: 0,
            revenue: 0, // TODO: Calculate from registrations
            duration: `${data.duration || 0} min`,
            thumbnail: data.thumbnail,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            publishedAt: data.scheduledAt?.toDate(),
          };
        });

        // Combine and sort by creation date
        const allContent = [...courses, ...webinars].sort((a, b) => 
          b.createdAt.getTime() - a.createdAt.getTime()
        );

        setContent(allContent);

        // Calculate analytics
        const totalEnrollments = allContent.reduce((sum, item) => sum + item.enrollments, 0);
        const totalViews = allContent.reduce((sum, item) => sum + item.views, 0);
        const ratingsSum = allContent.reduce((sum, item) => sum + (item.rating > 0 ? item.rating : 0), 0);
        const ratingsCount = allContent.filter(item => item.rating > 0).length;
        const averageRating = ratingsCount > 0 ? ratingsSum / ratingsCount : 0;
        const completionSum = allContent.reduce((sum, item) => sum + item.completionRate, 0);
        const averageCompletionRate = allContent.length > 0 ? completionSum / allContent.length : 0;

        setAnalytics({
          totalContent: allContent.length,
          totalViews,
          totalEnrollments,
          averageRating,
          pendingApproval: allContent.filter(item => item.status === 'pending').length,
          totalRevenue: 0, // TODO: Calculate from actual revenue data
          averageCompletionRate,
          monthlyGrowth: 0, // TODO: Calculate from historical data
          topPerformingContent: [...allContent]
            .sort((a, b) => b.enrollments - a.enrollments)
            .slice(0, 3),
          recentActivity: []
        });
      } catch (error) {
        console.error('Error fetching creator content:', error);
      }
    };

    fetchCreatorContent();
  }, [user, userProfile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Allow content creators and admins
  if (!user || !userProfile || (userProfile.role !== 'content-creator' && userProfile.role !== 'admin')) {
    return null;
  }

  // Check if creator is approved
  const isApproved = (userProfile as any)?.isApproved !== false;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header */}
      <div className="bg-card/95 backdrop-blur-xl border-b border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Creator Studio
                </h1>
                <p className="text-muted-foreground">Welcome back, {userProfile.displayName}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Link href="/creator-dashboard/create-course">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Course
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/creator-dashboard/create-webinar">
                  <Video className="w-4 h-4 mr-2" />
                  Create Webinar
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={async () => {
                  try {
                    await logout();
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Approval Status Alert */}
        {!isApproved && (
          <Card className="border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/20 dark:border-yellow-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Account Pending Approval
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    You can create content, but it won't be visible to students until approved by an administrator.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

            {/* Enhanced Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">Total Enrollments</p>
                      <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                        {analytics.totalEnrollments.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Across {analytics.totalContent} courses
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Avg. Completion</p>
                      <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                        {analytics.averageCompletionRate.toFixed(0)}%
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                        Student engagement
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Avg. Rating</p>
                      <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                        {analytics.averageRating > 0 ? analytics.averageRating.toFixed(1) : 'N/A'}
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                        {analytics.totalViews.toLocaleString()} total views
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Your Content
                </CardTitle>
                <CardDescription>
                  Manage your courses and webinars
                </CardDescription>
              </CardHeader>
              <CardContent>
                {content.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No content yet</h3>
                    <p className="text-muted-foreground mb-6">Start creating courses and webinars to engage with students.</p>
                    <div className="flex justify-center gap-3">
                      <Button asChild>
                        <Link href="/creator-dashboard/create-course">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Course
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/creator-dashboard/create-webinar">
                          <Video className="w-4 h-4 mr-2" />
                          Create Webinar
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {content.map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                item.type === 'course' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'
                              }`}>
                                {item.type === 'webinar' ? (
                                  <Video className="w-6 h-6 text-purple-600" />
                                ) : (
                                  <BookOpen className="w-6 h-6 text-blue-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                  <Badge variant="secondary" className="capitalize">
                                    {item.type}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {item.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {item.views.toLocaleString()}
                                  </span>
                                  {item.rating > 0 && (
                                    <span className="flex items-center gap-1">
                                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                      {item.rating.toFixed(1)}
                                    </span>
                                  )}
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Enrollments</p>
                                    <p className="font-semibold">{item.enrollments.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Completion</p>
                                    <p className="font-semibold">{item.completionRate}%</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Revenue</p>
                                    <p className="font-semibold">£{item.revenue.toLocaleString()}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Badge 
                                variant={item.status === 'approved' ? 'default' : 
                                        item.status === 'pending' ? 'secondary' : 
                                        item.status === 'rejected' ? 'destructive' : 'outline'}
                                className="flex items-center gap-1"
                              >
                                {getStatusIcon(item.status)}
                                {item.status}
                              </Badge>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'enrollment' ? 'bg-green-100 dark:bg-green-900/30' :
                        activity.type === 'completion' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        activity.type === 'rating' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {activity.type === 'enrollment' && <Users className="w-4 h-4 text-green-600" />}
                        {activity.type === 'completion' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'rating' && <Star className="w-4 h-4 text-yellow-600" />}
                        {activity.type === 'view' && <Eye className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.contentTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.type === 'enrollment' && `${activity.value} new enrollments`}
                          {activity.type === 'completion' && `${activity.value} completions`}
                          {activity.type === 'rating' && `${activity.value}-star rating`}
                          {activity.type === 'view' && `${activity.value} new views`}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topPerformingContent.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' :
                        'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">£{item.revenue.toLocaleString()} revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link href="/creator-dashboard/analytics">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/creator-dashboard/guidelines">
                    <FileText className="w-4 h-4 mr-2" />
                    Content Guidelines
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/creator-dashboard/help">
                    <Users className="w-4 h-4 mr-2" />
                    Get Support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}