'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Video,
  Bell,
  Download
} from 'lucide-react';

interface WebinarRegistrationProps {
  webinarId: string;
}

interface RegistrationData {
  isRegistered: boolean;
  registrationStatus: 'registered' | 'attended' | 'no-show' | 'cancelled';
  webinarStatus: 'scheduled' | 'live' | 'ended';
  scheduledAt: Date;
  duration: number;
  currentAttendees: number;
  maxAttendees: number;
  requiresRegistration: boolean;
  registrationDeadline?: Date;
  canJoin: boolean;
  hasCapacity: boolean;
  recordingAvailable: boolean;
  recordingUrl?: string;
  certificateAvailable: boolean;
  certificateUrl?: string;
}

export function WebinarRegistration({ webinarId }: WebinarRegistrationProps) {
  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    // TODO: Fetch registration data from API
    setTimeout(() => {
      setData({
        isRegistered: false,
        registrationStatus: 'registered',
        webinarStatus: 'scheduled',
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: 90,
        currentAttendees: 73,
        maxAttendees: 100,
        requiresRegistration: true,
        registrationDeadline: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
        canJoin: false,
        hasCapacity: true,
        recordingAvailable: false,
        certificateAvailable: true,
      });
      setLoading(false);
    }, 500);
  }, [webinarId]);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      // TODO: Call registration API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData(prev => prev ? {
        ...prev,
        isRegistered: true,
        currentAttendees: prev.currentAttendees + 1,
      } : null);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    setRegistering(true);
    try {
      // TODO: Call unregistration API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData(prev => prev ? {
        ...prev,
        isRegistered: false,
        currentAttendees: Math.max(0, prev.currentAttendees - 1),
      } : null);
    } catch (error) {
      console.error('Unregistration failed:', error);
    } finally {
      setRegistering(false);
    }
  };

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };
  };

  const getTimeUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff <= 0) return 'Starting now';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-12 bg-gray-200 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { date, time } = formatDateTime(data.scheduledAt);
  const timeUntil = getTimeUntil(data.scheduledAt);
  const capacityPercentage = (data.currentAttendees / data.maxAttendees) * 100;

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Status Header */}
      <div className={`px-6 py-4 ${
        data.webinarStatus === 'live' 
          ? 'bg-red-500' 
          : data.webinarStatus === 'ended'
          ? 'bg-gray-500'
          : 'bg-blue-500'
      }`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            {data.webinarStatus === 'live' && (
              <>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                <span className="font-semibold">LIVE NOW</span>
              </>
            )}
            {data.webinarStatus === 'scheduled' && (
              <>
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">SCHEDULED</span>
              </>
            )}
            {data.webinarStatus === 'ended' && (
              <>
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold">ENDED</span>
              </>
            )}
          </div>
          {data.webinarStatus === 'scheduled' && (
            <span className="text-sm">{timeUntil}</span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Registration Status */}
        {data.isRegistered && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">You're registered!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              You'll receive a reminder before the webinar starts.
            </p>
          </div>
        )}

        {/* Webinar Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">{date}</div>
              <div className="text-gray-600">{time}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{data.duration} minutes</span>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Users className="w-4 h-4 text-gray-400" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">
                  {data.currentAttendees} / {data.maxAttendees} registered
                </span>
                <span className="text-xs text-gray-500">
                  {Math.round(capacityPercentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    capacityPercentage > 90 ? 'bg-red-500' : 
                    capacityPercentage > 75 ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${capacityPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Capacity Warning */}
        {!data.hasCapacity && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Webinar Full</span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              This webinar has reached maximum capacity.
            </p>
          </div>
        )}

        {/* Registration Deadline Warning */}
        {data.registrationDeadline && new Date() > data.registrationDeadline && !data.isRegistered && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Registration Closed</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Registration deadline has passed.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {data.webinarStatus === 'live' && data.isRegistered && (
            <Link
              href={`/webinars/${webinarId}/join`}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Video className="w-5 h-5" />
              <span>Join Live Webinar</span>
            </Link>
          )}

          {data.webinarStatus === 'scheduled' && !data.isRegistered && data.hasCapacity && (
            <button
              onClick={handleRegister}
              disabled={registering}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              {registering ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <Bell className="w-5 h-5" />
                  <span>Register for Webinar</span>
                </>
              )}
            </button>
          )}

          {data.webinarStatus === 'scheduled' && data.isRegistered && (
            <button
              onClick={handleUnregister}
              disabled={registering}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {registering ? 'Updating...' : 'Cancel Registration'}
            </button>
          )}

          {data.webinarStatus === 'ended' && data.recordingAvailable && (
            <a
              href={data.recordingUrl}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Video className="w-5 h-5" />
              <span>Watch Recording</span>
            </a>
          )}

          {data.isRegistered && data.certificateAvailable && data.webinarStatus === 'ended' && (
            <a
              href={data.certificateUrl}
              className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Certificate</span>
            </a>
          )}
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 space-y-1">
          {data.requiresRegistration && (
            <p>• Registration required to join</p>
          )}
          <p>• You'll receive email reminders</p>
          <p>• Recording will be available after the session</p>
          {data.certificateAvailable && (
            <p>• Certificate available upon completion</p>
          )}
        </div>
      </div>
    </div>
  );
}
