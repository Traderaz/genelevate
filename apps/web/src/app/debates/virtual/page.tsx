'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { VirtualDebateCard } from '@/components/debates/virtual-debate-card';
import { useAuth } from '@/contexts/auth-context';
import { Users, Video, Calendar, Trophy } from 'lucide-react';
import type { VirtualDebate } from '@/types/virtual-debates';

export default function VirtualDebatesPage() {
  const { user } = useAuth();
  const [debates, setDebates] = useState<VirtualDebate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'my-debates' | 'upcoming' | 'live'>('all');

  useEffect(() => {
    loadDebates();
  }, []);

  const loadDebates = async () => {
    setLoading(true);
    try {
      const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const debatesRef = collection(db, 'virtualDebates');
      const q = query(debatesRef, orderBy('scheduledTime', 'asc'));

      const snapshot = await getDocs(q);
      const debatesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VirtualDebate[];

      setDebates(debatesData);
    } catch (error) {
      console.error('Error loading virtual debates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDebates = debates.filter(debate => {
    if (filter === 'all') return true;
    if (filter === 'live') return debate.status === 'live';
    if (filter === 'upcoming') return debate.status === 'scheduled';
    if (filter === 'my-debates' && user) {
      return debate.participants.includes(user.uid);
    }
    return true;
  });

  return (
    <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl teal-card-glass border-2 border-white/20 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-gold/10 via-transparent to-teal-primary/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-teal-gold/20 flex items-center justify-center">
                <Video className="w-8 h-8 text-teal-gold" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  🏆 Live Virtual Debates
                </h1>
                <p className="text-white/80 text-lg">
                  Watch top performers compete in real-time team debates
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-gold/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-teal-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">Team vs Team</div>
                    <div className="text-sm text-white/70">Collaborative debates</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-gold/20 flex items-center justify-center">
                    <Video className="w-5 h-5 text-teal-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">Live Video</div>
                    <div className="text-sm text-white/70">Real-time interaction</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-gold/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-teal-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">Top Performers</div>
                    <div className="text-sm text-white/70">Invitation only</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="teal-card border-2 border-teal-primary/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-teal-card-text mb-2">How It Works</h3>
          <p className="text-teal-card-text-muted text-sm mb-4">
            Each month, the highest-scoring students from debate submissions are invited to participate in 
            live team debates. Selected participants can speak and engage in real-time, while other students 
            can watch and learn from the experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-teal-gold/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-teal-gold text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-teal-card-text">Participants</p>
                <p className="text-teal-card-text-muted">Video/audio enabled, can speak and present arguments</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-teal-primary/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-teal-primary text-xs font-bold">👁</span>
              </div>
              <div>
                <p className="font-semibold text-teal-card-text">Viewers</p>
                <p className="text-teal-card-text-muted">Watch-only mode, can use chat to ask questions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 border-b border-white/20">
          {[
            { id: 'all', label: 'All Debates' },
            { id: 'live', label: 'Live Now' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'my-debates', label: 'My Debates' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-3 font-medium transition-colors relative ${
                filter === f.id
                  ? 'text-teal-gold border-b-2 border-teal-gold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Debates List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-gold"></div>
          </div>
        ) : filteredDebates.length === 0 ? (
          <div className="teal-card border border-white/20 rounded-xl p-12 text-center">
            <Calendar className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-teal-card-text mb-2">
              No virtual debates yet
            </h3>
            <p className="text-teal-card-text-muted mb-6">
              Submit your debate responses and score high to get invited to live debates!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredDebates.map((debate) => (
              <VirtualDebateCard
                key={debate.id}
                debate={debate}
                userId={user?.uid}
              />
            ))}
          </div>
        )}
      </div>
    </NetflixDashboardLayout>
  );
}

