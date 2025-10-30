'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Users, Clock, Video, Bell } from 'lucide-react';

export function WebinarBanner() {
  const [nextWebinar, setNextWebinar] = useState<any>(null);
  const [timeUntil, setTimeUntil] = useState<string>('');

  useEffect(() => {
    // TODO: Fetch next webinar from Firestore
    // For now, show no upcoming webinar
    setNextWebinar(null);
  }, []);

  useEffect(() => {
    if (!nextWebinar) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const webinarTime = new Date(nextWebinar.scheduledAt).getTime();
      const difference = webinarTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntil(`${hours}h ${minutes}m`);
      } else {
        setTimeUntil('Starting now!');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextWebinar]);

  if (!nextWebinar) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Live Interactive Learning 🎓
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Join expert-led webinars and engage with fellow students in real-time
          </p>
          <div className="flex items-center justify-center space-x-6 text-white/90">
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>HD Video Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Interactive Chat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Attendance Tracking</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                NEXT WEBINAR
              </span>
              <span className="text-white/80 text-sm">{nextWebinar.subject}</span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              {nextWebinar.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-white/90 mb-4">
              <div className="flex items-center space-x-2">
                <img 
                  src={nextWebinar.host.avatar} 
                  alt={nextWebinar.host.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{nextWebinar.host.name}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(nextWebinar.scheduledAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(nextWebinar.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-white/80">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{nextWebinar.currentAttendees}/{nextWebinar.maxAttendees} registered</span>
              </div>
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(nextWebinar.currentAttendees / nextWebinar.maxAttendees) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end space-y-4">
            <div className="text-center lg:text-right">
              <div className="text-3xl font-bold text-white">{timeUntil}</div>
              <div className="text-white/80">until start</div>
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Set Reminder
              </button>
              <Link
                href={`/webinars/${nextWebinar.id}`}
                className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Join Webinar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white/5 rounded-full" />
    </div>
  );
}
