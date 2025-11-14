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
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden bg-black pt-14 sm:pt-16">
      {/* Premium Gradient Background from Top Left */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-950 to-red-950/20"></div>
      </div>
      
      {/* Cinematic Overlay with Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-30"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-red-600/30 via-red-900/20 to-transparent rounded-full blur-3xl floating-animation"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-orange-600/20 via-red-900/10 to-transparent rounded-full blur-3xl pulse-glow"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(229, 9, 20, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 9, 20, 0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 sm:pt-6 pb-12 sm:pb-10 safe-area-bottom">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-3 sm:px-6 py-1 sm:py-3 rounded-full premium-glass shimmer text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-6 animate-fade-in shadow-lg">
            <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-1.5 sm:mr-2 text-red-500" />
            <span className="hidden xs:inline">AI-Powered Learning Platform for UK Students</span>
            <span className="xs:hidden">AI-Powered Learning</span>
          </div>

          {/* Cinematic Main Heading */}
          <h1 className="font-display font-extrabold mb-6 sm:mb-5 animate-fade-in leading-tight">
            <span className="block text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-white mb-2 sm:mb-3 tracking-tight pb-0.5 sm:pb-1 drop-shadow-2xl">
              Elevate Your
            </span>
            <span className="block text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[12rem] font-black tracking-tighter pb-2 sm:pb-3 bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl leading-[0.85]">
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
                className="flex-1 px-3 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-lg rounded-lg premium-glass text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 min-h-touch shadow-xl"
                required
              />
              <button
                type="submit"
                className="px-6 sm:px-10 py-2.5 sm:py-4 premium-button text-white font-bold text-sm sm:text-lg rounded-lg flex items-center justify-center gap-2 sm:gap-3 min-w-fit min-h-touch tap-highlight-transparent"
              >
                Get Started
                <ChevronRight className="w-4 sm:w-6 h-4 sm:h-6" />
              </button>
            </div>
            <p className="text-gray-400 mt-2 sm:mt-3 text-center text-xs sm:text-base">
              Ready to learn? Enter your email to get started with your subscription.
            </p>
          </form>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 mb-16 sm:mb-10 animate-fade-in">
            <Link
              href="/courses"
              className="group flex items-center justify-center gap-2 sm:gap-4 px-6 sm:px-12 py-2.5 sm:py-4 premium-glass hover:bg-white/10 text-white font-bold text-sm sm:text-lg rounded-lg transition-all duration-300 shadow-2xl min-h-touch tap-highlight-transparent border border-white/10 hover:border-white/30"
            >
              <Play className="w-4 sm:w-6 h-4 sm:h-6 group-hover:scale-110 transition-transform" />
              Explore Courses
            </Link>
            <Link
              href="#features"
              className="flex items-center justify-center gap-2 sm:gap-4 px-6 sm:px-12 py-2.5 sm:py-4 border-2 border-white/20 text-white font-bold text-sm sm:text-lg rounded-lg hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 min-h-touch tap-highlight-transparent backdrop-blur-sm"
            >
              <Info className="w-4 sm:w-6 h-4 sm:h-6" />
              Learn More
            </Link>
          </div>

          {/* Premium Stats with Cinematic Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 animate-fade-in mt-0 sm:mt-8">
            {stats.map((stat, index) => {
              // Define unique gradient colors for each card
              const cardStyles = [
                { 
                  gradient: 'from-blue-500/10 via-blue-600/5 to-purple-600/10',
                  border: 'border-blue-500/30',
                  iconBg: 'from-blue-500 to-blue-600',
                  iconBgHover: 'group-hover:from-blue-500 group-hover:to-blue-600',
                  iconGlow: 'shadow-blue-500/50',
                  textColor: 'text-blue-400',
                  textColorHover: 'group-hover:text-blue-400'
                },
                { 
                  gradient: 'from-purple-500/10 via-purple-600/5 to-pink-600/10',
                  border: 'border-purple-500/30',
                  iconBg: 'from-purple-500 to-pink-600',
                  iconBgHover: 'group-hover:from-purple-500 group-hover:to-pink-600',
                  iconGlow: 'shadow-purple-500/50',
                  textColor: 'text-purple-400',
                  textColorHover: 'group-hover:text-purple-400'
                },
                { 
                  gradient: 'from-orange-500/10 via-red-600/5 to-pink-600/10',
                  border: 'border-orange-500/30',
                  iconBg: 'from-orange-500 to-red-600',
                  iconBgHover: 'group-hover:from-orange-500 group-hover:to-red-600',
                  iconGlow: 'shadow-orange-500/50',
                  textColor: 'text-orange-400',
                  textColorHover: 'group-hover:text-orange-400'
                },
                { 
                  gradient: 'from-green-500/10 via-emerald-600/5 to-teal-600/10',
                  border: 'border-green-500/30',
                  iconBg: 'from-green-500 to-emerald-600',
                  iconBgHover: 'group-hover:from-green-500 group-hover:to-emerald-600',
                  iconGlow: 'shadow-green-500/50',
                  textColor: 'text-green-400',
                  textColorHover: 'group-hover:text-green-400'
                },
                { 
                  gradient: 'from-yellow-500/10 via-yellow-600/5 to-amber-600/10',
                  border: 'border-yellow-500/30',
                  iconBg: 'from-yellow-500 to-amber-600',
                  iconBgHover: 'group-hover:from-yellow-500 group-hover:to-amber-600',
                  iconGlow: 'shadow-yellow-500/50',
                  textColor: 'text-yellow-400',
                  textColorHover: 'group-hover:text-yellow-400'
                }
              ];
              const style = cardStyles[index];
              
              return (
                <div
                  key={stat.label}
                  className={`text-center group tap-highlight-transparent backdrop-blur-sm bg-gradient-to-br ${style.gradient} border ${style.border} rounded-xl sm:rounded-2xl p-3 sm:p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br ${style.iconBg} ${style.iconBgHover} rounded-full mb-2 sm:mb-3 transition-all duration-300 shadow-lg ${style.iconGlow} group-hover:scale-110`}>
                    <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className={`text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-2 ${style.textColorHover} transition-colors duration-300 drop-shadow-lg`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-sm text-gray-300 font-medium leading-tight">
                    {stat.label}
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
