'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  onSnapshot, 
  where,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  writeBatch,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  role: 'student' | 'parent' | 'institution' | 'admin' | 'content-creator';
  subscription?: {
    plan: string;
    status: 'active' | 'inactive' | 'cancelled' | 'past_due';
    expiresAt: string;
  };
  createdAt: string;
  lastActive?: string;
  isVerified: boolean;
  hasIssues: boolean;
  photoURL?: string;
  yearGroup?: string;
  institution?: string;
}

export interface AdminContent {
  id: string;
  title: string;
  type: 'course' | 'webinar' | 'article' | 'video';
  status: 'published' | 'draft' | 'archived' | 'pending_review';
  author: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  rating: number;
  duration?: string;
  category: string;
  tags: string[];
  hasIssues: boolean;
  enrollments?: number;
  description?: string;
  thumbnailUrl?: string;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  timestamp: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalWebinars: number;
  pendingIssues: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  recentSignups: number;
  totalRevenue: number;
}

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // First try to get all users without ordering to avoid potential field issues
    const usersQuery = collection(db, 'users');

    const unsubscribe = onSnapshot(
      usersQuery,
      (snapshot) => {
        try {
          console.log('Fetching users from Firestore...', snapshot.size, 'documents found');
          const usersData: AdminUser[] = [];
          
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log('User document:', doc.id, data);
            
            // Handle different date formats
            let createdAtString = new Date().toISOString();
            if (data.createdAt) {
              if (data.createdAt.toDate) {
                createdAtString = data.createdAt.toDate().toISOString();
              } else if (typeof data.createdAt === 'string') {
                createdAtString = data.createdAt;
              } else if (data.createdAt instanceof Date) {
                createdAtString = data.createdAt.toISOString();
              }
            }

            let lastActiveString;
            if (data.lastActive) {
              if (data.lastActive.toDate) {
                lastActiveString = data.lastActive.toDate().toISOString();
              } else if (typeof data.lastActive === 'string') {
                lastActiveString = data.lastActive;
              } else if (data.lastActive instanceof Date) {
                lastActiveString = data.lastActive.toISOString();
              }
            }

            usersData.push({
              id: doc.id,
              email: data.email || data.userEmail || '',
              firstName: data.firstName || data.first_name || '',
              lastName: data.lastName || data.last_name || '',
              displayName: data.displayName || data.display_name,
              role: data.role || 'student',
              subscription: data.subscription || {
                plan: 'Free',
                status: 'inactive',
                expiresAt: new Date().toISOString()
              },
              createdAt: createdAtString,
              lastActive: lastActiveString,
              isVerified: data.emailVerified || data.isVerified || false,
              hasIssues: data.hasIssues || false,
              photoURL: data.photoURL || data.photo_url,
              yearGroup: data.yearGroup || data.year_group,
              institution: data.institution
            });
          });
          
          // Sort by creation date after fetching
          usersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          console.log('Processed users:', usersData.length);
          setUsers(usersData);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching users:', err);
          setError('Failed to fetch users');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error in users subscription:', err);
        setError('Failed to subscribe to users');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateUser = async (userId: string, updates: Partial<AdminUser>) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const flagUserIssue = async (userId: string, hasIssues: boolean, issueNote?: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        hasIssues,
        issueNote: issueNote || null,
        issueUpdatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error flagging user issue:', error);
      throw error;
    }
  };

  return {
    users,
    loading,
    error,
    updateUser,
    deleteUser,
    flagUserIssue
  };
}

export function useAdminContent() {
  const [content, setContent] = useState<AdminContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const contentQuery = query(
      collection(db, 'courses'),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      contentQuery,
      (snapshot) => {
        try {
          const contentData: AdminContent[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            contentData.push({
              id: doc.id,
              title: data.title || '',
              type: 'course',
              status: data.status || 'draft',
              author: data.instructor || data.author || 'Unknown',
              authorId: data.instructorId || data.authorId || '',
              createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
              updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
              views: data.views || 0,
              rating: data.rating || 0,
              duration: data.duration,
              category: data.category || 'General',
              tags: data.tags || [],
              hasIssues: data.hasIssues || false,
              enrollments: data.enrollmentCount || 0,
              description: data.description,
              thumbnailUrl: data.thumbnailUrl
            });
          });
          setContent(contentData);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching content:', err);
          setError('Failed to fetch content');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error in content subscription:', err);
        setError('Failed to subscribe to content');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateContent = async (contentId: string, updates: Partial<AdminContent>) => {
    try {
      const contentRef = doc(db, 'courses', contentId);
      await updateDoc(contentRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  };

  const deleteContent = async (contentId: string) => {
    try {
      const contentRef = doc(db, 'courses', contentId);
      await deleteDoc(contentRef);
      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  };

  const approveContent = async (contentId: string) => {
    try {
      const contentRef = doc(db, 'courses', contentId);
      await updateDoc(contentRef, {
        status: 'published',
        approvedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error approving content:', error);
      throw error;
    }
  };

  return {
    content,
    loading,
    error,
    updateContent,
    deleteContent,
    approveContent
  };
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    totalWebinars: 0,
    pendingIssues: 0,
    systemHealth: 'healthy',
    recentSignups: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const totalUsers = usersSnapshot.size;

        // Get active users (logged in within last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const activeUsersQuery = query(
          collection(db, 'users'),
          where('lastActive', '>=', Timestamp.fromDate(thirtyDaysAgo))
        );
        const activeUsersSnapshot = await getDocs(activeUsersQuery);
        const activeUsers = activeUsersSnapshot.size;

        // Get total courses
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        const totalCourses = coursesSnapshot.size;

        // Get webinars
        const webinarsSnapshot = await getDocs(collection(db, 'webinars'));
        const totalWebinars = webinarsSnapshot.size;

        // Get users with issues
        const issuesQuery = query(
          collection(db, 'users'),
          where('hasIssues', '==', true)
        );
        const issuesSnapshot = await getDocs(issuesQuery);
        const pendingIssues = issuesSnapshot.size;

        // Get recent signups (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const recentSignupsQuery = query(
          collection(db, 'users'),
          where('createdAt', '>=', Timestamp.fromDate(sevenDaysAgo))
        );
        const recentSignupsSnapshot = await getDocs(recentSignupsQuery);
        const recentSignups = recentSignupsSnapshot.size;

        setStats({
          totalUsers,
          activeUsers,
          totalCourses,
          totalWebinars,
          pendingIssues,
          systemHealth: pendingIssues > 10 ? 'warning' : pendingIssues > 20 ? 'critical' : 'healthy',
          recentSignups,
          totalRevenue: 0 // TODO: Implement revenue tracking
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError('Failed to fetch admin statistics');
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error };
}

export function useSystemMetrics() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealMetrics = async () => {
      try {
        setLoading(true);
        const realMetrics: SystemMetric[] = [];

        // Real Firebase Response Time Test
        const firestoreStartTime = performance.now();
        try {
          await getDocs(query(collection(db, 'users'), limit(1)));
          const firestoreResponseTime = Math.round(performance.now() - firestoreStartTime);
          realMetrics.push({
            name: 'Firestore Response Time',
            value: firestoreResponseTime,
            unit: 'ms',
            status: firestoreResponseTime < 100 ? 'healthy' : firestoreResponseTime < 300 ? 'warning' : 'critical',
            trend: 'stable',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          realMetrics.push({
            name: 'Firestore Response Time',
            value: -1,
            unit: 'ms',
            status: 'critical',
            trend: 'down',
            timestamp: new Date().toISOString()
          });
        }

        // Real Active Users (last 5 minutes)
        try {
          const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
          const activeUsersQuery = query(
            collection(db, 'users'),
            where('lastActive', '>=', Timestamp.fromDate(fiveMinutesAgo))
          );
          const activeUsersSnapshot = await getDocs(activeUsersQuery);
          const activeUsers = activeUsersSnapshot.size;
          
          realMetrics.push({
            name: 'Active Users (5min)',
            value: activeUsers,
            unit: 'users',
            status: 'healthy',
            trend: 'stable',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          realMetrics.push({
            name: 'Active Users (5min)',
            value: 0,
            unit: 'users',
            status: 'warning',
            trend: 'down',
            timestamp: new Date().toISOString()
          });
        }

        // Real Content Issues
        try {
          const contentIssuesQuery = query(
            collection(db, 'courses'),
            where('hasIssues', '==', true)
          );
          const contentIssuesSnapshot = await getDocs(contentIssuesQuery);
          const contentIssues = contentIssuesSnapshot.size;
          
          realMetrics.push({
            name: 'Content Issues',
            value: contentIssues,
            unit: 'issues',
            status: contentIssues === 0 ? 'healthy' : contentIssues < 5 ? 'warning' : 'critical',
            trend: 'stable',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          realMetrics.push({
            name: 'Content Issues',
            value: -1,
            unit: 'issues',
            status: 'critical',
            trend: 'down',
            timestamp: new Date().toISOString()
          });
        }

        // Real User Issues
        try {
          const userIssuesQuery = query(
            collection(db, 'users'),
            where('hasIssues', '==', true)
          );
          const userIssuesSnapshot = await getDocs(userIssuesQuery);
          const userIssues = userIssuesSnapshot.size;
          
          realMetrics.push({
            name: 'User Issues',
            value: userIssues,
            unit: 'issues',
            status: userIssues === 0 ? 'healthy' : userIssues < 10 ? 'warning' : 'critical',
            trend: 'stable',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          realMetrics.push({
            name: 'User Issues',
            value: -1,
            unit: 'issues',
            status: 'critical',
            trend: 'down',
            timestamp: new Date().toISOString()
          });
        }

        // Browser Performance (Real)
        if (typeof window !== 'undefined' && performance.getEntriesByType) {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            const pageLoadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
            realMetrics.push({
              name: 'Page Load Time',
              value: pageLoadTime,
              unit: 'ms',
              status: pageLoadTime < 2000 ? 'healthy' : pageLoadTime < 5000 ? 'warning' : 'critical',
              trend: 'stable',
              timestamp: new Date().toISOString()
            });
          }
        }

        setMetrics(realMetrics);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching real system metrics:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchRealMetrics();

    // Update every 30 seconds with real data
    const interval = setInterval(fetchRealMetrics, 30000);

    return () => clearInterval(interval);
  }, []);

  return { metrics, loading };
}
