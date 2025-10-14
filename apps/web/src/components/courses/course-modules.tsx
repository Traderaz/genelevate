'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  FileText, 
  HelpCircle, 
  CheckCircle, 
  Lock, 
  Clock,
  Award,
  Target
} from 'lucide-react';

interface CourseModulesProps {
  courseSlug: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'interactive' | 'quiz' | 'assignment';
  duration: number;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
  pointsValue: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isCompleted: boolean;
  progress: number;
  totalDuration: number;
  totalPoints: number;
}

export function CourseModules({ courseSlug }: CourseModulesProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch course modules from API
    setTimeout(() => {
      setModules([
        {
          id: '1',
          title: 'Introduction to Calculus',
          description: 'Learn the fundamental concepts and historical background of calculus.',
          progress: 100,
          isCompleted: true,
          totalDuration: 120,
          totalPoints: 150,
          lessons: [
            {
              id: '1',
              title: 'What is Calculus?',
              description: 'An introduction to the basic concepts of calculus and its applications.',
              type: 'video',
              duration: 15,
              isCompleted: true,
              isLocked: false,
              progress: 100,
              pointsValue: 25,
            },
            {
              id: '2',
              title: 'Historical Development',
              description: 'Learn about Newton, Leibniz, and the development of calculus.',
              type: 'text',
              duration: 20,
              isCompleted: true,
              isLocked: false,
              progress: 100,
              pointsValue: 20,
            },
            {
              id: '3',
              title: 'Basic Terminology',
              description: 'Key terms and concepts you need to know.',
              type: 'interactive',
              duration: 25,
              isCompleted: true,
              isLocked: false,
              progress: 100,
              pointsValue: 30,
            },
            {
              id: '4',
              title: 'Introduction Quiz',
              description: 'Test your understanding of the basic concepts.',
              type: 'quiz',
              duration: 15,
              isCompleted: true,
              isLocked: false,
              progress: 100,
              pointsValue: 50,
            },
          ],
        },
        {
          id: '2',
          title: 'Limits and Continuity',
          description: 'Master the concept of limits and understand continuity.',
          progress: 75,
          isCompleted: false,
          totalDuration: 180,
          totalPoints: 200,
          lessons: [
            {
              id: '5',
              title: 'Understanding Limits',
              description: 'Learn what limits are and how to calculate them.',
              type: 'video',
              duration: 30,
              isCompleted: true,
              isLocked: false,
              progress: 100,
              pointsValue: 40,
            },
            {
              id: '6',
              title: 'Limit Laws',
              description: 'Explore the fundamental laws of limits.',
              type: 'video',
              duration: 25,
              isCompleted: true,
              isLocked: false,
              progress: 100,
              pointsValue: 35,
            },
            {
              id: '7',
              title: 'Continuity',
              description: 'Understand what makes a function continuous.',
              type: 'text',
              duration: 20,
              isCompleted: true,
              isLocked: false,
              progress: 100,
              pointsValue: 30,
            },
            {
              id: '8',
              title: 'Practice Problems',
              description: 'Apply your knowledge with practice exercises.',
              type: 'interactive',
              duration: 45,
              isCompleted: false,
              isLocked: false,
              progress: 60,
              pointsValue: 45,
            },
            {
              id: '9',
              title: 'Limits and Continuity Quiz',
              description: 'Test your mastery of limits and continuity.',
              type: 'quiz',
              duration: 20,
              isCompleted: false,
              isLocked: false,
              progress: 0,
              pointsValue: 50,
            },
          ],
        },
        {
          id: '3',
          title: 'Derivatives',
          description: 'Learn differentiation and its applications.',
          progress: 0,
          isCompleted: false,
          totalDuration: 240,
          totalPoints: 300,
          lessons: [
            {
              id: '10',
              title: 'Introduction to Derivatives',
              description: 'Understand what derivatives represent.',
              type: 'video',
              duration: 35,
              isCompleted: false,
              isLocked: true,
              progress: 0,
              pointsValue: 40,
            },
            {
              id: '11',
              title: 'Differentiation Rules',
              description: 'Learn the fundamental rules of differentiation.',
              type: 'video',
              duration: 40,
              isCompleted: false,
              isLocked: true,
              progress: 0,
              pointsValue: 45,
            },
            {
              id: '12',
              title: 'Chain Rule',
              description: 'Master the chain rule for complex functions.',
              type: 'text',
              duration: 30,
              isCompleted: false,
              isLocked: true,
              progress: 0,
              pointsValue: 35,
            },
          ],
        },
      ]);
      setLoading(false);
      // Expand first module by default
      setExpandedModules(new Set(['1']));
    }, 1000);
  }, [courseSlug]);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type: string, isCompleted: boolean, isLocked: boolean) => {
    if (isLocked) return <Lock className="w-4 h-4 text-gray-400" />;
    if (isCompleted) return <CheckCircle className="w-4 h-4 text-green-600" />;
    
    switch (type) {
      case 'video': return <Play className="w-4 h-4 text-blue-600" />;
      case 'text': return <FileText className="w-4 h-4 text-gray-600" />;
      case 'quiz': return <HelpCircle className="w-4 h-4 text-purple-600" />;
      case 'interactive': return <Target className="w-4 h-4 text-orange-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Course Content</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Course Content</h2>
        <div className="text-sm text-gray-500">
          {modules.reduce((total, module) => total + module.lessons.length, 0)} lessons • 
          {formatDuration(modules.reduce((total, module) => total + module.totalDuration, 0))}
        </div>
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-lg border overflow-hidden">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {expandedModules.has(module.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {module.title}
                    </h3>
                    {module.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{module.description}</p>
                  
                  {/* Module Progress */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{module.lessons.length} lessons</span>
                      <span>{formatDuration(module.totalDuration)}</span>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{module.totalPoints} points</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{module.progress}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Module Lessons */}
            {expandedModules.has(module.id) && (
              <div className="border-t bg-gray-50">
                {module.lessons.map((lesson, index) => (
                  <div key={lesson.id} className="border-b last:border-b-0 bg-white">
                    {lesson.isLocked ? (
                      <div className="p-4 flex items-center space-x-4 opacity-60">
                        <div className="flex-shrink-0">
                          {getLessonIcon(lesson.type, lesson.isCompleted, lesson.isLocked)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-500">{lesson.title}</h4>
                          <p className="text-sm text-gray-400">{lesson.description}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.duration}m</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>{lesson.pointsValue}</span>
                          </div>
                          <Lock className="w-4 h-4" />
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`/courses/${courseSlug}/lesson/${lesson.id}`}
                        className="block p-4 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {getLessonIcon(lesson.type, lesson.isCompleted, lesson.isLocked)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                            {lesson.progress > 0 && lesson.progress < 100 && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-gray-500">Progress</span>
                                  <span className="font-medium">{lesson.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div 
                                    className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                                    style={{ width: `${lesson.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.duration}m</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Award className="w-4 h-4" />
                              <span>{lesson.pointsValue}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
