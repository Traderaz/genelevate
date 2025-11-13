import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import type { SubjectGrade, StudentGrades, GradeHistory, GradeStats, Grade } from '@/types/grades';
import { GRADE_VALUES } from '@/types/grades';

/**
 * Get student grades
 */
export async function getStudentGrades(userId: string): Promise<StudentGrades | null> {
  try {
    const gradesRef = doc(db, 'studentGrades', userId);
    const gradesSnap = await getDoc(gradesRef);

    if (!gradesSnap.exists()) {
      return null;
    }

    const data = gradesSnap.data();
    return {
      ...data,
      lastUpdated: data.lastUpdated?.toDate() || new Date(),
      subjects: data.subjects?.map((subject: any) => ({
        ...subject,
        lastUpdated: subject.lastUpdated?.toDate() || new Date(),
      })) || [],
      gradeHistory: data.gradeHistory?.map((history: any) => ({
        ...history,
        updatedAt: history.updatedAt?.toDate() || new Date(),
        subjectGrade: {
          ...history.subjectGrade,
          lastUpdated: history.subjectGrade.lastUpdated?.toDate() || new Date(),
        },
      })) || [],
    } as StudentGrades;
  } catch (error) {
    console.error('Error fetching student grades:', error);
    return null;
  }
}

/**
 * Initialize student grades (during onboarding)
 */
export async function initializeStudentGrades(
  userId: string,
  subjects: SubjectGrade[],
  yearGroup: number,
  academicYear: string
): Promise<void> {
  try {
    const gradesRef = doc(db, 'studentGrades', userId);
    
    const studentGrades: StudentGrades = {
      userId,
      subjects,
      yearGroup,
      academicYear,
      lastUpdated: new Date(),
      gradeHistory: [],
    };

    await setDoc(gradesRef, {
      ...studentGrades,
      lastUpdated: serverTimestamp(),
      subjects: subjects.map(subject => ({
        ...subject,
        lastUpdated: serverTimestamp(),
      })),
    });
  } catch (error) {
    console.error('Error initializing student grades:', error);
    throw error;
  }
}

/**
 * Update a subject grade
 */
export async function updateSubjectGrade(
  userId: string,
  subject: string,
  newGrade: Grade,
  updatedBy: 'student' | 'teacher' | 'system' = 'student',
  reason?: string
): Promise<void> {
  try {
    const gradesRef = doc(db, 'studentGrades', userId);
    const gradesSnap = await getDoc(gradesRef);

    if (!gradesSnap.exists()) {
      throw new Error('Student grades not found');
    }

    const currentData = gradesSnap.data() as StudentGrades;
    const subjectIndex = currentData.subjects.findIndex(s => s.subject === subject);

    if (subjectIndex === -1) {
      throw new Error('Subject not found');
    }

    const oldSubject = currentData.subjects[subjectIndex];
    const previousGrade = oldSubject.currentGrade;

    // Update the subject grade
    const updatedSubjects = [...currentData.subjects];
    updatedSubjects[subjectIndex] = {
      ...oldSubject,
      currentGrade: newGrade,
      lastUpdated: new Date(),
    };

    // Create history entry
    const historyEntry: GradeHistory = {
      id: `${Date.now()}-${subject}`,
      subjectGrade: updatedSubjects[subjectIndex],
      previousGrade,
      newGrade,
      updatedAt: new Date(),
      updatedBy,
      reason,
    };

    await updateDoc(gradesRef, {
      subjects: updatedSubjects.map(s => ({
        ...s,
        lastUpdated: serverTimestamp(),
      })),
      lastUpdated: serverTimestamp(),
      gradeHistory: arrayUnion({
        ...historyEntry,
        updatedAt: serverTimestamp(),
        subjectGrade: {
          ...historyEntry.subjectGrade,
          lastUpdated: serverTimestamp(),
        },
      }),
    });
  } catch (error) {
    console.error('Error updating subject grade:', error);
    throw error;
  }
}

/**
 * Add a new subject to track
 */
export async function addSubject(
  userId: string,
  subjectGrade: SubjectGrade
): Promise<void> {
  try {
    const gradesRef = doc(db, 'studentGrades', userId);
    const gradesSnap = await getDoc(gradesRef);

    if (!gradesSnap.exists()) {
      throw new Error('Student grades not found');
    }

    const currentData = gradesSnap.data() as StudentGrades;
    
    // Check if subject already exists
    if (currentData.subjects.some(s => s.subject === subjectGrade.subject)) {
      throw new Error('Subject already exists');
    }

    await updateDoc(gradesRef, {
      subjects: arrayUnion({
        ...subjectGrade,
        lastUpdated: serverTimestamp(),
      }),
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding subject:', error);
    throw error;
  }
}

/**
 * Remove a subject
 */
export async function removeSubject(
  userId: string,
  subject: string
): Promise<void> {
  try {
    const gradesRef = doc(db, 'studentGrades', userId);
    const gradesSnap = await getDoc(gradesRef);

    if (!gradesSnap.exists()) {
      throw new Error('Student grades not found');
    }

    const currentData = gradesSnap.data() as StudentGrades;
    const updatedSubjects = currentData.subjects.filter(s => s.subject !== subject);

    await updateDoc(gradesRef, {
      subjects: updatedSubjects.map(s => ({
        ...s,
        lastUpdated: serverTimestamp(),
      })),
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error removing subject:', error);
    throw error;
  }
}

/**
 * Calculate grade statistics
 */
export function calculateGradeStats(subjects: SubjectGrade[]): GradeStats {
  const subjectsWithGrades = subjects.filter(s => s.currentGrade);
  
  if (subjectsWithGrades.length === 0) {
    return {
      averageGrade: 0,
      totalSubjects: subjects.length,
      onTargetCount: 0,
      aboveTargetCount: 0,
      belowTargetCount: 0,
      improvementTrend: 'stable',
    };
  }

  // Calculate average grade
  const totalGradeValue = subjectsWithGrades.reduce((sum, subject) => {
    return sum + (GRADE_VALUES[subject.currentGrade!] || 0);
  }, 0);
  const averageGrade = totalGradeValue / subjectsWithGrades.length;

  // Compare with target grades
  let onTargetCount = 0;
  let aboveTargetCount = 0;
  let belowTargetCount = 0;

  subjectsWithGrades.forEach(subject => {
    if (!subject.targetGrade || !subject.currentGrade) return;

    const currentValue = GRADE_VALUES[subject.currentGrade];
    const targetValue = GRADE_VALUES[subject.targetGrade];

    if (currentValue === targetValue) {
      onTargetCount++;
    } else if (currentValue > targetValue) {
      aboveTargetCount++;
    } else {
      belowTargetCount++;
    }
  });

  // Simple trend analysis (can be enhanced with history)
  const improvementTrend = aboveTargetCount > belowTargetCount 
    ? 'improving' 
    : aboveTargetCount < belowTargetCount 
    ? 'declining' 
    : 'stable';

  return {
    averageGrade,
    totalSubjects: subjects.length,
    onTargetCount,
    aboveTargetCount,
    belowTargetCount,
    improvementTrend,
  };
}

/**
 * Get grade color based on value
 */
export function getGradeColor(grade: Grade): string {
  const value = GRADE_VALUES[grade];
  
  if (value >= 7) return 'text-green-500';
  if (value >= 5) return 'text-blue-500';
  if (value >= 4) return 'text-yellow-500';
  return 'text-red-500';
}

/**
 * Get grade background color
 */
export function getGradeBgColor(grade: Grade): string {
  const value = GRADE_VALUES[grade];
  
  if (value >= 7) return 'bg-green-500/20';
  if (value >= 5) return 'bg-blue-500/20';
  if (value >= 4) return 'bg-yellow-500/20';
  return 'bg-red-500/20';
}

