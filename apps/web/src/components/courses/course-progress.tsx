'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Target, 
  Clock, 
  Calendar,
  TrendingUp,
  Award,
  Play,
  BookOpen,
  CheckCircle
} from 'lucide-react';

interface CourseProgressProps {
  courseSlug: string;
}

interface ProgressData {
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  totalPointsEarned: number;
  totalPointsAvailable: number;
  timeSpent: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  averageQuizScore: number;
  nextLesson?: {
    id: string;
    title: string;
    moduleTitle: string;
    estimatedTime: number;
  };
  recentAchievements: Achievement[];
  weeklyGoal: number;
  weeklyProgress: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  points: number;
}

export function CourseProgress({ courseSlug }: CourseProgressProps) {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch progress data from API
    setTimeout(() => {
      setProgress({
        overallProgress: 65,
        completedLessons: 15,
        totalLessons: 24,
        completedModules: 2,
        totalModules: 4,
        totalPointsEarned: 850,
        totalPointsAvailable: 1200,
        timeSpent: 480, // 8 hours
        currentStreak: 7,
        longestStreak: 12,
        averageQuizScore: 87,
        nextLesson: {
          id: '8',
          title: 'Practice Problems',
          moduleTitle: 'Limits and Continuity',
          estimatedTime: 45,
        },
        recentAchievements: [
          {
            id: '1',
            title: 'Quiz Master',
            description: 'Scored 90% or higher on 5 quizzes',
            icon: '🏆',
            earnedAt: '2024-01-15',
            points: 100,
          },
          {
            id: '2',
            title: 'Streak Champion',
            description: 'Maintained a 7-day learning streak',
            icon: '🔥',
            earnedAt: '2024-01-14',
            points: 75,
          },
        ],
        weeklyGoal: 10, // hours
        weeklyProgress: 6.5,
      });
      setLoading(false);
    }, 1000);
  }, [courseSlug]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-blue-600 bg-blue-100';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!progress) {
    return null; // User not enrolled
  }

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(progress.overallProgress)}`}>
            {progress.overallProgress}% Complete
          </span>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Course Progress</span>
          <span className="font-medium">{progress.overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.overallProgress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-lg font-bold text-gray-900">
            {progress.completedLessons}/{progress.totalLessons}
          </div>
          <div className="text-xs text-gray-600">Lessons</div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
            <Trophy className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-lg font-bold text-gray-900">
            {progress.totalPointsEarned}
          </div>
          <div className="text-xs text-gray-600">Points Earned</div>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-lg font-bold text-gray-900">
            {formatTime(progress.timeSpent)}
          </div>
          <div className="text-xs text-gray-600">Time Spent</div>
        </div>

        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-lg font-bold text-gray-900">
            {progress.averageQuizScore}%
          </div>
          <div className="text-xs text-gray-600">Avg Quiz Score</div>
        </div>
      </div>

      {/* Continue Learning */}
      {progress.nextLesson && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">Continue Learning</h3>
              <p className="text-sm text-gray-600 mb-2">
                {progress.nextLesson.moduleTitle}: {progress.nextLesson.title}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>{progress.nextLesson.estimatedTime} minutes</span>
              </div>
            </div>
            <Link
              href={`/courses/${courseSlug}/lesson/${progress.nextLesson.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Continue</span>
            </Link>
          </div>
        </div>
      )}

      {/* Weekly Goal */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-gray-900">Weekly Goal</h3>
          </div>
          <span className="text-sm text-gray-600">
            {progress.weeklyProgress}h / {progress.weeklyGoal}h
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((progress.weeklyProgress / progress.weeklyGoal) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Recent Achievements */}
      {progress.recentAchievements.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <span>Recent Achievements</span>
          </h3>
          <div className="space-y-2">
            {progress.recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-yellow-600">+{achievement.points} pts</div>
                  <div className="text-xs text-gray-500">
                    {new Date(achievement.earnedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Streak */}
      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🔥</div>
          <div>
            <h3 className="font-medium text-gray-900">Learning Streak</h3>
            <p className="text-sm text-gray-600">Keep it up!</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">{progress.currentStreak}</div>
          <div className="text-xs text-gray-500">days</div>
        </div>
      </div>
    </div>
  );
}
