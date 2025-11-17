'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Info, ChevronRight, Star, Users, BookOpen, Video, Mic } from 'lucide-react';

export function NetflixHero() {
  const [email, setEmail] = useState('');

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to signup with email pre-filled
    if (email) {
      window.location.href = `/register?email=${encodeURIComponent(email)}`;
    } else {
      window.location.href = '/register';
    }
  };

  const stats = [
    { icon: BookOpen, label: 'GCSE & A-Level Courses', value: 'Available' },
    { icon: Video, label: 'Live Webinars', value: 'Weekly' },
    { icon: Users, label: 'Life & Career Skills', value: 'Guidance' },
    { icon: Mic, label: 'Interview Prep', value: 'Public Speaking' },
    { icon: Star, label: 'AI Learning Assistant', value: '24/7' },
  ];

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-14 sm:pt-16">
      {/* Subtle organic shapes for depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 sm:pt-6 pb-12 sm:pb-10 safe-area-bottom">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-3 sm:px-6 py-1 sm:py-3 rounded-full teal-card-glass shimmer text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-6 animate-fade-in shadow-lg">
            <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-1.5 sm:mr-2 text-teal-gold" />
            <span className="hidden xs:inline">AI-Powered Learning Platform for UK Students</span>
            <span className="xs:hidden">AI-Powered Learning</span>
          </div>

          {/* Premium Main Heading */}
          <h1 className="font-display font-extrabold mb-6 sm:mb-5 animate-fade-in leading-tight">
            <span className="block text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-white mb-2 sm:mb-3 tracking-tight pb-0.5 sm:pb-1 drop-shadow-2xl">
              Elevate Your
            </span>
            <span className="block text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[12rem] font-black tracking-tighter pb-2 sm:pb-3 leading-[0.85]" style={{
              background: 'linear-gradient(135deg, #FFC857 0%, #14D4C4 50%, #00F0FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Learning Journey
            </span>
          </h1>

          {/* Premium Subtitle */}
          <p className="text-sm sm:text-lg text-gray-300 mb-6 sm:mb-7 max-w-4xl mx-auto leading-relaxed sm:leading-relaxed animate-fade-in font-light drop-shadow-lg px-2 sm:px-0">
            Master every GCSE & A-Level subject with comprehensive courses designed for exam success. 
            Discover your perfect career path with expert guidance, explore hundreds of professions, and prepare for your future with 24/7 AI tutoring, live expert sessions, and interview practice.
          </p>

          {/* Premium Email Signup */}
          <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto mb-6 sm:mb-7 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-3 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-lg rounded-xl teal-card-glass text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-teal-gold transition-all duration-300 min-h-touch shadow-lg"
                required
              />
              <button
                type="submit"
                className="teal-button-primary text-sm sm:text-lg flex items-center justify-center gap-2 sm:gap-3 min-w-fit min-h-touch tap-highlight-transparent"
              >
                Get Started
                <ChevronRight className="w-4 sm:w-6 h-4 sm:h-6" />
              </button>
            </div>
            <p className="text-gray-200 mt-2 sm:mt-3 text-center text-xs sm:text-base font-light">
              Ready to learn? Enter your email to get started with your subscription.
            </p>
          </form>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 mb-16 sm:mb-10 animate-fade-in">
            <Link
              href="/courses"
              className="teal-button-secondary group flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-lg min-h-touch tap-highlight-transparent"
            >
              <Play className="w-4 sm:w-6 h-4 sm:h-6 group-hover:scale-110 transition-transform" />
              Explore Courses
            </Link>
            <Link
              href="#features"
              className="teal-button-secondary flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-lg min-h-touch tap-highlight-transparent"
            >
              <Info className="w-4 sm:w-6 h-4 sm:h-6" />
              Learn More
            </Link>
          </div>

          {/* Premium Stats with iOS Liquid Glass Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 animate-fade-in mt-0 sm:mt-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              // iOS 16+ liquid glass style with vibrant accent colors
              const cardStyles = [
                { 
                  iconBg: 'from-blue-400 to-blue-600',
                  accentColor: 'rgba(96, 165, 250, 0.25)'
                },
                { 
                  iconBg: 'from-purple-400 to-purple-600',
                  accentColor: 'rgba(192, 132, 252, 0.25)'
                },
                { 
                  iconBg: 'from-amber-400 to-orange-500',
                  accentColor: 'rgba(251, 191, 36, 0.25)'
                },
                { 
                  iconBg: 'from-emerald-400 to-teal-500',
                  accentColor: 'rgba(52, 211, 153, 0.25)'
                },
                { 
                  iconBg: 'from-cyan-400 to-sky-500',
                  accentColor: 'rgba(34, 211, 238, 0.25)'
                }
              ];
              const style = cardStyles[index];
              
              return (
                <div
                  key={stat.label}
                  className="text-center group tap-highlight-transparent relative overflow-hidden rounded-3xl p-5 sm:p-7 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.15)
                    `
                  }}
                >
                  {/* Liquid gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${style.accentColor} 0%, transparent 100%)`
                    }}
                  ></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br ${style.iconBg} rounded-2xl sm:rounded-3xl mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110`}
                      style={{
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <stat.icon className="w-7 h-7 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/85 font-medium leading-snug">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
