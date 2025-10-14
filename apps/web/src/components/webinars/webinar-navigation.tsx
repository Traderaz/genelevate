'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Settings, MoreVertical, Maximize, Minimize } from 'lucide-react';

interface WebinarNavigationProps {
  webinarId: string;
}

interface WebinarNavData {
  title: string;
  host: string;
  currentAttendees: number;
  status: 'scheduled' | 'live' | 'ended';
  duration: string;
}

export function WebinarNavigation({ webinarId }: WebinarNavigationProps) {
  const [webinar, setWebinar] = useState<WebinarNavData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch webinar navigation data from API
    setTimeout(() => {
      setWebinar({
        title: 'Advanced Calculus: Integration Techniques',
        host: 'Dr. Sarah Johnson',
        currentAttendees: 73,
        status: 'live',
        duration: '45:32',
      });
      setLoading(false);
    }, 500);
  }, [webinarId]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleLeaveWebinar = () => {
    if (confirm('Are you sure you want to leave the webinar?')) {
      // TODO: Leave webinar logic
      window.location.href = `/webinars/${webinarId}`;
    }
  };

  if (loading) {
    return (
      <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-700 rounded" />
          <div className="w-48 h-4 bg-gray-700 rounded" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-8 bg-gray-700 rounded" />
          <div className="w-8 h-8 bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (!webinar) return null;

  return (
    <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 text-white">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <Link
          href={`/webinars/${webinarId}`}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </Link>
        
        <div className="hidden md:block h-6 w-px bg-gray-600" />
        
        <div className="hidden md:block">
          <h1 className="font-semibold truncate max-w-xs lg:max-w-md">
            {webinar.title}
          </h1>
          <p className="text-sm text-gray-400">
            Hosted by {webinar.host}
          </p>
        </div>
      </div>

      {/* Center - Mobile Title */}
      <div className="md:hidden flex-1 text-center">
        <h1 className="font-semibold truncate">
          {webinar.title}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Live Status */}
        {webinar.status === 'live' && (
          <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">LIVE</span>
            <span className="text-sm">{webinar.duration}</span>
          </div>
        )}

        {/* Participants Count */}
        <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-lg">
          <Users className="w-4 h-4" />
          <span className="text-sm">{webinar.currentAttendees}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>

          <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <div className="relative">
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleLeaveWebinar}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}
