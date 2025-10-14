export function UpcomingWebinars() {
  const upcomingWebinars = [
    {
      id: '1',
      title: 'GCSE Mathematics Review Session',
      scheduledAt: 'Tomorrow, 4:00 PM',
      subject: 'Mathematics',
      attendees: 45,
    },
    {
      id: '2',
      title: 'University Application Workshop',
      scheduledAt: 'Friday, 3:30 PM',
      subject: 'Careers',
      attendees: 78,
    },
    {
      id: '3',
      title: 'A-Level Chemistry Lab Techniques',
      scheduledAt: 'Next Monday, 2:00 PM',
      subject: 'Chemistry',
      attendees: 34,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Upcoming Webinars</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingWebinars.map((webinar) => (
          <div key={webinar.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Upcoming
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{webinar.title}</h3>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
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
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
