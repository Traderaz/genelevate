export type YearGroup = 'year-6' | 'year-9-11' | 'year-12-13';

export interface YearGroupInfo {
  id: YearGroup;
  name: string;
  displayName: string;
  description: string;
  ageRange: string;
  stage: string;
  focusAreas: string[];
  emoji: string;
}

export const YEAR_GROUPS: Record<YearGroup, YearGroupInfo> = {
  'year-6': {
    id: 'year-6',
    name: 'Year 6',
    displayName: 'Year 6 (Entrance Prep)',
    description: 'Preparation for secondary school entrance exams and transition',
    ageRange: '10-11 years',
    stage: 'Primary to Secondary Transition',
    focusAreas: [
      '11+ Exam Preparation',
      'Entrance Exam Techniques',
      'Secondary School Transition',
      'Study Skills Foundation',
      'Core Subject Mastery'
    ],
    emoji: '🎒'
  },
  'year-9-11': {
    id: 'year-9-11',
    name: 'Years 9-11',
    displayName: 'Years 9-11 (GCSE)',
    description: 'GCSE preparation and core secondary education',
    ageRange: '13-16 years',
    stage: 'GCSE Level',
    focusAreas: [
      'GCSE Subject Support',
      'Exam Preparation & Techniques',
      'Career Exploration',
      'Options Guidance',
      'University Awareness'
    ],
    emoji: '📚'
  },
  'year-12-13': {
    id: 'year-12-13',
    name: 'Years 12-13',
    displayName: 'Years 12-13 (A-Level & University)',
    description: 'A-Level studies and university preparation',
    ageRange: '16-18 years',
    stage: 'A-Level / Sixth Form',
    focusAreas: [
      'A-Level Subject Support',
      'UCAS Application Support',
      'Personal Statement Guidance',
      'University Selection',
      'Career Planning',
      'Interview Preparation'
    ],
    emoji: '🎓'
  }
};

export const YEAR_GROUP_OPTIONS = Object.values(YEAR_GROUPS);

export function getYearGroupInfo(yearGroup: YearGroup | null | undefined): YearGroupInfo | null {
  if (!yearGroup) return null;
  return YEAR_GROUPS[yearGroup] || null;
}

export function getYearGroupColor(yearGroup: YearGroup): string {
  switch (yearGroup) {
    case 'year-6':
      return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    case 'year-9-11':
      return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
    case 'year-12-13':
      return 'text-pink-500 bg-pink-500/10 border-pink-500/20';
    default:
      return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }
}

