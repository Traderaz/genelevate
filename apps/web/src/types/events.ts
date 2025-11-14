export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  organizer: string;
  organizerEmail?: string;
  maxParticipants?: number;
  registeredCount: number;
  imageUrl?: string;
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  yearGroups?: string[];
  subjects?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type EventType = 
  | 'webinar'
  | 'workshop'
  | 'seminar'
  | 'conference'
  | 'career-fair'
  | 'open-day'
  | 'exam-prep'
  | 'social'
  | 'competition'
  | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  color: string;
  extendedProps: {
    description: string;
    location?: string;
    isVirtual: boolean;
  };
}

export interface EventFilters {
  type?: EventType;
  startDate?: Date;
  endDate?: Date;
  yearGroup?: string;
  subject?: string;
  status?: Event['status'];
}

