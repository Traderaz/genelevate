'use client';

import { Filter } from 'lucide-react';
import { YEAR_GROUP_OPTIONS, type YearGroup, getYearGroupColor } from '@/types/year-groups';

interface YearGroupFilterProps {
  selectedYearGroup: YearGroup | 'all';
  onFilterChange: (yearGroup: YearGroup | 'all') => void;
  showAllOption?: boolean;
}

export function YearGroupFilter({ 
  selectedYearGroup, 
  onFilterChange,
  showAllOption = true 
}: YearGroupFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
        <Filter className="w-4 h-4" />
        <span>Filter by Year:</span>
      </div>
      
      {showAllOption && (
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedYearGroup === 'all'
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-card border border-border hover:border-primary/50 text-foreground/80'
          }`}
        >
          All Years
        </button>
      )}
      
      {YEAR_GROUP_OPTIONS.map((yearGroup) => {
        const isSelected = selectedYearGroup === yearGroup.id;
        const colorClass = getYearGroupColor(yearGroup.id);
        
        return (
          <button
            key={yearGroup.id}
            onClick={() => onFilterChange(yearGroup.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              isSelected
                ? `${colorClass} shadow-lg`
                : 'bg-card border-border hover:border-primary/50 text-foreground/80'
            }`}
          >
            <span className="mr-2">{yearGroup.emoji}</span>
            {yearGroup.name}
          </button>
        );
      })}
    </div>
  );
}

