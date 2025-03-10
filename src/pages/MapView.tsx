import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin } from 'lucide-react';
import { mockMaintenanceRequests } from '@/data/mockData';
import { useLocation } from 'react-router-dom';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';

// This would be better stored in env variables
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNrczl4eGxhdTBxaXIydHFpbmhuc3ZkbzAifQ.QpZOOZ5H5avIcQpq0qmYRQ";

const CURRENT_SUPER = "Mike Johnson";

const MapView = () => {
  const location = useLocation();
  const isSuperintendentView = location.pathname.startsWith('/super');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // For superintendent view, we only show their requests
  const filteredRequests = isSuperintendentView
    ? mockMaintenanceRequests.filter(request => request.assignedTo === CURRENT_SUPER)
    : mockMaintenanceRequests;

  useEffect(() => {
    // A placeholder for the map implementation
    // In a real implementation, we would:
    // 1. Create a mapbox map
    // 2. Add markers for each maintenance request
    // 3. Add click handlers to the markers
    const mapContainer = mapContainerRef.current;
    
    if (mapContainer) {
      mapContainer.innerHTML = '<div class="flex justify-center items-center h-full bg-muted/50 rounded-lg border"><p class="text-muted-foreground">Interactive map would be displayed here<br/>(requires Mapbox integration)</p></div>';
    }
    
    return () => {
      // Clean up map resources
    };
  }, [filteredRequests]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {isSuperintendentView ? (
          <div>
            <h1 className="text-2xl font-bold">Superintendent Itinerary</h1>
            <p className="text-muted-foreground">Welcome back, {CURRENT_SUPER}</p>
          </div>
        ) : (
          <h1 className="text-2xl font-bold">Itinerary for All Supers</h1>
        )}
        
        <div className="flex gap-3">
          <Button className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Open in Google Maps
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div ref={mapContainerRef} className="w-full h-[400px] rounded-lg border shadow-sm"></div>
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
