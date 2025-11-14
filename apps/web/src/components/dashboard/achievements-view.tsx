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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-card via-card/95 to-card/80 border-b border-border mb-8 -mx-4 px-4 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 sm:p-3 bg-primary/20 rounded-xl">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Achievements</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">Track your progress and unlock badges</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-card animate-pulse rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-card animate-pulse rounded-xl" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Failed to load achievements</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No achievements yet</h3>
            <p className="text-muted-foreground">Start learning to unlock your first achievement!</p>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  <span className="text-sm text-muted-foreground">Achievements Earned</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {stats.earnedCount}/{stats.totalCount}
                </p>
              </div>

              <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Total Points Earned</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.totalPoints}</p>
              </div>

              <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
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
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border'
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
                  className={`relative bg-card border rounded-xl p-6 transition-all group ${
                    achievement.earned
                      ? 'border-primary/50 hover:border-primary bg-gradient-to-br from-primary/5 via-card to-card'
                      : 'border-border hover:border-accent'
                  }`}
                >
                  {/* Badge Icon */}
                  <div className={`text-6xl mb-4 transition-all ${!achievement.earned && 'opacity-40 grayscale'}`}>
                    {achievement.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

                  {/* Points */}
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-foreground">+{achievement.points} points</span>
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
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-semibold">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                      {achievement.current !== undefined && achievement.required && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    <span className="px-2 py-1 bg-secondary border border-border rounded text-xs text-muted-foreground">
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

