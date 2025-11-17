'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Award, TrendingUp, Video } from 'lucide-react';

interface WebinarStatsData {
  totalWebinars: number;
  attendedWebinars: number;
  totalHours: number;
  averageAttendance: number;
  upcomingWebinars: number;
  certificatesEarned: number;
  currentStreak: number;
  thisWeekHours: number;
}

export function WebinarStats() {
  const [stats, setStats] = useState<WebinarStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch webinar stats from Firestore
    // For now, show zero stats
    setStats({
      totalWebinars: 0,
      attendedWebinars: 0,
      totalHours: 0,
      averageAttendance: 0,
      upcomingWebinars: 0,
      certificatesEarned: 0,
      currentStreak: 0,
      thisWeekHours: 0,
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="teal-card p-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-3" />
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-300 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const attendanceRate = (stats.attendedWebinars / stats.totalWebinars) * 100;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Webinars Attended */}
      <div className="teal-card p-4 hover:shadow-xl hover:border-teal-gold/50 transition-all duration-200 border-2 border-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Video className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-teal-card-text-muted">Attended</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-teal-card-text">
            {stats.attendedWebinars}
          </div>
          <div className="text-xs text-teal-card-text-muted">
            of {stats.totalWebinars} webinars
          </div>
          <div className="w-full bg-gray-300 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Learning Hours */}
      <div className="teal-card p-4 hover:shadow-xl hover:border-teal-gold/50 transition-all duration-200 border-2 border-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-sm font-medium text-teal-card-text-muted">Hours</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-teal-card-text">
            {stats.totalHours}h
          </div>
          <div className="text-xs text-teal-card-text-muted">
            +{stats.thisWeekHours}h this week
          </div>
          <div className="flex items-center space-x-1 text-xs text-green-500">
            <TrendingUp className="w-3 h-3" />
            <span>+12% vs last week</span>
          </div>
        </div>
      </div>

      {/* Attendance Rate */}
      <div className="teal-card p-4 hover:shadow-xl hover:border-teal-gold/50 transition-all duration-200 border-2 border-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-sm font-medium text-teal-card-text-muted">Attendance</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-teal-card-text">
            {stats.averageAttendance}%
          </div>
          <div className="text-xs text-teal-card-text-muted">
            average rate
          </div>
          <div className="w-full bg-gray-300 rounded-full h-1.5">
            <div 
              className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${stats.averageAttendance}%` }}
            />
          </div>
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div className="teal-card p-4 hover:shadow-xl hover:border-teal-gold/50 transition-all duration-200 border-2 border-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Calendar className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-sm font-medium text-teal-card-text-muted">Upcoming</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-teal-card-text">
            {stats.upcomingWebinars}
          </div>
          <div className="text-xs text-teal-card-text-muted">
            registered webinars
          </div>
          <div className="flex items-center space-x-1 text-xs text-orange-500">
            <Calendar className="w-3 h-3" />
            <span>Next: Tomorrow 2PM</span>
          </div>
        </div>
      </div>

      {/* Learning Streak (Mobile: spans 2 columns) */}
      <div className="teal-card-glass border-teal-gold/50 p-4 col-span-2 md:col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🔥</div>
            <div>
              <h3 className="font-semibold text-white">Learning Streak</h3>
              <p className="text-sm text-white/80">Keep attending to maintain your streak!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-teal-gold">{stats.currentStreak}</div>
            <div className="text-sm text-white/70">days</div>
          </div>
        </div>
      </div>

      {/* Certificates Earned (Mobile: spans 2 columns) */}
      <div className="teal-card-glass border-teal-primary/50 p-4 col-span-2 md:col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-gold/20 rounded-lg">
              <Award className="w-6 h-6 text-teal-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Certificates Earned</h3>
              <p className="text-sm text-white/80">Webinar completion certificates</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-teal-gold">{stats.certificatesEarned}</div>
            <div className="text-sm text-white/70">certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
}
