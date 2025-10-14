'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Trophy, Clock, Users } from 'lucide-react';

export function CourseBanner() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  // TODO: Get user data from auth context
  useEffect(() => {
    // Mock user data for now
    setCurrentUser({
      name: 'Alex',
      currentStreak: 7,
      totalPoints: 2450,
      coursesInProgress: 3,
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative px-8 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, {currentUser?.name || 'Student'}! 👋
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Continue your learning journey and unlock your potential
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3">
                <Trophy className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="text-2xl font-bold text-white">{currentUser?.totalPoints || 0}</div>
              <div className="text-sm text-blue-100">Total Points</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-green-300" />
              </div>
              <div className="text-2xl font-bold text-white">{currentUser?.coursesInProgress || 0}</div>
              <div className="text-sm text-blue-100">Active Courses</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-300" />
              </div>
              <div className="text-2xl font-bold text-white">{currentUser?.currentStreak || 0}</div>
              <div className="text-sm text-blue-100">Day Streak</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <div className="text-2xl font-bold text-white">Top 10%</div>
              <div className="text-sm text-blue-100">Class Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white/5 rounded-full" />
    </div>
  );
}
