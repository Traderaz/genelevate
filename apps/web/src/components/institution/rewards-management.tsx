'use client';

import { useState } from 'react';
import { Gift, Award, Plus, Users, Search } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  cohort: string;
  currentPoints: number;
}

export function RewardsManagement() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [pointsToAward, setPointsToAward] = useState('');
  const [reason, setReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAwardModal, setShowAwardModal] = useState(false);

  const students: Student[] = [
    { id: '1', name: 'Sarah Johnson', cohort: 'Year 13 - Business', currentPoints: 2450 },
    { id: '2', name: 'Michael Chen', cohort: 'Year 12 - Computing', currentPoints: 2280 },
    { id: '3', name: 'Emma Williams', cohort: 'Year 13 - Business', currentPoints: 2150 },
    { id: '4', name: 'James Smith', cohort: 'Year 12 - Computing', currentPoints: 2050 },
    { id: '5', name: 'Olivia Brown', cohort: 'Year 11 - Science', currentPoints: 1980 }
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.cohort.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAwardPoints = () => {
    // In production, call Cloud Function to award points
    console.log('Awarding points:', {
      students: selectedStudents,
      points: pointsToAward,
      reason
    });
    setShowAwardModal(false);
    setSelectedStudents([]);
    setPointsToAward('');
    setReason('');
  };

  const recentAwards = [
    {
      id: '1',
      recipient: 'Year 12 - Computing (34 students)',
      points: 50,
      reason: 'Excellent participation in webinar',
      awardedBy: 'Admin',
      date: '2024-01-15'
    },
    {
      id: '2',
      recipient: 'Sarah Johnson',
      points: 100,
      reason: 'Outstanding project submission',
      awardedBy: 'Admin',
      date: '2024-01-14'
    },
    {
      id: '3',
      recipient: 'All Students',
      points: 25,
      reason: 'Year-end bonus',
      awardedBy: 'Admin',
      date: '2024-01-10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Rewards Management</h2>
        <button
          onClick={() => setShowAwardModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-all"
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white font-medium">Award Points</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-primary/50 transition-all text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Award className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-white">Award to Cohort</h3>
          </div>
          <p className="text-sm text-gray-400">Give points to an entire cohort</p>
        </button>

        <button className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-primary/50 transition-all text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-white">Top Performers Bonus</h3>
          </div>
          <p className="text-sm text-gray-400">Reward top 10 students</p>
        </button>

        <button className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-primary/50 transition-all text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Gift className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-white">Custom Rewards</h3>
          </div>
          <p className="text-sm text-gray-400">Create institution-specific rewards</p>
        </button>
      </div>

      {/* Recent Awards */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Awards</h3>
        <div className="space-y-3">
          {recentAwards.map((award) => (
            <div
              key={award.id}
              className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{award.recipient}</h4>
                  <p className="text-sm text-gray-400">{award.reason}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Awarded by {award.awardedBy} • {award.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">+{award.points}</p>
                <p className="text-sm text-gray-400">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Award Modal */}
      {showAwardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Award Points to Students</h2>
            
            <div className="space-y-4">
              {/* Search Students */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Select Students
                </label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredStudents.map((student) => (
                    <label
                      key={student.id}
                      className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudent(student.id)}
                        className="w-4 h-4 text-primary bg-gray-600 border-gray-500 rounded focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium">{student.name}</p>
                        <p className="text-sm text-gray-400">{student.cohort} • {student.currentPoints} points</p>
                      </div>
                    </label>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mt-2">
                  {selectedStudents.length} student{selectedStudents.length !== 1 ? 's' : ''} selected
                </p>
              </div>

              {/* Points to Award */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Points to Award
                </label>
                <input
                  type="number"
                  placeholder="e.g., 50"
                  value={pointsToAward}
                  onChange={(e) => setPointsToAward(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Reason (Optional)
                </label>
                <textarea
                  placeholder="e.g., Excellent participation in webinar"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAwardModal(false);
                    setSelectedStudents([]);
                    setPointsToAward('');
                    setReason('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAwardPoints}
                  disabled={selectedStudents.length === 0 || !pointsToAward}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Award Points
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

