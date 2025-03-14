import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Map, MapPin, ExternalLink, Search } from 'lucide-react';
import { mockMaintenanceRequests } from '@/data/mockData';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import PriorityFilter from '@/components/maintenance/PriorityFilter';

// Changed superintendent name
const CURRENT_SUPER = "Mike Johnson";

const SuperintendentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('workorders');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  
  // Define priorities
  const priorities = ['urgent', 'normal', 'low'];
  
  // Filter maintenance requests for Mike Johnson
  const superintendentRequests = mockMaintenanceRequests.filter(
    request => request.assignedTo === CURRENT_SUPER
  );

  // Apply search and filter
  useEffect(() => {
    let filtered = superintendentRequests;
    
    // Filter by tab selection
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(r => r.status !== 'completed');
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(r => r.status === 'completed');
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        request.issue.toLowerCase().includes(query) ||
        request.tenantName.toLowerCase().includes(query) ||
        request.unit.toLowerCase().includes(query) ||
        request.community.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query)
      );
    }
    
    // Apply priority filter
    if (selectedPriorities.length > 0) {
      filtered = filtered.filter(request => selectedPriorities.includes(request.priority));
    }
    
    setFilteredRequests(filtered);
  }, [activeTab, searchQuery, selectedPriorities, superintendentRequests]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Work Orders</h1>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex justify-start mb-6">
          <TabsTrigger value="workorders">All Work Orders</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workorders">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Assigned Work Orders</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search work orders..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <PriorityFilter 
                    priorities={priorities}
                    selectedValues={selectedPriorities}
                    onChange={setSelectedPriorities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredRequests.length > 0 ? (
                <MaintenanceTable requests={filteredRequests} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No work orders found matching your filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Scheduled Maintenance</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search upcoming tasks..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <PriorityFilter 
                    priorities={priorities}
                    selectedValues={selectedPriorities}
                    onChange={setSelectedPriorities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredRequests.length > 0 ? (
                <MaintenanceTable requests={filteredRequests} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming tasks found matching your filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Completed Work Orders</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search completed work orders..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <PriorityFilter 
                    priorities={priorities}
                    selectedValues={selectedPriorities}
                    onChange={setSelectedPriorities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredRequests.length > 0 ? (
                <MaintenanceTable requests={filteredRequests} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed work orders found matching your filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperintendentDashboard;
