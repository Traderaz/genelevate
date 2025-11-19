'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFeaturedCourses, Course } from '@/lib/services/courses';
import { BookOpen, Users, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';

export function FeaturedCourses() {
  const { user, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      if (authLoading) return;
      if (!user) {
        setLoading(false);
        return;
      }

      const fetchedCourses = await getFeaturedCourses(3);
      setCourses(fetchedCourses);
      setLoading(false);
    }

    fetchFeatured();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-teal-gold animate-spin" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No featured courses yet</h3>
        <p className="text-white/70">Check back soon for featured content</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Featured Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="group teal-card rounded-lg overflow-hidden border-2 border-transparent hover:border-teal-gold transition-all duration-300 hover:shadow-xl"
          >
            {/* Course Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-teal-blue-medium to-teal-primary relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white/30" />
              </div>
              {course.featured && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-teal-gold text-teal-card-text border-none font-bold shadow-lg">Featured</Badge>
                </div>
              )}
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="border-gray-300 text-teal-card-text">
                  {course.subject}
                </Badge>
                <Badge variant="outline" className="border-gray-300 text-teal-card-text capitalize">
                  {course.difficulty}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-teal-card-text mb-2 group-hover:text-teal-primary transition-colors line-clamp-2">
                {course.title}
              </h3>
              
              <p className="text-teal-card-text-muted text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-teal-card-text-muted">
                {course.chapters && course.chapters.length > 0 && (
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.chapters.length} chapters</span>
                  </div>
                )}
                {course.moduleCount && (
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.moduleCount} modules</span>
                  </div>
                )}
                {course.enrollmentCount !== undefined && course.enrollmentCount > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrollmentCount}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
