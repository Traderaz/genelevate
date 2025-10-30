'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Users, Video } from 'lucide-react';
import { getWebinar } from '@/lib/services/webinars';
import { useAuth } from '@/contexts/auth-context';
import type { Webinar } from '@/lib/services/webinars';

export default function WebinarPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = params?.id as string;

  useEffect(() => {
    async function fetchWebinar() {
      if (!id || !user) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getWebinar(id);
        
        if (!data) {
          setError('Webinar not found');
          return;
        }

        setWebinar(data);
      } catch (err) {
        console.error('Error fetching webinar:', err);
        setError('Failed to load webinar');
      } finally {
        setLoading(false);
      }
    }

    fetchWebinar();
  }, [id, user]);

  // Extract video ID from YouTube/Vimeo URLs
  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
    }
    
    // Vimeo Live Event
    if (url.includes('vimeo.com/live/broadcaster/event/')) {
      // Extract event ID from URLs like: vimeo.com/live/broadcaster/event/54877326
      const eventId = url.match(/\/event\/(\d+)/)?.[1];
      if (eventId) {
        return `https://vimeo.com/event/${eventId}/embed`;
      }
    }
    
    // Vimeo Event (direct event URLs)
    if (url.includes('vimeo.com/event/')) {
      const eventId = url.match(/\/event\/(\d+)/)?.[1];
      if (eventId) {
        return `https://vimeo.com/event/${eventId}/embed`;
      }
    }
    
    // Vimeo Regular Video
    if (url.includes('vimeo.com')) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : null;
    }

    // Zoom (return original URL, it should already be an embed URL)
    if (url.includes('zoom.us')) {
      return url;
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading webinar...</p>
        </div>
      </div>
    );
  }

  if (error || !webinar) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{error || 'Webinar not found'}</h2>
          <button
            onClick={() => router.push('/webinars')}
            className="text-red-600 hover:text-red-500 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Webinars
          </button>
        </div>
      </div>
    );
  }

  const embedUrl = webinar.streamUrl ? getEmbedUrl(webinar.streamUrl) : null;

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.push('/webinars')}
          className="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Video Player */}
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : webinar.videoUrl ? (
          <video
            src={webinar.videoUrl}
            className="absolute top-0 left-0 w-full h-full"
            controls
            autoPlay
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-900 to-red-700 flex items-center justify-center">
            <div className="text-center">
              <Video className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70">Stream URL not available</p>
            </div>
          </div>
        )}
      </div>

      {/* Webinar Info */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Title and Basic Info */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">{webinar.title}</h1>
            <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {webinar.scheduledAt
                    ? new Date(webinar.scheduledAt.seconds * 1000).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Date not set'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {webinar.scheduledAt
                    ? new Date(webinar.scheduledAt.seconds * 1000).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Time not set'}
                </span>
              </div>
              {webinar.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{webinar.duration} minutes</span>
                </div>
              )}
              {webinar.maxParticipants && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {webinar.registeredCount || 0} / {webinar.maxParticipants} registered
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {webinar.description && (
            <div className="bg-[#1e1e1e] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-3">About This Webinar</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{webinar.description}</p>
            </div>
          )}

          {/* Instructor */}
          {webinar.instructor && (
            <div className="bg-[#1e1e1e] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-3">Instructor</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xl font-bold">
                  {webinar.instructor.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium text-lg">{webinar.instructor}</p>
                  {webinar.instructorBio && (
                    <p className="text-gray-400 text-sm">{webinar.instructorBio}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
