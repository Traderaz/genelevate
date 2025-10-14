'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Star, Video, Globe } from 'lucide-react';

interface WebinarHeaderProps {
  webinarId: string;
}

interface WebinarData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  host: {
    name: string;
    avatar: string;
    bio: string;
  };
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'live' | 'ended';
  subject: string;
  yearGroups: string[];
  currentAttendees: number;
  maxAttendees: number;
  rating: number;
  reviewCount: number;
}

export function WebinarHeader({ webinarId }: WebinarHeaderProps) {
  const [webinar, setWebinar] = useState<WebinarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch webinar data from API
    setTimeout(() => {
      setWebinar({
        id: webinarId,
        title: 'Advanced Calculus: Integration Techniques',
        description: 'Join us for an in-depth exploration of advanced integration techniques including integration by parts, trigonometric substitution, and partial fractions. This interactive session will help you master these essential calculus concepts.',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
        host: {
          name: 'Dr. Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
          bio: 'PhD in Mathematics from Cambridge University with 15+ years of teaching experience.',
        },
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: 90,
        status: 'scheduled',
        subject: 'Mathematics',
        yearGroups: ['Year 12', 'Year 13'],
        currentAttendees: 73,
        maxAttendees: 100,
        rating: 4.8,
        reviewCount: 45,
      });
      setLoading(false);
    }, 1000);
  }, [webinarId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 text-white';
      case 'scheduled': return 'bg-blue-500 text-white';
      case 'ended': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'LIVE NOW';
      case 'scheduled': return 'SCHEDULED';
      case 'ended': return 'ENDED';
      default: return 'UNKNOWN';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border overflow-hidden animate-pulse">
        <div className="h-64 bg-gray-200" />
        <div className="p-8 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <p className="text-gray-500">Webinar not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Webinar Banner */}
      <div className="relative h-64 md:h-80">
        <img 
          src={webinar.thumbnail} 
          alt={webinar.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-6 left-6">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(webinar.status)}`}>
            {getStatusText(webinar.status)}
          </span>
        </div>

        {/* Subject Badge */}
        <div className="absolute top-6 right-6">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
            {webinar.subject}
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {webinar.title}
          </h1>
          <p className="text-blue-100 text-lg">
            {webinar.description}
          </p>
        </div>
      </div>

      {/* Webinar Info */}
      <div className="p-8">
        {/* Host Info */}
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src={webinar.host.avatar} 
            alt={webinar.host.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{webinar.host.name}</h3>
            <p className="text-gray-600">{webinar.host.bio}</p>
          </div>
        </div>

        {/* Webinar Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">
              {webinar.scheduledAt.toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">Date</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">{webinar.duration} min</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">
              {webinar.currentAttendees}/{webinar.maxAttendees}
            </div>
            <div className="text-xs text-gray-500">Registered</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">{webinar.rating}</div>
            <div className="text-xs text-gray-500">{webinar.reviewCount} reviews</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-2">
              <Globe className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">Online</div>
            <div className="text-xs text-gray-500">Format</div>
          </div>
        </div>

        {/* Year Groups */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Suitable for:</span>
          {webinar.yearGroups.map((yearGroup, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {yearGroup}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
