interface CourseGridProps {
  searchParams: {
    search?: string;
    subject?: string;
    yearGroup?: string;
    difficulty?: string;
    page?: string;
  };
}

export function CourseGrid({ searchParams }: CourseGridProps) {
  // Placeholder courses
  const courses = [
    {
      id: '1',
      title: 'GCSE Mathematics Mastery',
      description: 'Complete GCSE mathematics preparation course',
      subject: 'Mathematics',
      difficulty: 'Intermediate',
      duration: '12 weeks',
      enrolled: 245,
    },
    {
      id: '2',
      title: 'A-Level Physics Excellence',
      description: 'Advanced physics concepts and problem solving',
      subject: 'Physics',
      difficulty: 'Advanced',
      duration: '16 weeks',
      enrolled: 156,
    },
    {
      id: '3',
      title: 'English Literature Analysis',
      description: 'Master literary analysis and essay writing',
      subject: 'English',
      difficulty: 'Intermediate',
      duration: '10 weeks',
      enrolled: 189,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{course.subject}</span>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{course.enrolled} enrolled</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Enroll
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
