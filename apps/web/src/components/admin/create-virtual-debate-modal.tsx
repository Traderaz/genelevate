'use client';

import { useState, useEffect } from 'react';
import { X, Video, Calendar, Clock, Users, Link as LinkIcon, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { VirtualDebate } from '@/types/virtual-debates';

interface DebateTopic {
  id: string;
  title: string;
  month: string;
  year: number;
}

interface CreateVirtualDebateModalProps {
  debate: VirtualDebate | null;
  debateTopics: DebateTopic[];
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateVirtualDebateModal({ 
  debate, 
  debateTopics, 
  onClose, 
  onSuccess 
}: CreateVirtualDebateModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    debateTopic: '',
    scheduledDate: '',
    scheduledTime: '',
    durationMinutes: 60,
    meetingLink: '',
    participantIds: [] as string[],
    status: 'scheduled' as 'scheduled' | 'live' | 'completed' | 'cancelled',
  });
  const [participantInput, setParticipantInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (debate) {
      const scheduledDate = debate.scheduledTime.toDate();
      setFormData({
        title: debate.title,
        description: debate.description,
        debateTopic: debate.debateTopicId, // Store the topic ID as text
        scheduledDate: scheduledDate.toISOString().split('T')[0],
        scheduledTime: scheduledDate.toTimeString().slice(0, 5),
        durationMinutes: debate.durationMinutes,
        meetingLink: debate.meetingLink,
        participantIds: debate.participants,
        status: debate.status,
      });
    } else {
      // Set default date/time to tomorrow at 18:00
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(18, 0, 0, 0);
      setFormData(prev => ({
        ...prev,
        scheduledDate: tomorrow.toISOString().split('T')[0],
        scheduledTime: '18:00',
      }));
    }
  }, [debate]);

  const handleAddParticipant = () => {
    const trimmedId = participantInput.trim();
    if (!trimmedId) return;

    if (formData.participantIds.includes(trimmedId)) {
      toast.error('This participant is already added');
      return;
    }

    setFormData(prev => ({
      ...prev,
      participantIds: [...prev.participantIds, trimmedId],
    }));
    setParticipantInput('');
  };

  const handleRemoveParticipant = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      participantIds: prev.participantIds.filter(id => id !== userId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!formData.debateTopic.trim()) {
      toast.error('Please enter a debate topic');
      return;
    }

    if (!formData.scheduledDate || !formData.scheduledTime) {
      toast.error('Please set a date and time');
      return;
    }

    if (formData.participantIds.length === 0) {
      toast.error('Please add at least one participant');
      return;
    }

    setSaving(true);

    try {
      const { doc, addDoc, updateDoc, collection, serverTimestamp, Timestamp } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      const { getAuth } = await import('firebase/auth');

      const auth = getAuth();
      const adminId = auth.currentUser?.uid;

      let meetingLink = formData.meetingLink.trim();

      // If no meeting link provided or it's a new debate, create a Daily.co room
      if (!debate && !meetingLink) {
        toast.info('Creating video room...');
        
        try {
          const response = await fetch('/api/debates/create-room', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              debateTitle: formData.title,
              durationMinutes: formData.durationMinutes,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create room');
          }

          const roomData = await response.json();
          meetingLink = roomData.roomUrl;
          toast.success('Video room created!');
        } catch (error) {
          console.error('Error creating Daily.co room:', error);
          toast.error('Failed to create video room. Please add a meeting link manually.');
          setSaving(false);
          return;
        }
      }

      // Combine date and time
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
      const scheduledTimestamp = Timestamp.fromDate(scheduledDateTime);

      const debateData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        debateTopicId: formData.debateTopic.trim(),
        scheduledTime: scheduledTimestamp,
        durationMinutes: formData.durationMinutes,
        meetingLink: meetingLink,
        participants: formData.participantIds,
        hostId: adminId || '',
        status: formData.status,
        recordingUrl: debate?.recordingUrl || '',
        updatedAt: serverTimestamp(),
      };

      if (debate) {
        // Update existing debate
        const debateRef = doc(db, 'virtualDebates', debate.id);
        await updateDoc(debateRef, debateData);
        toast.success('Virtual debate updated successfully');
      } else {
        // Create new debate
        const debatesRef = collection(db, 'virtualDebates');
        await addDoc(debatesRef, {
          ...debateData,
          createdAt: serverTimestamp(),
        });
        toast.success('Virtual debate created successfully with video room!');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving virtual debate:', error);
      toast.error('Failed to save virtual debate. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-[700px] max-h-[90vh] overflow-y-auto teal-card border-2 border-teal-gold/30 rounded-2xl shadow-2xl">
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-gold/20 flex items-center justify-center">
                  <Video className="w-6 h-6 text-teal-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-teal-card-text">
                    {debate ? 'Edit Virtual Debate' : 'Schedule New Virtual Debate'}
                  </h2>
                  <p className="text-teal-card-text-muted text-sm">
                    Live team debate for top performers
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-teal-card-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  Debate Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Monthly Debate Championship - January"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the debate format and rules..."
                  className="w-full h-24 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold resize-none"
                />
              </div>

              {/* Debate Topic */}
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  Debate Topic
                </label>
                <input
                  type="text"
                  value={formData.debateTopic}
                  onChange={(e) => setFormData(prev => ({ ...prev, debateTopic: e.target.value }))}
                  placeholder="e.g., Should AI Replace Teachers?"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-teal-card-text mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-teal-card-text mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                    required
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="15"
                  max="180"
                  value={formData.durationMinutes}
                  onChange={(e) => setFormData(prev => ({ ...prev, durationMinutes: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  required
                />
              </div>

              {/* Meeting Link */}
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  <LinkIcon className="w-4 h-4 inline mr-1" />
                  Meeting Link (Optional)
                </label>
                {!debate && (
                  <div className="mb-3 bg-teal-gold/10 border border-teal-gold/30 rounded-lg p-3">
                    <p className="text-xs text-teal-card-text">
                      <Video className="w-4 h-4 inline mr-1" />
                      <strong>Auto-Generate Room:</strong> Leave empty to automatically create an embedded video room on your website.
                    </p>
                  </div>
                )}
                <input
                  type="url"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
                  placeholder={debate ? "https://genelevate.daily.co/debate-xxx" : "Leave empty for auto-generated room or paste external link"}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                />
              </div>

              {/* Participants */}
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Participant User IDs (Top Students)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={participantInput}
                    onChange={(e) => setParticipantInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddParticipant())}
                    placeholder="Enter user ID and press Enter"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  />
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="px-4 py-2 bg-teal-gold text-gray-900 font-semibold rounded-lg hover:bg-teal-gold/80 transition-colors"
                  >
                    Add
                  </button>
                </div>

                {formData.participantIds.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.participantIds.map((userId) => (
                      <div
                        key={userId}
                        className="flex items-center gap-2 px-3 py-1.5 bg-teal-primary/20 border border-teal-primary/30 rounded-lg text-sm"
                      >
                        <span className="text-teal-card-text font-mono">{userId}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveParticipant(userId)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-teal-card-text-muted italic">No participants added yet</p>
                )}
              </div>

              {/* Status (if editing) */}
              {debate && (
                <div>
                  <label className="block text-sm font-semibold text-teal-card-text mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  >
                    <option value="scheduled" className="bg-gray-900">Scheduled</option>
                    <option value="live" className="bg-gray-900">Live</option>
                    <option value="completed" className="bg-gray-900">Completed</option>
                    <option value="cancelled" className="bg-gray-900">Cancelled</option>
                  </select>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full teal-button-primary py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {debate ? 'Update Debate' : 'Create Debate'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

