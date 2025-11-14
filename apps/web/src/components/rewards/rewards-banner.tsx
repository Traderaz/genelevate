'use client';

import { Trophy, Star, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function RewardsBanner() {
  const { userProfile } = useAuth();
  const totalPoints = (userProfile as any)?.totalPoints || 0;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card via-card/95 to-card/80 border border-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full font-medium flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Rewards & Achievements
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Earn Points, Climb Leaderboards
              </h1>
              <p className="text-lg text-primary font-semibold">
                Your hard work deserves recognition
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Earn points from courses, webinars, and events. Compete with peers on weekly and 
              monthly leaderboards. Redeem points for gift cards, course add-ons, and exclusive rewards.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Unified Points System
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Weekly Leaderboards
              </span>
              <span className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-purple-500" />
                Exclusive Rewards
              </span>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-background rounded-xl overflow-hidden shadow-netflix p-6">
              <div className="flex flex-col items-center justify-center h-full">
                <Trophy className="w-20 h-20 text-yellow-500 mb-4" />
                <p className="text-3xl font-bold text-foreground mb-2">{totalPoints.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Points Earned</p>
                {totalPoints === 0 && (
                  <p className="mt-4 text-xs text-muted-foreground text-center max-w-xs">
                    Start completing courses and activities to earn points and climb the leaderboard!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
