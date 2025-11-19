'use client';

import { useEffect, useState } from 'react';
import { Briefcase, TrendingUp, DollarSign, Users } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function CareerStats() {
  const [careerCount, setCareerCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCareerCount() {
      try {
        const careersRef = collection(db, 'careers');
        const snapshot = await getDocs(careersRef);
        setCareerCount(snapshot.size);
      } catch (error) {
        console.error('Error loading career count:', error);
        setCareerCount(500); // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadCareerCount();
  }, []);

  const stats = [
    {
      label: 'Career Paths',
      value: loading ? '...' : careerCount > 0 ? `${careerCount}+` : '500+',
      icon: Briefcase,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Industry Sectors',
      value: '25',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Avg Salary',
      value: '£28K',
      icon: DollarSign,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Job Openings',
      value: '10K+',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="teal-card rounded-xl p-4 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-teal-card-text truncate">{stat.value}</p>
              <p className="text-xs text-teal-card-text-muted truncate">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
