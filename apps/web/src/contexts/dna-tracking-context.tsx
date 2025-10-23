/**
 * DNA Tracking Context
 * 
 * Automatically tracks user learning behavior across the platform
 * without requiring manual integration in each component
 */

'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { useAuth } from './auth-context';
import { usePathname } from 'next/navigation';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/lib/firebase';

interface DNATrackingContextType {
  trackSignal: (data: Partial<LearningSignalData>) => Promise<void>;
  trackPageView: (path: string, metadata?: Record<string, any>) => void;
  trackAction: (action: string, metadata?: Record<string, any>) => void;
}

interface LearningSignalData {
  type: 'course_view' | 'quiz_attempt' | 'quiz_complete' | 'webinar_join' | 
        'ai_chat' | 'video_watch' | 'resource_download' | 'study_session';
  subject?: string;
  topic?: string;
  courseId?: string;
  duration?: number;
  score?: number;
  completed: boolean;
  engagementLevel?: number;
  mediaType?: 'video' | 'audio' | 'text' | 'interactive';
  interactionType?: 'watching' | 'reading' | 'doing' | 'discussing';
  sessionId?: string;
}

const DNATrackingContext = createContext<DNATrackingContextType | null>(null);

export function DNATrackingProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const functions = getFunctions(app);
  
  // Track session data
  const sessionStartTime = useRef<number>(Date.now());
  const currentPageStartTime = useRef<number>(Date.now());
  const lastTrackedPath = useRef<string>('');
  const activityLog = useRef<any[]>([]);

  // Track session start
  useEffect(() => {
    if (user) {
      sessionStartTime.current = Date.now();
      trackSignal({
        type: 'study_session',
        completed: false,
      });
    }
  }, [user]);

  // Track session end on unmount
  useEffect(() => {
    return () => {
      if (user) {
        const duration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
        trackSignal({
          type: 'study_session',
          duration,
          completed: true,
        });
      }
    };
  }, [user]);

  // Auto-track page views
  useEffect(() => {
    if (!user || !pathname) return;

    // Track previous page duration if path changed
    if (lastTrackedPath.current && lastTrackedPath.current !== pathname) {
      const duration = Math.floor((Date.now() - currentPageStartTime.current) / 1000);
      
      // Only track if user spent more than 5 seconds on the page
      if (duration > 5) {
        const pageData = inferPageData(lastTrackedPath.current);
        if (pageData) {
          trackSignal({
            ...pageData,
            duration,
            completed: true,
          });
        }
      }
    }

    // Start tracking new page
    currentPageStartTime.current = Date.now();
    lastTrackedPath.current = pathname;

    // Track page view
    const pageData = inferPageData(pathname);
    if (pageData) {
      trackSignal({
        ...pageData,
        completed: false,
      });
    }
  }, [pathname, user]);

  // Track user interactions (clicks, scrolls, etc.)
  useEffect(() => {
    if (!user) return;

    let interactionCount = 0;
    let lastScrollTime = Date.now();

    const handleInteraction = () => {
      interactionCount++;
    };

    const handleScroll = () => {
      lastScrollTime = Date.now();
      interactionCount++;
    };

    // Track engagement level based on interactions
    const engagementInterval = setInterval(() => {
      if (interactionCount > 0) {
        const timeSinceLastScroll = Date.now() - lastScrollTime;
        const isEngaged = timeSinceLastScroll < 30000; // Active in last 30s

        if (isEngaged) {
          activityLog.current.push({
            timestamp: Date.now(),
            interactions: interactionCount,
          });
        }

        interactionCount = 0;
      }
    }, 60000); // Check every minute

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      clearInterval(engagementInterval);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [user]);

  const trackSignal = async (data: Partial<LearningSignalData>): Promise<void> => {
    if (!user) return;

    try {
      const trackLearningSignal = httpsCallable(functions, 'dnaFunctions-trackLearningSignal');
      
      // Add engagement level based on recent activity
      const engagementLevel = calculateEngagementLevel();
      
      await trackLearningSignal({
        ...data,
        engagementLevel,
        sessionId: sessionStartTime.current.toString(),
        timestamp: new Date().toISOString(),
      });

      console.log('📊 DNA Signal tracked:', data.type);
    } catch (error) {
      // Silently fail - don't disrupt user experience
      console.warn('DNA tracking failed:', error);
    }
  };

  const trackPageView = (path: string, metadata?: Record<string, any>) => {
    const pageData = inferPageData(path);
    if (pageData) {
      trackSignal({
        ...pageData,
        completed: false,
        ...metadata,
      });
    }
  };

  const trackAction = (action: string, metadata?: Record<string, any>) => {
    // Map actions to signal types
    const actionMap: Record<string, Partial<LearningSignalData>> = {
      'quiz_start': { type: 'quiz_attempt', completed: false },
      'quiz_complete': { type: 'quiz_complete', completed: true },
      'video_play': { type: 'video_watch', completed: false, mediaType: 'video', interactionType: 'watching' },
      'video_complete': { type: 'video_watch', completed: true, mediaType: 'video', interactionType: 'watching' },
      'webinar_join': { type: 'webinar_join', completed: false, mediaType: 'video', interactionType: 'watching' },
      'ai_chat_start': { type: 'ai_chat', completed: false, interactionType: 'discussing' },
      'resource_download': { type: 'resource_download', completed: true },
    };

    const signalData = actionMap[action];
    if (signalData) {
      trackSignal({
        ...signalData,
        ...metadata,
      });
    }
  };

  const calculateEngagementLevel = (): number => {
    const recentActivity = activityLog.current.filter(
      log => Date.now() - log.timestamp < 300000 // Last 5 minutes
    );

    if (recentActivity.length === 0) return 30; // Low engagement

    const totalInteractions = recentActivity.reduce((sum, log) => sum + log.interactions, 0);
    const avgInteractions = totalInteractions / recentActivity.length;

    // Scale to 0-100
    return Math.min(100, Math.round(avgInteractions * 5));
  };

  const inferPageData = (path: string): Partial<LearningSignalData> | null => {
    // Course pages
    if (path.startsWith('/courses/')) {
      const courseSlug = path.split('/courses/')[1]?.split('/')[0];
      return {
        type: 'course_view',
        courseId: courseSlug,
        mediaType: 'text',
        interactionType: 'reading',
        completed: false,
      };
    }

    // Webinar pages
    if (path.startsWith('/webinars/')) {
      return {
        type: 'webinar_join',
        mediaType: 'video',
        interactionType: 'watching',
        completed: false,
      };
    }

    // AI chat
    if (path === '/ai') {
      return {
        type: 'ai_chat',
        interactionType: 'discussing',
        completed: false,
      };
    }

    // Careers section
    if (path.startsWith('/careers')) {
      return {
        type: 'course_view',
        subject: 'Careers',
        topic: 'Career Exploration',
        mediaType: 'text',
        interactionType: 'reading',
        completed: false,
      };
    }

    // Life skills / Wellbeing
    if (path.startsWith('/life-skills') || path.startsWith('/wellbeing')) {
      return {
        type: 'course_view',
        subject: 'Wellbeing',
        topic: 'Life Skills',
        mediaType: 'text',
        interactionType: 'reading',
        completed: false,
      };
    }

    return null;
  };

  const value: DNATrackingContextType = {
    trackSignal,
    trackPageView,
    trackAction,
  };

  return (
    <DNATrackingContext.Provider value={value}>
      {children}
    </DNATrackingContext.Provider>
  );
}

export function useDNATracking() {
  const context = useContext(DNATrackingContext);
  if (!context) {
    // Return dummy functions if provider not available
    return {
      trackSignal: async () => {},
      trackPageView: () => {},
      trackAction: () => {},
    };
  }
  return context;
}

