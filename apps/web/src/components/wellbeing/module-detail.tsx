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
    // Mock data - In production, fetch from Firestore
    const mockModule: ModuleData = {
      id: moduleId,
      title: 'Understanding Money Basics',
      category: 'Financial Literacy',
      description: 'Learn about earning, saving, and spending wisely',
      overview: 'This module introduces fundamental concepts of personal finance, helping you understand how money works in everyday life. You\'ll learn practical skills for managing money responsibly, making informed financial decisions, and building healthy money habits that will serve you throughout your life.',
      duration: '30 min',
      lessons: [
        {
          id: 'lesson-1',
          title: 'What is Money?',
          description: 'Understand the concept and purpose of money in society',
          duration: '5 min',
          completed: true,
          locked: false,
          type: 'video'
        },
        {
          id: 'lesson-2',
          title: 'Earning Money',
          description: 'Learn about different ways people earn income',
          duration: '6 min',
          completed: true,
          locked: false,
          type: 'reading'
        },
        {
          id: 'lesson-3',
          title: 'Saving vs Spending',
          description: 'Balance your financial priorities',
          duration: '7 min',
          completed: true,
          locked: false,
          type: 'exercise'
        },
        {
          id: 'lesson-4',
          title: 'Needs vs Wants',
          description: 'Make smart choices about your money',
          duration: '6 min',
          completed: false,
          locked: false,
          type: 'exercise'
        },
        {
          id: 'lesson-5',
          title: 'Module Quiz',
          description: 'Test your understanding of money basics',
          duration: '6 min',
          completed: false,
          locked: false,
          type: 'quiz'
        }
      ],
      skills: ['Financial Awareness', 'Decision Making', 'Planning', 'Critical Thinking'],
      objectives: [
        'Understand what money is and why it matters',
        'Identify different ways to earn money',
        'Distinguish between needs and wants',
        'Make informed spending decisions',
        'Develop healthy saving habits'
      ]
    };

    setModule(mockModule);
    setIsLoading(false);
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
          onClick={() => router.push('/wellbeing')}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg netflix-button"
        >
          Back to Wellbeing
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
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Wellbeing
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-card via-card/95 to-card/80 border border-border rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10"></div>
        <div className="relative z-10">
          <div className="mb-4">
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
              {module.category}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{module.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{module.description}</p>
          
          {/* Progress Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="font-semibold text-foreground">
                {completedLessons}/{module.lessons.length} lessons
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  progressPercentage === 100 ? 'bg-green-500' : 'bg-primary'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {module.duration}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {module.lessons.length} lessons
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" />
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
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Module Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{module.overview}</p>
          </div>

          {/* Learning Objectives */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Learning Objectives
            </h2>
            <ul className="space-y-3">
              {module.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons List */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Lessons</h2>
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
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      lesson.locked
                        ? 'border-border bg-secondary/50 cursor-not-allowed opacity-60'
                        : lesson.completed
                        ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10'
                        : 'border-border hover:border-primary hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <LessonIcon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">Lesson {index + 1}</span>
                          <span className="text-lg">{getTypeIcon(lesson.type)}</span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-sm text-muted-foreground mb-1">{lesson.duration}</div>
                        {!lesson.locked && !lesson.completed && (
                          <Play className="w-5 h-5 text-primary ml-auto" />
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
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {module.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Completion</span>
                  <span className="text-2xl font-bold text-foreground">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      progressPercentage === 100 ? 'bg-green-500' : 'bg-primary'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-semibold text-green-500">{completedLessons}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-semibold text-foreground">
                    {module.lessons.length - completedLessons}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Lessons</span>
                  <span className="font-semibold text-foreground">{module.lessons.length}</span>
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
            className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg netflix-button font-semibold flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {completedLessons === 0 ? 'Start Module' : completedLessons === module.lessons.length ? 'Review Module' : 'Continue Learning'}
          </button>
        </div>
      </div>
    </div>
  );
}
