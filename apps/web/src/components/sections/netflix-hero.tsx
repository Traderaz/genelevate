'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Info, ChevronRight, Star, Users, BookOpen, Video } from 'lucide-react';

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 sm:pt-8 pb-8 sm:pb-12 safe-area-bottom">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-full premium-glass shimmer text-white text-xs sm:text-sm font-semibold mb-8 sm:mb-6 animate-fade-in shadow-lg">
            <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-red-500" />
            <span className="hidden xs:inline">AI-Powered Learning Platform for UK Students</span>
            <span className="xs:hidden">AI-Powered Learning</span>
          </div>

          {/* Cinematic Main Heading */}
          <h1 className="font-display font-extrabold mb-8 sm:mb-6 animate-fade-in leading-tight">
            <span className="block mobile-heading-xl text-white mb-3 sm:mb-4 tracking-tight pb-2 drop-shadow-2xl">
              Elevate Your
            </span>
            <span className="block text-4xl xs:text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter pb-4 bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
              Learning Journey
            </span>
          </h1>

          {/* Premium Subtitle */}
          <p className="mobile-text-lg text-gray-300 mb-10 sm:mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in font-light drop-shadow-lg">
            Master every GCSE & A-Level subject with comprehensive courses designed for exam success. 
            Discover your perfect career path with expert guidance, explore hundreds of professions, and prepare for your future with 24/7 AI tutoring, live expert sessions, and interview practice.
          </p>

          {/* Premium Email Signup */}
          <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto mb-12 sm:mb-10 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg rounded-lg premium-glass text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 min-h-touch shadow-xl"
                required
              />
              <button
                type="submit"
                className="px-8 sm:px-10 py-4 sm:py-5 premium-button text-white font-bold text-base sm:text-lg rounded-lg flex items-center justify-center gap-2 sm:gap-3 min-w-fit min-h-touch tap-highlight-transparent"
              >
                Get Started
                <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>
            <p className="text-gray-400 mt-3 sm:mt-4 text-center text-sm sm:text-base">
              Ready to learn? Enter your email to get started with your subscription.
            </p>
          </form>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-12 animate-fade-in">
            <Link
              href="/courses"
              className="group flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 premium-glass hover:bg-white/10 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-2xl min-h-touch tap-highlight-transparent border border-white/10 hover:border-white/30"
            >
              <Play className="w-5 sm:w-6 h-5 sm:h-6 group-hover:scale-110 transition-transform" />
              Explore Courses
            </Link>
            <Link
              href="#features"
              className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 border-2 border-white/20 text-white font-bold text-base sm:text-lg rounded-lg hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 min-h-touch tap-highlight-transparent backdrop-blur-sm"
            >
              <Info className="w-5 sm:w-6 h-5 sm:h-6" />
              Learn More
            </Link>
          </div>

          {/* Premium Stats with Cinematic Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-fade-in mt-20 sm:mt-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group tap-highlight-transparent cinematic-card rounded-2xl p-4 sm:p-6"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full mb-3 group-hover:from-red-500/40 group-hover:to-orange-500/40 transition-all duration-300 shadow-lg">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
