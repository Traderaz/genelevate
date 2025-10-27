'use client';

import { useState } from 'react';
import { useNotifications, Notification } from '@/contexts/notification-context';
import { 
  Bell, 
  Check, 
  CheckCircle2, 
  Trash2, 
  Filter,
  BookOpen, 
  Video, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Settings,
  Search
} from 'lucide-react';

export default function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotifications();
  
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getNotificationIcon = (notification: Notification) => {
    if (notification.icon) {
      return <span className="text-xl">{notification.icon}</span>;
    }

    switch (notification.type) {
      case 'course':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'webinar':
        return <Video className="w-5 h-5 text-purple-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'system':
        return <Settings className="w-5 h-5 text-gray-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
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

  const filteredNotifications = notifications.filter(notification => {
    // Filter by read status
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    
    // Filter by type
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    
    // Filter by search query
    if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const notificationTypes = Array.from(new Set(notifications.map(n => n.type)));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark All Read
            </button>
          )}
          
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="inline-flex items-center gap-2 px-4 py-2 border border-destructive/20 text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border border-border">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
            className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
        
        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Types</option>
          {notificationTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {searchQuery || filter !== 'all' || typeFilter !== 'all' 
                ? 'No notifications match your filters' 
                : 'No notifications yet'
              }
            </h3>
            <p className="text-muted-foreground">
              {searchQuery || filter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : "We'll notify you when something important happens"
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 bg-card rounded-lg border transition-all hover:shadow-md ${
                notification.read 
                  ? 'border-border opacity-75' 
                  : 'border-primary/20 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`text-lg font-medium ${
                        notification.read ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {notification.title}
                      </h3>
                      
                      <p className={`mt-1 ${
                        notification.read ? 'text-muted-foreground' : 'text-foreground/80'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-sm text-muted-foreground">
                          {getTimeAgo(notification.createdAt)}
                        </span>
                        
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          notification.type === 'course' ? 'bg-blue-500/20 text-blue-500' :
                          notification.type === 'webinar' ? 'bg-purple-500/20 text-purple-500' :
                          notification.type === 'success' ? 'bg-green-500/20 text-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                          notification.type === 'error' ? 'bg-red-500/20 text-red-500' :
                          'bg-blue-500/20 text-blue-500'
                        }`}>
                          {notification.type}
                        </span>
                      </div>
                      
                      {notification.actionText && notification.actionUrl && (
                        <div className="mt-4">
                          <a
                            href={notification.actionUrl}
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
                          >
                            {notification.actionText} →
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
