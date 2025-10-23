/**
 * Learning Heatmap Component
 * 
 * 24x7 grid showing when the student is most active
 * Color intensity represents engagement level
 */

'use client';

import { useMemo } from 'react';
import type { LearningPatterns } from '@gen-elevate/shared/types/dna';

interface LearningHeatmapProps {
  patterns: LearningPatterns;
}

export function LearningHeatmap({ patterns }: LearningHeatmapProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Generate heatmap data (in production, this would come from actual signals)
  const heatmapData = useMemo(() => {
    const data: number[][] = [];
    
    for (let day = 0; day < 7; day++) {
      const dayData: number[] = [];
      for (let hour = 0; hour < 24; hour++) {
        // Mock intensity based on peak hours and preferred days
        let intensity = Math.random() * 30; // Base random activity
        
        // Boost for peak hours
        if (patterns.peakHours.includes(hour)) {
          intensity += 50;
        }
        
        // Boost for preferred days
        const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][day];
        if (patterns.preferredDayOfWeek.includes(dayName)) {
          intensity += 30;
        }
        
        // Lower activity during typical sleep hours
        if (hour >= 0 && hour <= 6) {
          intensity = Math.min(intensity, 20);
        }
        
        // Cap at 100
        intensity = Math.min(100, intensity);
        
        dayData.push(Math.round(intensity));
      }
      data.push(dayData);
    }
    
    return data;
  }, [patterns]);

  const getIntensityColor = (intensity: number): string => {
    if (intensity === 0) return 'bg-gray-800';
    if (intensity < 20) return 'bg-blue-900/30';
    if (intensity < 40) return 'bg-blue-800/50';
    if (intensity < 60) return 'bg-blue-600/60';
    if (intensity < 80) return 'bg-purple-500/70';
    return 'bg-purple-400';
  };

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12a';
    if (hour < 12) return `${hour}a`;
    if (hour === 12) return '12p';
    return `${hour - 12}p`;
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Learning Activity Heatmap</h3>
        <p className="text-gray-400">When you're most engaged (past 30 days)</p>
      </div>

      {/* Desktop Heatmap */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Hour labels */}
          <div className="flex mb-2">
            <div className="w-16"></div> {/* Spacer for day labels */}
            {hours.filter(h => h % 3 === 0).map((hour) => (
              <div key={hour} className="flex-1 text-center text-xs text-gray-400 min-w-[60px]" style={{ marginLeft: hour === 0 ? 0 : '8px' }}>
                {formatHour(hour)}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {days.map((day, dayIndex) => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-16 text-sm text-gray-400 font-medium">{day}</div>
              <div className="flex gap-1 flex-1">
                {hours.map((hour) => {
                  const intensity = heatmapData[dayIndex][hour];
                  const isPeak = patterns.peakHours.includes(hour);
                  
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`group relative h-8 flex-1 rounded ${getIntensityColor(intensity)} transition-all duration-200 hover:ring-2 hover:ring-white/50 cursor-pointer`}
                      title={`${day} ${formatHour(hour)}: ${intensity}% active`}
                    >
                      {isPeak && (
                        <div className="absolute inset-0 border-2 border-yellow-400 rounded animate-pulse"></div>
                      )}
                      
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap pointer-events-none z-10 transition-opacity">
                        {day} {formatHour(hour)}<br />
                        {intensity}% active
                        {isPeak && <><br />⭐ Peak hour</>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Simplified View */}
      <div className="lg:hidden space-y-4">
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-purple-300 mb-2">Your Peak Learning Hours</h4>
          <div className="flex flex-wrap gap-2">
            {patterns.peakHours.map((hour) => (
              <span
                key={hour}
                className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium"
              >
                {formatHour(hour)}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">Your Best Days</h4>
          <div className="flex flex-wrap gap-2">
            {patterns.preferredDayOfWeek.map((day) => (
              <span
                key={day}
                className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-800 rounded"></div>
            <div className="w-4 h-4 bg-blue-900/30 rounded"></div>
            <div className="w-4 h-4 bg-blue-800/50 rounded"></div>
            <div className="w-4 h-4 bg-blue-600/60 rounded"></div>
            <div className="w-4 h-4 bg-purple-500/70 rounded"></div>
            <div className="w-4 h-4 bg-purple-400 rounded"></div>
          </div>
          <span>More</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-3 h-3 border-2 border-yellow-400 rounded"></div>
          <span>Peak hours</span>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
          💡 Insight
        </h4>
        <p className="text-gray-300 text-sm">
          You're most productive during {patterns.peakHours.map(h => formatHour(h)).join(', ')}. 
          Schedule your most challenging study sessions during these peak hours for maximum effectiveness!
        </p>
      </div>
    </div>
  );
}

