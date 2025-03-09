
import React, { useState } from 'react';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import { mockMaintenanceRequests } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Calendar, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const Maintenance = () => {
  const navigate = useNavigate();
  const [superFilter, setSuperFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Get unique supers for the filter
  const supers = [...new Set(mockMaintenanceRequests.map(req => req.assignedTo).filter(Boolean))];

  // Filter maintenance requests based on selected filters
  const filteredRequests = mockMaintenanceRequests.filter(request => {
    if (superFilter !== 'all' && request.assignedTo !== superFilter) {
      return false;
    }
    if (priorityFilter !== 'all' && request.priority !== priorityFilter) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Requests</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/calendar')}>
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/map')}>
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Request
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3 flex flex-row justify-between items-center">
          <CardTitle>Active Maintenance Requests</CardTitle>
          
          <div className="flex gap-4">
            <Select value={superFilter} onValueChange={setSuperFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Maintenance Super" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Supers</SelectItem>
                {supers.map(sup => sup && (
                  <SelectItem key={sup} value={sup}>{sup}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <MaintenanceTable requests={filteredRequests} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Maintenance;
