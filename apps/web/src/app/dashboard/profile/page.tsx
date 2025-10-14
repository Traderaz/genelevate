import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { NetflixUserProfile } from '@/components/profile/netflix-user-profile';

export const metadata: Metadata = {
  title: 'Profile - Gen Elevate',
  description: 'Manage your account settings, learning preferences, and subscription details',
};

export default function ProfilePage() {
  return (
    <NetflixDashboardLayout>
      <NetflixUserProfile />
    </NetflixDashboardLayout>
  );
}
