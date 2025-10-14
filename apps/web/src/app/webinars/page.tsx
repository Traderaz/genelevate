import { Metadata } from 'next';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { WebinarGrid } from '@/components/webinars/webinar-grid';
import { WebinarFilters } from '@/components/webinars/webinar-filters';
import { WebinarSearch } from '@/components/webinars/webinar-search';
import { UpcomingWebinars } from '@/components/webinars/upcoming-webinars';
import { Suspense } from 'react';
import { WebinarGridSkeleton } from '@/components/webinars/webinar-grid-skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Webinars',
  description: 'Join live webinars and watch recorded sessions from expert educators',
};

interface WebinarsPageProps {
  searchParams: {
    search?: string;
    subject?: string;
    yearGroup?: string;
    type?: string;
    status?: string;
    page?: string;
  };
}

export default function WebinarsPage({ searchParams }: WebinarsPageProps) {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webinars</h1>
          <p className="text-muted-foreground">
            Join live sessions and access recorded content from expert educators
          </p>
        </div>
        
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
                  <WebinarGrid searchParams={searchParams} />
                </Suspense>
              </main>
            </div>
          </TabsContent>
          
          <TabsContent value="live" className="space-y-6">
            <Suspense fallback={<WebinarGridSkeleton />}>
              <WebinarGrid searchParams={{ ...searchParams, status: 'live' }} />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="recorded" className="space-y-6">
            <Suspense fallback={<WebinarGridSkeleton />}>
              <WebinarGrid searchParams={{ ...searchParams, status: 'ended' }} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
