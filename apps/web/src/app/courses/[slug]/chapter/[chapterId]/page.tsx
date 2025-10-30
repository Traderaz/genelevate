'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { getCourse, Course, Chapter } from '@/lib/services/courses';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  CheckCircle,
  Loader2,
  Menu,
  X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/contexts/auth-context';

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const slug = params.slug as string;
  const chapterId = params.chapterId as string;

  useEffect(() => {
    async function fetchCourse() {
      if (authLoading) return;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const fetchedCourse = await getCourse(slug);
        if (fetchedCourse) {
          setCourse(fetchedCourse);
          const chapter = fetchedCourse.chapters.find(c => c.id === chapterId);
          setCurrentChapter(chapter || null);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [slug, chapterId, user, authLoading]);

  if (authLoading || loading) {
    return (
      <BasicPlanGuard redirectTo={`/courses/${slug}/chapter/${chapterId}`}>
        <NetflixDashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 text-[#e50914] animate-spin" />
          </div>
        </NetflixDashboardLayout>
      </BasicPlanGuard>
    );
  }

  if (!course || !currentChapter) {
    return (
      <BasicPlanGuard redirectTo={`/courses/${slug}`}>
        <NetflixDashboardLayout>
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Chapter not found</h3>
            <Link href="/courses" className="text-[#e50914] hover:underline">
              Return to courses
            </Link>
          </div>
        </NetflixDashboardLayout>
      </BasicPlanGuard>
    );
  }

  const sortedChapters = [...course.chapters].sort((a, b) => a.order - b.order);
  const currentIndex = sortedChapters.findIndex(c => c.id === chapterId);
  const previousChapter = currentIndex > 0 ? sortedChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : null;

  return (
    <BasicPlanGuard redirectTo={`/courses/${slug}/chapter/${chapterId}`}>
      <NetflixDashboardLayout>
        <div className="max-w-7xl mx-auto">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden fixed top-20 right-4 z-50">
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-[#1a1a1a] border border-gray-800 hover:border-[#e50914]"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          <div className="flex gap-6">
            {/* Sidebar - Course Navigation */}
            <aside 
              className={`
                fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-[#1a1a1a] border-r border-gray-800 
                overflow-y-auto z-40 transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              `}
            >
              <div className="p-6 space-y-6">
                {/* Course Header */}
                <div>
                  <Link
                    href={`/courses/${slug}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to course
                  </Link>
                  <h2 className="text-lg font-bold text-white line-clamp-2">{course.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {sortedChapters.length} chapters
                  </p>
                </div>

                {/* Chapters List */}
                <div className="space-y-2">
                  {sortedChapters.map((chapter, index) => {
                    const isActive = chapter.id === chapterId;
                    return (
                      <button
                        key={chapter.id}
                        onClick={() => {
                          router.push(`/courses/${slug}/chapter/${chapter.id}`);
                          setSidebarOpen(false);
                        }}
                        className={`
                          w-full text-left p-4 rounded-lg transition-all
                          ${isActive 
                            ? 'bg-[#e50914] text-white' 
                            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`
                            flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${isActive ? 'bg-white text-[#e50914]' : 'bg-gray-700 text-gray-400'}
                          `}>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm line-clamp-2 mb-1">
                              {chapter.title}
                            </h3>
                            {chapter.duration && (
                              <div className="flex items-center gap-1 text-xs opacity-75">
                                <Clock className="w-3 h-3" />
                                <span>{chapter.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 pb-12">
              {/* Chapter Header */}
              <div className="bg-gradient-to-r from-[#e50914] to-[#831010] rounded-lg p-6 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-white/20 text-white border-none">
                    Chapter {currentIndex + 1} of {sortedChapters.length}
                  </Badge>
                  {currentChapter.duration && (
                    <Badge className="bg-white/20 text-white border-none">
                      <Clock className="w-3 h-3 mr-1" />
                      {currentChapter.duration}
                    </Badge>
                  )}
                  {currentChapter.weight && (
                    <Badge className="bg-white/20 text-white border-none">
                      {currentChapter.weight} of exam
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{currentChapter.title}</h1>
                <p className="text-white/90">{currentChapter.description}</p>
              </div>

              {/* Chapter Content */}
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
                <div className="prose prose-invert prose-lg max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mb-6 mt-8" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-4 mt-6" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-white mb-3 mt-4" {...props} />,
                      h4: ({ node, ...props }) => <h4 className="text-lg font-semibold text-white mb-2 mt-3" {...props} />,
                      p: ({ node, ...props }) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                      li: ({ node, ...props }) => <li className="text-gray-300" {...props} />,
                      strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
                      em: ({ node, ...props }) => <em className="text-gray-200 italic" {...props} />,
                      code: ({ node, inline, ...props }: any) => 
                        inline 
                          ? <code className="bg-gray-800 text-[#e50914] px-2 py-1 rounded text-sm" {...props} />
                          : <code className="block bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-[#e50914] pl-4 italic text-gray-400 my-4" {...props} />
                      ),
                      hr: ({ node, ...props }) => <hr className="border-gray-700 my-8" {...props} />,
                    }}
                  >
                    {currentChapter.content}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 gap-4">
                {previousChapter ? (
                  <Button
                    onClick={() => router.push(`/courses/${slug}/chapter/${previousChapter.id}`)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:border-[#e50914] hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous Chapter
                  </Button>
                ) : (
                  <div />
                )}

                {nextChapter ? (
                  <Button
                    onClick={() => router.push(`/courses/${slug}/chapter/${nextChapter.id}`)}
                    className="bg-[#e50914] hover:bg-[#b00710] text-white ml-auto"
                  >
                    Next Chapter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push(`/courses/${slug}`)}
                    className="bg-green-600 hover:bg-green-700 text-white ml-auto"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Course
                  </Button>
                )}
              </div>
            </main>
          </div>
        </div>
      </NetflixDashboardLayout>
    </BasicPlanGuard>
  );
}

