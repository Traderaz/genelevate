'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { YEAR_GROUP_OPTIONS, type YearGroup, getYearGroupColor } from '@/types/year-groups';

interface YearGroupSelectorProps {
  selectedYearGroup: YearGroup | null;
  onSelect: (yearGroup: YearGroup) => void;
  label?: string;
  required?: boolean;
}

export function YearGroupSelector({ 
  selectedYearGroup, 
  onSelect, 
  label = 'Select Your Year Group',
  required = false 
}: YearGroupSelectorProps) {
  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {YEAR_GROUP_OPTIONS.map((yearGroup) => {
          const isSelected = selectedYearGroup === yearGroup.id;
          const colorClass = getYearGroupColor(yearGroup.id);
          
          return (
            <button
              key={yearGroup.id}
              type="button"
              onClick={() => onSelect(yearGroup.id)}
              className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? `${colorClass} border-opacity-100 shadow-lg`
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{yearGroup.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{yearGroup.name}</h3>
                    <p className="text-sm text-muted-foreground">{yearGroup.ageRange}</p>
                  </div>
                </div>
                
                <p className="text-sm text-foreground/80">{yearGroup.description}</p>
                
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-semibold text-foreground/70 mb-2">Focus Areas:</p>
                  <ul className="space-y-1">
                    {yearGroup.focusAreas.slice(0, 3).map((area, idx) => (
                      <li key={idx} className="text-xs text-foreground/60 flex items-start gap-1">
                        <span className="text-primary">•</span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

