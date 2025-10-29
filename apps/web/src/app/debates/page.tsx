'use client';

import { useState } from 'react';
import { Trophy, Calendar, Users, Play, TrendingUp } from 'lucide-react';
import { DebateCard } from '@/components/debates/debate-card';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { BasicPlanGuard } from '@/components/auth/subscription-guard';

// Mock data for now - will connect to Firestore later
const mockDebates = [
  {
    id: '1',
    topicId: 'topic1',
    title: 'Should social media companies be held responsible for teen mental health?',
    description: 'Explore the role of social media platforms in teen mental health. Consider corporate responsibility, free speech, parental controls, and government regulation.',
    category: 'technology',
    difficulty: 'intermediate' as const,
    status: 'active' as const,
    weekNumber: 42,
    startDate: new Date('2024-10-21'),
    submissionDeadline: new Date('2024-10-26'),
    endDate: new Date('2024-10-27'),
    institutionId: undefined,
    isGlobal: true,
    allowedSubmissionTypes: ['video' as const, 'audio' as const, 'text' as const],
    maxDurationSeconds: 60,
    maxTextWords: 500,
    pointsReward: 50,
    submissionCount: 47,
    participantCount: 45,
    viewCount: 234,
  },
  {
    id: '2',
    topicId: 'topic2',
    title: 'Is climate change education mandatory in schools?',
    description: 'Debate whether climate change should be a required part of the curriculum. Consider scientific literacy, student engagement, and preparing for the future.',
    category: 'environment',
    difficulty: 'beginner' as const,
    status: 'upcoming' as const,
    weekNumber: 43,
    startDate: new Date('2024-10-28'),
    submissionDeadline: new Date('2024-11-02'),
    endDate: new Date('2024-11-03'),
    institutionId: undefined,
    isGlobal: true,
    allowedSubmissionTypes: ['video' as const, 'audio' as const, 'text' as const],
    maxDurationSeconds: 60,
    maxTextWords: 500,
    pointsReward: 50,
    submissionCount: 0,
    participantCount: 0,
    viewCount: 12,
  },
];

function DebatesPageContent() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const filteredDebates = mockDebates.filter(debate => {
    if (activeFilter === 'all') return true;
    return debate.status === activeFilter;
  });

  return (
    <NetflixDashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 border border-primary/30 p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  🎯 AI-Moderated Debate Room
                </h1>
                <p className="text-muted-foreground text-lg">
                  Sharpen your critical thinking and argumentation skills
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">50+</div>
                    <div className="text-sm text-muted-foreground">Points per debate</div>
                  </div>
                </div>
              </div>

              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">Weekly</div>
                    <div className="text-sm text-muted-foreground">New topics</div>
                  </div>
                </div>
              </div>

              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">AI</div>
                    <div className="text-sm text-muted-foreground">Powered scoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Choose Topic</h3>
              <p className="text-sm text-muted-foreground">
                Pick from weekly debate topics
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Submit Argument</h3>
              <p className="text-sm text-muted-foreground">
                Video, audio, or text (60s/500 words)
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get AI Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Scored on clarity, logic, evidence
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Compete & Win</h3>
              <p className="text-sm text-muted-foreground">
                Earn points and climb leaderboard
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 border-b border-border">
          {[
            { id: 'all', label: 'All Debates' },
            { id: 'active', label: 'Active' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-4 py-3 font-medium transition-colors relative ${
                activeFilter === filter.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Debates Grid */}
        {filteredDebates.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No debates found
            </h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for new debate topics!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDebates.map((debate) => (
              <DebateCard
                key={debate.id}
                debate={debate}
                userSubmitted={false}
              />
            ))}
          </div>
        )}

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/30 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">
            🚀 More Features Coming Soon!
          </h3>
          <p className="text-muted-foreground">
            Video/audio submissions, live leaderboards, peer voting, and institution tournaments
          </p>
        </div>
      </div>
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

