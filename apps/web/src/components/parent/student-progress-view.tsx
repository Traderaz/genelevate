'use client';

import { BookOpen, CheckCircle, Clock, TrendingUp, BarChart3 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
}

interface StudentProgressViewProps {
  student: Student;
}

export function StudentProgressView({ student }: StudentProgressViewProps) {
  const courses = [
    {
      id: '1',
      title: 'Introduction to Python',
      category: 'Programming',
      progress: 85,
      status: 'in-progress',
      lastAccessed: '2 hours ago',
      quizScore: 92,
      timeSpent: '4.5 hours'
    },
    {
      id: '2',
      title: 'Business Fundamentals',
      category: 'Business',
      progress: 100,
      status: 'completed',
      lastAccessed: '1 day ago',
      quizScore: 95,
      timeSpent: '6 hours'
    },
    {
      id: '3',
      title: 'Data Science Basics',
      category: 'Data Science',
      progress: 45,
      status: 'in-progress',
      lastAccessed: '3 days ago',
      quizScore: 88,
      timeSpent: '2 hours'
    }
  ];

  const overallStats = {
    avgProgress: 77,
    avgQuizScore: 92,
    totalTimeSpent: 42.5,
    coursesInProgress: 2,
    coursesCompleted: 8,
    upcomingDeadlines: 3
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Summary */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Overall Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Average Progress</span>
              <span className="text-lg font-bold text-white">{overallStats.avgProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-orange-500 h-3 rounded-full"
                style={{ width: `${overallStats.avgProgress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Average Quiz Score</span>
              <span className="text-lg font-bold text-white">{overallStats.avgQuizScore}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                style={{ width: `${overallStats.avgQuizScore}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Total Time Spent</span>
              <span className="text-lg font-bold text-white">{overallStats.totalTimeSpent}h</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-500">
              <TrendingUp className="w-4 h-4" />
              <span>+15% vs last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-white">{overallStats.coursesInProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-white">{overallStats.coursesCompleted}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Upcoming Deadlines</p>
              <p className="text-2xl font-bold text-white">{overallStats.upcomingDeadlines}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Current Courses</h3>
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-5 bg-gray-700/30 rounded-lg border border-gray-700 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                    {course.status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{course.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.status === 'completed'
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {course.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-semibold text-white">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Accessed</p>
                  <p className="text-sm font-medium text-white">{course.lastAccessed}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Quiz Score</p>
                  <p className="text-sm font-medium text-white">{course.quizScore}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Time Spent</p>
                  <p className="text-sm font-medium text-white">{course.timeSpent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Insights */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Learning Insights</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-500 mb-1">Strong Performance</p>
              <p className="text-sm text-gray-400">
                {student.name} is consistently scoring above 90% on quizzes
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-500 mb-1">Consistent Learner</p>
              <p className="text-sm text-gray-400">
                Maintains a 12-day learning streak with regular daily study sessions
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-500 mb-1">Attention Needed</p>
              <p className="text-sm text-gray-400">
                Data Science Basics hasn't been accessed in 3 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

