'use client';

import { Award } from 'lucide-react';

export function WellbeingStats() {
  // Removed fake data - stats will be added when we have real data from user progress
  const stats = [
    {
      label: 'Get Started',
      value: 'Begin your wellbeing journey',
      icon: Award,
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
