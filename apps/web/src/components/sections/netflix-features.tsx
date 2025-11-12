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

  const stats = [
    { icon: BookOpen, value: 'GCSE & A-Level', label: 'Courses' },
    { icon: Users, value: 'Career', label: 'Pathways' },
    { icon: Video, value: 'Weekly', label: 'Live Webinars' },
    { icon: Brain, value: '24/7', label: 'AI Assistant' },
  ];

  return (
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(229, 9, 20, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Excel</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'cinematic-card border-red-500 border-2'
                      : 'premium-glass hover:border-red-500/50 border border-white/10'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg transition-all duration-300 ${
                      activeFeature === index ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg' : 'bg-white/5 text-gray-400'
                    }`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {feature.description}
                      </p>
                      {activeFeature === index && (
                        <div className="space-y-2 animate-fade-in">
                          {feature.highlights.map((highlight, highlightIndex) => (
                            <div key={highlightIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                              <span className="text-sm text-white">{highlight}</span>
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
              <div className="aspect-video cinematic-card rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-red-900/30 to-black flex items-center justify-center relative p-4 sm:p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-50"></div>
                  <div className="text-center relative z-10 w-full">
                    {React.createElement(features[activeFeature].icon, { className: "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-red-500 mx-auto mb-4 sm:mb-6 drop-shadow-2xl" })}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg px-2">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-lg mb-4 sm:mb-6 px-4 sm:px-6 mx-auto leading-relaxed">
                      {features[activeFeature].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 cinematic-card rounded-2xl"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full mb-4 shadow-lg">
                <stat.icon className="w-6 h-6 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Platform Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: 'GCSE & A-Level Courses',
              description: 'Complete curriculum coverage across all GCSE and A-Level subjects with exam-focused content.'
            },
            {
              icon: Users,
              title: 'Life Skills Training',
              description: 'Essential life skills and personal development to prepare you for the real world.'
            },
            {
              icon: Globe,
              title: 'Career Explorer',
              description: 'Explore hundreds of career options with detailed insights into each profession and pathway.'
            },
            {
              icon: Video,
              title: 'Live Webinars',
              description: 'Weekly interactive sessions with expert tutors and real-time Q&A support.'
            },
            {
              icon: Brain,
              title: '24/7 AI Tutor',
              description: 'Get instant help with homework and study questions anytime from our AI assistant.'
            },
            {
              icon: Award,
              title: 'Interview Lab',
              description: 'Practice interview skills with video submissions and receive expert feedback for career success.'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 cinematic-card rounded-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full mb-4 shadow-lg">
                <item.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
