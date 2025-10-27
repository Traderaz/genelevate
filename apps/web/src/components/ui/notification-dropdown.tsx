'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  X, 
  Check, 
  Trash2, 
  BookOpen, 
  Video, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Settings
} from 'lucide-react';
import { useNotifications, Notification } from '@/contexts/notification-context';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } = useNotifications();
  const router = useRouter();

  if (!isOpen) return null;

  const getNotificationIcon = (notification: Notification) => {
    if (notification.icon) {
      return <span className="text-lg">{notification.icon}</span>;
    }

    switch (notification.type) {
      case 'course':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'webinar':
        return <Video className="w-4 h-4 text-purple-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'system':
        return <Settings className="w-4 h-4 text-gray-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      if (notification.actionUrl.startsWith('#')) {
        // Handle anchor links
        const element = document.querySelector(notification.actionUrl);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(notification.actionUrl);
      }
    }
    
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-80 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded"
                title="Mark all as read"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded"
                title="Clear all notifications"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
              <p className="text-xs mt-1">We'll notify you when something important happens</p>
            </div>
          ) : (
            <div className="py-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative p-4 hover:bg-accent/50 transition-colors cursor-pointer border-l-2 ${
                    notification.read 
                      ? 'border-transparent opacity-75' 
                      : 'border-primary'
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-sm font-medium ${
                          notification.read ? 'text-muted-foreground' : 'text-foreground'
                        }`}>
                          {notification.title}
                        </h4>
                        
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {getTimeAgo(notification.createdAt)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <p className={`text-sm mt-1 ${
                        notification.read ? 'text-muted-foreground' : 'text-foreground/80'
                      }`}>
                        {notification.message}
                      </p>
                      
                      {notification.actionText && notification.actionUrl && (
                        <div className="mt-2">
                          <span className="text-xs text-primary hover:text-primary/80 font-medium">
                            {notification.actionText} →
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-border bg-accent/20">
            <Link
              href="/dashboard/notifications"
              className="block text-center text-sm text-primary hover:text-primary/80 transition-colors"
              onClick={onClose}
            >
              View all notifications
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
