import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { CareerDetail } from '@/components/careers/career-detail';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Career Details - Gen Elevate',
  description: 'Explore detailed career information, pathways, and requirements',
};

interface CareerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const resolvedParams = await params;

  return (
    <NetflixDashboardLayout>
      <Suspense fallback={<div className="h-screen bg-card animate-pulse rounded-xl" />}>
        <CareerDetail careerId={resolvedParams.id} />
      </Suspense>
    </NetflixDashboardLayout>
  );
}
