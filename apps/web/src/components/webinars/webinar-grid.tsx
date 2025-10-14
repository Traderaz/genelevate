interface WebinarGridProps {
  searchParams: {
    search?: string;
    subject?: string;
    yearGroup?: string;
    type?: string;
    status?: string;
    page?: string;
  };
}

export function WebinarGrid({ searchParams }: WebinarGridProps) {
  const webinars = [
    {
      id: '1',
      title: 'GCSE Mathematics Review Session',
      description: 'Comprehensive review of key GCSE mathematics topics',
      subject: 'Mathematics',
      scheduledAt: 'Tomorrow, 4:00 PM',
      duration: '60 minutes',
      attendees: 45,
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'University Application Workshop',
      description: 'Everything you need to know about university applications',
      subject: 'Careers',
      scheduledAt: 'Friday, 3:30 PM',
      duration: '90 minutes',
      attendees: 78,
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'A-Level Physics Problem Solving',
      description: 'Advanced problem-solving techniques for A-Level physics',
      subject: 'Physics',
      scheduledAt: 'Last week',
      duration: '75 minutes',
      attendees: 62,
      status: 'ended',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {webinars.map((webinar) => (
        <div key={webinar.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                webinar.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                webinar.status === 'live' ? 'bg-red-100 text-red-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {webinar.status === 'upcoming' ? 'Upcoming' : 
                 webinar.status === 'live' ? 'Live Now' : 'Recorded'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{webinar.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{webinar.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{webinar.subject}</span>
              <span>{webinar.duration}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{webinar.scheduledAt}</span>
              <span>{webinar.attendees} attendees</span>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              {webinar.status === 'upcoming' ? 'Register' : 
               webinar.status === 'live' ? 'Join Now' : 'Watch Recording'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
