import { Metadata } from 'next';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { CourseGrid } from '@/components/courses/course-grid';
import { CourseFilters } from '@/components/courses/course-filters';
import { CourseSearch } from '@/components/courses/course-search';
import { NetflixCourseBanner } from '@/components/courses/netflix-course-banner';
import { FeaturedCourses } from '@/components/courses/featured-courses';
import { CourseStats } from '@/components/courses/course-stats';
import { Suspense } from 'react';
import { CourseGridSkeleton } from '@/components/courses/course-grid-skeleton';

export const metadata: Metadata = {
  title: 'Courses - Gen Elevate',
  description: 'Explore our comprehensive course library designed for Year 6 to A-Level students. Track your progress, earn points, and unlock achievements.',
};

interface CoursesPageProps {
  searchParams: Promise<{
    search?: string;
    subject?: string;
    yearGroup?: string;
    difficulty?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <BasicPlanGuard redirectTo="/courses">
      <NetflixDashboardLayout>
        <div className="space-y-8">
          {/* Hero Banner */}
          <NetflixCourseBanner />

          {/* Course Stats */}
          <CourseStats />

          {/* Featured Courses */}
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
            <FeaturedCourses />
          </Suspense>

          {/* Main Course Browser */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">All Courses</h2>
            
            <div className="flex flex-col gap-6 lg:flex-row">
              <aside className="w-full lg:w-64">
                <CourseFilters />
              </aside>

              <main className="flex-1 space-y-6">
                <CourseSearch />

                <Suspense fallback={<CourseGridSkeleton />}>
                  <CourseGrid searchParams={resolvedSearchParams} />
                </Suspense>
              </main>
            </div>
          </div>
        </div>
      </NetflixDashboardLayout>
    </BasicPlanGuard>
  );
}
