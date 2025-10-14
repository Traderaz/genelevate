'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  Settings,
  Users,
  MessageSquare,
  Hand,
  MoreVertical,
  Maximize,
  Minimize
} from 'lucide-react';
// import { WebinarHeartbeatManager } from '@gen-elevate/shared/lib/webinar-heartbeat';

interface WebinarPlayerProps {
  webinarId: string;
}

interface WebinarData {
  id: string;
  title: string;
  status: 'scheduled' | 'live' | 'ended';
  host: {
    name: string;
    avatar: string;
  };
  provider: 'mock' | 'zoom' | 'teams' | 'meet';
  joinUrl?: string;
  currentAttendees: number;
  maxAttendees: number;
}

export function WebinarPlayer({ webinarId }: WebinarPlayerProps) {
  const [webinar, setWebinar] = useState<WebinarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  
  const playerRef = useRef<HTMLDivElement>(null);
  // const heartbeatManager = useRef<WebinarHeartbeatManager | null>(null);

  useEffect(() => {
    // TODO: Fetch webinar data from API
    setTimeout(() => {
      setWebinar({
        id: webinarId,
        title: 'Advanced Calculus: Integration Techniques',
        status: 'live',
        host: {
          name: 'Dr. Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
        },
        provider: 'mock',
        joinUrl: `https://mock-webinar.genelevate.app/join/${webinarId}`,
        currentAttendees: 73,
        maxAttendees: 100,
      });
      setLoading(false);
    }, 1000);
  }, [webinarId]);

  useEffect(() => {
    if (!webinar || webinar.status !== 'live') return;

    // Initialize heartbeat manager for attendance tracking
    const userId = 'current-user-id'; // TODO: Get from auth context
    
    // TODO: Implement heartbeat manager when shared package is available
    /*
    heartbeatManager.current = new WebinarHeartbeatManager(
      userId,
      webinarId,
      async (heartbeat) => {
        // TODO: Send heartbeat to API
        console.log('Heartbeat:', heartbeat);
        setConnectionQuality(heartbeat.connectionQuality || 'good');
      },
      (isIdle) => {
        // TODO: Handle idle state change
        console.log('Idle state changed:', isIdle);
      },
      {
        interval: 30, // 30 seconds
        maxIdleTime: 300, // 5 minutes
        enableIdleDetection: true,
        enableEngagementTracking: true,
      }
    );

    heartbeatManager.current.start();

    return () => {
      heartbeatManager.current?.stop();
    };
    */
  }, [webinar, webinarId]);

  const handleJoinWebinar = async () => {
    if (!webinar) return;

    setLoading(true);
    try {
      // TODO: Join webinar via provider
      if (webinar.provider === 'mock') {
        // Simulate joining
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsConnected(true);
      } else {
        // Redirect to provider URL
        window.open(webinar.joinUrl, '_blank');
      }
    } catch (error) {
      console.error('Failed to join webinar:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Update microphone state via provider API
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // TODO: Update camera state via provider API
  };

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised);
    // TODO: Send hand raise event via provider API
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getConnectionColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-lg">Loading webinar...</div>
        </div>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-lg">Webinar not found</div>
        </div>
      </div>
    );
  }

  if (webinar.status === 'ended') {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-2xl mb-4">📹</div>
          <div className="text-lg mb-2">This webinar has ended</div>
          <div className="text-gray-400">The recording will be available soon</div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div 
        ref={playerRef}
        className="flex-1 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center"
      >
        <div className="text-center text-white max-w-md">
          <div className="mb-8">
            <img 
              src={webinar.host.avatar} 
              alt={webinar.host.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
            />
            <h2 className="text-2xl font-bold mb-2">{webinar.title}</h2>
            <p className="text-blue-200">Hosted by {webinar.host.name}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-6 text-white/80 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{webinar.currentAttendees}/{webinar.maxAttendees}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            </div>
            
            <button
              onClick={handleJoinWebinar}
              disabled={loading}
              className="w-full bg-white text-blue-900 hover:bg-gray-100 disabled:opacity-50 py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Joining...' : 'Join Webinar'}
            </button>
          </div>

          <div className="text-sm text-blue-200">
            <p>Make sure your microphone and camera are ready</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={playerRef} className="flex-1 relative bg-black">
      {/* Main Video Area */}
      <div className="absolute inset-0">
        {webinar.provider === 'mock' ? (
          // Mock webinar player
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
              <p className="text-gray-300">Mock webinar session in progress</p>
            </div>
          </div>
        ) : (
          // External provider iframe would go here
          <iframe
            src={webinar.joinUrl}
            className="w-full h-full border-0"
            allow="camera; microphone; fullscreen"
          />
        )}
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="font-medium">LIVE</span>
            </div>
            <h2 className="font-semibold truncate max-w-md">{webinar.title}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black/30 rounded-lg px-3 py-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{webinar.currentAttendees}</span>
            </div>
            <div className={`flex items-center space-x-1 ${getConnectionColor()}`}>
              <div className="w-2 h-2 rounded-full bg-current" />
              <span className="text-xs capitalize">{connectionQuality}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full transition-colors ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                !isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20"
              />
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleHandRaise}
              className={`p-3 rounded-full transition-colors ${
                isHandRaised ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Hand className="w-5 h-5" />
            </button>

            <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>

            <button className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
              <span className="text-sm font-medium px-2">Leave</span>
            </button>
          </div>
        </div>
      </div>

      {/* Idle Warning Overlay - TODO: Implement when heartbeat manager is available */}
    </div>
  );
}
