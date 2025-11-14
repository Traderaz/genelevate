'use client';

import { BookOpen, Trophy, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useDashboardData } from '@/hooks/useDashboardData';

export function CourseBanner() {
  const { userProfile } = useAuth();
  const { continueWatching } = useDashboardData();
  
  const totalPoints = (userProfile as any)?.totalPoints || 0;
  const coursesInProgress = continueWatching?.length || 0;
  const streakDays = (userProfile as any)?.streakDays || 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative px-8 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, {userProfile?.displayName?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Continue your learning journey and unlock your potential
          </p>

          {/* Stats Grid - Only show stats with real data */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {totalPoints > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="text-2xl font-bold text-white">{totalPoints.toLocaleString()}</div>
                <div className="text-sm text-blue-100">Total Points</div>
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-green-300" />
              </div>
              <div className="text-2xl font-bold text-white">{coursesInProgress}</div>
              <div className="text-sm text-blue-100">Active Courses</div>
            </div>

            {streakDays > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3">
                  <Zap className="w-6 h-6 text-orange-300" />
                </div>
                <div className="text-2xl font-bold text-white">{streakDays}</div>
                <div className="text-sm text-blue-100">Day Streak</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white/5 rounded-full" />
    </div>
  );
}
