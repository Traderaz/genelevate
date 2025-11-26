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
  Eye,
  AlertCircle,
  Loader2,
  Search,
  Shield
} from 'lucide-react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { StudentProgressView } from './student-progress-view';
import { StudentScheduleView } from './student-schedule-view';
import { 
  getLinkedStudentData, 
  getStudentProgress,
  getAllStudentsForAdmin,
  type StudentData,
  type StudentProgress 
} from '@/lib/services/parent-dashboard';

export function ParentDashboard() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [studentProgress, setStudentProgress] = useState<StudentProgress | null>(null);
  const [allStudents, setAllStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('progress');
  const [searchTerm, setSearchTerm] = useState('');
  const [showStudentSelector, setShowStudentSelector] = useState(false);

  const isAdmin = userProfile?.role === 'admin';
  const isParent = userProfile?.role === 'parent';

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    // Check if user is logged in
    if (!user) {
      router.push('/login');
      return;
    }

    // Check if user profile is loaded and has correct role
    if (!userProfile) {
      // Profile is still loading, wait a bit more
      return;
    }

    if (!isParent && !isAdmin) {
      router.push('/dashboard');
      return;
    }

    // Fetch student data
    fetchStudentData();
  }, [user, userProfile, authLoading, router, isParent, isAdmin]);

  const fetchStudentData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      if (isAdmin) {
        // Admins can see all students
        const studentsData = await getAllStudentsForAdmin();
        setAllStudents(studentsData);
        
        // Auto-select first student if available
        if (studentsData.length > 0 && !student) {
          await selectStudent(studentsData[0]);
        }
      } else if (isParent) {
        // Parents see their linked child
        const studentData = await getLinkedStudentData(user.uid);
        
        if (!studentData) {
          setError('No student account is linked to your parent account.');
          setLoading(false);
          return;
        }

        setStudent(studentData);
        // Get student progress
        const progressData = await getStudentProgress(studentData.id);
        setStudentProgress(progressData);
      }
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to load student data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectStudent = async (selectedStudent: StudentData) => {
    setStudent(selectedStudent);
    setShowStudentSelector(false);
    
    try {
      const progressData = await getStudentProgress(selectedStudent.id);
      setStudentProgress(progressData);
    } catch (err) {
      console.error('Error fetching student progress:', err);
    }
  };

  const filteredStudents = allStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'progress', name: 'Progress', icon: TrendingUp },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'achievements', name: 'Achievements', icon: Trophy }
  ];

  const renderContent = () => {
    if (!student) {
      if (isAdmin && allStudents.length > 0) {
        return (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4" />
            <p className="text-teal-card-text-muted mb-2">Select a student to view their progress</p>
            <p className="text-sm text-teal-card-text-muted mb-4">
              As an admin, you can view any student's dashboard from the parent perspective.
            </p>
            <button 
              onClick={() => setShowStudentSelector(true)}
              className="teal-button-primary"
            >
              Select Student
            </button>
          </div>
        );
      }
      
      return (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4" />
          <p className="text-teal-card-text-muted mb-2">
            {isAdmin ? 'No students found' : 'No student linked to your account'}
          </p>
          <p className="text-sm text-teal-card-text-muted mb-4">
            {isAdmin 
              ? 'No student accounts are available to view.' 
              : 'Contact support to link your parent account to your child\'s account.'
            }
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'progress':
        return <StudentProgressView student={student} />;
      case 'schedule':
        return <StudentScheduleView student={student} />;
      case 'achievements':
        return (
          <div className="space-y-6">
            {/* Achievements content - will be populated with real data */}
            <div className="teal-card rounded-lg p-6 border border-teal-primary/20">
              <h3 className="text-xl font-bold text-teal-card-text mb-4">Achievements</h3>
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-teal-card-text-muted mx-auto mb-4" />
                <p className="text-teal-card-text-muted">Achievement tracking coming soon</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  // Show loading while user/profile is loading
  if (!user || !userProfile) {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading user profile...</p>
          </div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  if (userProfile.role !== 'parent' && userProfile.role !== 'admin') {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">This page is only accessible to parent accounts and admins.</p>
          </div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  return (
    <NetflixDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="teal-card rounded-2xl p-6 border-2 border-teal-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                {isAdmin && <Shield className="w-8 h-8 text-teal-primary" />}
                <span className="text-teal-card-text">
                  {isAdmin ? 'Admin Parent Portal' : 'Parent Portal'}
                </span>
              </h1>
              <p className="text-teal-card-text-muted">
                {isAdmin 
                  ? 'Admin view of parent dashboard - can view any student account'
                  : 'View-only access to your child\'s learning progress'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <div className="flex items-center gap-2 px-4 py-2 bg-teal-primary/10 border border-teal-primary/30 rounded-lg">
                  <Shield className="w-5 h-5 text-teal-primary" />
                  <span className="text-teal-primary font-medium">Admin Access</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-primary/10 border border-teal-primary/30 rounded-lg">
                <Eye className="w-5 h-5 text-teal-primary" />
                <span className="text-teal-primary font-medium">Read-Only</span>
              </div>
            </div>
          </div>

          {/* Student Info */}
          {loading ? (
            <div className="flex items-center gap-3 p-4 teal-card-glass rounded-lg">
              <Loader2 className="w-6 h-6 text-teal-primary animate-spin" />
              <span className="text-teal-card-text-muted">Loading student information...</span>
            </div>
          ) : error ? (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <span className="text-red-500">{error}</span>
            </div>
          ) : student ? (
            <div className="flex items-center justify-between p-4 teal-card-glass rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-blue-medium to-teal-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-teal-card-text text-lg">{student.name}</p>
                  <p className="text-sm text-teal-card-text-muted">
                    {student.email} • {student.yearGroup && `${student.yearGroup} • `}
                    {student.subscription.status === 'active' ? (
                      <span className="text-green-600">Active Subscription</span>
                    ) : (
                      <span className="text-red-500">Subscription Inactive</span>
                    )}
                  </p>
                </div>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setShowStudentSelector(true)}
                  className="teal-button-secondary flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Switch Student
                </button>
              )}
            </div>
          ) : null}
        </div>

        {/* Quick Stats */}
        {student && studentProgress && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="teal-card p-4 rounded-lg border border-teal-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-teal-card-text-muted">Total Points</span>
              </div>
              <p className="text-2xl font-bold text-teal-card-text">{studentProgress.totalPoints.toLocaleString()}</p>
            </div>
            <div className="teal-card p-4 rounded-lg border border-teal-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-teal-card-text-muted">Courses Done</span>
              </div>
              <p className="text-2xl font-bold text-teal-card-text">{studentProgress.coursesCompleted}</p>
            </div>
            <div className="teal-card p-4 rounded-lg border border-teal-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-teal-card-text-muted">Current Streak</span>
              </div>
              <p className="text-2xl font-bold text-teal-card-text">{studentProgress.currentStreak} days</p>
            </div>
            <div className="teal-card p-4 rounded-lg border border-teal-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-teal-card-text-muted">Avg Score</span>
              </div>
              <p className="text-2xl font-bold text-teal-card-text">{studentProgress.avgQuizScore}%</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="teal-card rounded-lg border border-teal-primary/20">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 rounded-md transition-all whitespace-nowrap flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-teal-primary text-white shadow-lg'
                    : 'text-teal-card-text-muted hover:text-teal-card-text hover:bg-teal-primary/10'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {renderContent()}
        </div>

        {/* Admin Student Selector Modal */}
        {isAdmin && showStudentSelector && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="teal-card rounded-2xl border-2 border-teal-primary/20 w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-teal-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-teal-card-text">Select Student to View</h3>
                  <button
                    onClick={() => setShowStudentSelector(false)}
                    className="text-teal-card-text-muted hover:text-teal-card-text transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="relative">
                  <Search className="w-5 h-5 text-teal-card-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 teal-card-glass border border-teal-primary/30 rounded-lg text-teal-card-text placeholder-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {filteredStudents.length === 0 ? (
                  <div className="p-8 text-center">
                    <User className="w-12 h-12 text-teal-card-text-muted mx-auto mb-4" />
                    <p className="text-teal-card-text-muted">
                      {searchTerm ? 'No students found matching your search' : 'No students available'}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-2">
                    {filteredStudents.map((studentOption) => (
                      <button
                        key={studentOption.id}
                        onClick={() => selectStudent(studentOption)}
                        className="w-full p-4 teal-card-glass hover:bg-teal-primary/10 rounded-lg border border-teal-primary/20 hover:border-teal-primary/50 transition-all text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-blue-medium to-teal-primary flex items-center justify-center text-white font-bold shadow-lg">
                            {studentOption.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-teal-card-text">{studentOption.name}</p>
                            <p className="text-sm text-teal-card-text-muted">
                              {studentOption.email}
                              {studentOption.yearGroup && ` • ${studentOption.yearGroup}`}
                              <span className={`ml-2 ${
                                studentOption.subscription.status === 'active' 
                                  ? 'text-green-600' 
                                  : 'text-red-500'
                              }`}>
                                • {studentOption.subscription.status === 'active' ? 'Active' : 'Inactive'}
                              </span>
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </NetflixDashboardLayout>
  );
}

