'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, Star, ArrowRight, Play, BookOpen } from 'lucide-react';

interface FeaturedCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
  };
  duration: number;
  enrollmentCount: number;
  rating: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subject: string;
  slug: string;
  progress?: number; // If user is enrolled
  isEnrolled?: boolean;
}

export function FeaturedCourses() {
  const [courses, setCourses] = useState<FeaturedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch featured courses from API
    setTimeout(() => {
      setCourses([
        {
          id: '1',
          title: 'Advanced Mathematics: Calculus Fundamentals',
          description: 'Master the fundamentals of calculus with interactive lessons and real-world applications.',
          thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=225&fit=crop',
          instructor: {
            name: 'Dr. Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          },
          duration: 480, // 8 hours
          enrollmentCount: 1247,
          rating: 4.8,
          difficulty: 'advanced',
          subject: 'Mathematics',
          slug: 'advanced-mathematics-calculus',
          progress: 65,
          isEnrolled: true,
        },
        {
          id: '2',
          title: 'English Literature: Shakespeare Analysis',
          description: 'Dive deep into Shakespeare\'s works with expert analysis and critical thinking exercises.',
          thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop',
          instructor: {
            name: 'Prof. Michael Chen',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          },
          duration: 360, // 6 hours
          enrollmentCount: 892,
          rating: 4.9,
          difficulty: 'intermediate',
          subject: 'English',
          slug: 'english-literature-shakespeare',
        },
        {
          id: '3',
          title: 'Physics: Quantum Mechanics Basics',
          description: 'Explore the fascinating world of quantum physics with interactive simulations.',
          thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=225&fit=crop',
          instructor: {
            name: 'Dr. Emily Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
          },
          duration: 540, // 9 hours
          enrollmentCount: 654,
          rating: 4.7,
          difficulty: 'advanced',
          subject: 'Physics',
          slug: 'physics-quantum-mechanics',
          progress: 23,
          isEnrolled: true,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

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
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
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
        <h2 className="text-2xl font-bold tracking-tight">Featured Courses</h2>
        <Link 
          href="/courses" 
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
        >
          <span>View all</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
            {/* Course Thumbnail */}
            <div className="relative">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              {course.isEnrolled && (
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Enrolled
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              </div>
              {course.isEnrolled && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Link 
                    href={`/courses/${course.slug}/lesson/1`}
                    className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Continue</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm font-medium text-blue-600">{course.subject}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link href={`/courses/${course.slug}`} className="hover:text-blue-600">
                  {course.title}
                </Link>
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Progress Bar (if enrolled) */}
              {course.isEnrolled && course.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Instructor */}
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-600">{course.instructor.name}</span>
              </div>

              {/* Course Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrollmentCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                {course.isEnrolled ? (
                  <Link 
                    href={`/courses/${course.slug}/lesson/1`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Continue Learning</span>
                  </Link>
                ) : (
                  <Link 
                    href={`/courses/${course.slug}`}
                    className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View Course</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
