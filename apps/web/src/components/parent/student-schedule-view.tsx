'use client';

import { Calendar, Clock, Video, BookOpen, MapPin, Users } from 'lucide-react';

interface Student {
  id: string;
  name: string;
}

interface StudentScheduleViewProps {
  student: Student;
}

export function StudentScheduleView({ student }: StudentScheduleViewProps) {
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
    },
    {
      id: '4',
      type: 'deadline',
      title: 'Business Quiz',
      date: '2024-01-26',
      time: '23:59',
      course: 'Business Fundamentals',
      priority: 'medium'
    }
  ];

  const weeklySchedule = {
    Monday: [
      { time: '16:00-17:00', activity: 'Python Course Study', type: 'study' },
      { time: '19:00-20:00', activity: 'Math Revision', type: 'study' }
    ],
    Tuesday: [
      { time: '15:30-16:30', activity: 'Business Course', type: 'study' }
    ],
    Wednesday: [
      { time: '14:00-15:00', activity: 'Career Webinar', type: 'webinar' },
      { time: '18:00-19:00', activity: 'Data Science Study', type: 'study' }
    ],
    Thursday: [
      { time: '16:00-17:00', activity: 'Python Study', type: 'study' }
    ],
    Friday: [
      { time: '15:00-16:00', activity: 'Quiz Practice', type: 'study' }
    ]
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'webinar':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'deadline':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'low':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Upcoming Events & Deadlines</h3>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="p-5 bg-gray-700/30 rounded-lg border border-gray-700 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{event.title}</h4>
                      {'course' in event && (
                        <p className="text-sm text-gray-400">{event.course}</p>
                      )}
                    </div>
                    {'priority' in event && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(event.priority)}`}>
                        {event.priority} priority
                      </span>
                    )}
                    {'status' in event && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/30">
                        {event.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    {'duration' in event && (
                      <span>{event.duration}</span>
                    )}
                  </div>
                  {'instructor' in event && (
                    <div className="flex items-center gap-6 mt-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Typical Weekly Schedule</h3>
        <div className="space-y-4">
          {Object.entries(weeklySchedule).map(([day, activities]) => (
            <div key={day} className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold text-white mb-3">{day}</h4>
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.type === 'webinar' ? (
                        <Video className="w-4 h-4 text-blue-500" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-sm text-white">{activity.activity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Time Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-white">12.5h</p>
            </div>
          </div>
          <p className="text-sm text-green-500">+2.5h vs last week</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Video className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Upcoming Webinars</p>
              <p className="text-2xl font-bold text-white">2</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">Next: 2 days</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Deadlines</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">Next: 2 days</p>
        </div>
      </div>
    </div>
  );
}

