'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Link2, 
  BarChart3,
  UserPlus,
  GraduationCap,
  Trophy,
  Gift,
  Settings,
  Download,
  Plus,
  Copy,
  CheckCircle
} from 'lucide-react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { InstitutionAnalytics } from './institution-analytics';
import { CohortManagement } from './cohort-management';
import { ReferralLinks } from './referral-links';
import { InstitutionLeaderboards } from './institution-leaderboards';
import { RewardsManagement } from './rewards-management';

export function InstitutionDashboard() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCohorts: 0,
    completionRate: 0,
    averageProgress: 0,
    monthlyEnrollments: 0,
    topPerformers: 0
  });

  useEffect(() => {
    // Check if user is institution admin
    if (!user || !userProfile) {
      router.push('/login');
      return;
    }

    if (userProfile.role !== 'institution' && userProfile.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    // Fetch institution stats
    fetchInstitutionStats();
  }, [user, userProfile, router]);

  const fetchInstitutionStats = async () => {
    // In production, fetch from Firestore
    // Mock data for now
    setStats({
      totalStudents: 247,
      activeCohorts: 8,
      completionRate: 78,
      averageProgress: 65,
      monthlyEnrollments: 34,
      topPerformers: 15
    });
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'cohorts', name: 'Cohorts', icon: Users },
    { id: 'referrals', name: 'Referral Links', icon: Link2 },
    { id: 'leaderboards', name: 'Leaderboards', icon: Trophy },
    { id: 'rewards', name: 'Rewards', icon: Gift },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp }
  ];

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      change: '+12%',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Active Cohorts',
      value: stats.activeCohorts.toString(),
      change: '+2',
      icon: GraduationCap,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      change: '+5%',
      icon: CheckCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Avg. Progress',
      value: `${stats.averageProgress}%`,
      change: '+8%',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Monthly Enrollments',
      value: stats.monthlyEnrollments.toString(),
      change: '+18%',
      icon: UserPlus,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: 'Top Performers',
      value: stats.topPerformers.toString(),
      change: '+3',
      icon: Award,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statCards.map((stat) => (
                <div
                  key={stat.title}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-sm text-green-500 font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-sm text-gray-400 mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('cohorts')}
                  className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Plus className="w-5 h-5 text-primary" />
                  <span className="text-white font-medium">Create Cohort</span>
                </button>
                <button
                  onClick={() => setActiveTab('referrals')}
                  className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Link2 className="w-5 h-5 text-green-500" />
                  <span className="text-white font-medium">Generate Link</span>
                </button>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Gift className="w-5 h-5 text-yellow-500" />
                  <span className="text-white font-medium">Award Points</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Download className="w-5 h-5 text-blue-500" />
                  <span className="text-white font-medium">Export Report</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'New student enrolled', cohort: 'Year 12 - Computing', time: '2 hours ago' },
                  { action: 'Cohort created', cohort: 'Year 13 - Business', time: '5 hours ago' },
                  { action: 'Points awarded', cohort: 'Year 11 - Science', time: '1 day ago' },
                  { action: 'Report generated', cohort: 'All Cohorts', time: '2 days ago' }
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                  >
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.cohort}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cohorts':
        return <CohortManagement />;

      case 'referrals':
        return <ReferralLinks />;

      case 'leaderboards':
        return <InstitutionLeaderboards />;

      case 'rewards':
        return <RewardsManagement />;

      case 'analytics':
        return <InstitutionAnalytics />;

      default:
        return null;
    }
  };

  if (!user || !userProfile) {
    return null;
  }

  if (userProfile.role !== 'institution' && userProfile.role !== 'admin') {
    return null;
  }

  return (
    <NetflixDashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-orange-500/20 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Institution Portal
                </h1>
                <p className="text-gray-400">
                  {userProfile.institutionId || 'Your Institution'} Dashboard
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-white">Settings</span>
              </button>
            </div>
          </div>
        </div>

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

