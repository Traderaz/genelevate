import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { ModuleDetail } from '@/components/wellbeing/module-detail';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Life Skills Module - Gen Elevate',
  description: 'Complete interactive lessons to develop essential life skills',
};

interface ModuleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const resolvedParams = await params;

  return (
    <NetflixDashboardLayout>
      <Suspense fallback={<div className="h-screen bg-card animate-pulse rounded-xl" />}>
        <ModuleDetail moduleId={resolvedParams.id} />
      </Suspense>
    </NetflixDashboardLayout>
  );
}
