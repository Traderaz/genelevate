export interface ModuleProgress {
  userId: string;
  moduleId: string;
  completed: boolean;
  completedAt?: Date;
  lessonsCompleted: number;
  totalLessons: number;
  startedAt: Date;
  lastAccessedAt: Date;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface ModuleUnlockInfo {
  moduleId: string;
  isUnlocked: boolean;
  reason?: 'first_module' | 'previous_completed' | 'waiting_period';
  daysUntilUnlock?: number;
  previousModuleId?: string;
  previousCompletedAt?: Date;
}

