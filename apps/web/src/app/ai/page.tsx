'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { AIFeatureGuard } from '@/components/auth/subscription-guard';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';

// Dynamically import AI Chat component (not loaded until needed)
const AIChat = dynamic(() => import('@/components/ai/ai-chat-premium'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-teal-gold mx-auto" />
        <p className="text-white/80">Loading AI Assistant...</p>
      </div>
    </div>
  ),
  ssr: false, // Don't render on server (Firebase needs browser)
});

export default function AIPage() {
  return (
    <AIFeatureGuard redirectTo="/ai">
      <NetflixDashboardLayout>
        <AIChat />
      </NetflixDashboardLayout>
    </AIFeatureGuard>
  );
}

