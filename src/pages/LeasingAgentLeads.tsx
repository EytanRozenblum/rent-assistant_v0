import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LeadsTable from '@/components/leads/LeadsTable';
import { mockLeads, CURRENT_LEASING_AGENT } from '@/data/mockData';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import StatusFilter from '@/components/leads/StatusFilter';

const LeasingAgentLeads = () => {
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('leads');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter leads for the current leasing agent
  const agentLeads = mockLeads.filter(
    lead => lead.assignedTo === CURRENT_LEASING_AGENT
  );
  
  // Apply additional filters based on selected options and search query
  const filteredLeads = agentLeads.filter(lead => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.propertyInterest.toLowerCase().includes(query) ||
        lead.community.toLowerCase().includes(query) ||
        lead.market.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }
    
    // Filter by status if statuses are selected
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(lead.status)) {
      return false;
    }
    
    // Filter by market/community if selected
    if (selectedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!selectedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Filter for new leads (not yet contacted)
  const newLeads = filteredLeads.filter(lead => lead.status === 'new');
  
  // Filter for contacted leads
  const contactedLeads = filteredLeads.filter(lead => lead.status === 'contacted');
  
  // Filter for leads with scheduled tours
  const tourScheduledLeads = filteredLeads.filter(lead => lead.status === 'tour_scheduled');
  
  // Filter for leads with sent applications
  const applicationSentLeads = filteredLeads.filter(lead => lead.status === 'application_sent');
  
  // Filter for leads with received applications
  const applicationReceivedLeads = filteredLeads.filter(lead => lead.status === 'application_received');
  
  // Filter for closed won leads
  const closedWonLeads = filteredLeads.filter(lead => lead.status === 'closed_won');
  
  // Filter for closed lost leads
  const closedLostLeads = filteredLeads.filter(lead => lead.status === 'closed_lost');
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Leads & Tours</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_LEASING_AGENT}</p>
        </div>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
              <CardTitle>All My Leads</CardTitle>
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
                  <MarketCommunityFilter 
                    selectedValues={selectedMarketCommunities}
                    onChange={setSelectedMarketCommunities}
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
                  <MarketCommunityFilter 
                    selectedValues={selectedMarketCommunities}
                    onChange={setSelectedMarketCommunities}
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
                  <MarketCommunityFilter 
                    selectedValues={selectedMarketCommunities}
                    onChange={setSelectedMarketCommunities}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={tourScheduledLeads} />
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
                  <MarketCommunityFilter 
                    selectedValues={selectedMarketCommunities}
                    onChange={setSelectedMarketCommunities}
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
                  <MarketCommunityFilter 
                    selectedValues={selectedMarketCommunities}
                    onChange={setSelectedMarketCommunities}
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
                  <MarketCommunityFilter 
                    selectedValues={selectedMarketCommunities}
                    onChange={setSelectedMarketCommunities}
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
                  <MarketCommunityFilter 
                    selectedValues={selectedMarketCommunities}
                    onChange={setSelectedMarketCommunities}
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

export default LeasingAgentLeads;
