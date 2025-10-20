'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  Send, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  Zap, 
  MessageCircle,
  Loader2,
  AlertCircle,
  ChevronDown,
  Plus,
  History,
  Trash2
} from 'lucide-react';
import { AIMessageRequest, AIMessageResponse, AISessionType, AIMessage } from '@/types/ai';

export function AIChat() {
  const { user, userProfile } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<AISessionType>('general');
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [usage, setUsage] = useState({ remainingDaily: 50, remainingMonthly: 500 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessionTypes = [
    { id: 'general', label: 'General Help', icon: MessageCircle, color: 'text-blue-500' },
    { id: 'study-help', label: 'Study Help', icon: BookOpen, color: 'text-green-500' },
    { id: 'career-guidance', label: 'Career Guidance', icon: Briefcase, color: 'text-purple-500' },
    { id: 'course-support', label: 'Course Support', icon: Sparkles, color: 'text-yellow-500' },
    { id: 'motivation', label: 'Motivation', icon: Zap, color: 'text-orange-500' },
  ];

  // Load messages for current session (ONLY user's own messages)
  useEffect(() => {
    if (!currentSessionId || !user) return;

    const messagesQuery = query(
      collection(db as any, 'aiMessages'),
      where('sessionId', '==', currentSessionId),
      where('userId', '==', user.uid), // SECURITY: Ensure user owns these messages
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
    if (!inputMessage.trim() || isLoading || !user) return;

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
      
      // Update session ID if new
      if (!currentSessionId) {
        setCurrentSessionId(data.sessionId);
      }

      // Update usage stats
      setUsage({
        remainingDaily: data.usage.remainingDaily,
        remainingMonthly: data.usage.remainingMonthly,
      });

    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Please log in to use Gen Elevate AI</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8 border border-border">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                Gen Elevate AI
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Your personal AI assistant for study help, career guidance, and motivation
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-foreground/70">
                  Daily: <span className="font-semibold text-primary">{usage.remainingDaily}</span> remaining
                </span>
                <span className="text-foreground/70">
                  Monthly: <span className="font-semibold text-primary">{usage.remainingMonthly}</span> remaining
                </span>
              </div>
            </div>
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Type Selector */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-foreground">Chat Type:</label>
          <button
            onClick={() => setShowTypeSelector(!showTypeSelector)}
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
          >
            {showTypeSelector ? 'Hide' : 'Show'} Options
            <ChevronDown className={`w-4 h-4 transition-transform ${showTypeSelector ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {showTypeSelector && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {sessionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSessionType(type.id as AISessionType);
                    setShowTypeSelector(false);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    sessionType === type.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${type.color} mx-auto mb-1`} />
                  <span className="text-xs font-medium text-foreground block text-center">
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        
        {!showTypeSelector && (
          <div className="flex items-center gap-2">
            {(() => {
              const selectedType = sessionTypes.find(t => t.id === sessionType);
              const Icon = selectedType?.icon || MessageCircle;
              return (
                <>
                  <Icon className={`w-4 h-4 ${selectedType?.color}`} />
                  <span className="text-sm font-medium text-foreground">{selectedType?.label}</span>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Chat Container */}
      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 450px)', minHeight: '400px' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <Sparkles className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Welcome to Gen Elevate AI!
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Our advanced AI assistant is here to support your learning journey. Ask me anything about your studies, career, courses, or motivation!
                </p>
                <div className="grid grid-cols-2 gap-2 text-left">
                  {[
                    'Can you help me with calculus?',
                    'What careers are good for Biology?',
                    'How do I improve my study habits?',
                    'Tell me about university options',
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setInputMessage(suggestion)}
                      className="p-2 text-xs bg-accent hover:bg-accent/80 rounded-lg transition-colors text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {msg.timestamp?.toLocaleTimeString('en-GB', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary-foreground">
                      {userProfile?.displayName?.[0] || userProfile?.firstName?.[0] || 'U'}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="max-w-[70%] rounded-2xl p-4 bg-accent">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              rows={1}
              className="flex-1 px-4 py-3 bg-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground disabled:opacity-50"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

