'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Users, Clock, Award, Loader2 } from 'lucide-react';
import { getCourseStats } from '@/lib/services/courses';
import { useAuth } from '@/contexts/auth-context';

export function CourseStats() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    totalEnrollments: 0,
    totalChapters: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (authLoading) return;
      if (!user) {
        setLoading(false);
        return;
      }

      const fetchedStats = await getCourseStats();
      setStats(fetchedStats);
      setLoading(false);
    }

    fetchStats();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-[#e50914] animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Courses */}
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-[#e50914]/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-[#e50914]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Courses</p>
            <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">{stats.publishedCourses} published</p>
      </div>

      {/* Total Chapters */}
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Award className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Chapters</p>
            <p className="text-2xl font-bold text-white">{stats.totalChapters}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">Across all courses</p>
      </div>

      {/* Total Enrollments */}
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Users className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Students</p>
            <p className="text-2xl font-bold text-white">{stats.totalEnrollments}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">Course enrollments</p>
      </div>

      {/* Estimated Hours */}
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Content Hours</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalChapters ? `${stats.totalChapters * 10}+` : '0'}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500">Of learning material</p>
      </div>
    </div>
  );
}
