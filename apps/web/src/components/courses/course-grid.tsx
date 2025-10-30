'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCourses, Course } from '@/lib/services/courses';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface CourseGridProps {
  searchParams: {
    search?: string;
    subject?: string;
    yearGroup?: string;
    difficulty?: string;
    page?: string;
  };
}

export function CourseGrid({ searchParams }: CourseGridProps) {
  const { user, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      if (authLoading) return; // Wait for auth to load
      if (!user) {
        console.log('⚠️ No user, skipping course fetch');
        setLoading(false);
        return;
      }

      console.log('✅ User authenticated, fetching courses');
      setLoading(true);
      const fetchedCourses = await getCourses({
        search: searchParams.search,
        subject: searchParams.subject,
        yearGroup: searchParams.yearGroup,
        difficulty: searchParams.difficulty,
      });
      setCourses(fetchedCourses);
      setLoading(false);
    }

    fetchCourses();
  }, [user, authLoading, searchParams.search, searchParams.subject, searchParams.yearGroup, searchParams.difficulty]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-[#e50914] animate-spin" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link
          key={course.id}
          href={`/courses/${course.id}`}
          className="group bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-[#e50914] transition-all duration-300 hover:scale-105"
        >
          {/* Thumbnail */}
          <div className="aspect-video bg-gradient-to-br from-[#e50914] to-[#831010] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white/30" />
            </div>
            {course.featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-white/20 text-white border-none">Featured</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="border-gray-700 text-gray-300">
                {course.subject}
              </Badge>
              <Badge variant="outline" className="border-gray-700 text-gray-300 capitalize">
                {course.difficulty}
              </Badge>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#e50914] transition-colors">
              {course.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.chapters.length} chapters</span>
              </div>
              {course.enrollmentCount !== undefined && course.enrollmentCount > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrollmentCount}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {course.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
