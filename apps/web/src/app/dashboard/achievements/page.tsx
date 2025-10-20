import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { AchievementsView } from '@/components/dashboard/achievements-view';

export default function AchievementsPage() {
  return (
    <NetflixDashboardLayout>
      <AchievementsView />
    </NetflixDashboardLayout>
  );
}

