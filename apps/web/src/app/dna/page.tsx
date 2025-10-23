/**
 * DNA Dashboard Page
 * 
 * Main page for viewing and managing Academic DNA profile
 */

'use client';

import { useAuth } from '@/contexts/auth-context';
import { DNAProfileView } from '@/components/dna/dna-profile-view';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DNAPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/dna');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <NetflixDashboardLayout>
      <DNAProfileView userId={user.uid} isOwnProfile={true} />
    </NetflixDashboardLayout>
  );
}

