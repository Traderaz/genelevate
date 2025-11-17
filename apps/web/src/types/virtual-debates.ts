/**
 * Virtual Debates Types
 * 
 * Live team debates for top-performing students
 */

import { Timestamp } from 'firebase/firestore';

export interface VirtualDebate {
  id: string;
  title: string;
  description: string;
  scheduledTime: Timestamp; // When the live debate will happen
  durationMinutes: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  debateTopicId: string; // Link to the monthly debate topic
  participants: string[]; // Array of user IDs (top students invited to speak)
  hostId: string; // Admin user ID
  meetingLink: string; // Link to the video conference (e.g., Google Meet, Zoom)
  recordingUrl?: string; // URL to the recording after completion
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface VirtualDebateParticipant {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  role: 'speaker' | 'viewer'; // Speaker for invited students, viewer for others
  joinedAt: Timestamp;
}

