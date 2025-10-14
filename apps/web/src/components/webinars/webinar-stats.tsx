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
    // TODO: Fetch webinar stats from API
    setTimeout(() => {
      setStats({
        totalWebinars: 24,
        attendedWebinars: 18,
        totalHours: 36,
        averageAttendance: 87, // percentage
        upcomingWebinars: 6,
        certificatesEarned: 12,
        currentStreak: 4,
        thisWeekHours: 4.5,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
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
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Video className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Attended</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {stats.attendedWebinars}
          </div>
          <div className="text-xs text-gray-500">
            of {stats.totalWebinars} webinars
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Learning Hours */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Hours</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {stats.totalHours}h
          </div>
          <div className="text-xs text-gray-500">
            +{stats.thisWeekHours}h this week
          </div>
          <div className="flex items-center space-x-1 text-xs text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span>+12% vs last week</span>
          </div>
        </div>
      </div>

      {/* Attendance Rate */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Attendance</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {stats.averageAttendance}%
          </div>
          <div className="text-xs text-gray-500">
            average rate
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${stats.averageAttendance}%` }}
            />
          </div>
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Upcoming</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {stats.upcomingWebinars}
          </div>
          <div className="text-xs text-gray-500">
            registered webinars
          </div>
          <div className="flex items-center space-x-1 text-xs text-orange-600">
            <Calendar className="w-3 h-3" />
            <span>Next: Tomorrow 2PM</span>
          </div>
        </div>
      </div>

      {/* Learning Streak (Mobile: spans 2 columns) */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-4 col-span-2 md:col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🔥</div>
            <div>
              <h3 className="font-semibold text-gray-900">Learning Streak</h3>
              <p className="text-sm text-gray-600">Keep attending to maintain your streak!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-600">{stats.currentStreak}</div>
            <div className="text-sm text-gray-500">days</div>
          </div>
        </div>
      </div>

      {/* Certificates Earned (Mobile: spans 2 columns) */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4 col-span-2 md:col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Certificates Earned</h3>
              <p className="text-sm text-gray-600">Webinar completion certificates</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{stats.certificatesEarned}</div>
            <div className="text-sm text-gray-500">certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
}
