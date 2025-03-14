import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, InfoIcon } from 'lucide-react';
import { mockMaintenanceRequests } from '@/data/mockData';
import { useLocation } from 'react-router-dom';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// This would be better stored in env variables
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNrczl4eGxhdTBxaXIydHFpbmhuc3ZkbzAifQ.QpZOOZ5H5avIcQpq0qmYRQ";

const CURRENT_SUPER = "Mike Johnson";

// Add the SUPERINTENDENTS constant
const SUPERINTENDENTS = [
  { id: 'all', name: 'All Technicians' },
  { id: 'mike', name: 'Mike Johnson' },
  { id: 'alex', name: 'Alex Rodriguez' },
  // Add more superintendents as needed
];

const MapView = () => {
  const location = useLocation();
  const isSuperintendentView = location.pathname.startsWith('/super');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedSuper, setSelectedSuper] = useState<string>('all');
  
  // Update filtered requests
  const filteredRequests = useMemo(() => {
    if (selectedSuper === 'all') {
      return mockMaintenanceRequests;
    }
    return mockMaintenanceRequests.filter(
      request => request.assignedTo === SUPERINTENDENTS.find(s => s.id === selectedSuper)?.name
    );
  }, [selectedSuper]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Map View for {SUPERINTENDENTS.find(s => s.id === selectedSuper)?.name || 'All Superintendents'}
          </h1>
        </div>
        
        <div className="flex gap-3 items-center">
          <Select value={selectedSuper} onValueChange={setSelectedSuper}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Superintendent" />
            </SelectTrigger>
            <SelectContent>
              {SUPERINTENDENTS.map((super_) => (
                <SelectItem key={super_.id} value={super_.id}>
                  {super_.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardContent className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <InfoIcon className="h-12 w-12 mb-4 mx-auto text-brand-300" />
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground max-w-md">
                The Map View functionality is under development. Interactive map with maintenance request locations will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Today's Stops</CardTitle>
        </CardHeader>
        <CardContent>
          <MaintenanceTable requests={filteredRequests} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
