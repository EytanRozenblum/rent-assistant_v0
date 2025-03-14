import React, { useState, useEffect } from 'react';
import AIAgentConsole from '@/components/communications/AIAgentConsole';
import CommunicationsAnalytics from '@/components/communications/CommunicationsAnalytics';
import { mockAIConversations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Mail, Plus, Filter, FileText, ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ScenarioFilter from '@/components/communications/ScenarioFilter';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CommunicationTypeFilter from '@/components/communications/CommunicationTypeFilter';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import LeasingTopicFilter from '@/components/communications/LeasingTopicFilter';
import StatusFilter from '@/components/leads/StatusFilter';
import MaintenanceTopicFilter from '@/components/rent/MaintenanceTopicFilter';
import CommunicationStatusFilter from '@/components/rent/CommunicationStatusFilter';
const SCENARIO_CATEGORIES = [
  {
    name: 'Leasing',
    options: [
      { value: 'leasing/lead', label: 'Lead Interaction' },
      { value: 'leasing/application', label: 'Application Support' },
      { value: 'leasing/signing', label: 'Lease Signing' },
      { value: 'leasing/premove', label: 'Pre-Move-in Prep' },
      { value: 'leasing/onboarding', label: 'Tenant Onboarding' },
    ]
  },
  {
    name: 'Operations',
    options: [
      { value: 'operations/rent', label: 'Rent Collection' },
      { value: 'operations/renewal', label: 'Lease Renewals' },
      { value: 'operations/moveout-notice', label: 'Move-Out Notices' },
      { value: 'operations/moveout-coordination', label: 'Move-Out Coordination' },
    ]
  },
  {
    name: 'Maintenance',
    options: [
      { value: 'maintenance/maintenance-requests', label: 'Maintenance Requests' },
      { value: 'maintenance/workorder', label: 'Work Order Triage' },
      { value: 'maintenance/scheduling', label: 'Maintenance Scheduling' },
      { value: 'maintenance/relationship', label: 'Tenant Relationship' }
    ]
  }
];

const COMMUNICATION_TYPES = [
  { value: 'all', label: 'All Communications' },
  { value: 'voice', label: 'Voice', icon: Phone },
  { value: 'sms', label: 'Text Message', icon: MessageSquare },
  { value: 'email', label: 'Email', icon: Mail }
];

const Communications = () => {
  // State for tabs
  const [activeDepartment, setActiveDepartment] = useState('leasing');
  const [activeView, setActiveView] = useState('console');

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  
  // Department-specific filters
  const [selectedLeasingTopics, setSelectedLeasingTopics] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedMaintenanceTopics, setSelectedMaintenanceTopics] = useState<string[]>([]);
  const [selectedCommunicationStatuses, setSelectedCommunicationStatuses] = useState<string[]>([]);
  
  // Legacy filters - kept for backward compatibility
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [selectedCommTypes, setSelectedCommTypes] = useState<string[]>([]);
  
  console.log('Selected scenario value:', selectedScenarios[0]);
  console.log('All scenario options:', SCENARIO_CATEGORIES.map(cat => 
    cat.options.map(opt => opt.value)
  ).flat());

  // Filter conversations based on selected filters
  const filteredConversations = mockAIConversations.filter(conversation => {
    // Filter by scenario
    if (selectedScenarios.length > 0) {
      const matchesScenario = selectedScenarios.some(selectedScenario => 
        conversation.scenario?.toLowerCase().includes(selectedScenario.toLowerCase())
      );
      if (!matchesScenario) return false;
    }
    
    // Filter by communication type
    if (selectedCommTypes.length > 0 && !selectedCommTypes.includes('all') && !selectedCommTypes.includes(conversation.channel)) {
      return false;
    }
    
    return true;
  });

  console.log('Filtered conversations:', filteredConversations);
  
  // Open Yardi handler
  const handleOpenYardi = () => {
    window.open('https://www.yardi.com', '_blank');
  };

  // Export handler
  const handleExport = () => {
    // Placeholder for export functionality
    console.log('Exporting data...');
    // In a real implementation, you would generate a CSV/Excel file and trigger download
  };
  
  // State for selected conversation
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    // Auto-select the first conversation when department changes
    if (filteredConversations.length > 0) {
      // Find the first conversation matching the active department
      const firstDeptConversation = filteredConversations.find(
        conv => conv.department === activeDepartment
      );
      
      if (firstDeptConversation) {
        setSelectedConversation(firstDeptConversation);
      } else {
        // If no conversation matches the department, just select the first one
        setSelectedConversation(filteredConversations[0]);
      }
    }
  }, [activeDepartment, filteredConversations]);

  return (
    <div>
      {/* Header with title and action buttons */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">AI Communications with Tenants</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Export
          </Button>
          
          <Button 
            size="sm" 
            onClick={handleOpenYardi} 
            className="flex items-center gap-1 min-w-[125px] justify-center"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      {/* Tabs moved outside of card */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        {/* Department Tabs */}
        <Tabs value={activeDepartment} onValueChange={setActiveDepartment} className="w-auto">
          <TabsList>
            <TabsTrigger value="leasing">Leasing</TabsTrigger>
            <TabsTrigger value="operations">Property Operations</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* View Type Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="w-auto">
          <TabsList>
            <TabsTrigger value="console">Agent Console</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Main tabs and content */}
      <Card>
        <CardHeader className="pb-3">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search communications..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Dynamic Filters based on Department */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Market/Community Filter - common to all departments */}
              <MarketCommunityFilter 
                selectedValues={selectedMarketCommunities}
                onChange={setSelectedMarketCommunities}
              />
              
              {/* Department-specific filters */}
              {activeDepartment === 'leasing' && (
                <LeasingTopicFilter 
                  selectedValues={selectedLeasingTopics}
                  onChange={setSelectedLeasingTopics}
                />
              )}
              
              {activeDepartment === 'operations' && (
                <CommunicationStatusFilter 
                  selectedValues={selectedCommunicationStatuses}
                  onChange={setSelectedCommunicationStatuses}
                />
              )}
              
              {activeDepartment === 'maintenance' && (
                <MaintenanceTopicFilter 
                  selectedValues={selectedMaintenanceTopics}
                  onChange={setSelectedMaintenanceTopics}
                />
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="max-h-[calc(100vh-12rem)] overflow-y-auto">
          <Tabs value={activeView}>
            <TabsContent value="console" className="overflow-hidden">
              <AIAgentConsole 
                conversations={filteredConversations}
                activeDepartment={activeDepartment}
                activeView={activeView}
                searchQuery={searchQuery}
                marketFilters={selectedMarketCommunities}
                leasingTopicFilters={selectedLeasingTopics}
                statusFilters={activeDepartment === 'operations' ? selectedCommunicationStatuses : selectedStatuses}
                maintenanceTopicFilters={selectedMaintenanceTopics}
              />
            </TabsContent>
            
            <TabsContent value="analytics" className="overflow-hidden">
              <CommunicationsAnalytics 
                conversations={filteredConversations} 
                department={activeDepartment}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Communications;
