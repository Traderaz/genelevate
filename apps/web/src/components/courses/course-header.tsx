'use client';

import { useState, useEffect } from 'react';
import { Clock, Users, Star, BookOpen, Award, Calendar } from 'lucide-react';

interface CourseHeaderProps {
  courseSlug: string;
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  duration: number;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subject: string;
  yearGroups: string[];
  totalLessons: number;
  lastUpdated: string;
  learningOutcomes: string[];
  isEnrolled?: boolean;
  progress?: number;
}

export function CourseHeader({ courseSlug }: CourseHeaderProps) {
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch course data from API
    setTimeout(() => {
      setCourse({
        id: '1',
        title: 'Advanced Mathematics: Calculus Fundamentals',
        description: 'Master the fundamentals of calculus with this comprehensive course designed for A-Level students. Learn derivatives, integrals, limits, and their real-world applications through interactive lessons, practice problems, and expert guidance.',
        shortDescription: 'Master calculus fundamentals with interactive lessons and real-world applications.',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
        instructor: {
          name: 'Dr. Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
          bio: 'PhD in Mathematics from Cambridge University with 15+ years of teaching experience.',
        },
        duration: 480, // 8 hours
        enrollmentCount: 1247,
        rating: 4.8,
        reviewCount: 234,
        difficulty: 'advanced',
        subject: 'Mathematics',
        yearGroups: ['Year 12', 'Year 13'],
        totalLessons: 24,
        lastUpdated: '2024-01-15',
        learningOutcomes: [
          'Understand the fundamental concepts of limits and continuity',
          'Master differentiation techniques and applications',
          'Learn integration methods and their real-world uses',
          'Apply calculus to solve complex mathematical problems',
          'Prepare effectively for A-Level mathematics examinations',
        ],
        isEnrolled: true,
        progress: 65,
      });
      setLoading(false);
    }, 1000);
  }, [courseSlug]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border overflow-hidden animate-pulse">
        <div className="h-64 bg-gray-200" />
        <div className="p-8 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Course Banner */}
      <div className="relative h-64 md:h-80">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Course Badges */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
          <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            {course.subject}
          </span>
          {course.isEnrolled && (
            <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              Enrolled
            </span>
          )}
        </div>

        {/* Course Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {course.title}
          </h1>
          <p className="text-blue-100 text-lg">
            {course.shortDescription}
          </p>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-8">
        {/* Progress Bar (if enrolled) */}
        {course.isEnrolled && course.progress !== undefined && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-900">Your Progress</span>
              <span className="text-sm font-bold text-blue-900">{course.progress}% Complete</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="text-xs text-blue-700 mt-2">
              Keep going! You're doing great.
            </p>
          </div>
        )}

        {/* Course Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">{formatDuration(course.duration)}</div>
            <div className="text-sm text-gray-500">Duration</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">{course.totalLessons}</div>
            <div className="text-sm text-gray-500">Lessons</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">{course.rating}</div>
            <div className="text-sm text-gray-500">{course.reviewCount} reviews</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-gray-900">{course.enrollmentCount.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Students</div>
          </div>
        </div>

        {/* Course Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Course</h2>
          <p className="text-gray-600 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {course.learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <Award className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-gray-600">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Year Groups:</span>
            <span className="font-medium">{course.yearGroups.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
