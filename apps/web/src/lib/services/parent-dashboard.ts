import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  orderBy,
  limit 
} from 'firebase/firestore';

export interface StudentData {
  id: string;
  name: string;
  email: string;
  yearGroup?: string;
  institution?: string;
  subscription: {
    plan: string;
    status: string;
    expiresAt?: Date;
  };
}

export interface StudentProgress {
  totalPoints: number;
  coursesCompleted: number;
  coursesInProgress: number;
  currentStreak: number;
  avgQuizScore: number;
  totalTimeSpent: number;
  lastActivity: Date;
  rank?: number;
}

export interface CourseProgress {
  id: string;
  courseId: string;
  title: string;
  category: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  lastAccessed: Date;
  quizScore?: number;
  timeSpent: number;
}

export interface StudentAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  type: 'course' | 'streak' | 'quiz' | 'time' | 'special';
}

export interface UpcomingEvent {
  id: string;
  type: 'webinar' | 'deadline' | 'quiz' | 'assignment';
  title: string;
  date: Date;
  course?: string;
  priority?: 'high' | 'medium' | 'low';
  status?: string;
}

/**
 * Get linked student data for a parent account
 */
export async function getLinkedStudentData(parentUserId: string): Promise<StudentData | null> {
  try {
    // Get parent's profile to find linked child email
    const parentDoc = await getDoc(doc(db, 'users', parentUserId));
    if (!parentDoc.exists()) {
      throw new Error('Parent account not found');
    }

    const parentData = parentDoc.data();
    const linkedChildEmail = parentData.linkedChildEmail;

    if (!linkedChildEmail) {
      return null;
    }

    // Find the child account
    const usersRef = collection(db, 'users');
    const childQuery = query(usersRef, where('email', '==', linkedChildEmail));
    const childSnapshot = await getDocs(childQuery);

    if (childSnapshot.empty) {
      return null;
    }

    const childDoc = childSnapshot.docs[0];
    const childData = childDoc.data();

    return {
      id: childDoc.id,
      name: childData.displayName || childData.name || 'Student',
      email: childData.email,
      yearGroup: childData.yearGroup,
      institution: childData.institution,
      subscription: {
        plan: childData.subscription?.plan || 'free',
        status: childData.subscription?.status || 'inactive',
        expiresAt: childData.subscription?.expiresAt?.toDate()
      }
    };
  } catch (error) {
    console.error('Error fetching linked student data:', error);
    return null;
  }
}

/**
 * Get student's overall progress and statistics
 */
export async function getStudentProgress(studentId: string): Promise<StudentProgress> {
  try {
    // Get all progress records for this student
    const progressRef = collection(db, 'progress');
    const progressQuery = query(progressRef, where('userId', '==', studentId));
    const progressSnapshot = await getDocs(progressQuery);

    let totalPoints = 0;
    let coursesCompleted = 0;
    let coursesInProgress = 0;
    let totalQuizScore = 0;
    let quizCount = 0;
    let totalTimeSpent = 0;
    let lastActivity = new Date(0);

    progressSnapshot.forEach((doc) => {
      const data = doc.data();
      
      if (data.points) totalPoints += data.points;
      if (data.status === 'completed') coursesCompleted++;
      if (data.status === 'in-progress') coursesInProgress++;
      if (data.quizScore) {
        totalQuizScore += data.quizScore;
        quizCount++;
      }
      if (data.timeSpent) totalTimeSpent += data.timeSpent;
      if (data.lastAccessed && data.lastAccessed.toDate() > lastActivity) {
        lastActivity = data.lastAccessed.toDate();
      }
    });

    // Calculate current streak (simplified - in production, you'd track daily activity)
    const currentStreak = await calculateLearningStreak(studentId);

    return {
      totalPoints,
      coursesCompleted,
      coursesInProgress,
      currentStreak,
      avgQuizScore: quizCount > 0 ? Math.round(totalQuizScore / quizCount) : 0,
      totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to hours
      lastActivity
    };
  } catch (error) {
    console.error('Error fetching student progress:', error);
    return {
      totalPoints: 0,
      coursesCompleted: 0,
      coursesInProgress: 0,
      currentStreak: 0,
      avgQuizScore: 0,
      totalTimeSpent: 0,
      lastActivity: new Date()
    };
  }
}

/**
 * Get detailed course progress for a student
 */
export async function getStudentCourseProgress(studentId: string): Promise<CourseProgress[]> {
  try {
    const progressRef = collection(db, 'progress');
    const progressQuery = query(
      progressRef, 
      where('userId', '==', studentId),
      orderBy('lastAccessed', 'desc')
    );
    const progressSnapshot = await getDocs(progressQuery);

    const courses: CourseProgress[] = [];

    for (const doc of progressSnapshot.docs) {
      const data = doc.data();
      
      // Get course details
      const courseDoc = await getDoc(doc(db, 'courses', data.courseId));
      const courseData = courseDoc.exists() ? courseDoc.data() : null;

      courses.push({
        id: doc.id,
        courseId: data.courseId,
        title: courseData?.title || 'Unknown Course',
        category: courseData?.category || 'General',
        progress: data.progress || 0,
        status: data.status || 'not-started',
        lastAccessed: data.lastAccessed?.toDate() || new Date(),
        quizScore: data.quizScore,
        timeSpent: Math.round((data.timeSpent || 0) / 60) // Convert to hours
      });
    }

    return courses;
  } catch (error) {
    console.error('Error fetching student course progress:', error);
    return [];
  }
}

/**
 * Get student's achievements
 */
export async function getStudentAchievements(studentId: string): Promise<StudentAchievement[]> {
  try {
    const achievementsRef = collection(db, 'achievements');
    const achievementsQuery = query(
      achievementsRef,
      where('userId', '==', studentId),
      orderBy('earnedAt', 'desc')
    );
    const achievementsSnapshot = await getDocs(achievementsQuery);

    const achievements: StudentAchievement[] = [];

    achievementsSnapshot.forEach((doc) => {
      const data = doc.data();
      achievements.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        icon: data.icon || '🏆',
        earnedAt: data.earnedAt.toDate(),
        type: data.type || 'special'
      });
    });

    return achievements;
  } catch (error) {
    console.error('Error fetching student achievements:', error);
    return [];
  }
}

/**
 * Get upcoming events and deadlines for a student
 */
export async function getStudentUpcomingEvents(studentId: string): Promise<UpcomingEvent[]> {
  try {
    const events: UpcomingEvent[] = [];
    const now = new Date();

    // Get webinar registrations
    const webinarRegsRef = collection(db, 'webinarRegistrations');
    const webinarQuery = query(webinarRegsRef, where('userId', '==', studentId));
    const webinarSnapshot = await getDocs(webinarQuery);

    for (const doc of webinarSnapshot.docs) {
      const regData = doc.data();
      const webinarDoc = await getDoc(doc(db, 'webinars', regData.webinarId));
      
      if (webinarDoc.exists()) {
        const webinarData = webinarDoc.data();
        const eventDate = webinarData.scheduledAt.toDate();
        
        if (eventDate > now) {
          events.push({
            id: doc.id,
            type: 'webinar',
            title: webinarData.title,
            date: eventDate,
            status: regData.status || 'registered'
          });
        }
      }
    }

    // Get course deadlines (from progress records)
    const progressRef = collection(db, 'progress');
    const progressQuery = query(progressRef, where('userId', '==', studentId));
    const progressSnapshot = await getDocs(progressQuery);

    progressSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.nextDeadline && data.nextDeadline.toDate() > now) {
        events.push({
          id: doc.id + '_deadline',
          type: 'deadline',
          title: data.nextDeadlineTitle || 'Course Deadline',
          date: data.nextDeadline.toDate(),
          course: data.courseTitle,
          priority: data.deadlinePriority || 'medium'
        });
      }
    });

    // Sort by date
    events.sort((a, b) => a.date.getTime() - b.date.getTime());

    return events.slice(0, 10); // Return next 10 events
  } catch (error) {
    console.error('Error fetching student upcoming events:', error);
    return [];
  }
}

/**
 * Calculate learning streak for a student
 */
async function calculateLearningStreak(studentId: string): Promise<number> {
  try {
    // This is a simplified version - in production you'd have a daily activity log
    const progressRef = collection(db, 'progress');
    const recentQuery = query(
      progressRef,
      where('userId', '==', studentId),
      orderBy('lastAccessed', 'desc'),
      limit(30)
    );
    const recentSnapshot = await getDocs(recentQuery);

    const activityDates = new Set<string>();
    recentSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.lastAccessed) {
        const dateStr = data.lastAccessed.toDate().toDateString();
        activityDates.add(dateStr);
      }
    });

    // Calculate consecutive days (simplified)
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toDateString();
      
      if (activityDates.has(dateStr)) {
        streak++;
      } else if (i > 0) {
        break; // Streak broken
      }
    }

    return streak;
  } catch (error) {
    console.error('Error calculating learning streak:', error);
    return 0;
  }
}

/**
 * Get all students for admin view (admin only)
 */
export async function getAllStudentsForAdmin(): Promise<StudentData[]> {
  try {
    const usersRef = collection(db, 'users');
    const studentsQuery = query(
      usersRef, 
      where('role', '==', 'student'),
      orderBy('displayName', 'asc')
    );
    const studentsSnapshot = await getDocs(studentsQuery);

    const students: StudentData[] = [];

    studentsSnapshot.forEach((doc) => {
      const data = doc.data();
      students.push({
        id: doc.id,
        name: data.displayName || data.name || 'Student',
        email: data.email,
        yearGroup: data.yearGroup,
        institution: data.institution,
        subscription: {
          plan: data.subscription?.plan || 'free',
          status: data.subscription?.status || 'inactive',
          expiresAt: data.subscription?.expiresAt?.toDate()
        }
      });
    });

    return students;
  } catch (error) {
    console.error('Error fetching all students for admin:', error);
    return [];
  }
}
