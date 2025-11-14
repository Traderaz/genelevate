'use client';

import { Award, Lock } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';

export function AchievementsBadges() {
  const { achievements, stats, isLoading } = useAchievements();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-card animate-pulse rounded-xl" />
        <div className="h-32 bg-card animate-pulse rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-48 bg-card animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
        </div>
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No achievements available yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Unlocked</p>
          <p className="text-lg font-bold text-foreground">
            {stats.earnedCount}/{stats.totalCount}
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Achievements</p>
            <p className="text-2xl font-bold text-foreground">{stats.earnedCount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Points Earned</p>
            <p className="text-2xl font-bold text-foreground">{stats.totalPoints}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Completion</p>
            <p className="text-2xl font-bold text-foreground">
              {stats.completionRate}%
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-card border rounded-xl p-4 text-center transition-all hover:border-primary group ${
              achievement.earned
                ? 'border-primary/30'
                : 'border-border opacity-70 hover:opacity-100'
            }`}
          >
            <div className="relative inline-block mb-3">
              <div className={`text-4xl transition-all ${achievement.earned ? '' : 'grayscale group-hover:grayscale-0'}`}>
                {achievement.icon}
              </div>
              {!achievement.earned && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <h3 className="font-semibold text-foreground text-sm mb-1">
              {achievement.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {achievement.description}
            </p>
            
            {achievement.earned ? (
              <div className="flex items-center justify-center gap-1 text-xs text-primary">
                <Award className="w-3 h-3" />
                <span className="font-medium">+{achievement.points} pts</span>
              </div>
            ) : achievement.current !== undefined && achievement.required !== undefined ? (
              <div className="space-y-1">
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${(achievement.current / achievement.required) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {achievement.current}/{achievement.required}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>Locked</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
