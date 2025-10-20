'use client';

import { useState } from 'react';
import { Link2, Copy, CheckCircle, Plus, QrCode, BarChart3, Users } from 'lucide-react';

interface ReferralLink {
  id: string;
  name: string;
  code: string;
  url: string;
  clicks: number;
  signups: number;
  conversionRate: number;
  createdAt: string;
  status: 'active' | 'paused';
}

export function ReferralLinks() {
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>([
    {
      id: '1',
      name: 'Year 12 Enrollment',
      code: 'Y12-2024',
      url: 'https://genelevate.com/register?ref=Y12-2024',
      clicks: 156,
      signups: 34,
      conversionRate: 21.8,
      createdAt: '2024-09-01',
      status: 'active'
    },
    {
      id: '2',
      name: 'Open Day Campaign',
      code: 'OPENDAY',
      url: 'https://genelevate.com/register?ref=OPENDAY',
      clicks: 89,
      signups: 12,
      conversionRate: 13.5,
      createdAt: '2024-10-15',
      status: 'active'
    }
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalClicks = referralLinks.reduce((sum, link) => sum + link.clicks, 0);
  const totalSignups = referralLinks.reduce((sum, link) => sum + link.signups, 0);
  const avgConversion = totalClicks > 0 ? (totalSignups / totalClicks) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Clicks</p>
              <p className="text-2xl font-bold text-white">{totalClicks.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Signups</p>
              <p className="text-2xl font-bold text-white">{totalSignups}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Conversion</p>
              <p className="text-2xl font-bold text-white">{avgConversion.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Referral Links</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-all"
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white font-medium">Create Link</span>
        </button>
      </div>

      {/* Referral Links List */}
      <div className="space-y-4">
        {referralLinks.map((link) => (
          <div
            key={link.id}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{link.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    link.status === 'active'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-gray-500/10 text-gray-500'
                  }`}>
                    {link.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400">Code: {link.code}</p>
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-all">
                <QrCode className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* URL Box */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
              <Link2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={link.url}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-300 outline-none"
              />
              <button
                onClick={() => copyToClipboard(link.url, link.id)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded transition-all"
              >
                {copiedId === link.id ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Clicks</p>
                <p className="text-xl font-bold text-white">{link.clicks}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Signups</p>
                <p className="text-xl font-bold text-white">{link.signups}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Conversion</p>
                <p className="text-xl font-bold text-white">{link.conversionRate}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${link.conversionRate}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Create Referral Link</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Link Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Year 12 Enrollment"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Referral Code
                </label>
                <input
                  type="text"
                  placeholder="e.g., Y12-2024"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Letters, numbers, and hyphens only
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white transition-all">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

