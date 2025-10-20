'use client';

import { Briefcase, TrendingUp, MapPin, Search } from 'lucide-react';

export function CareerBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card via-card/95 to-card/80 border border-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full font-medium">
                  Career Insights
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Updated Daily
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Explore Your Future Career
              </h1>
              <p className="text-lg text-primary font-semibold">
                Discover pathways, industry trends, and opportunities
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Navigate your career journey with real-time industry insights, salary information, 
              and personalized career recommendations based on your interests and skills.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-background rounded-xl overflow-hidden shadow-netflix p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                  <Search className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold">Quick Search</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-card/50 rounded-lg backdrop-blur-sm">
                    <p className="text-sm text-muted-foreground">Popular: Software Engineer</p>
                  </div>
                  <div className="p-3 bg-card/50 rounded-lg backdrop-blur-sm">
                    <p className="text-sm text-muted-foreground">Trending: Data Scientist</p>
                  </div>
                  <div className="p-3 bg-card/50 rounded-lg backdrop-blur-sm">
                    <p className="text-sm text-muted-foreground">Growing: Renewable Energy</p>
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
