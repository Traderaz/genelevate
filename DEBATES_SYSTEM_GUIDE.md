# AI-Moderated Debate Room - Complete System Guide

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Data Architecture](#data-architecture)
3. [Workflow](#workflow)
4. [API Endpoints](#api-endpoints)
5. [AI Scoring System](#ai-scoring-system)
6. [Leaderboards & Analytics](#leaderboards--analytics)
7. [Points & Rewards](#points--rewards)
8. [Implementation Checklist](#implementation-checklist)

---

## 🎯 System Overview

The AI-Moderated Debate Room is a weekly educational feature where students:
1. **Receive AI-generated debate topics** on ethics, technology, society, and more
2. **Submit arguments** via video (60s), audio (60s), or text (50-500 words)
3. **Get AI scoring** on 5 criteria: Clarity, Structure, Reasoning, Evidence, Delivery
4. **Compete on leaderboards** for points, badges, and recognition
5. **Receive detailed feedback** to improve their debate skills

---

## 🗂️ Data Architecture

### Collections

#### 1. `debateTopics`
AI-generated and admin-created debate topics
```typescript
{
  id: string;
  title: "Should social media companies be held responsible for mental health?";
  description: "Explore corporate responsibility, free speech, regulation...";
  category: "technology";
  difficulty: "intermediate";
  targetYearGroups: ["Year 10", "Year 11"];
  suggestedBy: "ai" | "admin" | "student";
  createdAt: Timestamp;
  usageCount: number;
}
```

#### 2. `debates`
Weekly debate instances
```typescript
{
  id: string;
  topicId: string;
  title: string;
  status: "upcoming" | "active" | "voting" | "completed";
  weekNumber: number;
  startDate: Timestamp;
  submissionDeadline: Timestamp;
  endDate: Timestamp;
  institutionId?: string; // null for global
  isGlobal: boolean;
  allowedSubmissionTypes: ["video", "audio", "text"];
  maxDurationSeconds: 60;
  maxTextWords: 500;
  pointsReward: 50;
  submissionCount: number;
  participantCount: number;
}
```

#### 3. `debateSubmissions`
Student debate submissions
```typescript
{
  id: "userId_debateId_timestamp";
  debateId: string;
  userId: string;
  type: "video" | "audio" | "text";
  position: "for" | "against" | "neutral";
  content: string; // Text or transcript
  mediaUrl?: string;
  status: "submitted" | "processing" | "scored";
  isPublic: boolean;
  
  scores?: {
    clarity: 85;
    structure: 78;
    reasoning: 82;
    evidence: 75;
    delivery: 80;
    overall: 80;
  };
  
  aiFeedback?: {
    strengths: ["Clear main argument", "Strong examples"];
    improvements: ["Consider counterarguments", "Add statistics"];
    detailedFeedback: "Overall, this is a strong submission...";
    scoringBreakdown: { ... };
  };
  
  pointsEarned: 150;
  badgesEarned: ["skilled_debater"];
  submittedAt: Timestamp;
}
```

#### 4. `debateScores`
Aggregated scoring data
```typescript
{
  id: string;
  debateId: string;
  submissionId: string;
  userId: string;
  clarity: 85;
  structure: 78;
  reasoning: 82;
  evidence: 75;
  delivery: 80;
  overall: 80;
  rank: 5;
  percentile: 85;
  pointsEarned: 150;
}
```

#### 5. `debateLeaderboards`
Weekly leaderboards
```typescript
{
  id: "debateId_institutionId";
  debateId: string;
  institutionId?: string;
  isGlobal: boolean;
  
  topSubmissions: [
    {
      submissionId: string;
      userId: string;
      userName: string;
      overallScore: 95;
      rank: 1;
      pointsEarned: 500;
      excerpt: "First 150 characters...";
    }
  ];
  
  stats: {
    totalSubmissions: 150;
    averageScore: 72;
    highestScore: 95;
  };
}
```

#### 6. `userDebateStats`
Per-user debate statistics
```typescript
{
  userId: string;
  totalDebates: 12;
  averageOverallScore: 78;
  averageClarity: 80;
  debatesWon: 2;
  topThreeFinishes: 5;
  totalPoints: 1850;
  currentStreak: 3;
  longestStreak: 7;
  badgesEarned: ["skilled_debater", "logical_thinker"];
}
```

#### 7. `institutionDebateAnalytics`
Institution-level analytics
```typescript
{
  institutionId: string;
  weekNumber: number;
  debateId: string;
  totalParticipants: 85;
  participationRate: 0.65; // 65%
  averageOverallScore: 74;
  topStudents: [ ... ];
  institutionRank: 12;
  aboveNationalAverage: true;
}
```

---

## 🔄 Workflow

### Phase 1: Topic Generation (Sunday)
```
Admin/AI → Generate Topics → Create Debate
```
1. **AI generates 5-10 topic suggestions** via `/api/debates/generate-topics`
2. **Admin selects topic** or creates custom topic
3. **System creates debate document** with:
   - Start date: Monday 00:00
   - Submission deadline: Saturday 23:59
   - End date: Sunday 23:59 (for voting/viewing)

### Phase 2: Active Debate (Monday-Saturday)
```
Student → Submit Argument → AI Scores → Update Leaderboard
```
1. **Student views active debate** on `/debates` page
2. **Student records/writes submission**:
   - Video: 60s max, uploaded to Firebase Storage
   - Audio: 60s max, uploaded to Firebase Storage
   - Text: 50-500 words
3. **Submission sent to** `/api/debates/submit`
4. **Background Cloud Function**:
   - Saves submission to Firestore
   - Uploads media to Storage (if applicable)
   - Transcribes video/audio (optional, using Whisper API)
   - Calls `/api/debates/score-submission`
5. **AI scores submission** on 5 criteria
6. **System updates**:
   - `debateSubmissions` with scores and feedback
   - `debateScores` collection
   - `debateLeaderboards` (recalculates ranks)
   - `userDebateStats` (updates user stats)
   - User points and badges
7. **Student receives notification** with scores and feedback

### Phase 3: Leaderboard Finalization (Sunday)
```
System → Calculate Final Rankings → Award Prizes → Archive
```
1. **System calculates final rankings**
2. **Awards bonus points**:
   - Rank #1: +500 points
   - Ranks #2-3: +300 points
   - Ranks #4-10: +150 points
3. **Awards badges**:
   - "Weekly Debate Champion" (Rank #1)
   - "Top Debater" (Ranks #2-10)
   - Skill badges (90+ in any category)
4. **Updates institution analytics**
5. **Sends summary emails** to participants
6. **Archives debate** (status: 'completed')

### Phase 4: New Week (Next Monday)
- Previous debate moves to archives
- New debate begins
- Process repeats

---

## 🔌 API Endpoints

### 1. Generate Debate Topics
**POST** `/api/debates/generate-topics`

```typescript
Request:
{
  count: 5;
  category?: "technology";
  difficulty?: "intermediate";
  yearGroups?: ["Year 10", "Year 11"];
}

Response:
{
  topics: DebateTopic[];
  tokensUsed: number;
}
```

### 2. Submit Debate Argument
**POST** `/api/debates/submit`

```typescript
FormData:
{
  debateId: string;
  type: "video" | "audio" | "text";
  position: "for" | "against" | "neutral";
  content: string;
  mediaFile?: File;
  isPublic: boolean;
}

Response:
{
  submissionId: string;
  status: "processing";
  estimatedScoringTime: 30;
  message: "Your submission is being processed...";
}
```

### 3. Score Submission
**POST** `/api/debates/score-submission`

```typescript
Request:
{
  submissionId: string;
  debateTitle: string;
  debateDescription: string;
  position: "for" | "against" | "neutral";
  content: string;
  type: "video" | "audio" | "text";
  transcript?: string; // For video/audio
}

Response:
{
  submissionId: string;
  scores: {
    clarity: 85;
    structure: 78;
    reasoning: 82;
    evidence: 75;
    delivery: 80;
    overall: 80;
  };
  feedback: { ... };
  pointsEarned: 150;
  badgesEarned: ["skilled_debater"];
  rank?: 5;
  percentile?: 85;
}
```

### 4. Get Submission Status
**GET** `/api/debates/submit?submissionId=xxx`

```typescript
Response:
{
  submissionId: string;
  status: "scored";
  message: "Submission has been scored";
}
```

---

## 🤖 AI Scoring System

### Scoring Criteria (0-100 each)

#### 1. **Clarity** (20% weight)
- Is the main argument easy to follow?
- Are ideas expressed clearly?
- Is language appropriate and precise?

#### 2. **Structure** (20% weight)
- Clear introduction, body, conclusion?
- Logical point ordering?
- Smooth transitions?

#### 3. **Reasoning** (25% weight) - HIGHEST WEIGHT
- Logically sound arguments?
- Demonstrates critical thinking?
- Considers counterarguments?

#### 4. **Evidence** (20% weight)
- Claims backed by facts/examples?
- Evidence relevant and credible?
- Specific and appropriate sources?

#### 5. **Delivery** (15% weight)
- Confident and engaging?
- Appropriate tone/pace?
- Presentation enhances argument?

### Overall Score Calculation
```typescript
overall = 
  clarity * 0.20 +
  structure * 0.20 +
  reasoning * 0.25 +
  evidence * 0.20 +
  delivery * 0.15
```

### Grading Scale
- **90-100**: Exceptional - Demonstrates mastery
- **80-89**: Very Good - Strong performance
- **70-79**: Good - Solid performance
- **60-69**: Satisfactory - Meets basics
- **50-59**: Needs Improvement
- **Below 50**: Poor - Significant work needed

---

## 🏆 Leaderboards & Analytics

### Global Leaderboard
- Top 100 submissions worldwide
- Updated in real-time as submissions scored
- Visible to all students

### Institution Leaderboard
- Top submissions within institution
- Visible to institution members
- Used for institution rankings

### Personal Stats Dashboard
Students see:
- Their rank in current debate
- Percentile ranking
- Score breakdown by criterion
- Historical performance graph
- Badges earned
- Points total
- Streak counter

### Institution Dashboard
Admins see:
- Participation rate
- Average scores by criterion
- Top performers
- Comparison to national average
- Weekly/monthly trends
- Student engagement metrics

---

## 💰 Points & Rewards

### Base Points
- **Participation**: 50 points (just for submitting)
- **High Score (85+)**: +100 points

### Ranking Bonuses (Weekly)
- **Rank #1**: +500 points (Total: 650)
- **Ranks #2-3**: +300 points (Total: 450)
- **Ranks #4-10**: +150 points (Total: 300)

### Badges
- **🏆 Weekly Debate Champion**: Rank #1
- **🥇 Top Debater**: Rank #2-10
- **💎 Debate Perfectionist**: Score 95+
- **🔮 Crystal Clear**: Clarity 90+
- **📊 Master Organizer**: Structure 90+
- **🧠 Logical Thinker**: Reasoning 90+
- **📚 Fact Finder**: Evidence 90+
- **🎤 Confident Speaker**: Delivery 90+
- **🎯 Skilled Debater**: Overall 75+
- **🔥 Debate Streak**: 5 weeks consecutive

---

## ✅ Implementation Checklist

### Backend

- [x] Define Firestore collections and types
- [x] Create Firestore security rules
- [x] Build API: Generate debate topics
- [x] Build API: Submit debate argument
- [x] Build API: Score submission with AI
- [ ] Build Firebase Cloud Function: Process submissions
- [ ] Build Firebase Cloud Function: Update leaderboards
- [ ] Build Firebase Cloud Function: Award points and badges
- [ ] Add Storage rules for media uploads
- [ ] Implement video/audio transcription (Whisper API)
- [ ] Create scheduled function: Weekly debate creation
- [ ] Create scheduled function: Weekly leaderboard finalization

### Frontend

- [ ] Build debates listing page (`/debates`)
- [ ] Build active debate page (`/debates/[id]`)
- [ ] Build submission form (video/audio/text)
- [ ] Implement media recording/upload
- [ ] Build scores display component
- [ ] Build feedback display component
- [ ] Build leaderboard component
- [ ] Build user stats dashboard
- [ ] Build institution analytics dashboard
- [ ] Add debate notifications
- [ ] Add badge display system

### Admin Tools

- [ ] Admin panel: Review debate topics
- [ ] Admin panel: Create custom debates
- [ ] Admin panel: Monitor submissions
- [ ] Admin panel: Flag inappropriate content
- [ ] Admin panel: View institution analytics
- [ ] Admin panel: Manage debate schedule

### Testing

- [ ] Test topic generation with various parameters
- [ ] Test submission with all types (video/audio/text)
- [ ] Test AI scoring accuracy and consistency
- [ ] Test leaderboard calculations
- [ ] Test points and badges awarding
- [ ] Test institution analytics
- [ ] Load test with multiple simultaneous submissions
- [ ] Test media upload and transcription

---

## 🚀 Next Steps

1. **Complete API endpoints** (✅ Topics, Scoring, Submit APIs done)
2. **Create Cloud Functions** for async processing
3. **Build frontend UI components**
4. **Set up Firebase Storage** for media files
5. **Add audio transcription** (Whisper API)
6. **Test with real students**
7. **Launch pilot program** with one institution
8. **Gather feedback** and iterate
9. **Scale to all institutions**

---

## 📝 Notes

- **Weekly Schedule**: Debates run Monday-Sunday
- **Submission Limit**: 1 submission per debate per student
- **Media Limits**: 60s for video/audio, 500 words for text
- **AI Model**: GPT-4 for scoring (more consistent than GPT-3.5)
- **Privacy**: Students choose if submission is public
- **Moderation**: Admin review for flagged content
- **Cost**: Estimated $0.10-0.20 per submission (OpenAI API)

---

## 🎓 Educational Benefits

1. **Critical Thinking**: Develop logical reasoning skills
2. **Communication**: Improve verbal and written expression
3. **Research**: Learn to find and use evidence
4. **Confidence**: Build public speaking skills
5. **Digital Literacy**: Practice with multimedia tools
6. **Engagement**: Gamification increases participation
7. **Feedback**: AI provides instant, constructive feedback
8. **Competition**: Healthy rivalry motivates improvement
9. **Recognition**: Leaderboards celebrate achievement
10. **Analytics**: Track progress over time

---

## 💡 Future Enhancements

- **Peer Voting**: Students vote on best arguments
- **Live Debates**: Real-time video debates between students
- **Team Debates**: School vs. school competitions
- **Topic Suggestions**: Students suggest topics
- **Expert Judges**: Invite professionals for special debates
- **Debate Clubs**: Form school-based debate clubs
- **Tournaments**: Multi-week tournaments with brackets
- **Parent Viewing**: Parents can watch public submissions
- **AI Debate Partner**: Practice against AI opponent
- **Translation**: Multi-language support

---

**System Status**: ✅ Core architecture complete, APIs implemented, ready for frontend development


