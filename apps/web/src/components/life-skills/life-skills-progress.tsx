'use client';

import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';

export function LifeSkillsProgress() {
  // Mock data - replace with real data from Firestore
  const stats = [
    {
      icon: BookOpen,
      label: 'Modules Started',
      value: '3',
      total: '12',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: CheckCircle,
      label: 'Modules Completed',
      value: '1',
      total: '12',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: Clock,
      label: 'Hours Learning',
      value: '8.5',
      total: 'hrs',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: Trophy,
      label: 'Skills Mastered',
      value: '4',
      total: 'skills',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`p-6 rounded-xl border ${stat.borderColor} ${stat.bgColor} hover:scale-105 transition-transform`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-foreground/60">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                  <span className="text-sm text-foreground/40 ml-1">
                    {typeof stat.total === 'string' && !stat.total.includes('/') ? stat.total : `/ ${stat.total}`}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

