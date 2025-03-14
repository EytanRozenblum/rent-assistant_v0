import React, { useState, useEffect } from 'react';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import { mockMaintenanceRequests } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TechnicianFilter from '@/components/maintenance/TechnicianFilter';
import PriorityFilter from '@/components/maintenance/PriorityFilter';

const Maintenance = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTechnicians, setSelectedTechnicians] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [filteredRequests, setFilteredRequests] = useState(mockMaintenanceRequests);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Get unique technicians/supers for the filter
  const technicians = [...new Set(mockMaintenanceRequests.map(req => req.assignedTo).filter(Boolean))];
  
  // Define priorities
  const priorities = ['urgent', 'normal', 'low'];

  // Filter maintenance requests based on selected filters and search query
  useEffect(() => {
    const filtered = mockMaintenanceRequests.filter(request => {
      // Apply tab-based filter
      if (activeTab === 'upcoming') {
        if (request.status === 'completed') return false;
      } else if (activeTab === 'completed') {
        if (request.status !== 'completed') return false;
      }
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          request.issue.toLowerCase().includes(query) ||
          request.tenantName.toLowerCase().includes(query) ||
          request.unit.toLowerCase().includes(query) ||
          request.community.toLowerCase().includes(query) ||
          (request.assignedTo && request.assignedTo.toLowerCase().includes(query)) ||
          request.description.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }
      
      // Apply technician filter
      if (selectedTechnicians.length > 0 && !selectedTechnicians.includes(request.assignedTo)) {
        return false;
      }
      
      // Apply priority filter
      if (selectedPriorities.length > 0 && !selectedPriorities.includes(request.priority)) {
        return false;
      }
      
      return true;
    });
    
    setFilteredRequests(filtered);
  }, [searchQuery, selectedTechnicians, selectedPriorities, activeTab]);

  // Get title based on active tab
  const getCardTitle = () => {
    switch (activeTab) {
      case 'upcoming':
        return 'Upcoming Maintenance Tasks';
      case 'completed':
        return 'Completed Work Orders';
      default:
        return 'Active Maintenance Requests';
    }
  };

  // Get placeholder based on active tab
  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case 'upcoming':
        return 'Search upcoming tasks...';
      case 'completed':
        return 'Search completed work orders...';
      default:
        return 'Search maintenance requests...';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Requests</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex justify-start mb-6">
          <TabsTrigger value="all">All Work Orders</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{getCardTitle()}</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={getSearchPlaceholder()}
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <TechnicianFilter 
                    technicians={technicians}
                    selectedValues={selectedTechnicians}
                    onChange={setSelectedTechnicians}
                  />
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
                  <p className="text-muted-foreground">No maintenance requests found matching your filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{getCardTitle()}</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={getSearchPlaceholder()}
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <TechnicianFilter 
                    technicians={technicians}
                    selectedValues={selectedTechnicians}
                    onChange={setSelectedTechnicians}
                  />
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
              <CardTitle>{getCardTitle()}</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={getSearchPlaceholder()}
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <TechnicianFilter 
                    technicians={technicians}
                    selectedValues={selectedTechnicians}
                    onChange={setSelectedTechnicians}
                  />
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

export default Maintenance;
