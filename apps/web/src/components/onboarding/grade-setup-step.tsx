'use client';

import { useState } from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import type { SubjectGrade, Grade, QualificationLevel } from '@/types/grades';
import { GCSE_GRADES, A_LEVEL_GRADES, BTEC_GRADES, COMMON_SUBJECTS } from '@/types/grades';

interface GradeSetupStepProps {
  onComplete: (subjects: SubjectGrade[], yearGroup: number) => void;
  onSkip: () => void;
}

export function GradeSetupStep({ onComplete, onSkip }: GradeSetupStepProps) {
  const [yearGroup, setYearGroup] = useState<number>(11);
  const [subjects, setSubjects] = useState<SubjectGrade[]>([]);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubject, setNewSubject] = useState({
    subject: '',
    level: 'GCSE' as QualificationLevel,
    currentGrade: undefined as Grade | undefined,
    targetGrade: undefined as Grade | undefined,
  });

  const handleAddSubject = () => {
    if (!newSubject.subject) return;

    const subjectGrade: SubjectGrade = {
      subject: newSubject.subject,
      level: newSubject.level,
      currentGrade: newSubject.currentGrade,
      targetGrade: newSubject.targetGrade,
      yearGroup,
      lastUpdated: new Date(),
    };

    setSubjects([...subjects, subjectGrade]);
    setNewSubject({
      subject: '',
      level: 'GCSE',
      currentGrade: undefined,
      targetGrade: undefined,
    });
    setIsAddingSubject(false);
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    if (subjects.length === 0) {
      alert('Please add at least one subject to track');
      return;
    }
    onComplete(subjects, yearGroup);
  };

  const availableGrades = (level: QualificationLevel) => {
    if (level === 'A-Level') return A_LEVEL_GRADES;
    if (level === 'BTEC') return BTEC_GRADES;
    return GCSE_GRADES;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
          <Award className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Set Up Your Grades</h2>
        <p className="text-muted-foreground">
          Add your current subjects so we can help you track your academic progress
        </p>
      </div>

      {/* Year Group Selection */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">What year group are you in?</label>
        <select
          value={yearGroup}
          onChange={(e) => setYearGroup(Number(e.target.value))}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={7}>Year 7</option>
          <option value={8}>Year 8</option>
          <option value={9}>Year 9</option>
          <option value={10}>Year 10</option>
          <option value={11}>Year 11</option>
          <option value={12}>Year 12 (Lower Sixth)</option>
          <option value={13}>Year 13 (Upper Sixth)</option>
        </select>
      </div>

      {/* Current Subjects */}
      {subjects.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="font-bold text-foreground mb-4">Your Subjects ({subjects.length})</h3>
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground">{subject.subject}</span>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      {subject.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {subject.currentGrade && (
                      <span>Current: <span className="font-medium text-foreground">{subject.currentGrade}</span></span>
                    )}
                    {subject.targetGrade && (
                      <span>Target: <span className="font-medium text-foreground">{subject.targetGrade}</span></span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveSubject(index)}
                  className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Subject Form */}
      {isAddingSubject ? (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="font-bold text-foreground mb-4">Add Subject</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
              <select
                value={newSubject.subject}
                onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select subject...</option>
                {COMMON_SUBJECTS.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Level *</label>
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
                onChange={(e) => setNewSubject({ ...newSubject, currentGrade: e.target.value as Grade || undefined })}
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
                onChange={(e) => setNewSubject({ ...newSubject, targetGrade: e.target.value as Grade || undefined })}
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
      ) : (
        <button
          onClick={() => setIsAddingSubject(true)}
          className="w-full p-6 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Subject</span>
          </div>
        </button>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleComplete}
          disabled={subjects.length === 0}
          className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
        >
          Continue ({subjects.length} subject{subjects.length !== 1 ? 's' : ''} added)
        </button>
        <button
          onClick={onSkip}
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors"
        >
          Skip for Now
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        You can always add or update your grades later from your dashboard
      </p>
    </div>
  );
}

