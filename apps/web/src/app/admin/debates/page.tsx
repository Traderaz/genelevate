'use client';

import { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/role-guard';
import { Users, CheckCircle, Clock, Award, Search, Video } from 'lucide-react';
import { GradeDebateModal } from '@/components/admin/grade-debate-modal';
import Link from 'next/link';

interface DebateTopic {
  id: string;
  title: string;
  month: string;
  year: number;
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
  gradedAt?: any;
  gradedBy?: string;
}

interface SubmissionWithDebate extends DebateSubmission {
  debateTopic?: DebateTopic;
}

function AdminDebatesContent() {
  const [submissions, setSubmissions] = useState<SubmissionWithDebate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithDebate | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const { collection, getDocs, query, orderBy, doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      // Load all submissions
      const submissionsRef = collection(db, 'debateSubmissions');
      const q = query(submissionsRef, orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);

      const submissionsData: SubmissionWithDebate[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const submission = { id: docSnap.id, ...docSnap.data() } as SubmissionWithDebate;

          // Load debate topic
          const debateDoc = await getDoc(doc(db, 'debateTopics', submission.debateId));
          if (debateDoc.exists()) {
            submission.debateTopic = { id: debateDoc.id, ...debateDoc.data() } as DebateTopic;
          }

          // Load user info
          const userDoc = await getDoc(doc(db, 'users', submission.userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            submission.userName = userData.displayName || userData.email || 'Unknown User';
            submission.userEmail = userData.email;
          }

          return submission;
        })
      );

      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && (submission.grade === null || submission.grade === undefined)) ||
      (filter === 'graded' && submission.grade !== null && submission.grade !== undefined);

    const matchesSearch =
      searchQuery === '' ||
      submission.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.debateTopic?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.userEmail?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const pendingCount = submissions.filter(s => s.grade === null || s.grade === undefined).length;
  const gradedCount = submissions.filter(s => s.grade !== null && s.grade !== undefined).length;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="teal-card-glass border-2 border-white/20 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Debate Submissions</h1>
              <p className="text-white/80">Review and grade student debate responses</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/debates/virtual"
                className="px-4 py-2 teal-button-primary rounded-lg font-semibold flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Manage Virtual Debates
              </Link>
              <Link
                href="/admin"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                ← Back to Admin
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Users className="w-6 h-6 text-teal-gold mb-2" />
              <div className="text-2xl font-bold text-white">{submissions.length}</div>
              <div className="text-sm text-white/70">Total Submissions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Clock className="w-6 h-6 text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{pendingCount}</div>
              <div className="text-sm text-white/70">Pending Review</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">{gradedCount}</div>
              <div className="text-sm text-white/70">Graded</div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="teal-card border border-white/20 rounded-xl p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'teal-button-primary'
                  : 'bg-white/5 text-teal-card-text hover:bg-white/10'
              }`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'teal-button-primary'
                  : 'bg-white/5 text-teal-card-text hover:bg-white/10'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('graded')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'graded'
                  ? 'teal-button-primary'
                  : 'bg-white/5 text-teal-card-text hover:bg-white/10'
              }`}
            >
              Graded ({gradedCount})
            </button>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-teal-card-text-muted" />
            <input
              type="text"
              placeholder="Search by student or debate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold"
            />
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-gold"></div>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="teal-card border border-white/20 rounded-xl p-12 text-center">
            <Users className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-teal-card-text mb-2">
              No submissions found
            </h3>
            <p className="text-teal-card-text-muted">
              {filter === 'pending' ? 'All submissions have been graded!' : 'Try adjusting your filters'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => {
              const isGraded = submission.grade !== null && submission.grade !== undefined;
              const submittedDate = submission.submittedAt?.toDate?.() || new Date(submission.submittedAt);

              return (
                <div
                  key={submission.id}
                  className="teal-card border-2 border-white/20 rounded-xl p-6 hover:border-teal-gold/50 transition-all cursor-pointer"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-teal-card-text">
                          {submission.userName}
                        </h3>
                        {isGraded ? (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                            ✓ Graded
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full border border-orange-500/30">
                            Pending
                          </span>
                        )}
                        <span className="px-3 py-1 bg-teal-primary/20 text-teal-primary text-xs font-semibold rounded-full">
                          {submission.type === 'video' ? '🎥 Video' : '📝 Text'}
                        </span>
                      </div>

                      <p className="text-teal-card-text font-medium mb-1">
                        {submission.debateTopic?.title || 'Unknown Topic'}
                      </p>
                      <p className="text-teal-card-text-muted text-sm mb-3">
                        {submission.debateTopic?.month} {submission.debateTopic?.year}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-teal-card-text-muted">
                        <span>
                          Submitted: {submittedDate.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        {submission.userEmail && (
                          <span>• {submission.userEmail}</span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      {isGraded ? (
                        <div>
                          <div className="text-3xl font-bold text-teal-gold mb-1">
                            {submission.grade}
                          </div>
                          <div className="text-sm text-teal-card-text-muted">/ 100</div>
                        </div>
                      ) : (
                        <button className="teal-button-primary px-6 py-2 rounded-lg font-semibold">
                          Grade Submission
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Grade Modal */}
      {selectedSubmission && (
        <GradeDebateModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          onSuccess={() => {
            setSelectedSubmission(null);
            loadSubmissions();
          }}
        />
      )}
    </div>
  );
}

export default function AdminDebatesPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminDebatesContent />
    </RoleGuard>
  );
}

