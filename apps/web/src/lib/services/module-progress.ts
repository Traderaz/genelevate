import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ModuleProgress, ModuleUnlockInfo } from '@/types/module-progress';

// Re-export types for convenience
export type { ModuleProgress, ModuleUnlockInfo } from '@/types/module-progress';

const MODULE_SEQUENCE: string[] = [
  'fin-1', // First module - always unlocked
  'fin-2',
  'fin-3',
  'fin-4',
  'fin-5',
  'fin-6',
  'fin-7',
  'life-2',
  'life-1',
  'life-3',
  'life-4', // Travel Organization
  'bus-1', // Entrepreneurial Creativity
  'prof-1', // Cultural Capital
  'mark-1', // Social Media Marketing
  'bus-2', // Business Fundamentals
  'eth-4',
  'com-1',
  'com-2',
  'com-3',
  'com-4',
  'mh-1',
  'mh-2',
  'mh-3',
  'mh-4'
];

const UNLOCK_DELAY_DAYS = 7;

/**
 * Get user's progress for a specific module
 */
export async function getModuleProgress(userId: string, moduleId: string): Promise<ModuleProgress | null> {
  try {
    const progressRef = doc(db, 'moduleProgress', `${userId}_${moduleId}`);
    const progressDoc = await getDoc(progressRef);
    
    if (!progressDoc.exists()) {
      return null;
    }
    
    const data = progressDoc.data();
    return {
      userId: data.userId,
      moduleId: data.moduleId,
      completed: data.completed,
      completedAt: data.completedAt?.toDate(),
      lessonsCompleted: data.lessonsCompleted,
      totalLessons: data.totalLessons,
      startedAt: data.startedAt?.toDate(),
      lastAccessedAt: data.lastAccessedAt?.toDate(),
      unlocked: data.unlocked,
      unlockedAt: data.unlockedAt?.toDate()
    };
  } catch (error) {
    console.error('Error getting module progress:', error);
    return null;
  }
}

/**
 * Get all module progress for a user
 */
export async function getAllModuleProgress(userId: string): Promise<ModuleProgress[]> {
  try {
    const progressRef = collection(db, 'moduleProgress');
    const q = query(progressRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        userId: data.userId,
        moduleId: data.moduleId,
        completed: data.completed,
        completedAt: data.completedAt?.toDate(),
        lessonsCompleted: data.lessonsCompleted,
        totalLessons: data.totalLessons,
        startedAt: data.startedAt?.toDate(),
        lastAccessedAt: data.lastAccessedAt?.toDate(),
        unlocked: data.unlocked,
        unlockedAt: data.unlockedAt?.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting all module progress:', error);
    return [];
  }
}

/**
 * Check if a module is unlocked for a user
 * Admins bypass all locking restrictions
 */
export async function checkModuleUnlock(userId: string, moduleId: string): Promise<ModuleUnlockInfo> {
  // Check if user is admin - admins have access to all modules
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    const isAdmin = userData?.role === 'admin';
    
    console.log('🔐 Module unlock check:', { userId, moduleId, role: userData?.role, isAdmin });
    
    if (isAdmin) {
      console.log('✅ Admin access granted for module:', moduleId);
      return {
        moduleId,
        isUnlocked: true,
        reason: 'admin_access'
      };
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    // Continue with normal logic if admin check fails
  }

  const moduleIndex = MODULE_SEQUENCE.indexOf(moduleId);
  
  // Module not in sequence
  if (moduleIndex === -1) {
    return {
      moduleId,
      isUnlocked: false,
      reason: 'waiting_period'
    };
  }
  
  // First module is always unlocked
  if (moduleIndex === 0) {
    return {
      moduleId,
      isUnlocked: true,
      reason: 'first_module'
    };
  }
  
  // Check if previous module is completed
  const previousModuleId = MODULE_SEQUENCE[moduleIndex - 1];
  const previousProgress = await getModuleProgress(userId, previousModuleId);
  
  // Previous module not completed
  if (!previousProgress || !previousProgress.completed) {
    return {
      moduleId,
      isUnlocked: false,
      reason: 'waiting_period',
      previousModuleId
    };
  }
  
  // Check if 7 days have passed since previous module completion
  const completedAt = previousProgress.completedAt;
  if (!completedAt) {
    return {
      moduleId,
      isUnlocked: false,
      reason: 'waiting_period',
      previousModuleId
    };
  }
  
  const daysSinceCompletion = Math.floor(
    (Date.now() - completedAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const daysRemaining = UNLOCK_DELAY_DAYS - daysSinceCompletion;
  
  if (daysRemaining > 0) {
    return {
      moduleId,
      isUnlocked: false,
      reason: 'waiting_period',
      daysUntilUnlock: daysRemaining,
      previousModuleId,
      previousCompletedAt: completedAt
    };
  }
  
  // Module is unlocked
  return {
    moduleId,
    isUnlocked: true,
    reason: 'previous_completed',
    previousModuleId,
    previousCompletedAt: completedAt
  };
}

/**
 * Initialize module progress when user first accesses a module
 */
export async function initializeModuleProgress(
  userId: string, 
  moduleId: string, 
  totalLessons: number
): Promise<void> {
  try {
    const unlockInfo = await checkModuleUnlock(userId, moduleId);
    
    if (!unlockInfo.isUnlocked) {
      throw new Error('Module is locked');
    }
    
    const progressRef = doc(db, 'moduleProgress', `${userId}_${moduleId}`);
    const existingProgress = await getDoc(progressRef);
    
    if (existingProgress.exists()) {
      // Just update last accessed
      await updateDoc(progressRef, {
        lastAccessedAt: Timestamp.now()
      });
      return;
    }
    
    // Create new progress record
    await setDoc(progressRef, {
      userId,
      moduleId,
      completed: false,
      lessonsCompleted: 0,
      totalLessons,
      startedAt: Timestamp.now(),
      lastAccessedAt: Timestamp.now(),
      unlocked: true,
      unlockedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error initializing module progress:', error);
    throw error;
  }
}

/**
 * Update lesson completion
 */
export async function updateLessonCompletion(
  userId: string,
  moduleId: string,
  lessonsCompleted: number,
  totalLessons: number
): Promise<void> {
  try {
    const progressRef = doc(db, 'moduleProgress', `${userId}_${moduleId}`);
    const isCompleted = lessonsCompleted >= totalLessons;
    
    const updateData: any = {
      lessonsCompleted,
      lastAccessedAt: Timestamp.now()
    };
    
    if (isCompleted && lessonsCompleted === totalLessons) {
      updateData.completed = true;
      updateData.completedAt = Timestamp.now();
    }
    
    await updateDoc(progressRef, updateData);
  } catch (error) {
    console.error('Error updating lesson completion:', error);
    throw error;
  }
}

/**
 * Mark module as completed
 */
export async function completeModule(userId: string, moduleId: string): Promise<void> {
  try {
    const progressRef = doc(db, 'moduleProgress', `${userId}_${moduleId}`);
    
    await updateDoc(progressRef, {
      completed: true,
      completedAt: Timestamp.now(),
      lastAccessedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error completing module:', error);
    throw error;
  }
}

/**
 * Get all unlocked modules for a user
 */
export async function getUnlockedModules(userId: string): Promise<string[]> {
  const unlockedModules: string[] = [];
  
  for (const moduleId of MODULE_SEQUENCE) {
    const unlockInfo = await checkModuleUnlock(userId, moduleId);
    if (unlockInfo.isUnlocked) {
      unlockedModules.push(moduleId);
    }
  }
  
  return unlockedModules;
}

/**
 * Get module sequence
 */
export function getModuleSequence(): string[] {
  return [...MODULE_SEQUENCE];
}

