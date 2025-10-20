import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { CareerExplorer } from '@/components/careers/career-explorer';
import { IndustryNewsFeed } from '@/components/careers/industry-news-feed';
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
    <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Career Banner */}
        <CareerBanner />

        {/* Career Stats */}
        <CareerStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Career Explorer - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-xl" />}>
              <CareerExplorer searchParams={resolvedSearchParams} />
            </Suspense>
          </div>

          {/* Industry News Feed - Takes 1 column */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-xl" />}>
              <IndustryNewsFeed />
            </Suspense>
          </div>
        </div>
      </div>
    </NetflixDashboardLayout>
  );
}
