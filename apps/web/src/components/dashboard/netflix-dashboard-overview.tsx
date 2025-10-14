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
  Zap
} from 'lucide-react';

export function NetflixDashboardOverview() {
  const [activeTab, setActiveTab] = useState('continue');

  // Mock data - replace with real data from your store/API
  const stats = [
    {
      label: 'Courses Completed',
      value: '12',
      change: '+3 this month',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Hours Learned',
      value: '47.5',
      change: '+12.3 this week',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Current Streak',
      value: '15 days',
      change: 'Personal best!',
      icon: Zap,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      label: 'Average Score',
      value: '94%',
      change: '+5% improvement',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  const continueWatching = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      subtitle: 'Calculus Fundamentals',
      progress: 68,
      thumbnail: '/api/placeholder/300/200',
      duration: '45 min remaining',
      type: 'course'
    },
    {
      id: 2,
      title: 'Physics Masterclass',
      subtitle: 'Quantum Mechanics Intro',
      progress: 23,
      thumbnail: '/api/placeholder/300/200',
      duration: '2h 15min remaining',
      type: 'course'
    },
    {
      id: 3,
      title: 'Live Chemistry Session',
      subtitle: 'Organic Compounds',
      progress: 0,
      thumbnail: '/api/placeholder/300/200',
      duration: 'Starts in 2 hours',
      type: 'webinar'
    }
  ];

  const upcomingWebinars = [
    {
      id: 1,
      title: 'A-Level Biology Revision',
      instructor: 'Dr. Sarah Johnson',
      time: 'Today, 3:00 PM',
      participants: 156,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'GCSE Maths Problem Solving',
      instructor: 'Prof. Michael Chen',
      time: 'Tomorrow, 10:00 AM',
      participants: 203,
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const achievements = [
    { name: 'First Course Complete', icon: '🎓', unlocked: true },
    { name: '7-Day Streak', icon: '🔥', unlocked: true },
    { name: 'Perfect Score', icon: '⭐', unlocked: true },
    { name: 'Early Bird', icon: '🌅', unlocked: false },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8 border border-border">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, Alex! 👋
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.name}
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
          </div>
        )}
      </div>
    </div>
  );
}
