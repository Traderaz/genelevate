'use client';

import { Award, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  total?: number;
}

export function AchievementsBadges() {
  // Mock achievements - In production, fetch from Firestore
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: '🎯',
      points: 10,
      unlocked: true,
      unlockedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Knowledge Seeker',
      description: 'Complete 10 courses',
      icon: '📚',
      points: 50,
      unlocked: true,
      unlockedAt: new Date('2024-02-20')
    },
    {
      id: '3',
      title: 'Webinar Warrior',
      description: 'Attend 5 live webinars',
      icon: '🎥',
      points: 25,
      unlocked: true,
      unlockedAt: new Date('2024-03-10')
    },
    {
      id: '4',
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      icon: '💯',
      points: 20,
      unlocked: true,
      unlockedAt: new Date('2024-01-25')
    },
    {
      id: '5',
      title: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      points: 30,
      unlocked: true,
      unlockedAt: new Date('2024-03-15')
    },
    {
      id: '6',
      title: 'Course Marathon',
      description: 'Complete 25 courses',
      icon: '🏃',
      points: 100,
      unlocked: false,
      progress: 12,
      total: 25
    },
    {
      id: '7',
      title: 'Social Butterfly',
      description: 'Attend 20 webinars',
      icon: '🦋',
      points: 75,
      unlocked: false,
      progress: 8,
      total: 20
    },
    {
      id: '8',
      title: 'Quiz Champion',
      description: 'Score 100% on 10 quizzes',
      icon: '👑',
      points: 50,
      unlocked: false,
      progress: 3,
      total: 10
    },
    {
      id: '9',
      title: 'Dedication',
      description: 'Maintain a 30-day streak',
      icon: '⭐',
      points: 100,
      unlocked: false,
      progress: 7,
      total: 30
    },
    {
      id: '10',
      title: 'Legend',
      description: 'Earn 10,000 total points',
      icon: '🏆',
      points: 200,
      unlocked: false,
      progress: 1250,
      total: 10000
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Unlocked</p>
          <p className="text-lg font-bold text-foreground">
            {unlockedCount}/{achievements.length}
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Achievements</p>
            <p className="text-2xl font-bold text-foreground">{unlockedCount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Points Earned</p>
            <p className="text-2xl font-bold text-foreground">{totalPoints}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Completion</p>
            <p className="text-2xl font-bold text-foreground">
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-card border rounded-xl p-4 text-center netflix-card ${
              achievement.unlocked
                ? 'border-yellow-500/30'
                : 'border-border opacity-60'
            }`}
          >
            <div className="relative inline-block mb-3">
              <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                {achievement.icon}
              </div>
              {!achievement.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <h3 className="font-semibold text-foreground text-sm mb-1">
              {achievement.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              {achievement.description}
            </p>
            
            {achievement.unlocked ? (
              <div className="flex items-center justify-center gap-1 text-xs text-yellow-500">
                <Award className="w-3 h-3" />
                <span className="font-medium">+{achievement.points} pts</span>
              </div>
            ) : achievement.progress !== undefined && achievement.total !== undefined ? (
              <div className="space-y-1">
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {achievement.progress}/{achievement.total}
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
