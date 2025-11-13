/**
 * UK Education Grade System Types
 * Supports GCSE (9-1) and A-Level (A*-E) grading systems
 */

export type GCSEGrade = '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1' | 'U';
export type ALevelGrade = 'A*' | 'A' | 'B' | 'C' | 'D' | 'E' | 'U';
export type Grade = GCSEGrade | ALevelGrade;

export type QualificationLevel = 'GCSE' | 'A-Level' | 'BTEC' | 'Other';

export type CoreSubject = 
  | 'Mathematics'
  | 'English Language'
  | 'English Literature'
  | 'Science (Combined)'
  | 'Biology'
  | 'Chemistry'
  | 'Physics';

export type Subject = CoreSubject | string; // Allow custom subjects

export interface SubjectGrade {
  subject: Subject;
  level: QualificationLevel;
  currentGrade?: Grade;
  targetGrade?: Grade;
  predictedGrade?: Grade;
  examBoard?: string;
  yearGroup?: number; // 7-13
  term?: 'Autumn' | 'Spring' | 'Summer';
  lastUpdated: Date;
  notes?: string;
}

export interface GradeHistory {
  id: string;
  subjectGrade: SubjectGrade;
  previousGrade?: Grade;
  newGrade: Grade;
  updatedAt: Date;
  updatedBy: 'student' | 'teacher' | 'system';
  reason?: string;
}

export interface StudentGrades {
  userId: string;
  subjects: SubjectGrade[];
  yearGroup: number;
  academicYear: string; // e.g., "2024-2025"
  lastUpdated: Date;
  gradeHistory: GradeHistory[];
}

export interface GradeStats {
  averageGrade: number; // Numeric representation
  totalSubjects: number;
  onTargetCount: number;
  aboveTargetCount: number;
  belowTargetCount: number;
  improvementTrend: 'improving' | 'stable' | 'declining';
}

// Grade conversion utilities
export const GRADE_VALUES: Record<Grade, number> = {
  // GCSE
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  '1': 1,
  'U': 0,
  // A-Level
  'A*': 10,
  'A': 9,
  'B': 7,
  'C': 5,
  'D': 3,
  'E': 1,
};

export const GCSE_GRADES: GCSEGrade[] = ['9', '8', '7', '6', '5', '4', '3', '2', '1', 'U'];
export const A_LEVEL_GRADES: ALevelGrade[] = ['A*', 'A', 'B', 'C', 'D', 'E', 'U'];

export const CORE_SUBJECTS: CoreSubject[] = [
  'Mathematics',
  'English Language',
  'English Literature',
  'Science (Combined)',
  'Biology',
  'Chemistry',
  'Physics',
];

export const COMMON_SUBJECTS: string[] = [
  ...CORE_SUBJECTS,
  'History',
  'Geography',
  'French',
  'Spanish',
  'German',
  'Computer Science',
  'Business Studies',
  'Economics',
  'Art & Design',
  'Music',
  'Drama',
  'PE',
  'Religious Studies',
  'Sociology',
  'Psychology',
  'Media Studies',
];

