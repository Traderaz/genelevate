import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { PurchaseSuccess } from '@/components/addons/purchase-success';

export const metadata: Metadata = {
  title: 'Purchase Successful - Gen Elevate',
  description: 'Your purchase was successful',
};

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  return (
    <NetflixDashboardLayout>
      <PurchaseSuccess sessionId={sessionId} />
    </NetflixDashboardLayout>
  );
}
