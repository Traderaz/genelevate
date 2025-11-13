'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Plus, 
  Edit2, 
  Trash2, 
  Target,
  BookOpen,
  Award,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import {
  getStudentGrades,
  updateSubjectGrade,
  addSubject,
  removeSubject,
  calculateGradeStats,
  getGradeColor,
  getGradeBgColor,
} from '@/lib/services/grades';
import type { SubjectGrade, Grade, QualificationLevel } from '@/types/grades';
import { GCSE_GRADES, A_LEVEL_GRADES, BTEC_GRADES, COMMON_SUBJECTS, GRADE_VALUES } from '@/types/grades';

export function GradeTracker() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<SubjectGrade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [isAddingSubject, setIsAddingSubject] = useState(false);

  // New subject form
  const [newSubject, setNewSubject] = useState({
    subject: '',
    level: 'GCSE' as QualificationLevel,
    currentGrade: undefined as Grade | undefined,
    targetGrade: undefined as Grade | undefined,
  });

  useEffect(() => {
    if (user) {
      fetchGrades();
    }
  }, [user]);

  const fetchGrades = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const grades = await getStudentGrades(user.uid);
      setSubjects(grades?.subjects || []);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGrade = async (subject: string, newGrade: Grade) => {
    if (!user) return;

    try {
      await updateSubjectGrade(user.uid, subject, newGrade, 'student');
      await fetchGrades();
      setEditingSubject(null);
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  const handleAddSubject = async () => {
    if (!user || !newSubject.subject) return;

    try {
      const subjectGrade: SubjectGrade = {
        subject: newSubject.subject,
        level: newSubject.level,
        currentGrade: newSubject.currentGrade,
        targetGrade: newSubject.targetGrade,
        lastUpdated: new Date(),
      };

      await addSubject(user.uid, subjectGrade);
      await fetchGrades();
      setIsAddingSubject(false);
      setNewSubject({
        subject: '',
        level: 'GCSE',
        currentGrade: undefined,
        targetGrade: undefined,
      });
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const handleRemoveSubject = async (subject: string) => {
    if (!user) return;
    if (!confirm(`Are you sure you want to remove ${subject}?`)) return;

    try {
      await removeSubject(user.uid, subject);
      await fetchGrades();
    } catch (error) {
      console.error('Error removing subject:', error);
    }
  };

  const stats = calculateGradeStats(subjects);
  const availableGrades = (level: QualificationLevel) => {
    if (level === 'A-Level') return A_LEVEL_GRADES;
    if (level === 'BTEC') return BTEC_GRADES;
    return GCSE_GRADES;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 bg-card animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-card animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="bg-gradient-to-br from-card via-card/95 to-card/80 border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Grade Tracker</h1>
            <p className="text-muted-foreground mt-1">Monitor your academic progress</p>
          </div>
          <button
            onClick={() => setIsAddingSubject(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Subject
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Total Subjects</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.totalSubjects}</p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Award className="w-4 h-4" />
              <span className="text-sm">Average</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.averageGrade.toFixed(1)}</p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Target className="w-4 h-4" />
              <span className="text-sm">On Target</span>
            </div>
            <p className="text-2xl font-bold text-green-500">{stats.onTargetCount}</p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              {stats.improvementTrend === 'improving' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : stats.improvementTrend === 'declining' ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : (
                <Minus className="w-4 h-4 text-yellow-500" />
              )}
              <span className="text-sm">Trend</span>
            </div>
            <p className="text-sm font-semibold capitalize text-foreground">{stats.improvementTrend}</p>
          </div>
        </div>
      </div>

      {/* Add Subject Form */}
      {isAddingSubject && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Add New Subject</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <select
                value={newSubject.subject}
                onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select subject...</option>
                {COMMON_SUBJECTS.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
                <option value="custom">Other (Custom)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Level</label>
              <select
                value={newSubject.level}
                onChange={(e) => setNewSubject({ ...newSubject, level: e.target.value as QualificationLevel })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="GCSE">GCSE</option>
                <option value="A-Level">A-Level</option>
                <option value="BTEC">BTEC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Grade (Optional)</label>
              <select
                value={newSubject.currentGrade || ''}
                onChange={(e) => setNewSubject({ ...newSubject, currentGrade: e.target.value as Grade })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Not yet graded</option>
                {availableGrades(newSubject.level).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Target Grade</label>
              <select
                value={newSubject.targetGrade || ''}
                onChange={(e) => setNewSubject({ ...newSubject, targetGrade: e.target.value as Grade })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Set target...</option>
                {availableGrades(newSubject.level).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddSubject}
              disabled={!newSubject.subject}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Add Subject
            </button>
            <button
              onClick={() => setIsAddingSubject(false)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Subjects List */}
      {subjects.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No subjects added yet</h3>
          <p className="text-muted-foreground mb-4">Start tracking your grades by adding your subjects</p>
          <button
            onClick={() => setIsAddingSubject(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add Your First Subject
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.subject}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{subject.subject}</h3>
                  <span className="text-xs text-muted-foreground">{subject.level}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingSubject(subject.subject)}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    title="Edit grade"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveSubject(subject.subject)}
                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                    title="Remove subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* Current Grade */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Grade</p>
                  {editingSubject === subject.subject ? (
                    <select
                      value={subject.currentGrade || ''}
                      onChange={(e) => handleUpdateGrade(subject.subject, e.target.value as Grade)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
                    >
                      <option value="">Select grade...</option>
                      {availableGrades(subject.level).map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  ) : subject.currentGrade ? (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${getGradeBgColor(subject.currentGrade)} ${getGradeColor(subject.currentGrade)} rounded-lg font-bold`}>
                      {subject.currentGrade}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not yet graded</p>
                  )}
                </div>

                {/* Target Grade */}
                {subject.targetGrade && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Target Grade</p>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">{subject.targetGrade}</span>
                    </div>
                  </div>
                )}

                {/* Progress indicator */}
                {subject.currentGrade && subject.targetGrade && (
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-xs">
                      {GRADE_VALUES[subject.currentGrade] >= GRADE_VALUES[subject.targetGrade] ? (
                        <>
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span className="text-green-500 font-medium">On track!</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-3 h-3 text-yellow-500" />
                          <span className="text-yellow-500 font-medium">Keep pushing!</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

