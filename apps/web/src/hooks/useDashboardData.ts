import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/auth-context';

interface CourseProgress {
  id: string;
  courseId: string;
  title: string;
  subtitle: string;
  progress: number;
  duration: string;
  type: 'course' | 'webinar';
  thumbnail?: string;
  lastAccessed: Date;
}

interface UpcomingWebinar {
  id: string;
  title: string;
  instructor: string;
  time: string;
  startDate: Date;
  participants: number;
  thumbnail?: string;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export function useDashboardData() {
  const { user } = useAuth();
  const [continueWatching, setContinueWatching] = useState<CourseProgress[]>([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState<UpcomingWebinar[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch user's course progress (in-progress courses)
        const progressQuery = query(
          collection(db as any, 'courseProgress'),
          where('userId', '==', user.uid),
          where('status', '==', 'in-progress'),
          orderBy('lastAccessed', 'desc'),
          limit(6)
        );

        const progressSnapshot = await getDocs(progressQuery);
        const progressData: CourseProgress[] = progressSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            courseId: data.courseId,
            title: data.courseTitle || 'Course',
            subtitle: data.currentLesson || 'Continue learning',
            progress: data.progress || 0,
            duration: data.estimatedTimeRemaining || 'Continue',
            type: 'course',
            thumbnail: data.thumbnail,
            lastAccessed: data.lastAccessed?.toDate() || new Date(),
          };
        });
        setContinueWatching(progressData);

        // Fetch upcoming webinars (next 7 days)
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        const webinarsQuery = query(
          collection(db as any, 'webinars'),
          where('startDate', '>=', now),
          where('startDate', '<=', nextWeek),
          where('status', '==', 'scheduled'),
          orderBy('startDate', 'asc'),
          limit(5)
        );

        const webinarsSnapshot = await getDocs(webinarsQuery);
        const webinarsData: UpcomingWebinar[] = webinarsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Webinar',
            instructor: data.instructor || 'Instructor',
            time: formatWebinarTime(data.startDate?.toDate()),
            startDate: data.startDate?.toDate() || new Date(),
            participants: data.registeredCount || 0,
            thumbnail: data.thumbnail,
          };
        });
        setUpcomingWebinars(webinarsData);

        // Fetch user's achievements
        const achievementsQuery = query(
          collection(db as any, 'userAchievements'),
          where('userId', '==', user.uid),
          orderBy('unlockedAt', 'desc'),
          limit(10)
        );

        const achievementsSnapshot = await getDocs(achievementsQuery);
        const achievementsData: Achievement[] = achievementsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Achievement',
            icon: data.icon || '🏆',
            unlocked: data.unlocked || false,
            unlockedAt: data.unlockedAt?.toDate(),
          };
        });
        setAchievements(achievementsData);

      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return {
    continueWatching,
    upcomingWebinars,
    achievements,
    isLoading,
    error,
  };
}

function formatWebinarTime(date?: Date): string {
  if (!date) return 'TBD';
  
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const timeStr = date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  if (days === 0) {
    return `Today, ${timeStr}`;
  } else if (days === 1) {
    return `Tomorrow, ${timeStr}`;
  } else if (days < 7) {
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
    return `${dayName}, ${timeStr}`;
  } else {
    return date.toLocaleDateString('en-GB', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

