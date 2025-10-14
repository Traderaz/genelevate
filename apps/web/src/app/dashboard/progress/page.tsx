import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { NetflixProgressTracker } from '@/components/progress/netflix-progress-tracker';

export const metadata: Metadata = {
  title: 'Progress Tracker - Gen Elevate',
  description: 'Track your learning progress, view detailed analytics, and monitor your academic journey',
};

export default function ProgressPage() {
  return (
    <NetflixDashboardLayout>
      <NetflixProgressTracker />
    </NetflixDashboardLayout>
  );
}
