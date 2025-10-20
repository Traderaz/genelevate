'use client';

import { Trophy, Star, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function RewardsWidget() {
  return (
    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Rewards & Rank</h3>
            <p className="text-sm text-muted-foreground">Your Progress</p>
          </div>
        </div>
        <Link
          href="/rewards"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="space-y-4">
        {/* Points & Rank */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Points</span>
            </div>
            <p className="text-xl font-bold text-foreground">1,250</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Weekly Rank</span>
            </div>
            <p className="text-xl font-bold text-foreground">#5</p>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-3">
            You're in the top 10% this week! 🎉
          </p>
          <Link
            href="/rewards"
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg netflix-button text-sm font-medium flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
