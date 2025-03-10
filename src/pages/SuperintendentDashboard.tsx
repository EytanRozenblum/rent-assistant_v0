import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Map } from 'lucide-react';
import { mockMaintenanceRequests } from '@/data/mockData';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import { useNavigate } from 'react-router-dom';

// Changed superintendent name
const CURRENT_SUPER = "Mike Johnson";

const SuperintendentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('workorders');
  
  // Filter maintenance requests for Mike Johnson
  const superintendentRequests = mockMaintenanceRequests.filter(
    request => request.assignedTo === CURRENT_SUPER
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Superintendent Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_SUPER}</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/super/calendar')}>
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/super/map')}>
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="workorders">Work Orders</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workorders">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Assigned Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceTable requests={superintendentRequests} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Scheduled Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceTable 
                requests={superintendentRequests.filter(r => r.status !== 'completed')} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Completed Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceTable 
                requests={superintendentRequests.filter(r => r.status === 'completed')} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperintendentDashboard;
