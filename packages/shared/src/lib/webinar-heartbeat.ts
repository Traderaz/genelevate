import { WebinarHeartbeat, WebinarAttendance } from '../types/webinar';

export interface HeartbeatConfig {
  interval: number; // seconds
  maxIdleTime: number; // seconds
  maxMissedHeartbeats: number;
  enableIdleDetection: boolean;
  enableEngagementTracking: boolean;
}

export class WebinarHeartbeatManager {
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private idleTimeout: NodeJS.Timeout | null = null;
  private lastActivity: Date = new Date();
  private isIdle: boolean = false;
  private isActive: boolean = true;
  private sessionId: string;
  private config: HeartbeatConfig;

  // Event listeners
  private mouseListener: ((e: MouseEvent) => void) | null = null;
  private keyListener: ((e: KeyboardEvent) => void) | null = null;
  private scrollListener: ((e: Event) => void) | null = null;
  private visibilityListener: (() => void) | null = null;
  private focusListener: (() => void) | null = null;
  private blurListener: (() => void) | null = null;

  constructor(
    private userId: string,
    private webinarId: string,
    private onHeartbeat: (heartbeat: WebinarHeartbeat) => Promise<void>,
    private onIdleChange: (isIdle: boolean) => void,
    config: Partial<HeartbeatConfig> = {}
  ) {
    this.sessionId = this.generateSessionId();
    this.config = {
      interval: 30, // 30 seconds
      maxIdleTime: 300, // 5 minutes
      maxMissedHeartbeats: 3,
      enableIdleDetection: true,
      enableEngagementTracking: true,
      ...config,
    };
  }

  start(): void {
    this.setupEventListeners();
    this.startHeartbeat();
    this.resetIdleTimer();
  }

  stop(): void {
    this.cleanup();
  }

  private setupEventListeners(): void {
    if (!this.config.enableEngagementTracking) return;

    // Mouse movement detection
    this.mouseListener = this.throttle(() => {
      this.recordActivity('mouse_move');
    }, 1000);
    document.addEventListener('mousemove', this.mouseListener);

    // Keyboard activity detection
    this.keyListener = () => {
      this.recordActivity('key_press');
    };
    document.addEventListener('keydown', this.keyListener);

    // Scroll activity detection
    this.scrollListener = this.throttle(() => {
      this.recordActivity('scroll');
    }, 1000);
    document.addEventListener('scroll', this.scrollListener);

    // Page visibility detection
    this.visibilityListener = () => {
      this.recordActivity('visibility_change');
    };
    document.addEventListener('visibilitychange', this.visibilityListener);

    // Window focus detection
    this.focusListener = () => {
      this.recordActivity('focus');
    };
    window.addEventListener('focus', this.focusListener);

    this.blurListener = () => {
      this.recordActivity('blur');
    };
    window.addEventListener('blur', this.blurListener);
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
    }, this.config.interval * 1000);

    // Send initial heartbeat
    this.sendHeartbeat();
  }

  private async sendHeartbeat(): Promise<void> {
    const heartbeat: WebinarHeartbeat = {
      userId: this.userId,
      webinarId: this.webinarId,
      sessionId: this.sessionId,
      timestamp: new Date(),
      isActive: this.isActive,
      isVisible: !document.hidden,
      isFocused: document.hasFocus(),
      connectionQuality: await this.measureConnectionQuality(),
      lastInteraction: this.lastActivity,
      mouseMovement: this.hasRecentActivity('mouse_move'),
      keyboardActivity: this.hasRecentActivity('key_press'),
      scrollActivity: this.hasRecentActivity('scroll'),
    };

    try {
      await this.onHeartbeat(heartbeat);
    } catch (error) {
      console.error('Failed to send heartbeat:', error);
    }
  }

  private recordActivity(type: string): void {
    this.lastActivity = new Date();
    
    if (this.isIdle) {
      this.setIdleState(false);
    }

    this.resetIdleTimer();
  }

  private resetIdleTimer(): void {
    if (!this.config.enableIdleDetection) return;

    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
    }

    this.idleTimeout = setTimeout(() => {
      this.setIdleState(true);
    }, this.config.maxIdleTime * 1000);
  }

  private setIdleState(isIdle: boolean): void {
    if (this.isIdle !== isIdle) {
      this.isIdle = isIdle;
      this.onIdleChange(isIdle);
    }
  }

  private hasRecentActivity(type: string, withinSeconds: number = 30): boolean {
    const cutoff = new Date(Date.now() - withinSeconds * 1000);
    return this.lastActivity > cutoff;
  }

  private async measureConnectionQuality(): Promise<'excellent' | 'good' | 'fair' | 'poor'> {
    try {
      const startTime = performance.now();
      
      // Simple ping test using a small image request
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7?t=${Date.now()}`;
      });

      const latency = performance.now() - startTime;

      if (latency < 50) return 'excellent';
      if (latency < 150) return 'good';
      if (latency < 300) return 'fair';
      return 'poor';
    } catch {
      return 'poor';
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    
    return ((...args: any[]) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    }) as T;
  }

  private cleanup(): void {
    // Clear intervals
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }

    // Remove event listeners
    if (this.mouseListener) {
      document.removeEventListener('mousemove', this.mouseListener);
    }
    if (this.keyListener) {
      document.removeEventListener('keydown', this.keyListener);
    }
    if (this.scrollListener) {
      document.removeEventListener('scroll', this.scrollListener);
    }
    if (this.visibilityListener) {
      document.removeEventListener('visibilitychange', this.visibilityListener);
    }
    if (this.focusListener) {
      window.removeEventListener('focus', this.focusListener);
    }
    if (this.blurListener) {
      window.removeEventListener('blur', this.blurListener);
    }
  }

  // Public getters
  get currentSessionId(): string {
    return this.sessionId;
  }

  get isCurrentlyIdle(): boolean {
    return this.isIdle;
  }

  get isCurrentlyActive(): boolean {
    return this.isActive;
  }

  get lastActivityTime(): Date {
    return this.lastActivity;
  }
}

// Attendance Calculator Utility
export class AttendanceCalculator {
  static calculateAttendancePercentage(
    joinTime: Date,
    leaveTime: Date,
    webinarDuration: number, // minutes
    idleTime: number = 0 // seconds
  ): number {
    const sessionDuration = (leaveTime.getTime() - joinTime.getTime()) / 1000; // seconds
    const activeTime = Math.max(0, sessionDuration - idleTime);
    const webinarDurationSeconds = webinarDuration * 60;
    
    return Math.min(100, (activeTime / webinarDurationSeconds) * 100);
  }

  static isAttendanceCredited(
    attendancePercentage: number,
    threshold: number = 75
  ): boolean {
    return attendancePercentage >= threshold;
  }

  static calculateEngagementScore(
    heartbeatCount: number,
    expectedHeartbeats: number,
    interactionCount: number,
    idleTime: number,
    sessionDuration: number // seconds
  ): number {
    // Normalize metrics (0-1)
    const heartbeatScore = Math.min(1, heartbeatCount / expectedHeartbeats);
    const interactionScore = Math.min(1, interactionCount / 10); // Assume 10 interactions is max
    const activeScore = Math.max(0, 1 - (idleTime / sessionDuration));

    // Weighted average
    return (heartbeatScore * 0.4 + interactionScore * 0.3 + activeScore * 0.3) * 100;
  }
}
