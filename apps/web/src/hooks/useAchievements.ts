import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/auth-context';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: string;
  earned: boolean;
  earnedDate?: string;
  progress: number;
  current?: number;
  required?: number;
}

export interface AchievementStats {
  earnedCount: number;
  totalCount: number;
  totalPoints: number;
  completionRate: number;
}

export function useAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<AchievementStats>({
    earnedCount: 0,
    totalCount: 0,
    totalPoints: 0,
    completionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all available achievements (master list)
        const achievementsQuery = query(
          collection(db as any, 'achievements'),
          orderBy('points', 'asc')
        );

        const achievementsSnapshot = await getDocs(achievementsQuery);
        
        // Fetch user's progress for each achievement
        const userAchievementsQuery = query(
          collection(db as any, 'userAchievements'),
          where('userId', '==', user.uid)
        );

        const userAchievementsSnapshot = await getDocs(userAchievementsQuery);
        const userAchievementsMap = new Map();
        
        userAchievementsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          userAchievementsMap.set(data.achievementId, {
            earned: data.earned || false,
            earnedDate: data.earnedAt?.toDate().toLocaleDateString() || undefined,
            progress: data.progress || 0,
            current: data.current || 0,
          });
        });

        // Combine achievement definitions with user progress
        const achievementsData: Achievement[] = achievementsSnapshot.docs.map(doc => {
          const data = doc.data();
          const userProgress = userAchievementsMap.get(doc.id) || {
            earned: false,
            progress: 0,
            current: 0,
          };

          return {
            id: doc.id,
            title: data.title || 'Achievement',
            description: data.description || '',
            icon: data.icon || '🏆',
            points: data.points || 0,
            category: data.category || 'General',
            earned: userProgress.earned,
            earnedDate: userProgress.earnedDate,
            progress: userProgress.progress,
            current: userProgress.current,
            required: data.required || undefined,
          };
        });

        setAchievements(achievementsData);

        // Calculate stats
        const earnedCount = achievementsData.filter(a => a.earned).length;
        const totalPoints = achievementsData.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
        const totalCount = achievementsData.length;
        const completionRate = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;

        setStats({
          earnedCount,
          totalCount,
          totalPoints,
          completionRate,
        });

      } catch (err: any) {
        console.error('Error fetching achievements:', err);
        setError(err.message || 'Failed to load achievements');
        // Set empty state on error
        setAchievements([]);
        setStats({
          earnedCount: 0,
          totalCount: 0,
          totalPoints: 0,
          completionRate: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  return {
    achievements,
    stats,
    isLoading,
    error,
  };
}

