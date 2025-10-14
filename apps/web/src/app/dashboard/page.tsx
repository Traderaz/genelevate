import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { NetflixDashboardOverview } from '@/components/dashboard/netflix-dashboard-overview';

export const metadata: Metadata = {
  title: 'Dashboard - Gen Elevate',
  description: 'Your personalized learning dashboard - track progress, continue courses, and join live sessions',
};

export default function DashboardPage() {
  return (
    <NetflixDashboardLayout>
      <NetflixDashboardOverview />
    </NetflixDashboardLayout>
  );
}
