'use client';

import React, { useState } from 'react';
import { Play, BookOpen, Video, Brain, Users, Award, Smartphone, Globe } from 'lucide-react';

export function NetflixFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: BookOpen,
      title: 'Premium Course Library',
      description: 'Access 500+ expertly crafted courses covering all subjects from Year 6 to A-Level.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Interactive video lessons',
        'Downloadable resources',
        'Progress tracking',
        'Expert instructors'
      ]
    },
    {
      icon: Video,
      title: 'Live Interactive Webinars',
      description: 'Join live sessions with top educators and interact with peers in real-time.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Real-time Q&A',
        'Screen sharing',
        'Breakout rooms',
        'Recording available'
      ]
    },
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Get personalized recommendations and adaptive learning paths powered by AI.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Personalized curriculum',
        'Smart recommendations',
        'Learning analytics',
        '24/7 AI tutor'
      ]
    },
    {
      icon: Award,
      title: 'Certificates & Achievements',
      description: 'Earn verified certificates and unlock achievements as you progress.',
      image: '/api/placeholder/600/400',
      highlights: [
        'Verified certificates',
        'Digital badges',
        'Skill assessments',
        'Portfolio building'
      ]
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Students' },
    { icon: BookOpen, value: '500+', label: 'Courses' },
    { icon: Video, value: '100+', label: 'Live Sessions/Month' },
    { icon: Globe, value: '50+', label: 'Countries' },
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
            Our comprehensive platform combines the best of online learning with cutting-edge technology 
            to deliver an unmatched educational experience.
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
              icon: Smartphone,
              title: 'Mobile Learning',
              description: 'Learn anywhere with our mobile app. Download content for offline access.'
            },
            {
              icon: Users,
              title: 'Collaborative Learning',
              description: 'Connect with peers, join study groups, and learn together.'
            },
            {
              icon: Brain,
              title: 'Adaptive Technology',
              description: 'AI adjusts to your learning style and pace for optimal results.'
            },
            {
              icon: Award,
              title: 'Skill Validation',
              description: 'Earn industry-recognized certificates and showcase your achievements.'
            },
            {
              icon: Globe,
              title: 'Global Community',
              description: 'Join a worldwide community of learners and educators.'
            },
            {
              icon: Video,
              title: 'HD Streaming',
              description: 'Crystal clear video quality with adaptive streaming technology.'
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
