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
        <div className="h-48 teal-card animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 teal-card animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="teal-card-glass border border-white/20 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Grade Tracker</h1>
            <p className="text-sm sm:text-base text-white/80 mt-1">Monitor your academic progress</p>
          </div>
          <button
            onClick={() => setIsAddingSubject(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-gold text-teal-card-text rounded-lg hover:bg-teal-gold-dark transition-colors whitespace-nowrap font-bold shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Subject</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/70 mb-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Total Subjects</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalSubjects}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/70 mb-2">
              <Award className="w-4 h-4" />
              <span className="text-sm">Average</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.averageGrade.toFixed(1)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/70 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-sm">On Target</span>
            </div>
            <p className="text-2xl font-bold text-teal-gold">{stats.onTargetCount}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/70 mb-2">
              {stats.improvementTrend === 'improving' ? (
                <TrendingUp className="w-4 h-4 text-teal-gold" />
              ) : stats.improvementTrend === 'declining' ? (
                <TrendingDown className="w-4 h-4 text-red-400" />
              ) : (
                <Minus className="w-4 h-4 text-yellow-400" />
              )}
              <span className="text-sm">Trend</span>
            </div>
            <p className="text-sm font-semibold capitalize text-white">{stats.improvementTrend}</p>
          </div>
        </div>
      </div>

      {/* Add Subject Form */}
      {isAddingSubject && (
        <div className="teal-card rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-teal-card-text mb-4">Add New Subject</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-teal-card-text mb-2">Subject</label>
              <select
                value={newSubject.subject}
                onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
              >
                <option value="">Select subject...</option>
                {COMMON_SUBJECTS.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
                <option value="custom">Other (Custom)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-card-text mb-2">Level</label>
              <select
                value={newSubject.level}
                onChange={(e) => setNewSubject({ ...newSubject, level: e.target.value as QualificationLevel })}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
              >
                <option value="GCSE">GCSE</option>
                <option value="A-Level">A-Level</option>
                <option value="BTEC">BTEC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-card-text mb-2">Current Grade (Optional)</label>
              <select
                value={newSubject.currentGrade || ''}
                onChange={(e) => setNewSubject({ ...newSubject, currentGrade: e.target.value as Grade })}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
              >
                <option value="">Not yet graded</option>
                {availableGrades(newSubject.level).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-card-text mb-2">Target Grade</label>
              <select
                value={newSubject.targetGrade || ''}
                onChange={(e) => setNewSubject({ ...newSubject, targetGrade: e.target.value as Grade })}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
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
              className="px-4 py-2 bg-teal-gold text-teal-card-text rounded-lg hover:bg-teal-gold-dark transition-colors disabled:opacity-50 font-bold shadow-md"
            >
              Add Subject
            </button>
            <button
              onClick={() => setIsAddingSubject(false)}
              className="px-4 py-2 bg-gray-100 text-teal-card-text rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Subjects List */}
      {subjects.length === 0 ? (
        <div className="text-center py-12 teal-card rounded-xl">
          <BookOpen className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-teal-card-text mb-2">No subjects added yet</h3>
          <p className="text-teal-card-text-muted mb-4">Start tracking your grades by adding your subjects</p>
          <button
            onClick={() => setIsAddingSubject(true)}
            className="px-4 py-2 bg-teal-gold text-teal-card-text rounded-lg hover:bg-teal-gold-dark transition-colors font-bold shadow-md"
          >
            Add Your First Subject
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.subject}
              className="teal-card border-2 border-transparent rounded-xl p-6 hover:border-teal-gold hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-teal-card-text mb-1">{subject.subject}</h3>
                  <span className="text-xs text-teal-card-text-muted">{subject.level}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingSubject(subject.subject)}
                    className="p-2 text-teal-card-text-muted hover:text-teal-primary transition-colors"
                    title="Edit grade"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveSubject(subject.subject)}
                    className="p-2 text-teal-card-text-muted hover:text-red-500 transition-colors"
                    title="Remove subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* Current Grade */}
                <div>
                  <p className="text-xs text-teal-card-text-muted mb-1">Current Grade</p>
                  {editingSubject === subject.subject ? (
                    <select
                      value={subject.currentGrade || ''}
                      onChange={(e) => handleUpdateGrade(subject.subject, e.target.value as Grade)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
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
                    <p className="text-sm text-teal-card-text-muted">Not yet graded</p>
                  )}
                </div>

                {/* Target Grade */}
                {subject.targetGrade && (
                  <div>
                    <p className="text-xs text-teal-card-text-muted mb-1">Target Grade</p>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-teal-primary" />
                      <span className="font-semibold text-teal-card-text">{subject.targetGrade}</span>
                    </div>
                  </div>
                )}

                {/* Progress indicator */}
                {subject.currentGrade && subject.targetGrade && (
                  <div className="pt-2 border-t border-gray-200">
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

