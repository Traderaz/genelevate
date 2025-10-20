'use client';

import { Heart, TrendingUp, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function WellbeingWidget() {
  return (
    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Wellbeing</h3>
            <p className="text-sm text-muted-foreground">Life Skills & Mental Health</p>
          </div>
        </div>
        <Link
          href="/wellbeing"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Streak</span>
            </div>
            <p className="text-xl font-bold text-foreground">7 days</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <p className="text-xl font-bold text-foreground">3/12</p>
          </div>
        </div>

        {/* Daily Check-in Prompt */}
        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-3">
            How are you feeling today?
          </p>
          <Link
            href="/wellbeing"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg netflix-button text-sm font-medium flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Daily Check-In
          </Link>
        </div>
      </div>
    </div>
  );
}
