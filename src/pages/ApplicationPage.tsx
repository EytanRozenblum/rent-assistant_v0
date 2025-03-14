import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockApplications, CURRENT_LEASING_AGENT } from '@/data/mockData';
import { Search, ExternalLink, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import ApplicationsTable from '@/components/applications/ApplicationsTable';
import { Button } from '@/components/ui/button';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import ApplicationStatusFilter from '@/components/applications/ApplicationStatusFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ApplicationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const location = useLocation();
  
  // Check if we're in the agent view
  const isAgentView = location.pathname.startsWith('/agent');
  
  // Filter applications based on the current view
  const applicationsData = isAgentView 
    ? mockApplications.filter(app => app.assignedTo === CURRENT_LEASING_AGENT)
    : mockApplications;
  
  // Apply search and filter
  const applyFilters = (applications: typeof mockApplications) => {
    return applications.filter(app => {
      // Apply search filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
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
  const filteredApplications = applyFilters(applicationsData);
  const pendingApplications = applyFilters(applicationsData.filter(app => app.status === 'pending'));
  const reviewingApplications = applyFilters(applicationsData.filter(app => app.status === 'reviewing'));
  const approvedApplications = applyFilters(applicationsData.filter(app => app.status === 'approved'));
  const deniedApplications = applyFilters(applicationsData.filter(app => app.status === 'denied'));

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {isAgentView ? 'My Applications' : 'All Tenant Applications'}
          </h1>
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
              <CardTitle>
                {isAgentView ? 'Applications Assigned to Me' : 'Active Applications'}
              </CardTitle>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search applications..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredApplications.length > 0 ? (
                <ApplicationsTable applications={filteredApplications} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No applications found matching your search.</p>
                </div>
              )}
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
              {pendingApplications.length > 0 ? (
                <ApplicationsTable applications={pendingApplications} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending applications found.</p>
                </div>
              )}
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
              {reviewingApplications.length > 0 ? (
                <ApplicationsTable applications={reviewingApplications} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No applications under review found.</p>
                </div>
              )}
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
              {approvedApplications.length > 0 ? (
                <ApplicationsTable applications={approvedApplications} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No approved applications found.</p>
                </div>
              )}
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
              {deniedApplications.length > 0 ? (
                <ApplicationsTable applications={deniedApplications} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No denied applications found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationPage;
