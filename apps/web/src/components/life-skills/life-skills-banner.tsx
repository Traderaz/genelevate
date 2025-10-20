'use client';

import { GraduationCap, TrendingUp } from 'lucide-react';

export function LifeSkillsBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-500/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative p-8 md:p-12">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div className="hidden sm:flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Life Skills Development
              </h1>
              <TrendingUp className="w-6 h-6 text-blue-500 hidden sm:block" />
            </div>

            <p className="text-lg text-foreground/80 mb-6 max-w-3xl">
              Master essential life skills including financial literacy, ethical decision-making, 
              effective communication, and professional development. Each module is designed to 
              prepare you for real-world success.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <span className="text-2xl">💰</span>
                <span className="text-sm font-medium text-foreground/90">Financial Literacy</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <span className="text-2xl">🤝</span>
                <span className="text-sm font-medium text-foreground/90">Ethics & Values</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <span className="text-2xl">💬</span>
                <span className="text-sm font-medium text-foreground/90">Communication</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-2xl">🎯</span>
                <span className="text-sm font-medium text-foreground/90">Professional Skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

