import { Metadata } from 'next';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CourseGrid } from '@/components/courses/course-grid';
import { CourseFilters } from '@/components/courses/course-filters';
import { CourseSearch } from '@/components/courses/course-search';
import { Suspense } from 'react';
import { CourseGridSkeleton } from '@/components/courses/course-grid-skeleton';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Explore our comprehensive course library designed for Year 6 to A-Level students',
};

interface CoursesPageProps {
  searchParams: {
    search?: string;
    subject?: string;
    yearGroup?: string;
    difficulty?: string;
    page?: string;
  };
}

export default function CoursesPage({ searchParams }: CoursesPageProps) {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Discover courses tailored to your academic journey
          </p>
        </div>
        
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full lg:w-64">
            <CourseFilters />
          </aside>
          
          <main className="flex-1 space-y-6">
            <CourseSearch />
            
            <Suspense fallback={<CourseGridSkeleton />}>
              <CourseGrid searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
