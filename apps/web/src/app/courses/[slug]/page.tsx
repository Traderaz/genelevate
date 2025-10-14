import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CourseHeader } from '@/components/courses/course-header';
import { CourseModules } from '@/components/courses/course-modules';
import { CourseProgress } from '@/components/courses/course-progress';
import { CourseInstructor } from '@/components/courses/course-instructor';
import { CourseReviews } from '@/components/courses/course-reviews';
import { CourseEnrollButton } from '@/components/courses/course-enroll-button';
import { Suspense } from 'react';

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // TODO: Fetch course data for metadata
  return {
    title: `Course - Gen Elevate`,
    description: 'Learn with our comprehensive course designed for your academic success.',
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  // TODO: Fetch course data
  // const course = await getCourse(slug);
  // if (!course) {
  //   notFound();
  // }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Course Header */}
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
          <CourseHeader courseSlug={slug} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Progress (if enrolled) */}
            <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg" />}>
              <CourseProgress courseSlug={slug} />
            </Suspense>

            {/* Course Modules */}
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
              <CourseModules courseSlug={slug} />
            </Suspense>

            {/* Course Reviews */}
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
              <CourseReviews courseSlug={slug} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment/Continue Button */}
            <Suspense fallback={<div className="h-12 bg-gray-100 animate-pulse rounded-lg" />}>
              <CourseEnrollButton courseSlug={slug} />
            </Suspense>

            {/* Course Instructor */}
            <Suspense fallback={<div className="h-48 bg-gray-100 animate-pulse rounded-lg" />}>
              <CourseInstructor courseSlug={slug} />
            </Suspense>

            {/* Course Info Card */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Course Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">8 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">Intermediate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-medium">Yes</span>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Prerequisites</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Basic understanding of the subject</li>
                <li>• Completed Year 9 curriculum</li>
                <li>• Access to course materials</li>
              </ul>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">What You'll Learn</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Master key concepts and principles</li>
                <li>• Apply knowledge to real-world scenarios</li>
                <li>• Develop critical thinking skills</li>
                <li>• Prepare for assessments and exams</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
