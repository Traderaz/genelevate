'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { RoleGuard } from '@/components/auth/role-guard';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  BookOpen,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Bell,
  ExternalLink
} from 'lucide-react';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ScheduleItem {
  id: string;
  title: string;
  type: 'webinar' | 'event' | 'course-session' | 'other';
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  instructor?: string;
  organizer?: string;
  description: string;
  category?: string;
  color: string;
}

export default function SchedulePage() {
  const { user } = useAuth();
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [filterType, setFilterType] = useState<'all' | 'webinar' | 'event' | 'course-session'>('all');

  useEffect(() => {
    if (!user) return;
    fetchScheduleItems();
  }, [user, currentWeek]);

  const fetchScheduleItems = async () => {
    try {
      setIsLoading(true);
      const items: ScheduleItem[] = [];

      // Get start and end of current week
      const startOfWeek = new Date(currentWeek);
      startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      endOfWeek.setHours(23, 59, 59, 999);

      // Fetch Events
      const eventsRef = collection(db as any, 'events');
      const eventsQuery = query(
        eventsRef,
        where('startDate', '>=', Timestamp.fromDate(startOfWeek)),
        where('startDate', '<=', Timestamp.fromDate(endOfWeek)),
        orderBy('startDate', 'asc')
      );

      const eventsSnapshot = await getDocs(eventsQuery);
      eventsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        items.push({
          id: `event-${doc.id}`,
          title: data.title || 'Untitled Event',
          type: 'event',
          startDate: data.startDate?.toDate() || new Date(),
          endDate: data.endDate?.toDate() || new Date(),
          location: data.location,
          isVirtual: data.isVirtual || false,
          meetingLink: data.meetingLink,
          organizer: data.organizer,
          description: data.description || '',
          category: data.type || 'other',
          color: getColorForEventType(data.type)
        });
      });

      // Fetch Webinars
      const webinarsRef = collection(db as any, 'webinars');
      const webinarsQuery = query(
        webinarsRef,
        where('startDate', '>=', Timestamp.fromDate(startOfWeek)),
        where('startDate', '<=', Timestamp.fromDate(endOfWeek)),
        where('status', '==', 'scheduled'),
        orderBy('startDate', 'asc')
      );

      const webinarsSnapshot = await getDocs(webinarsQuery);
      webinarsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        const startDate = data.startDate?.toDate() || new Date();
        const duration = data.duration || 60; // minutes
        const endDate = new Date(startDate.getTime() + duration * 60000);

        items.push({
          id: `webinar-${doc.id}`,
          title: data.title || 'Untitled Webinar',
          type: 'webinar',
          startDate,
          endDate,
          isVirtual: true,
          meetingLink: data.meetingLink || data.zoomLink,
          instructor: data.instructor,
          description: data.description || '',
          category: data.category || 'webinar',
          color: 'bg-blue-500'
        });
      });

      // Sort all items by start date
      items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

      setScheduleItems(items);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getColorForEventType = (type: string): string => {
    const colors: Record<string, string> = {
      webinar: 'bg-blue-500',
      workshop: 'bg-purple-500',
      seminar: 'bg-orange-500',
      conference: 'bg-cyan-500',
      'open-day': 'bg-green-500',
      'exam-prep': 'bg-red-500',
      competition: 'bg-yellow-500',
      social: 'bg-pink-500',
      other: 'bg-gray-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getWeekDays = () => {
    const days = [];
    const start = new Date(currentWeek);
    start.setDate(currentWeek.getDate() - currentWeek.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getItemsForDay = (date: Date) => {
    return scheduleItems.filter(item => {
      const itemDate = new Date(item.startDate);
      return (
        itemDate.getDate() === date.getDate() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getFullYear() === date.getFullYear() &&
        (filterType === 'all' || item.type === filterType)
      );
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const previousWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(prev);
  };

  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(next);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  const weekDays = getWeekDays();
  const filteredItems = scheduleItems.filter(item => filterType === 'all' || item.type === filterType);

  return (
    <RoleGuard allowedRoles={['student', 'parent', 'institution', 'admin']}>
      <NetflixDashboardLayout>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/80 border-b border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg shadow-primary/25">
                    <CalendarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-2">My Schedule</h1>
                    <p className="text-base sm:text-lg text-muted-foreground">
                      All your webinars, events, and sessions in one place
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex gap-2">
                  <Button variant="outline" onClick={goToToday}>
                    Today
                  </Button>
                  <Button variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    Reminders
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={previousWeek}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-xl font-bold text-foreground">
                  {weekDays[0].toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </div>
                <Button variant="outline" size="sm" onClick={nextWeek}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="all">All Items</option>
                  <option value="webinar">Webinars</option>
                  <option value="event">Events</option>
                  <option value="course-session">Course Sessions</option>
                </select>
              </div>
            </div>

            {/* Week View */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 h-64 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {weekDays.map((day, index) => {
                  const dayItems = getItemsForDay(day);
                  const isToday = 
                    day.getDate() === new Date().getDate() &&
                    day.getMonth() === new Date().getMonth() &&
                    day.getFullYear() === new Date().getFullYear();

                  return (
                    <div key={index} className="flex flex-col">
                      <div className={`text-center p-3 rounded-t-xl border-b border-border ${
                        isToday ? 'bg-primary text-primary-foreground' : 'bg-card'
                      }`}>
                        <div className="text-sm font-medium">
                          {day.toLocaleDateString('en-GB', { weekday: 'short' })}
                        </div>
                        <div className={`text-2xl font-bold ${isToday ? '' : 'text-foreground'}`}>
                          {day.getDate()}
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-b-xl border border-t-0 border-border p-2 min-h-[400px] space-y-2">
                        {dayItems.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground text-sm">
                            No items
                          </div>
                        ) : (
                          dayItems.map((item) => (
                            <div
                              key={item.id}
                              className={`${item.color} rounded-lg p-3 text-white cursor-pointer hover:opacity-90 transition-all group`}
                            >
                              <div className="flex items-start gap-2 mb-2">
                                {item.type === 'webinar' ? (
                                  <Video className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                ) : item.isVirtual ? (
                                  <Video className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-sm line-clamp-2 mb-1">
                                    {item.title}
                                  </div>
                                  <div className="text-xs opacity-90 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(item.startDate)} - {formatTime(item.endDate)}
                                  </div>
                                  {(item.instructor || item.organizer) && (
                                    <div className="text-xs opacity-90 mt-1">
                                      {item.instructor || item.organizer}
                                    </div>
                                  )}
                                  {item.meetingLink && (
                                    <a
                                      href={item.meetingLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      Join
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* List View for Mobile */}
            <div className="md:hidden mt-8 space-y-4">
              <h3 className="text-xl font-bold text-foreground">This Week's Schedule</h3>
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`${item.color} p-3 rounded-xl`}>
                        {item.type === 'webinar' ? (
                          <Video className="w-5 h-5 text-white" />
                        ) : item.isVirtual ? (
                          <Video className="w-5 h-5 text-white" />
                        ) : (
                          <MapPin className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {formatDate(item.startDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(item.startDate)} - {formatTime(item.endDate)}
                          </span>
                        </div>
                        {item.meetingLink && (
                          <Button size="sm" className="mt-3" asChild>
                            <a href={item.meetingLink} target="_blank" rel="noopener noreferrer">
                              Join
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{filteredItems.length}</div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">
                      {filteredItems.filter(i => i.type === 'webinar').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Webinars</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500">
                      {filteredItems.filter(i => i.type === 'event').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Events</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">
                      {filteredItems.filter(i => i.isVirtual).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Virtual</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </NetflixDashboardLayout>
    </RoleGuard>
  );
}
