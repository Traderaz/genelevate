'use client';

import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';

export function LifeSkillsProgress() {
  // TODO: Replace with real data from Firestore user progress
  const stats = [
    {
      icon: BookOpen,
      label: 'Total Modules',
      value: '24',
      total: 'available',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: CheckCircle,
      label: 'Modules Completed',
      value: '0',
      total: '24',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: Clock,
      label: 'Hours Learning',
      value: '0',
      total: 'hrs',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: Trophy,
      label: 'Skills Mastered',
      value: '0',
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
            className={`p-6 rounded-xl bg-white dark:bg-gray-800 border-2 ${stat.borderColor} shadow-lg hover:scale-105 hover:shadow-xl transition-all`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor} border ${stat.borderColor} shadow-sm`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1 font-normal">
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

