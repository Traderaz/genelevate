'use client';

import { Trophy, Star, Gift, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function RewardsBanner() {
  const { userProfile } = useAuth();
  const totalPoints = (userProfile as any)?.totalPoints || 0;
  return (
    <div className="relative overflow-hidden rounded-2xl teal-card-glass border-2 border-white/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-gold/10 via-transparent to-teal-primary/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-gold/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-teal-gold/20 text-teal-gold rounded-full font-medium flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Rewards & Achievements
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Earn Points, Climb Leaderboards
              </h1>
              <p className="text-lg text-teal-gold font-semibold">
                Your hard work deserves recognition
              </p>
            </div>

            <p className="text-white/80 text-lg leading-relaxed">
              Earn points from courses, webinars, and events. Compete with peers on weekly and 
              monthly leaderboards. Redeem points for gift cards, course add-ons, and exclusive rewards.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-teal-gold" />
                Unified Points System
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-gold" />
                Weekly Leaderboards
              </span>
              <span className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-teal-gold" />
                Exclusive Rewards
              </span>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg p-6 border border-white/20">
              <div className="flex flex-col items-center justify-center h-full">
                <Trophy className="w-20 h-20 text-teal-gold mb-4" />
                <p className="text-3xl font-bold text-white mb-2">{totalPoints.toLocaleString()}</p>
                <p className="text-sm text-white/70">Total Points Earned</p>
                {totalPoints === 0 && (
                  <p className="mt-4 text-xs text-white/60 text-center max-w-xs">
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
