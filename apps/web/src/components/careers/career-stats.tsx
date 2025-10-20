'use client';

import { Briefcase, TrendingUp, DollarSign, Users } from 'lucide-react';

export function CareerStats() {
  const stats = [
    {
      label: 'Career Paths',
      value: '500+',
      change: '+50 this month',
      icon: Briefcase,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Industry Sectors',
      value: '25',
      change: 'Across all fields',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Avg Starting Salary',
      value: '£28K',
      change: 'UK Graduate',
      icon: DollarSign,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Job Openings',
      value: '10K+',
      change: 'Updated daily',
      icon: Users,
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
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
