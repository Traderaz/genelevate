/**
 * Subject Affinity Chips Component
 * 
 * Displays subject affinities as interactive chips
 * Size based on affinity score, color based on performance
 */

'use client';

import { useState } from 'react';
import { TrendingUp, Target, Zap } from 'lucide-react';
import type { SubjectAffinity } from '@gen-elevate/shared/types/dna';

interface SubjectAffinityChipsProps {
  subjectAffinities: Record<string, SubjectAffinity>;
}

export function SubjectAffinityChips({ subjectAffinities }: SubjectAffinityChipsProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const sortedSubjects = Object.entries(subjectAffinities)
    .sort(([, a], [, b]) => b.affinity - a.affinity);

  const getAffinitySize = (affinity: number): string => {
    if (affinity >= 90) return 'text-3xl px-8 py-4';
    if (affinity >= 75) return 'text-2xl px-6 py-3';
    if (affinity >= 60) return 'text-xl px-5 py-2.5';
    return 'text-base px-4 py-2';
  };

  const getPerformanceColor = (performance: number): string => {
    if (performance >= 85) return 'from-green-600 to-green-700 border-green-500';
    if (performance >= 70) return 'from-blue-600 to-blue-700 border-blue-500';
    if (performance >= 55) return 'from-yellow-600 to-yellow-700 border-yellow-500';
    return 'from-orange-600 to-orange-700 border-orange-500';
  };

  const getSubjectIcon = (subject: string): string => {
    const lowerSubject = subject.toLowerCase();
    if (lowerSubject.includes('math')) return '🔢';
    if (lowerSubject.includes('science') || lowerSubject.includes('physics') || lowerSubject.includes('chemistry') || lowerSubject.includes('biology')) return '🔬';
    if (lowerSubject.includes('english') || lowerSubject.includes('literature')) return '📚';
    if (lowerSubject.includes('history')) return '📜';
    if (lowerSubject.includes('geography')) return '🌍';
    if (lowerSubject.includes('art')) return '🎨';
    if (lowerSubject.includes('music')) return '🎵';
    if (lowerSubject.includes('computer') || lowerSubject.includes('coding')) return '💻';
    if (lowerSubject.includes('language')) return '🗣️';
    return '📖';
  };

  return (
    <div className="space-y-6">
      {/* Chips Cloud */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Subject Affinities</h3>
          <p className="text-gray-400 mb-6">Your natural inclination towards different subjects</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center min-h-[300px]">
          {sortedSubjects.map(([subject, data]) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
              className={`
                ${getAffinitySize(data.affinity)}
                ${selectedSubject === subject ? 'scale-110 ring-4 ring-white/50' : 'hover:scale-105'}
                bg-gradient-to-br ${getPerformanceColor(data.performance)}
                border-2
                rounded-2xl
                font-bold
                text-white
                shadow-lg
                transition-all
                duration-300
                cursor-pointer
                relative
                overflow-hidden
                group
              `}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-2xl">{getSubjectIcon(subject)}</span>
                {subject}
              </span>
              
              {/* Badge */}
              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs">
                {data.affinity}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed View */}
      {selectedSubject && (
        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">{getSubjectIcon(selectedSubject)}</span>
              {selectedSubject}
            </h3>
            <button
              onClick={() => setSelectedSubject(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Affinity</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {subjectAffinities[selectedSubject].affinity}
              </div>
              <p className="text-sm text-gray-400 mt-1">Natural inclination</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Performance</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {subjectAffinities[selectedSubject].performance}
              </div>
              <p className="text-sm text-gray-400 mt-1">Average score</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Engagement</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {subjectAffinities[selectedSubject].engagement}
              </div>
              <p className="text-sm text-gray-400 mt-1">Time & effort</p>
            </div>
          </div>

          {/* Visual bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Affinity</span>
                <span>{subjectAffinities[selectedSubject].affinity}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${subjectAffinities[selectedSubject].affinity}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Performance</span>
                <span>{subjectAffinities[selectedSubject].performance}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${subjectAffinities[selectedSubject].performance}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Engagement</span>
                <span>{subjectAffinities[selectedSubject].engagement}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all duration-500"
                  style={{ width: `${subjectAffinities[selectedSubject].engagement}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6 bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              💡 Personalized Tip
            </h4>
            <p className="text-gray-300 text-sm">
              {getRecommendation(
                selectedSubject,
                subjectAffinities[selectedSubject].affinity,
                subjectAffinities[selectedSubject].performance,
                subjectAffinities[selectedSubject].engagement
              )}
            </p>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">Top Subject</h4>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <span>{getSubjectIcon(sortedSubjects[0][0])}</span>
            {sortedSubjects[0][0]}
          </div>
          <div className="text-purple-400 font-medium mt-1">
            {sortedSubjects[0][1].affinity} affinity
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">Best Performance</h4>
          <div className="text-2xl font-bold text-white">
            {Math.max(...Object.values(subjectAffinities).map(s => s.performance))}%
          </div>
          <div className="text-green-400 font-medium mt-1">
            {Object.entries(subjectAffinities)
              .sort(([, a], [, b]) => b.performance - a.performance)[0][0]}
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">Most Engaged</h4>
          <div className="text-2xl font-bold text-white">
            {Math.max(...Object.values(subjectAffinities).map(s => s.engagement))}%
          </div>
          <div className="text-yellow-400 font-medium mt-1">
            {Object.entries(subjectAffinities)
              .sort(([, a], [, b]) => b.engagement - a.engagement)[0][0]}
          </div>
        </div>
      </div>
    </div>
  );
}

function getRecommendation(
  subject: string,
  affinity: number,
  performance: number,
  engagement: number
): string {
  // High affinity, high performance
  if (affinity >= 80 && performance >= 80) {
    return `${subject} is clearly a strength! Consider taking advanced courses or exploring careers in this field.`;
  }
  
  // High affinity, lower performance
  if (affinity >= 70 && performance < 70) {
    return `You're passionate about ${subject}! Focus on study techniques to match your enthusiasm with stronger results.`;
  }
  
  // High performance, lower engagement
  if (performance >= 80 && engagement < 60) {
    return `You excel at ${subject} but could engage more. Try finding aspects that genuinely interest you to maintain motivation.`;
  }
  
  // Balanced but room for growth
  if (affinity >= 60 && performance >= 60 && engagement >= 60) {
    return `You're doing well in ${subject}. Consistent practice and exploring advanced topics could take you to the next level.`;
  }
  
  // Lower scores
  if (affinity < 50 || performance < 50) {
    return `${subject} might be challenging right now. Consider different study approaches or seek additional support to build confidence.`;
  }
  
  return `Keep up the good work in ${subject}! Consistency and curiosity will help you continue to improve.`;
}

