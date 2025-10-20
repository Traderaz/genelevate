'use client';

import { useState } from 'react';
import { Trophy, Medal, TrendingUp, TrendingDown, Crown } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  cohort: string;
  points: number;
  change: number;
  avatar?: string;
}

export function InstitutionLeaderboards() {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'all'>('week');

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Sarah Johnson', cohort: 'Year 13 - Business', points: 2450, change: 2 },
    { rank: 2, name: 'Michael Chen', cohort: 'Year 12 - Computing', points: 2280, change: -1 },
    { rank: 3, name: 'Emma Williams', cohort: 'Year 13 - Business', points: 2150, change: 1 },
    { rank: 4, name: 'James Smith', cohort: 'Year 12 - Computing', points: 2050, change: 0 },
    { rank: 5, name: 'Olivia Brown', cohort: 'Year 11 - Science', points: 1980, change: 3 },
    { rank: 6, name: 'Noah Davis', cohort: 'Year 12 - Computing', points: 1890, change: -2 },
    { rank: 7, name: 'Ava Martinez', cohort: 'Year 13 - Business', points: 1820, change: 1 },
    { rank: 8, name: 'Liam Wilson', cohort: 'Year 11 - Science', points: 1750, change: 0 },
    { rank: 9, name: 'Sophia Taylor', cohort: 'Year 12 - Computing', points: 1680, change: 2 },
    { rank: 10, name: 'Ethan Anderson', cohort: 'Year 11 - Science', points: 1590, change: -1 }
  ];

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Institution Leaderboard</h2>
        <div className="flex gap-2">
          {(['week', 'month', 'all'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeFrame(period)}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeFrame === period
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaderboard.slice(0, 3).map((entry, index) => (
          <div
            key={entry.rank}
            className={`relative bg-gradient-to-br ${
              index === 0
                ? 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50'
                : index === 1
                ? 'from-gray-400/20 to-gray-500/20 border-gray-400/50'
                : 'from-orange-600/20 to-red-500/20 border-orange-600/50'
            } border rounded-lg p-6 text-center`}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="p-3 bg-gray-900 rounded-full border-4 border-gray-900">
                {getMedalIcon(entry.rank)}
              </div>
            </div>
            <div className="mt-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-orange-500 mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
                {entry.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{entry.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{entry.cohort}</p>
              <div className="text-3xl font-bold text-white">{entry.points.toLocaleString()}</div>
              <p className="text-sm text-gray-400">points</p>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Cohort</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Points</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="hover:bg-gray-700/30 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getMedalIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-sm font-bold text-white">
                        {entry.name.charAt(0)}
                      </div>
                      <span className="font-medium text-white">{entry.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{entry.cohort}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-white">{entry.points.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {entry.change > 0 ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-500">+{entry.change}</span>
                        </>
                      ) : entry.change < 0 ? (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-500">{entry.change}</span>
                        </>
                      ) : (
                        <span className="text-sm font-medium text-gray-500">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <button className="px-6 py-3 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-lg text-white transition-all">
          Export Leaderboard Data
        </button>
      </div>
    </div>
  );
}

