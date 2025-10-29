import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { LifeSkillsView } from '@/components/life-skills/life-skills-view';

export default function LifeSkillsPage() {
  return (
    <BasicPlanGuard redirectTo="/life-skills">
      <NetflixDashboardLayout>
        <LifeSkillsView />
      </NetflixDashboardLayout>
    </BasicPlanGuard>
  );
}

