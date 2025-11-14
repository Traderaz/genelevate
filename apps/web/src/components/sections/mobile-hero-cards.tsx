'use client';

import { BookOpen, Video, Users, Star, Mic } from 'lucide-react';

export function MobileHeroCards() {
  const stats = [
    { icon: BookOpen, label: 'GCSE & A-Level Courses', value: 'Available' },
    { icon: Video, label: 'Live Webinars', value: 'Weekly' },
    { icon: Users, label: 'Life & Career Skills', value: 'Guidance' },
    { icon: Mic, label: 'Interview Prep', value: 'Public Speaking' },
    { icon: Star, label: 'AI Learning Assistant', value: '24/7' },
  ];

  const cardStyles = [
    { 
      gradient: 'from-blue-500/10 via-blue-600/5 to-purple-600/10',
      border: 'border-blue-500/30',
      iconBg: 'from-blue-500 to-blue-600',
      iconGlow: 'shadow-blue-500/50',
      textColor: 'text-blue-400',
    },
    { 
      gradient: 'from-purple-500/10 via-purple-600/5 to-pink-600/10',
      border: 'border-purple-500/30',
      iconBg: 'from-purple-500 to-pink-600',
      iconGlow: 'shadow-purple-500/50',
      textColor: 'text-purple-400',
    },
    { 
      gradient: 'from-orange-500/10 via-red-600/5 to-pink-600/10',
      border: 'border-orange-500/30',
      iconBg: 'from-orange-500 to-red-600',
      iconGlow: 'shadow-orange-500/50',
      textColor: 'text-orange-400',
    },
    { 
      gradient: 'from-yellow-500/10 via-yellow-600/5 to-amber-600/10',
      border: 'border-yellow-500/30',
      iconBg: 'from-yellow-500 to-amber-600',
      iconGlow: 'shadow-yellow-500/50',
      textColor: 'text-yellow-400',
    },
    { 
      gradient: 'from-green-500/10 via-emerald-600/5 to-teal-600/10',
      border: 'border-green-500/30',
      iconBg: 'from-green-500 to-emerald-600',
      iconGlow: 'shadow-green-500/50',
      textColor: 'text-green-400',
    }
  ];

  return (
    <section className="sm:hidden py-8 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          {stats.map((stat, index) => {
            const style = cardStyles[index];
            
            return (
              <div
                key={stat.label}
                className={`text-center group tap-highlight-transparent backdrop-blur-sm bg-gradient-to-br ${style.gradient} border ${style.border} rounded-xl p-3 hover:scale-105 transition-all duration-300 hover:shadow-xl ${index === 4 ? 'col-span-2' : ''}`}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${style.iconBg} rounded-full mb-2 transition-all duration-300 shadow-lg ${style.iconGlow} group-hover:scale-110`}>
                  <stat.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className={`text-lg font-bold text-white mb-0.5 ${style.textColor} transition-colors duration-300 drop-shadow-lg`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-300 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

