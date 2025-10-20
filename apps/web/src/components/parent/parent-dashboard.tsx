'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { 
  User, 
  BookOpen, 
  Video, 
  Trophy, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  Target,
  Award,
  Eye
} from 'lucide-react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { StudentProgressView } from './student-progress-view';
import { StudentScheduleView } from './student-schedule-view';

interface LinkedStudent {
  id: string;
  name: string;
  email: string;
  yearGroup: string;
  institution: string;
  totalPoints: number;
  coursesCompleted: number;
  currentStreak: number;
}

export function ParentDashboard() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [linkedStudents, setLinkedStudents] = useState<LinkedStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<LinkedStudent | null>(null);
  const [activeTab, setActiveTab] = useState('progress');

  useEffect(() => {
    // Check if user is a parent
    if (!user || !userProfile) {
      router.push('/login');
      return;
    }

    if (userProfile.role !== 'parent' && userProfile.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    // Fetch linked students
    fetchLinkedStudents();
  }, [user, userProfile, router]);

  const fetchLinkedStudents = async () => {
    // In production, fetch from Firestore
    // Mock data for now
    const students: LinkedStudent[] = [
      {
        id: '1',
        name: 'Emma Johnson',
        email: 'emma.j@student.example.com',
        yearGroup: 'Year 12',
        institution: 'Springfield Academy',
        totalPoints: 1850,
        coursesCompleted: 8,
        currentStreak: 12
      },
      {
        id: '2',
        name: 'Oliver Johnson',
        email: 'oliver.j@student.example.com',
        yearGroup: 'Year 10',
        institution: 'Springfield Academy',
        totalPoints: 1240,
        coursesCompleted: 5,
        currentStreak: 7
      }
    ];
    setLinkedStudents(students);
    if (students.length > 0) {
      setSelectedStudent(students[0]);
    }
  };

  const tabs = [
    { id: 'progress', name: 'Progress', icon: TrendingUp },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'achievements', name: 'Achievements', icon: Trophy }
  ];

  const renderContent = () => {
    if (!selectedStudent) {
      return (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No students linked to your account</p>
          <button className="mt-4 px-6 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white transition-all">
            Link Student Account
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'progress':
        return <StudentProgressView student={selectedStudent} />;
      case 'schedule':
        return <StudentScheduleView student={selectedStudent} />;
      case 'achievements':
        return (
          <div className="space-y-6">
            {/* Achievements content */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Course Marathon', description: '25 courses completed', icon: '🏃', earned: true },
                  { title: 'Perfect Score', description: '100% on 5 quizzes', icon: '💯', earned: true },
                  { title: 'Streak Master', description: '7-day learning streak', icon: '🔥', earned: true },
                  { title: 'Knowledge Seeker', description: '10 courses completed', icon: '📚', earned: true },
                  { title: 'Social Butterfly', description: '20 webinars attended', icon: '🦋', earned: false },
                  { title: 'Legend', description: '10,000 points earned', icon: '👑', earned: false }
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-primary/20 to-orange-500/20 border-primary/50'
                        : 'bg-gray-700/30 border-gray-700'
                    }`}
                  >
                    <div className="text-4xl mb-2 opacity-${achievement.earned ? '100' : '30'}">
                      {achievement.icon}
                    </div>
                    <h4 className="font-semibold text-white mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    {achievement.earned && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        <span>Earned</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!user || !userProfile) {
    return null;
  }

  if (userProfile.role !== 'parent' && userProfile.role !== 'admin') {
    return null;
  }

  return (
    <NetflixDashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Parent Portal
                </h1>
                <p className="text-gray-400">
                  View-only access to your child's learning progress
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Eye className="w-5 h-5 text-blue-500" />
                <span className="text-blue-500 font-medium">Read-Only</span>
              </div>
            </div>

            {/* Student Selector */}
            {linkedStudents.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {linkedStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all whitespace-nowrap ${
                      selectedStudent?.id === student.id
                        ? 'bg-primary/20 border-primary'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">{student.name}</p>
                      <p className="text-sm text-gray-400">{student.yearGroup}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        {selectedStudent && (
          <div className="border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-400">Total Points</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedStudent.totalPoints}</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-400">Courses Done</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedStudent.coursesCompleted}</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-400">Current Streak</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedStudent.currentStreak} days</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-400">Rank</span>
                  </div>
                  <p className="text-2xl font-bold text-white">#15</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>
    </NetflixDashboardLayout>
  );
}

