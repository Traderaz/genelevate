'use client';

import { useState, useEffect } from 'react';
import { Star, Users, BookOpen, Award, MessageCircle } from 'lucide-react';

interface WebinarHostProps {
  webinarId: string;
}

interface HostData {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  rating: number;
  totalWebinars: number;
  totalStudents: number;
  specializations: string[];
  achievements: string[];
}

export function WebinarHost({ webinarId }: WebinarHostProps) {
  const [host, setHost] = useState<HostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch host data from API
    setTimeout(() => {
      setHost({
        id: '1',
        name: 'Dr. Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face',
        title: 'Professor of Mathematics',
        bio: 'Dr. Sarah Johnson is a renowned mathematician with over 15 years of teaching experience.',
        rating: 4.9,
        totalWebinars: 45,
        totalStudents: 2847,
        specializations: ['Calculus', 'Linear Algebra', 'Statistics'],
        achievements: [
          'PhD in Mathematics, Cambridge University',
          'Excellence in Teaching Award 2023',
          'Published 25+ research papers',
        ],
      });
      setLoading(false);
    }, 500);
  }, [webinarId]);

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

  if (!host) return null;

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h3 className="font-semibold text-gray-900">Your Host</h3>
      
      <div className="flex items-start space-x-4">
        <img
          src={host.avatar}
          alt={host.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{host.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{host.title}</p>
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{host.rating}</span>
            <span className="text-sm text-gray-500">host rating</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{host.bio}</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{host.totalWebinars}</div>
          <div className="text-xs text-gray-600">Webinars</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{host.totalStudents.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Students</div>
        </div>
      </div>

      <div>
        <h5 className="font-medium text-gray-900 mb-3">Specializations</h5>
        <div className="flex flex-wrap gap-2">
          {host.specializations.map((spec, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
        <MessageCircle className="w-4 h-4" />
        <span>Message Host</span>
      </button>
    </div>
  );
}
