'use client';

import { useState, useEffect } from 'react';
import { Star, Users, BookOpen, Award, MessageCircle } from 'lucide-react';

interface CourseInstructorProps {
  courseSlug: string;
}

interface InstructorData {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  yearsExperience: number;
  specializations: string[];
  achievements: string[];
}

export function CourseInstructor({ courseSlug }: CourseInstructorProps) {
  const [instructor, setInstructor] = useState<InstructorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch instructor data from API
    setTimeout(() => {
      setInstructor({
        id: '1',
        name: 'Dr. Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face',
        title: 'Professor of Mathematics',
        bio: 'Dr. Sarah Johnson is a renowned mathematician with over 15 years of teaching experience. She holds a PhD in Mathematics from Cambridge University and has published numerous research papers in the field of calculus and mathematical analysis.',
        rating: 4.9,
        totalStudents: 12847,
        totalCourses: 8,
        yearsExperience: 15,
        specializations: ['Calculus', 'Mathematical Analysis', 'Linear Algebra', 'Statistics'],
        achievements: [
          'PhD in Mathematics, Cambridge University',
          'Published 25+ research papers',
          'Excellence in Teaching Award 2023',
          'Mathematics Department Head',
        ],
      });
      setLoading(false);
    }, 500);
  }, [courseSlug]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!instructor) return null;

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      {/* Instructor Header */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Your Instructor</h3>
        
        <div className="flex items-start space-x-4">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{instructor.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{instructor.title}</p>
            
            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{instructor.rating}</span>
              <span className="text-sm text-gray-500">instructor rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-lg font-bold text-gray-900">
            {instructor.totalStudents.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Students</div>
        </div>

        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2">
            <BookOpen className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-lg font-bold text-gray-900">{instructor.totalCourses}</div>
          <div className="text-xs text-gray-600">Courses</div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h5 className="font-medium text-gray-900 mb-2">About</h5>
        <p className="text-sm text-gray-600 leading-relaxed">{instructor.bio}</p>
      </div>

      {/* Specializations */}
      <div>
        <h5 className="font-medium text-gray-900 mb-3">Specializations</h5>
        <div className="flex flex-wrap gap-2">
          {instructor.specializations.map((spec, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h5 className="font-medium text-gray-900 mb-3">Achievements</h5>
        <ul className="space-y-2">
          {instructor.achievements.map((achievement, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
              <Award className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Button */}
      <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
        <MessageCircle className="w-4 h-4" />
        <span>Message Instructor</span>
      </button>
    </div>
  );
}
