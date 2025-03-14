import React, { useState } from 'react';
import LeadsTable from '@/components/leads/LeadsTable';
import { mockLeads } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, FileText, BarChart, ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import StatusFilter from '@/components/leads/StatusFilter';
import AgentFilter from '@/components/leads/AgentFilter';
import { Input } from '@/components/ui/input';

const Leads = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // State for All Leads tab
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // State for New Leads tab
  const [newAgents, setNewAgents] = useState<string[]>([]);
  const [newMarketCommunities, setNewMarketCommunities] = useState<string[]>([]);
  
  // State for Contacted tab
  const [contactedAgents, setContactedAgents] = useState<string[]>([]);
  const [contactedMarketCommunities, setContactedMarketCommunities] = useState<string[]>([]);
  
  // State for Tour Scheduled tab
  const [scheduledAgents, setScheduledAgents] = useState<string[]>([]);
  const [scheduledMarketCommunities, setScheduledMarketCommunities] = useState<string[]>([]);
  
  // State for Application Sent tab
  const [applicationSentAgents, setApplicationSentAgents] = useState<string[]>([]);
  const [applicationSentMarketCommunities, setApplicationSentMarketCommunities] = useState<string[]>([]);
  
  // State for Application Received tab
  const [applicationReceivedAgents, setApplicationReceivedAgents] = useState<string[]>([]);
  const [applicationReceivedMarketCommunities, setApplicationReceivedMarketCommunities] = useState<string[]>([]);
  
  // State for Closed Won tab
  const [closedWonAgents, setClosedWonAgents] = useState<string[]>([]);
  const [closedWonMarketCommunities, setClosedWonMarketCommunities] = useState<string[]>([]);
  
  // State for Closed Lost tab
  const [closedLostAgents, setClosedLostAgents] = useState<string[]>([]);
  const [closedLostMarketCommunities, setClosedLostMarketCommunities] = useState<string[]>([]);

  const leasingAgents = [...new Set(mockLeads.map(lead => lead.assignedTo))];

  // Helper function to apply search filter
  const applySearchFilter = (leads: typeof mockLeads) => {
    if (!searchQuery) return leads;
    
    const query = searchQuery.toLowerCase();
    return leads.filter(lead => 
      lead.name.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.propertyInterest.toLowerCase().includes(query) ||
      lead.community.toLowerCase().includes(query) ||
      lead.market.toLowerCase().includes(query)
    );
  };

  // Filter functions for each tab
  const filteredLeads = applySearchFilter(mockLeads.filter(lead => {
    if (selectedAgents.length > 0 && !selectedAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(lead.status)) {
      return false;
    }
    if (selectedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!selectedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  }));

  const newLeads = applySearchFilter(mockLeads.filter(lead => {
    if (lead.status !== 'new') return false;
    if (newAgents.length > 0 && !newAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (newMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!newMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  }));

  const contactedLeads = applySearchFilter(mockLeads.filter(lead => {
    if (lead.status !== 'contacted') return false;
    if (contactedAgents.length > 0 && !contactedAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (contactedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!contactedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  }));

  const scheduledLeads = applySearchFilter(mockLeads.filter(lead => {
    if (lead.status !== 'tour_scheduled') return false;
    if (scheduledAgents.length > 0 && !scheduledAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (scheduledMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!scheduledMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  }));

  const applicationSentLeads = applySearchFilter(mockLeads.filter(lead => {
    if (lead.status !== 'application_sent') return false;
    if (applicationSentAgents.length > 0 && !applicationSentAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (applicationSentMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!applicationSentMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  }));

  const applicationReceivedLeads = applySearchFilter(mockLeads.filter(lead => {
    if (lead.status !== 'application_received') return false;
    if (applicationReceivedAgents.length > 0 && !applicationReceivedAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (applicationReceivedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!applicationReceivedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  }));

  const closedWonLeads = applySearchFilter(mockLeads.filter(lead => {
    if (lead.status !== 'closed_won') return false;
    if (closedWonAgents.length > 0 && !closedWonAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (closedWonMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!closedWonMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  }));

  const closedLostLeads = applySearchFilter(mockLeads.filter(lead => {
    if (lead.status !== 'closed_lost') return false;
    if (closedLostAgents.length > 0 && !closedLostAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (closedLostMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!closedLostMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads & Tours</h1>
        
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
      
      <Tabs defaultValue="leads">
        <TabsList className="mb-6">
          <TabsTrigger value="leads">All Leads</TabsTrigger>
          <TabsTrigger value="new">New Leads</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="tour_scheduled">Tour Scheduled</TabsTrigger>
          <TabsTrigger value="application_sent">Application Sent</TabsTrigger>
          <TabsTrigger value="application_received">Application Received</TabsTrigger>
          <TabsTrigger value="closed_won">Closed Won</TabsTrigger>
          <TabsTrigger value="closed_lost">Closed Lost</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Current Leads</CardTitle>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <AgentFilter 
                    agents={leasingAgents}
                    selectedValues={selectedAgents}
                    onChange={setSelectedAgents}
                  />
                  
                  <MarketCommunityFilter 
                    selectedValues={selectedMarketCommunities}
                    onChange={setSelectedMarketCommunities}
                  />
                  
                  <StatusFilter
                    selectedValues={selectedStatuses}
                    onChange={setSelectedStatuses}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={filteredLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>New Leads</CardTitle>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <AgentFilter 
                    agents={leasingAgents}
                    selectedValues={newAgents}
                    onChange={setNewAgents}
                  />
                  
                  <MarketCommunityFilter 
                    selectedValues={newMarketCommunities}
                    onChange={setNewMarketCommunities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={newLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacted">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Contacted Leads</CardTitle>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <AgentFilter 
                    agents={leasingAgents}
                    selectedValues={contactedAgents}
                    onChange={setContactedAgents}
                  />
                  
                  <MarketCommunityFilter 
                    selectedValues={contactedMarketCommunities}
                    onChange={setContactedMarketCommunities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={contactedLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tour_scheduled">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tour Scheduled Leads</CardTitle>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <AgentFilter 
                    agents={leasingAgents}
                    selectedValues={scheduledAgents}
                    onChange={setScheduledAgents}
                  />
                  
                  <MarketCommunityFilter 
                    selectedValues={scheduledMarketCommunities}
                    onChange={setScheduledMarketCommunities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={scheduledLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="application_sent">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Application Sent Leads</CardTitle>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <AgentFilter 
                    agents={leasingAgents}
                    selectedValues={applicationSentAgents}
                    onChange={setApplicationSentAgents}
                  />
                  
                  <MarketCommunityFilter 
                    selectedValues={applicationSentMarketCommunities}
                    onChange={setApplicationSentMarketCommunities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={applicationSentLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="application_received">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Application Received Leads</CardTitle>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <AgentFilter 
                    agents={leasingAgents}
                    selectedValues={applicationReceivedAgents}
                    onChange={setApplicationReceivedAgents}
                  />
                  
                  <MarketCommunityFilter 
                    selectedValues={applicationReceivedMarketCommunities}
                    onChange={setApplicationReceivedMarketCommunities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={applicationReceivedLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="closed_won">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Closed Won Leads</CardTitle>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <AgentFilter 
                    agents={leasingAgents}
                    selectedValues={closedWonAgents}
                    onChange={setClosedWonAgents}
                  />
                  
                  <MarketCommunityFilter 
                    selectedValues={closedWonMarketCommunities}
                    onChange={setClosedWonMarketCommunities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={closedWonLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="closed_lost">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Closed Lost Leads</CardTitle>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <AgentFilter 
                    agents={leasingAgents}
                    selectedValues={closedLostAgents}
                    onChange={setClosedLostAgents}
                  />
                  
                  <MarketCommunityFilter 
                    selectedValues={closedLostMarketCommunities}
                    onChange={setClosedLostMarketCommunities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={closedLostLeads} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leads;
