'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { 
  Sparkles, 
  Send, 
  Plus, 
  MessageCircle,
  BookOpen,
  Briefcase,
  Zap,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { 
  AIMessage, 
  AIMessageRequest, 
  AIMessageResponse,
  AISessionType 
} from '@/types/ai';

export default function AIChat() {
  const { user, userProfile } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<AISessionType>('general');
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [rateLimits, setRateLimits] = useState({ remainingDaily: 50, remainingMonthly: 500 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessionTypes = [
    { id: 'general', label: 'General Help', icon: MessageCircle, color: 'text-blue-500', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'study-help', label: 'Study Help', icon: BookOpen, color: 'text-green-500', gradient: 'from-green-500 to-emerald-500' },
    { id: 'career-guidance', label: 'Career Guidance', icon: Briefcase, color: 'text-purple-500', gradient: 'from-purple-500 to-pink-500' },
    { id: 'course-support', label: 'Course Support', icon: Sparkles, color: 'text-yellow-500', gradient: 'from-yellow-500 to-orange-500' },
    { id: 'motivation', label: 'Motivation', icon: Zap, color: 'text-orange-500', gradient: 'from-orange-500 to-red-500' },
  ];

  // Load messages for current session
  useEffect(() => {
    if (!currentSessionId || !user) return;

    const messagesQuery = query(
      collection(db as any, 'aiMessages'),
      where('sessionId', '==', currentSessionId),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      })) as AIMessage[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [currentSessionId, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading) return;

    const messageText = inputMessage.trim();
    setInputMessage('');
    setError(null);
    setIsLoading(true);

    try {
      const requestBody: AIMessageRequest = {
        sessionId: currentSessionId || undefined,
        message: messageText,
        type: sessionType,
        context: {
          yearGroup: userProfile?.yearGroup || undefined,
          subject: userProfile?.subjects?.[0],
        },
      };

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.uid,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data: AIMessageResponse = await response.json();
      
      if (!currentSessionId) {
        setCurrentSessionId(data.sessionId);
      }

      // Rate limits would be returned from the API if implemented
      // For now, we'll keep the default values
    } catch (error: any) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to process message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setInputMessage('');
    setError(null);
  };

  const selectedType = sessionTypes.find(t => t.id === sessionType);
  const TypeIcon = selectedType?.icon || MessageCircle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Premium Header */}
        <div className="border-b border-primary/20 bg-black/60 backdrop-blur-2xl sticky top-0 z-20 shadow-2xl shadow-primary/5">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                {/* Animated Logo */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 border border-primary/40 transform group-hover:scale-105 transition-transform">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-primary/90 to-purple-400 bg-clip-text text-transparent">
                    Gen Elevate AI
                  </h1>
                  <p className="text-sm text-zinc-400">
                    Your premium AI assistant powered by advanced intelligence
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Rate Limits Card */}
                <div className="hidden md:flex flex-col gap-1 px-5 py-3 rounded-xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-primary/30 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Daily: <span className="text-primary font-bold text-sm">{rateLimits.remainingDaily}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    Monthly: <span className="text-purple-400 font-bold text-sm">{rateLimits.remainingMonthly}</span>
                  </div>
                </div>

                <button
                  onClick={handleNewChat}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary via-primary/90 to-purple-600 hover:from-primary/90 hover:to-purple-500 shadow-xl shadow-primary/30 border border-primary/40 rounded-lg transform hover:scale-105 transition-all text-white"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Chat Type Selector */}
          <div className="mb-6">
            <button
              onClick={() => setShowTypeSelector(!showTypeSelector)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-700 hover:border-primary/50 backdrop-blur-sm transition-colors text-white"
            >
              <TypeIcon className={`w-4 h-4 ${selectedType?.color}`} />
              <span>{selectedType?.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showTypeSelector ? 'rotate-180' : ''}`} />
            </button>

            {showTypeSelector && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 backdrop-blur-sm">
                {sessionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSessionType(type.id as AISessionType);
                        setShowTypeSelector(false);
                      }}
                      className={`group p-4 rounded-xl border-2 transition-all ${
                        sessionType === type.id
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-zinc-700 hover:border-primary/50 bg-zinc-800/50'
                      }`}
                    >
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${type.gradient} p-2 shadow-lg transform group-hover:scale-110 transition-transform`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 block text-center">
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Chat Container */}
          <div className="bg-gradient-to-br from-zinc-900/90 to-black/90 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl" style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
            {/* Messages */}
            <div className="h-full overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-2xl">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                      <Sparkles className="relative w-20 h-20 text-primary mx-auto animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                      Welcome to Gen Elevate AI!
                    </h3>
                    <p className="text-zinc-400 mb-8">
                      Your premium AI assistant is ready. Ask me anything about your studies, career, courses, or motivation!
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { text: 'Can you help me with calculus?', gradient: 'from-blue-500/20 to-cyan-500/20' },
                        { text: 'What careers are good for Biology?', gradient: 'from-green-500/20 to-emerald-500/20' },
                        { text: 'How do I improve my study habits?', gradient: 'from-purple-500/20 to-pink-500/20' },
                        { text: 'Tell me about university options', gradient: 'from-orange-500/20 to-red-500/20' },
                      ].map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => setInputMessage(suggestion.text)}
                          className={`p-4 text-sm bg-gradient-to-br ${suggestion.gradient} hover:scale-105 rounded-xl transition-all text-left border border-zinc-700 hover:border-primary/50 backdrop-blur-sm group`}
                        >
                          <span className="text-zinc-300 group-hover:text-white transition-colors">{suggestion.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl p-5 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl shadow-primary/20'
                            : 'bg-zinc-800/80 text-zinc-100 border border-zinc-700/50 backdrop-blur-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <span className="text-xs opacity-60 mt-3 block">
                          {msg.timestamp?.toLocaleTimeString('en-GB', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      {msg.role === 'user' && userProfile && (
                        <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg border border-zinc-600">
                          <span className="text-sm font-bold text-white">
                            {userProfile.displayName?.charAt(0) || userProfile.firstName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 justify-start animate-in fade-in slide-in-from-bottom-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                      </div>
                      <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-5 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-sm text-zinc-400">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="mt-6">
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me anything..."
                className="w-full min-h-[100px] pr-14 p-4 bg-zinc-900/80 border border-zinc-700 focus:border-primary/50 focus:outline-none rounded-xl resize-none backdrop-blur-sm text-zinc-100 placeholder:text-zinc-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute bottom-3 right-3 h-10 w-10 flex items-center justify-center bg-gradient-to-br from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all rounded-lg text-white"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-3 text-center">
              Press <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">Enter</kbd> to send, <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">Shift + Enter</kbd> for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

