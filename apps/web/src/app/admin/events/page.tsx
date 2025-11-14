'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { RoleGuard } from '@/components/auth/role-guard';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  MapPin,
  Video,
  Clock,
  Tag,
  Search,
  Filter,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Event, EventType } from '@/types/events';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'webinar' as EventType,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    isVirtual: true,
    meetingLink: '',
    organizer: '',
    organizerEmail: '',
    maxParticipants: '',
    tags: '',
    yearGroups: '',
    subjects: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const eventsRef = collection(db as any, 'events');
      const eventsQuery = query(eventsRef, orderBy('startDate', 'desc'));
      const snapshot = await getDocs(eventsQuery);
      
      const eventsData: Event[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          description: data.description || '',
          type: data.type || 'other',
          startDate: data.startDate?.toDate() || new Date(),
          endDate: data.endDate?.toDate() || new Date(),
          location: data.location,
          isVirtual: data.isVirtual || false,
          meetingLink: data.meetingLink,
          organizer: data.organizer || '',
          organizerEmail: data.organizerEmail,
          maxParticipants: data.maxParticipants,
          registeredCount: data.registeredCount || 0,
          imageUrl: data.imageUrl,
          tags: data.tags || [],
          status: data.status || 'upcoming',
          yearGroups: data.yearGroups || [],
          subjects: data.subjects || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });

      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      const eventData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        startDate: Timestamp.fromDate(startDateTime),
        endDate: Timestamp.fromDate(endDateTime),
        location: formData.location || null,
        isVirtual: formData.isVirtual,
        meetingLink: formData.meetingLink || null,
        organizer: formData.organizer,
        organizerEmail: formData.organizerEmail || null,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
        registeredCount: 0,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        status: 'upcoming',
        yearGroups: formData.yearGroups ? formData.yearGroups.split(',').map(y => y.trim()) : [],
        subjects: formData.subjects ? formData.subjects.split(',').map(s => s.trim()) : [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await addDoc(collection(db as any, 'events'), eventData);
      setShowCreateModal(false);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;

    try {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      const eventData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        startDate: Timestamp.fromDate(startDateTime),
        endDate: Timestamp.fromDate(endDateTime),
        location: formData.location || null,
        isVirtual: formData.isVirtual,
        meetingLink: formData.meetingLink || null,
        organizer: formData.organizer,
        organizerEmail: formData.organizerEmail || null,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        yearGroups: formData.yearGroups ? formData.yearGroups.split(',').map(y => y.trim()) : [],
        subjects: formData.subjects ? formData.subjects.split(',').map(s => s.trim()) : [],
        updatedAt: Timestamp.now(),
      };

      await updateDoc(doc(db as any, 'events', editingEvent.id), eventData);
      setEditingEvent(null);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteDoc(doc(db as any, 'events', eventId));
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'webinar',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      location: '',
      isVirtual: true,
      meetingLink: '',
      organizer: '',
      organizerEmail: '',
      maxParticipants: '',
      tags: '',
      yearGroups: '',
      subjects: '',
    });
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      type: event.type,
      startDate: event.startDate.toISOString().split('T')[0],
      startTime: event.startDate.toTimeString().slice(0, 5),
      endDate: event.endDate.toISOString().split('T')[0],
      endTime: event.endDate.toTimeString().slice(0, 5),
      location: event.location || '',
      isVirtual: event.isVirtual,
      meetingLink: event.meetingLink || '',
      organizer: event.organizer,
      organizerEmail: event.organizerEmail || '',
      maxParticipants: event.maxParticipants?.toString() || '',
      tags: event.tags.join(', '),
      yearGroups: event.yearGroups?.join(', ') || '',
      subjects: event.subjects?.join(', ') || '',
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const eventTypes = ['all', 'webinar', 'workshop', 'seminar', 'conference', 'open-day', 'exam-prep', 'competition', 'social'];

  return (
    <RoleGuard allowedRoles={['admin']}>
      <NetflixDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                Events Management
              </h1>
              <p className="text-muted-foreground">Create and manage platform events</p>
            </div>
            <Button onClick={() => setShowCreateModal(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Event
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{events.length}</p>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {events.filter(e => e.status === 'upcoming').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {events.reduce((sum, e) => sum + e.registeredCount, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Registrations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {events.filter(e => e.isVirtual).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Virtual Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as EventType | 'all')}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Loading events...</p>
                </CardContent>
              </Card>
            ) : filteredEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No events found</p>
                </CardContent>
              </Card>
            ) : (
              filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {event.type}
                          </Badge>
                          {event.isVirtual ? (
                            <Badge variant="outline" className="text-blue-500">
                              <Video className="w-3 h-3 mr-1" />
                              Virtual
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-green-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              In-Person
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Start Date</p>
                            <p className="font-medium">{event.startDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Organizer</p>
                            <p className="font-medium">{event.organizer}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Registrations</p>
                            <p className="font-medium">
                              {event.registeredCount}
                              {event.maxParticipants && `/${event.maxParticipants}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <Badge variant="outline" className="capitalize">
                              {event.status}
                            </Badge>
                          </div>
                        </div>

                        {event.tags.length > 0 && (
                          <div className="flex items-center gap-2 mt-4">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            {event.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(event)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Create/Edit Modal */}
        {(showCreateModal || editingEvent) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </CardTitle>
                <CardDescription>
                  Fill in the event details below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    >
                      {eventTypes.filter(t => t !== 'all').map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Organizer *</label>
                    <input
                      type="text"
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Time *</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date *</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Time *</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isVirtual"
                    checked={formData.isVirtual}
                    onChange={(e) => setFormData({ ...formData, isVirtual: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="isVirtual" className="text-sm font-medium">
                    Virtual Event
                  </label>
                </div>

                {formData.isVirtual ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Meeting Link</label>
                    <input
                      type="url"
                      value={formData.meetingLink}
                      onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="https://meet.google.com/..."
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Building name, room number..."
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Participants</label>
                    <input
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Leave empty for unlimited"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Organizer Email</label>
                    <input
                      type="email"
                      value={formData.organizerEmail}
                      onChange={(e) => setFormData({ ...formData, organizerEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    placeholder="GCSE, Mathematics, Exam Prep"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingEvent(null);
                      resetForm();
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </NetflixDashboardLayout>
    </RoleGuard>
  );
}

