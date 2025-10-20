import { 
  Webinar, 
  WebinarProvider, 
  WebinarProviderMeeting, 
  WebinarProviderParticipant 
} from '../../types/webinar';

export abstract class BaseWebinarProvider implements WebinarProvider {
  abstract name: string;

  abstract createMeeting(webinar: Webinar): Promise<WebinarProviderMeeting>;
  abstract updateMeeting(meetingId: string, updates: Partial<Webinar>): Promise<void>;
  abstract deleteMeeting(meetingId: string): Promise<void>;
  abstract getMeetingInfo(meetingId: string): Promise<WebinarProviderMeeting>;
  abstract generateJoinUrl(meetingId: string, userId: string, userName: string): Promise<string>;
  abstract getParticipants(meetingId: string): Promise<WebinarProviderParticipant[]>;
  abstract startMeeting(meetingId: string): Promise<void>;
  abstract endMeeting(meetingId: string): Promise<void>;

  // Common utility methods
  protected generateMeetingId(): string {
    return `${this.name.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  protected validateWebinar(webinar: Webinar): void {
    if (!webinar.title) {
      throw new Error('Webinar title is required');
    }
    if (!webinar.scheduledAt) {
      throw new Error('Webinar scheduled time is required');
    }
    if (webinar.duration <= 0) {
      throw new Error('Webinar duration must be positive');
    }
    if (webinar.maxAttendees && webinar.maxAttendees <= 0) {
      throw new Error('Max attendees must be positive');
    }
  }

  protected formatDateTime(date: Date): string {
    return date.toISOString();
  }

  protected calculateDuration(startTime: Date, endTime?: Date): number {
    if (!endTime) return 0;
    return Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  }
}
