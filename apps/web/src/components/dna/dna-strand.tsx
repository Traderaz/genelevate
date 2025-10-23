/**
 * DNA Strand Visualization Component
 * 
 * Beautiful 3D-style double helix representation of cognitive profile
 * Each segment represents a cognitive dimension with color coding
 */

'use client';

import { useEffect, useState } from 'react';
import type { CognitiveProfile } from '@gen-elevate/shared/types/dna';

interface DNAStrandProps {
  cognitiveProfile: CognitiveProfile;
}

export function DNAStrand({ cognitiveProfile }: DNAStrandProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Stop animation after 5 seconds to reduce resource usage
    const timer = setTimeout(() => setIsAnimating(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const dimensions = [
    { key: 'visual', label: 'Visual', color: '#3B82F6', emoji: '👁️' },
    { key: 'auditory', label: 'Auditory', color: '#8B5CF6', emoji: '👂' },
    { key: 'kinesthetic', label: 'Kinesthetic', color: '#10B981', emoji: '✋' },
    { key: 'logical', label: 'Logical', color: '#F59E0B', emoji: '🧠' },
    { key: 'creative', label: 'Creative', color: '#EC4899', emoji: '🎨' },
    { key: 'social', label: 'Social', color: '#F97316', emoji: '👥' },
    { key: 'solitary', label: 'Solitary', color: '#6366F1', emoji: '🧘' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border border-purple-500/30 rounded-2xl p-8 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 animate-pulse"></div>

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">Your Learning DNA</h3>
        <p className="text-gray-400">
          Dominant: <span className="text-purple-400 font-semibold capitalize">
            {cognitiveProfile.dominantStyle}
          </span>
          {cognitiveProfile.secondaryStyle && (
            <> • Secondary: <span className="text-blue-400 font-semibold capitalize">
              {cognitiveProfile.secondaryStyle}
            </span></>
          )}
        </p>
      </div>

      {/* DNA Strand Visualization */}
      <div className="relative z-10">
        {/* Desktop View - Full Helix */}
        <div className="hidden md:block">
          <div className="relative h-96 flex items-center justify-center">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-full"
              style={{ transform: isAnimating ? 'none' : 'none' }}
            >
              {/* Draw helix strands */}
              {dimensions.map((dimension, index) => {
                const score = cognitiveProfile[dimension.key as keyof typeof cognitiveProfile] as number;
                const x = (index / (dimensions.length - 1)) * 700 + 50;
                const y1 = 200 + Math.sin((index / dimensions.length) * Math.PI * 4) * 80;
                const y2 = 200 - Math.sin((index / dimensions.length) * Math.PI * 4) * 80;
                const size = (score / 100) * 40 + 20; // Size based on score

                return (
                  <g key={dimension.key}>
                    {/* Connection line */}
                    <line
                      x1={x}
                      y1={y1}
                      x2={x}
                      y2={y2}
                      stroke={dimension.color}
                      strokeWidth="3"
                      opacity="0.6"
                      className={isAnimating ? 'animate-pulse' : ''}
                    />

                    {/* Top node */}
                    <circle
                      cx={x}
                      cy={y1}
                      r={size / 2}
                      fill={dimension.color}
                      opacity="0.9"
                      className="transition-all duration-300 hover:opacity-100 cursor-pointer"
                    />
                    <circle
                      cx={x}
                      cy={y1}
                      r={size / 2 + 5}
                      fill="none"
                      stroke={dimension.color}
                      strokeWidth="2"
                      opacity="0.3"
                      className={isAnimating ? 'animate-ping' : ''}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />

                    {/* Bottom node */}
                    <circle
                      cx={x}
                      cy={y2}
                      r={size / 2}
                      fill={dimension.color}
                      opacity="0.9"
                      className="transition-all duration-300 hover:opacity-100 cursor-pointer"
                    />
                    <circle
                      cx={x}
                      cy={y2}
                      r={size / 2 + 5}
                      fill="none"
                      stroke={dimension.color}
                      strokeWidth="2"
                      opacity="0.3"
                      className={isAnimating ? 'animate-ping' : ''}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />

                    {/* Label */}
                    <text
                      x={x}
                      y={y1 < y2 ? y1 - size : y2 - size}
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      dy="-10"
                    >
                      {dimension.emoji}
                    </text>
                    <text
                      x={x}
                      y={y1 < y2 ? y1 - size : y2 - size}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      dy="-25"
                    >
                      {dimension.label}
                    </text>
                    <text
                      x={x}
                      y={y1 < y2 ? y1 - size : y2 - size}
                      textAnchor="middle"
                      fill={dimension.color}
                      fontSize="14"
                      fontWeight="bold"
                      dy="5"
                    >
                      {score}
                    </text>
                  </g>
                );
              })}

              {/* Helix backbone curves */}
              <path
                d={`M 50 ${200 + Math.sin(0) * 80} ${dimensions.map((_, i) => {
                  const x = (i / (dimensions.length - 1)) * 700 + 50;
                  const y = 200 + Math.sin((i / dimensions.length) * Math.PI * 4) * 80;
                  return `L ${x} ${y}`;
                }).join(' ')}`}
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="4"
                opacity="0.6"
              />
              <path
                d={`M 50 ${200 - Math.sin(0) * 80} ${dimensions.map((_, i) => {
                  const x = (i / (dimensions.length - 1)) * 700 + 50;
                  const y = 200 - Math.sin((i / dimensions.length) * Math.PI * 4) * 80;
                  return `L ${x} ${y}`;
                }).join(' ')}`}
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="4"
                opacity="0.6"
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Mobile View - Simplified */}
        <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
          {dimensions.map((dimension) => {
            const score = cognitiveProfile[dimension.key as keyof typeof cognitiveProfile] as number;
            const isDominant = dimension.key === cognitiveProfile.dominantStyle;
            const isSecondary = dimension.key === cognitiveProfile.secondaryStyle;

            return (
              <div
                key={dimension.key}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-300
                  ${isDominant ? 'border-purple-500 bg-purple-900/30' : 
                    isSecondary ? 'border-blue-500 bg-blue-900/30' : 
                    'border-gray-700 bg-gray-800/30'}
                `}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{dimension.emoji}</div>
                  <div className="text-white font-semibold text-sm mb-1">
                    {dimension.label}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: dimension.color }}
                  >
                    {score}
                  </div>
                  {isDominant && (
                    <div className="absolute top-2 right-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                      ⭐
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="relative z-10 mt-8 pt-6 border-t border-gray-700">
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          {dimensions.map((dimension) => (
            <div key={dimension.key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dimension.color }}
              ></div>
              <span className="text-gray-400">{dimension.emoji} {dimension.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover instruction */}
      <div className="relative z-10 text-center mt-4 text-gray-500 text-sm hidden md:block">
        Node size represents strength • Hover for details
      </div>
    </div>
  );
}

