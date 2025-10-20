'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getYearGroupInfo } from '@/types/year-groups';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings, 
  Shield, 
  CreditCard, 
  Bell, 
  Eye,
  Edit3,
  Camera,
  Star,
  Trophy,
  BookOpen,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { EditableProfile } from './editable-profile';
import { SubscriptionManager } from './subscription-manager';
import { ProfilePictureUpload } from './profile-picture-upload';

export function NetflixUserProfile() {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [showProfilePictureUpload, setShowProfilePictureUpload] = useState(false);

  if (!user || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading profile...</p>
        </div>
      </div>
    );
  }

  const yearGroupInfo = getYearGroupInfo(userProfile.yearGroup);

  const stats = [
    {
      label: 'Courses Completed',
      value: '12',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Hours Learned',
      value: '147',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Current Streak',
      value: '23 days',
      icon: Zap,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      label: 'Average Score',
      value: '94%',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  const achievements = [
    { name: 'First Course Complete', icon: '🎓', date: 'Oct 2023', unlocked: true },
    { name: '30-Day Streak', icon: '🔥', date: 'Nov 2023', unlocked: true },
    { name: 'Perfect Score Master', icon: '⭐', date: 'Dec 2023', unlocked: true },
    { name: 'Subject Expert', icon: '🧠', date: 'Jan 2024', unlocked: true },
    { name: 'Community Helper', icon: '🤝', date: 'Locked', unlocked: false },
    { name: 'Speed Learner', icon: '⚡', date: 'Locked', unlocked: false },
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Calculus Chapter 5', time: '2 hours ago', type: 'course' },
    { action: 'Joined', item: 'Physics Live Session', time: '1 day ago', type: 'webinar' },
    { action: 'Achieved', item: 'Perfect Score Badge', time: '3 days ago', type: 'achievement' },
    { action: 'Started', item: 'Organic Chemistry Course', time: '1 week ago', type: 'course' },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'stats', label: 'Statistics', icon: Target },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Show editable form when editing
  if (isEditing) {
    return <EditableProfile onCancel={() => setIsEditing(false)} />;
  }

  return (
    <>
      {showSubscriptionManager && (
        <SubscriptionManager onClose={() => setShowSubscriptionManager(false)} />
      )}

      {showProfilePictureUpload && (
        <ProfilePictureUpload onClose={() => setShowProfilePictureUpload(false)} />
      )}
      
      <div className="space-y-8">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card via-card/95 to-card/80 border border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground overflow-hidden">
                {userProfile.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt={userProfile.displayName || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {userProfile.displayName ? userProfile.displayName.split(' ').map(n => n[0]).join('') : userProfile.firstName[0] + userProfile.lastName[0]}
                  </span>
                )}
              </div>
              <button 
                onClick={() => setShowProfilePictureUpload(true)}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {userProfile.displayName || `${userProfile.firstName} ${userProfile.lastName}`}
                  </h1>
                  <p className="text-lg text-primary font-semibold">
                    {yearGroupInfo ? `${yearGroupInfo.emoji} ${yearGroupInfo.name}` : 'Student'}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {userProfile.email}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'Recently'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {userProfile.subjects && userProfile.subjects.length > 0 ? (
                  userProfile.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                    >
                      {subject}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-foreground/50 italic">No subjects added yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-6 netflix-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-6 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap relative ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium text-foreground">
                        {userProfile.displayName || `${userProfile.firstName} ${userProfile.lastName}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{userProfile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium text-foreground">
                        {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-GB', { 
                          day: 'numeric',
                          month: 'long', 
                          year: 'numeric' 
                        }) : 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Academic Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Year Group</p>
                    <p className="font-medium text-foreground">
                      {yearGroupInfo ? `${yearGroupInfo.emoji} ${yearGroupInfo.displayName}` : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Subjects</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {userProfile.subjects && userProfile.subjects.length > 0 ? (
                        userProfile.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-2 py-1 bg-primary/20 text-primary rounded text-sm"
                          >
                            {subject}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-foreground/50 italic">No subjects added</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Subscription</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground capitalize">{userProfile.subscription.plan} Plan</p>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.subscription.plan === 'free' ? 'Limited access' : 'Full access to all features'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userProfile.subscription.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {userProfile.subscription.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {userProfile.subscription.plan === 'free' ? (
                    <button 
                      onClick={() => setShowSubscriptionManager(true)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Upgrade to Premium
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowSubscriptionManager(true)}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      {userProfile.subscription.status === 'inactive' ? 'Renew Subscription' : 'Manage Subscription'}
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-accent/50 hover:bg-accent rounded-lg transition-colors">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">Privacy Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-accent/50 hover:bg-accent rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">Notification Preferences</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-accent/50 hover:bg-accent rounded-lg transition-colors">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">Billing Information</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.name}
                  className={`p-6 rounded-xl border text-center netflix-card ${
                    achievement.unlocked
                      ? 'bg-card border-border'
                      : 'bg-muted/50 border-border opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h4 className="font-semibold text-foreground mb-2">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  {achievement.unlocked && (
                    <div className="mt-3 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium inline-block">
                      Unlocked
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'course' ? 'bg-blue-500/20' :
                    activity.type === 'webinar' ? 'bg-red-500/20' :
                    'bg-yellow-500/20'
                  }`}>
                    {activity.type === 'course' && <BookOpen className="w-5 h-5 text-blue-400" />}
                    {activity.type === 'webinar' && <Eye className="w-5 h-5 text-red-400" />}
                    {activity.type === 'achievement' && <Star className="w-5 h-5 text-yellow-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {activity.action} {activity.item}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
