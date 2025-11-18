import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { LessonViewer } from '@/components/wellbeing/lesson-viewer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Lesson - Gen Elevate',
  description: 'Learn essential life skills with interactive lessons',
};

interface LessonPageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params;

  return (
    <NetflixDashboardLayout>
      <Suspense fallback={<div className="h-screen bg-card animate-pulse rounded-xl" />}>
        <LessonViewer 
          moduleId={resolvedParams.id} 
          lessonId={resolvedParams.lessonId} 
        />
      </Suspense>
    </NetflixDashboardLayout>
  );
}

