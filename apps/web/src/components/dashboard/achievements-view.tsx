'use client';

import { useState } from 'react';
import { Award, Trophy, Star, CheckCircle, Lock, TrendingUp } from 'lucide-react';

export function AchievementsView() {
  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: '🎯',
      points: 10,
      earned: true,
      earnedDate: '2024-01-15',
      progress: 100,
      category: 'Getting Started'
    },
    {
      id: '2',
      title: 'Knowledge Seeker',
      description: 'Complete 10 courses',
      icon: '📚',
      points: 50,
      earned: true,
      earnedDate: '2024-01-18',
      progress: 100,
      category: 'Courses'
    },
    {
      id: '3',
      title: 'Webinar Warrior',
      description: 'Attend 5 webinars',
      icon: '🎥',
      points: 25,
      earned: false,
      progress: 60,
      current: 3,
      required: 5,
      category: 'Webinars'
    },
    {
      id: '4',
      title: 'Perfect Score',
      description: 'Get 100% on a quiz',
      icon: '💯',
      points: 20,
      earned: true,
      earnedDate: '2024-01-16',
      progress: 100,
      category: 'Courses'
    },
    {
      id: '5',
      title: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      points: 30,
      earned: true,
      earnedDate: '2024-01-19',
      progress: 100,
      category: 'Engagement'
    },
    {
      id: '6',
      title: 'Course Marathon',
      description: 'Complete 25 courses',
      icon: '🏃',
      points: 100,
      earned: false,
      progress: 40,
      current: 10,
      required: 25,
      category: 'Courses'
    },
    {
      id: '7',
      title: 'Social Butterfly',
      description: 'Attend 20 webinars',
      icon: '🦋',
      points: 75,
      earned: false,
      progress: 15,
      current: 3,
      required: 20,
      category: 'Webinars'
    },
    {
      id: '8',
      title: 'Quiz Champion',
      description: 'Get 100% on 10 quizzes',
      icon: '🏆',
      points: 50,
      earned: false,
      progress: 30,
      current: 3,
      required: 10,
      category: 'Courses'
    },
    {
      id: '9',
      title: 'Dedication',
      description: 'Maintain a 30-day learning streak',
      icon: '💪',
      points: 100,
      earned: false,
      progress: 40,
      current: 12,
      required: 30,
      category: 'Engagement'
    },
    {
      id: '10',
      title: 'Legend',
      description: 'Earn 10,000 points',
      icon: '👑',
      points: 200,
      earned: false,
      progress: 18,
      current: 1850,
      required: 10000,
      category: 'Points'
    }
  ];

  const categories = ['All', 'Getting Started', 'Courses', 'Webinars', 'Engagement', 'Points'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Achievements</h1>
          <p className="text-gray-400">Track your progress and unlock badges</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-sm text-gray-400">Achievements Earned</span>
            </div>
            <p className="text-3xl font-bold text-white">
              {earnedCount}/{achievements.length}
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6 text-orange-500" />
              <span className="text-sm text-gray-400">Total Points Earned</span>
            </div>
            <p className="text-3xl font-bold text-white">{totalPoints}</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span className="text-sm text-gray-400">Completion Rate</span>
            </div>
            <p className="text-3xl font-bold text-white">
              {Math.round((earnedCount / achievements.length) * 100)}%
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative rounded-lg p-6 border transition-all ${
                achievement.earned
                  ? 'bg-gradient-to-br from-primary/20 to-orange-500/20 border-primary/50'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              {/* Badge Icon */}
              <div className={`text-6xl mb-4 ${!achievement.earned && 'opacity-30 grayscale'}`}>
                {achievement.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>

              {/* Points */}
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-white">+{achievement.points} points</span>
              </div>

              {/* Progress/Status */}
              {achievement.earned ? (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Earned on {achievement.earnedDate}
                  </span>
                </div>
              ) : (
                <>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                  {achievement.current !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Lock className="w-4 h-4" />
                      <span>
                        {achievement.current}/{achievement.required}
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-gray-900/50 border border-gray-700 rounded text-xs text-gray-400">
                  {achievement.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

