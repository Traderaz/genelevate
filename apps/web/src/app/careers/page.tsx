import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { CareerExplorer } from '@/components/careers/career-explorer';
import { CareerBanner } from '@/components/careers/career-banner';
import { CareerStats } from '@/components/careers/career-stats';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Career Explorer - Gen Elevate',
  description: 'Explore career pathways, industry insights, and stay updated with the latest industry news',
};

interface CareersPageProps {
  searchParams: Promise<{
    sector?: string;
    location?: string;
    level?: string;
    search?: string;
  }>;
}

export default async function CareersPage({ searchParams }: CareersPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <BasicPlanGuard redirectTo="/careers">
      <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Career Banner */}
        <CareerBanner />

        {/* Career Stats */}
        <CareerStats />

        {/* Career Explorer */}
        <Suspense fallback={<div className="h-96 teal-card animate-pulse rounded-xl" />}>
          <CareerExplorer searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
      </NetflixDashboardLayout>
    </BasicPlanGuard>
  );
}
