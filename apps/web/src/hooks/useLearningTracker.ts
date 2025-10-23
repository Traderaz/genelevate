/**
 * Learning Tracker Hook
 * 
 * Provides easy-to-use functions for tracking specific learning actions
 * Use this in course, quiz, and webinar components
 */

import { useCallback } from 'react';
import { useDNATracking } from '@/contexts/dna-tracking-context';

export function useLearningTracker() {
  const { trackSignal, trackAction } = useDNATracking();

  // Track course enrollment
  const trackCourseEnroll = useCallback((courseId: string, subject?: string) => {
    trackSignal({
      type: 'course_view',
      courseId,
      subject,
      completed: false,
      mediaType: 'text',
    });
  }, [trackSignal]);

  // Track course completion
  const trackCourseComplete = useCallback((courseId: string, subject?: string, duration?: number) => {
    trackSignal({
      type: 'course_view',
      courseId,
      subject,
      duration,
      completed: true,
      mediaType: 'text',
    });
  }, [trackSignal]);

  // Track quiz attempt
  const trackQuizStart = useCallback((quizId: string, subject?: string, topic?: string) => {
    trackAction('quiz_start', {
      courseId: quizId,
      subject,
      topic,
    });
  }, [trackAction]);

  // Track quiz completion
  const trackQuizComplete = useCallback((
    quizId: string,
    score: number,
    duration: number,
    subject?: string,
    topic?: string
  ) => {
    trackAction('quiz_complete', {
      courseId: quizId,
      subject,
      topic,
      score,
      duration,
    });
  }, [trackAction]);

  // Track video watching
  const trackVideoStart = useCallback((videoId: string, subject?: string, topic?: string) => {
    trackAction('video_play', {
      courseId: videoId,
      subject,
      topic,
    });
  }, [trackAction]);

  const trackVideoComplete = useCallback((
    videoId: string,
    duration: number,
    subject?: string,
    topic?: string
  ) => {
    trackAction('video_complete', {
      courseId: videoId,
      subject,
      topic,
      duration,
    });
  }, [trackAction]);

  // Track webinar attendance
  const trackWebinarJoin = useCallback((webinarId: string, subject?: string) => {
    trackAction('webinar_join', {
      courseId: webinarId,
      subject,
    });
  }, [trackAction]);

  // Track AI chat interaction
  const trackAIChatMessage = useCallback((messageCount: number, duration: number) => {
    trackSignal({
      type: 'ai_chat',
      duration,
      completed: false,
      interactionType: 'discussing',
      engagementLevel: Math.min(100, messageCount * 10),
    });
  }, [trackSignal]);

  // Track resource download
  const trackResourceDownload = useCallback((resourceId: string, resourceType: string, subject?: string) => {
    trackAction('resource_download', {
      courseId: resourceId,
      subject,
      mediaType: resourceType as any,
    });
  }, [trackAction]);

  return {
    trackCourseEnroll,
    trackCourseComplete,
    trackQuizStart,
    trackQuizComplete,
    trackVideoStart,
    trackVideoComplete,
    trackWebinarJoin,
    trackAIChatMessage,
    trackResourceDownload,
  };
}

