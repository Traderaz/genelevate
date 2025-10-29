import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { WebinarGrid } from '@/components/webinars/webinar-grid';
import { WebinarFilters } from '@/components/webinars/webinar-filters';
import { WebinarSearch } from '@/components/webinars/webinar-search';
import { UpcomingWebinars } from '@/components/webinars/upcoming-webinars';
import { LiveWebinars } from '@/components/webinars/live-webinars';
import { WebinarStats } from '@/components/webinars/webinar-stats';
import { NetflixWebinarBanner } from '@/components/webinars/netflix-webinar-banner';
import { Suspense } from 'react';
import { WebinarGridSkeleton } from '@/components/webinars/webinar-grid-skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Live Webinars - Gen Elevate',
  description: 'Join live interactive sessions with expert instructors. Real-time learning with chat, Q&A, and attendance tracking.',
};

interface WebinarsPageProps {
  searchParams: Promise<{
    search?: string;
    subject?: string;
    yearGroup?: string;
    type?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function WebinarsPage({ searchParams }: WebinarsPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <BasicPlanGuard redirectTo="/webinars">
      <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Webinar Banner */}
        <NetflixWebinarBanner />

        {/* Live Webinars Alert */}
        <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
          <LiveWebinars />
        </Suspense>

        {/* Webinar Stats */}
        <WebinarStats />
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Webinars</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
            <TabsTrigger value="recorded">Recorded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            <UpcomingWebinars />
          </TabsContent>
          
          <TabsContent value="all" className="space-y-6">
            <div className="flex flex-col gap-6 lg:flex-row">
              <aside className="w-full lg:w-64">
                <WebinarFilters />
              </aside>
              
              <main className="flex-1 space-y-6">
                <WebinarSearch />
                
                <Suspense fallback={<WebinarGridSkeleton />}>
                  <WebinarGrid searchParams={resolvedSearchParams} />
                </Suspense>
              </main>
            </div>
          </TabsContent>
          
          <TabsContent value="live" className="space-y-6">
            <Suspense fallback={<WebinarGridSkeleton />}>
              <WebinarGrid searchParams={{ ...resolvedSearchParams, status: 'live' }} />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="recorded" className="space-y-6">
            <Suspense fallback={<WebinarGridSkeleton />}>
              <WebinarGrid searchParams={{ ...resolvedSearchParams, status: 'ended' }} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
      </NetflixDashboardLayout>
    </BasicPlanGuard>
  );
}
