'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  BookOpen, 
  Video, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Star,
  ChevronRight,
  Calendar,
  Users,
  Target,
  Zap,
  Sparkles,
  Heart,
  Briefcase,
  ShoppingBag,
  Settings,
  User,
  Building2,
  ArrowRight,
  Lock,
  Award,
  Brain,
  Globe
} from 'lucide-react';
import { WellbeingWidget } from './wellbeing-widget';
import { RewardsWidget } from './rewards-widget';
import { AddOnsWidget } from './addons-widget';
import { useAuth } from '@/contexts/auth-context';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function NetflixDashboardOverview() {
  const { user, userProfile } = useAuth();
  const { continueWatching, upcomingWebinars, achievements, isLoading, error } = useDashboardData();
  const [activeSection, setActiveSection] = useState('overview');

  // Get all available sections based on user role
  const getAllSections = () => {
    const baseSections = [
      {
        id: 'learning',
        title: 'Learning Hub',
        description: 'Courses, webinars, and educational content',
        icon: BookOpen,
        color: 'bg-blue-500',
        gradient: 'from-blue-500/20 to-blue-600/10',
        items: [
          { name: 'Browse Courses', href: '/courses', icon: BookOpen, description: 'Explore our course library', premium: false },
          { name: 'Live Webinars', href: '/webinars', icon: Video, description: 'Join live learning sessions', premium: false },
          { name: 'Weekly Tasks', href: '/todo', icon: Target, description: 'Plan and track your weekly goals', premium: false },
          { name: 'My Progress', href: '/dashboard/progress', icon: TrendingUp, description: 'Track your learning journey', premium: false },
          { name: 'Achievements', href: '/dashboard/achievements', icon: Trophy, description: 'View your accomplishments', premium: false }
        ]
      },
      {
        id: 'skills',
        title: 'Life & Career Skills',
        description: 'Essential skills for personal and professional growth',
        icon: Heart,
        color: 'bg-pink-500',
        gradient: 'from-pink-500/20 to-pink-600/10',
        items: [
          { name: 'Life Skills', href: '/life-skills', icon: Heart, description: 'Essential life skills training', premium: false },
          { name: 'Career Explorer', href: '/careers', icon: Briefcase, description: 'Explore career paths', premium: false },
          { name: 'Debates', href: '/debates', icon: Users, description: 'Join academic discussions', premium: false },
          { name: 'Wellbeing', href: '/wellbeing', icon: Heart, description: 'Mental health resources', premium: false }
        ]
      },
      {
        id: 'tools',
        title: 'Learning Tools',
        description: 'Advanced tools to enhance your learning',
        icon: Sparkles,
        color: 'bg-purple-500',
        gradient: 'from-purple-500/20 to-purple-600/10',
        items: [
          { name: 'AI Assistant', href: '/ai', icon: Sparkles, description: 'Get personalized help', premium: true },
          { name: 'DNA Tracking', href: '/dna', icon: Zap, description: 'Track your learning DNA', premium: true },
          { name: 'Add-Ons', href: '/addons', icon: ShoppingBag, description: 'Premium features and tools', premium: false }
        ]
      },
      {
        id: 'account',
        title: 'Account & Settings',
        description: 'Manage your profile and preferences',
        icon: User,
        color: 'bg-gray-500',
        gradient: 'from-gray-500/20 to-gray-600/10',
        items: [
          { name: 'My Profile', href: '/dashboard/profile', icon: User, description: 'Manage your profile', premium: false },
          { name: 'Settings', href: '/dashboard/settings', icon: Settings, description: 'Account preferences', premium: false },
          { name: 'Notifications', href: '/dashboard/notifications', icon: Calendar, description: 'Manage notifications', premium: false },
          { name: 'Help & Support', href: '/help', icon: Users, description: 'Get help and support', premium: false }
        ]
      }
    ];

    // Add role-specific sections
    if (userProfile?.role === 'institution' || userProfile?.role === 'admin') {
      baseSections.push({
        id: 'institution',
        title: 'Institution Management',
        description: 'Manage your institution and students',
        icon: Building2,
        color: 'bg-orange-500',
        gradient: 'from-orange-500/20 to-orange-600/10',
        items: [
          { name: 'Institution Dashboard', href: '/institution', icon: Building2, description: 'Manage your institution', premium: false },
          { name: 'Students', href: '/institution/students', icon: Users, description: 'Manage student accounts', premium: false },
          { name: 'Analytics', href: '/institution/analytics', icon: TrendingUp, description: 'View detailed analytics', premium: false }
        ]
      });
    }

    if (userProfile?.role === 'content-creator' || userProfile?.role === 'admin') {
      baseSections.push({
        id: 'creator',
        title: 'Content Creation',
        description: 'Create and manage your content',
        icon: Video,
        color: 'bg-green-500',
        gradient: 'from-green-500/20 to-green-600/10',
        items: [
          { name: 'Creator Dashboard', href: '/creator-dashboard', icon: Video, description: 'Manage your content', premium: false },
          { name: 'Content Library', href: '/creator-dashboard/content', icon: BookOpen, description: 'Your created content', premium: false },
          { name: 'Analytics', href: '/creator-dashboard/analytics', icon: TrendingUp, description: 'Content performance', premium: false }
        ]
      });
    }

    if (userProfile?.role === 'admin') {
      baseSections.push({
        id: 'admin',
        title: 'Administration',
        description: 'System administration and management',
        icon: Settings,
        color: 'bg-red-500',
        gradient: 'from-red-500/20 to-red-600/10',
        items: [
          { name: 'Admin Panel', href: '/admin', icon: Settings, description: 'System administration', premium: false },
          { name: 'User Management', href: '/admin/users', icon: Users, description: 'Manage all users', premium: false },
          { name: 'Content Moderation', href: '/admin/moderation', icon: BookOpen, description: 'Review and approve content', premium: false }
        ]
      });
    }

    return baseSections;
  };

  const sections = getAllSections();
  const isPremiumUser = userProfile?.subscription?.plan !== 'free';

  // Quick stats for the overview
  const quickStats = [
    {
      label: 'Courses Completed',
      value: (userProfile as any)?.coursesCompleted || 0,
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Total Points',
      value: (userProfile as any)?.totalPoints || 0,
      icon: Star,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Current Level',
      value: (userProfile as any)?.level || 1,
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      label: 'Streak Days',
      value: (userProfile as any)?.streakDays || 0,
      icon: Zap,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <CardContent className="p-6 sm:p-8">
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Welcome back, {userProfile?.displayName || userProfile?.firstName || 'Student'}! 👋
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-4">
                Explore all the amazing features and tools available to you
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge variant={userProfile?.subscription?.plan === 'free' ? 'outline' : 'default'}>
                  {userProfile?.subscription?.plan || 'Free'} Plan
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {userProfile?.role}
                </Badge>
                {(userProfile?.role === 'student' || userProfile?.role === 'admin') && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="default" asChild className="ml-2">
                        <Link href="/ai">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Ask AI
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get personalized help from our AI assistant</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-16 sm:-translate-y-32 translate-x-16 sm:translate-x-32" />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                          <IconComponent className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                            {stat.value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your {stat.label.toLowerCase()}: {stat.value}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* All Sections Overview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">All Features & Tools</h2>
            <Badge variant="outline" className="text-xs">
              {sections.length} sections available
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <Card key={section.id} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${section.color}/10 group-hover:${section.color}/20 transition-colors`}>
                        <SectionIcon className={`w-6 h-6 text-white`} style={{color: section.color.replace('bg-', '').replace('-500', '')}} />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {section.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {section.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => {
                        const ItemIcon = item.icon;
                        const isAccessible = !item.premium || isPremiumUser || userProfile?.role === 'admin';
                        
                        return (
                          <Tooltip key={itemIndex}>
                            <TooltipTrigger asChild>
                              <div className="relative">
                                {isAccessible ? (
                                  <Link
                                    href={item.href}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-all duration-200 group/item"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <ItemIcon className="w-4 h-4 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                                      <span className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                                        {item.name}
                                      </span>
                                      {item.premium && (
                                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                          Pro
                                        </Badge>
                                      )}
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-1 transition-all" />
                                  </Link>
                                ) : (
                                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 opacity-60 cursor-not-allowed">
                                    <div className="flex items-center space-x-3">
                                      <ItemIcon className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm font-medium text-muted-foreground">
                                        {item.name}
                                      </span>
                                      <Lock className="w-3 h-3 text-muted-foreground" />
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      Premium
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.description}</p>
                              {item.premium && !isPremiumUser && userProfile?.role !== 'admin' && (
                                <p className="text-xs text-muted-foreground mt-1">Requires premium subscription</p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>
              Jump into your most used features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" size="sm" asChild className="h-auto p-4 flex-col space-y-2">
                <Link href="/courses">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs">Browse Courses</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="h-auto p-4 flex-col space-y-2">
                <Link href="/webinars">
                  <Video className="w-5 h-5" />
                  <span className="text-xs">Live Webinars</span>
                </Link>
              </Button>
              {(userProfile?.role === 'student' || userProfile?.role === 'admin') && (
                <Button variant="outline" size="sm" asChild className="h-auto p-4 flex-col space-y-2">
                  <Link href="/ai">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs">AI Assistant</span>
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild className="h-auto p-4 flex-col space-y-2">
                <Link href="/dashboard/progress">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xs">My Progress</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WellbeingWidget />
          <RewardsWidget />
          <AddOnsWidget />
        </div>
      </div>
    </TooltipProvider>
  );
}