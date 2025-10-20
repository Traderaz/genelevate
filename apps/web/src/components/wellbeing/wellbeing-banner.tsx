'use client';

import { Heart, Brain, MessageCircle, Coins, Shield } from 'lucide-react';

export function WellbeingBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card via-card/95 to-card/80 border border-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Life Skills & Wellbeing
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Develop Essential Life Skills
              </h1>
              <p className="text-lg text-primary font-semibold">
                Build confidence, resilience, and practical skills for life
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Master financial literacy, ethical decision-making, effective communication, 
              and mental wellbeing through interactive, age-appropriate modules designed 
              with safeguarding at the core.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-500" />
                Financial Literacy
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                Ethics & Values
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-purple-500" />
                Communication
              </span>
              <span className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-green-500" />
                Mental Wellbeing
              </span>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-green-500/20 to-background rounded-xl overflow-hidden shadow-netflix p-6">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <Coins className="w-8 h-8 text-yellow-500 mb-2" />
                  <p className="text-xs text-center text-muted-foreground">Financial Skills</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-xs text-center text-muted-foreground">Ethics & Values</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-xs text-center text-muted-foreground">Communication</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <Brain className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-xs text-center text-muted-foreground">Mental Health</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
