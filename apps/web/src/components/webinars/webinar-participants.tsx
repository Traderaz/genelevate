'use client';

import { useState, useEffect } from 'react';
import { Users, Crown, Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface WebinarParticipantsProps {
  webinarId: string;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isMuted: boolean;
  hasVideo: boolean;
  isActive: boolean;
  joinedAt: Date;
}

export function WebinarParticipants({ webinarId }: WebinarParticipantsProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch participants from API
    setTimeout(() => {
      setIsLive(true); // Mock: webinar is live
      setParticipants([
        {
          id: '1',
          name: 'Dr. Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          isHost: true,
          isMuted: false,
          hasVideo: true,
          isActive: true,
          joinedAt: new Date(Date.now() - 30 * 60 * 1000),
        },
        {
          id: '2',
          name: 'Alex Thompson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          isHost: false,
          isMuted: true,
          hasVideo: false,
          isActive: true,
          joinedAt: new Date(Date.now() - 25 * 60 * 1000),
        },
        {
          id: '3',
          name: 'Maria Garcia',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
          isHost: false,
          isMuted: true,
          hasVideo: true,
          isActive: true,
          joinedAt: new Date(Date.now() - 20 * 60 * 1000),
        },
        {
          id: '4',
          name: 'James Wilson',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
          isHost: false,
          isMuted: true,
          hasVideo: false,
          isActive: false,
          joinedAt: new Date(Date.now() - 15 * 60 * 1000),
        },
      ]);
      setLoading(false);
    }, 500);
  }, [webinarId]);

  const formatJoinTime = (joinedAt: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - joinedAt.getTime()) / 1000 / 60);
    if (diff < 1) return 'Just joined';
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    return `${hours}h ${diff % 60}m ago`;
  };

  if (!isLive) {
    return null; // Don't show participants if webinar is not live
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="font-medium text-gray-900 mb-2">No Participants Yet</h3>
        <p className="text-gray-600 text-sm">
          Participants will appear here when they join the webinar.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Participants ({participants.length})</span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {participants.map((participant) => (
          <div 
            key={participant.id} 
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              participant.isActive ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
            }`}
          >
            <div className="relative">
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {participant.isHost && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              {!participant.isActive && (
                <div className="absolute inset-0 bg-gray-500/50 rounded-full" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className={`font-medium truncate ${
                  participant.isActive ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {participant.name}
                </h4>
                {participant.isHost && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    Host
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Joined {formatJoinTime(participant.joinedAt)}
              </p>
            </div>

            <div className="flex items-center space-x-1">
              {participant.isMuted ? (
                <MicOff className="w-4 h-4 text-red-500" />
              ) : (
                <Mic className="w-4 h-4 text-green-500" />
              )}
              
              {participant.hasVideo ? (
                <Video className="w-4 h-4 text-blue-500" />
              ) : (
                <VideoOff className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>

      {participants.length > 4 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all participants
          </button>
        </div>
      )}
    </div>
  );
}
