'use client';

import React, { useState } from 'react';
import { Play, BookOpen, Video, Brain, Users, Award, Smartphone, Globe } from 'lucide-react';

export function NetflixFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: BookOpen,
      title: 'GCSE & A-Level Courses',
      description: 'Comprehensive courses in Mathematics, Biology, Physics, Chemistry, English Language, and Business Studies.',
      image: '/api/placeholder/600/400',
      highlights: [
        '7+ complete subject courses',
        '10 chapters per course',
        'Interactive content',
        'Progress tracking'
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
    },
    {
      icon: Users,
      title: 'Interview Lab & Debates',
      description: 'Practice interview skills with video submissions and engage in academic debates with peers.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Video interview practice',
        'Expert feedback',
        'Academic debates',
        'Career preparation'
      ]
    }
  ];

  const stats = [
    { icon: BookOpen, value: '7+', label: 'Subject Courses' },
    { icon: Video, value: 'Weekly', label: 'Live Webinars' },
    { icon: Brain, value: '24/7', label: 'AI Assistant' },
    { icon: Users, value: 'Active', label: 'Debate Community' },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to <span className="netflix-text-gradient">Excel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From comprehensive GCSE & A-Level courses to AI tutoring and interview preparation, 
            we provide all the tools you need to succeed in your academic journey.
          </p>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Navigation */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 netflix-card ${
                    activeFeature === index
                      ? 'bg-netflix-red/10 border-netflix-red border-2'
                      : 'bg-card border border-border hover:border-netflix-red/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      activeFeature === index ? 'bg-netflix-red text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      {activeFeature === index && (
                        <div className="space-y-2 animate-fade-in">
                          {feature.highlights.map((highlight, highlightIndex) => (
                            <div key={highlightIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-netflix-red rounded-full"></div>
                              <span className="text-sm text-foreground">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Preview */}
            <div className="relative">
              <div className="aspect-video bg-card border border-border rounded-xl overflow-hidden shadow-netflix">
                <div className="w-full h-full bg-gradient-to-br from-netflix-red/20 to-background flex items-center justify-center">
                  <div className="text-center">
                    {React.createElement(features[activeFeature].icon, { className: "w-16 h-16 text-netflix-red mx-auto mb-4" })}
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      {features[activeFeature].description}
                    </p>
                    <button className="mt-6 flex items-center gap-2 mx-auto px-6 py-3 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg netflix-button">
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-card border border-border rounded-xl netflix-card"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-netflix-red/10 rounded-full mb-4">
                <stat.icon className="w-6 h-6 text-netflix-red" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Platform Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: 'Complete Curriculum',
              description: 'Full coverage of GCSE & A-Level subjects including Maths, Sciences, English & Business.'
            },
            {
              icon: Video,
              title: 'Live Webinars',
              description: 'Weekly interactive sessions with expert tutors and real-time Q&A support.'
            },
            {
              icon: Brain,
              title: 'AI Tutor',
              description: 'Get instant help with homework and study questions 24/7 from our AI assistant.'
            },
            {
              icon: Users,
              title: 'Debate Platform',
              description: 'Engage in academic debates and develop critical thinking skills.'
            },
            {
              icon: Award,
              title: 'Interview Lab',
              description: 'Practice interview skills with video submissions and receive expert feedback.'
            },
            {
              icon: Globe,
              title: 'Career Explorer',
              description: 'Discover career paths and get personalized guidance for your future.'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-card border border-border rounded-xl netflix-card hover:border-netflix-red/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-netflix-red/10 rounded-full mb-4">
                <item.icon className="w-6 h-6 text-netflix-red" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
