'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Video, Calendar, Clock, Users, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { getWebinars, Webinar } from '@/lib/services/webinars';
import { Badge } from '@/components/ui/badge';

interface WebinarGridProps {
  searchParams: {
    search?: string;
    subject?: string;
    yearGroup?: string;
    type?: string;
    status?: string;
    page?: string;
  };
}

export function WebinarGrid({ searchParams }: WebinarGridProps) {
  const { user, loading: authLoading } = useAuth();
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWebinars() {
      if (authLoading) return;
      if (!user) {
        console.log('⚠️ No user, skipping webinar fetch');
        setLoading(false);
        return;
      }

      console.log('✅ User authenticated, fetching webinars');
      setLoading(true);
      
      const filters: any = {};
      
      // Only show scheduled webinars by default (not drafts)
      if (searchParams.status) {
        filters.status = searchParams.status as any;
      } else {
        filters.status = 'scheduled'; // Default to scheduled
      }
      
      if (searchParams.type) {
        filters.type = searchParams.type as any;
      }
      
      if (searchParams.subject) {
        filters.category = searchParams.subject;
      }
      
      if (searchParams.yearGroup) {
        filters.yearGroup = searchParams.yearGroup;
      }

      const fetchedWebinars = await getWebinars(filters);
      console.log(`📺 Fetched ${fetchedWebinars.length} webinars`);
      setWebinars(fetchedWebinars);
      setLoading(false);
    }

    fetchWebinars();
  }, [user, authLoading, searchParams.status, searchParams.type, searchParams.subject, searchParams.yearGroup]);

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-[#e50914] animate-spin" />
      </div>
    );
  }

  if (webinars.length === 0) {
    return (
      <div className="text-center py-16">
        <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No webinars available yet</h3>
        <p className="text-gray-400 mb-6">Check back soon for upcoming live sessions and workshops</p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Coming soon</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {webinars.map((webinar) => {
        const isLive = webinar.status === 'live';
        const isScheduled = webinar.status === 'scheduled';
        const isCompleted = webinar.status === 'completed';
        
        // Format date
        const webinarDate = new Date(`${webinar.scheduledDate}T${webinar.scheduledTime}`);
        const formattedDate = webinarDate.toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        });
        const formattedTime = webinarDate.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });

        return (
          <Link
            key={webinar.id}
            href={`/webinars/${webinar.id}`}
            className="group bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden hover:border-[#e50914] transition-all"
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-[#e50914] to-[#831010] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="w-16 h-16 text-white/30" />
              </div>
              <div className="absolute top-3 left-3">
                <Badge 
                  className={
                    isLive ? 'bg-red-500 text-white animate-pulse' :
                    isScheduled ? 'bg-green-500 text-white' :
                    'bg-gray-500 text-white'
                  }
                >
                  {isLive ? '🔴 Live Now' : isScheduled ? 'Upcoming' : 'Completed'}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-black/50 text-white border-none">
                  {webinar.type === 'live' ? 'Live' : 'Pre-recorded'}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="border-gray-700 text-gray-300">
                  {webinar.category}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#e50914] transition-colors line-clamp-2">
                {webinar.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {webinar.description}
              </p>

              {/* Metadata */}
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate} at {formattedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{webinar.duration} minutes</span>
                </div>
                {webinar.registeredCount > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{webinar.registeredCount} registered</span>
                  </div>
                )}
              </div>

              {/* Host */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                  {webinar.hostName.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium">{webinar.hostName}</p>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-[#e50914] to-[#b00710] text-white px-4 py-2.5 rounded-md text-sm font-medium hover:from-[#b00710] hover:to-[#e50914] transition-all">
                {isLive ? '🔴 Join Live Now' : 
                 isScheduled ? 'Register' : 
                 'Watch Recording'}
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
