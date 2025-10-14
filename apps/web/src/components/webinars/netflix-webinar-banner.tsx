'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Video, Users, Calendar, Clock, Star, Zap } from 'lucide-react';

export function NetflixWebinarBanner() {
  const liveWebinar = {
    id: 1,
    title: 'A-Level Physics: Quantum Mechanics Deep Dive',
    subtitle: 'Live Interactive Session',
    description: 'Join Dr. Michael Chen for an intensive exploration of quantum mechanics principles. Interactive Q&A, real-time problem solving, and exam preparation.',
    instructor: 'Dr. Michael Chen',
    startTime: '3:00 PM Today',
    duration: '90 minutes',
    participants: 234,
    rating: 4.8,
    isLive: true,
    thumbnail: '/api/placeholder/600/400'
  };

  const upcomingWebinar = {
    id: 2,
    title: 'GCSE Mathematics: Algebra Mastery Workshop',
    subtitle: 'Tomorrow at 10:00 AM',
    description: 'Master algebraic equations, inequalities, and graphing techniques in this comprehensive workshop designed for GCSE students.',
    instructor: 'Prof. Sarah Williams',
    startTime: 'Tomorrow, 10:00 AM',
    duration: '75 minutes',
    participants: 189,
    rating: 4.9,
    isLive: false,
    thumbnail: '/api/placeholder/600/400'
  };

  const [activeWebinar, setActiveWebinar] = useState(liveWebinar);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card via-card/95 to-card/80 border border-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
      
      {/* Live Indicator */}
      {activeWebinar.isLive && (
        <div className="absolute top-6 left-6 z-20">
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            LIVE NOW
          </div>
        </div>
      )}
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            {/* Webinar Selector */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveWebinar(liveWebinar)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeWebinar.isLive
                    ? 'bg-red-500 text-white'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80'
                }`}
              >
                Live Now
              </button>
              <button
                onClick={() => setActiveWebinar(upcomingWebinar)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !activeWebinar.isLive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80'
                }`}
              >
                Upcoming
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className={`px-3 py-1 rounded-full font-medium ${
                  activeWebinar.isLive 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {activeWebinar.isLive ? 'Live Session' : 'Upcoming Session'}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  {activeWebinar.rating}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {activeWebinar.title}
              </h1>
              <p className="text-lg text-primary font-semibold">
                {activeWebinar.subtitle}
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {activeWebinar.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {activeWebinar.startTime}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {activeWebinar.duration}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {activeWebinar.participants} joined
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {activeWebinar.isLive ? (
                <Link
                  href={`/webinars/${activeWebinar.id}/join`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold netflix-button text-lg"
                >
                  <Zap className="w-5 h-5" />
                  Join Live Session
                </Link>
              ) : (
                <Link
                  href={`/webinars/${activeWebinar.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold netflix-button text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Register Now
                </Link>
              )}
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold netflix-button text-lg">
                <Video className="w-5 h-5" />
                Preview
              </button>
            </div>

            {/* Instructor Info */}
            <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  {activeWebinar.instructor.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{activeWebinar.instructor}</p>
                <p className="text-sm text-muted-foreground">Expert Instructor</p>
              </div>
            </div>
          </div>

          {/* Webinar Preview */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-red-500/20 to-background rounded-xl overflow-hidden shadow-netflix">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors ${
                    activeWebinar.isLive 
                      ? 'bg-red-500/20 hover:bg-red-500/30' 
                      : 'bg-primary/20 hover:bg-primary/30'
                  }`}>
                    {activeWebinar.isLive ? (
                      <Zap className="w-10 h-10 text-red-400" />
                    ) : (
                      <Play className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <p className="text-muted-foreground">
                    {activeWebinar.isLive ? 'Join Live Stream' : 'Session Preview'}
                  </p>
                </div>
              </div>
              
              {/* Participant Counter */}
              {activeWebinar.isLive && (
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  <span className="flex items-center gap-1 text-foreground">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    {activeWebinar.participants} live
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Live Sessions Today', value: '3', icon: Video },
              { label: 'Total Participants', value: '1.2K', icon: Users },
              { label: 'Average Rating', value: '4.9', icon: Star },
              { label: 'Sessions This Week', value: '24', icon: Calendar }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-2">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
