# Life Skills Sequential Module Unlock System

## Overview
Implemented a sequential unlock system for Life Skills modules where students must complete modules in order, with a 7-day waiting period between module completions.

## Features

### Sequential Learning
- **First Module Unlocked**: The first module (`fin-1`) is always unlocked for all students
- **Order Required**: Students must complete modules in a specific sequence
- **7-Day Delay**: After completing a module, students must wait 7 days before the next module unlocks
- **Progress Tracking**: All module progress is saved in Firestore for each user

### Module Sequence
The modules unlock in the following order:
1. UK Tax System Explained (fin-1) - **Always unlocked**
2. Mortgages & Home Buying (fin-2)
3. Pensions & Retirement Planning (fin-3)
4. Credit & Debt Management (fin-4)
5. Budgeting & Money Management (fin-5)
6. Student Finance & Loans (fin-6)
7. Banking & Accounts (fin-7)
8. Employment Rights (life-2)
9. Renting & Housing (life-1)
10. NHS & Healthcare (life-3)
11. Utilities & Council Tax (eth-4)
12. CV Writing & Job Applications (com-1)
13. Interview Skills & Techniques (com-2)
14. Professional Networking (com-3)
15. Workplace Communication (com-4)
16. Mental Health Awareness (mh-1)
17. Stress Management & Work-Life Balance (mh-2)
18. Time Management & Productivity (mh-3)
19. Personal Finance & Wellbeing (mh-4)

## Implementation

### Files Created

1. **`apps/web/src/types/module-progress.ts`**
   - Type definitions for module progress tracking
   - `ModuleProgress` interface
   - `ModuleUnlockInfo` interface

2. **`apps/web/src/lib/services/module-progress.ts`**
   - Service functions for managing module progress
   - Functions:
     - `getModuleProgress(userId, moduleId)` - Get user's progress for specific module
     - `getAllModuleProgress(userId)` - Get all module progress for user
     - `checkModuleUnlock(userId, moduleId)` - Check if module is unlocked
     - `initializeModuleProgress(userId, moduleId, totalLessons)` - Initialize progress
     - `updateLessonCompletion(userId, moduleId, completed, total)` - Update progress
     - `completeModule(userId, moduleId)` - Mark module as completed
     - `getUnlockedModules(userId)` - Get all unlocked modules
     - `getModuleSequence()` - Get the module order

### Files Modified

1. **`apps/web/src/components/wellbeing/life-skills-modules.tsx`**
   - Added real-time progress loading from Firestore
   - Integrated unlock status checking
   - Display lock information with countdown timers
   - Show available unlock date
   - Added info banner explaining sequential learning

## User Experience

### Unlocked Modules
- Display progress bars
- Show lessons completed
- Allow access to module content
- Status badges: "Not Started", "In Progress", "Completed"

### Locked Modules
- Display lock icon with days remaining
- Show "Unlocks in X days" message
- Display available unlock date
- Prevent clicking/navigation
- Reduced opacity for visual distinction
- Message: "Complete previous module first" if previous not done

### Visual Indicators
- **Lock Icon + Days**: Shows countdown (e.g., "🔒 5d")
- **Lock Message**: "Unlocks in 5 days" or "Complete previous module first"
- **Available Date**: Shows exact date when module becomes available
- **Info Banner**: Explains the sequential learning system at the top

## Firebase Structure

### Firestore Collection: `moduleProgress`
Document ID: `{userId}_{moduleId}`

```javascript
{
  userId: string,
  moduleId: string,
  completed: boolean,
  completedAt: Timestamp,
  lessonsCompleted: number,
  totalLessons: number,
  startedAt: Timestamp,
  lastAccessedAt: Timestamp,
  unlocked: boolean,
  unlockedAt: Timestamp
}
```

## Usage

### For Students
1. Start with the first module (always available)
2. Complete all lessons in the module
3. Wait 7 days after completion
4. Next module automatically unlocks
5. Repeat for all modules

### For Developers

To track when a student completes a lesson:
```typescript
import { updateLessonCompletion } from '@/lib/services/module-progress';

await updateLessonCompletion(userId, moduleId, completedLessons, totalLessons);
```

To manually complete a module:
```typescript
import { completeModule } from '@/lib/services/module-progress';

await completeModule(userId, moduleId);
```

To check unlock status:
```typescript
import { checkModuleUnlock } from '@/lib/services/module-progress';

const unlockInfo = await checkModuleUnlock(userId, moduleId);
// Returns: { isUnlocked, reason, daysUntilUnlock, previousModuleId, previousCompletedAt }
```

## Benefits

1. **Structured Learning**: Ensures students learn fundamentals before advanced topics
2. **Spaced Repetition**: 7-day delay allows time for knowledge retention
3. **Motivation**: Clear progression path encourages completion
4. **Engagement**: Regular check-ins to see when next module unlocks
5. **Data Tracking**: Complete visibility into student progress

## Future Enhancements

Potential improvements:
- Admin ability to override unlock requirements
- Adjustable waiting periods per module
- Achievement badges for completing module sets
- Email notifications when modules unlock
- Module prerequisites (skip certain modules if prerequisite met)
- Reset progress functionality

