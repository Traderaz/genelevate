'use client';

import { ShoppingBag, FileText, Video, Users, GraduationCap, Sparkles } from 'lucide-react';

export function AddOnsBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card via-card/95 to-card/80 border border-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Premium Services
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Supercharge Your Success
              </h1>
              <p className="text-lg text-primary font-semibold">
                Professional services to accelerate your goals
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Get expert help with CV writing, personal statements, mock interviews, one-on-one 
              tuition, and personalized mentorship. All services are individually priced and 
              delivered by qualified professionals.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                CV & Personal Statements
              </span>
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4 text-green-500" />
                Mock Interviews
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-yellow-500" />
                1-on-1 Tuition
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                Mentorship
              </span>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-background rounded-xl overflow-hidden shadow-netflix p-6">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-xs text-center text-muted-foreground">CV Help</p>
                  <p className="text-sm font-bold text-foreground mt-1">£29.99</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <Video className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-xs text-center text-muted-foreground">Mock Interview</p>
                  <p className="text-sm font-bold text-foreground mt-1">£49.99</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-yellow-500 mb-2" />
                  <p className="text-xs text-center text-muted-foreground">Tuition</p>
                  <p className="text-sm font-bold text-foreground mt-1">£39.99/hr</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                  <Users className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-xs text-center text-muted-foreground">Mentorship</p>
                  <p className="text-sm font-bold text-foreground mt-1">£99.99/mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
