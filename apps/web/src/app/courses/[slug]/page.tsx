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
          <div className="bg-gradient-to-r from-teal-primary to-teal-blue-medium rounded-lg p-8 text-white">
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
                {course.chapters && course.chapters.length > 0 && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.chapters.length} chapters</span>
                  </div>
                )}
                {course.moduleCount && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.moduleCount} modules</span>
                  </div>
                )}
                {course.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration} weeks</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Self-paced</span>
                </div>
                {course.yearGroups && course.yearGroups.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span>{course.yearGroups.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chapters/Modules List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-teal-card-text mb-6">Course Content</h2>

              {course.chapters && course.chapters.length > 0 ? (
                <div className="space-y-4">
                  {course.chapters.sort((a, b) => a.order - b.order).map((chapter, index) => (
                  <Link
                    key={chapter.id}
                    href={`/courses/${course.id}/chapter/${chapter.id}`}
                    className="group block teal-card border-2 border-teal-primary/30 rounded-lg p-6 hover:border-teal-gold transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-teal-primary/10 rounded-full flex items-center justify-center text-teal-primary font-bold group-hover:bg-teal-primary group-hover:text-white transition-colors">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-teal-card-text mb-2 group-hover:text-teal-primary transition-colors">
                          {chapter.title}
                        </h3>
                        <p className="text-teal-card-text-muted text-sm mb-3">{chapter.description}</p>

                        <div className="flex items-center gap-4 text-xs text-teal-card-text-muted">
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

                      <Play className="w-5 h-5 text-teal-card-text-muted group-hover:text-teal-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
              ) : course.topics && course.topics.length > 0 ? (
                <div className="space-y-3">
                  {course.topics.map((topic: string, index: number) => (
                    <div
                      key={index}
                      className="teal-card border-2 border-teal-primary/30 rounded-lg p-4 hover:border-teal-gold transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-primary/10 text-teal-primary font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-teal-card-text font-medium">{topic}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="teal-card border-2 border-teal-primary/30 rounded-lg p-8 text-center">
                  <BookOpen className="w-12 h-12 text-teal-card-text-muted mx-auto mb-3" />
                  <p className="text-teal-card-text-muted">Course content coming soon</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Info Card */}
              <div className="teal-card border-2 border-teal-primary/30 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-teal-card-text">Course Information</h3>
                <div className="space-y-3 text-sm">
                  {course.chapters && course.chapters.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-teal-card-text-muted">Chapters</span>
                      <span className="text-teal-card-text font-medium">{course.chapters.length}</span>
                    </div>
                  )}
                  {course.moduleCount && (
                    <div className="flex justify-between">
                      <span className="text-teal-card-text-muted">Modules</span>
                      <span className="text-teal-card-text font-medium">{course.moduleCount}</span>
                    </div>
                  )}
                  {course.duration && (
                    <div className="flex justify-between">
                      <span className="text-teal-card-text-muted">Duration</span>
                      <span className="text-teal-card-text font-medium">{course.duration} weeks</span>
                    </div>
                  )}
                  {course.estimatedHours && (
                    <div className="flex justify-between">
                      <span className="text-teal-card-text-muted">Estimated Hours</span>
                      <span className="text-teal-card-text font-medium">{course.estimatedHours} hours</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-teal-card-text-muted">Level</span>
                    <span className="text-teal-card-text font-medium capitalize">{course.difficulty}</span>
                  </div>
                  {course.yearGroups && course.yearGroups.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-teal-card-text-muted">Year Groups</span>
                      <span className="text-teal-card-text font-medium">{course.yearGroups.join(', ')}</span>
                    </div>
                  )}
                  {course.enrollmentCount !== undefined && course.enrollmentCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-teal-card-text-muted">Students</span>
                      <span className="text-teal-card-text font-medium">{course.enrollmentCount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Enroll Button */}
              <Link href={`/courses/${course.id}/learn`} className="block w-full">
                <button className="w-full teal-button-primary py-4 text-lg font-bold">
                  Start Learning
                </button>
              </Link>

              {/* Learning Outcomes */}
              {course.objectives && course.objectives.length > 0 && (
                <div className="teal-card border-2 border-teal-primary/30 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-teal-card-text">What You'll Learn</h3>
                  <ul className="space-y-2 text-sm text-teal-card-text-muted">
                    {course.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-primary flex-shrink-0 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Default Learning Outcomes if no objectives */}
              {(!course.objectives || course.objectives.length === 0) && (
                <div className="teal-card border-2 border-teal-primary/30 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-teal-card-text">What You'll Learn</h3>
                  <ul className="space-y-2 text-sm text-teal-card-text-muted">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-primary mt-0.5 flex-shrink-0" />
                      <span>Master all key concepts for GCSE exams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-primary mt-0.5 flex-shrink-0" />
                      <span>Practice with past paper-style questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-primary mt-0.5 flex-shrink-0" />
                      <span>Learn exam techniques and tips</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-primary mt-0.5 flex-shrink-0" />
                      <span>Avoid common mistakes</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="teal-card border-2 border-teal-primary/30 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-teal-card-text">Tags</h3>
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
