'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { getCourse, Course } from '@/lib/services/courses';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, ArrowLeft, Play, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function CoursePage() {
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const slug = params.slug as string;

  useEffect(() => {
    async function fetchCourse() {
      if (authLoading) return;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const fetchedCourse = await getCourse(slug);
        setCourse(fetchedCourse);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [slug, user, authLoading]);

  if (authLoading || loading) {
    return (
      <BasicPlanGuard redirectTo={`/courses/${slug}`}>
        <NetflixDashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 text-[#e50914] animate-spin" />
          </div>
        </NetflixDashboardLayout>
      </BasicPlanGuard>
    );
  }

  if (!course) {
    return (
      <BasicPlanGuard redirectTo={`/courses/${slug}`}>
        <NetflixDashboardLayout>
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Course not found</h3>
            <Link href="/courses" className="text-[#e50914] hover:underline">
              Return to courses
            </Link>
          </div>
        </NetflixDashboardLayout>
      </BasicPlanGuard>
    );
  }

  return (
    <BasicPlanGuard redirectTo={`/courses/${slug}`}>
      <NetflixDashboardLayout>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Back Button */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          {/* Course Header */}
          <div className="bg-gradient-to-r from-[#e50914] to-[#831010] rounded-lg p-8 text-white">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-none">
                  {course.subject}
                </Badge>
                <Badge className="bg-white/20 text-white border-none capitalize">
                  {course.difficulty}
                </Badge>
                {course.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="border-white/30 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-white/90 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.chapters.length} chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Self-paced</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{course.yearGroups.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chapters List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>

              <div className="space-y-4">
                {course.chapters.sort((a, b) => a.order - b.order).map((chapter, index) => (
                  <Link
                    key={chapter.id}
                    href={`/courses/${course.id}/chapter/${chapter.id}`}
                    className="group block bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-[#e50914] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#e50914]/10 rounded-full flex items-center justify-center text-[#e50914] font-bold group-hover:bg-[#e50914] group-hover:text-white transition-colors">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#e50914] transition-colors">
                          {chapter.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">{chapter.description}</p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {chapter.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{chapter.duration}</span>
                            </div>
                          )}
                          {chapter.weight && (
                            <Badge variant="outline" className="border-gray-700 text-gray-500">
                              {chapter.weight} of exam
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Play className="w-5 h-5 text-gray-600 group-hover:text-[#e50914] transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Info Card */}
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-white">Course Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chapters</span>
                    <span className="text-white font-medium">{course.chapters.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Level</span>
                    <span className="text-white font-medium capitalize">{course.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year Groups</span>
                    <span className="text-white font-medium">{course.yearGroups.join(', ')}</span>
                  </div>
                  {course.enrollmentCount !== undefined && course.enrollmentCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Students</span>
                      <span className="text-white font-medium">{course.enrollmentCount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-white">What You'll Learn</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#e50914] mt-0.5 flex-shrink-0" />
                    <span>Master all key concepts for GCSE exams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#e50914] mt-0.5 flex-shrink-0" />
                    <span>Practice with past paper-style questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#e50914] mt-0.5 flex-shrink-0" />
                    <span>Learn exam techniques and tips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#e50914] mt-0.5 flex-shrink-0" />
                    <span>Avoid common mistakes</span>
                  </li>
                </ul>
              </div>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-white">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </NetflixDashboardLayout>
    </BasicPlanGuard>
  );
}
