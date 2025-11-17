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
    { id: 'general', label: 'General Help', icon: MessageCircle, color: 'text-teal-primary', gradient: 'from-teal-blue-medium to-teal-primary' },
    { id: 'study-help', label: 'Study Help', icon: BookOpen, color: 'text-teal-light', gradient: 'from-teal-primary to-teal-light' },
    { id: 'career-guidance', label: 'Career Guidance', icon: Briefcase, color: 'text-teal-gold', gradient: 'from-teal-gold to-teal-light' },
    { id: 'course-support', label: 'Course Support', icon: Sparkles, color: 'text-teal-gold', gradient: 'from-teal-gold-dark to-teal-gold' },
    { id: 'motivation', label: 'Motivation', icon: Zap, color: 'text-teal-primary', gradient: 'from-teal-primary to-teal-blue-deep' },
  ];

  // Load messages for current session
  useEffect(() => {
    if (!currentSessionId || !user) return;

    // Check if localhost - don't load from Firestore in development
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    if (isLocalhost) {
      // For localhost, messages are managed in memory by the API
      // Don't override local messages with Firestore data
      return;
    }

    // For production, load from Firestore
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

  const handleSendMessageWithText = async (messageText: string) => {
    if (!messageText.trim() || !user || isLoading) return;

    console.log('🚀 Sending message:', messageText, 'Current session:', currentSessionId);
    setInputMessage('');
    setError(null);
    setIsLoading(true);

    // Check if localhost
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    // Add user message immediately (for localhost only)
    if (isLocalhost) {
      const tempSessionId = currentSessionId || `temp_${Date.now()}`;
      const userMsg: AIMessage = {
        id: `user_${Date.now()}`,
        sessionId: tempSessionId,
        userId: user.uid,
        role: 'user',
        content: messageText.trim(),
        timestamp: new Date(),
        flagged: false,
      };
      setMessages(prev => [...prev, userMsg]);
    }

    try {
      const requestBody: AIMessageRequest = {
        sessionId: currentSessionId || undefined,
        message: messageText.trim(),
        type: sessionType,
        context: {
          yearGroup: userProfile?.yearGroup || undefined,
          subject: userProfile?.subjects?.[0],
        },
      };

      // Use simple API for local development, full API for production
      const apiEndpoint = isLocalhost ? '/api/ai/chat-simple' : '/api/ai/chat';
      
      console.log('Using API endpoint:', apiEndpoint, 'isLocalhost:', isLocalhost);
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.uid,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error('❌ API response not OK:', response.status);
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error(errorData.error || 'Failed to send message');
      }

      console.log('✅ API response OK, parsing JSON...');
      const data: AIMessageResponse = await response.json();
      console.log('✅ Received AI response:', data);
      
      // Update session ID if this is a new session
      if (!currentSessionId && data.sessionId) {
        console.log('🆔 Setting session ID:', data.sessionId);
        setCurrentSessionId(data.sessionId);
      } else {
        console.log('🆔 Using existing session:', currentSessionId);
      }

      // Add assistant message immediately (for localhost only)
      if (isLocalhost) {
        const assistantMsg: AIMessage = {
          id: data.message.id,
          sessionId: data.sessionId,
          userId: user.uid,
          role: 'assistant',
          content: data.message.content,
          timestamp: new Date(data.message.timestamp),
          flagged: false,
        };
        setMessages(prev => {
          console.log('💬 Adding assistant message. Previous count:', prev.length);
          return [...prev, assistantMsg];
        });
        
        // Update any temporary session IDs in existing messages
        if (!currentSessionId) {
          console.log('🔄 Updating temporary session IDs to:', data.sessionId);
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.sessionId.startsWith('temp_') 
                ? { ...msg, sessionId: data.sessionId }
                : msg
            )
          );
        }
      }

      // Update rate limits
      if (data.usage) {
        setRateLimits({
          remainingDaily: data.usage.remainingDaily,
          remainingMonthly: data.usage.remainingMonthly,
        });
      }

      console.log('✅ Message handled successfully');
    } catch (error: any) {
      console.error('❌ Error sending message:', error);
      setError(error.message || 'Failed to process message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading) return;
    await handleSendMessageWithText(inputMessage.trim());
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
    <div className="min-h-[calc(100vh-120px)]">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Premium Header */}
        <div className="border-b border-white/10 bg-white/10 backdrop-blur-2xl sticky top-0 z-20 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Animated Logo */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-primary via-teal-light to-teal-gold rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-teal-blue-medium to-teal-primary rounded-xl flex items-center justify-center shadow-lg border border-teal-gold/40 transform group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Gen Elevate AI
                  </h1>
                  <p className="text-sm text-white/70">
                    Your premium AI assistant powered by advanced intelligence
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Rate Limits Card */}
                <div className="hidden md:flex flex-col gap-1 px-4 py-2 rounded-lg teal-card-glass border border-white/20 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <div className="w-2 h-2 rounded-full bg-teal-gold animate-pulse"></div>
                    Daily: <span className="text-teal-gold font-bold text-sm">{rateLimits.remainingDaily}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <div className="w-2 h-2 rounded-full bg-teal-light animate-pulse"></div>
                    Monthly: <span className="text-teal-light font-bold text-sm">{rateLimits.remainingMonthly}</span>
                  </div>
                </div>

                <button
                  onClick={handleNewChat}
                  className="teal-button-primary flex items-center gap-2"
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg teal-card-glass border border-white/20 hover:border-teal-gold/50 backdrop-blur-sm transition-colors text-white"
            >
              <TypeIcon className={`w-4 h-4 ${selectedType?.color}`} />
              <span>{selectedType?.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showTypeSelector ? 'rotate-180' : ''}`} />
            </button>

            {showTypeSelector && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 p-4 teal-card-glass rounded-xl border border-white/20 backdrop-blur-sm">
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
                          ? 'border-teal-gold bg-teal-gold/10 shadow-lg'
                          : 'border-white/20 hover:border-teal-gold/50 bg-white/5'
                      }`}
                    >
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${type.gradient} p-2 shadow-lg transform group-hover:scale-110 transition-transform`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <span className="text-xs font-medium text-white block text-center">
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Chat Container */}
          <div className="teal-card rounded-2xl overflow-hidden shadow-xl" style={{ height: 'calc(100vh - 500px)', minHeight: '400px' }}>
            {/* Messages */}
            <div className="h-full overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-2xl">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-primary to-teal-gold rounded-full blur-2xl opacity-50 animate-pulse"></div>
                      <Sparkles className="relative w-20 h-20 text-teal-primary mx-auto animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-teal-card-text mb-3">
                      Welcome to Gen Elevate AI!
                    </h3>
                    <p className="text-teal-card-text-muted mb-8">
                      Your premium AI assistant is ready. Ask me anything about your studies, career, courses, or motivation!
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { text: 'Can you help me with calculus?', gradient: 'from-teal-blue-medium/20 to-teal-primary/20' },
                        { text: 'What careers are good for Biology?', gradient: 'from-teal-primary/20 to-teal-light/20' },
                        { text: 'How do I improve my study habits?', gradient: 'from-teal-gold/20 to-teal-light/20' },
                        { text: 'Tell me about university options', gradient: 'from-teal-light/20 to-teal-primary/20' },
                      ].map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            // Send the suggestion directly instead of setting input first
                            if (!isLoading) {
                              setInputMessage(suggestion.text);
                              // Trigger send with the suggestion text directly
                              handleSendMessageWithText(suggestion.text);
                            }
                          }}
                          disabled={isLoading}
                          className={`p-4 text-sm bg-gradient-to-br ${suggestion.gradient} hover:scale-105 rounded-xl transition-all text-left border border-gray-200 hover:border-teal-gold/50 backdrop-blur-sm group disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <span className="text-teal-card-text-muted group-hover:text-teal-card-text transition-colors">{suggestion.text}</span>
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
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-blue-medium to-teal-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl p-5 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-teal-primary to-teal-blue-medium text-white shadow-xl'
                            : 'bg-white/90 text-teal-card-text border border-gray-200 backdrop-blur-sm'
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
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-gold to-teal-gold-dark rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-sm font-bold text-teal-card-text">
                            {userProfile.displayName?.charAt(0) || userProfile.firstName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 justify-start animate-in fade-in slide-in-from-bottom-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-blue-medium to-teal-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                      </div>
                      <div className="bg-white/90 border border-gray-200 rounded-2xl p-5 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-teal-primary" />
                          <span className="text-sm text-teal-card-text-muted">Thinking...</span>
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
                className="w-full min-h-[100px] pr-14 p-4 teal-card border border-gray-300 focus:border-teal-gold focus:outline-none focus:ring-2 focus:ring-teal-gold rounded-xl resize-none text-teal-card-text placeholder:text-teal-card-text-muted"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute bottom-3 right-3 h-10 w-10 flex items-center justify-center bg-gradient-to-br from-teal-blue-medium to-teal-primary hover:from-teal-primary hover:to-teal-light shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all rounded-lg text-white"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-white/70 mt-3 text-center">
              Press <kbd className="px-2 py-1 teal-card-glass rounded border border-white/20 text-white">Enter</kbd> to send, <kbd className="px-2 py-1 teal-card-glass rounded border border-white/20 text-white">Shift + Enter</kbd> for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

