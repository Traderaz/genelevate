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
  Sparkles
} from 'lucide-react';
import { WellbeingWidget } from './wellbeing-widget';
import { RewardsWidget } from './rewards-widget';
import { AddOnsWidget } from './addons-widget';
import { useAuth } from '@/contexts/auth-context';
import { useDashboardData } from '@/hooks/useDashboardData';

export function NetflixDashboardOverview() {
  const { user, userProfile } = useAuth();
  const { continueWatching, upcomingWebinars, achievements, isLoading, error } = useDashboardData();
  const [activeTab, setActiveTab] = useState('continue');

  // Real user stats from profile
  const stats = [
    {
      label: 'Courses Completed',
      value: userProfile?.stats?.coursesCompleted?.toString() || '0',
      change: (userProfile?.stats?.coursesCompleted || 0) > 0 ? `${userProfile?.stats?.coursesCompleted || 0} completed` : 'Start your first course',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Hours Learned',
      value: userProfile?.stats?.totalHours?.toString() || '0',
      change: (userProfile?.stats?.totalHours || 0) > 0 ? `${userProfile?.stats?.totalHours || 0} hours` : 'Begin learning today',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Current Streak',
      value: `${userProfile?.stats?.currentStreak || 0} days`,
      change: (userProfile?.stats?.currentStreak || 0) > 0 ? 'Keep it going!' : 'Start your streak',
      icon: Zap,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      label: 'Total Points',
      value: userProfile?.stats?.totalPoints?.toString() || '0',
      change: (userProfile?.stats?.totalPoints || 0) > 0 ? 'Earning rewards' : 'Earn your first points',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8 border border-border">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {userProfile?.displayName || userProfile?.firstName || 'Student'}! 👋
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Ready to continue your learning journey? You're doing amazing!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold netflix-button"
            >
              <Play className="w-5 h-5" />
              Continue Learning
            </Link>
            <Link
              href="/webinars"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold netflix-button"
            >
              <Video className="w-5 h-5" />
              Join Live Session
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-6 netflix-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-green-500 font-medium">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WellbeingWidget />
        <RewardsWidget />
        <AddOnsWidget />
      </div>

      {/* Quick Links to Other Pages */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Quick Access
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link
            href="/dashboard/progress"
            className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">My Progress</span>
            </div>
          </Link>
          
          <Link
            href="/dashboard/schedule"
            className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Schedule</span>
            </div>
          </Link>
          
          <Link
            href="/dashboard/achievements"
            className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors">
                <Star className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Achievements</span>
            </div>
          </Link>

          <Link
            href="/wellbeing"
            className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3 group-hover:bg-green-500/20 transition-colors">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Life Modules</span>
            </div>
          </Link>

          <Link
            href="/rewards"
            className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-3 group-hover:bg-yellow-500/20 transition-colors">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Leaderboard</span>
            </div>
          </Link>

          <Link
            href="/dna"
            className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 transition-colors">
                <Sparkles className="w-6 h-6 text-indigo-500" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">My DNA</span>
            </div>
          </Link>

          <Link
            href="/debates"
            className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3 group-hover:bg-red-500/20 transition-colors">
                <Users className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Debate Room</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-6 border-b border-border">
          {[
            { id: 'continue', label: 'Continue Watching', icon: Play },
            { id: 'webinars', label: 'Live Sessions', icon: Video },
            { id: 'achievements', label: 'Achievements', icon: Trophy }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Continue Watching */}
        {activeTab === 'continue' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Continue Learning</h3>
              <Link
                href="/courses"
                className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : continueWatching.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-semibold text-foreground mb-2">No courses in progress</h4>
                <p className="text-muted-foreground mb-6">Start learning today and track your progress here</p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold netflix-button"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {continueWatching.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card border border-border rounded-xl overflow-hidden netflix-card cursor-pointer"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-background">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    {item.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/20">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.subtitle}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.duration}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        item.type === 'webinar' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        )}

        {/* Live Sessions */}
        {activeTab === 'webinars' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Upcoming Live Sessions</h3>
              <Link
                href="/webinars"
                className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl animate-pulse">
                    <div className="w-20 h-14 bg-muted rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : upcomingWebinars.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-semibold text-foreground mb-2">No upcoming webinars</h4>
                <p className="text-muted-foreground mb-6">Check back later for live sessions with expert instructors</p>
                <Link
                  href="/webinars"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold netflix-button"
                >
                  <Video className="w-5 h-5" />
                  View All Webinars
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl netflix-card"
                >
                  <div className="w-20 h-14 bg-gradient-to-br from-primary/20 to-background rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{webinar.title}</h4>
                    <p className="text-sm text-muted-foreground">{webinar.instructor}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {webinar.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {webinar.participants} joined
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium netflix-button">
                    Join
                  </button>
                </div>
              ))}
              </div>
            )}
          </div>
        )}

        {/* Achievements */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Recent Achievements</h3>
              <Link
                href="/dashboard/achievements"
                className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 text-center animate-pulse">
                    <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-2" />
                    <div className="h-4 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : achievements.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-semibold text-foreground mb-2">No achievements yet</h4>
                <p className="text-muted-foreground mb-6">Complete courses and activities to unlock achievements</p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold netflix-button"
                >
                  <Play className="w-5 h-5" />
                  Start Learning
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border text-center netflix-card ${
                      achievement.unlocked
                        ? 'bg-card border-border'
                        : 'bg-muted/50 border-border opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-sm font-medium text-foreground">{achievement.name}</p>
                    {achievement.unlocked && (
                      <p className="text-xs text-green-500 mt-1">Unlocked!</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
