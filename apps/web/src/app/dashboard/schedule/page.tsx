import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { ScheduleView } from '@/components/dashboard/schedule-view';

export default function SchedulePage() {
  return (
    <NetflixDashboardLayout>
      <ScheduleView />
    </NetflixDashboardLayout>
  );
}

