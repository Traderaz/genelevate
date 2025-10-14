import { Timestamp } from '../types/common';

/**
 * Convert Firestore Timestamp to JavaScript Date
 */
export function timestampToDate(timestamp: Timestamp): Date {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}

/**
 * Convert JavaScript Date to Firestore Timestamp
 */
export function dateToTimestamp(date: Date): Timestamp {
  const seconds = Math.floor(date.getTime() / 1000);
  const nanoseconds = (date.getTime() % 1000) * 1000000;
  return { seconds, nanoseconds };
}

/**
 * Format date for display
 */
export function formatDate(date: Date | Timestamp, options?: Intl.DateTimeFormatOptions): string {
  const jsDate = date instanceof Date ? date : timestampToDate(date);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return jsDate.toLocaleDateString('en-GB', { ...defaultOptions, ...options });
}

/**
 * Format time for display
 */
export function formatTime(date: Date | Timestamp, options?: Intl.DateTimeFormatOptions): string {
  const jsDate = date instanceof Date ? date : timestampToDate(date);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return jsDate.toLocaleTimeString('en-GB', { ...defaultOptions, ...options });
}

/**
 * Format date and time for display
 */
export function formatDateTime(date: Date | Timestamp, options?: Intl.DateTimeFormatOptions): string {
  const jsDate = date instanceof Date ? date : timestampToDate(date);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return jsDate.toLocaleDateString('en-GB', { ...defaultOptions, ...options });
}

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date: Date | Timestamp): string {
  const jsDate = date instanceof Date ? date : timestampToDate(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - jsDate.getTime()) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds);
    if (count >= 1) {
      const suffix = count === 1 ? '' : 's';
      if (diffInSeconds > 0) {
        return `${count} ${interval.label}${suffix} ago`;
      } else {
        return `in ${count} ${interval.label}${suffix}`;
      }
    }
  }
  
  return 'just now';
}

/**
 * Check if date is today
 */
export function isToday(date: Date | Timestamp): boolean {
  const jsDate = date instanceof Date ? date : timestampToDate(date);
  const today = new Date();
  
  return jsDate.getDate() === today.getDate() &&
         jsDate.getMonth() === today.getMonth() &&
         jsDate.getFullYear() === today.getFullYear();
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date | Timestamp): boolean {
  const jsDate = date instanceof Date ? date : timestampToDate(date);
  return jsDate.getTime() < Date.now();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date | Timestamp): boolean {
  const jsDate = date instanceof Date ? date : timestampToDate(date);
  return jsDate.getTime() > Date.now();
}

/**
 * Add duration to date
 */
export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

/**
 * Add days to date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
