import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoIcon, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { mockMaintenanceRequests } from '@/data/mockData';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import { useNavigate } from 'react-router-dom';

const CURRENT_SUPER = "Mike Johnson";

const SuperintendentMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Filter requests for current superintendent
  const superintendentRequests = useMemo(() => {
    return mockMaintenanceRequests.filter(
      request => request.assignedTo === CURRENT_SUPER || !request.assignedTo
    );
  }, []);

  // Function to open Google Maps with a predefined route
  const openTodaysRoute = () => {
    // This URL could be dynamically generated based on actual route data
    // For now, using a sample route between two locations
    const routeUrl = 'https://www.google.com/maps/dir/40.7128,-74.0060/40.7484,-73.9857/';
    window.open(routeUrl, '_blank');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Map</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_SUPER}</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={openTodaysRoute}
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
          <MaintenanceTable requests={superintendentRequests} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperintendentMap; 