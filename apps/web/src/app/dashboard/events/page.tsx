'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Tag,
  AlertCircle
} from 'lucide-react';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/auth-context';
import { Event, EventType } from '@/types/events';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';

export default function EventsPage() {
  const { user, userProfile } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!user) return;
    fetchEvents();
  }, [user, selectedType]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const eventsRef = collection(db as any, 'events');
      const now = new Date();
      
      let eventsQuery = query(
        eventsRef,
        where('startDate', '>=', Timestamp.fromDate(now)),
        orderBy('startDate', 'asc')
      );

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

      // Filter by type if selected
      const filteredEvents = selectedType === 'all' 
        ? eventsData 
        : eventsData.filter(e => e.type === selectedType);

      setEvents(filteredEvents);
    } catch (err: any) {
      console.error('Error fetching events:', err);
      setError(err.message || 'Failed to load events');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const eventTypes: { value: EventType | 'all'; label: string; color: string; bgColor: string; textColor: string }[] = [
    { value: 'all', label: 'All Events', color: 'bg-primary', bgColor: 'bg-primary', textColor: 'text-primary-foreground' },
    { value: 'webinar', label: 'Webinars', color: 'bg-blue-500', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400' },
    { value: 'workshop', label: 'Workshops', color: 'bg-purple-500', bgColor: 'bg-purple-500/10', textColor: 'text-purple-400' },
    { value: 'seminar', label: 'Seminars', color: 'bg-orange-500', bgColor: 'bg-orange-500/10', textColor: 'text-orange-400' },
    { value: 'conference', label: 'Conferences', color: 'bg-cyan-500', bgColor: 'bg-cyan-500/10', textColor: 'text-cyan-400' },
    { value: 'open-day', label: 'Open Days', color: 'bg-green-500', bgColor: 'bg-green-500/10', textColor: 'text-green-400' },
    { value: 'exam-prep', label: 'Exam Prep', color: 'bg-red-500', bgColor: 'bg-red-500/10', textColor: 'text-red-400' },
    { value: 'competition', label: 'Competitions', color: 'bg-yellow-500', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-400' },
    { value: 'social', label: 'Social Events', color: 'bg-pink-500', bgColor: 'bg-pink-500/10', textColor: 'text-pink-400' },
  ];

  const getEventColor = (type: EventType): string => {
    const typeConfig = eventTypes.find(t => t.value === type);
    return typeConfig?.color || 'bg-gray-500';
  };

  // Get upcoming events (next 7 days)
  const upcomingEvents = events
    .filter(e => {
      const daysUntil = Math.ceil((e.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 7;
    })
    .slice(0, 5);

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const getEventsForDate = (date: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeUntilEvent = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} away`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} away`;
    return 'Starting soon';
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
  };

  return (
    <NetflixDashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Modern Full-Width Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/80 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="flex items-center gap-5">
              <div className="p-4 sm:p-5 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg shadow-primary/25">
                <CalendarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-2">Events Calendar</h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Discover and join upcoming webinars, workshops, and special events
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">

          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-96 bg-card animate-pulse rounded-xl" />
                <div className="h-96 bg-card animate-pulse rounded-xl" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Failed to load events</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            <>
              {/* Event Type Filter */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                      selectedType === type.value
                        ? type.value === 'all'
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                          : `${type.color} text-white shadow-lg hover:scale-105`
                        : `${type.bgColor} ${type.textColor} border-2 border-transparent hover:border-current hover:scale-105`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        selectedType === type.value ? 'bg-white' : type.color
                      }`}></span>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Modern Calendar */}
                <div className="lg:col-span-2 bg-gradient-to-br from-card via-card to-card/95 border border-border rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={previousMonth}
                        className="p-2.5 hover:bg-primary/20 bg-secondary rounded-lg transition-all hover:scale-105 group"
                      >
                        <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                      </button>
                      <button
                        onClick={nextMonth}
                        className="p-2.5 hover:bg-primary/20 bg-secondary rounded-lg transition-all hover:scale-105 group"
                      >
                        <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-3">
                    {/* Day headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-bold text-primary p-2">
                        {day}
                      </div>
                    ))}

                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {/* Days of the month */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const date = i + 1;
                      const dayEvents = getEventsForDate(date);
                      const isToday = 
                        date === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear();

                      return (
                        <div
                          key={date}
                          className={`aspect-square p-2 rounded-xl border-2 transition-all cursor-pointer group hover:scale-105 ${
                            isToday
                              ? 'border-primary bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg shadow-primary/25'
                              : dayEvents.length > 0
                              ? 'border-accent bg-gradient-to-br from-accent/10 to-accent/5 hover:border-primary hover:shadow-lg'
                              : 'border-border bg-secondary/50 hover:border-accent hover:bg-accent/10'
                          }`}
                          onClick={() => setSelectedDate(new Date(year, month, date))}
                        >
                          <div className={`text-sm font-bold mb-1 ${
                            isToday 
                              ? 'text-primary' 
                              : dayEvents.length > 0 
                              ? 'text-foreground' 
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}>
                            {date}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event, idx) => (
                              <div
                                key={idx}
                                className={`h-1.5 rounded-full ${getEventColor(event.type)} shadow-sm`}
                              />
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-[9px] text-primary font-bold">+{dayEvents.length - 2}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Modern Legend */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Event Types
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {eventTypes.filter(t => t.value !== 'all').map(type => (
                        <div 
                          key={type.value} 
                          className={`flex items-center gap-2 p-2.5 ${type.bgColor} rounded-lg hover:scale-105 transition-all cursor-pointer border border-transparent hover:border-current`}
                        >
                          <div className={`w-3 h-3 rounded-full ${type.color} shadow-md`} />
                          <span className={`text-xs font-bold ${type.textColor}`}>{type.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modern Upcoming Events Sidebar */}
                <div className="bg-gradient-to-br from-card via-card to-card/95 border border-border rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Upcoming Events</h2>
                  </div>

                  {upcomingEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">No events in the next 7 days</p>
                      <p className="text-xs text-muted-foreground mt-1">Check back soon for new events!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="relative overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-xl p-4 hover:border-primary transition-all group hover:shadow-lg hover:scale-[1.02]"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2.5 rounded-xl ${getEventColor(event.type)} shadow-lg flex-shrink-0`}>
                              {event.isVirtual ? (
                                <Video className="w-4 h-4 text-white" />
                              ) : (
                                <MapPin className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
                                {event.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span>{event.startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{formatTime(event.startDate)}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                <span className="text-xs px-2.5 py-1 bg-primary/20 text-primary rounded-full font-bold">
                                  {getTimeUntilEvent(event.startDate)}
                                </span>
                                {event.maxParticipants && (
                                  <span className="text-xs text-muted-foreground flex items-center gap-1 bg-secondary px-2 py-1 rounded-full">
                                    <Users className="w-3 h-3" />
                                    {event.registeredCount}/{event.maxParticipants}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* All Events List */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-primary rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">All Upcoming Events</h2>
                </div>
                {events.length === 0 ? (
                  <div className="text-center py-20 bg-gradient-to-br from-card via-card to-secondary/30 rounded-2xl border border-border">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">No events found</h3>
                    <p className="text-muted-foreground">
                      {selectedType === 'all' 
                        ? 'There are no upcoming events at the moment.' 
                        : `No ${selectedType} events scheduled.`}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="relative overflow-hidden bg-gradient-to-br from-card via-card to-secondary/20 border border-border rounded-2xl p-6 hover:border-primary transition-all group hover:shadow-xl hover:scale-[1.02]"
                      >
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-3 rounded-xl ${getEventColor(event.type)} shadow-lg`}>
                                {event.isVirtual ? (
                                  <Video className="w-5 h-5 text-white" />
                                ) : (
                                  <MapPin className="w-5 h-5 text-white" />
                                )}
                              </div>
                              <span className="text-xs px-3 py-1.5 bg-secondary rounded-full text-foreground font-medium capitalize">
                                {event.type.replace('-', ' ')}
                              </span>
                            </div>
                            <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full font-bold border border-primary/20">
                              {getTimeUntilEvent(event.startDate)}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {event.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                            {event.description}
                          </p>

                          <div className="space-y-2.5 mb-4">
                            <div className="flex items-center gap-2.5 text-sm text-foreground">
                              <div className="p-1.5 bg-primary/10 rounded-lg">
                                <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <span className="font-medium">{formatDate(event.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-foreground">
                              <div className="p-1.5 bg-primary/10 rounded-lg">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <span className="font-medium">{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
                            </div>
                            {event.location && !event.isVirtual && (
                              <div className="flex items-center gap-2.5 text-sm text-foreground">
                                <div className="p-1.5 bg-primary/10 rounded-lg">
                                  <MapPin className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span className="font-medium">{event.location}</span>
                              </div>
                            )}
                            {event.isVirtual && (
                              <div className="flex items-center gap-2.5">
                                <div className="px-3 py-1.5 bg-primary/10 rounded-lg flex items-center gap-2">
                                  <Video className="w-3.5 h-3.5 text-primary" />
                                  <span className="text-sm text-primary font-bold">Virtual Event</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {event.tags.length > 0 && (
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                              <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                              {event.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="text-xs px-2.5 py-1 bg-accent/50 rounded-full text-foreground font-medium border border-accent">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div className="flex items-center gap-2 text-sm text-foreground">
                              <Users className="w-4 h-4 text-primary" />
                              <span className="font-medium">
                                {event.maxParticipants 
                                  ? `${event.registeredCount}/${event.maxParticipants}`
                                  : `${event.registeredCount}`}
                              </span>
                            </div>
                            {event.meetingLink && (
                              <a
                                href={event.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-bold group/link"
                              >
                                View Details
                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </NetflixDashboardLayout>
  );
}

