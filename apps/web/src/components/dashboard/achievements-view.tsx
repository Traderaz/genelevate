'use client';

import { useState } from 'react';
import { Award, Trophy, Star, CheckCircle, Lock, TrendingUp } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';

export function AchievementsView() {
  const { achievements, stats, isLoading, error } = useAchievements();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from achievements
  const categories = ['All', ...Array.from(new Set(achievements.map(a => a.category)))];

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="teal-card-glass border border-white/20 mb-8 -mx-4 px-4 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 sm:p-3 bg-teal-gold/20 rounded-xl">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-teal-gold" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Achievements</h1>
              <p className="text-sm sm:text-base text-white/80 mt-1">Track your progress and unlock badges</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 teal-card animate-pulse rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 teal-card animate-pulse rounded-xl" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16 teal-card rounded-2xl">
            <Trophy className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-teal-card-text mb-2">Failed to load achievements</h3>
            <p className="text-teal-card-text-muted">{error}</p>
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-16 teal-card rounded-2xl">
            <Trophy className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-teal-card-text mb-2">No achievements yet</h3>
            <p className="text-teal-card-text-muted">Start learning to unlock your first achievement!</p>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-6 h-6 text-teal-primary" />
                  <span className="text-sm text-teal-card-text-muted">Achievements Earned</span>
                </div>
                <p className="text-3xl font-bold text-teal-card-text">
                  {stats.earnedCount}/{stats.totalCount}
                </p>
              </div>

              <div className="teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <span className="text-sm text-teal-card-text-muted">Total Points Earned</span>
                </div>
                <p className="text-3xl font-bold text-teal-card-text">{stats.totalPoints}</p>
              </div>

              <div className="teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <span className="text-sm text-teal-card-text-muted">Completion Rate</span>
                </div>
                <p className="text-3xl font-bold text-teal-card-text">
                  {stats.completionRate}%
                </p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-teal-blue-medium to-teal-primary text-white shadow-lg'
                      : 'teal-card text-teal-card-text-muted hover:bg-gray-100 hover:text-teal-card-text border border-gray-300'
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
                  className={`relative teal-card border-2 rounded-xl p-6 transition-all group ${
                    achievement.earned
                      ? 'border-teal-gold hover:border-teal-primary hover:shadow-xl'
                      : 'border-transparent hover:border-teal-gold/50 hover:shadow-lg'
                  }`}
                >
                  {/* Badge Icon */}
                  <div className={`text-6xl mb-4 transition-all ${!achievement.earned && 'opacity-40 grayscale'}`}>
                    {achievement.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-teal-card-text mb-1 group-hover:text-teal-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-teal-card-text-muted mb-3">{achievement.description}</p>

                  {/* Points */}
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-teal-card-text">+{achievement.points} points</span>
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
                          <span className="text-teal-card-text-muted">Progress</span>
                          <span className="text-teal-card-text font-semibold">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-teal-primary to-teal-gold h-2 rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                      {achievement.current !== undefined && achievement.required && (
                        <div className="flex items-center gap-2 text-sm text-teal-card-text-muted">
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
                    <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs text-teal-card-text-muted font-medium">
                      {achievement.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

