'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Lock,
  Play,
  Clock,
  Award,
  BookOpen,
  Target
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
}

interface ModuleData {
  id: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  duration: string;
  lessons: Lesson[];
  skills: string[];
  objectives: string[];
}

interface ModuleDetailProps {
  moduleId: string;
}

export function ModuleDetail({ moduleId }: ModuleDetailProps) {
  const router = useRouter();
  const [module, setModule] = useState<ModuleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch module data
    const fetchModuleData = async () => {
      try {
        // Import module data
        const { getModuleById } = await import('@/lib/data/uk-life-skills-modules');
        const moduleData = getModuleById(moduleId);
        
        if (moduleData) {
          // TODO: In production, fetch user progress from Firestore
          // For now, all lessons start as not completed
          const moduleWithProgress = {
            ...moduleData,
            lessons: moduleData.lessons.map(lesson => ({
              ...lesson,
              completed: false,
              locked: false
            }))
          };
          setModule(moduleWithProgress);
        }
      } catch (error) {
        console.error('Error loading module:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-card animate-pulse rounded-xl" />
        <div className="h-96 bg-card animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Module Not Found</h2>
        <p className="text-muted-foreground mb-6">The module you're looking for doesn't exist.</p>
        <button
          onClick={() => router.push('/life-skills')}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg netflix-button"
        >
          Back to Life Skills
        </button>
      </div>
    );
  }

  const completedLessons = module.lessons.filter(l => l.completed).length;
  const progressPercentage = Math.round((completedLessons / module.lessons.length) * 100);

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.completed) return CheckCircle;
    if (lesson.locked) return Lock;
    return Circle;
  };

  const getLessonIconColor = (lesson: Lesson) => {
    if (lesson.completed) return 'text-green-500';
    if (lesson.locked) return 'text-gray-500';
    return 'text-muted-foreground';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'reading': return '📖';
      case 'exercise': return '✏️';
      case 'quiz': return '📝';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.push('/life-skills')}
        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Life Skills
      </button>

      {/* Header */}
      <div className="teal-card border-2 border-teal-primary/30 rounded-2xl p-8 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-gold/5 via-transparent to-teal-primary/5"></div>
        <div className="relative z-10">
          <div className="mb-4">
            <span className="px-3 py-1 bg-teal-gold/20 text-teal-gold border border-teal-gold/30 rounded-full text-sm font-bold">
              {module.category}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0B5C9E] mb-4">{module.title}</h1>
          <p className="text-lg text-[#666666] mb-6">{module.description}</p>
          
          {/* Progress Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#666666]">Your Progress</span>
              <span className="font-semibold text-[#0B5C9E]">
                {completedLessons}/{module.lessons.length} lessons
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  progressPercentage === 100 ? 'bg-green-500' : 'bg-teal-primary'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#666666]">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-primary" />
              {module.duration}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-primary" />
              {module.lessons.length} lessons
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-primary" />
              {module.skills.length} skills
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Lessons */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <div className="teal-card border-2 border-teal-light/20 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-[#0B5C9E] mb-4">Module Overview</h2>
            <p className="text-[#666666] leading-relaxed">{module.overview}</p>
          </div>

          {/* Learning Objectives */}
          <div className="teal-card border-2 border-teal-light/20 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-[#0B5C9E] mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-primary" />
              Learning Objectives
            </h2>
            <ul className="space-y-3">
              {module.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[#666666]">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons List */}
          <div className="teal-card border-2 border-teal-light/20 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-[#0B5C9E] mb-4">Lessons</h2>
            <div className="space-y-3">
              {module.lessons.map((lesson, index) => {
                const LessonIcon = getLessonIcon(lesson);
                const iconColor = getLessonIconColor(lesson);
                
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      if (!lesson.locked) {
                        router.push(`/wellbeing/module/${moduleId}/lesson/${lesson.id}`);
                      }
                    }}
                    disabled={lesson.locked}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      lesson.locked
                        ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-60'
                        : lesson.completed
                        ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10'
                        : 'border-teal-light/30 hover:border-teal-primary hover:bg-teal-primary/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <LessonIcon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-[#666666]">Lesson {index + 1}</span>
                          <span className="text-lg">{getTypeIcon(lesson.type)}</span>
                        </div>
                        <h3 className="font-semibold text-[#0B5C9E] mb-1">{lesson.title}</h3>
                        <p className="text-sm text-[#666666]">{lesson.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-sm text-[#666666] mb-1">{lesson.duration}</div>
                        {!lesson.locked && !lesson.completed && (
                          <Play className="w-5 h-5 text-teal-primary ml-auto" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Skills You'll Learn */}
          <div className="teal-card border-2 border-teal-light/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#0B5C9E] mb-4">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {module.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-teal-primary/10 text-teal-primary border border-teal-primary/20 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="teal-card border-2 border-teal-light/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#0B5C9E] mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#666666]">Completion</span>
                  <span className="text-2xl font-bold text-[#0B5C9E]">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      progressPercentage === 100 ? 'bg-green-500' : 'bg-teal-primary'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-300 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666666]">Completed</span>
                  <span className="font-semibold text-green-500">{completedLessons}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666666]">Remaining</span>
                  <span className="font-semibold text-[#0B5C9E]">
                    {module.lessons.length - completedLessons}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666666]">Total Lessons</span>
                  <span className="font-semibold text-[#0B5C9E]">{module.lessons.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue/Start Button */}
          <button
            onClick={() => {
              const nextLesson = module.lessons.find(l => !l.completed && !l.locked);
              if (nextLesson) {
                router.push(`/wellbeing/module/${moduleId}/lesson/${nextLesson.id}`);
              }
            }}
            className="w-full px-6 py-4 teal-button-primary rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <Play className="w-5 h-5" />
            {completedLessons === 0 ? 'Start Module' : completedLessons === module.lessons.length ? 'Review Module' : 'Continue Learning'}
          </button>
        </div>
      </div>
    </div>
  );
}
