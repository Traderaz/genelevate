'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, TrendingUp, MessageSquare, Award } from 'lucide-react';
import { Debate } from '@/types/debates';

interface DebateCardProps {
  debate: Debate;
  userSubmitted?: boolean;
  userScore?: number;
}

export function DebateCard({ debate, userSubmitted = false, userScore }: DebateCardProps) {
  const daysRemaining = Math.ceil(
    (new Date(debate.submissionDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      ethics: '⚖️',
      technology: '💻',
      society: '🌍',
      environment: '🌱',
      politics: '🏛️',
      science: '🔬',
      culture: '🎭',
    };
    return emojis[category] || '💬';
  };

  return (
    <Link href={`/debates/${debate.id}`}>
      <div className="group relative bg-gradient-to-br from-zinc-900/90 to-black/90 border border-zinc-800/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20">
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {userSubmitted && (
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
              ✓ Submitted
            </span>
          )}
          {debate.status === 'active' && (
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full border border-primary/30 animate-pulse">
              • LIVE
            </span>
          )}
        </div>

        {/* Category & Difficulty */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{getCategoryEmoji(debate.category)}</span>
          <span className="px-2 py-1 bg-zinc-800/50 text-zinc-400 text-xs rounded-md capitalize">
            {debate.category}
          </span>
          <span className={`px-2 py-1 text-xs rounded-md capitalize border ${getDifficultyColor(debate.difficulty)}`}>
            {debate.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {debate.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
          {debate.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{debate.participantCount} participants</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{debate.submissionCount} submissions</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-500">{debate.pointsReward} pts</span>
          </div>
        </div>

        {/* User Score (if submitted) */}
        {userSubmitted && userScore !== undefined && (
          <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Your Score</span>
              <span className="text-2xl font-bold text-primary">{userScore}/100</span>
            </div>
          </div>
        )}

        {/* Time Remaining */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {daysRemaining > 0 ? (
                <>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left</>
              ) : (
                'Ends today'
              )}
            </span>
          </div>
          
          {!userSubmitted && debate.status === 'active' && (
            <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-white text-sm font-semibold rounded-lg transition-colors">
              Join Debate →
            </button>
          )}

          {userSubmitted && (
            <span className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              View Results
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

