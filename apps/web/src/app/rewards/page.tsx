import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { RewardsBanner } from '@/components/rewards/rewards-banner';
import { PointsSummary } from '@/components/rewards/points-summary';
import { Leaderboards } from '@/components/rewards/leaderboards';
import { RewardsStore } from '@/components/rewards/rewards-store';
import { AchievementsBadges } from '@/components/rewards/achievements-badges';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Rewards & Leaderboards - Gen Elevate',
  description: 'Track your points, compete on leaderboards, and redeem rewards',
};

export default function RewardsPage() {
  return (
    <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Hero Banner */}
        <RewardsBanner />

        {/* Points Summary */}
        <Suspense fallback={<div className="h-48 bg-card animate-pulse rounded-xl" />}>
          <PointsSummary />
        </Suspense>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboards - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-xl" />}>
              <Leaderboards />
            </Suspense>
          </div>

          {/* Rewards Store - Takes 1 column */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-xl" />}>
              <RewardsStore />
            </Suspense>
          </div>
        </div>

        {/* Achievements & Badges */}
        <Suspense fallback={<div className="h-64 bg-card animate-pulse rounded-xl" />}>
          <AchievementsBadges />
        </Suspense>
      </div>
    </NetflixDashboardLayout>
  );
}
