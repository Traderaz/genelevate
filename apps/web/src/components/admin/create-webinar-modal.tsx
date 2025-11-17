'use client';

import { useState, useEffect } from 'react';
import { X, Video, Calendar, Clock, Users, Save, Loader2, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Webinar {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  scheduledAt: any;
  duration: number;
  host: {
    id: string;
    name: string;
  };
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  dailyRoomUrl?: string;
  maxAttendees?: number;
  subject?: string;
  tags: string[];
}

interface CreateWebinarModalProps {
  webinar: Webinar | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateWebinarModal({ webinar, onClose, onSuccess }: CreateWebinarModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    maxAttendees: 100,
    subject: '',
    tags: [] as string[],
    dailyRoomUrl: '',
    status: 'scheduled' as 'scheduled' | 'live' | 'ended' | 'cancelled',
  });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (webinar) {
      const scheduledDate = webinar.scheduledAt?.toDate?.() || new Date(webinar.scheduledAt);
      setFormData({
        title: webinar.title,
        description: webinar.description,
        shortDescription: webinar.shortDescription,
        scheduledDate: scheduledDate.toISOString().split('T')[0],
        scheduledTime: scheduledDate.toTimeString().slice(0, 5),
        duration: webinar.duration,
        maxAttendees: webinar.maxAttendees || 100,
        subject: webinar.subject || '',
        tags: webinar.tags || [],
        dailyRoomUrl: webinar.dailyRoomUrl || '',
        status: webinar.status,
      });
    } else {
      // Set default date/time to tomorrow at 10:00
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      setFormData((prev) => ({
        ...prev,
        scheduledDate: tomorrow.toISOString().split('T')[0],
        scheduledTime: '10:00',
      }));
    }
  }, [webinar]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;

    if (formData.tags.includes(trimmedTag)) {
      toast.error('This tag is already added');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, trimmedTag],
    }));
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Please enter a description');
      return;
    }

    if (!formData.scheduledDate || !formData.scheduledTime) {
      toast.error('Please set a date and time');
      return;
    }

    setSaving(true);

    try {
      const { doc, addDoc, updateDoc, collection, serverTimestamp, Timestamp } =
        await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      const { getAuth } = await import('firebase/auth');

      const auth = getAuth();
      const adminId = auth.currentUser?.uid;
      const adminName = auth.currentUser?.displayName || auth.currentUser?.email || 'Admin';

      const meetingLink = formData.dailyRoomUrl.trim();

      // Require a meeting link
      if (!meetingLink) {
        toast.error('Please provide a Teams/Zoom meeting link');
        setSaving(false);
        return;
      }

      // Combine date and time
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
      const scheduledTimestamp = Timestamp.fromDate(scheduledDateTime);

      const webinarData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim() || formData.description.trim().substring(0, 150),
        scheduledAt: scheduledTimestamp,
        duration: formData.duration,
        maxAttendees: formData.maxAttendees,
        currentAttendees: webinar?.currentAttendees || 0,
        subject: formData.subject.trim(),
        tags: formData.tags,
        dailyRoomUrl: meetingLink,
        providerJoinUrl: meetingLink, // For compatibility with provider pattern
        meetingLink: meetingLink, // Primary meeting link field
        host: {
          id: adminId || '',
          name: adminName,
        },
        status: formData.status,
        type: 'live' as const,
        recordingAvailable: false,
        allowChat: true,
        allowQA: true,
        allowPolls: true,
        requiresRegistration: false,
        registrationCount: 0,
        thumbnail: '/images/webinar-default.jpg', // You can add image upload later
        yearGroups: [],
        agenda: [],
        materials: [],
        isPublic: true,
        isPremium: true,
        updatedAt: serverTimestamp(),
      };

      if (webinar) {
        // Update existing webinar
        const webinarRef = doc(db, 'webinars', webinar.id);
        await updateDoc(webinarRef, webinarData);
        toast.success('Webinar updated successfully');
      } else {
        // Create new webinar
        const webinarsRef = collection(db, 'webinars');
        await addDoc(webinarsRef, {
          ...webinarData,
          createdAt: serverTimestamp(),
        });
        toast.success('Webinar created successfully!');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving webinar:', error);
      toast.error('Failed to save webinar. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-[700px] max-h-[90vh] overflow-y-auto teal-card border-2 border-teal-gold/30 rounded-2xl shadow-2xl">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-teal-gold" />
              <h2 className="text-2xl font-bold text-teal-card-text">
                {webinar ? 'Edit Webinar' : 'Create New Webinar'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-teal-card-text" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-teal-card-text mb-2">
                Webinar Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Career Skills Workshop: Interview Techniques"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-teal-card-text mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Detailed description of what students will learn..."
                className="w-full h-24 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold resize-none"
                required
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-semibold text-teal-card-text mb-2">
                Short Description (Optional)
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))
                }
                placeholder="Brief summary for cards (auto-generated if empty)"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, scheduledDate: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, scheduledTime: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  required
                />
              </div>
            </div>

            {/* Duration & Max Attendees */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="15"
                  max="240"
                  step="15"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, duration: parseInt(e.target.value) }))
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Max Attendees
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  step="10"
                  value={formData.maxAttendees}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, maxAttendees: parseInt(e.target.value) }))
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-teal-card-text mb-2">
                Subject (Optional)
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="e.g., Career Development, Study Skills"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
              />
            </div>

            {/* Meeting Link (Teams/Zoom) */}
            <div>
              <label className="block text-sm font-semibold text-teal-card-text mb-2">
                <LinkIcon className="w-4 h-4 inline mr-1" />
                Meeting Link (Teams/Zoom) <span className="text-red-400">*</span>
              </label>
              <div className="mb-3 bg-teal-primary/10 border border-teal-primary/30 rounded-lg p-3">
                <p className="text-xs text-teal-card-text">
                  <Video className="w-4 h-4 inline mr-1" />
                  <strong>Enter your Teams or Zoom link:</strong> Students will use this link to join the webinar.
                </p>
              </div>
              <input
                type="url"
                value={formData.dailyRoomUrl}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dailyRoomUrl: e.target.value }))
                }
                placeholder="https://teams.microsoft.com/... or https://zoom.us/j/..."
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-teal-card-text mb-2">
                Tags (Optional)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Enter tag and press Enter"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-teal-card-text placeholder:text-teal-card-text-muted focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-teal-gold/20 hover:bg-teal-gold/30 text-teal-gold rounded-lg transition-colors font-semibold"
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-teal-primary/20 border border-teal-primary/30 text-teal-primary text-sm rounded-full flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Status (for editing) */}
            {webinar && (
              <div>
                <label className="block text-sm font-semibold text-teal-card-text mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as 'scheduled' | 'live' | 'ended' | 'cancelled',
                    }))
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-teal-card-text focus:outline-none focus:ring-2 focus:ring-teal-gold focus:border-teal-gold"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="live">Live</option>
                  <option value="ended">Ended</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 teal-button-primary font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {webinar ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {webinar ? 'Update Webinar' : 'Create Webinar'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-teal-card-text font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

