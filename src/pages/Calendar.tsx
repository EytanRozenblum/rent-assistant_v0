
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockMaintenanceRequests } from '@/data/mockData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Wrench, 
  ImageIcon,
  List,
  CalendarClock,
  Info
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
  isWithinInterval
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

const viewOptions = {
  day: { label: "Day", days: 1 },
  '3day': { label: "Three Day", days: 3 },
  '5day': { label: "Working Week", days: 5 },
  week: { label: "Week", days: 7 },
  month: { label: "Month", days: 31 }
};

const BUSINESS_HOURS_START = 6; // 6 AM
const BUSINESS_HOURS_END = 20; // 8 PM

// Updated mock data to include hours and March 2025 dates
const updateMockRequestDates = () => {
  return mockMaintenanceRequests.map(request => {
    // Create a new date in March 2025
    const day = Math.floor(Math.random() * 31) + 1; // Random day in March
    const startHour = Math.floor(Math.random() * (BUSINESS_HOURS_END - BUSINESS_HOURS_START - 1)) + BUSINESS_HOURS_START;
    const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, or 45 minutes
    const duration = Math.floor(Math.random() * 3) + 1; // 1 to 3 hours
    
    const scheduledDate = new Date(2025, 2, day); // March is month 2 (0-indexed)
    setHours(scheduledDate, startHour);
    setMinutes(scheduledDate, minute);
    
    const endDate = new Date(scheduledDate);
    endDate.setHours(endDate.getHours() + duration);
    
    return {
      ...request,
      scheduledDate: scheduledDate.toISOString(),
      endDate: endDate.toISOString()
    };
  });
};

const Calendar = () => {
  const [calendarView, setCalendarView] = useState<string>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [displayMode, setDisplayMode] = useState<string>('list'); // 'list' or 'hourly'
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const maintenanceRequests = useMemo(() => updateMockRequestDates(), []);

  // Calculate date range for the current view
  const dateRange = useMemo(() => {
    const today = selectedDate;
    
    if (calendarView === 'month') {
      // For month view, we start on the first day of the month
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return eachDayOfInterval({ start: startDate, end: endDate });
    } else if (calendarView === '3day') {
      // For 3-day view, we show the selected date and the next 2 days
      return eachDayOfInterval({
        start: today,
        end: add(today, { days: 2 })
      });
    } else {
      // For other views, we show the selected number of days
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      
      // For week views (5-day and 7-day), adjust to start on Sunday or Monday
      let startDate = today;
      if (days === 5 || days === 7) {
        const dayOfWeek = getDay(today);
        startDate = sub(today, { days: dayOfWeek });
      }
      
      return eachDayOfInterval({
        start: startDate,
        end: add(startDate, { days: days - 1 })
      });
    }
  }, [selectedDate, calendarView]);

  // Navigate to previous period
  const goToPrevious = () => {
    if (calendarView === 'month') {
      setSelectedDate(sub(selectedDate, { months: 1 }));
    } else {
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      setSelectedDate(sub(selectedDate, { days }));
    }
  };

  // Navigate to next period
  const goToNext = () => {
    if (calendarView === 'month') {
      setSelectedDate(add(selectedDate, { months: 1 }));
    } else {
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      setSelectedDate(add(selectedDate, { days }));
    }
  };

  // Go to today
  const goToToday = () => {
    setSelectedDate(startOfToday());
  };

  // Handle day click in month view
  const handleDayClick = (day: Date) => {
    if (calendarView === 'month') {
      setSelectedDate(day);
      setCalendarView('day');
    }
  };

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return maintenanceRequests.filter(request => {
      const requestDate = request.scheduledDate ? new Date(request.scheduledDate) : new Date(request.dateSubmitted);
      return isSameDay(requestDate, day);
    });
  };

  // Get events for a specific hour
  const getEventsForHour = (day: Date, hour: number) => {
    const hourStart = add(startOfDay(day), { hours: hour });
    const hourEnd = add(hourStart, { hours: 1 });
    
    return maintenanceRequests.filter(request => {
      if (!request.scheduledDate) return false;
      
      let requestStartDate;
      let requestEndDate;
      
      try {
        requestStartDate = typeof request.scheduledDate === 'string' ? 
          new Date(request.scheduledDate) : request.scheduledDate;
          
        requestEndDate = request.endDate ? 
          (typeof request.endDate === 'string' ? new Date(request.endDate) : request.endDate) :
          addHours(requestStartDate, 1); // Default to 1 hour if no end date
      } catch(e) {
        // If date parsing fails, use date submitted as fallback
        requestStartDate = new Date(request.dateSubmitted);
        requestEndDate = addHours(requestStartDate, 1);
      }
      
      // Check if the event overlaps with this hour slot
      return isSameDay(requestStartDate, day) && 
             (isWithinInterval(hourStart, { 
               start: requestStartDate, 
               end: requestEndDate 
             }) || 
             isWithinInterval(hourEnd, { 
               start: requestStartDate, 
               end: requestEndDate 
             }) ||
             (requestStartDate <= hourStart && requestEndDate >= hourEnd));
    });
  };

  // Format date range for header
  const formatDateRangeHeader = () => {
    if (calendarView === 'day') {
      return format(selectedDate, 'MMMM d, yyyy');
    } else if (calendarView === 'month') {
      return format(selectedDate, 'MMMM yyyy');
    } else {
      const start = dateRange[0];
      const end = dateRange[dateRange.length - 1];
      
      if (isSameMonth(start, end)) {
        return `${format(start, 'MMMM d')} - ${format(end, 'd, yyyy')}`;
      } else {
        return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
      }
    }
  };

  // Render the calendar content based on the selected view and display mode
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
                    <div 
                      key={event.id} 
                      className={cn(
                        "text-xs p-1 rounded truncate",
                        event.priority === 'urgent' ? "bg-red-100 text-red-800" :
                        event.priority === 'high' ? "bg-orange-100 text-orange-800" :
                        "bg-blue-100 text-blue-800"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                    >
                      {event.issue}
                    </div>
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
        const colClass = calendarView === '3day' ? "w-1/3" : calendarView === '5day' ? "w-1/5" : "w-1/7";
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-0 w-full">
            {dateRange.map((day, dayIndex) => {
              const events = getEventsForDay(day);
              
              // Only show the columns we need based on the view
              if (dayIndex >= maxCols) return null;
              
              return (
                <div key={dayIndex} className="p-3">
                  <div className={cn(
                    "text-base font-semibold mb-2 text-center",
                    isSameDay(day, new Date()) ? "text-primary" : ""
                  )}>
                    {format(day, 'EEE, MMM d')}
                  </div>
                  
                  {events.length === 0 ? (
                    <div className="text-sm text-muted-foreground italic py-2 text-center">
                      No tasks
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {events.map((event) => (
                        <Dialog key={event.id}>
                          <DialogTrigger asChild>
                            <div className="bg-muted/40 rounded-lg p-2 text-sm cursor-pointer hover:bg-muted/60">
                              <div className="flex justify-between items-start">
                                <div className="font-medium truncate">{event.issue}</div>
                                <Badge 
                                  variant={
                                    event.priority === 'urgent' ? "destructive" :
                                    event.priority === 'high' ? "default" : "secondary"
                                  }
                                  className="ml-1 shrink-0"
                                >
                                  {event.priority}
                                </Badge>
                              </div>
                              
                              <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{format(new Date(event.scheduledDate), 'h:mm')} - {format(new Date(event.endDate), 'h:mm a')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{event.unit}</span>
                                </div>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="flex justify-between items-center">
                                <span>{event.issue}</span>
                                <Badge 
                                  variant={
                                    event.priority === 'urgent' ? "destructive" :
                                    event.priority === 'high' ? "default" : "secondary"
                                  }
                                >
                                  {event.priority}
                                </Badge>
                              </DialogTitle>
                              <DialogDescription className="text-lg">
                                Maintenance Request Details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                                  <p>{format(new Date(event.scheduledDate), 'MMM d, yyyy h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                                  <p>{event.unit} ({event.region} Region)</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Tenant</p>
                                  <p>{event.tenantName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                                  <p className="capitalize">{event.status}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Description</p>
                                <p>{event.description}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                                <p>{event.assignedTo || 'Unassigned'}</p>
                              </div>
                              <div className="flex justify-between mt-4">
                                <Button variant="outline" className="flex items-center gap-1">
                                  <ImageIcon className="h-4 w-4" />
                                  View Images
                                </Button>
                                <Button className="flex items-center gap-1">
                                  <Info className="h-4 w-4" />
                                  Full Details
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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
                <div key={i} className="py-4">
                  <div className={cn(
                    "text-base font-semibold mb-2",
                    isSameDay(day, new Date()) ? "text-primary" : ""
                  )}>
                    {format(day, 'EEEE, MMMM d')}
                  </div>
                  
                  {events.length === 0 ? (
                    <div className="text-sm text-muted-foreground italic py-2">
                      No maintenance tasks scheduled
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {events.map((event) => (
                        <Dialog key={event.id}>
                          <DialogTrigger asChild>
                            <div className="bg-muted/40 rounded-lg p-3 text-sm cursor-pointer hover:bg-muted/60">
                              <div className="flex justify-between items-start">
                                <div className="font-medium">{event.issue}</div>
                                <Badge 
                                  variant={
                                    event.priority === 'urgent' ? "destructive" :
                                    event.priority === 'high' ? "default" : "secondary"
                                  }
                                  className="ml-2"
                                >
                                  {event.priority}
                                </Badge>
                              </div>
                              
                              <div className="mt-2 space-y-1 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{format(new Date(event.scheduledDate), 'MMM d, yyyy h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{event.unit}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Wrench className="h-3.5 w-3.5" />
                                  <span>{event.description}</span>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center mt-2">
                                <div className="text-xs text-muted-foreground">
                                  Assigned to: {event.assignedTo || 'Unassigned'}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs flex items-center gap-1"
                                >
                                  <ImageIcon className="h-3.5 w-3.5" />
                                  View images
                                </Button>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="flex justify-between items-center">
                                <span>{event.issue}</span>
                                <Badge 
                                  variant={
                                    event.priority === 'urgent' ? "destructive" :
                                    event.priority === 'high' ? "default" : "secondary"
                                  }
                                >
                                  {event.priority}
                                </Badge>
                              </DialogTitle>
                              <DialogDescription className="text-lg">
                                Maintenance Request Details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                                  <p>{format(new Date(event.scheduledDate), 'MMM d, yyyy h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                                  <p>{event.unit} ({event.region} Region)</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Tenant</p>
                                  <p>{event.tenantName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                                  <p className="capitalize">{event.status}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Description</p>
                                <p>{event.description}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                                <p>{event.assignedTo || 'Unassigned'}</p>
                              </div>
                              <div className="flex justify-between mt-4">
                                <Button variant="outline" className="flex items-center gap-1">
                                  <ImageIcon className="h-4 w-4" />
                                  View Images
                                </Button>
                                <Button className="flex items-center gap-1">
                                  <Info className="h-4 w-4" />
                                  Full Details
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 divide-x divide-gray-200">
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
                    {Array.from({ length: (BUSINESS_HOURS_END - BUSINESS_HOURS_START) }, (_, i) => {
                      const hour = BUSINESS_HOURS_START + i;
                      const events = getEventsForHour(day, hour);
                      
                      return events.length > 0 && (
                        <div 
                          key={hour} 
                          className="absolute w-full"
                          style={{
                            top: `${(hour - BUSINESS_HOURS_START) * 56}px`, // 56px = 14px (height) * 4 (quarter hours)
                          }}
                        >
                          {events.map((event) => {
                            const startDate = new Date(event.scheduledDate);
                            const endDate = new Date(event.endDate);
                            const startHour = startDate.getHours();
                            const startMinute = startDate.getMinutes();
                            const eventDuration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // in hours
                            
                            // Calculate position and height
                            const topOffset = ((startHour - BUSINESS_HOURS_START) * 56) + ((startMinute / 60) * 56);
                            const height = eventDuration * 56;
                            
                            return (
                              <Dialog key={event.id}>
                                <DialogTrigger asChild>
                                  <div 
                                    className={cn(
                                      "absolute m-0.5 p-1 rounded overflow-hidden cursor-pointer",
                                      event.priority === 'urgent' ? "bg-red-100 text-red-800" :
                                      event.priority === 'high' ? "bg-orange-100 text-orange-800" :
                                      "bg-blue-100 text-blue-800"
                                    )}
                                    style={{
                                      top: `${(startMinute / 60) * 56}px`,
                                      height: `${height}px`,
                                      width: 'calc(100% - 4px)',
                                      zIndex: 5
                                    }}
                                  >
                                    <div className="font-medium text-xs truncate">{event.issue}</div>
                                    <div className="text-xs truncate flex items-center gap-0.5">
                                      <Clock className="h-2.5 w-2.5 inline" />
                                      <span>
                                        {format(startDate, 'h:mm')} - {format(endDate, 'h:mm')}
                                      </span>
                                    </div>
                                  </div>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="flex justify-between items-center">
                                      <span>{event.issue}</span>
                                      <Badge 
                                        variant={
                                          event.priority === 'urgent' ? "destructive" :
                                          event.priority === 'high' ? "default" : "secondary"
                                        }
                                      >
                                        {event.priority}
                                      </Badge>
                                    </DialogTitle>
                                    <DialogDescription className="text-lg">
                                      Maintenance Request Details
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 mt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                                        <p>{format(new Date(event.scheduledDate), 'MMM d, yyyy h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                                        <p>{event.unit} ({event.region} Region)</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Tenant</p>
                                        <p>{event.tenantName}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                                        <p className="capitalize">{event.status}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Description</p>
                                      <p>{event.description}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                                      <p>{event.assignedTo || 'Unassigned'}</p>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                      <Button variant="outline" className="flex items-center gap-1">
                                        <ImageIcon className="h-4 w-4" />
                                        View Images
                                      </Button>
                                      <Button className="flex items-center gap-1">
                                        <Info className="h-4 w-4" />
                                        Full Details
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            );
                          })}
                        </div>
                      );
                    })}
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
            
            {/* Day content */}
            <div className="flex-grow">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  {format(dateRange[0], 'EEEE, MMMM d, yyyy')}
                </h3>
              </div>
              
              <div className="relative border-l border-gray-200">
                {/* Hour lines */}
                {Array.from({ length: (BUSINESS_HOURS_END - BUSINESS_HOURS_START) }, (_, i) => {
                  const hour = BUSINESS_HOURS_START + i;
                  return <div key={hour} className="h-14 border-b border-gray-100"></div>;
                })}
                
                {/* Events */}
                {Array.from({ length: (BUSINESS_HOURS_END - BUSINESS_HOURS_START) }, (_, i) => {
                  const hour = BUSINESS_HOURS_START + i;
                  const events = getEventsForHour(dateRange[0], hour);
                  
                  return events.length > 0 && (
                    <div 
                      key={hour} 
                      className="absolute w-full"
                      style={{
                        top: `${(hour - BUSINESS_HOURS_START) * 56}px`, // 56px = 14px (height) * 4 (quarter hours)
                      }}
                    >
                      {events.map((event) => {
                        const startDate = new Date(event.scheduledDate);
                        const endDate = new Date(event.endDate);
                        const startHour = startDate.getHours();
                        const startMinute = startDate.getMinutes();
                        const eventDuration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // in hours
                        
                        // Calculate position and height
                        const topOffset = ((startHour - BUSINESS_HOURS_START) * 56) + ((startMinute / 60) * 56);
                        const height = eventDuration * 56;
                        
                        return (
                          <Dialog key={event.id}>
                            <DialogTrigger asChild>
                              <div 
                                className={cn(
                                  "absolute left-0 ml-2 p-2 rounded overflow-hidden cursor-pointer",
                                  event.priority === 'urgent' ? "bg-red-100 text-red-800 border-l-4 border-red-500" :
                                  event.priority === 'high' ? "bg-orange-100 text-orange-800 border-l-4 border-orange-500" :
                                  "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
                                )}
                                style={{
                                  top: `${(startMinute / 60) * 56}px`,
                                  height: `${height}px`,
                                  width: 'calc(100% - 16px)',
                                  zIndex: 5
                                }}
                              >
                                <div className="font-medium truncate">{event.issue}</div>
                                <div className="text-xs flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}</span>
                                </div>
                                <div className="text-xs flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {event.unit}
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="flex justify-between items-center">
                                  <span>{event.issue}</span>
                                  <Badge 
                                    variant={
                                      event.priority === 'urgent' ? "destructive" :
                                      event.priority === 'high' ? "default" : "secondary"
                                    }
                                  >
                                    {event.priority}
                                  </Badge>
                                </DialogTitle>
                                <DialogDescription className="text-lg">
                                  Maintenance Request Details
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                                    <p>{format(new Date(event.scheduledDate), 'MMM d, yyyy h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                                    <p>{event.unit} ({event.region} Region)</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Tenant</p>
                                    <p>{event.tenantName}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <p className="capitalize">{event.status}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                                  <p>{event.description}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                                  <p>{event.assignedTo || 'Unassigned'}</p>
                                </div>
                                <div className="flex justify-between mt-4">
                                  <Button variant="outline" className="flex items-center gap-1">
                                    <ImageIcon className="h-4 w-4" />
                                    View Images
                                  </Button>
                                  <Button className="flex items-center gap-1">
                                    <Info className="h-4 w-4" />
                                    Full Details
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
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
          <h1 className="text-2xl font-bold">Maintenance Calendar</h1>
          <p className="text-muted-foreground">All scheduled maintenance</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <Select value={calendarView} onValueChange={setCalendarView}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Calendar View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="3day">Three Day</SelectItem>
              <SelectItem value="5day">Working Week</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>Maintenance Schedule</CardTitle>
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
      
      {/* Event details dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedEvent.issue}</span>
                <Badge 
                  variant={
                    selectedEvent.priority === 'urgent' ? "destructive" :
                    selectedEvent.priority === 'high' ? "default" : "secondary"
                  }
                >
                  {selectedEvent.priority}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-lg">
                Maintenance Request Details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                  <p>{format(new Date(selectedEvent.scheduledDate), 'MMM d, yyyy h:mm a')} - {format(new Date(selectedEvent.endDate), 'h:mm a')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{selectedEvent.unit} ({selectedEvent.region} Region)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tenant</p>
                  <p>{selectedEvent.tenantName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="capitalize">{selectedEvent.status}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p>{selectedEvent.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                <p>{selectedEvent.assignedTo || 'Unassigned'}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" className="flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" />
                  View Images
                </Button>
                <Button className="flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  Full Details
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Calendar;
