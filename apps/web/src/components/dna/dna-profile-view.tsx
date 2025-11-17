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
      // Fetch real DNA data from Firestore
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      const dnaDoc = await getDoc(doc(db, 'learningDNA', userId));
      
      if (dnaDoc.exists()) {
        setDNA(dnaDoc.data() as LearningDNA);
      } else {
        // No DNA profile exists
        setDNA(null);
      }
    } catch (error) {
      console.error('Error loading DNA:', error);
      setDNA(null);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Brain className="w-16 h-16 animate-pulse text-teal-gold mx-auto" />
          <p className="text-white/80">Analyzing your Learning DNA...</p>
        </div>
      </div>
    );
  }

  if (!dna) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md teal-card border-2 border-white/20 rounded-xl p-8">
          <Brain className="w-16 h-16 text-teal-gold mx-auto" />
          <h2 className="text-2xl font-bold text-teal-card-text">No DNA Profile Yet</h2>
          <p className="text-teal-card-text-muted">
            Complete the learning style questionnaire to discover your unique Academic DNA!
          </p>
          <button className="teal-button-primary px-6 py-3 rounded-lg">
            Take Questionnaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white flex items-center gap-3 mb-2">
                <Brain className="w-10 h-10 text-teal-gold" />
                Your Academic DNA
              </h1>
              <p className="text-white/80 text-lg">
                Your unique learning fingerprint
              </p>
            </div>
            
            {isOwnProfile && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="teal-button-primary px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" /> Share
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Download className="w-5 h-5" /> Export
                </button>
              </div>
            )}
          </div>
          
          {/* Confidence Badge */}
          <div className="mt-4 inline-flex items-center gap-2 teal-card border border-white/20 rounded-lg px-4 py-2">
            <TrendingUp className={`w-5 h-5 ${getConfidenceColor(dna.confidence)}`} />
            <span className="text-teal-card-text font-medium">
              {dna.confidence}% Confidence
            </span>
            <span className="text-teal-card-text-muted text-sm">
              • {dna.dataPoints.toLocaleString()} data points
            </span>
          </div>
        </div>

        {/* DNA Strand Visualization */}
        <div className="mb-8">
          <DNAStrand cognitiveProfile={dna.cognitiveProfile} />
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 teal-card border border-white/20 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('cognitive')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'cognitive'
                ? 'teal-button-primary'
                : 'text-teal-card-text-muted hover:text-teal-card-text hover:bg-white/5'
            }`}
          >
            <Brain className="w-5 h-5 inline mr-2" />
            Cognitive Strengths
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'patterns'
                ? 'teal-button-primary'
                : 'text-teal-card-text-muted hover:text-teal-card-text hover:bg-white/5'
            }`}
          >
            <Clock className="w-5 h-5 inline mr-2" />
            Learning Patterns
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'subjects'
                ? 'teal-button-primary'
                : 'text-teal-card-text-muted hover:text-teal-card-text hover:bg-white/5'
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
              
              <div className="teal-card border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-teal-card-text mb-4">What This Means</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-teal-gold/10 border border-teal-gold/30 rounded-lg p-4">
                    <h4 className="font-semibold text-teal-gold mb-2">
                      🎯 Your Dominant Style: {dna.cognitiveProfile.dominantStyle.charAt(0).toUpperCase() + dna.cognitiveProfile.dominantStyle.slice(1)}
                    </h4>
                    <p className="text-teal-card-text-muted text-sm">
                      {getDominantStyleDescription(dna.cognitiveProfile.dominantStyle)}
                    </p>
                  </div>
                  
                  {dna.cognitiveProfile.secondaryStyle && (
                    <div className="bg-teal-primary/10 border border-teal-primary/30 rounded-lg p-4">
                      <h4 className="font-semibold text-teal-primary mb-2">
                        ⭐ Secondary Style: {dna.cognitiveProfile.secondaryStyle.charAt(0).toUpperCase() + dna.cognitiveProfile.secondaryStyle.slice(1)}
                      </h4>
                      <p className="text-teal-card-text-muted text-sm">
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
                <div className="teal-card border border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-teal-gold mb-2">
                    {dna.learningPatterns.avgSessionDuration}min
                  </div>
                  <div className="text-teal-card-text-muted text-sm">Avg. Session Length</div>
                </div>
                
                <div className="teal-card border border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-teal-primary mb-2">
                    {dna.learningPatterns.consistencyScore}%
                  </div>
                  <div className="text-teal-card-text-muted text-sm">Consistency Score</div>
                </div>
                
                <div className="teal-card border border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-teal-gold mb-2">
                    {dna.learningPatterns.focusScore}%
                  </div>
                  <div className="text-teal-card-text-muted text-sm">Focus Score</div>
                </div>
                
                <div className="teal-card border border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-teal-primary mb-2">
                    {dna.learningPatterns.completionRate}%
                  </div>
                  <div className="text-teal-card-text-muted text-sm">Completion Rate</div>
                </div>
              </div>

              <div className="teal-card border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-teal-card-text mb-4">Your Best Learning Times</h3>
                <div className="flex flex-wrap gap-2">
                  {dna.learningPatterns.peakHours.map((hour) => (
                    <span
                      key={hour}
                      className="px-4 py-2 bg-teal-gold/20 border border-teal-gold/30 rounded-full text-teal-gold font-medium"
                    >
                      {formatHour(hour)}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-teal-card-text-muted text-sm">
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
        <div className="mt-8 teal-card-glass border-2 border-teal-gold/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-teal-card-text mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-teal-gold" />
            Personalized Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold text-teal-card-text mb-2">📚 Study Methods</h4>
              <p className="text-teal-card-text-muted text-sm">
                Your logical and visual strengths suggest diagram-based learning and problem-solving exercises will be most effective.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold text-teal-card-text mb-2">⏰ Study Schedule</h4>
              <p className="text-teal-card-text-muted text-sm">
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

