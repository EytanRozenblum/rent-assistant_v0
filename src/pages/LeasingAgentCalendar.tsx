import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { mockLeads, mockApplications, CURRENT_LEASING_AGENT } from '@/data/mockData';
import { Lead, Application } from '@/types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Wrench, 
  ImageIcon,
  List,
  CalendarClock,
  Info,
  User,
  ExternalLink,
  FileText,
  HardHat
} from 'lucide-react';
import { 
  format, 
  startOfToday, 
  startOfDay, 
  eachDayOfInterval, 
  add, 
  sub, 
  isSameDay, 
  isSameMonth, 
  getDay,
  setHours,
  setMinutes,
  addHours,
  parseISO,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays
} from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventDialog from '@/components/maintenance/EventDialog';
import LeadEventDialog from '@/components/leasing/LeadEventDialog';

const viewOptions = {
  day: { label: "Day", days: 1 },
  '3day': { label: "Three Day", days: 3 },
  '5day': { label: "Working Week", days: 5 },
  week: { label: "Week", days: 7 },
  month: { label: "Month", days: 31 }
};

const BUSINESS_HOURS_START = 6; // 6 AM
const BUSINESS_HOURS_END = 20; // 8 PM

// Define types
interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'tour' | 'application';
  details: Lead | Application;
}

const LeasingAgentCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [calendarView, setCalendarView] = useState<string>('week');
  const [displayMode, setDisplayMode] = useState<string>('list'); // 'list' or 'hourly'

  // Create calendar events from leads and applications
  const calendarEvents = useMemo(() => {
    const events: CalendarEvent[] = [];
    
    // Add tours from leads assigned to current agent
    mockLeads
      .filter(lead => 
        (lead.assignedTo === CURRENT_LEASING_AGENT || !lead.assignedTo) && 
        lead.tourDateTime
      )
      .forEach(lead => {
        const tourTime = new Date(lead.tourDateTime!);
        events.push({
          id: `tour-${lead.id}`,
          title: `Tour with ${lead.name}`,
          startTime: tourTime,
          endTime: addHours(tourTime, 1), // Assume tours last 1 hour
          type: 'tour',
          details: lead
        });
      });
    
    // Add application review meetings for current agent
    mockApplications
      .filter(app => app.assignedTo === CURRENT_LEASING_AGENT)
      .forEach(app => {
        // Create a meeting at 10 AM on the date submitted for application reviews
        const appDate = new Date(app.dateSubmitted);
        const meetingTime = setHours(setMinutes(appDate, 0), 10);
        
        events.push({
          id: `app-${app.id}`,
          title: `Application Review - ${app.name}`,
          startTime: meetingTime,
          endTime: addHours(meetingTime, 1), // Assume reviews last 1 hour
          type: 'application',
          details: app
        });
      });
    
    return events;
  }, []);

  // Get events for selected date
  const eventsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return calendarEvents.filter(event => 
      isSameDay(event.startTime, selectedDate)
    );
  }, [selectedDate, calendarEvents]);

  // Calendar rendering with day cells having event indicators
  const renderCalendarCell = (day: Date) => {
    const eventsOnDay = calendarEvents.filter(event => 
      isSameDay(event.startTime, day)
    );

    return (
      <div className="relative w-full h-full">
        <time dateTime={format(day, 'yyyy-MM-dd')}>
          {format(day, 'd')}
        </time>
        {eventsOnDay.length > 0 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            <div className="h-1 w-1 rounded-full bg-primary"></div>
          </div>
        )}
      </div>
    );
  };

  // Get date range based on selected date and view
  const dateRange = useMemo(() => {
    if (calendarView === 'month') {
      const start = startOfWeek(startOfMonth(selectedDate));
      const end = endOfWeek(endOfMonth(selectedDate));
      return eachDayOfInterval({ start, end });
    } else if (calendarView === 'week') {
      const start = startOfWeek(selectedDate);
      const end = endOfWeek(selectedDate);
      return eachDayOfInterval({ start, end });
    } else if (calendarView === '5day') {
      const start = startOfDay(selectedDate);
      const end = addDays(start, 4);
      return eachDayOfInterval({ start, end });
    } else if (calendarView === '3day') {
      const start = startOfDay(selectedDate);
      const end = addDays(start, 2);
      return eachDayOfInterval({ start, end });
    } else {
      // day view
      return [startOfDay(selectedDate)];
    }
  }, [selectedDate, calendarView]);
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return calendarEvents.filter(event => 
      isSameDay(event.startTime, day)
    );
  };
  
  // Handle clicking on a day
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    if (calendarView === 'month') {
      setCalendarView('day');
    }
  };
  
  // Navigate to previous time period
  const goToPrevious = () => {
    if (calendarView === 'month') {
      setSelectedDate(sub(selectedDate, { months: 1 }));
    } else if (calendarView === 'week') {
      setSelectedDate(sub(selectedDate, { weeks: 1 }));
    } else if (calendarView === '5day') {
      setSelectedDate(sub(selectedDate, { days: 5 }));
    } else if (calendarView === '3day') {
      setSelectedDate(sub(selectedDate, { days: 3 }));
    } else {
      setSelectedDate(sub(selectedDate, { days: 1 }));
    }
  };
  
  // Navigate to next time period
  const goToNext = () => {
    if (calendarView === 'month') {
      setSelectedDate(add(selectedDate, { months: 1 }));
    } else if (calendarView === 'week') {
      setSelectedDate(add(selectedDate, { weeks: 1 }));
    } else if (calendarView === '5day') {
      setSelectedDate(add(selectedDate, { days: 5 }));
    } else if (calendarView === '3day') {
      setSelectedDate(add(selectedDate, { days: 3 }));
    } else {
      setSelectedDate(add(selectedDate, { days: 1 }));
    }
  };
  
  // Go to today
  const goToToday = () => {
    setSelectedDate(startOfToday());
  };
  
  // Format date range header
  const formatDateRangeHeader = () => {
    if (calendarView === 'month') {
      return format(selectedDate, 'MMMM yyyy');
    } else if (calendarView === 'week') {
      const start = startOfWeek(selectedDate);
      const end = endOfWeek(selectedDate);
      if (start.getMonth() === end.getMonth()) {
        return `${format(start, 'MMMM d')} - ${format(end, 'd, yyyy')}`;
      } else if (start.getFullYear() === end.getFullYear()) {
        return `${format(start, 'MMMM d')} - ${format(end, 'MMMM d, yyyy')}`;
      } else {
        return `${format(start, 'MMMM d, yyyy')} - ${format(end, 'MMMM d, yyyy')}`;
      }
    } else if (calendarView === '5day' || calendarView === '3day') {
      const start = startOfDay(selectedDate);
      const end = addDays(start, calendarView === '5day' ? 4 : 2);
      if (start.getMonth() === end.getMonth()) {
        return `${format(start, 'MMMM d')} - ${format(end, 'd, yyyy')}`;
      } else if (start.getFullYear() === end.getFullYear()) {
        return `${format(start, 'MMMM d')} - ${format(end, 'MMMM d, yyyy')}`;
      } else {
        return `${format(start, 'MMMM d, yyyy')} - ${format(end, 'MMMM d, yyyy')}`;
      }
    } else {
      return format(selectedDate, 'MMMM d, yyyy');
    }
  };
  
  // Render calendar content based on view and display mode
  const renderCalendarContent = () => {
    if (calendarView === 'month') {
      return (
        <div className="grid grid-cols-7 gap-1">
          {/* Week day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center p-2 font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {dateRange.map((day, i) => {
            const events = getEventsForDay(day);
            return (
              <div 
                key={i} 
                className={cn(
                  "min-h-24 border p-1 relative cursor-pointer",
                  !isSameMonth(day, selectedDate) && "bg-muted/50 text-muted-foreground", 
                  isSameDay(day, new Date()) && "border-primary"
                )}
                onClick={() => handleDayClick(day)}
              >
                <div className="text-right mb-1">{format(day, 'd')}</div>
                <div className="space-y-1">
                  {events.slice(0, 3).map((event) => (
                    <LeadEventDialog
                      key={event.id}
                      event={event}
                      trigger={
                        <div 
                          className={cn(
                            "text-xs p-1 rounded truncate",
                            event.type === 'tour' ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          )}
                        >
                          {event.title}
                        </div>
                      }
                    />
                  ))}
                  {events.length > 3 && (
                    <div className="text-xs text-center text-muted-foreground">
                      + {events.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (displayMode === 'list') {
      // List view for day, 3-day, 5-day, and week views
      if (['3day', '5day', 'week'].includes(calendarView)) {
        // Side-by-side view for multiple days
        const maxCols = calendarView === '3day' ? 3 : calendarView === '5day' ? 5 : 7;
        const gridCols = calendarView === '3day' ? 
          "grid-cols-1 md:grid-cols-3" : 
          calendarView === '5day' ? 
            "grid-cols-1 md:grid-cols-5" : 
            "grid-cols-1 md:grid-cols-7";
        
        return (
          <div className={`grid ${gridCols} gap-4`}>
            {dateRange.map((day, dayIndex) => {
              const events = getEventsForDay(day);
              return (
                <div key={dayIndex} className="space-y-2">
                  <div className={cn(
                    "text-center p-2 font-medium",
                    isSameDay(day, new Date()) ? "text-primary" : ""
                  )}>
                    {format(day, 'EEE, MMM d')}
                  </div>
                  
                  {events.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm py-4">
                      No events scheduled
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {events.map((event) => (
                        <LeadEventDialog
                          key={event.id}
                          event={event}
                          trigger={
                            <div className="bg-muted/40 rounded-lg p-2 text-sm cursor-pointer hover:bg-muted/60">
                              <div className="flex justify-between items-start">
                                <div className="font-medium truncate">{event.title}</div>
                                <Badge 
                                  variant={event.type === 'tour' ? "default" : "secondary"}
                                  className="ml-1 shrink-0"
                                >
                                  {event.type}
                                </Badge>
                              </div>
                              
                              <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{format(event.startTime, 'h:mm')} - {format(event.endTime, 'h:mm a')}</span>
                                </div>
                                {event.type === 'tour' && (
                                  <>
                                    <div className="flex items-center gap-1">
                                      <User className="h-3 w-3" />
                                      <span>{event.details.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      <span className="truncate">{event.details.propertyInterest}</span>
                                    </div>
                                  </>
                                )}
                                {event.type === 'application' && (
                                  <>
                                    <div className="flex items-center gap-1">
                                      <FileText className="h-3 w-3" />
                                      <span>{event.details.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      <span className="truncate">{event.details.propertyAddress || 'Not specified'}</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      } else {
        // Single day list view
        return (
          <div className="grid grid-cols-1 divide-y">
            {dateRange.map((day, i) => {
              const events = getEventsForDay(day);
              return (
                <div key={i} className="space-y-4 py-4">
                  <div className="text-lg font-semibold">
                    {format(day, 'EEEE, MMMM d, yyyy')}
                  </div>
                  
                  {events.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      No events scheduled for today
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {events.map((event) => (
                        <LeadEventDialog
                          key={event.id}
                          event={event}
                          trigger={
                            <div className="rounded-lg border p-3 cursor-pointer hover:bg-muted/50">
                              <div className="flex justify-between items-center">
                                <div className="font-medium">{event.title}</div>
                                <Badge 
                                  variant={event.type === 'tour' ? "default" : "secondary"}
                                >
                                  {event.type}
                                </Badge>
                              </div>
                              
                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{format(event.startTime, 'h:mm')} - {format(event.endTime, 'h:mm a')}</span>
                                </div>
                                
                                {event.type === 'tour' && (
                                  <>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <span>{event.details.propertyInterest}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      <span>{event.details.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                      <span>{event.details.status}</span>
                                    </div>
                                  </>
                                )}
                                
                                {event.type === 'application' && (
                                  <>
                                    <div className="flex items-center gap-1">
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <span>{event.details.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <span>{event.details.propertyAddress || 'Not specified'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                      <span className="capitalize">{event.details.status}</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      }
    } else {
      // Hourly planner view
      if (['3day', '5day', 'week'].includes(calendarView)) {
        // Side-by-side hourly view for multiple days
        const maxCols = calendarView === '3day' ? 3 : calendarView === '5day' ? 5 : 7;
        const visibleDays = dateRange.slice(0, maxCols);
        const gridCols = calendarView === '3day' ? 
          "grid-cols-3" : 
          calendarView === '5day' ? 
            "grid-cols-5" : 
            "grid-cols-7";
        
        return (
          <div className="flex w-full h-[700px] overflow-auto">
            {/* Time labels column */}
            <div className="w-16 flex-shrink-0 pt-12 pr-2">
              {Array.from({ length: (BUSINESS_HOURS_END - BUSINESS_HOURS_START) }, (_, i) => {
                const hour = BUSINESS_HOURS_START + i;
                return (
                  <div key={hour} className="h-14 flex items-start justify-end sticky">
                    <div className="text-xs text-muted-foreground">
                      {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Days columns */}
            <div className={`flex-grow grid ${gridCols} divide-x divide-gray-200`}>
              {visibleDays.map((day, dayIndex) => (
                <div key={dayIndex} className="relative">
                  <div className="h-12 flex justify-center items-center sticky top-0 bg-background z-10 border-b">
                    <div className={cn(
                      "text-base font-semibold",
                      isSameDay(day, new Date()) ? "text-primary" : ""
                    )}>
                      {format(day, 'EEE, MMM d')}
                    </div>
                  </div>
                  
                  <div className="relative">
                    {/* Hour lines */}
                    {Array.from({ length: (BUSINESS_HOURS_END - BUSINESS_HOURS_START) }, (_, i) => {
                      const hour = BUSINESS_HOURS_START + i;
                      return <div key={hour} className="h-14 border-b border-gray-100"></div>;
                    })}
                    
                    {/* Events */}
                    {(() => {
                      const eventsForDay = getEventsForDay(day);
                      return eventsForDay.map((event) => {
                        const eventStartHour = event.startTime.getHours();
                        const eventStartMinute = event.startTime.getMinutes();
                        const eventEndHour = event.endTime.getHours();
                        const eventEndMinute = event.endTime.getMinutes();
                        
                        // Calculate position and height
                        const startPosition = (eventStartHour - BUSINESS_HOURS_START) * 56 + (eventStartMinute / 60) * 56;
                        const duration = ((eventEndHour - eventStartHour) * 60 + (eventEndMinute - eventStartMinute)) / 60;
                        const height = duration * 56;
                        
                        return (
                          <LeadEventDialog
                            key={event.id}
                            event={event}
                            trigger={
                              <div 
                                className={cn(
                                  "absolute left-1 right-1 rounded p-1 text-xs overflow-hidden cursor-pointer shadow-sm",
                                  event.type === 'tour' ? "bg-blue-100 text-blue-800 border border-blue-200" : 
                                    "bg-green-100 text-green-800 border border-green-200"
                                )}
                                style={{ 
                                  top: `${startPosition}px`,
                                  height: `${height}px`,
                                }}
                              >
                                <div className="font-medium truncate">{event.title}</div>
                                <div className="truncate">{format(event.startTime, 'h:mm')} - {format(event.endTime, 'h:mm')}</div>
                              </div>
                            }
                          />
                        );
                      });
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        // Single day hourly view
        return (
          <div className="flex w-full h-[700px] overflow-auto">
            {/* Time labels column */}
            <div className="w-16 flex-shrink-0 pr-2">
              {Array.from({ length: (BUSINESS_HOURS_END - BUSINESS_HOURS_START) }, (_, i) => {
                const hour = BUSINESS_HOURS_START + i;
                return (
                  <div key={hour} className="h-14 flex items-start justify-end">
                    <div className="text-xs text-muted-foreground">
                      {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Day column */}
            <div className="flex-grow relative border-l">
              {/* Hour lines */}
              {Array.from({ length: (BUSINESS_HOURS_END - BUSINESS_HOURS_START) }, (_, i) => {
                const hour = BUSINESS_HOURS_START + i;
                return <div key={hour} className="h-14 border-b border-gray-100"></div>;
              })}
              
              {/* Events */}
              {(() => {
                const day = dateRange[0];
                const eventsForDay = getEventsForDay(day);
                
                return eventsForDay.map((event) => {
                  const eventStartHour = event.startTime.getHours();
                  const eventStartMinute = event.startTime.getMinutes();
                  const eventEndHour = event.endTime.getHours();
                  const eventEndMinute = event.endTime.getMinutes();
                  
                  // Calculate position and height
                  const startPosition = (eventStartHour - BUSINESS_HOURS_START) * 56 + (eventStartMinute / 60) * 56;
                  const duration = ((eventEndHour - eventStartHour) * 60 + (eventEndMinute - eventStartMinute)) / 60;
                  const height = duration * 56;
                  
                  return (
                    <LeadEventDialog
                      key={event.id}
                      event={event}
                      trigger={
                        <div 
                          className={cn(
                            "absolute left-2 right-2 rounded p-2 overflow-hidden cursor-pointer shadow-sm",
                            event.type === 'tour' ? "bg-blue-100 text-blue-800 border border-blue-200" : 
                              "bg-green-100 text-green-800 border border-green-200"
                          )}
                          style={{ 
                            top: `${startPosition}px`,
                            height: `${height}px`,
                          }}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs mt-1">
                            {format(event.startTime, 'h:mm')} - {format(event.endTime, 'h:mm a')}
                          </div>
                          {event.type === 'tour' && (
                            <div className="text-xs mt-1 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{event.details.propertyInterest}</span>
                            </div>
                          )}
                          {event.type === 'application' && (
                            <div className="text-xs mt-1 flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span className="truncate">{event.details.propertyAddress || 'Application Review'}</span>
                            </div>
                          )}
                        </div>
                      }
                    />
                  );
                });
              })()}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_LEASING_AGENT}</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <Select value={calendarView} onValueChange={setCalendarView}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="3day">Three Day</SelectItem>
              <SelectItem value="5day">Working Week</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>Leasing Schedule</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>Today</Button>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            {/* View toggle for list/hourly view */}
            {calendarView !== 'month' && (
              <ToggleGroup type="single" value={displayMode} onValueChange={(value) => value && setDisplayMode(value)}>
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="hourly" aria-label="Hourly view">
                  <CalendarClock className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">{formatDateRangeHeader()}</h3>
          </div>
          
          {renderCalendarContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeasingAgentCalendar;
