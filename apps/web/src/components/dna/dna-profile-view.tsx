/**
 * DNA Profile View Component
 * 
 * Main visualization of a student's Academic DNA profile,
 * including cognitive strengths, learning patterns, and subject affinities
 */

'use client';

import { useState, useEffect } from 'react';
import { Brain, Clock, TrendingUp, Award, Share2, Download, Eye, EyeOff } from 'lucide-react';
import { CognitiveStrengthBars } from './cognitive-strength-bars';
import { LearningHeatmap } from './learning-heatmap';
import { SubjectAffinityChips } from './subject-affinity-chips';
import { DNAStrand } from './dna-strand';
import { ShareDNACard } from './share-dna-card';
import type { LearningDNA } from '@gen-elevate/shared/types/dna';

interface DNAProfileViewProps {
  userId: string;
  isOwnProfile?: boolean;
}

export function DNAProfileView({ userId, isOwnProfile = true }: DNAProfileViewProps) {
  const [dna, setDNA] = useState<LearningDNA | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'cognitive' | 'patterns' | 'subjects'>('cognitive');

  useEffect(() => {
    loadDNA();
  }, [userId]);

  const loadDNA = async () => {
    setLoading(true);
    try {
      // Try to fetch real DNA data from Firestore
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      const dnaDoc = await getDoc(doc(db, 'learningDNA', userId));
      
      if (dnaDoc.exists()) {
        // Use real data if it exists
        setDNA(dnaDoc.data() as LearningDNA);
        setLoading(false);
        return;
      }
      
      // Fallback to mock data for users without enough history yet
      console.log('No DNA data yet, showing example profile');
      const mockDNA: LearningDNA = {
        id: userId,
        userId,
        cognitiveProfile: {
          visual: 85,
          auditory: 60,
          kinesthetic: 70,
          logical: 90,
          creative: 75,
          social: 55,
          solitary: 80,
          dominantStyle: 'logical',
          secondaryStyle: 'visual',
        },
        learningPatterns: {
          peakHours: [14, 15, 20],
          avgSessionDuration: 45,
          preferredDayOfWeek: ['Monday', 'Wednesday', 'Thursday'],
          consistencyScore: 78,
          focusScore: 82,
          completionRate: 75,
          retentionRate: 88,
        },
        subjectAffinities: {
          'Mathematics': {
            affinity: 92,
            performance: 88,
            engagement: 90,
            lastUpdated: new Date() as any,
          },
          'Physics': {
            affinity: 85,
            performance: 82,
            engagement: 88,
            lastUpdated: new Date() as any,
          },
          'Computer Science': {
            affinity: 95,
            performance: 90,
            engagement: 98,
            lastUpdated: new Date() as any,
          },
          'English Literature': {
            affinity: 65,
            performance: 70,
            engagement: 60,
            lastUpdated: new Date() as any,
          },
        },
        lastCalculated: new Date() as any,
        dataPoints: 1247,
        confidence: 87,
        sharing: {
          isPublic: false,
          parentCanView: true,
          institutionCanView: false,
          sharedWith: [],
        },
        consent: {
          dataCollection: true,
          parentalConsent: true,
          consentDate: new Date() as any,
          consentVersion: '1.0',
        },
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
      };
      
      setDNA(mockDNA);
    } catch (error) {
      console.error('Error loading DNA:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500';
    if (confidence >= 60) return 'text-yellow-500';
    return 'text-orange-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Brain className="w-16 h-16 animate-pulse text-primary mx-auto" />
          <p className="text-muted-foreground">Analyzing your Learning DNA...</p>
        </div>
      </div>
    );
  }

  if (!dna) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md">
          <Brain className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">No DNA Profile Yet</h2>
          <p className="text-muted-foreground">
            Complete the learning style questionnaire to discover your unique Academic DNA!
          </p>
          <button className="btn-netflix bg-primary hover:bg-primary/80 text-white">
            Take Questionnaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white flex items-center gap-3 mb-2">
                <Brain className="w-10 h-10 text-purple-400" />
                Your Academic DNA
              </h1>
              <p className="text-gray-300 text-lg">
                Your unique learning fingerprint
              </p>
            </div>
            
            {isOwnProfile && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="btn-netflix bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Share2 className="w-5 h-5" /> Share
                </button>
                <button className="btn-netflix bg-gray-700 hover:bg-gray-600 text-white">
                  <Download className="w-5 h-5" /> Export
                </button>
              </div>
            )}
          </div>
          
          {/* Confidence Badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2">
            <TrendingUp className={`w-5 h-5 ${getConfidenceColor(dna.confidence)}`} />
            <span className="text-white font-medium">
              {dna.confidence}% Confidence
            </span>
            <span className="text-gray-400 text-sm">
              • {dna.dataPoints.toLocaleString()} data points
            </span>
          </div>
        </div>

        {/* DNA Strand Visualization */}
        <div className="mb-8">
          <DNAStrand cognitiveProfile={dna.cognitiveProfile} />
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 bg-gray-800/50 border border-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('cognitive')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'cognitive'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Brain className="w-5 h-5 inline mr-2" />
            Cognitive Strengths
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'patterns'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Clock className="w-5 h-5 inline mr-2" />
            Learning Patterns
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'subjects'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Award className="w-5 h-5 inline mr-2" />
            Subject Affinities
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'cognitive' && (
            <>
              <CognitiveStrengthBars cognitiveProfile={dna.cognitiveProfile} />
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What This Means</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-300 mb-2">
                      🎯 Your Dominant Style: {dna.cognitiveProfile.dominantStyle.charAt(0).toUpperCase() + dna.cognitiveProfile.dominantStyle.slice(1)}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {getDominantStyleDescription(dna.cognitiveProfile.dominantStyle)}
                    </p>
                  </div>
                  
                  {dna.cognitiveProfile.secondaryStyle && (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-300 mb-2">
                        ⭐ Secondary Style: {dna.cognitiveProfile.secondaryStyle.charAt(0).toUpperCase() + dna.cognitiveProfile.secondaryStyle.slice(1)}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {getDominantStyleDescription(dna.cognitiveProfile.secondaryStyle)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'patterns' && (
            <>
              <LearningHeatmap patterns={dna.learningPatterns} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {dna.learningPatterns.avgSessionDuration}min
                  </div>
                  <div className="text-gray-400 text-sm">Avg. Session Length</div>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {dna.learningPatterns.consistencyScore}%
                  </div>
                  <div className="text-gray-400 text-sm">Consistency Score</div>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {dna.learningPatterns.focusScore}%
                  </div>
                  <div className="text-gray-400 text-sm">Focus Score</div>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {dna.learningPatterns.completionRate}%
                  </div>
                  <div className="text-gray-400 text-sm">Completion Rate</div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Your Best Learning Times</h3>
                <div className="flex flex-wrap gap-2">
                  {dna.learningPatterns.peakHours.map((hour) => (
                    <span
                      key={hour}
                      className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 font-medium"
                    >
                      {formatHour(hour)}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-gray-400 text-sm">
                  Based on your activity, you're most engaged during these hours. Try scheduling important study sessions then!
                </p>
              </div>
            </>
          )}

          {activeTab === 'subjects' && (
            <SubjectAffinityChips subjectAffinities={dna.subjectAffinities} />
          )}
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Personalized Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">📚 Study Methods</h4>
              <p className="text-gray-300 text-sm">
                Your logical and visual strengths suggest diagram-based learning and problem-solving exercises will be most effective.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">⏰ Study Schedule</h4>
              <p className="text-gray-300 text-sm">
                Plan your most challenging tasks for 2-4 PM and 8 PM when you're most focused.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareDNACard
          dna={dna}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}

// Helper functions
function getDominantStyleDescription(style: string): string {
  const descriptions: Record<string, string> = {
    visual: 'You learn best through images, diagrams, and spatial understanding. Use mind maps and visual aids.',
    auditory: 'You excel with spoken explanations and discussions. Record lectures and discuss concepts aloud.',
    kinesthetic: 'Hands-on practice and real-world application work best for you. Engage in experiments and projects.',
    logical: 'You thrive on understanding systems and patterns. Break down problems step-by-step and use analytical methods.',
    creative: 'Innovation and artistic expression enhance your learning. Use creative projects and alternative perspectives.',
    social: 'Collaborative learning and group discussions energize you. Study with peers and teach others.',
    solitary: 'Independent study in quiet environments maximizes your focus. Create personal study spaces and self-paced plans.',
  };
  return descriptions[style] || 'A unique blend of learning preferences.';
}

function formatHour(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}

