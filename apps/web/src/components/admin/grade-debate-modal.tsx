'use client';

import { useState } from 'react';
import { X, Video, FileText, Award, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface DebateTopic {
  id: string;
  title: string;
  month: string;
  year: number;
  pointsReward: number;
}

interface DebateSubmission {
  id: string;
  debateId: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  type: 'video' | 'text';
  content: string;
  videoUrl?: string;
  submittedAt: any;
  grade?: number;
  feedback?: string;
  debateTopic?: DebateTopic;
}

interface GradeDebateModalProps {
  submission: DebateSubmission;
  onClose: () => void;
  onSuccess: () => void;
}

export function GradeDebateModal({ submission, onClose, onSuccess }: GradeDebateModalProps) {
  const [grade, setGrade] = useState(submission.grade?.toString() || '');
  const [feedback, setFeedback] = useState(submission.feedback || '');
  const [saving, setSaving] = useState(false);

  const isGraded = submission.grade !== null && submission.grade !== undefined;
  const submittedDate = submission.submittedAt?.toDate?.() || new Date(submission.submittedAt);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const gradeNum = parseInt(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      toast.error('Grade must be between 0 and 100');
      return;
    }

    if (feedback.trim().length < 10) {
      toast.error('Feedback must be at least 10 characters');
      return;
    }

    setSaving(true);

    try {
      const { doc, updateDoc, serverTimestamp, increment } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      const { getAuth } = await import('firebase/auth');

      const auth = getAuth();
      const adminId = auth.currentUser?.uid;

      // Update submission with grade and feedback
      const submissionRef = doc(db, 'debateSubmissions', submission.id);
      await updateDoc(submissionRef, {
        grade: gradeNum,
        feedback: feedback.trim(),
        gradedAt: serverTimestamp(),
        gradedBy: adminId,
      });

      // Award points to user based on grade
      const pointsEarned = Math.round((gradeNum / 100) * (submission.debateTopic?.pointsReward || 100));
      const userRef = doc(db, 'users', submission.userId);
      
      try {
        await updateDoc(userRef, {
          points: increment(pointsEarned),
        });
      } catch (error) {
        console.error('Error updating user points:', error);
      }

      toast.success(`Grade submitted! Student earned ${pointsEarned} points.`);
      onSuccess();
    } catch (error) {
      console.error('Error grading submission:', error);
      toast.error('Failed to submit grade. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-[900px] max-h-[90vh] overflow-y-auto teal-card border-2 border-teal-gold/30 rounded-2xl shadow-2xl">
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/20">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {submission.type === 'video' ? (
                    <Video className="w-5 h-5 text-teal-gold" />
                  ) : (
                    <FileText className="w-5 h-5 text-teal-gold" />
                  )}
                  <span className="text-sm font-semibold text-teal-gold uppercase">
                    {submission.type} Submission
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {submission.userName}
                </h2>
                <p className="text-white/70 text-sm">{submission.userEmail}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Debate Info */}
            <div className="teal-card border border-white/20 rounded-xl p-4">
              <h3 className="font-bold text-teal-card-text mb-2">
                {submission.debateTopic?.title || 'Unknown Topic'}
              </h3>
              <div className="flex items-center gap-4 text-sm text-teal-card-text-muted">
                <span>{submission.debateTopic?.month} {submission.debateTopic?.year}</span>
                <span>•</span>
                <span>
                  Submitted: {submittedDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-teal-gold" />
                  <span className="text-teal-gold font-medium">
                    {submission.debateTopic?.pointsReward || 100} points max
                  </span>
                </div>
              </div>
            </div>

            {/* Student Submission */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Student's Response</h3>
              
              {submission.type === 'text' ? (
                <div className="teal-card border border-white/20 rounded-xl p-6 max-h-96 overflow-y-auto">
                  <p className="text-teal-card-text whitespace-pre-wrap leading-relaxed">
                    {submission.content}
                  </p>
                </div>
              ) : submission.videoUrl ? (
                <video
                  src={submission.videoUrl}
                  controls
                  className="w-full max-h-[500px] rounded-xl bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="teal-card border border-white/20 rounded-xl p-6 text-center text-teal-card-text-muted">
                  Video processing...
                </div>
              )}
            </div>

            {/* Grading Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="teal-card border-2 border-teal-gold/30 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-teal-card-text flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-gold" />
                  {isGraded ? 'Update Grade & Feedback' : 'Provide Grade & Feedback'}
                </h3>

                {/* Grade Input */}
                <div>
                  <label className="block text-sm font-semibold text-teal-card-text mb-2">
                    Grade (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="Enter grade..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold text-xl font-bold"
                    required
                  />
                  {grade && (
                    <p className="text-sm text-teal-card-text-muted mt-2">
                      Points to be awarded: <span className="text-teal-gold font-bold">
                        {Math.round((parseInt(grade) / 100) * (submission.debateTopic?.pointsReward || 100))}
                      </span> / {submission.debateTopic?.pointsReward || 100}
                    </p>
                  )}
                </div>

                {/* Feedback Input */}
                <div>
                  <label className="block text-sm font-semibold text-teal-card-text mb-2">
                    Detailed Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on structure, content, evidence, delivery..."
                    className="w-full h-40 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold resize-none"
                    required
                  />
                </div>

                {/* Grading Criteria Reminder */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-sm font-semibold text-teal-card-text mb-2">
                    Grading Criteria:
                  </h4>
                  <ul className="text-xs text-teal-card-text-muted space-y-1">
                    <li>• Clarity & Structure (PEEL method application)</li>
                    <li>• Content & Evidence quality</li>
                    <li>• Rebuttal effectiveness (if applicable)</li>
                    <li>• Delivery (if video/audio)</li>
                    <li>• Critical Thinking & Originality</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full teal-button-primary py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {isGraded ? 'Update Grade' : 'Submit Grade'}
                    </>
                  )}
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
    );
}

