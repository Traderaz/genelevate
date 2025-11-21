'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { YEAR_GROUP_OPTIONS } from '@/types/year-groups';

export function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 when filters change
    params.delete('page');
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <div className="teal-card rounded-lg p-6">
      <h3 className="text-lg font-semibold text-teal-card-text mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-teal-card-text mb-2">Subject</label>
          <select 
            className="w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm text-teal-card-text focus:ring-2 focus:ring-teal-gold focus:border-transparent"
            value={searchParams.get('subject') || ''}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Modern Languages">Modern Languages</option>
            <option value="Life Skills">Life Skills</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-teal-card-text mb-2">Year Group / Stage</label>
          <select 
            className="w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm text-teal-card-text focus:ring-2 focus:ring-teal-gold focus:border-transparent"
            value={searchParams.get('yearGroup') || ''}
            onChange={(e) => handleFilterChange('yearGroup', e.target.value)}
          >
            <option value="">All Year Groups</option>
            {YEAR_GROUP_OPTIONS.map((yearGroup) => (
              <option key={yearGroup.id} value={yearGroup.id}>
                {yearGroup.emoji} {yearGroup.displayName}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-teal-card-text mb-2">Difficulty</label>
          <select 
            className="w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm text-teal-card-text focus:ring-2 focus:ring-teal-gold focus:border-transparent"
            value={searchParams.get('difficulty') || ''}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-card-text mb-2">Status</label>
          <select 
            className="w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm text-teal-card-text focus:ring-2 focus:ring-teal-gold focus:border-transparent"
            value={searchParams.get('status') || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Courses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="not-started">Not Started</option>
          </select>
        </div>
      </div>
    </div>
  );
}
