import { 
  Webinar, 
  WebinarProviderMeeting, 
  WebinarProviderParticipant 
} from '../../types/webinar';
import { BaseWebinarProvider } from './base-provider';

interface MockMeeting {
  id: string;
  webinar: Webinar;
  participants: Map<string, WebinarProviderParticipant>;
  status: 'scheduled' | 'live' | 'ended';
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  endedAt?: Date;
}

export class MockWebinarProvider extends BaseWebinarProvider {
  name = 'mock';
  private meetings = new Map<string, MockMeeting>();
  private eventCallbacks = new Map<string, Function[]>();

  async createMeeting(webinar: Webinar): Promise<WebinarProviderMeeting> {
    this.validateWebinar(webinar);

    const meetingId = this.generateMeetingId();
    const now = new Date();
    
    const mockMeeting: MockMeeting = {
      id: meetingId,
      webinar: { ...webinar },
      participants: new Map(),
      status: 'scheduled',
      createdAt: now,
      updatedAt: now,
    };

    this.meetings.set(meetingId, mockMeeting);

    return {
      id: meetingId,
      joinUrl: `https://mock-webinar.genelevate.app/join/${meetingId}`,
      startUrl: `https://mock-webinar.genelevate.app/start/${meetingId}`,
      password: this.generatePassword(),
      status: 'scheduled',
      participants: [],
      settings: {
        provider: 'mock',
        allowChat: webinar.allowChat,
        allowQA: webinar.allowQA,
        allowPolls: webinar.allowPolls,
        maxAttendees: webinar.maxAttendees,
        recordingEnabled: webinar.recordingAvailable,
      },
      createdAt: now,
      updatedAt: now,
    };
  }

  async updateMeeting(meetingId: string, updates: Partial<Webinar>): Promise<void> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    // Update the stored webinar data
    Object.assign(meeting.webinar, updates);
    meeting.updatedAt = new Date();

    // Emit update event
    this.emitEvent(meetingId, 'meeting_updated', { updates });
  }

  async deleteMeeting(meetingId: string): Promise<void> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    // End meeting if it's live
    if (meeting.status === 'live') {
      await this.endMeeting(meetingId);
    }

    this.meetings.delete(meetingId);
    this.emitEvent(meetingId, 'meeting_deleted', {});
  }

  async getMeetingInfo(meetingId: string): Promise<WebinarProviderMeeting> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    return {
      id: meetingId,
      joinUrl: `https://mock-webinar.genelevate.app/join/${meetingId}`,
      startUrl: `https://mock-webinar.genelevate.app/start/${meetingId}`,
      password: this.generatePassword(),
      status: meeting.status,
      participants: Array.from(meeting.participants.values()),
      settings: {
        provider: 'mock',
        allowChat: meeting.webinar.allowChat,
        allowQA: meeting.webinar.allowQA,
        allowPolls: meeting.webinar.allowPolls,
        maxAttendees: meeting.webinar.maxAttendees,
      },
      createdAt: meeting.createdAt,
      updatedAt: meeting.updatedAt,
    };
  }

  async generateJoinUrl(meetingId: string, userId: string, userName: string): Promise<string> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    // Generate personalized join URL with user context
    const params = new URLSearchParams({
      userId,
      userName: encodeURIComponent(userName),
      timestamp: Date.now().toString(),
    });

    return `https://mock-webinar.genelevate.app/join/${meetingId}?${params.toString()}`;
  }

  async getParticipants(meetingId: string): Promise<WebinarProviderParticipant[]> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    return Array.from(meeting.participants.values());
  }

  async startMeeting(meetingId: string): Promise<void> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    if (meeting.status === 'live') {
      throw new Error(`Meeting ${meetingId} is already live`);
    }

    if (meeting.status === 'ended') {
      throw new Error(`Meeting ${meetingId} has already ended`);
    }

    meeting.status = 'live';
    meeting.startedAt = new Date();
    meeting.updatedAt = new Date();

    this.emitEvent(meetingId, 'meeting_started', {
      startedAt: meeting.startedAt,
    });

    // Auto-end meeting after duration (for demo purposes)
    setTimeout(() => {
      if (meeting.status === 'live') {
        this.endMeeting(meetingId).catch(console.error);
      }
    }, meeting.webinar.duration * 60 * 1000);
  }

  async endMeeting(meetingId: string): Promise<void> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    if (meeting.status === 'ended') {
      return; // Already ended
    }

    // Disconnect all participants
    for (const participant of meeting.participants.values()) {
      if (!participant.leaveTime) {
        participant.leaveTime = new Date();
        participant.duration = this.calculateDuration(participant.joinTime, participant.leaveTime);
        participant.isActive = false;
      }
    }

    meeting.status = 'ended';
    meeting.endedAt = new Date();
    meeting.updatedAt = new Date();

    this.emitEvent(meetingId, 'meeting_ended', {
      endedAt: meeting.endedAt,
      totalParticipants: meeting.participants.size,
      duration: meeting.startedAt ? this.calculateDuration(meeting.startedAt, meeting.endedAt) : 0,
    });
  }

  // Mock-specific methods for testing
  async simulateParticipantJoin(meetingId: string, userId: string, userName: string): Promise<void> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    if (meeting.participants.has(userId)) {
      throw new Error(`Participant ${userId} already in meeting`);
    }

    // Check capacity
    if (meeting.webinar.maxAttendees && meeting.participants.size >= meeting.webinar.maxAttendees) {
      throw new Error('Meeting has reached maximum capacity');
    }

    const participant: WebinarProviderParticipant = {
      id: `${userId}_${Date.now()}`,
      userId,
      name: userName,
      joinTime: new Date(),
      duration: 0,
      isHost: meeting.participants.size === 0, // First participant is host
      isMuted: true, // Start muted
      hasVideo: false, // Start without video
      isActive: true,
    };

    meeting.participants.set(userId, participant);
    meeting.updatedAt = new Date();

    this.emitEvent(meetingId, 'participant_joined', {
      participant,
      totalParticipants: meeting.participants.size,
    });
  }

  async simulateParticipantLeave(meetingId: string, userId: string): Promise<void> {
    const meeting = this.meetings.get(meetingId);
    if (!meeting) {
      throw new Error(`Meeting ${meetingId} not found`);
    }

    const participant = meeting.participants.get(userId);
    if (!participant) {
      throw new Error(`Participant ${userId} not found in meeting`);
    }

    participant.leaveTime = new Date();
    participant.duration = this.calculateDuration(participant.joinTime, participant.leaveTime);
    participant.isActive = false;

    meeting.participants.delete(userId);
    meeting.updatedAt = new Date();

    this.emitEvent(meetingId, 'participant_left', {
      participant,
      totalParticipants: meeting.participants.size,
    });
  }

  // Event system for real-time updates
  onEvent(meetingId: string, callback: Function): void {
    if (!this.eventCallbacks.has(meetingId)) {
      this.eventCallbacks.set(meetingId, []);
    }
    this.eventCallbacks.get(meetingId)!.push(callback);
  }

  offEvent(meetingId: string, callback: Function): void {
    const callbacks = this.eventCallbacks.get(meetingId);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emitEvent(meetingId: string, eventType: string, data: any): void {
    const callbacks = this.eventCallbacks.get(meetingId);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(eventType, data);
        } catch (error) {
          console.error('Error in event callback:', error);
        }
      });
    }
  }

  private generatePassword(): string {
    return Math.random().toString(36).substr(2, 8);
  }

  // Utility methods for testing
  getAllMeetings(): MockMeeting[] {
    return Array.from(this.meetings.values());
  }

  getMeetingById(meetingId: string): MockMeeting | undefined {
    return this.meetings.get(meetingId);
  }

  clearAllMeetings(): void {
    this.meetings.clear();
    this.eventCallbacks.clear();
  }
}
