import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, PlusCircle, BarChart, LineChart, PieChart, RefreshCw, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const SAMPLE_REPORTS = [
  {
    id: 1,
    title: 'Occupancy Rates by Market',
    description: 'Monthly breakdown of occupancy rates across all markets',
    category: 'leasing',
    chartType: 'bar',
    lastUpdated: '2023-10-15T14:30:00',
    format: 'pdf',
    frequency: 'monthly',
    favorite: true
  },
  {
    id: 2,
    title: 'Maintenance Request Response Times',
    description: 'Average response times for maintenance requests by priority',
    category: 'maintenance',
    chartType: 'line',
    lastUpdated: '2023-10-12T09:45:00',
    format: 'pdf',
    frequency: 'weekly',
    favorite: true
  },
  {
    id: 3,
    title: 'Revenue by Community and Market',
    description: 'Quarterly revenue breakdown by community and by market',
    category: 'operations',
    chartType: 'pie',
    lastUpdated: '2023-10-10T16:20:00',
    format: 'excel',
    frequency: 'monthly',
    favorite: false
  },
  {
    id: 4,
    title: 'Tenant Satisfaction Scores',
    description: 'Monthly tenant satisfaction ratings by community and by market',
    category: 'operations',
    chartType: 'bar',
    lastUpdated: '2023-10-08T11:15:00',
    format: 'excel',
    frequency: 'quarterly',
    favorite: false
  }
];

const getChartIcon = (type: string) => {
  switch (type) {
    case 'bar':
      return <BarChart className="h-8 w-8 text-brand-500" />;
    case 'line':
      return <LineChart className="h-8 w-8 text-brand-500" />;
    case 'pie':
      return <PieChart className="h-8 w-8 text-brand-500" />;
    default:
      return <BarChart className="h-8 w-8 text-brand-500" />;
  }
};

const ReportCard = ({ report }: { report: typeof SAMPLE_REPORTS[0] }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            {getChartIcon(report.chartType)}
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-lg mt-2">{report.title}</CardTitle>
          <CardDescription>{report.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date(report.lastUpdated).toLocaleDateString()}
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>View</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{report.title}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
              <p>{report.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Category</h4>
                <p className="capitalize">{report.category}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Generated</h4>
                <p>{format(new Date(report.lastUpdated), 'MMM d, yyyy h:mm a')}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Format</h4>
                <p className="uppercase">{report.format}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Frequency</h4>
                <p className="capitalize">{report.frequency}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button 
                variant="outline"
                className="w-[100px]"
                onClick={() => {
                  // Handle generate
                  setShowDetails(false);
                }}
              >
                Generate
              </Button>
              <Button 
                variant="outline"
                className="w-[100px]"
                onClick={() => {
                  // Handle edit
                  setShowDetails(false);
                }}
              >
                View
              </Button>
              <Button 
                variant="destructive"
                className="w-[100px]"
                onClick={() => {
                  // Handle delete
                  setShowDetails(false);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const MyReportsPage = () => {
  const [activeTab, setActiveTab] = React.useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredReports = SAMPLE_REPORTS.filter(report => {
    if (!searchQuery) {
      if (activeTab === 'all') return true;
      if (activeTab === 'favorites') return report.favorite;
      return report.category === activeTab;
    }
    
    const search = searchQuery.toLowerCase();
    const matchesSearch = 
      report.title.toLowerCase().includes(search) ||
      report.description.toLowerCase().includes(search) ||
      report.category.toLowerCase().includes(search);
      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'favorites') return matchesSearch && report.favorite;
    return matchesSearch && report.category === activeTab;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Reports</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Export
          </Button>
          
          <Button 
            size="sm" 
            className="flex items-center gap-1 min-w-[125px] justify-center"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 flex items-center gap-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="leasing">Leasing</TabsTrigger>
              <TabsTrigger value="operations">Property Operations</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <Button variant="outline" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Create Personalized Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyReportsPage; 