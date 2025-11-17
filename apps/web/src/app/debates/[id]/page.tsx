'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { DebateSubmissionForm } from '@/components/debates/debate-submission-form';
import { DebateSubmissionView } from '@/components/debates/debate-submission-view';
import { useAuth } from '@/contexts/auth-context';
import { BookOpen, Calendar, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

interface DebateSubmission {
  id: string;
  debateId: string;
  userId: string;
  type: 'video' | 'text';
  content: string;
  videoUrl?: string;
  submittedAt: any;
  grade?: number;
  feedback?: string;
  gradedAt?: any;
  gradedBy?: string;
}

export default function DebateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const debateId = params.id as string;

  const [debate, setDebate] = useState<DebateTopic | null>(null);
  const [submission, setSubmission] = useState<DebateSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDebateAndSubmission();
  }, [debateId, user]);

  const loadDebateAndSubmission = async () => {
    setLoading(true);
    try {
      const { doc, getDoc, collection, query, where, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      // Load debate topic
      const debateDoc = await getDoc(doc(db, 'debateTopics', debateId));
      if (debateDoc.exists()) {
        setDebate({ id: debateDoc.id, ...debateDoc.data() } as DebateTopic);
      }

      // Load user submission if exists
      if (user) {
        const submissionsRef = collection(db, 'debateSubmissions');
        const q = query(
          submissionsRef,
          where('debateId', '==', debateId),
          where('userId', '==', user.uid)
        );

        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setSubmission({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as DebateSubmission);
        }
      }
    } catch (error) {
      console.error('Error loading debate:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-gold"></div>
        </div>
      </NetflixDashboardLayout>
    );
  }

  if (!debate) {
    return (
      <NetflixDashboardLayout>
        <div className="teal-card border border-white/20 rounded-xl p-12 text-center">
          <h3 className="text-xl font-semibold text-teal-card-text mb-2">
            Debate not found
          </h3>
          <Link href="/debates" className="text-teal-gold hover:underline">
            ← Back to debates
          </Link>
        </div>
      </NetflixDashboardLayout>
    );
  }

  const deadline = debate.submissionDeadline?.toDate ? debate.submissionDeadline.toDate() : new Date(debate.submissionDeadline);
  const isPastDeadline = new Date() > deadline;

  return (
    <NetflixDashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Button */}
        <Link 
          href="/debates"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Debates
        </Link>

        {/* Header */}
        <div className="teal-card-glass border-2 border-white/20 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-teal-primary/20 text-teal-primary text-xs font-semibold rounded-full">
                  {debate.month} {debate.year}
                </span>
                {submission && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                    ✓ Submitted
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{debate.title}</h1>
              <p className="text-white/80">{debate.description}</p>
            </div>
            <div className="flex items-center gap-2 text-teal-gold">
              <Award className="w-5 h-5" />
              <span className="font-bold">{debate.pointsReward} points</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                Deadline: {deadline.toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            {isPastDeadline && (
              <span className="text-red-400 font-semibold">
                Submissions Closed
              </span>
            )}
          </div>
        </div>

        {/* Debating Guide Reminder */}
        <div className="teal-card border border-teal-primary/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-teal-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-teal-card-text mb-1">
                <span className="font-semibold">Need help?</span> Review the debating guide for tips on structure and approach.
              </p>
              <Link href="/debates" className="text-sm text-teal-gold hover:underline">
                View Debating Guide →
              </Link>
            </div>
          </div>
        </div>

        {/* Submission Form or View */}
        {submission ? (
          <DebateSubmissionView 
            submission={submission} 
            debate={debate}
            onUpdate={loadDebateAndSubmission}
          />
        ) : isPastDeadline ? (
          <div className="teal-card border border-white/20 rounded-xl p-12 text-center">
            <Calendar className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-teal-card-text mb-2">
              Submission Period Ended
            </h3>
            <p className="text-teal-card-text-muted">
              The deadline for this debate has passed. Check back next month for new topics!
            </p>
          </div>
        ) : (
          <DebateSubmissionForm 
            debateId={debateId}
            userId={user?.uid || ''}
            onSubmitSuccess={loadDebateAndSubmission}
          />
        )}
      </div>
    </NetflixDashboardLayout>
  );
}

