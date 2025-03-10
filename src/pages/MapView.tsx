import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockMaintenanceRequests } from '@/data/mockData';
import PlaceholderPage from './PlaceholderPage';

const MapView = () => {
  const [selectedSuper, setSelectedSuper] = useState<string>('all');
  
  // Get unique supers from the same data source
  const supers = [...new Set(mockMaintenanceRequests.map(req => req.assignedTo).filter(Boolean))];
  
  // Filter maintenance requests based on selected super
  const filteredRequests = mockMaintenanceRequests.filter(request => 
    selectedSuper === 'all' || request.assignedTo === selectedSuper
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Itinerary for {selectedSuper === 'all' ? 'All Supers' : selectedSuper}</h1>
        
        <div className="flex gap-3">
          <Select value={selectedSuper} onValueChange={setSelectedSuper}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Super" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Supers</SelectItem>
              {supers.map(sup => sup && (
                <SelectItem key={sup} value={sup}>{sup}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Open in Google Maps
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <PlaceholderPage />
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Today's Stops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tenant</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Unit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Issue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Assigned To</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pictures</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="py-3 px-4">{request.tenantName}</td>
                    <td className="py-3 px-4">{request.unit}</td>
                    <td className="py-3 px-4">{request.description}</td>
                    <td className="py-3 px-4">{request.date}</td>
                    <td className="py-3 px-4">{request.assignedTo || 'Unassigned'}</td>
                    <td className="py-3 px-4">
                      <button 
                        className="text-blue-600 hover:text-blue-800 underline p-0 bg-transparent border-none text-sm"
                        onClick={() => {/* Handle picture view */}}
                      >
                        {`See picture${(request.images?.length || 0) <= 1 ? '' : 's'} (${request.images?.length || 0})`}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
