'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { StudentOnlyGuard } from '@/components/auth/role-guard';

// Dynamically import AI Chat component (not loaded until needed)
const AIChat = dynamic(() => import('@/components/ai/ai-chat-premium'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Loading AI Assistant...</p>
      </div>
    </div>
  ),
  ssr: false, // Don't render on server (Firebase needs browser)
});

export default function AIPage() {
  return (
    <StudentOnlyGuard>
      <AIChat />
    </StudentOnlyGuard>
  );
}

