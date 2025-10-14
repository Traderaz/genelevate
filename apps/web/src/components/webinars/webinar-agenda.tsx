'use client';

import { useState, useEffect } from 'react';
import { Clock, MessageSquare, HelpCircle, Presentation, Coffee } from 'lucide-react';

interface WebinarAgendaProps {
  webinarId: string;
}

interface AgendaItem {
  id: string;
  title: string;
  description: string;
  startTime: number; // minutes from webinar start
  duration: number; // minutes
  type: 'presentation' | 'discussion' | 'qa' | 'poll' | 'break';
}

export function WebinarAgenda({ webinarId }: WebinarAgendaProps) {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch agenda from API
    setTimeout(() => {
      setAgenda([
        {
          id: '1',
          title: 'Welcome & Introduction',
          description: 'Brief introduction and overview of what we\'ll cover',
          startTime: 0,
          duration: 5,
          type: 'presentation',
        },
        {
          id: '2',
          title: 'Integration by Parts',
          description: 'Detailed explanation with worked examples',
          startTime: 5,
          duration: 25,
          type: 'presentation',
        },
        {
          id: '3',
          title: 'Q&A Session',
          description: 'Questions about integration by parts',
          startTime: 30,
          duration: 10,
          type: 'qa',
        },
        {
          id: '4',
          title: 'Trigonometric Substitution',
          description: 'Methods and applications with examples',
          startTime: 40,
          duration: 25,
          type: 'presentation',
        },
        {
          id: '5',
          title: 'Short Break',
          description: 'Quick 5-minute break',
          startTime: 65,
          duration: 5,
          type: 'break',
        },
        {
          id: '6',
          title: 'Partial Fractions',
          description: 'Decomposition techniques and integration',
          startTime: 70,
          duration: 15,
          type: 'presentation',
        },
        {
          id: '7',
          title: 'Final Q&A & Wrap-up',
          description: 'Final questions and summary',
          startTime: 85,
          duration: 5,
          type: 'qa',
        },
      ]);
      setLoading(false);
    }, 500);
  }, [webinarId]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'presentation': return <Presentation className="w-4 h-4" />;
      case 'discussion': return <MessageSquare className="w-4 h-4" />;
      case 'qa': return <HelpCircle className="w-4 h-4" />;
      case 'break': return <Coffee className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'presentation': return 'text-blue-600 bg-blue-100';
      case 'discussion': return 'text-green-600 bg-green-100';
      case 'qa': return 'text-purple-600 bg-purple-100';
      case 'break': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (agenda.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6 text-center">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="font-medium text-gray-900 mb-2">No Agenda Available</h3>
        <p className="text-gray-600 text-sm">
          The agenda for this webinar will be available soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Webinar Agenda</h2>
      
      <div className="space-y-4">
        {agenda.map((item, index) => (
          <div key={item.id} className="flex items-start space-x-4">
            {/* Time & Icon */}
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                {getIcon(item.type)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {item.duration} min
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>

            {/* Time */}
            <div className="flex-shrink-0 text-right">
              <div className="text-sm font-medium text-gray-900">
                {formatTime(item.startTime)}
              </div>
              <div className="text-xs text-gray-500">
                {formatTime(item.startTime + item.duration)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Duration */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Duration:</span>
          <span className="font-medium text-gray-900">
            {formatTime(agenda.reduce((total, item) => total + item.duration, 0))}
          </span>
        </div>
      </div>
    </div>
  );
}
