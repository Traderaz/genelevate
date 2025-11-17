'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { useAuth } from '@/contexts/auth-context';
// Removed Daily.co integration - using Teams/Zoom links directly
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  Users,
  Video,
  ArrowLeft,
  Play,
  Loader2,
  AlertCircle,
  CheckCircle,
  Bell,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Webinar {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  scheduledAt: any;
  duration: number;
  host: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    credentials?: string;
  };
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  recordingUrl?: string;
  meetingLink?: string; // Teams/Zoom link
  dailyRoomUrl?: string; // Legacy field (now used for Teams/Zoom)
  providerJoinUrl?: string; // Legacy field
  maxAttendees?: number;
  currentAttendees: number;
  subject?: string;
  tags: string[];
  agenda?: Array<{
    id: string;
    title: string;
    description?: string;
    startTime: number;
    duration: number;
  }>;
  materials?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    description?: string;
  }>;
}

function WebinarDetailPageContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const webinarId = params.id as string;

  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (webinarId) {
      loadWebinar();
    }
  }, [webinarId]);

  const loadWebinar = async () => {
    setLoading(true);
    try {
      const webinarRef = doc(db, 'webinars', webinarId);
      const docSnap = await getDoc(webinarRef);

      if (docSnap.exists()) {
        setWebinar({
          id: docSnap.id,
          ...docSnap.data(),
        } as Webinar);
      } else {
        toast.error('Webinar not found.');
        router.push('/webinars');
      }
    } catch (error) {
      console.error('Error loading webinar:', error);
      toast.error('Failed to load webinar details.');
      router.push('/webinars');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin h-12 w-12 text-teal-gold" />
        </div>
      </NetflixDashboardLayout>
    );
  }

  if (!webinar) {
    return null;
  }

  const scheduledDate = webinar.scheduledAt?.toDate?.() || new Date(webinar.scheduledAt);
  const endTime = new Date(scheduledDate.getTime() + webinar.duration * 60 * 1000);
  const now = new Date();
  const isLive = webinar.status === 'live' && now >= scheduledDate && now <= endTime;
  const isUpcoming = webinar.status === 'scheduled' && now < scheduledDate;
  const isEnded = webinar.status === 'ended' || now > endTime;
  const isHost = user && webinar.host.id === user.uid;

  // Get the Teams/Zoom meeting link
  const meetingLink = webinar.dailyRoomUrl || webinar.providerJoinUrl || webinar.meetingLink;

  const getStatusBadge = () => {
    if (isLive) {
      return (
        <span className="px-4 py-2 bg-red-500/20 text-red-400 text-sm font-semibold rounded-full border border-red-500/30 animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
          LIVE NOW
        </span>
      );
    } else if (isUpcoming) {
      return (
        <span className="px-4 py-2 bg-teal-gold/20 text-teal-gold text-sm font-semibold rounded-full border border-teal-gold/30">
          Upcoming
        </span>
      );
    } else if (isEnded) {
      return (
        <span className="px-4 py-2 bg-gray-500/20 text-gray-400 text-sm font-semibold rounded-full border border-gray-500/30">
          Ended
        </span>
      );
    }
    return null;
  };

  return (
    <NetflixDashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <Link
          href="/webinars"
          className="inline-flex items-center gap-2 text-teal-gold hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Webinars
        </Link>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl teal-card-glass border-2 border-white/20">
          {/* Thumbnail Background */}
          {webinar.thumbnail && (
            <div className="absolute inset-0 opacity-20">
              <img
                src={webinar.thumbnail}
                alt={webinar.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          )}

          <div className="relative z-10 p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {getStatusBadge()}
                  {webinar.subject && (
                    <span className="px-3 py-1 bg-teal-primary/20 text-teal-primary text-xs font-semibold rounded-full border border-teal-primary/30">
                      {webinar.subject}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">{webinar.title}</h1>
                <p className="text-white/80 text-lg max-w-3xl">{webinar.description}</p>
              </div>
            </div>

            {/* Webinar Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Calendar className="w-5 h-5 text-teal-gold" />
                <div>
                  <p className="text-xs text-white/60">Date</p>
                  <p className="text-sm font-semibold text-white">
                    {scheduledDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Clock className="w-5 h-5 text-teal-gold" />
                <div>
                  <p className="text-xs text-white/60">Time & Duration</p>
                  <p className="text-sm font-semibold text-white">
                    {scheduledDate.toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    ({webinar.duration} mins)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Users className="w-5 h-5 text-teal-gold" />
                <div>
                  <p className="text-xs text-white/60">Attendees</p>
                  <p className="text-sm font-semibold text-white">
                    {webinar.currentAttendees}
                    {webinar.maxAttendees ? ` / ${webinar.maxAttendees}` : ''} registered
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              {isLive && user && meetingLink && (
                <a
                  href={meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  <Video className="w-5 h-5" />
                  {isHost ? 'Start Hosting on Teams/Zoom' : 'Join Live Webinar'}
                </a>
              )}

              {isEnded && webinar.recordingUrl && (
                <Link
                  href={webinar.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 teal-button-primary font-semibold rounded-lg transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Watch Recording
                </Link>
              )}

              {isUpcoming && (
                <button
                  onClick={() => toast.info('Registration feature coming soon!')}
                  className="inline-flex items-center gap-2 px-6 py-3 teal-button-primary font-semibold rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  Register for Webinar
                </button>
              )}

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Link copied to clipboard!');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Host Info */}
        <div className="teal-card border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-teal-card-text mb-4">About the Host</h2>
          <div className="flex items-start gap-4">
            {webinar.host.avatar ? (
              <img
                src={webinar.host.avatar}
                alt={webinar.host.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-gold to-teal-primary flex items-center justify-center text-2xl font-bold text-white">
                {webinar.host.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-teal-card-text text-lg">
                {webinar.host.name}
              </h3>
              {webinar.host.credentials && (
                <p className="text-sm text-teal-card-text-muted mb-2">
                  {webinar.host.credentials}
                </p>
              )}
              {webinar.host.bio && (
                <p className="text-sm text-teal-card-text-muted">{webinar.host.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Agenda */}
        {webinar.agenda && webinar.agenda.length > 0 && (
          <div className="teal-card border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-teal-card-text mb-4">Agenda</h2>
            <div className="space-y-3">
              {webinar.agenda.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white/5 border border-white/20 rounded-lg"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-gold/20 text-teal-gold rounded-full font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-teal-card-text">{item.title}</h3>
                      <span className="text-xs text-teal-card-text-muted">
                        {item.duration} mins
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-teal-card-text-muted">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Materials */}
        {webinar.materials && webinar.materials.length > 0 && (
          <div className="teal-card border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-teal-card-text mb-4">
              Course Materials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {webinar.materials.map((material) => (
                <Link
                  key={material.id}
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-lg hover:border-teal-gold/50 transition-colors"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-teal-gold/20 text-teal-gold rounded-lg">
                    📄
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-teal-card-text text-sm">
                      {material.name}
                    </p>
                    {material.description && (
                      <p className="text-xs text-teal-card-text-muted">
                        {material.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {webinar.tags && webinar.tags.length > 0 && (
          <div className="teal-card border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-teal-card-text mb-4">Topics Covered</h2>
            <div className="flex flex-wrap gap-2">
              {webinar.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-primary/10 border border-teal-primary/30 text-teal-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </NetflixDashboardLayout>
  );
}

export default function WebinarDetailPage() {
  return (
    <BasicPlanGuard redirectTo="/webinars">
      <WebinarDetailPageContent />
    </BasicPlanGuard>
  );
}
