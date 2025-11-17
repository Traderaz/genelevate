'use client';

import { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/auth/role-guard';
import { VirtualDebate } from '@/types/virtual-debates';
import { Video, Plus, Calendar, Users, Edit, Trash2, ExternalLink } from 'lucide-react';
import { CreateVirtualDebateModal } from '@/components/admin/create-virtual-debate-modal';
import { toast } from 'sonner';
import Link from 'next/link';

interface DebateTopic {
  id: string;
  title: string;
  month: string;
  year: number;
}

function AdminVirtualDebatesContent() {
  const [debates, setDebates] = useState<VirtualDebate[]>([]);
  const [debateTopics, setDebateTopics] = useState<DebateTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDebate, setSelectedDebate] = useState<VirtualDebate | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      // Load virtual debates
      const debatesRef = collection(db, 'virtualDebates');
      const debatesQuery = query(debatesRef, orderBy('scheduledTime', 'asc'));
      const debatesSnapshot = await getDocs(debatesQuery);
      const debatesData = debatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as VirtualDebate[];
      setDebates(debatesData);

      // Load debate topics
      const topicsRef = collection(db, 'debateTopics');
      const topicsQuery = query(topicsRef, orderBy('year', 'desc'), orderBy('month', 'desc'));
      const topicsSnapshot = await getDocs(topicsQuery);
      const topicsData = topicsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as DebateTopic[];
      setDebateTopics(topicsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load virtual debates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (debateId: string) => {
    if (!confirm('Are you sure you want to delete this virtual debate? This will also close the Daily.co room.')) return;

    try {
      // First, try to delete the Daily.co room (if it exists)
      try {
        const endRoomResponse = await fetch('/api/debates/end-room', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ debateId }),
        });

        if (!endRoomResponse.ok) {
          console.warn('Failed to delete Daily.co room, but continuing with debate deletion');
        }
      } catch (roomError) {
        console.warn('Error deleting Daily.co room:', roomError);
        // Continue with debate deletion even if room deletion fails
      }

      // Then delete the Firestore document
      const { doc, deleteDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      await deleteDoc(doc(db, 'virtualDebates', debateId));
      toast.success('Virtual debate deleted successfully (Daily.co room closed)');
      loadData();
    } catch (error) {
      console.error('Error deleting debate:', error);
      toast.error('Failed to delete virtual debate');
    }
  };

  const getStatusBadge = (debate: VirtualDebate) => {
    const now = new Date();
    const scheduled = debate.scheduledTime.toDate();
    const end = new Date(scheduled.getTime() + debate.durationMinutes * 60 * 1000);

    if (now < scheduled) {
      return <span className="px-3 py-1 bg-teal-gold/20 text-teal-gold text-xs font-semibold rounded-full border border-teal-gold/30">Upcoming</span>;
    } else if (now >= scheduled && now <= end) {
      return <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">Live Now</span>;
    } else {
      return <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-semibold rounded-full border border-gray-500/30">Completed</span>;
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="teal-card-glass border-2 border-white/20 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Virtual Debates Management</h1>
              <p className="text-white/80">Schedule and manage live team debates</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/debates"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                ← Back to Submissions
              </Link>
              <button
                onClick={() => {
                  setSelectedDebate(null);
                  setShowCreateModal(true);
                }}
                className="teal-button-primary px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Schedule New Debate
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Video className="w-6 h-6 text-teal-gold mb-2" />
              <div className="text-2xl font-bold text-white">{debates.length}</div>
              <div className="text-sm text-white/70">Total Debates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Calendar className="w-6 h-6 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">
                {debates.filter(d => d.status === 'scheduled').length}
              </div>
              <div className="text-sm text-white/70">Upcoming</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Users className="w-6 h-6 text-teal-primary mb-2" />
              <div className="text-2xl font-bold text-white">
                {debates.reduce((sum, d) => sum + d.participants.length, 0)}
              </div>
              <div className="text-sm text-white/70">Total Participants</div>
            </div>
          </div>
        </div>

        {/* Debates List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-gold"></div>
          </div>
        ) : debates.length === 0 ? (
          <div className="teal-card border border-white/20 rounded-xl p-12 text-center">
            <Video className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-teal-card-text mb-2">
              No virtual debates scheduled
            </h3>
            <p className="text-teal-card-text-muted mb-6">
              Create your first virtual debate to invite top students
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="teal-button-primary px-6 py-2 rounded-lg font-semibold"
            >
              Schedule First Debate
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {debates.map((debate) => {
              const scheduledDate = debate.scheduledTime.toDate();
              const debateTopic = debateTopics.find(t => t.id === debate.debateTopicId);

              return (
                <div
                  key={debate.id}
                  className="teal-card border-2 border-white/20 rounded-xl p-6 hover:border-teal-gold/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-teal-card-text">
                          {debate.title}
                        </h3>
                        {getStatusBadge(debate)}
                      </div>
                      <p className="text-teal-card-text-muted mb-3">{debate.description}</p>
                      {debateTopic && (
                        <p className="text-sm text-teal-gold font-medium mb-2">
                          Topic: {debateTopic.title}
                        </p>
                      )}
                      <div className="flex items-center gap-6 text-sm text-teal-card-text-muted">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {scheduledDate.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{debate.participants.length} speakers</span>
                        </div>
                        <span>Duration: {debate.durationMinutes} mins</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={debate.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-teal-gold transition-colors"
                        title="Open meeting link"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <button
                        onClick={() => {
                          setSelectedDebate(debate);
                          setShowCreateModal(true);
                        }}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-teal-card-text transition-colors"
                        title="Edit debate"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(debate.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                        title="Delete debate"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Meeting Link */}
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-xs text-teal-card-text-muted mb-1">Meeting Link:</p>
                    <a
                      href={debate.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-gold hover:underline font-mono"
                    >
                      {debate.meetingLink}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <CreateVirtualDebateModal
          debate={selectedDebate}
          debateTopics={debateTopics}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedDebate(null);
          }}
          onSuccess={() => {
            setShowCreateModal(false);
            setSelectedDebate(null);
            loadData();
          }}
        />
      )}
    </div>
  );
}

export default function AdminVirtualDebatesPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminVirtualDebatesContent />
    </RoleGuard>
  );
}

