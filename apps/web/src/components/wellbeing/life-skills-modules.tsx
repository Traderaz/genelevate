'use client';

import { useState } from 'react';
import { Coins, Shield, MessageCircle, Brain, Lock, CheckCircle, Play, Clock } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  category: 'finance' | 'ethics' | 'communication' | 'mental-health';
  description: string;
  duration: string;
  lessons: number;
  completed: number;
  locked: boolean;
  icon: any;
  color: string;
  bgColor: string;
}

export function LifeSkillsModules() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Modules', icon: null },
    { id: 'finance', label: 'Financial Literacy', icon: Coins, color: 'text-yellow-500' },
    { id: 'ethics', label: 'Ethics & Values', icon: Shield, color: 'text-blue-500' },
    { id: 'communication', label: 'Communication', icon: MessageCircle, color: 'text-purple-500' },
    { id: 'mental-health', label: 'Mental Wellbeing', icon: Brain, color: 'text-green-500' }
  ];

  const modules: Module[] = [
    // Financial Literacy Modules
    {
      id: 'fin-1',
      title: 'Understanding Money Basics',
      category: 'finance',
      description: 'Learn about earning, saving, and spending wisely',
      duration: '30 min',
      lessons: 5,
      completed: 5,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'fin-2',
      title: 'Budgeting & Planning',
      category: 'finance',
      description: 'Create and manage your personal budget',
      duration: '45 min',
      lessons: 6,
      completed: 3,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'fin-3',
      title: 'Banking & Digital Money',
      category: 'finance',
      description: 'Navigate modern banking and online payments safely',
      duration: '40 min',
      lessons: 5,
      completed: 0,
      locked: false,
      icon: Coins,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    
    // Ethics & Values Modules
    {
      id: 'eth-1',
      title: 'Making Ethical Decisions',
      category: 'ethics',
      description: 'Understand ethical frameworks and moral reasoning',
      duration: '35 min',
      lessons: 4,
      completed: 4,
      locked: false,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'eth-2',
      title: 'Digital Citizenship',
      category: 'ethics',
      description: 'Be responsible and respectful online',
      duration: '30 min',
      lessons: 5,
      completed: 2,
      locked: false,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'eth-3',
      title: 'Social Responsibility',
      category: 'ethics',
      description: 'Understanding your role in society and community',
      duration: '40 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    
    // Communication Modules
    {
      id: 'com-1',
      title: 'Effective Communication',
      category: 'communication',
      description: 'Express yourself clearly and confidently',
      duration: '35 min',
      lessons: 5,
      completed: 5,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'com-2',
      title: 'Active Listening',
      category: 'communication',
      description: 'Develop empathy and understanding through listening',
      duration: '30 min',
      lessons: 4,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'com-3',
      title: 'Conflict Resolution',
      category: 'communication',
      description: 'Handle disagreements constructively',
      duration: '45 min',
      lessons: 6,
      completed: 0,
      locked: false,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    
    // Mental Wellbeing Modules
    {
      id: 'mh-1',
      title: 'Understanding Emotions',
      category: 'mental-health',
      description: 'Recognize and manage your feelings healthily',
      duration: '30 min',
      lessons: 5,
      completed: 0,
      locked: false,
      icon: Brain,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'mh-2',
      title: 'Stress Management',
      category: 'mental-health',
      description: 'Practical techniques to cope with stress',
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
      title: 'Building Resilience',
      category: 'mental-health',
      description: 'Develop strength to overcome challenges',
      duration: '35 min',
      lessons: 5,
      completed: 0,
      locked: false,
      icon: Brain,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  const filteredModules = selectedCategory === 'all'
    ? modules
    : modules.filter(m => m.category === selectedCategory);

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const getStatusBadge = (module: Module) => {
    if (module.locked) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Life Skills Modules</h2>
        <span className="text-sm text-white/80">
          {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''}
        </span>
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
                : 'teal-card text-teal-card-text-muted hover:bg-gray-100 hover:text-teal-card-text border border-gray-300'
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
            className={`teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-xl transition-all group ${
              module.locked ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 ${module.bgColor} rounded-lg flex items-center justify-center`}>
                  <module.icon className={`w-6 h-6 ${module.color}`} />
                </div>
                {getStatusBadge(module)}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-teal-card-text mb-2 group-hover:text-teal-primary transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-teal-card-text-muted leading-relaxed">
                  {module.description}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-teal-card-text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {module.duration}
                </span>
                <span>{module.lessons} lessons</span>
              </div>

              {/* Progress */}
              {!module.locked && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-teal-card-text-muted">Progress</span>
                    <span className="font-semibold text-teal-card-text">
                      {module.completed}/{module.lessons}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
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
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
