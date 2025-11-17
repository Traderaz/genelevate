'use client';

import { Heart, Brain, MessageCircle, Coins, Shield } from 'lucide-react';

export function WellbeingBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl teal-card-glass border-2 border-white/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-gold/10 via-transparent to-teal-primary/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-gold/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-teal-gold/20 text-teal-gold rounded-full font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Life Skills & Wellbeing
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Develop Essential Life Skills
              </h1>
              <p className="text-lg text-teal-gold font-semibold">
                Build confidence, resilience, and practical skills for life
              </p>
            </div>

            <p className="text-white/90 text-lg leading-relaxed">
              Master financial literacy, ethical decision-making, effective communication, 
              and mental wellbeing through interactive, age-appropriate modules designed 
              with safeguarding at the core.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-teal-gold" />
                Financial Literacy
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-gold" />
                Ethics & Values
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-teal-gold" />
                Communication
              </span>
              <span className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-teal-gold" />
                Mental Wellbeing
              </span>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <Coins className="w-8 h-8 text-teal-gold mb-2" />
                  <p className="text-xs text-center text-white font-medium">Financial Skills</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <Shield className="w-8 h-8 text-teal-gold mb-2" />
                  <p className="text-xs text-center text-white font-medium">Ethics & Values</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-teal-gold mb-2" />
                  <p className="text-xs text-center text-white font-medium">Communication</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <Brain className="w-8 h-8 text-teal-gold mb-2" />
                  <p className="text-xs text-center text-white font-medium">Mental Health</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
