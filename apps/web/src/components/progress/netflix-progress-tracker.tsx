'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown,
  Clock, 
  Target, 
  Trophy, 
  BookOpen, 
  Award,
  CheckCircle,
  Flame,
  ChevronRight,
  Download,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { getStudentGrades, calculateGradeStats } from '@/lib/services/grades';
import type { SubjectGrade } from '@/types/grades';
import { getGradeColor, getGradeBgColor } from '@/lib/services/grades';

export function NetflixProgressTracker() {
  const { user, userProfile } = useAuth();
  const [subjects, setSubjects] = useState<SubjectGrade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGrades();
    }
  }, [user]);

  const fetchGrades = async () => {
    try {
      setIsLoading(true);
      const gradesData = await getStudentGrades(user!.uid);
      setSubjects(gradesData?.subjects || []);
    } catch (error) {
      console.error('Error fetching grades:', error);
      setSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = subjects.length > 0 ? calculateGradeStats(subjects) : null;

  // Calculate real stats
  const coursesCompleted = (userProfile as any)?.coursesCompleted || 0;
  const currentStreak = (userProfile as any)?.streakDays || 0;
  const totalPoints = (userProfile as any)?.totalPoints || 0;

  // Group subjects by status
  const onTargetSubjects = subjects.filter(s => {
    if (!s.currentGrade || !s.targetGrade) return false;
    const current = stats?.onTargetCount || 0;
    return current > 0;
  });

  const needsImprovementSubjects = subjects.filter(s => {
    if (!s.currentGrade || !s.targetGrade) return false;
    const below = stats?.belowTargetCount || 0;
    return below > 0;
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-48 teal-card animate-pulse rounded-xl" />
        <div className="h-48 teal-card animate-pulse rounded-xl" />
        <div className="h-48 teal-card animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Progress Tracker</h1>
          <p className="text-sm sm:text-base text-white/80">
            Monitor your learning journey and academic achievements
          </p>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            {coursesCompleted > 0 && <TrendingUp className="w-4 h-4 text-green-500" />}
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-teal-card-text">{coursesCompleted}</p>
            <p className="text-sm text-teal-card-text-muted">Courses Completed</p>
          </div>
        </div>

        <div className="teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            {currentStreak > 0 && <Award className="w-4 h-4 text-orange-500" />}
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-teal-card-text">{currentStreak} days</p>
            <p className="text-sm text-teal-card-text-muted">Current Streak</p>
            {currentStreak > 7 && <p className="text-xs text-orange-500 font-medium">Keep it up!</p>}
          </div>
        </div>

        <div className="teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-teal-card-text">{subjects.length}</p>
            <p className="text-sm text-teal-card-text-muted">Subjects Tracking</p>
            {subjects.length > 0 && (
              <Link href="/dashboard/grades" className="text-xs text-teal-primary font-medium hover:underline flex items-center gap-1">
                View grades <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>

        <div className="teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-teal-card-text">{totalPoints}</p>
            <p className="text-sm text-teal-card-text-muted">Total Points</p>
          </div>
        </div>
      </div>

      {/* Academic Performance Overview */}
      {stats && subjects.length > 0 && (
        <div className="teal-card-glass border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Academic Performance</h3>
            <Link 
              href="/dashboard/grades" 
              className="text-teal-gold hover:text-teal-light font-medium flex items-center gap-1"
            >
              Manage Grades
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.onTargetCount}</p>
                  <p className="text-sm text-white/70">On Target</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.aboveTargetCount}</p>
                  <p className="text-sm text-white/70">Above Target</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.belowTargetCount}</p>
                  <p className="text-sm text-white/70">Needs Focus</p>
                </div>
              </div>
            </div>
          </div>

          {stats.averageGrade > 0 && (
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Overall Grade Average</span>
                <span className="text-2xl font-bold text-white">{stats.averageGrade.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-teal-primary to-teal-gold h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.averageGrade / 10) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subject Grades Detail */}
      {subjects.length > 0 ? (
        <div className="teal-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-teal-card-text">Your Subjects</h3>
            <Link 
              href="/dashboard/grades" 
              className="text-teal-primary hover:text-teal-blue-medium font-medium flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.slice(0, 4).map((subject, index) => {
              const isOnTarget = subject.currentGrade && subject.targetGrade && 
                (subject.currentGrade >= subject.targetGrade);
              const isAboveTarget = subject.currentGrade && subject.targetGrade && 
                (subject.currentGrade > subject.targetGrade);
              
              return (
                <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        isAboveTarget ? 'bg-blue-500' :
                        isOnTarget ? 'bg-green-500' : 
                        'bg-orange-500'
                      }`}></div>
                      <div>
                        <p className="font-semibold text-teal-card-text">{subject.subject}</p>
                        <p className="text-xs text-teal-card-text-muted">{subject.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {subject.currentGrade && (
                        <span className={`text-lg font-bold ${getGradeColor(subject.currentGrade)}`}>
                          {subject.currentGrade}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {subject.targetGrade && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-card-text-muted">Target</span>
                      <span className="font-medium text-teal-card-text">{subject.targetGrade}</span>
                    </div>
                  )}
                  
                  {isAboveTarget && (
                    <div className="flex items-center gap-2 text-sm text-blue-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>Exceeding target!</span>
                    </div>
                  )}
                  {isOnTarget && !isAboveTarget && (
                    <div className="flex items-center gap-2 text-sm text-green-500">
                      <CheckCircle className="w-4 h-4" />
                      <span>On track</span>
                    </div>
                  )}
                  {!isOnTarget && subject.targetGrade && (
                    <div className="flex items-center gap-2 text-sm text-orange-500">
                      <Target className="w-4 h-4" />
                      <span>Needs focus</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {subjects.length > 4 && (
            <div className="mt-6 text-center">
              <Link 
                href="/dashboard/grades" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-gold text-teal-card-text rounded-lg hover:bg-teal-gold-dark transition-colors font-bold shadow-md"
              >
                View All {subjects.length} Subjects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="teal-card rounded-xl p-8 text-center">
          <Award className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-teal-card-text mb-2">No Grades Yet</h3>
          <p className="text-teal-card-text-muted mb-6">
            Start tracking your academic progress by adding your subjects and grades
          </p>
          <Link 
            href="/dashboard/grades" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-gold text-teal-card-text rounded-lg hover:bg-teal-gold-dark transition-colors font-bold shadow-md"
          >
            Add Your Grades
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="teal-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-teal-card-text mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/courses" 
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-teal-card-text">Browse Courses</p>
              <p className="text-sm text-teal-card-text-muted">Explore new learning</p>
            </div>
          </Link>

          <Link 
            href="/dashboard/grades" 
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
          >
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <Award className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-teal-card-text">Update Grades</p>
              <p className="text-sm text-teal-card-text-muted">Track your progress</p>
            </div>
          </Link>

          <Link 
            href="/dashboard/schedule" 
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="font-semibold text-teal-card-text">View Schedule</p>
              <p className="text-sm text-teal-card-text-muted">Plan your learning</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
