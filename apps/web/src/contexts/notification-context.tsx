'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './auth-context';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'course' | 'webinar' | 'system';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionText?: string;
  icon?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user, userProfile } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Generate sample notifications based on user role and subscription
  useEffect(() => {
    if (user && userProfile) {
      const sampleNotifications: Notification[] = [
        {
          id: '1',
          title: 'Welcome to Gen Elevate!',
          message: 'Complete your profile to get personalized course recommendations.',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          actionUrl: '/dashboard/profile',
          actionText: 'Complete Profile',
          icon: '👋'
        },
        {
          id: '2',
          title: 'New Course Available',
          message: 'Advanced Mathematics for A-Level students is now live!',
          type: 'course',
          read: false,
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          actionUrl: '/courses',
          actionText: 'View Course',
          icon: '📚'
        },
        {
          id: '3',
          title: 'Upcoming Webinar',
          message: 'Join our live session on "Study Techniques" tomorrow at 3 PM.',
          type: 'webinar',
          read: true,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          actionUrl: '/webinars',
          actionText: 'Join Webinar',
          icon: '🎥'
        }
      ];

      // Add role-specific notifications
      if (userProfile.role === 'content-creator') {
        sampleNotifications.push({
          id: '4',
          title: 'Content Approval Status',
          message: 'Your recent course submission is under review.',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          actionUrl: '/creator-dashboard',
          actionText: 'View Status',
          icon: '⏳'
        });
      }

      if (userProfile.subscription?.plan === 'free') {
        sampleNotifications.push({
          id: '5',
          title: 'Upgrade to Premium',
          message: 'Unlock unlimited access to all courses and AI features.',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          actionUrl: '#pricing',
          actionText: 'Upgrade Now',
          icon: '⭐'
        });
      }

      setNotifications(sampleNotifications);
    } else {
      setNotifications([]);
    }
  }, [user, userProfile]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (newNotification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      createdAt: new Date(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const value: NotificationContextType = useMemo(() => ({
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addNotification
  }), [notifications, unreadCount]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
