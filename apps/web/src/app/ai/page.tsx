import { Metadata } from 'next';
import AIChat from '@/components/ai/ai-chat-premium';

export const metadata: Metadata = {
  title: 'Gen Elevate AI | Gen Elevate',
  description: 'Your personal AI assistant for study help, career guidance, and motivation',
};

export default function AIPage() {
  return <AIChat />;
}

