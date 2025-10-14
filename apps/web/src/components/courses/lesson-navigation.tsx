'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  CheckCircle,
  Lock,
  Play
} from 'lucide-react';

interface LessonNavigationProps {
  courseSlug: string;
  lessonId: string;
}

interface NavigationLesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'interactive' | 'quiz';
  isCompleted: boolean;
  isLocked: boolean;
  moduleTitle: string;
}

interface NavigationData {
  courseTitle: string;
  currentLesson: NavigationLesson;
  previousLesson?: NavigationLesson;
  nextLesson?: NavigationLesson;
  allLessons: NavigationLesson[];
}

export function LessonNavigation({ courseSlug, lessonId }: LessonNavigationProps) {
  const [navData, setNavData] = useState<NavigationData | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch navigation data from API
    setTimeout(() => {
      setNavData({
        courseTitle: 'Advanced Mathematics: Calculus Fundamentals',
        currentLesson: {
          id: lessonId,
          title: 'Practice Problems',
          type: 'interactive',
          isCompleted: false,
          isLocked: false,
          moduleTitle: 'Limits and Continuity',
        },
        previousLesson: {
          id: '7',
          title: 'Continuity',
          type: 'text',
          isCompleted: true,
          isLocked: false,
          moduleTitle: 'Limits and Continuity',
        },
        nextLesson: {
          id: '9',
          title: 'Limits and Continuity Quiz',
          type: 'quiz',
          isCompleted: false,
          isLocked: false,
          moduleTitle: 'Limits and Continuity',
        },
        allLessons: [
          {
            id: '1',
            title: 'What is Calculus?',
            type: 'video',
            isCompleted: true,
            isLocked: false,
            moduleTitle: 'Introduction to Calculus',
          },
          {
            id: '2',
            title: 'Historical Development',
            type: 'text',
            isCompleted: true,
            isLocked: false,
            moduleTitle: 'Introduction to Calculus',
          },
          // ... more lessons
          {
            id: lessonId,
            title: 'Practice Problems',
            type: 'interactive',
            isCompleted: false,
            isLocked: false,
            moduleTitle: 'Limits and Continuity',
          },
        ],
      });
      setLoading(false);
    }, 500);
  }, [lessonId]);

  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyNavigation);
    return () => document.removeEventListener('keydown', handleKeyNavigation);
  }, []);

  if (loading) {
    return (
      <div className="h-16 bg-white border-b flex items-center justify-between px-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded" />
          <div className="w-48 h-4 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-8 bg-gray-200 rounded" />
          <div className="w-24 h-8 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!navData) return null;

  return (
    <>
      {/* Navigation Header */}
      <div className="h-16 bg-white border-b flex items-center justify-between px-6 relative z-50">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <Link
            href={`/courses/${courseSlug}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Course</span>
          </Link>
          
          <div className="hidden md:block h-6 w-px bg-gray-300" />
          
          <div className="hidden md:block">
            <h1 className="font-semibold text-gray-900 truncate max-w-xs">
              {navData.courseTitle}
            </h1>
            <p className="text-sm text-gray-600 truncate max-w-xs">
              {navData.currentLesson.moduleTitle}: {navData.currentLesson.title}
            </p>
          </div>
        </div>

        {/* Center - Mobile Title */}
        <div className="md:hidden flex-1 text-center">
          <h1 className="font-semibold text-gray-900 truncate">
            {navData.currentLesson.title}
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {/* Previous Lesson */}
          {navData.previousLesson && (
            <Link
              href={`/courses/${courseSlug}/lesson/${navData.previousLesson.id}`}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          )}

          {/* Next Lesson */}
          {navData.nextLesson && (
            <Link
              href={`/courses/${courseSlug}/lesson/${navData.nextLesson.id}`}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}

          {/* Lesson List Toggle */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">Lessons</span>
          </button>
        </div>
      </div>

      {/* Lesson Sidebar Overlay */}
      {showSidebar && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowSidebar(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
            {/* Sidebar Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Course Lessons</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{navData.courseTitle}</p>
            </div>

            {/* Lessons List */}
            <div className="p-4 space-y-2">
              {navData.allLessons.map((lesson, index) => {
                const isCurrentLesson = lesson.id === lessonId;
                
                return (
                  <div key={lesson.id}>
                    {/* Module Separator */}
                    {index === 0 || lesson.moduleTitle !== navData.allLessons[index - 1].moduleTitle ? (
                      <div className="py-2 mt-4 first:mt-0">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                          {lesson.moduleTitle}
                        </h3>
                      </div>
                    ) : null}

                    {/* Lesson Item */}
                    {lesson.isLocked ? (
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 opacity-60">
                        <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 truncate">
                            {lesson.title}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`/courses/${courseSlug}/lesson/${lesson.id}`}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isCurrentLesson
                            ? 'bg-blue-50 border-2 border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setShowSidebar(false)}
                      >
                        <div className="flex-shrink-0">
                          {lesson.isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : isCurrentLesson ? (
                            <Play className="w-4 h-4 text-blue-600" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            isCurrentLesson ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {lesson.type}
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
