'use client';

import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  submissionId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  position: 'for' | 'against' | 'neutral';
  overallScore: number;
  rank: number;
  pointsEarned: number;
  excerpt: string;
}

interface DebateLeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  showTop?: number; // Show top N, default 10
  title?: string;
}

export function DebateLeaderboard({
  entries,
  currentUserId,
  showTop = 10,
  title = '🏆 Leaderboard'
}: DebateLeaderboardProps) {
  const topEntries = entries.slice(0, showTop);
  const userEntry = currentUserId ? entries.find(e => e.userId === currentUserId) : null;
  const showUserEntry = userEntry && userEntry.rank > showTop;

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return { icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    if (rank === 2) return { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-400/10' };
    if (rank === 3) return { icon: Medal, color: 'text-amber-600', bg: 'bg-amber-600/10' };
    return { icon: Award, color: 'text-zinc-500', bg: 'bg-zinc-800/50' };
  };

  const getPositionBadge = (position: string) => {
    switch (position) {
      case 'for':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'against':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'neutral':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-zinc-800/50 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 border-b border-primary/30 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          {title}
        </h2>
        <p className="text-zinc-400 text-sm mt-1">Top performers in this debate</p>
      </div>

      {/* Leaderboard Entries */}
      <div className="divide-y divide-zinc-800/50">
        {topEntries.map((entry, index) => {
          const rankDisplay = getRankDisplay(entry.rank);
          const RankIcon = rankDisplay.icon;
          const isCurrentUser = entry.userId === currentUserId;

          return (
            <div
              key={entry.submissionId}
              className={`p-4 hover:bg-zinc-800/30 transition-colors ${
                isCurrentUser ? 'bg-primary/5 border-l-4 border-primary' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Rank */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${rankDisplay.bg} flex items-center justify-center`}>
                  {entry.rank <= 3 ? (
                    <RankIcon className={`w-6 h-6 ${rankDisplay.color}`} />
                  ) : (
                    <span className="text-lg font-bold text-zinc-400">#{entry.rank}</span>
                  )}
                </div>

                {/* User Info & Stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${isCurrentUser ? 'text-primary' : 'text-white'}`}>
                          {entry.userName}
                          {isCurrentUser && <span className="text-xs text-primary ml-1">(You)</span>}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs rounded-md border capitalize ${getPositionBadge(entry.position)}`}>
                          {entry.position}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm line-clamp-2">{entry.excerpt}</p>
                    </div>

                    {/* Score */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-primary">{entry.overallScore}</div>
                      <div className="text-xs text-zinc-500">/ 100</div>
                    </div>
                  </div>

                  {/* Points Earned */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Award className="w-3 h-3" />
                      <span className="font-semibold">+{entry.pointsEarned} pts</span>
                    </div>
                    {entry.rank <= 3 && (
                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-md font-semibold">
                        {entry.rank === 1 && '🏆 Champion'}
                        {entry.rank === 2 && '🥈 Runner-up'}
                        {entry.rank === 3 && '🥉 3rd Place'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current User Entry (if outside top N) */}
      {showUserEntry && userEntry && (
        <>
          <div className="border-t-2 border-zinc-700/50 p-4 bg-zinc-900/50">
            <div className="text-center text-zinc-500 text-sm mb-3">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Your Position
            </div>
            <div className="p-4 bg-primary/10 border-2 border-primary/30 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">#{userEntry.rank}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{userEntry.userName}</div>
                    <div className="text-sm text-zinc-400 capitalize">{userEntry.position} position</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{userEntry.overallScore}</div>
                  <div className="text-xs text-zinc-500">/ 100</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="bg-zinc-900/50 border-t border-zinc-800/50 p-4 text-center">
        <p className="text-zinc-500 text-sm">
          {entries.length} total submission{entries.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

