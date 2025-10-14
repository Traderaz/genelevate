'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Trophy, 
  Calendar, 
  BookOpen, 
  Video, 
  Star,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Award,
  CheckCircle,
  PlayCircle,
  Users,
  Brain,
  Timer,
  Flame,
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';

export function NetflixProgressTracker() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data - replace with real data from your Firebase/API
  const overallStats = {
    totalHours: 147.5,
    coursesCompleted: 12,
    currentStreak: 23,
    averageScore: 94,
    weeklyGoal: 15,
    weeklyProgress: 12.5,
    monthlyGoal: 60,
    monthlyProgress: 48.5,
    totalPoints: 2847,
    rank: 15,
    totalStudents: 1250
  };

  const subjectProgress = [
    {
      subject: 'Mathematics',
      progress: 85,
      hoursSpent: 45.5,
      coursesCompleted: 4,
      averageScore: 96,
      lastActivity: '2 hours ago',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-500/20',
      textColor: 'text-blue-400'
    },
    {
      subject: 'Physics',
      progress: 72,
      hoursSpent: 38.2,
      coursesCompleted: 3,
      averageScore: 92,
      lastActivity: '1 day ago',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-500/20',
      textColor: 'text-purple-400'
    },
    {
      subject: 'Chemistry',
      progress: 68,
      hoursSpent: 32.8,
      coursesCompleted: 2,
      averageScore: 89,
      lastActivity: '3 days ago',
      color: 'bg-green-500',
      lightColor: 'bg-green-500/20',
      textColor: 'text-green-400'
    },
    {
      subject: 'Biology',
      progress: 45,
      hoursSpent: 21.0,
      coursesCompleted: 1,
      averageScore: 94,
      lastActivity: '1 week ago',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-500/20',
      textColor: 'text-orange-400'
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5, courses: 1, webinars: 0 },
    { day: 'Tue', hours: 3.2, courses: 2, webinars: 1 },
    { day: 'Wed', hours: 1.8, courses: 1, webinars: 0 },
    { day: 'Thu', hours: 4.1, courses: 2, webinars: 1 },
    { day: 'Fri', hours: 2.9, courses: 1, webinars: 0 },
    { day: 'Sat', hours: 0, courses: 0, webinars: 0 },
    { day: 'Sun', hours: 1.5, courses: 1, webinars: 1 }
  ];

  const recentAchievements = [
    {
      title: 'Perfect Score Master',
      description: 'Achieved 100% on 5 consecutive assessments',
      icon: '🎯',
      date: '2 days ago',
      points: 500,
      rarity: 'legendary'
    },
    {
      title: '30-Day Streak',
      description: 'Maintained learning streak for 30 days',
      icon: '🔥',
      date: '1 week ago',
      points: 300,
      rarity: 'epic'
    },
    {
      title: 'Speed Learner',
      description: 'Completed course in record time',
      icon: '⚡',
      date: '2 weeks ago',
      points: 200,
      rarity: 'rare'
    }
  ];

  const upcomingMilestones = [
    {
      title: '50 Hours Mathematics',
      progress: 91,
      target: 50,
      current: 45.5,
      reward: '250 points',
      estimatedCompletion: '3 days'
    },
    {
      title: '15 Courses Completed',
      progress: 80,
      target: 15,
      current: 12,
      reward: 'Achievement Badge',
      estimatedCompletion: '1 week'
    },
    {
      title: '95% Average Score',
      progress: 99,
      target: 95,
      current: 94,
      reward: 'Leaderboard Boost',
      estimatedCompletion: '1 assessment'
    }
  ];

  const learningInsights = [
    {
      title: 'Peak Learning Time',
      value: '2:00 PM - 4:00 PM',
      description: 'You perform best during afternoon sessions',
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      title: 'Strongest Subject',
      value: 'Mathematics',
      description: '96% average score with consistent progress',
      icon: Trophy,
      color: 'text-yellow-400'
    },
    {
      title: 'Learning Style',
      value: 'Visual + Practice',
      description: 'Video lessons + practice problems work best for you',
      icon: Brain,
      color: 'text-purple-400'
    },
    {
      title: 'Improvement Area',
      value: 'Biology',
      description: 'Consider dedicating more time to this subject',
      icon: Target,
      color: 'text-orange-400'
    }
  ];

  const timeframes = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  const subjects = [
    { id: 'all', label: 'All Subjects' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'biology', label: 'Biology' }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Tracker</h1>
          <p className="text-muted-foreground">
            Monitor your learning journey and academic achievements
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe.id} value={timeframe.id}>
                {timeframe.label}
              </option>
            ))}
          </select>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.label}
              </option>
            ))}
          </select>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg netflix-button">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 netflix-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{overallStats.totalHours}h</p>
            <p className="text-sm text-muted-foreground">Total Learning Time</p>
            <p className="text-xs text-green-500 font-medium">+12.5h this week</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 netflix-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{overallStats.coursesCompleted}</p>
            <p className="text-sm text-muted-foreground">Courses Completed</p>
            <p className="text-xs text-green-500 font-medium">+3 this month</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 netflix-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <Zap className="w-4 h-4 text-orange-500" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{overallStats.currentStreak} days</p>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-xs text-orange-500 font-medium">Personal best!</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 netflix-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{overallStats.averageScore}%</p>
            <p className="text-sm text-muted-foreground">Average Score</p>
            <p className="text-xs text-green-500 font-medium">+5% improvement</p>
          </div>
        </div>
      </div>

      {/* Progress Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Goal</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Learning Hours</span>
              <span className="text-foreground font-medium">{overallStats.weeklyProgress}h / {overallStats.weeklyGoal}h</span>
            </div>
            <div className="w-full bg-accent rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${(overallStats.weeklyProgress / overallStats.weeklyGoal) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {overallStats.weeklyGoal - overallStats.weeklyProgress}h remaining to reach your weekly goal
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Goal</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Learning Hours</span>
              <span className="text-foreground font-medium">{overallStats.monthlyProgress}h / {overallStats.monthlyGoal}h</span>
            </div>
            <div className="w-full bg-accent rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(overallStats.monthlyProgress / overallStats.monthlyGoal) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {overallStats.monthlyGoal - overallStats.monthlyProgress}h remaining to reach your monthly goal
            </p>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Subject Progress</h3>
          <button className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjectProgress.map((subject) => (
            <div key={subject.subject} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${subject.color} rounded-full`}></div>
                  <span className="font-medium text-foreground">{subject.subject}</span>
                </div>
                <span className="text-sm text-muted-foreground">{subject.progress}%</span>
              </div>
              
              <div className="w-full bg-accent rounded-full h-2">
                <div 
                  className={`${subject.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Hours</p>
                  <p className="font-medium text-foreground">{subject.hoursSpent}h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Courses</p>
                  <p className="font-medium text-foreground">{subject.coursesCompleted}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Score</p>
                  <p className="font-medium text-foreground">{subject.averageScore}%</p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">Last activity: {subject.lastActivity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Weekly Activity</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-7 gap-4">
            {weeklyActivity.map((day, index) => (
              <div key={day.day} className="text-center">
                <div className="mb-2">
                  <div 
                    className="w-full bg-accent rounded-lg mx-auto transition-all duration-300 hover:bg-primary/20"
                    style={{ 
                      height: `${Math.max(day.hours * 20, 8)}px`,
                      minHeight: '8px'
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground font-medium">{day.day}</p>
                <p className="text-xs text-foreground">{day.hours}h</p>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>Learning Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements and Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
            <button className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    <span className="text-xs text-primary font-medium">+{achievement.points} points</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                      achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Upcoming Milestones</h3>
          
          <div className="space-y-4">
            {upcomingMilestones.map((milestone, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{milestone.title}</h4>
                  <span className="text-sm text-muted-foreground">{milestone.progress}%</span>
                </div>
                
                <div className="w-full bg-accent rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {milestone.current} / {milestone.target}
                  </span>
                  <span className="text-primary font-medium">{milestone.reward}</span>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Estimated completion: {milestone.estimatedCompletion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Insights */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Learning Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningInsights.map((insight, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-accent/50 rounded-lg">
              <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{insight.title}</h4>
                <p className="text-primary font-medium">{insight.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Position */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Ranking</h3>
            <p className="text-muted-foreground">
              You're performing better than {Math.round(((overallStats.totalStudents - overallStats.rank) / overallStats.totalStudents) * 100)}% of students
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">#{overallStats.rank}</div>
            <div className="text-sm text-muted-foreground">out of {overallStats.totalStudents.toLocaleString()}</div>
            <div className="text-sm text-primary font-medium">{overallStats.totalPoints.toLocaleString()} points</div>
          </div>
        </div>
      </div>
    </div>
  );
}
