'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Video, Users, Calendar, Clock, Star, Zap } from 'lucide-react';

export function NetflixWebinarBanner() {
  // TODO: Fetch webinars from Firestore
  const liveWebinar = null;
  const upcomingWebinar = null;

  const [activeWebinar, setActiveWebinar] = useState<any>(null);

  // If no webinars, show empty state
  if (!liveWebinar && !upcomingWebinar) {
    return (
      <div className="relative overflow-hidden rounded-2xl teal-card-glass border border-white/20 shadow-xl p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-gold/10 via-transparent to-teal-primary/10"></div>
        <div className="relative text-center space-y-4">
          <Video className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">Live Interactive Webinars</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Join expert-led live sessions and workshops. Check back soon for upcoming webinars.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/70 pt-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              <span>HD Video Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Interactive Chat</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Live Q&A</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl teal-card-glass border border-white/20 shadow-xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-primary/10 via-transparent to-teal-gold/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-gold/20 rounded-full blur-3xl"></div>
      
      {/* Live Indicator */}
      {activeWebinar?.isLive && (
        <div className="absolute top-6 left-6 z-20">
          <div className="flex items-center gap-2 px-4 py-2 bg-teal-primary text-white rounded-full text-sm font-bold animate-pulse shadow-lg">
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
                    ? 'bg-teal-primary text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Live Now
              </button>
              <button
                onClick={() => setActiveWebinar(upcomingWebinar)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !activeWebinar.isLive
                    ? 'bg-teal-primary text-white'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80'
                }`}
              >
                Upcoming
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className={`px-3 py-1 rounded-full font-medium ${
                  activeWebinar.isLive 
                    ? 'bg-teal-primary/20 text-teal-light' 
                    : 'bg-teal-gold/20 text-teal-gold'
                }`}>
                  {activeWebinar.isLive ? 'Live Session' : 'Upcoming Session'}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-teal-gold fill-current" />
                  {activeWebinar.rating}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                {activeWebinar.title}
              </h1>
              <p className="text-lg text-teal-gold font-semibold">
                {activeWebinar.subtitle}
              </p>
            </div>

            <p className="text-white/80 text-lg leading-relaxed">
              {activeWebinar.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
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
                  className="inline-flex items-center gap-2 px-8 py-4 teal-button-primary text-lg"
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
            <div className="aspect-video bg-gradient-to-br from-teal-primary/20 to-teal-blue-medium/20 rounded-xl overflow-hidden shadow-xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors ${
                    activeWebinar.isLive 
                      ? 'bg-teal-primary/20 hover:bg-teal-primary/30' 
                      : 'bg-teal-gold/20 hover:bg-teal-gold/30'
                  }`}>
                    {activeWebinar.isLive ? (
                      <Zap className="w-10 h-10 text-teal-light" />
                    ) : (
                      <Play className="w-10 h-10 text-teal-gold" />
                    )}
                  </div>
                  <p className="text-white/70">
                    {activeWebinar.isLive ? 'Join Live Stream' : 'Session Preview'}
                  </p>
                </div>
              </div>
              
              {/* Participant Counter */}
              {activeWebinar.isLive && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  <span className="flex items-center gap-1 text-teal-card-text">
                    <div className="w-2 h-2 bg-teal-primary rounded-full animate-pulse"></div>
                    {activeWebinar.participants} live
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
