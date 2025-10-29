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
    { icon: Users, label: 'Active Students', value: '50K+' },
    { icon: BookOpen, label: 'Courses Available', value: '500+' },
    { icon: Video, label: 'Live Webinars', value: '100+' },
    { icon: Star, label: 'Average Rating', value: '4.9' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-14 sm:pt-16">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      
      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40"></div>
      
      {/* Netflix Red Accent Glow - Smaller on mobile */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 sm:pt-20 pb-16 sm:pb-32 safe-area-bottom">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-fade-in">
            <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
            <span className="hidden xs:inline">Trusted by 50,000+ students worldwide</span>
            <span className="xs:hidden">50K+ students trust us</span>
          </div>

          {/* Main Heading - Netflix Style - Mobile Optimized */}
          <h1 className="font-display font-extrabold mb-8 sm:mb-12 animate-fade-in leading-tight">
            <span className="block mobile-heading-xl text-foreground mb-3 sm:mb-4 tracking-tight pb-2">
              Elevate Your
            </span>
            <span className="block text-4xl xs:text-5xl sm:text-7xl lg:text-8xl xl:text-9xl netflix-text-gradient tracking-tight pb-4">
              Learning Journey
            </span>
          </h1>

          {/* Subtitle - Netflix Style - Mobile Optimized */}
          <p className="mobile-text-lg text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in font-light">
            Join the global learning revolution. Access premium courses, live webinars, 
            and AI-powered personalized learning for students from Year 6 to A-Level.
          </p>

          {/* Netflix-style Email Signup - Mobile Optimized */}
          <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto mb-12 sm:mb-16 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg rounded-md bg-card/50 backdrop-blur-sm border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 min-h-touch"
                required
              />
              <button
                type="submit"
                className="px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg rounded-md netflix-button flex items-center justify-center gap-2 sm:gap-3 min-w-fit min-h-touch tap-highlight-transparent"
              >
                Get Started
                <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>
            <p className="text-muted-foreground mt-3 sm:mt-4 text-center text-sm sm:text-base">
              Ready to learn? Enter your email to get started with your subscription.
            </p>
          </form>

          {/* Netflix-style Action Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20 animate-fade-in">
            <Link
              href="/courses"
              className="group flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 bg-secondary text-secondary-foreground font-bold text-base sm:text-lg rounded-md netflix-button hover:bg-secondary/90 transition-all duration-300 shadow-netflix min-h-touch tap-highlight-transparent"
            >
              <Play className="w-5 sm:w-6 h-5 sm:h-6 group-hover:scale-110 transition-transform" />
              Explore Courses
            </Link>
            <Link
              href="#features"
              className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 border-2 border-border text-foreground font-bold text-base sm:text-lg rounded-md netflix-button hover:border-primary hover:bg-card/50 transition-all duration-300 min-h-touch tap-highlight-transparent"
            >
              <Info className="w-5 sm:w-6 h-5 sm:h-6" />
              Learn More
            </Link>
          </div>

          {/* Netflix-style Stats - Mobile Optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 animate-fade-in">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group tap-highlight-transparent"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full mb-3 sm:mb-4 group-hover:bg-primary/30 transition-all duration-300">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Netflix-style Scroll Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce safe-area-bottom">
        <div className="w-8 h-12 border-2 border-muted-foreground/40 rounded-full flex justify-center cursor-pointer hover:border-primary transition-colors duration-300">
          <div className="w-1.5 h-4 bg-muted-foreground/60 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
