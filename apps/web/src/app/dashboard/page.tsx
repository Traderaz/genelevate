'use client';

import dynamic from 'next/dynamic';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';

// Dynamic import for dashboard overview
const NetflixDashboardOverview = dynamic(
  () => import('@/components/dashboard/netflix-dashboard-overview').then(mod => ({ default: mod.NetflixDashboardOverview })),
  {
    loading: () => (
      <div className="space-y-6 animate-pulse">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-lg p-6 h-32"></div>
          ))}
        </div>
        
        {/* Continue Learning Skeleton */}
        <div className="bg-card rounded-lg p-6 h-64"></div>
        
        {/* Quick Actions Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-lg h-24"></div>
          ))}
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function DashboardPage() {
  return (
    <NetflixDashboardLayout>
      <NetflixDashboardOverview />
    </NetflixDashboardLayout>
  );
}
