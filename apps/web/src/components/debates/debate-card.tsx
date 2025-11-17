'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, Video, FileText, Award, CheckCircle } from 'lucide-react';

interface DebateTopic {
  id: string;
  title: string;
  description: string;
  month: string;
  year: number;
  submissionDeadline: any;
  pointsReward: number;
  createdAt: any;
  createdBy: string;
}

interface DebateCardProps {
  debate: DebateTopic;
  userId?: string;
}

export function DebateCard({ debate, userId }: DebateCardProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      checkSubmission();
    } else {
      setLoading(false);
    }
  }, [userId, debate.id]);

  const checkSubmission = async () => {
    if (!userId) return;
    
    try {
      const { collection, query, where, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const submissionsRef = collection(db, 'debateSubmissions');
      const q = query(
        submissionsRef,
        where('debateId', '==', debate.id),
        where('userId', '==', userId)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setHasSubmitted(true);
        setSubmissionData(snapshot.docs[0].data());
      }
    } catch (error) {
      console.error('Error checking submission:', error);
    } finally {
      setLoading(false);
    }
  };

  const deadline = debate.submissionDeadline?.toDate ? debate.submissionDeadline.toDate() : new Date(debate.submissionDeadline);
  const daysRemaining = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isPastDeadline = daysRemaining < 0;

  if (loading) {
    return (
      <div className="teal-card border-2 border-white/20 rounded-2xl p-6 animate-pulse">
        <div className="h-32 bg-white/5 rounded"></div>
      </div>
    );
  }

  return (
    <Link href={`/debates/${debate.id}`}>
      <div className="group relative teal-card border-2 border-white/20 rounded-2xl p-6 hover:border-teal-gold/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-gold/20">
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {hasSubmitted && (
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Submitted
            </span>
          )}
          {!isPastDeadline && (
            <span className="px-3 py-1 bg-teal-gold/20 text-teal-gold text-xs font-semibold rounded-full border border-teal-gold/30">
              Active
            </span>
          )}
        </div>

        {/* Month Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-teal-primary/20 text-teal-primary text-xs font-semibold rounded-full">
            {debate.month} {debate.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-teal-card-text mb-3 group-hover:text-teal-gold transition-colors line-clamp-2 pr-24">
          {debate.title}
        </h3>

        {/* Description */}
        <p className="text-teal-card-text-muted text-sm mb-4 line-clamp-2">
          {debate.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs text-teal-card-text-muted mb-4">
          <div className="flex items-center gap-1">
            <Video className="w-4 h-4" />
            <span>Video/Text</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-teal-gold" />
            <span className="text-teal-gold">{debate.pointsReward} points</span>
          </div>
        </div>

        {/* User Grade (if submitted and graded) */}
        {hasSubmitted && submissionData?.grade !== undefined && (
          <div className="mb-4 p-3 bg-teal-gold/10 border border-teal-gold/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-teal-card-text-muted">Your Grade</span>
              <span className="text-2xl font-bold text-teal-gold">{submissionData.grade}/100</span>
            </div>
            {submissionData.feedback && (
              <p className="text-xs text-teal-card-text-muted mt-2">Feedback available</p>
            )}
          </div>
        )}

        {/* Time Remaining */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-teal-card-text-muted">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {isPastDeadline ? (
                <span className="text-red-400">Closed</span>
              ) : daysRemaining === 0 ? (
                'Due today'
              ) : (
                `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left`
              )}
            </span>
          </div>
          
          {!hasSubmitted && !isPastDeadline ? (
            <button className="px-4 py-2 teal-button-primary text-sm font-semibold rounded-lg transition-colors">
              Submit Response →
            </button>
          ) : hasSubmitted ? (
            <span className="flex items-center gap-1 text-sm text-teal-gold font-medium">
              <CheckCircle className="w-4 h-4" />
              View Submission
            </span>
          ) : (
            <span className="text-sm text-red-400">Deadline passed</span>
          )}
        </div>
      </div>
    </Link>
  );
}

