import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LessonPlayer } from '@/components/courses/lesson-player';
import { LessonSidebar } from '@/components/courses/lesson-sidebar';
import { LessonNavigation } from '@/components/courses/lesson-navigation';
import { Suspense } from 'react';

interface LessonPageProps {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug, lessonId } = await params;
  
  // TODO: Fetch lesson data for metadata
  return {
    title: `Lesson - Gen Elevate`,
    description: 'Continue your learning journey with this interactive lesson.',
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonId } = await params;

  // TODO: Fetch lesson and course data
  // const lesson = await getLesson(lessonId);
  // const course = await getCourse(slug);
  // if (!lesson || !course) {
  //   notFound();
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Lesson Navigation Header */}
      <Suspense fallback={<div className="h-16 bg-white border-b animate-pulse" />}>
        <LessonNavigation courseSlug={slug} lessonId={lessonId} />
      </Suspense>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Lesson Content */}
        <div className="flex-1 flex flex-col">
          <Suspense fallback={
            <div className="flex-1 bg-black flex items-center justify-center">
              <div className="text-white">Loading lesson...</div>
            </div>
          }>
            <LessonPlayer courseSlug={slug} lessonId={lessonId} />
          </Suspense>
        </div>

        {/* Lesson Sidebar */}
        <div className="w-80 bg-white border-l overflow-y-auto">
          <Suspense fallback={<div className="p-4 space-y-4">
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-32 bg-gray-200 animate-pulse rounded" />
          </div>}>
            <LessonSidebar courseSlug={slug} lessonId={lessonId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
