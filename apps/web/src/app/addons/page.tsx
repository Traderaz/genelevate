import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { AddOnsBanner } from '@/components/addons/addons-banner';
import { AddOnsGrid } from '@/components/addons/addons-grid';
import { MyPurchases } from '@/components/addons/my-purchases';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Premium Add-Ons - Gen Elevate',
  description: 'Enhance your learning journey with premium services including CV help, personal statements, mock interviews, and mentorship',
};

export default function AddOnsPage() {
  return (
    <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Hero Banner */}
        <AddOnsBanner />

        {/* My Purchases */}
        <Suspense fallback={<div className="h-48 teal-card animate-pulse rounded-xl" />}>
          <MyPurchases />
        </Suspense>

        {/* Add-Ons Grid */}
        <Suspense fallback={<div className="h-96 teal-card animate-pulse rounded-xl" />}>
          <AddOnsGrid />
        </Suspense>
      </div>
    </NetflixDashboardLayout>
  );
}
