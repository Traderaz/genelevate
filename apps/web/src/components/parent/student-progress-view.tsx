'use client';

import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, TrendingUp, BarChart3, Loader2 } from 'lucide-react';
import { 
  getStudentCourseProgress, 
  type StudentData,
  type CourseProgress 
} from '@/lib/services/parent-dashboard';

interface StudentProgressViewProps {
  student: StudentData;
}

export function StudentProgressView({ student }: StudentProgressViewProps) {
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseProgress();
  }, [student.id]);

  const fetchCourseProgress = async () => {
    setLoading(true);
    try {
      const courseData = await getStudentCourseProgress(student.id);
      setCourses(courseData);
    } catch (error) {
      console.error('Error fetching course progress:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate overall stats from real data
  const overallStats = {
    avgProgress: courses.length > 0 ? Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length) : 0,
    avgQuizScore: courses.filter(c => c.quizScore).length > 0 
      ? Math.round(courses.filter(c => c.quizScore).reduce((sum, course) => sum + (course.quizScore || 0), 0) / courses.filter(c => c.quizScore).length)
      : 0,
    totalTimeSpent: courses.reduce((sum, course) => sum + course.timeSpent, 0),
    coursesInProgress: courses.filter(c => c.status === 'in-progress').length,
    coursesCompleted: courses.filter(c => c.status === 'completed').length,
    upcomingDeadlines: 0 // Will be calculated from real deadline data
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return '1 week ago';
    return `${diffInWeeks} weeks ago`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="teal-card rounded-lg p-6 border border-teal-primary/20">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-teal-primary animate-spin mr-3" />
            <span className="text-teal-card-text-muted">Loading progress data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress Summary */}
      <div className="teal-card rounded-lg p-6 border border-teal-primary/20">
        <h3 className="text-xl font-bold text-teal-card-text mb-6">Overall Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-teal-card-text-muted">Average Progress</span>
              <span className="text-lg font-bold text-teal-card-text">{overallStats.avgProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-teal-blue-medium to-teal-primary h-3 rounded-full"
                style={{ width: `${overallStats.avgProgress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-teal-card-text-muted">Average Quiz Score</span>
              <span className="text-lg font-bold text-teal-card-text">
                {overallStats.avgQuizScore > 0 ? `${overallStats.avgQuizScore}%` : 'N/A'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                style={{ width: `${overallStats.avgQuizScore}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-teal-card-text-muted">Total Time Spent</span>
              <span className="text-lg font-bold text-teal-card-text">{overallStats.totalTimeSpent}h</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>Learning actively</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="teal-card rounded-lg p-6 border border-teal-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-teal-card-text-muted">In Progress</p>
              <p className="text-2xl font-bold text-teal-card-text">{overallStats.coursesInProgress}</p>
            </div>
          </div>
        </div>

        <div className="teal-card rounded-lg p-6 border border-teal-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-teal-card-text-muted">Completed</p>
              <p className="text-2xl font-bold text-teal-card-text">{overallStats.coursesCompleted}</p>
            </div>
          </div>
        </div>

        <div className="teal-card rounded-lg p-6 border border-teal-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-teal-card-text-muted">Total Courses</p>
              <p className="text-2xl font-bold text-teal-card-text">{courses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="teal-card rounded-lg p-6 border border-teal-primary/20">
        <h3 className="text-xl font-bold text-teal-card-text mb-4">Current Courses</h3>
        {courses.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-teal-card-text-muted mx-auto mb-4" />
            <p className="text-teal-card-text-muted">No course progress data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.slice(0, 10).map((course) => (
              <div
                key={course.id}
                className="p-5 teal-card-glass rounded-lg border border-teal-primary/20 hover:border-teal-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold text-teal-card-text">{course.title}</h4>
                      {course.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-teal-card-text-muted">{course.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'completed'
                      ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                      : course.status === 'in-progress'
                      ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                      : 'bg-gray-500/10 text-gray-600 border border-gray-500/20'
                  }`}>
                    {course.status === 'completed' ? 'Completed' : 
                     course.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-teal-card-text-muted">Progress</span>
                    <span className="text-sm font-semibold text-teal-card-text">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-blue-medium to-teal-primary h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-teal-primary/20">
                  <div>
                    <p className="text-xs text-teal-card-text-muted mb-1">Last Accessed</p>
                    <p className="text-sm font-medium text-teal-card-text">{formatTimeAgo(course.lastAccessed)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-teal-card-text-muted mb-1">Quiz Score</p>
                    <p className="text-sm font-medium text-teal-card-text">
                      {course.quizScore ? `${course.quizScore}%` : 'No quizzes'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-teal-card-text-muted mb-1">Time Spent</p>
                    <p className="text-sm font-medium text-teal-card-text">{course.timeSpent}h</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Learning Insights */}
      <div className="teal-card rounded-lg p-6 border border-teal-primary/20">
        <h3 className="text-xl font-bold text-teal-card-text mb-4">Learning Insights</h3>
        <div className="space-y-4">
          {overallStats.avgQuizScore >= 90 && (
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Strong Performance</p>
                <p className="text-sm text-teal-card-text-muted">
                  {student.name} is consistently scoring above 90% on quizzes
                </p>
              </div>
            </div>
          )}
          
          {overallStats.coursesInProgress > 0 && (
            <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Active Learner</p>
                <p className="text-sm text-teal-card-text-muted">
                  Currently working on {overallStats.coursesInProgress} course{overallStats.coursesInProgress !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}

          {courses.length > 0 && courses.some(c => (new Date().getTime() - c.lastAccessed.getTime()) > (3 * 24 * 60 * 60 * 1000)) && (
            <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">Check In Needed</p>
                <p className="text-sm text-teal-card-text-muted">
                  Some courses haven't been accessed recently - encourage regular study sessions
                </p>
              </div>
            </div>
          )}

          {courses.length === 0 && (
            <div className="flex items-start gap-3 p-4 bg-gray-500/10 border border-gray-500/30 rounded-lg">
              <BookOpen className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Getting Started</p>
                <p className="text-sm text-teal-card-text-muted">
                  No course activity yet - encourage {student.name} to start their first course
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

