'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { YEAR_GROUP_OPTIONS } from '@/types/year-groups';

export function WebinarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/webinars?${params.toString()}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
          <select 
            className="w-full border border-border bg-background rounded-md px-3 py-2 text-sm text-foreground"
            value={searchParams.get('subject') || ''}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
          >
            <option value="">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
            <option value="careers">Careers</option>
            <option value="wellbeing">Wellbeing</option>
            <option value="life-skills">Life Skills</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Year Group / Stage</label>
          <select 
            className="w-full border border-border bg-background rounded-md px-3 py-2 text-sm text-foreground"
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
          <label className="block text-sm font-medium text-foreground mb-2">Type</label>
          <select 
            className="w-full border border-border bg-background rounded-md px-3 py-2 text-sm text-foreground"
            value={searchParams.get('type') || ''}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="live">Live</option>
            <option value="recorded">Recorded</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Status</label>
          <select 
            className="w-full border border-border bg-background rounded-md px-3 py-2 text-sm text-foreground"
            value={searchParams.get('status') || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="live">Live Now</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>
    </div>
  );
}
