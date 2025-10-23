# 🧬 DNA Tracking System - Developer Guide

## Overview

The Academic DNA system automatically tracks user learning behavior and calculates personalized learning profiles. The tracking system is **fully automatic** for basic navigation, but you can also manually track specific events for more accurate DNA profiles.

---

## ✨ Automatic Tracking (No Code Required)

The `DNATrackingProvider` automatically tracks:

- ✅ **Page visits** - All course, webinar, AI, and content pages
- ✅ **Session duration** - Time spent on each page
- ✅ **User engagement** - Clicks, scrolls, keyboard interactions
- ✅ **Study sessions** - Login/logout and total session time
- ✅ **Learning patterns** - Time of day, day of week, consistency

### What Gets Tracked Automatically

| Page Route | Signal Type | Subject Inferred |
|------------|-------------|------------------|
| `/courses/*` | `course_view` | From course slug |
| `/webinars/*` | `webinar_join` | From webinar data |
| `/ai` | `ai_chat` | General |
| `/careers` | `course_view` | Careers |
| `/life-skills` | `course_view` | Wellbeing |
| `/wellbeing` | `course_view` | Wellbeing |

---

## 🎯 Manual Tracking (Recommended for Key Events)

For better accuracy, manually track important learning events like quiz completions, video progress, and achievements.

### Using the `useLearningTracker` Hook

```typescript
import { useLearningTracker } from '@/hooks/useLearningTracker';

function MyQuizComponent({ quizId, subject }: QuizProps) {
  const tracker = useLearningTracker();
  const [startTime, setStartTime] = useState<number>();

  const handleQuizStart = () => {
    setStartTime(Date.now());
    tracker.trackQuizStart(quizId, subject, 'Algebra');
  };

  const handleQuizComplete = (score: number) => {
    const duration = Math.floor((Date.now() - startTime!) / 1000);
    tracker.trackQuizComplete(quizId, score, duration, subject, 'Algebra');
  };

  return (
    <div>
      <button onClick={handleQuizStart}>Start Quiz</button>
      {/* ... quiz questions ... */}
      <button onClick={() => handleQuizComplete(85)}>Submit</button>
    </div>
  );
}
```

### Available Tracking Functions

#### Course Tracking

```typescript
const tracker = useLearningTracker();

// When a student enrolls in a course
tracker.trackCourseEnroll('course-123', 'Mathematics');

// When a student completes a course
tracker.trackCourseComplete('course-123', 'Mathematics', 3600); // 1 hour
```

#### Quiz Tracking

```typescript
// When a quiz starts
tracker.trackQuizStart('quiz-456', 'Physics', 'Newton\'s Laws');

// When a quiz is completed
tracker.trackQuizComplete(
  'quiz-456',      // Quiz ID
  92,              // Score (0-100)
  300,             // Duration in seconds
  'Physics',       // Subject
  'Newton\'s Laws' // Topic (optional)
);
```

#### Video Tracking

```typescript
// When a video starts playing
tracker.trackVideoStart('video-789', 'Chemistry', 'Periodic Table');

// When a video completes or user finishes watching
tracker.trackVideoComplete(
  'video-789',
  600,             // Duration watched in seconds
  'Chemistry',
  'Periodic Table'
);
```

#### Webinar Tracking

```typescript
// When a student joins a webinar
tracker.trackWebinarJoin('webinar-101', 'Computer Science');
```

#### AI Chat Tracking

```typescript
// Track AI chat engagement
tracker.trackAIChatMessage(
  15,    // Number of messages exchanged
  1200   // Duration in seconds
);
```

#### Resource Downloads

```typescript
// When a student downloads study materials
tracker.trackResourceDownload(
  'resource-202',
  'pdf',           // Resource type
  'History'        // Subject
);
```

---

## 🔧 Advanced: Custom Signal Tracking

For custom events not covered by the hook, use the low-level `useDNATracking`:

```typescript
import { useDNATracking } from '@/contexts/dna-tracking-context';

function MyCustomComponent() {
  const { trackSignal, trackAction } = useDNATracking();

  const handleCustomEvent = async () => {
    await trackSignal({
      type: 'course_view',
      subject: 'Custom Subject',
      topic: 'Custom Topic',
      duration: 300,
      score: 95,
      completed: true,
      engagementLevel: 85,
      mediaType: 'interactive',
      interactionType: 'doing',
    });
  };

  return <button onClick={handleCustomEvent}>Custom Action</button>;
}
```

---

## 📊 How DNA Profiles Are Calculated

### Data Collection (Continuous)

1. **Behavioral Signals** are stored in `learningSignals` collection
2. Each signal includes:
   - Type (course view, quiz, webinar, etc.)
   - Subject and topic
   - Time of day and day of week
   - Duration and engagement level
   - Performance (scores)
   - Media type and interaction type

### DNA Calculation (Nightly at 2 AM)

The Cloud Function `calculateLearningDNA` runs every night and:

1. **Fetches signals** from the last 90 days
2. **Analyzes behavioral patterns**:
   - Visual learners: High engagement with video/diagram content
   - Auditory learners: High engagement with audio/discussion
   - Kinesthetic learners: High engagement with interactive activities
   - Logical learners: High performance in Math/Science
   - Creative learners: High engagement with Art/Creative subjects
   - Social learners: Frequent webinar attendance, discussion participation
   - Solitary learners: Late-night study, AI chat usage
3. **Calculates learning patterns**:
   - Peak learning hours (based on activity timestamps)
   - Consistency score (regularity of study)
   - Focus score (quiz attempt efficiency)
   - Completion rate (% of started courses finished)
4. **Generates subject affinities**:
   - Weighted by time spent, performance, and engagement
5. **Updates `learningDNA` collection**

### Confidence Score

The DNA profile includes a confidence score (0-100) based on:
- Number of learning signals collected (more data = higher confidence)
- Number of questionnaire responses (explicit preferences)
- Time since account creation

**Minimum thresholds:**
- < 100 signals: Low confidence (show as "Building your profile...")
- 100-500 signals: Medium confidence (show basic DNA)
- 500+ signals: High confidence (show full DNA with recommendations)

---

## 🎨 UI Integration Examples

### Example 1: Course Component

```typescript
'use client';

import { useEffect } from 'react';
import { useLearningTracker } from '@/hooks/useLearningTracker';

export function CourseView({ course }: { course: Course }) {
  const tracker = useLearningTracker();

  // Automatically track when component mounts
  useEffect(() => {
    tracker.trackCourseEnroll(course.id, course.subject);
  }, [course.id]);

  const handleComplete = () => {
    tracker.trackCourseComplete(course.id, course.subject, 3600);
    // ... mark course as complete in UI
  };

  return (
    <div>
      <h1>{course.title}</h1>
      {/* ... course content ... */}
      <button onClick={handleComplete}>Mark Complete</button>
    </div>
  );
}
```

### Example 2: Video Player

```typescript
import { useRef, useEffect } from 'react';
import { useLearningTracker } from '@/hooks/useLearningTracker';

export function VideoPlayer({ video }: { video: Video }) {
  const tracker = useLearningTracker();
  const startTime = useRef<number>();

  const handlePlay = () => {
    startTime.current = Date.now();
    tracker.trackVideoStart(video.id, video.subject, video.topic);
  };

  const handleEnded = () => {
    if (startTime.current) {
      const duration = Math.floor((Date.now() - startTime.current) / 1000);
      tracker.trackVideoComplete(video.id, duration, video.subject, video.topic);
    }
  };

  return (
    <video
      src={video.url}
      onPlay={handlePlay}
      onEnded={handleEnded}
      controls
    />
  );
}
```

### Example 3: Quiz Component

```typescript
import { useState } from 'react';
import { useLearningTracker } from '@/hooks/useLearningTracker';

export function QuizComponent({ quiz }: { quiz: Quiz }) {
  const tracker = useLearningTracker();
  const [startTime, setStartTime] = useState<number>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setStartTime(Date.now());
    tracker.trackQuizStart(quiz.id, quiz.subject, quiz.topic);
  };

  const submitQuiz = () => {
    if (!startTime) return;
    
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const finalScore = (score / quiz.questions.length) * 100;
    
    tracker.trackQuizComplete(
      quiz.id,
      Math.round(finalScore),
      duration,
      quiz.subject,
      quiz.topic
    );
  };

  return (
    <div>
      {!startTime ? (
        <button onClick={startQuiz}>Start Quiz</button>
      ) : (
        <>
          {/* ... quiz questions ... */}
          <button onClick={submitQuiz}>Submit</button>
        </>
      )}
    </div>
  );
}
```

---

## 🔒 Privacy & Consent

### Checking User Consent

```typescript
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function checkDNAConsent(userId: string): Promise<boolean> {
  const dnaDoc = await getDoc(doc(db, 'learningDNA', userId));
  return dnaDoc.exists() && dnaDoc.data()?.consent?.dataCollection === true;
}
```

### Opting Out

Users can opt out of DNA tracking in their settings:

```typescript
import { doc, updateDoc } from 'firebase/firestore';

async function disableDNATracking(userId: string) {
  await updateDoc(doc(db, 'learningDNA', userId), {
    'consent.dataCollection': false,
  });
}
```

Once opted out, the `trackLearningSignal` function will silently skip tracking.

---

## 🧪 Testing

### Local Testing

```typescript
// Enable verbose logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('DNA Tracking initialized');
}
```

### Viewing Collected Signals

In Firebase Console:
1. Go to Firestore Database
2. Open `learningSignals` collection
3. Filter by `userId == "your-test-user-id"`
4. Sort by `timestamp` descending

### Triggering Manual DNA Calculation

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const calculateDNA = httpsCallable(functions, 'dnaFunctions-calculateUserDNA');

// Trigger immediate calculation (instead of waiting for nightly run)
await calculateDNA({ userId: 'test-user-123' });
```

---

## 📈 Monitoring & Analytics

### Dashboard Metrics

Track DNA system health:
- Total signals collected per day
- Users with DNA profiles
- Average confidence scores
- Calculation success rate

### Query Examples

```typescript
// Get all signals for a user in the last 7 days
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const signals = await getDocs(
  query(
    collection(db, 'learningSignals'),
    where('userId', '==', userId),
    where('timestamp', '>=', sevenDaysAgo),
    orderBy('timestamp', 'desc')
  )
);
```

---

## 🚀 Best Practices

1. **Track key events manually** - Don't rely solely on automatic page tracking
2. **Include subject/topic** - Helps calculate accurate subject affinities
3. **Track durations** - Essential for understanding engagement
4. **Track scores** - Critical for performance-based DNA dimensions
5. **Use consistent IDs** - Always use the same ID format for courses/quizzes
6. **Test thoroughly** - Verify signals appear in Firestore after user actions
7. **Respect privacy** - Always check consent before tracking
8. **Handle errors gracefully** - Tracking failures shouldn't break the UX

---

## 🛠️ Troubleshooting

### Issue: Signals not being tracked

**Check:**
1. Is `DNATrackingProvider` wrapped in the app? (`providers.tsx`)
2. Is user authenticated? (`useAuth()`)
3. Are Cloud Functions deployed? (`firebase deploy --only functions`)
4. Check browser console for tracking logs

### Issue: DNA profile not updating

**Check:**
1. Has the nightly function run? (Check Cloud Functions logs)
2. Are there enough signals? (Minimum ~50 for initial profile)
3. Is `calculateLearningDNA` scheduled? (Check Firebase Console > Functions > Cron jobs)

### Issue: Low confidence scores

**Solution:**
- Encourage more platform usage
- Complete DNA questionnaire (adds explicit preference data)
- Wait for more behavioral data to accumulate

---

## 📚 Additional Resources

- [Section 22 Documentation](../docs/SECTION_22_ACADEMIC_DNA.md)
- [Firestore Structure](../docs/FIRESTORE_STRUCTURE.md)
- [Cloud Functions Guide](../docs/CLOUD_FUNCTIONS.md)

---

## 🎯 Quick Start Checklist

- [x] `DNATrackingProvider` added to `providers.tsx`
- [x] Automatic page tracking enabled
- [x] Manual tracking hook available (`useLearningTracker`)
- [x] Cloud Functions deployed
- [x] Firestore collections created
- [x] Security rules applied
- [ ] Add tracking to your course components
- [ ] Add tracking to your quiz components
- [ ] Add tracking to your video players
- [ ] Test with real user accounts
- [ ] Verify DNA profiles calculate correctly

**That's it! Your DNA tracking system is fully functional.** 🎉

New features added to the platform will automatically benefit from DNA tracking as long as they use the standard routing patterns or call the tracking functions manually.

