'use client';

import { BookOpen, Video, Calendar, Award, TrendingUp, Star } from 'lucide-react';

export function PointsSummary() {
  const pointsSources = [
    {
      label: 'Course Completion',
      points: 650,
      count: 12,
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Webinar Attendance',
      points: 400,
      count: 8,
      icon: Video,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Event Participation',
      points: 150,
      count: 3,
      icon: Calendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      label: 'Achievements',
      points: 50,
      count: 5,
      icon: Award,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    }
  ];

  const totalPoints = pointsSources.reduce((sum, source) => sum + source.points, 0);

  return (
    <div className="space-y-6">
      {/* Total Points Card */}
      <div className="teal-card border-2 border-teal-gold/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-teal-card-text-muted mb-2">Total Points</p>
            <p className="text-4xl font-bold text-teal-card-text">{totalPoints.toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-teal-gold" />
              <span className="text-sm text-teal-gold font-medium">+120 this week</span>
            </div>
          </div>
          <div className="w-20 h-20 bg-teal-gold/20 rounded-full flex items-center justify-center">
            <Star className="w-10 h-10 text-teal-gold" />
          </div>
        </div>
      </div>

      {/* Points Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pointsSources.map((source) => (
          <div
            key={source.label}
            className="teal-card border border-white/20 rounded-xl p-6 hover:border-teal-gold/50 transition-all"
          >
            <div className={`w-12 h-12 ${source.bgColor} rounded-lg flex items-center justify-center mb-4`}>
              <source.icon className={`w-6 h-6 ${source.color}`} />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-teal-card-text">{source.points}</p>
              <p className="text-sm text-teal-card-text-muted">{source.label}</p>
              <p className="text-xs text-teal-card-text-muted">{source.count} activities</p>
            </div>
          </div>
        ))}
      </div>

      {/* Points Earning Info */}
      <div className="teal-card border border-white/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-teal-card-text mb-4">How to Earn Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-teal-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-teal-gold" />
            </div>
            <div>
              <p className="font-medium text-teal-card-text">Complete Courses</p>
              <p className="text-sm text-teal-card-text-muted">50 points per course + bonus for perfect scores</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-teal-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Video className="w-4 h-4 text-teal-primary" />
            </div>
            <div>
              <p className="font-medium text-teal-card-text">Attend Webinars</p>
              <p className="text-sm text-teal-card-text-muted">50 points per webinar + engagement bonus</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-teal-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-teal-gold" />
            </div>
            <div>
              <p className="font-medium text-teal-card-text">Join Events</p>
              <p className="text-sm text-teal-card-text-muted">50 points per event participation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-teal-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-teal-primary" />
            </div>
            <div>
              <p className="font-medium text-teal-card-text">Unlock Achievements</p>
              <p className="text-sm text-teal-card-text-muted">10-100 points per achievement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
