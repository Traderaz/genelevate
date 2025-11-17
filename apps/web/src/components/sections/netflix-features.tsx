'use client';

import React, { useState } from 'react';
import { Play, BookOpen, Video, Brain, Users, Award, Smartphone, Globe } from 'lucide-react';

export function NetflixFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: BookOpen,
      title: 'GCSE & A-Level Courses',
      description: 'Master every GCSE and A-Level subject with comprehensive, exam-focused courses designed to help you achieve top grades.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Complete subject coverage',
        'Structured learning paths',
        'Interactive content',
        'Progress tracking'
      ]
    },
    {
      icon: Users,
      title: 'Life Skills & Career Guidance',
      description: 'Discover your perfect career path with comprehensive guidance on hundreds of career options and the skills needed to succeed.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Explore career pathways',
        'Skills development',
        'Industry insights',
        'Personalized guidance'
      ]
    },
    {
      icon: Video,
      title: 'Live Interactive Webinars',
      description: 'Join live sessions with expert educators, ask questions, and collaborate with peers in real-time.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Weekly live sessions',
        'Real-time Q&A',
        'Screen sharing & chat',
        'Recording available'
      ]
    },
    {
      icon: Brain,
      title: 'AI Learning Assistant',
      description: 'Get instant help with your studies using our advanced AI tutor, available 24/7 for any subject.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Subject-specific help',
        'Step-by-step solutions',
        'Learning analytics',
        '24/7 availability'
      ]
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to <span className="text-brand-gold font-black">Excel</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            From GCSE & A-Level courses to career guidance and AI tutoring, we help you excel academically 
            while discovering the perfect career path with comprehensive life skills and industry insights.
          </p>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Feature Navigation */}
            <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'teal-card-glass border-teal-gold border-2 shadow-xl'
                      : 'teal-card-glass border border-white/20 hover:border-teal-gold/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-gradient-to-br from-teal-blue-medium to-teal-primary text-white shadow-lg' 
                        : 'bg-white/10 text-white/70'
                    }`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 mb-4">
                        {feature.description}
                      </p>
                      {activeFeature === index && (
                        <div className="space-y-2 animate-fade-in">
                          {feature.highlights.map((highlight, highlightIndex) => (
                            <div key={highlightIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-brand-gold rounded-full shadow-md shadow-brand-gold/50"></div>
                              <span className="text-sm text-white/90 font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Feature Preview */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-video brand-card-glass rounded-2xl overflow-hidden shadow-brand-xl border-2 border-brand-teal/20">
                <div className="w-full h-full brand-gradient flex items-center justify-center relative p-4 sm:p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(13,74,124,0.8)_100%)] opacity-40"></div>
                  <div className="text-center relative z-10 w-full">
                    {React.createElement(features[activeFeature].icon, { className: "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-brand-gold mx-auto mb-4 sm:mb-6 drop-shadow-2xl" })}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg px-2">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-100 max-w-lg mb-4 sm:mb-6 px-4 sm:px-6 mx-auto leading-relaxed font-light">
                      {features[activeFeature].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: 'GCSE & A-Level Courses',
              description: 'Complete curriculum coverage across all GCSE and A-Level subjects with exam-focused content.',
              gradient: 'from-blue-500/10 via-blue-600/5 to-purple-600/10',
              border: 'border-blue-500/30',
              iconBg: 'from-blue-500 to-blue-600',
              iconGlow: 'shadow-blue-500/50'
            },
            {
              icon: Users,
              title: 'Life Skills Training',
              description: 'Essential life skills and personal development to prepare you for the real world.',
              gradient: 'from-purple-500/10 via-purple-600/5 to-pink-600/10',
              border: 'border-purple-500/30',
              iconBg: 'from-purple-500 to-pink-600',
              iconGlow: 'shadow-purple-500/50'
            },
            {
              icon: Globe,
              title: 'Career Explorer',
              description: 'Explore hundreds of career options with detailed insights into each profession and pathway.',
              gradient: 'from-orange-500/10 via-red-600/5 to-pink-600/10',
              border: 'border-orange-500/30',
              iconBg: 'from-orange-500 to-red-600',
              iconGlow: 'shadow-orange-500/50'
            },
            {
              icon: Video,
              title: 'Live Webinars',
              description: 'Weekly interactive sessions with expert tutors and real-time Q&A support.',
              gradient: 'from-cyan-500/10 via-blue-600/5 to-indigo-600/10',
              border: 'border-cyan-500/30',
              iconBg: 'from-cyan-500 to-blue-600',
              iconGlow: 'shadow-cyan-500/50'
            },
            {
              icon: Brain,
              title: '24/7 AI Tutor',
              description: 'Get instant help with homework and study questions anytime from our AI assistant.',
              gradient: 'from-green-500/10 via-emerald-600/5 to-teal-600/10',
              border: 'border-green-500/30',
              iconBg: 'from-green-500 to-emerald-600',
              iconGlow: 'shadow-green-500/50'
            },
            {
              icon: Award,
              title: 'Interview Lab',
              description: 'Practice interview skills with video submissions and receive expert feedback for career success.',
              gradient: 'from-yellow-500/10 via-yellow-600/5 to-amber-600/10',
              border: 'border-yellow-500/30',
              iconBg: 'from-yellow-500 to-amber-600',
              iconGlow: 'shadow-yellow-500/50'
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl teal-card-glass border ${item.border} hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${item.iconBg} rounded-full mb-4 shadow-lg ${item.iconGlow} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-white/80 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
