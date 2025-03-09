
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MapView = () => {
  const [selectedSuper, setSelectedSuper] = useState<string>('all');
  
  // Dummy super data - would come from API in real app
  const supers = ['John Doe', 'Jane Smith', 'Mike Johnson'];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Dispatch Map</h1>
        
        <div className="flex gap-3">
          <Select value={selectedSuper} onValueChange={setSelectedSuper}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Super" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Supers</SelectItem>
              {supers.map(sup => (
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
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Itinerary for {selectedSuper === 'all' ? 'All Supers' : selectedSuper}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted text-center rounded-md">
            <p className="mb-4 text-muted-foreground">The map feature will display maintenance locations and optimize routes.</p>
            <p className="text-muted-foreground text-sm">Will integrate with Google Maps for turn-by-turn directions.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Today's Stops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <div className="font-medium">123 Main St, Apt 4B</div>
              <div className="text-sm text-muted-foreground mt-1">Leaking faucet in bathroom - Scheduled: 10:00 AM</div>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="font-medium">456 Oak Ave, Apt 7C</div>
              <div className="text-sm text-muted-foreground mt-1">AC not working - Scheduled: 11:30 AM</div>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="font-medium">789 Pine St, Apt 2A</div>
              <div className="text-sm text-muted-foreground mt-1">Broken disposal - Scheduled: 2:00 PM</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
