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

  // Load real notifications from localStorage on mount
  useEffect(() => {
    if (user) {
      // Load saved notifications from localStorage for this user
      const savedNotifications = localStorage.getItem(`notifications_${user.uid}`);
      if (savedNotifications) {
        try {
          const parsed = JSON.parse(savedNotifications);
          // Convert date strings back to Date objects
          const notifications = parsed.map((n: any) => ({
            ...n,
            createdAt: new Date(n.createdAt)
          }));
          setNotifications(notifications);
        } catch (error) {
          console.error('Error loading notifications:', error);
          setNotifications([]);
        }
      }
    } else {
      setNotifications([]);
    }
  }, [user]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (user && notifications.length >= 0) {
      localStorage.setItem(`notifications_${user.uid}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

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
