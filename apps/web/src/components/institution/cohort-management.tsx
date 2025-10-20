'use client';

import { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, Filter, Download, MoreVertical } from 'lucide-react';

interface Cohort {
  id: string;
  name: string;
  yearGroup: string;
  students: number;
  avgProgress: number;
  completionRate: number;
  createdAt: string;
  status: 'active' | 'archived';
}

export function CohortManagement() {
  const [cohorts, setCohorts] = useState<Cohort[]>([
    {
      id: '1',
      name: 'Year 12 - Computing',
      yearGroup: 'Year 12',
      students: 34,
      avgProgress: 72,
      completionRate: 65,
      createdAt: '2024-09-01',
      status: 'active'
    },
    {
      id: '2',
      name: 'Year 13 - Business',
      yearGroup: 'Year 13',
      students: 28,
      avgProgress: 85,
      completionRate: 82,
      createdAt: '2024-09-01',
      status: 'active'
    },
    {
      id: '3',
      name: 'Year 11 - Science',
      yearGroup: 'Year 11',
      students: 42,
      avgProgress: 58,
      completionRate: 48,
      createdAt: '2024-09-15',
      status: 'active'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredCohorts = cohorts.filter((cohort) =>
    cohort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cohort.yearGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cohorts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-white">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all">
            <Download className="w-4 h-4 text-gray-400" />
            <span className="text-white">Export</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-all"
          >
            <Plus className="w-4 h-4 text-white" />
            <span className="text-white font-medium">Create Cohort</span>
          </button>
        </div>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCohorts.map((cohort) => (
          <div
            key={cohort.id}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-primary/50 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{cohort.name}</h3>
                  <p className="text-sm text-gray-400">{cohort.yearGroup}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-all">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Students</span>
                <span className="text-sm font-semibold text-white">{cohort.students}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg. Progress</span>
                <span className="text-sm font-semibold text-white">{cohort.avgProgress}%</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Completion Rate</span>
                  <span className="text-sm font-semibold text-white">{cohort.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${cohort.completionRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-700">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all">
                <Edit className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-white">Edit</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-white">View Students</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Create New Cohort</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Cohort Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Year 12 - Computing"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Year Group
                </label>
                <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary">
                  <option>Year 11</option>
                  <option>Year 12</option>
                  <option>Year 13</option>
                </select>
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

