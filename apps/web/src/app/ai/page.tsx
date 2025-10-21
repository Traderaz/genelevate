import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

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

export const metadata: Metadata = {
  title: 'Gen Elevate AI | Gen Elevate',
  description: 'Your personal AI assistant for study help, career guidance, and motivation',
};

export default function AIPage() {
  return <AIChat />;
}

