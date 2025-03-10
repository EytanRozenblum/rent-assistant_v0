import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockMaintenanceRequests } from '@/data/mockData';

const CURRENT_SUPER = "Mike Johnson";

const SuperintendentCalendar = () => {
  const [calendarView, setCalendarView] = useState<string>('week');
  
  const superintendentRequests = mockMaintenanceRequests.filter(
    request => request.assignedTo === CURRENT_SUPER
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Superintendent Calendar</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_SUPER}</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <Select value={calendarView} onValueChange={setCalendarView}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Calendar View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="5day">5 Day Week</SelectItem>
              <SelectItem value="week">7 Day Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Maintenance Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted text-center rounded-md">
            <p className="text-muted-foreground">Calendar view implementation coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperintendentCalendar; 