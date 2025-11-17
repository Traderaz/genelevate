'use client';

import { Briefcase, TrendingUp, MapPin, Search } from 'lucide-react';

export function CareerBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl teal-card-glass border border-white/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-primary/10 via-transparent to-teal-gold/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-primary/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="px-3 py-1 bg-teal-gold text-teal-card-text rounded-full font-bold shadow-md">
                  Career Insights
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-teal-gold" />
                  Updated Daily
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Explore Your Future Career
              </h1>
              <p className="text-lg text-teal-gold font-semibold">
                Discover pathways, industry trends, and opportunities
              </p>
            </div>

            <p className="text-white/90 text-lg leading-relaxed">
              Navigate your career journey with real-time industry insights, salary information, 
              and personalized career recommendations based on your interests and skills.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                500+ Career Paths
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Global Opportunities
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Live Industry Data
              </span>
            </div>
          </div>

          {/* Search Preview */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-teal-primary/20 to-white/5 rounded-xl overflow-hidden shadow-xl p-6 border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <Search className="w-5 h-5 text-teal-gold" />
                  <span className="text-lg font-semibold">Quick Search</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="text-sm text-white/80">Popular: Software Engineer</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="text-sm text-white/80">Trending: Data Scientist</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="text-sm text-white/80">Growing: Renewable Energy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
