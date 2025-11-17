'use client';

import Link from 'next/link';
import { Calendar, Clock, Users, Video, Trophy } from 'lucide-react';
import type { VirtualDebate } from '@/types/virtual-debates';

interface VirtualDebateCardProps {
  debate: VirtualDebate;
  userId?: string;
}

export function VirtualDebateCard({ debate, userId }: VirtualDebateCardProps) {
  const scheduledDate = debate.scheduledTime?.toDate?.() || new Date();
  const isParticipant = userId && debate.participants.includes(userId);

  const getStatusBadge = () => {
    switch (debate.status) {
      case 'live':
        return (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/30 animate-pulse flex items-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            LIVE NOW
          </span>
        );
      case 'scheduled':
        return (
          <span className="px-3 py-1 bg-teal-gold/20 text-teal-gold text-xs font-semibold rounded-full border border-teal-gold/30">
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-semibold rounded-full border border-gray-500/30">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Link href={`/debates/virtual/${debate.id}`}>
      <div className="group relative teal-card border-2 border-white/20 rounded-2xl p-6 hover:border-teal-gold/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-teal-gold/20">
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {isParticipant && (
            <span className="px-3 py-1 bg-teal-primary/20 text-teal-primary text-xs font-semibold rounded-full border border-teal-primary/30 flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              Participant
            </span>
          )}
          {getStatusBadge()}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-teal-card-text mb-2 group-hover:text-teal-gold transition-colors pr-32">
          {debate.title}
        </h3>

        {/* Description */}
        <p className="text-teal-card-text-muted text-sm mb-4">
          {debate.description}
        </p>

        {/* Participants */}
        <div className="mb-4">
          <div className={`p-3 rounded-lg border ${isParticipant ? 'bg-teal-gold/10 border-teal-gold/30' : 'bg-white/5 border-white/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-teal-card-text" />
              <h4 className="font-semibold text-teal-card-text text-sm">Participants</h4>
            </div>
            <p className="text-xs text-teal-card-text-muted">
              {debate.participants.length} speaker{debate.participants.length !== 1 ? 's' : ''} invited
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-6 text-sm text-teal-card-text-muted mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{scheduledDate.toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{scheduledDate.toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })} ({debate.durationMinutes} mins)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="text-sm text-teal-card-text-muted">
            {isParticipant ? 'You are participating' : 'Open to all viewers'}
          </div>
          
          {debate.status === 'live' ? (
            <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2">
              <Video className="w-4 h-4" />
              Join Live →
            </button>
          ) : debate.status === 'scheduled' ? (
            <button className="px-6 py-2 teal-button-primary text-sm font-semibold rounded-lg transition-colors">
              View Details →
            </button>
          ) : (
            <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold rounded-lg transition-colors">
              Watch Recording →
            </button>
          )}
        </div>

        {/* Recording available (if completed) */}
        {debate.status === 'completed' && debate.recordingUrl && (
          <div className="mt-4 p-3 bg-teal-primary/10 border border-teal-primary/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-teal-primary" />
              <span className="font-semibold text-teal-card-text">
                Recording Available
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

