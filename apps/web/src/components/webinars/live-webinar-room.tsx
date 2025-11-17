'use client';

import { DailyProvider, useDaily, useDailyEvent, useParticipantIds, useScreenShare, useLocalParticipant } from '@daily-co/daily-react';
import { useEffect, useRef, useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, Users, MessageSquare, Loader2, LogOut, Monitor, MonitorOff, Hand, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface LiveWebinarRoomProps {
  roomUrl: string;
  isHost: boolean; // True if the user is the webinar host
  userName: string;
  onLeave: () => void;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: number;
}

function WebinarCall({ roomUrl, isHost, userName, onLeave }: LiveWebinarRoomProps) {
  const daily = useDaily();
  const localParticipant = useLocalParticipant();
  const { screens, startScreenShare, stopScreenShare } = useScreenShare();
  const { participants } = useParticipantIds();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const remoteParticipants = participants.filter(p => !p.local);
  const participantCount = participants.length;

  const toggleMic = () => {
    if (daily) {
      daily.setLocalAudio(!localParticipant?.audioTrack);
    }
  };

  const toggleCam = () => {
    if (daily) {
      daily.setLocalVideo(!localParticipant?.videoTrack);
    }
  };

  const toggleScreenShare = async () => {
    if (screens.length > 0) {
      await stopScreenShare();
    } else {
      await startScreenShare();
    }
  };

  const sendChatMessage = () => {
    if (chatInput.trim() && daily) {
      daily.sendAppMessage({ type: 'chat', message: chatInput, sender: userName }, '*');
      setChatMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: userName, 
        message: chatInput, 
        timestamp: Date.now() 
      }]);
      setChatInput('');
    }
  };

  useDailyEvent(
    'app-message',
    (ev) => {
      if (ev?.data && ev.data.type === 'chat') {
        setChatMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          sender: ev.data.sender, 
          message: ev.data.message, 
          timestamp: Date.now() 
        }]);
      }
    }
  );

  useDailyEvent('participant-joined', (ev) => {
    if (ev?.participant) {
      toast.success(`${ev.participant.user_name || 'Someone'} joined the webinar`);
    }
  });

  useDailyEvent('participant-left', (ev) => {
    if (ev?.participant) {
      toast.info(`${ev.participant.user_name || 'Someone'} left the webinar`);
    }
  });

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (daily) {
      daily.setUserName(userName);
      
      // If not host, start with camera and mic off
      if (!isHost) {
        daily.setLocalAudio(false);
        daily.setLocalVideo(false);
      }
    }
  }, [daily, userName, isHost]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-teal-primary to-teal-gold text-white">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col bg-gray-900 relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-red-500 rounded-full text-xs font-semibold flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              LIVE
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              <span className="font-semibold">{participantCount} Attendees</span>
            </div>
          </div>
          <button
            onClick={onLeave}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Leave Webinar
          </button>
        </div>

        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-20 pt-24 overflow-y-auto">
          {/* Host/Speaker Video (Larger) */}
          {localParticipant && isHost && (
            <div className="col-span-full relative bg-black rounded-xl overflow-hidden border-4 border-teal-gold shadow-2xl aspect-video">
              <video
                autoPlay
                muted
                playsInline
                ref={(videoEl) => {
                  if (videoEl && localParticipant.videoTrack) {
                    videoEl.srcObject = new MediaStream([localParticipant.videoTrack]);
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-primary to-teal-gold"
                style={{ display: !localParticipant.videoTrack ? 'flex' : 'none' }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <VideoOff className="w-8 h-8 mx-auto text-white/60" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                <span className="font-semibold text-white">{userName} (Host)</span>
              </div>
              {!localParticipant.audioTrack && (
                <div className="absolute top-4 left-4 bg-red-500 p-2 rounded-full">
                  <MicOff className="w-4 h-4" />
                </div>
              )}
            </div>
          )}

          {/* Screen Share Display */}
          {screens.length > 0 && screens.map((screen) => (
            <div key={screen.session_id} className="col-span-full relative bg-black rounded-xl overflow-hidden border-2 border-teal-gold shadow-xl aspect-video">
              <video
                autoPlay
                playsInline
                ref={(videoEl) => {
                  if (videoEl && screen.screenVideoTrack) {
                    videoEl.srcObject = new MediaStream([screen.screenVideoTrack]);
                  }
                }}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-2">
                <Monitor className="w-4 h-4 text-teal-gold" />
                <span className="font-semibold">{screen.screen_name || 'Screen Share'}</span>
              </div>
            </div>
          ))}

          {/* Remote Participants (Smaller Grid) */}
          {remoteParticipants.map((p) => (
            <div key={p.session_id} className="relative bg-black rounded-lg overflow-hidden border border-white/20 aspect-video">
              <video
                autoPlay
                playsInline
                ref={(videoEl) => {
                  if (videoEl && p.videoTrack) {
                    videoEl.srcObject = new MediaStream([p.videoTrack]);
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900"
                style={{ display: !p.videoTrack ? 'flex' : 'none' }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold">
                    {(p.user_name || 'A').charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs">
                {p.user_name}
              </div>
              {!p.audioTrack && (
                <div className="absolute top-2 left-2 bg-red-500 p-1 rounded-full">
                  <MicOff className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex justify-center gap-4">
          <Button
            onClick={toggleMic}
            className={`p-4 rounded-full transition-all ${
              localParticipant?.audioTrack 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title="Toggle Microphone"
          >
            {localParticipant?.audioTrack ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>
          
          <Button
            onClick={toggleCam}
            className={`p-4 rounded-full transition-all ${
              localParticipant?.videoTrack 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title="Toggle Camera"
          >
            {localParticipant?.videoTrack ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          {isHost && (
            <Button
              onClick={toggleScreenShare}
              className={`p-4 rounded-full transition-all ${
                screens.length > 0 
                  ? 'bg-teal-gold hover:bg-teal-gold/80 text-gray-900' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title="Share Screen"
            >
              {screens.length > 0 ? <MonitorOff className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
            </Button>
          )}

          <Button
            onClick={() => setShowParticipants(!showParticipants)}
            className="p-4 rounded-full bg-white/20 hover:bg-white/30 text-white"
            title="Participants"
          >
            <Users className="w-6 h-6" />
          </Button>

          <Button
            onClick={() => setShowChat(!showChat)}
            className="p-4 rounded-full bg-white/20 hover:bg-white/30 text-white"
            title="Chat"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="w-80 bg-gray-800 flex flex-col border-l border-white/10">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-gold" />
              <h3 className="text-lg font-semibold">Chat</h3>
            </div>
            <button onClick={() => setShowChat(false)} className="text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div ref={chatScrollRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
            {chatMessages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No messages yet.</p>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-teal-gold text-sm">{msg.sender}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-white/90">{msg.message}</p>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-white/10 flex gap-2">
            <Input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-gold"
            />
            <Button 
              onClick={sendChatMessage} 
              className="bg-teal-gold hover:bg-teal-gold/80 text-gray-900 px-4 rounded-lg font-semibold"
            >
              Send
            </Button>
          </div>
        </div>
      )}

      {/* Participants Sidebar */}
      {showParticipants && (
        <div className="w-80 bg-gray-800 flex flex-col border-l border-white/10">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-gold" />
              <h3 className="text-lg font-semibold">Participants ({participantCount})</h3>
            </div>
            <button onClick={() => setShowParticipants(false)} className="text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {participants.map((p) => (
              <div key={p.session_id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-gold to-teal-primary rounded-full flex items-center justify-center text-sm font-bold">
                  {(p.user_name || 'A').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{p.user_name}</p>
                  {p.local && <p className="text-xs text-teal-gold">You</p>}
                </div>
                <div className="flex gap-1">
                  {!p.audioTrack && <MicOff className="w-4 h-4 text-red-400" />}
                  {!p.videoTrack && <VideoOff className="w-4 h-4 text-red-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function LiveWebinarRoom({ roomUrl, isHost, userName, onLeave }: LiveWebinarRoomProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomUrl || !roomUrl.startsWith('https://')) {
      setError('Invalid room URL provided.');
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [roomUrl]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-teal-primary to-teal-gold text-white z-50">
        <Loader2 className="w-16 h-16 animate-spin text-white mb-4" />
        <p className="text-xl font-semibold">Loading webinar room...</p>
        <p className="text-sm text-white/70 mt-2">Please wait while we connect you</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-800 to-red-600 text-white z-50 p-4 text-center">
        <X className="w-16 h-16 text-white mb-4" />
        <p className="text-2xl font-bold mb-2">Error Joining Webinar</p>
        <p className="text-lg mb-8">{error}</p>
        <Button 
          onClick={onLeave} 
          className="bg-white text-red-800 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <DailyProvider url={roomUrl}>
      <WebinarCall roomUrl={roomUrl} isHost={isHost} userName={userName} onLeave={onLeave} />
    </DailyProvider>
  );
}

