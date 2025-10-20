'use client';

import { Award, Clock, TrendingUp, Target } from 'lucide-react';

export function WellbeingStats() {
  const stats = [
    {
      label: 'Modules Completed',
      value: '3/12',
      percentage: 25,
      icon: Award,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Learning Time',
      value: '2.5h',
      change: '+30 min this week',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Streak Days',
      value: '7',
      change: 'Keep it up!',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Skills Mastered',
      value: '5/20',
      percentage: 25,
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-6 netflix-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            {stat.change && (
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            )}
            {stat.percentage !== undefined && (
              <div className="mt-3">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${stat.bgColor.replace('/10', '')}`}
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
