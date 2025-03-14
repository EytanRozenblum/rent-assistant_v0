import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  List,
  CalendarClock,
} from 'lucide-react';
import { 
  format, 
  startOfToday, 
  eachDayOfInterval, 
  add, 
  sub, 
  getDay,
  isSameDay,
  isSameMonth
} from 'date-fns';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const viewOptions = {
  day: { label: "Day", days: 1 },
  '3day': { label: "Three Day", days: 3 },
  '5day': { label: "Working Week", days: 5 },
  week: { label: "Week", days: 7 },
  month: { label: "Month", days: 31 }
};

interface CalendarTemplateProps {
  title: string;
  renderMonthView: () => React.ReactNode;
  renderCalendarContent: () => React.ReactNode;
  onViewChange: (view: string) => void;
  onDateChange: (date: Date) => void;
  onDisplayModeChange: (mode: string) => void;
  calendarView: string;
  selectedDate: Date;
  displayMode: string;
  formatDateRangeHeader: () => string;
}

const CalendarTemplate: React.FC<CalendarTemplateProps> = ({
  title,
  renderMonthView,
  renderCalendarContent,
  onViewChange,
  onDateChange,
  onDisplayModeChange,
  calendarView,
  selectedDate,
  displayMode,
  formatDateRangeHeader
}) => {
  // Navigate to previous period
  const goToPrevious = () => {
    if (calendarView === 'month') {
      onDateChange(sub(selectedDate, { months: 1 }));
    } else if (calendarView === '3day') {
      // For 3-day view, navigate one day at a time
      onDateChange(sub(selectedDate, { days: 1 }));
    } else {
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      onDateChange(sub(selectedDate, { days }));
    }
  };

  // Navigate to next period
  const goToNext = () => {
    if (calendarView === 'month') {
      onDateChange(add(selectedDate, { months: 1 }));
    } else if (calendarView === '3day') {
      // For 3-day view, navigate one day at a time
      onDateChange(add(selectedDate, { days: 1 }));
    } else {
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      onDateChange(add(selectedDate, { days }));
    }
  };

  // Go to today
  const goToToday = () => {
    onDateChange(startOfToday());
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
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
            <ToggleGroup 
              type="single" 
              value={displayMode} 
              onValueChange={(value) => value && onDisplayModeChange(value)}
            >
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
        
        {calendarView === 'month' ? renderMonthView() : renderCalendarContent()}
      </CardContent>
    </Card>
  );
};

export default CalendarTemplate; 