# 🧬 Section 22: Academic DNA Profile System

## Overview

The **Academic DNA** module creates a unique learning fingerprint for each student by analyzing both explicit preferences (questionnaires) and implicit behavior patterns (platform usage, quiz performance, learning times).

## Core Objectives

1. ✅ Show cognitive strengths (visual, auditory, logical, creative)
2. ✅ Identify optimal learning hours and patterns
3. ✅ Highlight subject affinities and natural talents
4. ✅ Provide shareable profile card (with guardian consent)
5. ✅ Privacy-first design with granular consent controls

---

## 1. Firestore Collections Design

### Collection: `learningDNA` (Student DNA Profiles)

```typescript
interface LearningDNA {
  id: string;                          // matches userId
  userId: string;
  
  // Cognitive Strengths (0-100 scores)
  cognitiveProfile: {
    visual: number;                    // Visual learning preference
    auditory: number;                  // Audio/verbal learning
    kinesthetic: number;               // Hands-on/practical
    logical: number;                   // Analytical/mathematical
    creative: number;                  // Artistic/imaginative
    social: number;                    // Collaborative learning
    solitary: number;                  // Independent study
    
    // Derived from scores
    dominantStyle: 'visual' | 'auditory' | 'kinesthetic' | 'logical' | 'creative' | 'social' | 'solitary';
    secondaryStyle?: string;
  };
  
  // Learning Patterns
  learningPatterns: {
    // Best learning hours (0-23)
    peakHours: number[];               // [14, 15, 16, 20] = 2-4pm, 8pm
    avgSessionDuration: number;        // Minutes
    preferredDayOfWeek: string[];      // ['Monday', 'Wednesday']
    consistencyScore: number;          // 0-100 how consistent they are
    
    // Study habits
    focusScore: number;                // 0-100 based on quiz attempts
    completionRate: number;            // Percentage of started courses finished
    retentionRate: number;             // Quiz performance over time
  };
  
  // Subject Affinities
  subjectAffinities: {
    [subject: string]: {
      affinity: number;                // 0-100 natural inclination
      performance: number;             // 0-100 actual performance
      engagement: number;              // 0-100 time spent
      lastUpdated: Timestamp;
    };
  };
  
  // Metadata
  lastCalculated: Timestamp;
  dataPoints: number;                  // How many signals contributed
  confidence: number;                  // 0-100 confidence in DNA accuracy
  
  // Privacy & Sharing
  sharing: {
    isPublic: boolean;                 // Can anyone with link see it
    parentCanView: boolean;            // Parents can see
    institutionCanView: boolean;       // School can see
    shareableLink?: string;            // UUID for public sharing
    sharedWith: string[];              // User IDs who can view
  };
  
  // Consent
  consent: {
    dataCollection: boolean;           // Agreed to implicit tracking
    parentalConsent: boolean;          // Parent approved (if under 16)
    consentDate: Timestamp;
    consentVersion: string;            // Track policy version
  };
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Collection: `learningSignals` (Raw Behavioral Data)

```typescript
interface LearningSignal {
  id: string;
  userId: string;
  
  // Signal type
  type: 'course_view' | 'quiz_attempt' | 'quiz_complete' | 'webinar_join' | 
        'ai_chat' | 'video_watch' | 'resource_download' | 'study_session';
  
  // Context
  subject?: string;                    // e.g., 'Mathematics'
  topic?: string;                      // e.g., 'Algebra'
  courseId?: string;
  
  // Timing
  timestamp: Timestamp;
  duration?: number;                   // Seconds
  hourOfDay: number;                   // 0-23
  dayOfWeek: string;                   // 'Monday'
  
  // Performance indicators
  score?: number;                      // For quizzes
  completed: boolean;
  engagementLevel?: number;            // 0-100
  
  // Learning style indicators
  mediaType?: 'video' | 'audio' | 'text' | 'interactive';
  interactionType?: 'watching' | 'reading' | 'doing' | 'discussing';
  
  // Metadata
  sessionId?: string;                  // Group related signals
  deviceType?: string;
  
  createdAt: Timestamp;
}

// Index: userId + timestamp (for time-based queries)
// Index: userId + type (for signal type filtering)
// Index: userId + subject (for subject analysis)
```

### Collection: `dnaQuestionnaires` (Questionnaire Templates)

```typescript
interface DNAQuestionnaire {
  id: string;
  version: string;                     // e.g., 'v1.0'
  
  title: string;
  description: string;
  
  // Questions
  questions: Array<{
    id: string;
    category: 'cognitive' | 'preference' | 'habit' | 'personality';
    
    // Which DNA dimension this affects
    affectsDimensions: Array<{
      dimension: 'visual' | 'auditory' | 'kinesthetic' | 'logical' | 'creative' | 'social' | 'solitary';
      weight: number;                  // How much this question affects the dimension
    }>;
    
    question: string;
    type: 'scale' | 'multiple_choice' | 'ranking';
    
    // For scale questions (1-5 Likert scale)
    scaleMin?: number;
    scaleMax?: number;
    scaleLabels?: {
      min: string;                     // 'Strongly Disagree'
      max: string;                     // 'Strongly Agree'
    };
    
    // For multiple choice
    options?: Array<{
      id: string;
      text: string;
      scores: {                        // Which dimensions get points
        [dimension: string]: number;
      };
    }>;
    
    // For ranking
    itemsToRank?: string[];
    
    required: boolean;
  }>;
  
  // Targeting
  targetAgeRange?: [number, number];
  targetYearGroups?: string[];
  
  // Metadata
  estimatedMinutes: number;
  status: 'draft' | 'active' | 'archived';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Collection: `dnaResponses` (Student Questionnaire Responses)

```typescript
interface DNAResponse {
  id: string;
  userId: string;
  questionnaireId: string;
  questionnaireVersion: string;
  
  // Responses
  responses: Array<{
    questionId: string;
    answer: any;                       // Number, string, or array depending on question type
    timestamp: Timestamp;
  }>;
  
  // Derived scores from this questionnaire
  explicitScores: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    logical: number;
    creative: number;
    social: number;
    solitary: number;
  };
  
  // Completion
  startedAt: Timestamp;
  completedAt?: Timestamp;
  isComplete: boolean;
  progressPercentage: number;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Collection: `dnaSnapshots` (Historical DNA States)

```typescript
interface DNASnapshot {
  id: string;
  userId: string;
  
  // Full DNA state at this point in time
  dnaData: LearningDNA;
  
  // What changed
  changesSinceLast?: {
    cognitiveProfile: object;
    learningPatterns: object;
    subjectAffinities: object;
  };
  
  // Why snapshot was created
  reason: 'monthly' | 'significant_change' | 'manual' | 'year_end';
  
  createdAt: Timestamp;
}
```

---

## 2. Data Processing & Scoring Algorithm

### Nightly Cloud Function: `calculateLearningDNA`

```typescript
/**
 * Runs every night at 2 AM
 * Processes signals from the past 24 hours and updates DNA profiles
 */
export const calculateLearningDNA = functions.pubsub
  .schedule('0 2 * * *')
  .timeZone('Europe/London')
  .onRun(async (context) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Get all users who had activity yesterday
    const activeUsers = await getActiveUsers(yesterday);
    
    for (const userId of activeUsers) {
      await updateUserDNA(userId);
    }
  });

/**
 * Update a single user's DNA profile
 */
async function updateUserDNA(userId: string) {
  // 1. Fetch explicit data (questionnaire responses)
  const explicitData = await getExplicitScores(userId);
  
  // 2. Fetch implicit data (learning signals from last 90 days)
  const implicitData = await getImplicitScores(userId);
  
  // 3. Merge scores (70% implicit, 30% explicit for established users)
  const mergedScores = mergeScores(explicitData, implicitData, {
    explicitWeight: 0.3,
    implicitWeight: 0.7,
  });
  
  // 4. Calculate learning patterns
  const patterns = await calculateLearningPatterns(userId);
  
  // 5. Calculate subject affinities
  const affinities = await calculateSubjectAffinities(userId);
  
  // 6. Update Firestore
  await db.collection('learningDNA').doc(userId).set({
    userId,
    cognitiveProfile: mergedScores,
    learningPatterns: patterns,
    subjectAffinities: affinities,
    lastCalculated: FieldValue.serverTimestamp(),
    dataPoints: implicitData.totalSignals + explicitData.totalQuestions,
    confidence: calculateConfidence(implicitData.totalSignals, explicitData.totalQuestions),
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  
  // 7. Create snapshot if significant change
  await checkAndCreateSnapshot(userId);
}
```

### Scoring Algorithm Details

#### 1. Explicit Scores (from Questionnaires)

```typescript
async function getExplicitScores(userId: string) {
  const responses = await db
    .collection('dnaResponses')
    .where('userId', '==', userId)
    .where('isComplete', '==', true)
    .get();
  
  const scores = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    logical: 0,
    creative: 0,
    social: 0,
    solitary: 0,
  };
  
  let totalQuestions = 0;
  
  responses.forEach(doc => {
    const response = doc.data();
    // Add explicit scores from this response
    Object.keys(scores).forEach(dimension => {
      scores[dimension] += response.explicitScores[dimension] || 0;
    });
    totalQuestions += response.responses.length;
  });
  
  // Normalize to 0-100
  Object.keys(scores).forEach(key => {
    scores[key] = Math.min(100, (scores[key] / totalQuestions) * 20); // Assuming 5-point scale
  });
  
  return { scores, totalQuestions };
}
```

#### 2. Implicit Scores (from Behavior)

```typescript
async function getImplicitScores(userId: string) {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const signals = await db
    .collection('learningSignals')
    .where('userId', '==', userId)
    .where('timestamp', '>=', ninetyDaysAgo)
    .get();
  
  const scores = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    logical: 0,
    creative: 0,
    social: 0,
    solitary: 0,
  };
  
  signals.forEach(doc => {
    const signal = doc.data();
    
    // Media type preferences
    if (signal.mediaType === 'video') scores.visual += 2;
    if (signal.mediaType === 'audio') scores.auditory += 2;
    if (signal.mediaType === 'interactive') scores.kinesthetic += 2;
    
    // Interaction types
    if (signal.interactionType === 'watching') scores.visual += 1;
    if (signal.interactionType === 'doing') scores.kinesthetic += 1;
    
    // Subject-based inference
    if (signal.subject === 'Mathematics' || signal.subject === 'Science') {
      scores.logical += 1.5;
    }
    if (signal.subject === 'Art' || signal.subject === 'Music') {
      scores.creative += 1.5;
    }
    
    // Session type
    if (signal.type === 'webinar_join') scores.social += 1;
    if (signal.type === 'ai_chat' && signal.hourOfDay >= 22) {
      scores.solitary += 1; // Late night solo study
    }
    
    // Performance indicators
    if (signal.score) {
      if (signal.score >= 80) {
        // High performers often have strong logical reasoning
        scores.logical += 0.5;
      }
    }
  });
  
  // Normalize to 0-100
  const maxScore = Math.max(...Object.values(scores));
  Object.keys(scores).forEach(key => {
    scores[key] = (scores[key] / maxScore) * 100;
  });
  
  return { scores, totalSignals: signals.size };
}
```

#### 3. Merge Scores

```typescript
function mergeScores(
  explicitData: any,
  implicitData: any,
  weights: { explicitWeight: number; implicitWeight: number }
) {
  const merged = {};
  
  // Adjust weights based on data availability
  let explicitWeight = weights.explicitWeight;
  let implicitWeight = weights.implicitWeight;
  
  // If user is new (< 100 signals), rely more on explicit
  if (implicitData.totalSignals < 100) {
    explicitWeight = 0.6;
    implicitWeight = 0.4;
  }
  
  // If no questionnaire data, use 100% implicit
  if (explicitData.totalQuestions === 0) {
    explicitWeight = 0;
    implicitWeight = 1;
  }
  
  Object.keys(explicitData.scores).forEach(dimension => {
    merged[dimension] = Math.round(
      (explicitData.scores[dimension] * explicitWeight) +
      (implicitData.scores[dimension] * implicitWeight)
    );
  });
  
  // Identify dominant and secondary styles
  const sorted = Object.entries(merged).sort((a, b) => b[1] - a[1]);
  merged.dominantStyle = sorted[0][0];
  if (sorted[1][1] > 60) {
    merged.secondaryStyle = sorted[1][0];
  }
  
  return merged;
}
```

#### 4. Learning Patterns

```typescript
async function calculateLearningPatterns(userId: string) {
  const signals = await getRecentSignals(userId, 30); // Last 30 days
  
  // Peak hours analysis
  const hourCounts = new Array(24).fill(0);
  const daysCounts = {};
  let totalDuration = 0;
  let sessionCount = 0;
  const sessionDurations: number[] = [];
  
  signals.forEach(signal => {
    hourCounts[signal.hourOfDay]++;
    daysCounts[signal.dayOfWeek] = (daysCounts[signal.dayOfWeek] || 0) + 1;
    
    if (signal.duration) {
      totalDuration += signal.duration;
      sessionDurations.push(signal.duration);
    }
    
    if (signal.type === 'study_session') sessionCount++;
  });
  
  // Find peak hours (top 3)
  const peakHours = hourCounts
    .map((count, hour) => ({ hour, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(item => item.hour);
  
  // Preferred days
  const preferredDays = Object.entries(daysCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(item => item[0]);
  
  // Average session duration
  const avgSessionDuration = sessionDurations.length > 0
    ? Math.round(sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length / 60) // Convert to minutes
    : 0;
  
  // Consistency score (how regular are study patterns)
  const consistencyScore = calculateConsistency(signals);
  
  // Focus score (based on quiz attempts and completion)
  const focusScore = await calculateFocusScore(userId);
  
  // Completion and retention rates
  const { completionRate, retentionRate } = await calculateCompletionAndRetention(userId);
  
  return {
    peakHours,
    avgSessionDuration,
    preferredDayOfWeek: preferredDays,
    consistencyScore,
    focusScore,
    completionRate,
    retentionRate,
  };
}
```

#### 5. Subject Affinities

```typescript
async function calculateSubjectAffinities(userId: string) {
  const signals = await getRecentSignals(userId, 90);
  
  const subjects = {};
  
  signals.forEach(signal => {
    if (!signal.subject) return;
    
    if (!subjects[signal.subject]) {
      subjects[signal.subject] = {
        totalTime: 0,
        totalScore: 0,
        scoreCount: 0,
        engagement: 0,
      };
    }
    
    const subj = subjects[signal.subject];
    
    // Accumulate time
    if (signal.duration) {
      subj.totalTime += signal.duration;
    }
    
    // Accumulate scores
    if (signal.score !== undefined) {
      subj.totalScore += signal.score;
      subj.scoreCount++;
    }
    
    // Engagement (completed activities count more)
    subj.engagement += signal.completed ? 2 : 1;
  });
  
  // Calculate affinity scores
  const affinities = {};
  
  Object.entries(subjects).forEach(([subject, data]: [string, any]) => {
    const avgPerformance = data.scoreCount > 0
      ? data.totalScore / data.scoreCount
      : 50;
    
    const timeScore = Math.min(100, (data.totalTime / 3600) * 10); // Hours to score
    const engagementScore = Math.min(100, data.engagement * 2);
    
    // Affinity = combination of time, performance, and engagement
    const affinity = Math.round(
      (timeScore * 0.4) +
      (avgPerformance * 0.4) +
      (engagementScore * 0.2)
    );
    
    affinities[subject] = {
      affinity,
      performance: Math.round(avgPerformance),
      engagement: Math.round(engagementScore),
      lastUpdated: FieldValue.serverTimestamp(),
    };
  });
  
  return affinities;
}
```

#### 6. Confidence Calculation

```typescript
function calculateConfidence(signalCount: number, questionCount: number): number {
  // More data = higher confidence
  const signalConfidence = Math.min(100, (signalCount / 500) * 70); // Max 70% from signals
  const questionConfidence = Math.min(30, (questionCount / 50) * 30); // Max 30% from questions
  
  return Math.round(signalConfidence + questionConfidence);
}
```

---

## 3. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Learning DNA - Student owns their data
    match /learningDNA/{userId} {
      // Owner can read and write
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Parents can read if permission granted
      allow read: if request.auth != null 
        && resource.data.sharing.parentCanView == true
        && isParentOf(userId);
      
      // Institution can read if permission granted
      allow read: if request.auth != null
        && resource.data.sharing.institutionCanView == true
        && isInstitutionAdmin()
        && userInInstitution(userId);
      
      // Admins can read aggregated data only (no PII)
      allow read: if request.auth != null && hasRole('admin');
      
      // Public sharing via link
      allow read: if resource.data.sharing.isPublic == true;
      
      // Explicitly shared users
      allow read: if request.auth != null 
        && request.auth.uid in resource.data.sharing.sharedWith;
    }
    
    // Learning Signals - System writes, user reads
    match /learningSignals/{signalId} {
      // User can read their own signals
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      
      // Only system/functions can write
      allow create: if request.auth != null;
      
      // No updates or deletes (append-only log)
      allow update, delete: if false;
    }
    
    // DNA Questionnaires - Public read, admin write
    match /dnaQuestionnaires/{questionnaireId} {
      // Anyone can read active questionnaires
      allow read: if resource.data.status == 'active';
      
      // Only admins can create/update
      allow create, update: if request.auth != null && hasRole('admin');
      
      // No one can delete
      allow delete: if false;
    }
    
    // DNA Responses - User owns their responses
    match /dnaResponses/{responseId} {
      // User can read and write their own responses
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      
      // Parents can read if user is under 16
      allow read: if request.auth != null 
        && isParentOf(resource.data.userId);
      
      // No one else can access
    }
    
    // DNA Snapshots - Read-only historical data
    match /dnaSnapshots/{snapshotId} {
      // User can read their own snapshots
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      
      // Only system can create
      allow create: if request.auth != null;
      
      // No updates or deletes
      allow update, delete: if false;
    }
    
    // Helper functions
    function hasRole(role) {
      return request.auth.token.role == role;
    }
    
    function isParentOf(studentId) {
      let parentDoc = get(/databases/$(database)/documents/users/$(request.auth.uid));
      return parentDoc.data.linkedStudents != null 
        && studentId in parentDoc.data.linkedStudents;
    }
    
    function isInstitutionAdmin() {
      return request.auth.token.role == 'institution';
    }
    
    function userInInstitution(studentId) {
      let studentDoc = get(/databases/$(database)/documents/users/$(studentId));
      return studentDoc.data.institutionId == request.auth.token.institutionId;
    }
  }
}
```

---

## 4. UI Components

### 4.1 DNA Strand Visual (Main Component)

**Component**: `apps/web/src/components/dna/dna-profile-view.tsx`

```typescript
// Visual representation of learning DNA as a double helix strand
// Each cognitive dimension is color-coded
// Animated, interactive, and beautiful
```

**Features**:
- 3D-style DNA helix animation
- Color-coded segments for each dimension
- Hover shows detailed scores
- Responsive for mobile

### 4.2 Strength Bars

**Component**: `apps/web/src/components/dna/cognitive-strengths.tsx`

```typescript
// Horizontal bar charts showing each cognitive dimension
// Animated progress bars
// Comparative view vs. peers (optional, anonymized)
```

### 4.3 Learning Patterns Heat Map

**Component**: `apps/web/src/components/dna/learning-heatmap.tsx`

```typescript
// 24x7 grid showing when student is most active
// Color intensity = engagement level
// Highlights peak learning hours
```

### 4.4 Subject Affinity Chips

**Component**: `apps/web/src/components/dna/subject-chips.tsx`

```typescript
// Pill-shaped chips for each subject
// Size based on affinity score
// Color based on performance
// Click to see detailed breakdown
```

### 4.5 Shareable Profile Card

**Component**: `apps/web/src/components/dna/dna-share-card.tsx`

```typescript
// Beautiful card with key highlights
// Downloadable as image
// Shareable link with privacy controls
// QR code for easy sharing
```

---

## 5. Privacy & Consent

### Privacy Policy Additions

```markdown
## Learning DNA & Behavioral Analysis

### What We Collect
- Explicit: Your responses to learning style questionnaires
- Implicit: When you study, what you study, how you perform

### How We Use It
- Create your personalized Learning DNA profile
- Recommend content that matches your learning style
- Help you understand your strengths

### Your Control
- Opt in/out of implicit tracking anytime
- Delete your DNA profile completely
- Control who can see your profile
- Export your data anytime

### Under 16
- Requires parental consent
- Parents can view and manage settings
- Can request complete data deletion
```

### Consent Flow

1. **Initial Sign-up** (Students):
   - Checkbox: "I consent to Gen Elevate analyzing my learning patterns to create my Academic DNA profile"
   - Link to privacy policy
   - Option to skip (can enable later)

2. **Parental Consent** (Under 16):
   - Email sent to parent
   - Parent must approve via secure link
   - Child's DNA disabled until approved

3. **Ongoing Management**:
   - Settings page: "My Academic DNA"
   - Toggle: Enable/Disable tracking
   - Button: Delete my DNA profile
   - Button: Download my data

---

## 6. Admin & Parent Views

### 6.1 Admin Dashboard

**Path**: `/admin/dna-analytics`

**Features**:
- Aggregated, anonymized data only
- Platform-wide distributions:
  - % Visual learners vs. Auditory vs. others
  - Peak learning hours across all students
  - Most popular subjects by DNA type
- Trends over time
- No individual student identification

### 6.2 Parent Dashboard

**Path**: `/parent?tab=dna`

**Features**:
- View child's full DNA profile (if consent given)
- See learning patterns and recommendations
- Compare against age group averages (anonymized)
- Download reports
- Manage sharing settings

### 6.3 Institution Dashboard

**Path**: `/institution?tab=dna-insights`

**Features**:
- Cohort-level DNA distributions
- Identify cohort strengths/weaknesses
- Tailor curriculum to cohort DNA
- Track DNA evolution over academic year
- Privacy-compliant (aggregated only)

---

## 7. Testing Plan

### Unit Tests

```typescript
// Test scoring algorithm
describe('DNA Scoring', () => {
  it('should calculate explicit scores from questionnaire', () => {
    const responses = mockQuestionnaireResponses();
    const scores = calculateExplicitScores(responses);
    expect(scores.visual).toBeGreaterThan(0);
    expect(scores.visual).toBeLessThanOrEqual(100);
  });
  
  it('should merge explicit and implicit scores correctly', () => {
    const explicit = { visual: 80, auditory: 40 };
    const implicit = { visual: 60, auditory: 90 };
    const merged = mergeScores(explicit, implicit, { explicitWeight: 0.5, implicitWeight: 0.5 });
    expect(merged.visual).toBe(70);
    expect(merged.auditory).toBe(65);
  });
});
```

### Integration Tests

```typescript
// Test full DNA calculation pipeline
describe('DNA Pipeline', () => {
  it('should create initial DNA profile for new user', async () => {
    const userId = 'test-user-123';
    await createLearningSignals(userId, 50); // Create 50 signals
    await completeQuestionnaire(userId, 'onboarding-dna');
    
    await updateUserDNA(userId);
    
    const dna = await getDNA(userId);
    expect(dna).toBeDefined();
    expect(dna.cognitiveProfile.dominantStyle).toBeDefined();
    expect(dna.confidence).toBeGreaterThan(20);
  });
});
```

### E2E Tests

```typescript
// Test user journey
describe('Student DNA Journey', () => {
  it('should complete onboarding questionnaire', async () => {
    await page.goto('/dashboard/dna/questionnaire');
    await page.click('[data-testid="start-questionnaire"]');
    
    // Answer all questions
    for (let i = 0; i < 20; i++) {
      await page.click(`[data-testid="option-${i % 4}"]`);
      await page.click('[data-testid="next"]');
    }
    
    await page.click('[data-testid="submit"]');
    await page.waitForSelector('[data-testid="dna-results"]');
    
    expect(await page.textContent('[data-testid="dominant-style"]')).toBeTruthy();
  });
  
  it('should generate shareable link', async () => {
    await page.goto('/dashboard/dna');
    await page.click('[data-testid="share-toggle"]');
    await page.click('[data-testid="enable-public-sharing"]');
    
    const shareLink = await page.textContent('[data-testid="share-link"]');
    expect(shareLink).toContain('https://genelevate.com/dna/');
  });
});
```

### Load Tests

```bash
# Simulate nightly DNA calculation for 10,000 users
artillery run dna-calculation-load-test.yml

# Expected: < 30 minutes total processing time
# Expected: < 2s per user calculation
```

---

## 8. Implementation Phases

### Phase 1: Core Infrastructure (Week 1-2)
- ✅ Create Firestore collections
- ✅ Implement security rules
- ✅ Build signal tracking system
- ✅ Deploy signal collection to all user actions

### Phase 2: Scoring Algorithm (Week 2-3)
- ✅ Implement explicit scoring
- ✅ Implement implicit scoring
- ✅ Build merge algorithm
- ✅ Deploy nightly Cloud Function
- ✅ Test with sample data

### Phase 3: Questionnaire System (Week 3-4)
- ✅ Create initial questionnaire
- ✅ Build questionnaire UI
- ✅ Implement response storage
- ✅ Deploy onboarding flow

### Phase 4: UI Components (Week 4-5)
- ✅ DNA strand visualization
- ✅ Strength bars
- ✅ Heat map
- ✅ Subject chips
- ✅ Dashboard integration

### Phase 5: Sharing & Privacy (Week 5-6)
- ✅ Shareable cards
- ✅ Privacy controls
- ✅ Consent flows
- ✅ Parent/admin views

### Phase 6: Testing & Launch (Week 6-7)
- ✅ Unit tests
- ✅ Integration tests
- ✅ Load tests
- ✅ Beta launch with pilot group
- ✅ Gather feedback
- ✅ Full production launch

---

## 9. Success Metrics

### Engagement
- **Target**: 70% of students complete onboarding questionnaire
- **Target**: 50% of students check their DNA profile monthly
- **Target**: 30% of students share their DNA card

### Accuracy
- **Target**: 80%+ confidence score for users with 6+ months of data
- **Target**: Student self-reported accuracy of 75%+

### Privacy Compliance
- **Target**: 100% consent capture
- **Target**: < 24 hour response time for data deletion requests
- **Target**: Zero privacy violations

### Performance
- **Target**: DNA calculation completes in < 2s per user
- **Target**: All 10,000 users processed in < 30 minutes nightly
- **Target**: Page load < 1.5s for DNA profile view

---

## 10. Future Enhancements

### Phase 2 Features:
1. **DNA Evolution Timeline**: Show how DNA changes over months/years
2. **DNA-Based Matching**: Connect students with similar learning styles
3. **Course Recommendations**: AI suggests courses based on DNA
4. **Study Buddy Finder**: Match for collaborative projects based on complementary DNA
5. **Career Alignment**: Show careers that match cognitive profile
6. **Gamification**: Badges for "Discover Your DNA", "DNA Explorer"
7. **DNA Challenges**: Activities designed to strengthen weaker dimensions
8. **Parent Insights**: Monthly DNA reports emailed to parents

---

## Summary

The Academic DNA system provides:
- ✅ Unique learning fingerprint for each student
- ✅ Data-driven insights from 7 cognitive dimensions
- ✅ Privacy-first design with granular consent
- ✅ Beautiful, shareable visualizations
- ✅ Actionable recommendations
- ✅ Parent and institution transparency
- ✅ Scalable architecture (handles 100K+ students)

**Total Implementation**: ~7 weeks, 2 developers
**Ongoing Cost**: ~$50-100/month for 10K users (Cloud Functions + Firestore)

🧬 **Gen Elevate DNA: Every Student's Unique Learning Fingerprint**

