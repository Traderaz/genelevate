/**
 * Share DNA Card Component
 * 
 * Modal for sharing DNA profile with privacy controls
 * Generates shareable links and downloadable cards
 */

'use client';

import { useState } from 'react';
import { X, Link2, Download, Copy, Check, Eye, EyeOff, Users, Building } from 'lucide-react';
import type { LearningDNA } from '@gen-elevate/shared/types/dna';

interface ShareDNACardProps {
  dna: LearningDNA;
  onClose: () => void;
}

export function ShareDNACard({ dna, onClose }: ShareDNACardProps) {
  const [shareSettings, setShareSettings] = useState(dna.sharing);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const shareUrl = shareSettings.shareableLink
    ? `https://genelevate.com/dna/share/${shareSettings.shareableLink}`
    : null;

  const handleGenerateLink = async () => {
    setGenerating(true);
    try {
      // In production, this would call a Cloud Function to generate a unique share ID
      // For now, simulate with a UUID
      const shareId = crypto.randomUUID();
      const newSettings = {
        ...shareSettings,
        shareableLink: shareId,
        isPublic: true,
      };
      setShareSettings(newSettings);
      
      // Update in Firestore (in production)
      // await updateDNASharing(dna.userId, newSettings);
    } catch (error) {
      console.error('Error generating link:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTogglePublic = async () => {
    const newSettings = {
      ...shareSettings,
      isPublic: !shareSettings.isPublic,
    };
    setShareSettings(newSettings);
    // Update in Firestore (in production)
  };

  const handleToggleParent = async () => {
    const newSettings = {
      ...shareSettings,
      parentCanView: !shareSettings.parentCanView,
    };
    setShareSettings(newSettings);
    // Update in Firestore (in production)
  };

  const handleToggleInstitution = async () => {
    const newSettings = {
      ...shareSettings,
      institutionCanView: !shareSettings.institutionCanView,
    };
    setShareSettings(newSettings);
    // Update in Firestore (in production)
  };

  const handleDownloadCard = () => {
    // In production, this would generate a beautiful PNG/PDF card
    // For now, just log
    console.log('Downloading DNA card...');
    alert('Download feature coming soon!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-white">Share Your DNA</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Privacy Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>

            {/* Public Sharing */}
            <div className="flex items-start justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {shareSettings.isPublic ? (
                    <Eye className="w-5 h-5 text-green-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="font-semibold text-white">Public Link</span>
                </div>
                <p className="text-sm text-gray-400">
                  Anyone with the link can view your DNA profile
                </p>
              </div>
              <button
                onClick={handleTogglePublic}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${shareSettings.isPublic ? 'bg-purple-600' : 'bg-gray-700'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${shareSettings.isPublic ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Parent Access */}
            <div className="flex items-start justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-white">Parent/Guardian Access</span>
                </div>
                <p className="text-sm text-gray-400">
                  Allow your parent or guardian to view your DNA
                </p>
              </div>
              <button
                onClick={handleToggleParent}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${shareSettings.parentCanView ? 'bg-blue-600' : 'bg-gray-700'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${shareSettings.parentCanView ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Institution Access */}
            <div className="flex items-start justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-white">School/Institution Access</span>
                </div>
                <p className="text-sm text-gray-400">
                  Allow your school to view your DNA for personalized support
                </p>
              </div>
              <button
                onClick={handleToggleInstitution}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${shareSettings.institutionCanView ? 'bg-yellow-600' : 'bg-gray-700'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${shareSettings.institutionCanView ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>

          {/* Generate/Display Shareable Link */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Shareable Link</h3>

            {!shareUrl ? (
              <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                <Link2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">
                  Generate a unique link to share your DNA profile
                </p>
                <button
                  onClick={handleGenerateLink}
                  disabled={generating}
                  className="btn-netflix bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                >
                  {generating ? 'Generating...' : 'Generate Link'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="btn-netflix bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                
                {copied && (
                  <p className="text-sm text-green-400 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Link copied to clipboard!
                  </p>
                )}

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-blue-300">
                    ℹ️ This link will remain active until you disable public sharing or delete your DNA profile.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Download Card */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Download Card</h3>
            <div className="p-6 bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-xl text-center">
              <Download className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-300 mb-4">
                Download a beautiful card with your DNA highlights
              </p>
              <button
                onClick={handleDownloadCard}
                className="btn-netflix bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Download className="w-5 h-5" />
                Download PNG
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Card Preview</h3>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold mb-1">My Learning DNA</h4>
                <p className="text-purple-100 text-sm">Academic Fingerprint</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl mb-1">🧠</div>
                  <div className="text-sm text-purple-100 mb-1">Dominant Style</div>
                  <div className="font-bold capitalize">{dna.cognitiveProfile.dominantStyle}</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl mb-1">⭐</div>
                  <div className="text-sm text-purple-100 mb-1">Top Subject</div>
                  <div className="font-bold">
                    {Object.entries(dna.subjectAffinities)
                      .sort(([, a], [, b]) => b.affinity - a.affinity)[0][0]}
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-purple-100 mb-2">Cognitive Strengths</div>
                <div className="flex flex-wrap gap-2">
                  {(['visual', 'auditory', 'kinesthetic', 'logical', 'creative'] as const).map(dim => {
                    const score = dna.cognitiveProfile[dim];
                    if (score >= 70) {
                      return (
                        <span key={dim} className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium capitalize">
                          {dim}: {score}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-purple-100">
                🧬 Generated by Gen Elevate • genelevate.com
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-netflix bg-gray-700 hover:bg-gray-600 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

