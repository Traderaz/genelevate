'use client';

import { Calendar } from 'lucide-react';

export function UpcomingWebinars() {
  // TODO: Fetch upcoming webinars from Firestore
  const upcomingWebinars: any[] = [];

  if (upcomingWebinars.length === 0) {
    return (
      <div className="text-center py-16">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No upcoming webinars scheduled</h3>
        <p className="text-gray-400">Check back soon for new sessions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Upcoming Webinars</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingWebinars.map((webinar) => (
          <div key={webinar.id} className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                Upcoming
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{webinar.title}</h3>
            <div className="space-y-2 text-sm text-gray-400 mb-4">
              <div className="flex items-center justify-between">
                <span>Subject:</span>
                <span>{webinar.subject}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>When:</span>
                <span>{webinar.scheduledAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Registered:</span>
                <span>{webinar.attendees} students</span>
              </div>
            </div>
            <button className="w-full bg-[#e50914] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#b00710] transition-colors">
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
