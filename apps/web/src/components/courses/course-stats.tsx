'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';

interface CourseStatsData {
  totalCourses: number;
  completedCourses: number;
  hoursLearned: number;
  weeklyGoal: number;
  weeklyProgress: number;
  upcomingDeadlines: number;
}

export function CourseStats() {
  const [stats, setStats] = useState<CourseStatsData | null>(null);

  useEffect(() => {
    // TODO: Fetch real stats from API
    setStats({
      totalCourses: 24,
      completedCourses: 8,
      hoursLearned: 47.5,
      weeklyGoal: 10,
      weeklyProgress: 6.5,
      upcomingDeadlines: 3,
    });
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const completionRate = (stats.completedCourses / stats.totalCourses) * 100;
  const weeklyProgressRate = (stats.weeklyProgress / stats.weeklyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Course Completion */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Course Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.completedCourses}/{stats.totalCourses}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{completionRate.toFixed(1)}% completed</p>
      </div>

      {/* Learning Hours */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Hours Learned</p>
            <p className="text-2xl font-bold text-gray-900">{stats.hoursLearned}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">This month</p>
      </div>

      {/* Weekly Goal */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Goal</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.weeklyProgress}h
              </p>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(weeklyProgressRate, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {stats.weeklyProgress} of {stats.weeklyGoal} hours
        </p>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Deadlines</p>
            <p className="text-2xl font-bold text-gray-900">{stats.upcomingDeadlines}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">This week</p>
      </div>
    </div>
  );
}
