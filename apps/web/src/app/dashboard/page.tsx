import { Metadata } from 'next';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { DashboardOverview } from '@/components/dashboard/overview';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { ProgressStats } from '@/components/dashboard/progress-stats';
import { UpcomingWebinars } from '@/components/dashboard/upcoming-webinars';
import { RecommendedCourses } from '@/components/dashboard/recommended-courses';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your learning dashboard - track progress and discover new content',
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your learning overview.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ProgressStats />
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardOverview />
          </div>
          <div className="space-y-6">
            <RecentActivity />
            <UpcomingWebinars />
          </div>
        </div>
        
        <RecommendedCourses />
      </div>
    </DashboardLayout>
  );
}
