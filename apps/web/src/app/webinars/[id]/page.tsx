import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { WebinarHeader } from '@/components/webinars/webinar-header';
import { WebinarDetails } from '@/components/webinars/webinar-details';
import { WebinarAgenda } from '@/components/webinars/webinar-agenda';
import { WebinarHost } from '@/components/webinars/webinar-host';
import { WebinarMaterials } from '@/components/webinars/webinar-materials';
import { WebinarRegistration } from '@/components/webinars/webinar-registration';
import { WebinarParticipants } from '@/components/webinars/webinar-participants';
import { Suspense } from 'react';

interface WebinarPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: WebinarPageProps): Promise<Metadata> {
  const { id } = await params;
  
  // TODO: Fetch webinar data for metadata
  return {
    title: `Webinar - Gen Elevate`,
    description: 'Join this interactive webinar session with expert instructors and fellow students.',
  };
}

export default async function WebinarPage({ params }: WebinarPageProps) {
  const { id } = await params;

  // TODO: Fetch webinar data
  // const webinar = await getWebinar(id);
  // if (!webinar) {
  //   notFound();
  // }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Webinar Header */}
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
          <WebinarHeader webinarId={id} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Webinar Details */}
            <Suspense fallback={<div className="h-48 bg-gray-100 animate-pulse rounded-lg" />}>
              <WebinarDetails webinarId={id} />
            </Suspense>

            {/* Webinar Agenda */}
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
              <WebinarAgenda webinarId={id} />
            </Suspense>

            {/* Webinar Materials */}
            <Suspense fallback={<div className="h-48 bg-gray-100 animate-pulse rounded-lg" />}>
              <WebinarMaterials webinarId={id} />
            </Suspense>

            {/* Participants (if live) */}
            <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg" />}>
              <WebinarParticipants webinarId={id} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration/Join Button */}
            <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg" />}>
              <WebinarRegistration webinarId={id} />
            </Suspense>

            {/* Host Information */}
            <Suspense fallback={<div className="h-48 bg-gray-100 animate-pulse rounded-lg" />}>
              <WebinarHost webinarId={id} />
            </Suspense>

            {/* Webinar Info Card */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Webinar Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">90 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium">100 participants</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recording</span>
                  <span className="font-medium">Available after</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-medium">Yes</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Requirements</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Stable internet connection</li>
                <li>• Modern web browser</li>
                <li>• Microphone (optional)</li>
                <li>• Camera (optional)</li>
                <li>• Quiet environment</li>
              </ul>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">What You'll Learn</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Advanced integration techniques</li>
                <li>• Real-world applications</li>
                <li>• Problem-solving strategies</li>
                <li>• Exam preparation tips</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
