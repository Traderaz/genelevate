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
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                Essential Life Skills for UK Students
              </h1>
              <TrendingUp className="w-6 h-6 text-teal-gold hidden sm:block" />
            </div>

            <p className="text-lg text-white/95 mb-6 max-w-3xl drop-shadow">
              Learn everything you need to know to thrive in the real world. From understanding UK taxes and mortgages 
              to managing pensions and employment rights, we equip you with essential knowledge tailored to UK laws and regulations.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <span className="text-2xl">🏦</span>
                <span className="text-sm font-medium text-white">UK Financial Literacy</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <span className="text-2xl">🏠</span>
                <span className="text-sm font-medium text-white">Housing & Living</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <span className="text-2xl">💼</span>
                <span className="text-sm font-medium text-white">Employment & Career</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <span className="text-2xl">💪</span>
                <span className="text-sm font-medium text-white">Wellbeing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

