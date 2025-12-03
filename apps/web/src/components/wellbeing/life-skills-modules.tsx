'use client';

import { useState, useEffect } from 'react';
import { Coins, Shield, MessageCircle, Brain, Lock, CheckCircle, Play, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { getAllModuleProgress, checkModuleUnlock } from '@/lib/services/module-progress';
import { ModuleProgress, ModuleUnlockInfo } from '@/types/module-progress';

interface Module {
  id: string;
  title: string;
  category: 'finance' | 'ethics' | 'communication' | 'mental-health';
  description: string;
  duration: string;
  lessons: number;
  completed: number;
  locked: boolean;
  unlockInfo?: ModuleUnlockInfo;
  icon: any;
  color: string;
  bgColor: string;
}

export function LifeSkillsModules() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [moduleProgress, setModuleProgress] = useState<Map<string, ModuleProgress>>(new Map());
  const [unlockInfoMap, setUnlockInfoMap] = useState<Map<string, ModuleUnlockInfo>>(new Map());
  const [loading, setLoading] = useState(true);

  // Load user progress and unlock status
  useEffect(() => {
    async function loadModuleData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Load all progress
        const progress = await getAllModuleProgress(user.uid);
        const progressMap = new Map<string, ModuleProgress>();
        progress.forEach(p => progressMap.set(p.moduleId, p));
        setModuleProgress(progressMap);

        // Check unlock status for all modules
        const unlockMap = new Map<string, ModuleUnlockInfo>();
        const moduleIds = modules.map(m => m.id);
        
        for (const moduleId of moduleIds) {
          const unlockInfo = await checkModuleUnlock(user.uid, moduleId);
          unlockMap.set(moduleId, unlockInfo);
        }
        
        setUnlockInfoMap(unlockMap);
      } catch (error) {
        console.error('Error loading module data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadModuleData();
  }, [user]);

  const categories = [
    { id: 'all', label: 'All Modules', icon: null },
    { id: 'finance', label: 'Financial Literacy (UK)', icon: Coins, color: 'text-yellow-500' },
    { id: 'ethics', label: 'UK Life Skills', icon: Shield, color: 'text-blue-500' },
    { id: 'communication', label: 'Professional Skills', icon: MessageCircle, color: 'text-purple-500' },
    { id: 'mental-health', label: 'Wellbeing & Personal Development', icon: Brain, color: 'text-green-500' }
  ];

  const modules: Module[] = [
    // UK Financial Literacy Modules
    {
      id: 'fin-1',
      title: 'UK Tax System Explained',
      category: 'finance',
      description: 'Complete guide: PAYE, self-employment, business taxation, and tax-saving strategies',
      duration: '90 min',
      lessons: 10,
      completed: 0,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'fin-2',
      title: 'Mortgages & Home Buying',
      category: 'finance',
      description: 'Learn about UK mortgages, deposits, stamp duty, and the home buying process',
      duration: '50 min',
      lessons: 7,
      completed: 0,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'fin-3',
      title: 'Pensions & Retirement Planning',
      category: 'finance',
      description: 'Understanding workplace pensions, state pension, and retirement savings',
      duration: '45 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'fin-4',
      title: 'Credit & Debt Management',
      category: 'finance',
      description: 'UK credit scores (Experian/Equifax/TransUnion), managing debt, improving credit rating',
      duration: '35 min',
      lessons: 5,
      completed: 0,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'fin-5',
      title: 'Budgeting & Money Management',
      category: 'finance',
      description: '50/30/20 rule, budgeting apps (Emma, Snoop), emergency funds, money-saving strategies',
      duration: '35 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'fin-6',
      title: 'Student Finance & Loans',
      category: 'finance',
      description: 'Complete UK student finance guide (2025/26): tuition fees (£9,535), maintenance loans, repayment thresholds',
      duration: '40 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'fin-7',
      title: 'Banking & Accounts (UK)',
      category: 'finance',
      description: 'Opening accounts, cash deposits, ATMs, foreign fees, direct debits, and fraud protection',
      duration: '50 min',
      lessons: 7,
      completed: 0,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    
    // UK Life Skills & Professional Development
    {
      id: 'life-2',
      title: 'Employment Rights (UK)',
      category: 'ethics',
      description: 'Know your rights: contracts, minimum wage, holiday pay, and workplace laws',
      duration: '40 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'life-1',
      title: 'Renting & Housing in the UK',
      category: 'ethics',
      description: 'Understanding UK tenancy rights, deposits, bills, and finding a place to rent',
      duration: '40 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'life-3',
      title: 'NHS & Healthcare in the UK',
      category: 'ethics',
      description: 'Accessing healthcare, GP registration, prescriptions, and NHS services',
      duration: '35 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'eth-4',
      title: 'Utilities & Council Tax',
      category: 'ethics',
      description: 'Setting up utilities, understanding council tax, and household bills',
      duration: '30 min',
      lessons: 4,
      completed: 0,
      locked: false,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    
    // Professional & Communication Skills
    {
      id: 'com-1',
      title: 'CV Writing & Job Applications',
      category: 'communication',
      description: 'Create professional CVs and compelling cover letters for UK employers',
      duration: '40 min',
      lessons: 5,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'com-2',
      title: 'Interview Skills & Techniques',
      category: 'communication',
      description: 'Master interview techniques and make great first impressions',
      duration: '45 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'com-3',
      title: 'Professional Networking',
      category: 'communication',
      description: 'Build professional relationships and networking skills',
      duration: '35 min',
      lessons: 5,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'com-4',
      title: 'Workplace Communication',
      category: 'communication',
      description: 'Professional emails, meetings, and workplace etiquette',
      duration: '30 min',
      lessons: 4,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    
    // Mental Wellbeing & Personal Development
    {
      id: 'mh-1',
      title: 'Mental Health Awareness',
      category: 'mental-health',
      description: 'Understanding mental health, recognizing signs, and seeking support',
      duration: '35 min',
      lessons: 5,
      completed: 0,
      locked: false,
      icon: Brain,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'mh-2',
      title: 'Stress Management & Work-Life Balance',
      category: 'mental-health',
      description: 'Practical techniques to manage stress and maintain wellbeing',
      duration: '40 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: Brain,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'mh-3',
      title: 'Time Management & Productivity',
      category: 'mental-health',
      description: 'Organize your time effectively and boost productivity',
      duration: '35 min',
      lessons: 5,
      completed: 0,
      locked: false,
      icon: Brain,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'mh-4',
      title: 'Personal Finance & Wellbeing',
      category: 'mental-health',
      description: 'Managing financial stress and building healthy money habits',
      duration: '30 min',
      lessons: 4,
      completed: 0,
      locked: false,
      icon: Brain,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },

    // NEW: Travel & Global Awareness
    {
      id: 'life-4',
      title: 'Travel Organization & Global Awareness',
      category: 'ethics',
      description: 'Master travel planning, international etiquette, cultural awareness, and navigate the world confidently',
      duration: '110 min',
      lessons: 8,
      completed: 0,
      locked: false,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },

    // NEW: Business & Entrepreneurship
    {
      id: 'bus-1',
      title: 'Entrepreneurial Creativity & Innovation',
      category: 'communication',
      description: 'Learn to think like an entrepreneur: identify opportunities, generate innovative ideas, and turn concepts into reality',
      duration: '120 min',
      lessons: 8,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'bus-2',
      title: 'Starting & Running a Profitable Business',
      category: 'communication',
      description: 'Complete guide to starting a business in the UK: from setup to profitability, legal structure to accounting',
      duration: '140 min',
      lessons: 8,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },

    // NEW: Professional Skills
    {
      id: 'prof-1',
      title: 'Cultural Capital & Professional Communication',
      category: 'communication',
      description: 'Master the unwritten rules of professional environments: communicate confidently, network effectively, and build social intelligence',
      duration: '150 min',
      lessons: 8,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },

    // NEW: Marketing & Digital Skills
    {
      id: 'mark-1',
      title: 'Social Media Marketing & Personal Brand',
      category: 'communication',
      description: 'Build your personal brand and master social media marketing across all major platforms',
      duration: '135 min',
      lessons: 8,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  // Enrich modules with progress and unlock info
  const enrichedModules = modules.map(module => {
    const progress = moduleProgress.get(module.id);
    const unlockInfo = unlockInfoMap.get(module.id);
    
    return {
      ...module,
      completed: progress?.lessonsCompleted || 0,
      locked: unlockInfo ? !unlockInfo.isUnlocked : true,
      unlockInfo
    };
  });

  const filteredModules = selectedCategory === 'all'
    ? enrichedModules
    : enrichedModules.filter(m => m.category === selectedCategory);

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const getStatusBadge = (module: Module) => {
    if (module.locked) {
      if (module.unlockInfo?.daysUntilUnlock) {
        return (
          <span className="px-2 py-1 bg-gray-500/10 text-gray-500 text-xs rounded-full flex items-center gap-1">
            <Lock className="w-3 h-3" />
            {module.unlockInfo.daysUntilUnlock}d
          </span>
        );
      }
      return (
        <span className="px-2 py-1 bg-gray-500/10 text-gray-500 text-xs rounded-full flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Locked
        </span>
      );
    }
    if (module.completed === module.lessons) {
      return (
        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Completed
        </span>
      );
    }
    if (module.completed > 0) {
      return (
        <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full flex items-center gap-1">
          <Play className="w-3 h-3" />
          In Progress
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-teal-primary/20 text-teal-primary text-xs rounded-full font-medium">
        Not Started
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-64 teal-card animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Life Skills Modules</h2>
        <span className="text-sm text-white/80">
          {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Info Banner */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
        <Calendar className="w-5 h-5 text-teal-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Sequential Learning:</strong> Complete modules in order. 
          New modules unlock 7 days after completing the previous one.
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-teal-blue-medium to-teal-primary text-white shadow-lg'
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 shadow-sm'
            }`}
          >
            {category.icon && <category.icon className="w-4 h-4" />}
            {category.label}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <Link
            key={module.id}
            href={module.locked ? '#' : `/wellbeing/module/${module.id}`}
            className={`bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-teal-gold hover:shadow-xl transition-all group shadow-md ${
              module.locked ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 ${module.bgColor} rounded-lg flex items-center justify-center shadow-sm`}>
                  <module.icon className={`w-6 h-6 ${module.color}`} />
                </div>
                {getStatusBadge(module)}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-teal-primary transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {module.description}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {module.duration}
                </span>
                <span>{module.lessons} lessons</span>
              </div>

              {/* Progress or Lock Info */}
              {!module.locked ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {module.completed}/{module.lessons}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        module.completed === module.lessons
                          ? 'bg-green-500'
                          : 'bg-teal-primary'
                      }`}
                      style={{ width: `${getProgressPercentage(module.completed, module.lessons)}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-gray-300 dark:border-gray-600">
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Lock className="w-4 h-4" />
                    <span className="font-medium">
                      {module.unlockInfo?.daysUntilUnlock 
                        ? `Unlocks in ${module.unlockInfo.daysUntilUnlock} day${module.unlockInfo.daysUntilUnlock !== 1 ? 's' : ''}`
                        : module.unlockInfo?.previousModuleId
                          ? 'Complete previous module first'
                          : 'Locked'}
                    </span>
                  </div>
                  {module.unlockInfo?.previousCompletedAt && module.unlockInfo?.daysUntilUnlock && (
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Available: {new Date(module.unlockInfo.previousCompletedAt.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
