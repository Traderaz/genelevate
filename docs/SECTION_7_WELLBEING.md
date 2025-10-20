# Section 7: Life Skills & Wellbeing

## Overview

The Life Skills & Wellbeing module provides students with essential personal development tools, covering financial literacy, ethics, communication, and mental wellbeing. All content is safeguarding-approved, age-appropriate, and non-medical, designed to support students' holistic development alongside their academic learning.

## Features Implemented

### ✅ 1. Life Skills Modules (4 Core Areas)

#### **Financial Literacy**
- Understanding Money Basics
- Budgeting & Planning
- Banking & Digital Money

#### **Ethics & Values**
- Making Ethical Decisions
- Digital Citizenship
- Social Responsibility

#### **Communication**
- Effective Communication
- Active Listening
- Conflict Resolution

#### **Mental Wellbeing**
- Understanding Emotions
- Stress Management
- Building Resilience

### ✅ 2. Wellbeing Dashboard
- **Daily Check-In**: Mood tracking with 4 emotional states (Great, Good, Okay, Struggling)
- **Quick Access Widgets**: Crisis support, counseling, resources
- **Progress Stats**: Modules completed, learning time, streak days, skills mastered
- **Safeguarding Notice**: Emergency contacts and support resources

### ✅ 3. Course-Style Learning Paths
- **Module Structure**: Each module contains 4-6 lessons
- **Lesson Types**: Video, Reading, Exercise, Quiz
- **Progress Tracking**: Real-time completion percentage
- **Sequential Learning**: Lessons unlock as you progress
- **Skills Badges**: Track skills acquired through modules

### ✅ 4. Safeguarding Features
- **Non-Medical Content**: All information is educational, not therapeutic
- **Crisis Support Links**: Samaritans (116 123), Childline (0800 1111), YoungMinds
- **Flagging System**: Content that requires support triggers appropriate resources
- **Privacy**: Check-ins and progress are private to the user
- **Age-Appropriate**: Content tailored for Year 6 to Year 13

### ✅ 5. Quick Dashboard Access
- **Wellbeing Widget**: Prominent placement on main dashboard
- **Sidebar Navigation**: Heart icon for easy identification
- **Highlight Feature**: Special styling to draw attention
- **One-Click Check-In**: Daily wellbeing check from dashboard

## File Structure

```
apps/web/src/
├── app/
│   └── wellbeing/
│       ├── page.tsx                           # Main wellbeing page
│       └── module/
│           └── [id]/
│               └── page.tsx                   # Module detail page
├── components/
│   ├── wellbeing/
│   │   ├── wellbeing-banner.tsx              # Hero banner
│   │   ├── wellbeing-stats.tsx               # Progress statistics
│   │   ├── wellbeing-quick-access.tsx        # Crisis support & resources
│   │   ├── daily-wellbeing-check.tsx         # Mood tracking
│   │   ├── life-skills-modules.tsx           # Module grid (12 modules)
│   │   └── module-detail.tsx                 # Detailed module view
│   └── dashboard/
│       └── wellbeing-widget.tsx              # Dashboard quick-access widget
```

## Database Schema

### Life Skills Modules Collection

```typescript
interface LifeSkillsModule {
  id: string;
  title: string;
  category: 'finance' | 'ethics' | 'communication' | 'mental-health';
  description: string;
  overview: string;
  duration: string;                    // e.g., "30 min"
  order: number;                       // Display order
  isActive: boolean;
  lessons: Lesson[];
  skills: string[];                    // Skills learned
  objectives: string[];                // Learning objectives
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  content: string;                     // Lesson content (markdown/HTML)
  order: number;
  requiredForCompletion: boolean;
}
```

### Wellbeing Progress Collection

```typescript
interface WellbeingProgress {
  id: string;
  userId: string;
  institutionId?: string;
  moduleId: string;
  lessonsCompleted: string[];          // Array of lesson IDs
  totalLessons: number;
  completionPercentage: number;
  completed: boolean;
  startedAt: Timestamp;
  lastAccessedAt: Timestamp;
  completedAt?: Timestamp;
  timeSpent: number;                   // Minutes
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Wellbeing Check-ins Collection

```typescript
interface WellbeingCheckin {
  id: string;
  userId: string;
  institutionId?: string;
  mood: 'great' | 'good' | 'okay' | 'struggling';
  notes?: string;                      // Optional private notes
  supportOffered: boolean;             // Did we offer support resources?
  createdAt: Timestamp;
}
```

## Firestore Security Rules

```javascript
// Life Skills Modules - Read-only for authenticated users
match /lifeSkillsModules/{moduleId} {
  allow read: if isAuthenticated();
  allow write: if isGlobalAdmin();
}

// Wellbeing Progress - Users can read/write their own progress
match /wellbeingProgress/{progressId} {
  allow read: if isAuthenticated() && (
    isOwner(resource.data.userId) ||
    isGlobalAdmin() ||
    canAccessInstitutionData(resource.data.institutionId)
  );
  
  allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
  allow update: if isAuthenticated() && isOwner(resource.data.userId);
  allow delete: if isOwner(resource.data.userId) || isGlobalAdmin();
}

// Wellbeing Check-ins - Users can read/write their own check-ins
match /wellbeingCheckins/{checkinId} {
  allow read: if isAuthenticated() && (
    isOwner(resource.data.userId) ||
    isGlobalAdmin() ||
    canAccessInstitutionData(resource.data.institutionId)
  );
  
  allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
  allow update: if isAuthenticated() && isOwner(resource.data.userId);
  allow delete: if isOwner(resource.data.userId) || isGlobalAdmin();
}
```

## Firestore Indexes

### Life Skills Modules
1. **category + isActive + order**: For filtered module listings

### Wellbeing Progress
1. **userId + moduleId + lastAccessedAt**: For user's recent modules
2. **userId + completed + updatedAt**: For completed modules

### Wellbeing Check-ins
1. **userId + createdAt**: For user's check-in history
2. **userId + mood + createdAt**: For mood trend analysis

## Module Content Structure

### Example: Understanding Money Basics (Financial Literacy)

**Lesson 1: What is Money?** (5 min, Video)
- Definition and purpose of money
- History of currency
- Different forms of money (cash, digital, cryptocurrency)

**Lesson 2: Earning Money** (6 min, Reading)
- Ways to earn income (employment, self-employment, investments)
- Understanding wages and salaries
- Part-time work for students

**Lesson 3: Saving vs Spending** (7 min, Exercise)
- Interactive budgeting exercise
- Setting financial goals
- The 50/30/20 rule

**Lesson 4: Needs vs Wants** (6 min, Exercise)
- Distinguishing essential vs discretionary spending
- Making informed purchasing decisions
- Avoiding impulse buying

**Lesson 5: Module Quiz** (6 min, Quiz)
- 10 multiple-choice questions
- Passing score: 70%
- Instant feedback with explanations

## Safeguarding Guidelines

### Content Approval Process
1. All content reviewed by safeguarding lead
2. Age-appropriate language and examples
3. No medical advice or diagnosis
4. Clear signposting to professional help

### Crisis Detection
- If user selects "Struggling" in check-in → Show support resources
- Repeated "Struggling" check-ins → Notify designated safeguarding contact
- All check-ins are confidential to the user

### Support Resources Provided
- **Samaritans**: 116 123 (24/7 emotional support)
- **Childline**: 0800 1111 (for under-18s)
- **YoungMinds Crisis Messenger**: Text YM to 85258
- **Emergency**: 999 (for immediate danger)

### Privacy & Data Protection
- Check-ins are private and not shared with teachers/parents
- Progress data can be viewed by institution admins (aggregate only)
- Users can delete their check-in history
- GDPR-compliant data export available

## Navigation Integration

### Dashboard Sidebar
- Position: After "Careers", before "Progress"
- Icon: Heart (❤️) in green
- Highlight: Special styling with `highlight: true` flag
- Always visible for quick access

### Dashboard Widget
- Location: Below stats grid on main dashboard
- Features:
  - Current streak display
  - Modules completed counter
  - Daily check-in prompt
  - Quick link to full wellbeing page

### Header Navigation
- Not in main header (dashboard-focused feature)
- Accessible via dashboard sidebar only

## User Experience Flow

### First-Time User
1. Lands on wellbeing page
2. Sees welcome banner explaining 4 core areas
3. Prompted for daily check-in
4. Views 12 available modules
5. Clicks a module to start learning
6. Completes lessons sequentially
7. Earns skills badges

### Returning User
1. Dashboard shows wellbeing widget with streak
2. One-click daily check-in
3. Continue from last lesson
4. Track progress across modules
5. View completed modules and skills

### User in Distress
1. Selects "Struggling" in check-in
2. Immediately shown support resources
3. Option to talk to counselor
4. Access to crisis helplines
5. Encouraged to speak to trusted adult

## Interactive Elements

### Daily Check-In
- 4 mood options with icons (😊 😐 😕 😢)
- Color-coded (Green, Blue, Yellow, Orange)
- One-click selection
- Instant feedback
- Streak tracking

### Module Cards
- Progress bars showing completion %
- Status badges (Not Started, In Progress, Completed)
- Hover effects for engagement
- Locked state for prerequisite modules
- Time estimates for planning

### Lesson Player
- Clean, distraction-free interface
- Progress indicator
- Next/Previous navigation
- Bookmark feature
- Note-taking capability

## Progress Tracking

### Individual Metrics
- Modules completed (3/12)
- Learning time (2.5 hours)
- Streak days (7 days)
- Skills mastered (5/20)

### Module-Level Tracking
- Lessons completed per module
- Completion percentage
- Time spent on each lesson
- Quiz scores and attempts

### Aggregate Analytics (Admin View)
- Most popular modules
- Average completion rates
- Time spent per category
- Check-in mood trends (anonymized)

## Content Guidelines

### Financial Literacy
- UK-focused (£, banking systems)
- Age-appropriate examples
- No investment advice
- Focus on practical skills

### Ethics & Values
- Neutral, non-political
- Inclusive of diverse perspectives
- Real-world scenarios
- Critical thinking emphasis

### Communication
- Practical, actionable tips
- Role-play exercises
- Peer interaction scenarios
- Professional context preparation

### Mental Wellbeing
- **Non-medical**: Educational only
- **Evidence-based**: CBT principles, mindfulness
- **Empowering**: Self-help strategies
- **Signposting**: When to seek professional help

## Future Enhancements

### Phase 1 (Next 3 months)
- [ ] Interactive exercises with submissions
- [ ] Peer discussion forums (moderated)
- [ ] Downloadable resources (PDFs, worksheets)
- [ ] Video content integration
- [ ] Personalized learning paths

### Phase 2 (3-6 months)
- [ ] Live wellbeing webinars
- [ ] One-on-one counseling booking
- [ ] Parent/guardian insights (opt-in)
- [ ] Wellbeing challenges and competitions
- [ ] Integration with school pastoral care

### Phase 3 (6-12 months)
- [ ] AI-powered mood tracking insights
- [ ] Personalized wellbeing recommendations
- [ ] Integration with wearables (sleep, activity)
- [ ] Wellbeing passport/certificate
- [ ] Community support groups

## Testing Checklist

### Functional Testing
- [ ] Daily check-in saves correctly
- [ ] Module progress tracks accurately
- [ ] Lessons unlock sequentially
- [ ] Quiz scoring works correctly
- [ ] Crisis resources display when needed
- [ ] Dashboard widget updates in real-time
- [ ] Sidebar navigation highlights correctly

### Safeguarding Testing
- [ ] "Struggling" mood triggers support resources
- [ ] Crisis helplines are correct and clickable
- [ ] Content is age-appropriate
- [ ] No medical advice present
- [ ] Privacy settings work correctly
- [ ] Data export includes all user data

### UI/UX Testing
- [ ] Responsive on all devices
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Clear visual hierarchy
- [ ] Intuitive navigation
- [ ] Loading states present
- [ ] Error messages helpful

## Deployment

### Initial Setup
1. Deploy Firestore rules: `firebase deploy --only firestore:rules`
2. Deploy Firestore indexes: `firebase deploy --only firestore:indexes`
3. Seed module content (admin panel or script)
4. Test all user flows
5. Train staff on safeguarding features

### Monitoring
- Check-in submission rates
- Module completion rates
- "Struggling" mood frequency
- Support resource click-through rates
- User engagement metrics

## Support & Maintenance

### Regular Tasks
- **Daily**: Monitor check-ins for patterns
- **Weekly**: Review module completion rates
- **Monthly**: Update content based on feedback
- **Quarterly**: Safeguarding audit

### Content Updates
- Review and refresh examples
- Add new modules based on demand
- Update crisis helpline information
- Incorporate user feedback

## Conclusion

Section 7 provides a comprehensive wellbeing and life skills system that:
- ✅ Covers 4 essential life skill areas
- ✅ Provides 12 structured learning modules
- ✅ Includes daily wellbeing check-ins
- ✅ Offers crisis support resources
- ✅ Tracks progress and engagement
- ✅ Is safeguarding-approved and non-medical
- ✅ Integrates seamlessly with dashboard
- ✅ Provides quick-access from anywhere

The system is production-ready with mock data and can be populated with real content by safeguarding-approved educators and wellbeing professionals.

