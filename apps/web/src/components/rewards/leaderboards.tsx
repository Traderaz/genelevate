'use client';

import { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  points: number;
  change: number; // Position change from last period
  avatar?: string;
  isCurrentUser?: boolean;
}

export function Leaderboards() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  // Mock data - In production, fetch from Firestore
  const weeklyLeaderboard: LeaderboardEntry[] = [
    { rank: 1, userId: '1', displayName: 'Sarah Johnson', points: 450, change: 2 },
    { rank: 2, userId: '2', displayName: 'Michael Chen', points: 420, change: -1 },
    { rank: 3, userId: '3', displayName: 'Emma Williams', points: 390, change: 1 },
    { rank: 4, userId: '4', displayName: 'James Brown', points: 350, change: 0 },
    { rank: 5, userId: 'current', displayName: 'You', points: 320, change: 3, isCurrentUser: true },
    { rank: 6, userId: '6', displayName: 'Olivia Davis', points: 310, change: -2 },
    { rank: 7, userId: '7', displayName: 'William Taylor', points: 290, change: 1 },
    { rank: 8, userId: '8', displayName: 'Sophia Martinez', points: 280, change: -1 },
    { rank: 9, userId: '9', displayName: 'Liam Anderson', points: 270, change: 0 },
    { rank: 10, userId: '10', displayName: 'Ava Thomas', points: 260, change: 2 }
  ];

  const monthlyLeaderboard: LeaderboardEntry[] = [
    { rank: 1, userId: '2', displayName: 'Michael Chen', points: 1850, change: 0 },
    { rank: 2, userId: '1', displayName: 'Sarah Johnson', points: 1720, change: 1 },
    { rank: 3, userId: '3', displayName: 'Emma Williams', points: 1650, change: -1 },
    { rank: 4, userId: '4', displayName: 'James Brown', points: 1520, change: 2 },
    { rank: 5, userId: '6', displayName: 'Olivia Davis', points: 1450, change: -1 },
    { rank: 6, userId: '7', displayName: 'William Taylor', points: 1380, change: 1 },
    { rank: 7, userId: '8', displayName: 'Sophia Martinez', points: 1320, change: -2 },
    { rank: 8, userId: '9', displayName: 'Liam Anderson', points: 1280, change: 0 },
    { rank: 9, userId: '10', displayName: 'Ava Thomas', points: 1250, change: 1 },
    { rank: 10, userId: 'current', displayName: 'You', points: 1200, change: -1, isCurrentUser: true }
  ];

  const allTimeLeaderboard: LeaderboardEntry[] = [
    { rank: 1, userId: '2', displayName: 'Michael Chen', points: 8450, change: 0 },
    { rank: 2, userId: '1', displayName: 'Sarah Johnson', points: 7920, change: 0 },
    { rank: 3, userId: '3', displayName: 'Emma Williams', points: 7650, change: 0 },
    { rank: 4, userId: '4', displayName: 'James Brown', points: 6820, change: 1 },
    { rank: 5, userId: '6', displayName: 'Olivia Davis', points: 6450, change: -1 },
    { rank: 6, userId: '7', displayName: 'William Taylor', points: 5980, change: 0 },
    { rank: 7, userId: '8', displayName: 'Sophia Martinez', points: 5720, change: 0 },
    { rank: 8, userId: '9', displayName: 'Liam Anderson', points: 5480, change: 1 },
    { rank: 9, userId: '10', displayName: 'Ava Thomas', points: 5250, change: -1 },
    { rank: 12, userId: 'current', displayName: 'You', points: 4800, change: 0, isCurrentUser: true }
  ];

  const getLeaderboard = () => {
    switch (activeTab) {
      case 'weekly': return weeklyLeaderboard;
      case 'monthly': return monthlyLeaderboard;
      case 'all-time': return allTimeLeaderboard;
      default: return weeklyLeaderboard;
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getChangeText = (change: number) => {
    if (change > 0) return `+${change}`;
    if (change < 0) return change.toString();
    return '—';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-foreground">Leaderboards</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          Updated every Monday at 6 AM
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'weekly', label: 'This Week' },
          { id: 'monthly', label: 'This Month' },
          { id: 'all-time', label: 'All Time' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Student</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Points</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {getLeaderboard().map((entry) => (
                <tr
                  key={entry.userId}
                  className={`transition-colors ${
                    entry.isCurrentUser
                      ? 'bg-primary/10 hover:bg-primary/20'
                      : 'hover:bg-accent'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getRankIcon(entry.rank) || (
                        <span className="text-lg font-bold text-foreground w-5 text-center">
                          {entry.rank}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-foreground">
                          {entry.displayName[0]}
                        </span>
                      </div>
                      <div>
                        <p className={`font-medium ${entry.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                          {entry.displayName}
                        </p>
                        {entry.isCurrentUser && (
                          <p className="text-xs text-muted-foreground">That's you!</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold text-foreground">
                      {entry.points.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {getChangeIcon(entry.change)}
                      <span className={`text-sm font-medium ${
                        entry.change > 0 ? 'text-green-500' :
                        entry.change < 0 ? 'text-red-500' :
                        'text-muted-foreground'
                      }`}>
                        {getChangeText(entry.change)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <p className="text-sm text-foreground">
          <span className="font-semibold">How rankings work:</span> Leaderboards are computed automatically 
          every Monday at 6 AM. Your position is based on points earned during the period. Keep learning 
          to climb the ranks!
        </p>
      </div>
    </div>
  );
}
