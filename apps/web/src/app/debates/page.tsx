'use client';

import { useState, useEffect } from 'react';
import { Trophy, Calendar, Users, BookOpen, TrendingUp, Video } from 'lucide-react';
import { DebateCard } from '@/components/debates/debate-card';
import { DebatingGuide } from '@/components/debates/debating-guide';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';
import { useAuth } from '@/contexts/auth-context';
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

function DebatesPageContent() {
  const { user } = useAuth();
  const [debates, setDebates] = useState<DebateTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    loadDebates();
  }, []);

  const loadDebates = async () => {
    setLoading(true);
    try {
      const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const debatesRef = collection(db, 'debateTopics');
      const q = query(
        debatesRef,
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const debatesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DebateTopic[];

      setDebates(debatesData);
    } catch (error) {
      console.error('Error loading debates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl teal-card-glass border-2 border-white/20 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-gold/10 via-transparent to-teal-primary/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-teal-gold/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-teal-gold" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  🎯 Monthly Debate Challenge
                </h1>
                <p className="text-white/80 text-lg">
                  Sharpen your critical thinking and argumentation skills
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
              <button
                onClick={() => setShowGuide(true)}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:border-teal-gold/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-gold/20 flex items-center justify-center group-hover:bg-teal-gold/30 transition-colors">
                    <BookOpen className="w-5 h-5 text-teal-gold" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">Guide</div>
                    <div className="text-xs text-white/70">Learn to debate</div>
                  </div>
                </div>
              </button>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-gold/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-teal-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-sm text-white/70">Points per debate</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-gold/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-teal-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">Monthly</div>
                    <div className="text-sm text-white/70">New topics</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-gold/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-teal-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">Admin</div>
                    <div className="text-sm text-white/70">Expert feedback</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Debates Link */}
        <Link href="/debates/virtual">
          <div className="teal-card border-2 border-teal-gold/30 rounded-xl p-6 hover:border-teal-gold/50 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-teal-gold/20 flex items-center justify-center group-hover:bg-teal-gold/30 transition-colors">
                  <Video className="w-7 h-7 text-teal-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-teal-card-text mb-1">
                    🎥 Virtual Debate Arena
                  </h3>
                  <p className="text-teal-card-text-muted">
                    Join live team debates with top performers
                  </p>
                </div>
              </div>
              <div className="text-teal-gold group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </div>
        </Link>

        {/* Debates List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-gold"></div>
          </div>
        ) : debates.length === 0 ? (
          <div className="teal-card border border-white/20 rounded-xl p-12 text-center">
            <Users className="w-16 h-16 text-teal-card-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-teal-card-text mb-2">
              No debates available
            </h3>
            <p className="text-teal-card-text-muted mb-6">
              Check back soon for new monthly debate topics!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {debates.map((debate) => (
              <DebateCard
                key={debate.id}
                debate={debate}
                userId={user?.uid}
              />
            ))}
          </div>
        )}
      </div>

      {/* Debating Guide Modal */}
      {showGuide && (
        <DebatingGuide onClose={() => setShowGuide(false)} />
      )}
    </NetflixDashboardLayout>
  );
}

export default function DebatesPage() {
  return (
    <BasicPlanGuard redirectTo="/debates">
      <DebatesPageContent />
    </BasicPlanGuard>
  );
}

