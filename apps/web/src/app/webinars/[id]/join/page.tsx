import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WebinarPlayer } from '@/components/webinars/webinar-player';
import { WebinarSidebar } from '@/components/webinars/webinar-sidebar';
import { WebinarNavigation } from '@/components/webinars/webinar-navigation';
import { Suspense } from 'react';

interface WebinarJoinPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: WebinarJoinPageProps): Promise<Metadata> {
  const { id } = await params;
  
  // TODO: Fetch webinar data for metadata
  return {
    title: `Join Webinar - Gen Elevate`,
    description: 'Join the live webinar session with real-time interaction and attendance tracking.',
  };
}

export default async function WebinarJoinPage({ params }: WebinarJoinPageProps) {
  const { id } = await params;

  // TODO: Fetch webinar data and check access permissions
  // const webinar = await getWebinar(id);
  // const hasAccess = await checkWebinarAccess(id, userId);
  // 
  // if (!webinar) {
  //   notFound();
  // }
  // 
  // if (!hasAccess) {
  //   redirect(`/webinars/${id}`);
  // }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Webinar Navigation Header */}
      <Suspense fallback={<div className="h-16 bg-gray-800 animate-pulse" />}>
        <WebinarNavigation webinarId={id} />
      </Suspense>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Webinar Content */}
        <div className="flex-1 flex flex-col">
          <Suspense fallback={
            <div className="flex-1 bg-black flex items-center justify-center">
              <div className="text-white text-lg">Loading webinar...</div>
            </div>
          }>
            <WebinarPlayer webinarId={id} />
          </Suspense>
        </div>

        {/* Webinar Sidebar */}
        <div className="w-80 bg-white border-l overflow-y-auto">
          <Suspense fallback={<div className="p-4 space-y-4">
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-32 bg-gray-200 animate-pulse rounded" />
          </div>}>
            <WebinarSidebar webinarId={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
