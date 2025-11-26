'use client';
import { Play, BookOpen, Video, Brain, Users, Award, Smartphone, Globe } from 'lucide-react';

export function NetflixFeatures() {

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to <span className="text-brand-gold font-black">Excel</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            From GCSE & A-Level courses to career guidance and AI tutoring, we help you excel academically 
            while discovering the perfect career path with comprehensive life skills and industry insights.
          </p>
        </div>

        {/* Platform Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: 'GCSE & A-Level Courses',
              description: 'Complete curriculum coverage across all GCSE and A-Level subjects with exam-focused content.',
              gradient: 'from-blue-500/10 via-blue-600/5 to-purple-600/10',
              border: 'border-blue-500/30',
              iconBg: 'from-blue-500 to-blue-600',
              iconGlow: 'shadow-blue-500/50'
            },
            {
              icon: Users,
              title: 'Life Skills Training',
              description: 'Essential life skills and personal development to prepare you for the real world.',
              gradient: 'from-purple-500/10 via-purple-600/5 to-pink-600/10',
              border: 'border-purple-500/30',
              iconBg: 'from-purple-500 to-pink-600',
              iconGlow: 'shadow-purple-500/50'
            },
            {
              icon: Globe,
              title: 'Career Explorer',
              description: 'Explore hundreds of career options with detailed insights into each profession and pathway.',
              gradient: 'from-orange-500/10 via-red-600/5 to-pink-600/10',
              border: 'border-orange-500/30',
              iconBg: 'from-orange-500 to-red-600',
              iconGlow: 'shadow-orange-500/50'
            },
            {
              icon: Video,
              title: 'Live Webinars',
              description: 'Weekly interactive sessions with expert tutors and real-time Q&A support.',
              gradient: 'from-cyan-500/10 via-blue-600/5 to-indigo-600/10',
              border: 'border-cyan-500/30',
              iconBg: 'from-cyan-500 to-blue-600',
              iconGlow: 'shadow-cyan-500/50'
            },
            {
              icon: Brain,
              title: '24/7 AI Tutor',
              description: 'Get instant help with homework and study questions anytime from our AI assistant.',
              gradient: 'from-green-500/10 via-emerald-600/5 to-teal-600/10',
              border: 'border-green-500/30',
              iconBg: 'from-green-500 to-emerald-600',
              iconGlow: 'shadow-green-500/50'
            },
            {
              icon: Award,
              title: 'Interview Lab',
              description: 'Practice interview skills with video submissions and receive expert feedback for career success.',
              gradient: 'from-yellow-500/10 via-yellow-600/5 to-amber-600/10',
              border: 'border-yellow-500/30',
              iconBg: 'from-yellow-500 to-amber-600',
              iconGlow: 'shadow-yellow-500/50'
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl teal-card-glass border ${item.border} hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${item.iconBg} rounded-full mb-4 shadow-lg ${item.iconGlow} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-white/80 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
