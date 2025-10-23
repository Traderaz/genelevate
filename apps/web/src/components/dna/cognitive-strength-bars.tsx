/**
 * Cognitive Strength Bars Component
 * 
 * Visualizes the 7 cognitive dimensions as animated horizontal bar charts
 */

'use client';

import { useEffect, useState } from 'react';
import type { CognitiveProfile } from '@gen-elevate/shared/types/dna';

interface CognitiveStrengthBarsProps {
  cognitiveProfile: CognitiveProfile;
}

export function CognitiveStrengthBars({ cognitiveProfile }: CognitiveStrengthBarsProps) {
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>({});

  useEffect(() => {
    // Animate bars on mount
    const dimensions = ['visual', 'auditory', 'kinesthetic', 'logical', 'creative', 'social', 'solitary'];
    
    dimensions.forEach((dim, index) => {
      setTimeout(() => {
        setAnimatedScores(prev => ({
          ...prev,
          [dim]: cognitiveProfile[dim as keyof typeof cognitiveProfile] as number,
        }));
      }, index * 100);
    });
  }, [cognitiveProfile]);

  const dimensions = [
    {
      key: 'visual',
      label: 'Visual',
      icon: '👁️',
      description: 'Learning through images and spatial understanding',
      color: 'from-blue-500 to-blue-600',
    },
    {
      key: 'auditory',
      label: 'Auditory',
      icon: '👂',
      description: 'Learning through sound and verbal instruction',
      color: 'from-purple-500 to-purple-600',
    },
    {
      key: 'kinesthetic',
      label: 'Kinesthetic',
      icon: '✋',
      description: 'Learning through hands-on practice',
      color: 'from-green-500 to-green-600',
    },
    {
      key: 'logical',
      label: 'Logical',
      icon: '🧠',
      description: 'Learning through analysis and patterns',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      key: 'creative',
      label: 'Creative',
      icon: '🎨',
      description: 'Learning through imagination and innovation',
      color: 'from-pink-500 to-pink-600',
    },
    {
      key: 'social',
      label: 'Social',
      icon: '👥',
      description: 'Learning through collaboration and discussion',
      color: 'from-orange-500 to-orange-600',
    },
    {
      key: 'solitary',
      label: 'Solitary',
      icon: '🧘',
      description: 'Learning through independent study',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const getStrengthLabel = (score: number): string => {
    if (score >= 80) return 'Very Strong';
    if (score >= 60) return 'Strong';
    if (score >= 40) return 'Moderate';
    return 'Developing';
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Cognitive Strengths</h3>
        <p className="text-gray-400">Your learning style across 7 dimensions</p>
      </div>

      <div className="space-y-5">
        {dimensions.map((dimension) => {
          const score = cognitiveProfile[dimension.key as keyof typeof cognitiveProfile] as number;
          const animatedScore = animatedScores[dimension.key] || 0;
          const isDominant = dimension.key === cognitiveProfile.dominantStyle;
          const isSecondary = dimension.key === cognitiveProfile.secondaryStyle;

          return (
            <div
              key={dimension.key}
              className={`group ${isDominant || isSecondary ? 'p-4 bg-gradient-to-r from-purple-900/20 to-transparent rounded-lg border border-purple-500/30' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dimension.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{dimension.label}</span>
                      {isDominant && (
                        <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                          Dominant
                        </span>
                      )}
                      {isSecondary && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          Secondary
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{dimension.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{score}</div>
                  <div className="text-xs text-gray-400">{getStrengthLabel(score)}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${dimension.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${animatedScore}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
                
                {/* Threshold markers */}
                <div className="absolute inset-y-0 left-1/4 w-px bg-gray-600"></div>
                <div className="absolute inset-y-0 left-1/2 w-px bg-gray-600"></div>
                <div className="absolute inset-y-0 left-3/4 w-px bg-gray-600"></div>
              </div>

              {/* Detailed Info on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 text-sm text-gray-300">
                {score >= 80 && (
                  <p>💪 This is one of your strongest areas. Leverage this in your studies!</p>
                )}
                {score < 40 && (
                  <p>🌱 This area is developing. Consider activities to strengthen it.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-gray-700 flex flex-wrap gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-700 rounded"></div>
          <span>0-40: Developing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>40-60: Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>60-80: Strong</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span>80-100: Very Strong</span>
        </div>
      </div>
    </div>
  );
}

