'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  BookOpen, 
  Video, 
  Trophy, 
  Calendar,
  ArrowRight,
  Sparkles,
  Target,
  Flame,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  DashboardStatsSkeleton, 
  CourseProgressSkeleton, 
  ListSkeleton 
} from '@/components/ui/skeleton-loaders';
import { cn, formatRelativeTime } from '@/lib/utils';

export function EnhancedDashboardOverview() {
  const { userProfile } = useAuth();
  const { continueWatching, upcomingWebinars, achievements, isLoading, error } = useDashboardData();
  const [activeTab, setActiveTab] = useState<'continue' | 'webinars' | 'achievements'>('continue');

  if (!userProfile) return null;

  // Only show stats with real data
  const stats = [
    {
      title: 'Learning Streak',
      value: userProfile.stats?.currentStreak || 0,
      unit: 'days',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      show: (userProfile.stats?.currentStreak || 0) > 0
    },
    {
      title: 'Total Points',
      value: userProfile.stats?.totalPoints || 0,
      unit: 'pts',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      show: (userProfile.stats?.totalPoints || 0) > 0
    },
    {
      title: 'Courses Completed',
      value: userProfile.stats?.coursesCompleted || 0,
      unit: 'courses',
      icon: Trophy,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      show: true
    },
    {
      title: 'Active Courses',
      value: continueWatching?.length || 0,
      unit: 'courses',
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      show: true
    }
  ].filter(stat => stat.show);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const firstName = userProfile.firstName || userProfile.displayName?.split(' ')[0] || 'there';
    
    if (hour < 12) return `Good morning, ${firstName}!`;
    if (hour < 17) return `Good afternoon, ${firstName}!`;
    return `Good evening, ${firstName}!`;
  };

  const getMotivationalMessage = () => {
    const streak = userProfile.stats?.currentStreak || 0;
    if (streak === 0) return "Ready to start your learning journey?";
    if (streak < 7) return "You're building great habits!";
    if (streak < 30) return "Amazing consistency! Keep it up!";
    return "You're a learning champion! 🏆";
  };

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-destructive">Failed to load dashboard data</p>
            <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/20">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {getGreeting()}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {getMotivationalMessage()}
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="netflix" className="px-3 py-1">
                    {userProfile.subscription?.plan || 'Free'} Plan
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 capitalize">
                    {userProfile.role}
                  </Badge>
                </div>
              </div>
              
              {(userProfile.role === 'student' || userProfile.role === 'admin') && (
                <div className="hidden md:block">
                  <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <Link href="/ai">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Ask AI Assistant
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32" />
        </div>

        {/* Stats Grid */}
        {isLoading ? (
          <DashboardStatsSkeleton />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                      <Icon className={cn("h-4 w-4", stat.color)} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {stat.unit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </CardContent>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              );
            })}
          </div>
        )}

        {/* Main Content Tabs */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'continue' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('continue')}
              className="relative"
            >
              <Play className="w-4 h-4 mr-2" />
              Continue Learning
              {continueWatching.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {continueWatching.length}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeTab === 'webinars' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('webinars')}
              className="relative"
            >
              <Video className="w-4 h-4 mr-2" />
              Upcoming Webinars
              {upcomingWebinars.length > 0 && (
                <Badge variant="netflix" className="ml-2 h-5 w-5 p-0 text-xs">
                  {upcomingWebinars.length}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeTab === 'achievements' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('achievements')}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </Button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {/* Continue Learning */}
            {activeTab === 'continue' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="w-5 h-5 text-primary" />
                        Continue Learning
                      </CardTitle>
                      <CardDescription>
                        Pick up where you left off
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/courses">
                        View All Courses
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <CourseProgressSkeleton />
                  ) : continueWatching.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No courses in progress
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Start learning today and build your knowledge!
                      </p>
                      <Button asChild>
                        <Link href="/courses">Browse Courses</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {continueWatching.map((course) => (
                        <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors group">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                            {course.thumbnail ? (
                              <img 
                                src={course.thumbnail} 
                                alt={course.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            ) : (
                              <BookOpen className="w-8 h-8 text-primary" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {course.title}
                            </h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {course.subtitle}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary rounded-full h-2 transition-all duration-300"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {course.progress}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {course.duration}
                            </Badge>
                            <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Webinars */}
            {activeTab === 'webinars' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-primary" />
                        Upcoming Webinars
                      </CardTitle>
                      <CardDescription>
                        Join live learning sessions
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/webinars">
                        View All Webinars
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <ListSkeleton items={3} />
                  ) : upcomingWebinars.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No upcoming webinars
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Check back later for new live sessions!
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/webinars">Browse All Webinars</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingWebinars.map((webinar) => (
                        <div key={webinar.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-lg flex items-center justify-center">
                              <Video className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">
                                {webinar.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                by {webinar.instructor}
                              </p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {webinar.time}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {webinar.participants} registered
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant="netflix" className="text-xs">
                              Live
                            </Badge>
                            <Button size="sm">
                              Join
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            {activeTab === 'achievements' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-primary" />
                        Recent Achievements
                      </CardTitle>
                      <CardDescription>
                        Your learning milestones
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/achievements">
                        View All
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <ListSkeleton items={5} />
                  ) : achievements.length === 0 ? (
                    <div className="text-center py-12">
                      <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No achievements yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Complete courses and activities to earn achievements!
                      </p>
                      <Button asChild>
                        <Link href="/courses">Start Learning</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">
                              {achievement.name}
                            </h4>
                            {achievement.unlockedAt && (
                              <p className="text-xs text-muted-foreground">
                                Unlocked {formatRelativeTime(achievement.unlockedAt)}
                              </p>
                            )}
                          </div>
                          {achievement.unlocked && (
                            <Badge variant="success" className="text-xs">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
