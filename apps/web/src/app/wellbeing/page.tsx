import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { WellbeingBanner } from '@/components/wellbeing/wellbeing-banner';
import { WellbeingStats } from '@/components/wellbeing/wellbeing-stats';
import { WellbeingQuickAccess } from '@/components/wellbeing/wellbeing-quick-access';
import { DailyWellbeingCheck } from '@/components/wellbeing/daily-wellbeing-check';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Wellbeing - Gen Elevate',
  description: 'Track your mental wellbeing, access support resources, and maintain a healthy balance',
};

export default function WellbeingPage() {
  return (
    <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Hero Banner */}
        <WellbeingBanner />

        {/* Daily Wellbeing Check */}
        <Suspense fallback={<div className="h-32 teal-card animate-pulse rounded-xl" />}>
          <DailyWellbeingCheck />
        </Suspense>

        {/* Quick Access Widgets */}
        <WellbeingQuickAccess />

        {/* Wellbeing Stats */}
        <WellbeingStats />
      </div>
    </NetflixDashboardLayout>
  );
}
