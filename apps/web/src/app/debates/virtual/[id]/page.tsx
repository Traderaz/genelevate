'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { useAuth } from '@/contexts/auth-context';
import { VirtualDebate } from '@/types/virtual-debates';
import { Calendar, Clock, Users, Video, ArrowLeft, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { LiveDebateRoom } from '@/components/debates/live-debate-room';
import { DebateAdminControls } from '@/components/admin/debate-admin-controls';

function VirtualDebateDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const debateId = params.id as string;

  const [debate, setDebate] = useState<VirtualDebate | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLiveRoom, setShowLiveRoom] = useState(false);

  useEffect(() => {
    if (debateId) {
      loadDebate();
    }
  }, [debateId]);

  const loadDebate = async () => {
    setLoading(true);
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const debateDoc = await getDoc(doc(db, 'virtualDebates', debateId));
      
      if (debateDoc.exists()) {
        setDebate({ id: debateDoc.id, ...debateDoc.data() } as VirtualDebate);
      }
    } catch (error) {
      console.error('Error loading debate:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-gold"></div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  if (!debate) {
    return (
      <NetflixDashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <Link 
            href="/debates/virtual"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Virtual Debates
          </Link>

          <div className="teal-card border border-white/20 rounded-xl p-12 text-center">
            <h3 className="text-xl font-semibold text-teal-card-text mb-2">
              Debate not found
            </h3>
            <p className="text-teal-card-text-muted">
              This debate may have been removed or the link is incorrect.
            </p>
          </div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  const scheduledDate = debate.scheduledTime?.toDate?.() || new Date();
  const endTime = new Date(scheduledDate.getTime() + debate.durationMinutes * 60 * 1000);
  const now = new Date();
  
  // Use the status from Firestore as the source of truth
  const isLive = debate.status === 'live';
  const isUpcoming = debate.status === 'scheduled' && now < scheduledDate;
  const isCompleted = debate.status === 'completed' || now > endTime;
  const isParticipant = user && debate.participants.includes(user.uid);
  
  // Check if user is admin
  const isAdmin = user?.email === 'ziyad@genelevate.co.uk' || user?.uid === debate.hostId;

  // Show live room if requested
  if (showLiveRoom && isLive && user) {
    return (
      <LiveDebateRoom
        roomUrl={debate.meetingLink}
        isParticipant={!!isParticipant}
        userName={user.displayName || user.email || 'Anonymous'}
        onLeave={() => setShowLiveRoom(false)}
      />
    );
  }

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
    } else {
      return (
        <span className="px-4 py-2 bg-gray-500/20 text-gray-400 text-sm font-semibold rounded-full border border-gray-500/30">
          Completed
        </span>
      );
    }
  };

  return (
    <NetflixDashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Button */}
        <Link 
          href="/debates/virtual"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Virtual Debates
        </Link>

        {/* Header */}
        <div className="teal-card-glass border-2 border-white/20 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {getStatusBadge()}
                {isParticipant && (
                  <span className="px-4 py-2 bg-teal-primary/20 text-teal-primary text-sm font-semibold rounded-full border border-teal-primary/30">
                    You're a Participant
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">{debate.title}</h1>
              <p className="text-white/80 text-lg">{debate.description}</p>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-teal-gold" />
                <div>
                  <div className="text-sm text-white/70">Date</div>
                  <div className="text-white font-semibold">
                    {scheduledDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-teal-gold" />
                <div>
                  <div className="text-sm text-white/70">Time</div>
                  <div className="text-white font-semibold">
                    {scheduledDate.toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-teal-gold" />
                <div>
                  <div className="text-sm text-white/70">Duration</div>
                  <div className="text-white font-semibold">{debate.durationMinutes} minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="teal-card border-2 border-white/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-teal-card-text mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-gold" />
            Participants
          </h2>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-teal-card-text">
              <span className="font-bold text-teal-gold">{debate.participants.length}</span> invited speaker{debate.participants.length !== 1 ? 's' : ''}
            </p>
            <p className="text-teal-card-text-muted text-sm mt-2">
              {isParticipant 
                ? "You have been selected to participate as a speaker in this debate!"
                : "Selected top performers from monthly debate submissions"}
            </p>
          </div>
        </div>

        {/* Join/Watch Section */}
        {isLive ? (
          <div className="teal-card border-2 border-red-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-red-400 animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-teal-card-text mb-2">Debate is Live Now!</h3>
                <p className="text-teal-card-text-muted mb-4">
                  {isParticipant 
                    ? "Click below to join the debate as a speaker"
                    : "Click below to watch the live debate"}
                </p>
                <button
                  onClick={() => setShowLiveRoom(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                >
                  <Video className="w-5 h-5" />
                  {isParticipant ? 'Join Live Debate' : 'Watch Live Debate'}
                </button>
              </div>
            </div>
          </div>
        ) : isUpcoming ? (
          <div className="teal-card border-2 border-teal-gold/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-teal-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-card-text mb-2">Debate Starts Soon</h3>
                <p className="text-teal-card-text-muted mb-3">
                  {isParticipant 
                    ? "The meeting link will become active when the debate starts. Make sure you're prepared!"
                    : "Come back at the scheduled time to watch the live debate."}
                </p>
                <div className="text-sm text-teal-card-text-muted">
                  Meeting Link: <span className="font-mono text-teal-gold">{debate.meetingLink}</span>
                </div>
              </div>
            </div>
          </div>
        ) : isCompleted && debate.recordingUrl ? (
          <div className="teal-card border-2 border-teal-primary/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-teal-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-teal-card-text mb-2">Recording Available</h3>
                <p className="text-teal-card-text-muted mb-4">
                  Watch the recording of this debate
                </p>
                <a
                  href={debate.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 teal-button-primary rounded-lg font-semibold"
                >
                  <Video className="w-5 h-5" />
                  Watch Recording
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="teal-card border border-white/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-teal-card-text-muted" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-card-text mb-2">Debate Completed</h3>
                <p className="text-teal-card-text-muted">
                  This debate has ended. Check back later for the recording if available.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Controls */}
        {isAdmin && (
          <DebateAdminControls
            debateId={debateId}
            currentStatus={debate.status}
            onStatusChange={loadDebate}
          />
        )}

        {/* Info Box */}
        {isParticipant && isUpcoming && (
          <div className="teal-card border-2 border-teal-primary/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-teal-card-text mb-3">
              📝 Participant Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-teal-card-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-teal-gold">•</span>
                <span>Join the meeting 5 minutes before the scheduled time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-gold">•</span>
                <span>Ensure your camera and microphone are working properly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-gold">•</span>
                <span>Be prepared with your arguments and supporting evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-gold">•</span>
                <span>Listen respectfully to other participants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-gold">•</span>
                <span>Follow the moderator's instructions during the debate</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </NetflixDashboardLayout>
  );
}

export default function VirtualDebateDetailPage() {
  return (
    <BasicPlanGuard redirectTo="/debates/virtual">
      <VirtualDebateDetailContent />
    </BasicPlanGuard>
  );
}

