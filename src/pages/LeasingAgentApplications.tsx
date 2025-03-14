import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Search } from 'lucide-react';
import { mockApplications, CURRENT_LEASING_AGENT } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ApplicationsTable from '@/components/applications/ApplicationsTable';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import ApplicationStatusFilter from '@/components/applications/ApplicationStatusFilter';

const LeasingAgentApplications = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // Filter applications for the current leasing agent
  const agentApplications = mockApplications.filter(
    app => app.assignedTo === CURRENT_LEASING_AGENT
  );
  
  // Apply search and filter
  const applyFilters = (applications: typeof mockApplications) => {
    return applications.filter(app => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          app.name.toLowerCase().includes(query) ||
          app.email.toLowerCase().includes(query) ||
          app.propertyInterest.toLowerCase().includes(query) ||
          (app.assignedTo && app.assignedTo.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }
      
      // Apply market/community filter
      if (selectedMarketCommunities.length > 0) {
        const marketCommunity = `${app.market}/${app.community}`;
        if (!selectedMarketCommunities.some(mc => marketCommunity.includes(mc))) {
          return false;
        }
      }
      
      // Apply status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(app.status)) {
        return false;
      }
      
      return true;
    });
  };
  
  // Filter applications by status and search query
  const filteredApplications = applyFilters(agentApplications);
  const pendingApplications = applyFilters(agentApplications.filter(app => app.status === 'pending'));
  const reviewingApplications = applyFilters(agentApplications.filter(app => app.status === 'reviewing'));
  const approvedApplications = applyFilters(agentApplications.filter(app => app.status === 'approved'));
  const deniedApplications = applyFilters(agentApplications.filter(app => app.status === 'denied'));
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>
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
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="reviewing">Under Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="denied">Denied</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Applications</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search applications..."
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
                  <ApplicationStatusFilter 
                    selectedValues={selectedStatuses}
                    onChange={setSelectedStatuses}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ApplicationsTable applications={filteredApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Applications</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search pending applications..."
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
              <ApplicationsTable applications={pendingApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviewing">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Applications Under Review</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search applications under review..."
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
              <ApplicationsTable applications={reviewingApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Approved Applications</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search approved applications..."
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
              <ApplicationsTable applications={approvedApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="denied">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Denied Applications</CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search denied applications..."
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
              <ApplicationsTable applications={deniedApplications} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeasingAgentApplications;
