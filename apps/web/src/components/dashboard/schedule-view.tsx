'use client';

import { Calendar, Clock, Video, BookOpen, MapPin, Users, Bell, Plus } from 'lucide-react';

export function ScheduleView() {
  const upcomingEvents = [
    {
      id: '1',
      type: 'webinar',
      title: 'Career Guidance: Tech Industry',
      date: '2024-01-20',
      time: '14:00',
      duration: '1 hour',
      instructor: 'Dr. Sarah Chen',
      location: 'Online',
      status: 'registered'
    },
    {
      id: '2',
      type: 'deadline',
      title: 'Python Project Submission',
      date: '2024-01-22',
      time: '23:59',
      course: 'Introduction to Python',
      priority: 'high'
    },
    {
      id: '3',
      type: 'webinar',
      title: 'University Application Workshop',
      date: '2024-01-25',
      time: '16:00',
      duration: '2 hours',
      instructor: 'James Wilson',
      location: 'Online',
      status: 'registered'
    }
  ];

  const getEventIcon = (type: string) => {
    return type === 'webinar' ? (
      <Video className="w-5 h-5 text-blue-500" />
    ) : (
      <Clock className="w-5 h-5 text-orange-500" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Schedule</h1>
          <p className="text-gray-400">View your upcoming webinars, deadlines, and events</p>
        </div>

        {/* Calendar View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg">
              List View
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700">
              Calendar View
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white">
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
                      {'course' in event && (
                        <p className="text-sm text-gray-400">{event.course}</p>
                      )}
                    </div>
                    {'priority' in event && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.priority === 'high'
                          ? 'bg-red-500/10 text-red-500 border border-red-500/30'
                          : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'
                      }`}>
                        {event.priority} priority
                      </span>
                    )}
                    {'status' in event && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/30">
                        {event.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-400 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    {'duration' in event && <span>{event.duration}</span>}
                    {'instructor' in event && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.instructor}</span>
                      </div>
                    )}
                    {'location' in event && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  {'status' in event && (
                    <div className="mt-4 flex gap-3">
                      <button className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white text-sm">
                        Join Now
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Set Reminder
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

