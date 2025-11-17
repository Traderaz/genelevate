'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { RoleGuard } from '@/components/auth/role-guard';
import {
  Video,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Users,
  Play,
  Pause,
  Eye,
  Copy,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { CreateWebinarModal } from '@/components/admin/create-webinar-modal';
import Link from 'next/link';

interface Webinar {
  id: string;
  title: string;
  description: string;
  scheduledAt: any;
  duration: number;
  host: {
    id: string;
    name: string;
  };
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  dailyRoomUrl?: string;
  maxAttendees?: number;
  currentAttendees: number;
}

function AdminWebinarsContent() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null);

  useEffect(() => {
    loadWebinars();
  }, []);

  const loadWebinars = async () => {
    setLoading(true);
    try {
      const webinarsRef = collection(db, 'webinars');
      const q = query(webinarsRef, orderBy('scheduledAt', 'desc'));
      const snapshot = await getDocs(q);

      const webinarsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Webinar[];

      setWebinars(webinarsData);
    } catch (error) {
      console.error('Error loading webinars:', error);
      toast.error('Failed to load webinars');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (webinarId: string) => {
    if (!confirm('Are you sure you want to delete this webinar?')) return;

    try {
      await deleteDoc(doc(db, 'webinars', webinarId));
      toast.success('Webinar deleted successfully');
      loadWebinars();
    } catch (error) {
      console.error('Error deleting webinar:', error);
      toast.error('Failed to delete webinar');
    }
  };

  const copyRoomUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Room URL copied to clipboard!');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      live: 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse',
      ended: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      cancelled: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full border ${styles[status as keyof typeof styles] || styles.scheduled}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <NetflixDashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin h-12 w-12 text-teal-gold" />
        </div>
      </NetflixDashboardLayout>
    );
  }

  return (
    <NetflixDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Webinar Management</h1>
            <p className="text-white/70 mt-1">
              Create and manage live webinars with embedded video rooms
            </p>
          </div>
          <button
            onClick={() => {
              setEditingWebinar(null);
              setShowCreateModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-gold hover:bg-teal-gold/80 text-gray-900 font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Webinar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="teal-card border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-card-text-muted">Total Webinars</p>
                <p className="text-2xl font-bold text-teal-card-text mt-1">
                  {webinars.length}
                </p>
              </div>
              <Video className="w-8 h-8 text-teal-gold" />
            </div>
          </div>

          <div className="teal-card border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-card-text-muted">Scheduled</p>
                <p className="text-2xl font-bold text-teal-card-text mt-1">
                  {webinars.filter((w) => w.status === 'scheduled').length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="teal-card border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-card-text-muted">Live Now</p>
                <p className="text-2xl font-bold text-teal-card-text mt-1">
                  {webinars.filter((w) => w.status === 'live').length}
                </p>
              </div>
              <Play className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="teal-card border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-card-text-muted">Total Attendees</p>
                <p className="text-2xl font-bold text-teal-card-text mt-1">
                  {webinars.reduce((acc, w) => acc + w.currentAttendees, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-teal-primary" />
            </div>
          </div>
        </div>

        {/* Webinars List */}
        <div className="teal-card border border-white/20 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/20">
            <h2 className="text-lg font-semibold text-teal-card-text flex items-center gap-2">
              <Video className="w-5 h-5 text-teal-gold" />
              All Webinars ({webinars.length})
            </h2>
          </div>

          {webinars.length === 0 ? (
            <div className="p-12 text-center">
              <Video className="w-16 h-16 mx-auto text-teal-card-text-muted mb-4" />
              <h3 className="text-lg font-semibold text-teal-card-text mb-2">
                No webinars yet
              </h3>
              <p className="text-teal-card-text-muted mb-4">
                Create your first webinar to get started
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 teal-button-primary"
              >
                <Plus className="w-4 h-4" />
                Create Webinar
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-card-text uppercase tracking-wider">
                      Webinar
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-card-text uppercase tracking-wider">
                      Scheduled
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-card-text uppercase tracking-wider">
                      Host
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-card-text uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-card-text uppercase tracking-wider">
                      Attendees
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-card-text uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-teal-card-text uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {webinars.map((webinar) => {
                    const scheduledDate = webinar.scheduledAt?.toDate?.() || new Date(webinar.scheduledAt);
                    return (
                      <tr key={webinar.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <Video className="w-5 h-5 text-teal-gold flex-shrink-0 mt-1" />
                            <div>
                              <Link
                                href={`/webinars/${webinar.id}`}
                                className="font-semibold text-teal-card-text hover:text-teal-gold transition-colors"
                              >
                                {webinar.title}
                              </Link>
                              <p className="text-xs text-teal-card-text-muted mt-1 line-clamp-1">
                                {webinar.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <div className="flex items-center gap-2 text-teal-card-text">
                              <Calendar className="w-4 h-4" />
                              {scheduledDate.toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-teal-card-text-muted mt-1">
                              <Clock className="w-4 h-4" />
                              {scheduledDate.toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-teal-card-text">{webinar.host.name}</p>
                        </td>
                        <td className="px-4 py-4">{getStatusBadge(webinar.status)}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-teal-card-text-muted" />
                            <span className="text-sm text-teal-card-text">
                              {webinar.currentAttendees}
                              {webinar.maxAttendees ? ` / ${webinar.maxAttendees}` : ''}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {webinar.dailyRoomUrl ? (
                            <button
                              onClick={() => copyRoomUrl(webinar.dailyRoomUrl!)}
                              className="flex items-center gap-2 text-xs text-teal-gold hover:underline"
                              title="Copy room URL"
                            >
                              <Copy className="w-3 h-3" />
                              Daily.co
                            </button>
                          ) : (
                            <span className="text-xs text-teal-card-text-muted">No room</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/webinars/${webinar.id}`}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4 text-teal-card-text" />
                            </Link>
                            <button
                              onClick={() => {
                                setEditingWebinar(webinar);
                                setShowCreateModal(true);
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-teal-card-text" />
                            </button>
                            {webinar.dailyRoomUrl && (
                              <Link
                                href={webinar.dailyRoomUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                title="Open room"
                              >
                                <ExternalLink className="w-4 h-4 text-teal-card-text" />
                              </Link>
                            )}
                            <button
                              onClick={() => handleDelete(webinar.id)}
                              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <CreateWebinarModal
          webinar={editingWebinar}
          onClose={() => {
            setShowCreateModal(false);
            setEditingWebinar(null);
          }}
          onSuccess={() => {
            setShowCreateModal(false);
            setEditingWebinar(null);
            loadWebinars();
          }}
        />
      )}
    </NetflixDashboardLayout>
  );
}

export default function AdminWebinarsPage() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <AdminWebinarsContent />
    </RoleGuard>
  );
}

