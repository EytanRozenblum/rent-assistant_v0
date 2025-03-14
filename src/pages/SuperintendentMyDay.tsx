import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockMaintenanceRequests } from '@/data/mockData';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';

const CURRENT_SUPER = "Mike Johnson";

const SuperintendentMyDay = () => {
  const navigate = useNavigate();
  
  // Filter maintenance requests for the current superintendent
  const todaysRequests = mockMaintenanceRequests.filter(
    request => request.assignedTo === CURRENT_SUPER && 
    request.status !== 'completed'
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Day</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_SUPER}</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            className="flex-1 md:flex-auto bg-white text-black border border-gray-200 hover:bg-gray-100" 
            onClick={() => navigate('/super/calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Open Calendar
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://maps.google.com', '_blank')}
          >
            <MapPin className="h-4 w-4 mr-2" />
            See Today's Route
          </Button>
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Today's Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {todaysRequests.length > 0 ? (
              <MaintenanceTable requests={todaysRequests} />
            ) : (
              <div className="text-center py-6">
                <p>No work orders scheduled for today.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total work orders</span>
                <span className="font-medium">{todaysRequests.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated completion time</span>
                <span className="font-medium">{todaysRequests.length * 1.5} hours</span>
              </div>
              <div className="flex justify-between">
                <span>First appointment</span>
                <span className="font-medium">
                  {todaysRequests.length > 0 ? '9:00 AM' : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last appointment</span>
                <span className="font-medium">
                  {todaysRequests.length > 0 ? '4:30 PM' : 'N/A'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperintendentMyDay;
