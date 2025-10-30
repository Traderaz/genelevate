'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Video, Users, Clock, ArrowRight, Zap } from 'lucide-react';

interface LiveWebinar {
  id: string;
  title: string;
  host: {
    name: string;
    avatar: string;
  };
  currentAttendees: number;
  maxAttendees: number;
  startedAt: Date;
  subject: string;
  thumbnail: string;
}

export function LiveWebinars() {
  const [liveWebinars, setLiveWebinars] = useState<LiveWebinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch live webinars from Firestore
    // For now, show no live webinars
    setLiveWebinars([]);
    setLoading(false);
  }, []);

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60);
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m ago`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (liveWebinars.length === 0) {
    return null; // Don't show anything if no live webinars
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="text-white font-semibold">LIVE NOW</span>
            </div>
            <span className="text-white/80">•</span>
            <span className="text-white">{liveWebinars.length} active session{liveWebinars.length !== 1 ? 's' : ''}</span>
          </div>
          <Link 
            href="/webinars?status=live"
            className="text-white hover:text-white/80 text-sm font-medium flex items-center space-x-1"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveWebinars.map((webinar) => (
            <Link
              key={webinar.id}
              href={`/webinars/${webinar.id}/join`}
              className="group flex items-center space-x-4 p-4 rounded-lg border hover:border-red-200 hover:bg-red-50 transition-all duration-200"
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={webinar.thumbnail} 
                  alt={webinar.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate group-hover:text-red-700">
                  {webinar.title}
                </h4>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-1">
                    <img 
                      src={webinar.host.avatar} 
                      alt={webinar.host.name}
                      className="w-4 h-4 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{webinar.host.name}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{webinar.subject}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{webinar.currentAttendees}/{webinar.maxAttendees}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Started {formatDuration(webinar.startedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="bg-red-500 group-hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors">
                  Join
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
