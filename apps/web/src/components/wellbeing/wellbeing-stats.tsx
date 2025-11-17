'use client';

import { Award } from 'lucide-react';

export function WellbeingStats() {
  // Removed fake data - stats will be added when we have real data from user progress
  const stats = [
    {
      label: 'Get Started',
      value: 'Begin your wellbeing journey',
      icon: Award,
      color: 'text-teal-gold',
      bgColor: 'bg-teal-gold/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="teal-card border border-white/20 rounded-xl p-6 hover:border-teal-gold/50 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-teal-card-text">{stat.value}</p>
            <p className="text-sm text-teal-card-text-muted">{stat.label}</p>
            {stat.change && (
              <p className="text-xs text-teal-card-text-muted">{stat.change}</p>
            )}
            {stat.percentage !== undefined && (
              <div className="mt-3">
                <div className="w-full bg-white/20 rounded-full h-2">
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
