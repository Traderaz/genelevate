'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Video, Award, Download, Calendar } from 'lucide-react';

export function InstitutionAnalytics() {
  const [dateRange, setDateRange] = useState('30days');

  const metrics = {
    totalStudents: 247,
    activeStudents: 189,
    coursesCompleted: 456,
    webinarsAttended: 234,
    avgCompletionTime: 14,
    satisfactionScore: 4.6
  };

  const cohortPerformance = [
    { cohort: 'Year 13 - Business', students: 28, avgProgress: 85, completions: 78 },
    { cohort: 'Year 12 - Computing', students: 34, avgProgress: 72, completions: 65 },
    { cohort: 'Year 11 - Science', students: 42, avgProgress: 58, completions: 48 }
  ];

  const popularCourses = [
    { title: 'Introduction to Python', enrollments: 89, completions: 67 },
    { title: 'Business Fundamentals', enrollments: 76, completions: 61 },
    { title: 'Data Science Basics', enrollments: 54, completions: 38 }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Date Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-all">
            <Download className="w-4 h-4 text-white" />
            <span className="text-white">Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Students</p>
              <p className="text-2xl font-bold text-white">{metrics.activeStudents}/{metrics.totalStudents}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>+12% vs last month</span>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Courses Completed</p>
              <p className="text-2xl font-bold text-white">{metrics.coursesCompleted}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>+18% vs last month</span>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Video className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Webinars Attended</p>
              <p className="text-2xl font-bold text-white">{metrics.webinarsAttended}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>+8% vs last month</span>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Completion Time</p>
              <p className="text-2xl font-bold text-white">{metrics.avgCompletionTime} days</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>-2 days vs last month</span>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Award className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Satisfaction Score</p>
              <p className="text-2xl font-bold text-white">{metrics.satisfactionScore}/5.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>+0.3 vs last month</span>
          </div>
        </div>
      </div>

      {/* Cohort Performance */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Cohort Performance</h3>
        <div className="space-y-4">
          {cohortPerformance.map((cohort) => (
            <div key={cohort.cohort} className="p-4 bg-gray-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{cohort.cohort}</h4>
                  <p className="text-sm text-gray-400">{cohort.students} students</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{cohort.avgProgress}%</p>
                  <p className="text-sm text-gray-400">avg. progress</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-gray-400 min-w-[100px]">Completion Rate:</span>
                <div className="flex-1">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-orange-500 h-2 rounded-full"
                      style={{ width: `${cohort.completions}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-white min-w-[40px] text-right">
                  {cohort.completions}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Courses */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Most Popular Courses</h3>
        <div className="space-y-4">
          {popularCourses.map((course, index) => (
            <div key={course.title} className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-lg">
                <span className="text-lg font-bold text-white">#{index + 1}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{course.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{course.enrollments} enrollments</span>
                  <span>•</span>
                  <span>{course.completions} completions</span>
                  <span>•</span>
                  <span className="text-green-500">
                    {((course.completions / course.enrollments) * 100).toFixed(0)}% completion rate
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

