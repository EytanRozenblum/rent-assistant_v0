
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  mockOccupancyTrendData, 
  mockRenewalsTrendData,
  mockDelinquencyTrendData
} from '@/data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  MessageCircle, 
  Users, 
  Building, 
  Wrench, 
  BarChart, 
  PieChart, 
  LineChart as LineChartIcon, 
  Table as TableIcon, 
  X, 
  Plus, 
  FileText,
  Clock,
  Download,
  Edit,
  Trash,
  MoreVertical,
  Save
} from 'lucide-react';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardSelector from '@/components/dashboard/DashboardSelector';

const ReportsPage = () => {
  const [selectedMarket, setSelectedMarket] = useState('Average');
  const [activeTab, setActiveTab] = useState('occupancy');
  const [mainTab, setMainTab] = useState('dashboard');
  const [agentPrompt, setAgentPrompt] = useState('');
  const [agentResponses, setAgentResponses] = useState<{question: string, answer: string}[]>([]);
  
  // Dashboard management state
  const [dashboardCards, setDashboardCards] = useState([
    { id: 1, title: 'Occupancy Rate', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all', category: 'leasing' },
    { id: 2, title: 'Leasing Velocity', type: 'bar', kpi: 'leasing-velocity', timeframe: 'quarter', market: 'all', category: 'leasing' },
    { id: 3, title: 'Rent Collection', type: 'line', kpi: 'rent-collection', timeframe: 'year', market: 'all', category: 'operations' },
    { id: 4, title: 'Work Order Resolution Time', type: 'line', kpi: 'resolution-time', timeframe: 'year', market: 'all', category: 'maintenance' },
  ]);
  
  // Saved dashboards
  const [savedDashboards, setSavedDashboards] = useState([
    { id: '1', name: 'Default Dashboard', cards: [...dashboardCards], isDefault: true },
    { id: '2', name: 'Leasing Performance', cards: [
      { id: 1, title: 'Occupancy Rate', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all', category: 'leasing' },
      { id: 2, title: 'Leasing Velocity', type: 'bar', kpi: 'leasing-velocity', timeframe: 'quarter', market: 'all', category: 'leasing' },
      { id: 3, title: 'Renewal Rate', type: 'line', kpi: 'renewals', timeframe: 'year', market: 'all', category: 'leasing' },
    ]},
    { id: '3', name: 'Maintenance Overview', cards: [
      { id: 1, title: 'Work Order Resolution Time', type: 'line', kpi: 'resolution-time', timeframe: 'month', market: 'all', category: 'maintenance' },
      { id: 2, title: 'Work Order Types', type: 'pie', kpi: 'work-order-types', timeframe: 'quarter', market: 'all', category: 'maintenance' },
    ]},
  ]);
  
  const [activeDashboard, setActiveDashboard] = useState(savedDashboards[0]);
  const [saveDashboardDialogOpen, setSaveDashboardDialogOpen] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [isEditingDashboard, setIsEditingDashboard] = useState(false);
  
  const [addCardDialogOpen, setAddCardDialogOpen] = useState(false);
  const [createReportDialogOpen, setCreateReportDialogOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardKpi, setNewCardKpi] = useState('occupancy');
  const [newCardType, setNewCardType] = useState('line');
  const [newCardTimeframe, setNewCardTimeframe] = useState('month');
  const [newCardMarket, setNewCardMarket] = useState('all');
  const [newCardCategory, setNewCardCategory] = useState('leasing');
  
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportRecipients, setReportRecipients] = useState('');
  const [reportFrequency, setReportFrequency] = useState('monthly');
  const [reportFormat, setReportFormat] = useState('pdf');
  
  const [personalizedReports, setPersonalizedReports] = useState([
    { 
      id: 1, 
      name: 'Monthly Occupancy Overview', 
      description: 'Detailed occupancy analysis across all markets',
      created: '2023-05-15',
      lastGenerated: '2023-07-01',
      frequency: 'Monthly',
      format: 'PDF',
      recipients: ['john.smith@example.com', 'jane.doe@example.com']
    },
    { 
      id: 2, 
      name: 'Q2 Leasing Performance', 
      description: 'Quarterly leasing metrics and conversion rates',
      created: '2023-04-10',
      lastGenerated: '2023-06-30',
      frequency: 'Quarterly',
      format: 'Excel',
      recipients: ['marketing@example.com', 'leadership@example.com']
    },
    { 
      id: 3, 
      name: 'Maintenance Efficiency', 
      description: 'Work order resolution times and tenant satisfaction',
      created: '2023-06-22',
      lastGenerated: '2023-07-01',
      frequency: 'Weekly',
      format: 'PDF',
      recipients: ['operations@example.com']
    }
  ]);

  // Handle dashboard selection
  const handleDashboardSelect = (dashboard: typeof savedDashboards[0]) => {
    setActiveDashboard(dashboard);
    setDashboardCards(dashboard.cards);
  };

  // Save current dashboard
  const handleSaveDashboard = () => {
    if (!newDashboardName.trim()) {
      toast.error("Please enter a name for your dashboard");
      return;
    }

    if (isEditingDashboard) {
      // Update existing dashboard
      const updatedDashboards = savedDashboards.map(dashboard => 
        dashboard.id === activeDashboard.id 
          ? { ...dashboard, name: newDashboardName, cards: [...dashboardCards] }
          : dashboard
      );
      setSavedDashboards(updatedDashboards);
      setActiveDashboard({ ...activeDashboard, name: newDashboardName, cards: [...dashboardCards] });
      toast.success(`Dashboard "${newDashboardName}" updated successfully`);
    } else {
      // Create new dashboard
      const newDashboard = {
        id: Date.now().toString(),
        name: newDashboardName,
        cards: [...dashboardCards],
        isDefault: false
      };
      
      setSavedDashboards([...savedDashboards, newDashboard]);
      setActiveDashboard(newDashboard);
      toast.success(`Dashboard "${newDashboardName}" created successfully`);
    }
    
    setNewDashboardName('');
    setSaveDashboardDialogOpen(false);
    setIsEditingDashboard(false);
  };

  // Handle dashboard action from selector
  const handleCreateNewDashboard = () => {
    setIsEditingDashboard(false);
    setNewDashboardName('');
    setSaveDashboardDialogOpen(true);
  };
  
  const formatYAxis = (value: number) => `${value}%`;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentPrompt.trim()) return;
    
    const newResponse = {
      question: agentPrompt,
      answer: "I'm analyzing the data from your property management system. Based on the reports, the occupancy rate has been trending upward over the last quarter with a 2.3% increase. The highest performing market is Atlanta with a 94.8% occupancy rate. Would you like me to provide more specific insights on any particular KPI or market?"
    };
    
    setAgentResponses([...agentResponses, newResponse]);
    setAgentPrompt('');
  };

  const handleCardTypeChange = (cardId: number, newType: string) => {
    setDashboardCards(dashboardCards.map(card => 
      card.id === cardId ? { ...card, type: newType } : card
    ));
  };

  const handleDeleteCard = (cardId: number) => {
    setDashboardCards(dashboardCards.filter(card => card.id !== cardId));
    toast.success("Card removed successfully");
  };

  const handleAddNewCard = () => {
    if (!newCardTitle.trim()) {
      toast.error("Please enter a title for the new card");
      return;
    }
    
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      type: newCardType,
      kpi: newCardKpi,
      timeframe: newCardTimeframe,
      market: newCardMarket,
      category: newCardCategory
    };
    
    setDashboardCards([...dashboardCards, newCard]);
    
    setNewCardTitle('');
    setNewCardKpi('occupancy');
    setNewCardType('line');
    setNewCardTimeframe('month');
    setNewCardMarket('all');
    setNewCardCategory('leasing');
    setAddCardDialogOpen(false);
    
    toast.success("New card added successfully");
  };

  const handleCreateReport = () => {
    if (!reportName.trim()) {
      toast.error("Please enter a name for your report");
      return;
    }
    
    const newReport = {
      id: Date.now(),
      name: reportName,
      description: reportDescription,
      created: new Date().toISOString().split('T')[0],
      lastGenerated: new Date().toISOString().split('T')[0],
      frequency: reportFrequency,
      format: reportFormat,
      recipients: reportRecipients.split(',').map(email => email.trim()).filter(email => email)
    };
    
    setPersonalizedReports([...personalizedReports, newReport]);
    toast.success(`Report "${reportName}" created successfully`);
    
    setReportName('');
    setReportDescription('');
    setReportRecipients('');
    setReportFrequency('monthly');
    setReportFormat('pdf');
    setCreateReportDialogOpen(false);
  };
  
  const handleDeleteReport = (reportId: number) => {
    setPersonalizedReports(personalizedReports.filter(report => report.id !== reportId));
    toast.success("Report deleted successfully");
  };
  
  const handleGenerateReport = (reportName: string) => {
    toast.success(`Generating report: ${reportName}...`);
  };

  const renderCardContent = (card: any) => {
    switch (card.type) {
      case 'line':
        return (
          <SimpleLineChart 
            data={card.kpi === 'occupancy' ? mockOccupancyTrendData : 
                  card.kpi === 'delinquency' ? mockDelinquencyTrendData : 
                  mockRenewalsTrendData} 
            title={card.title}
            yAxisLabel={card.kpi.includes('time') ? 'Days' : '%'}
          />
        );
      case 'bar':
        return (
          <SimpleBarChart 
            data={card.kpi === 'occupancy' ? mockOccupancyTrendData : 
                  card.kpi === 'delinquency' ? mockDelinquencyTrendData : 
                  mockRenewalsTrendData}
            title={card.title}
            yAxisLabel={card.kpi.includes('time') ? 'Days' : '%'}
          />
        );
      case 'pie':
        return (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Pie chart visualization coming soon</p>
          </div>
        );
      case 'table':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOccupancyTrendData.slice(0, 5).map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Average}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index > 0 ? `${(item.Average - mockOccupancyTrendData[index-1].Average).toFixed(1)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  const handleCardPropertyChange = (cardId: number, property: string, value: string) => {
    setDashboardCards(dashboardCards.map(card => 
      card.id === cardId ? { ...card, [property]: value } : card
    ));
  };

  const renderCardOptionsMenu = (card: any) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="flex flex-col w-full px-2 py-1.5">
                <Label className="text-xs text-muted-foreground mb-1">Chart Type</Label>
                <ToggleGroup type="single" value={card.type} onValueChange={(value) => value && handleCardPropertyChange(card.id, 'type', value)} className="justify-start">
                  <ToggleGroupItem value="line" aria-label="Line Chart" className="h-8 w-8 p-0">
                    <LineChartIcon className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="bar" aria-label="Bar Chart" className="h-8 w-8 p-0">
                    <BarChart className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="pie" aria-label="Pie Chart" className="h-8 w-8 p-0">
                    <PieChart className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="table" aria-label="Table" className="h-8 w-8 p-0">
                    <TableIcon className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="flex flex-col w-full px-2 py-1.5">
                <Label className="text-xs text-muted-foreground mb-1">Timeframe</Label>
                <Select value={card.timeframe} onValueChange={(value) => handleCardPropertyChange(card.id, 'timeframe', value)}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="flex flex-col w-full px-2 py-1.5">
                <Label className="text-xs text-muted-foreground mb-1">Market</Label>
                <Select value={card.market} onValueChange={(value) => handleCardPropertyChange(card.id, 'market', value)}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Market" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Markets</SelectItem>
                    <SelectItem value="atlanta">Atlanta</SelectItem>
                    <SelectItem value="tampa">Tampa</SelectItem>
                    <SelectItem value="orlando">Orlando</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <div className="flex flex-col w-full px-2 py-1.5">
                <Label className="text-xs text-muted-foreground mb-1">Category</Label>
                <Select value={card.category} onValueChange={(value) => handleCardPropertyChange(card.id, 'category', value)}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leasing">Leasing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'leasing':
        return <Users className="h-4 w-4 mr-1 text-blue-500" />;
      case 'operations':
        return <Building className="h-4 w-4 mr-1 text-green-500" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4 mr-1 text-amber-500" />;
      default:
        return null;
    }
  };

  const getReportFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'excel':
        return <TableIcon className="h-4 w-4 text-green-500" />;
      case 'csv':
        return <TableIcon className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    return <Clock className="h-4 w-4 text-indigo-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setCreateReportDialogOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Create Personalized Report
          </Button>
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Market:</span>
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Average">All Markets (Average)</SelectItem>
                <SelectItem value="Atlanta">Atlanta</SelectItem>
                <SelectItem value="Tampa">Tampa</SelectItem>
                <SelectItem value="Jacksonville">Jacksonville</SelectItem>
                <SelectItem value="Orlando">Orlando</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <ToggleGroup 
        type="single" 
        value={mainTab} 
        onValueChange={(value) => value && setMainTab(value)}
        className="justify-start border-b pb-2 w-full"
      >
        <ToggleGroupItem value="agent" aria-label="Ask our Agent" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>Ask our Agent</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="dashboard" aria-label="Dashboard" className="gap-2">
          <BarChart className="h-4 w-4" />
          <span>Dashboard</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="myreports" aria-label="My Personalized Reports" className="gap-2">
          <FileText className="h-4 w-4" />
          <span>My Personalized Reports</span>
        </ToggleGroupItem>
      </ToggleGroup>
      
      {mainTab === 'agent' && (
        <Card>
          <CardHeader>
            <CardTitle>Ask our Property Operations Agent</CardTitle>
            <CardDescription>Ask questions about your property data and get AI-powered insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
                {agentResponses.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No conversations yet. Ask a question to get started.</p>
                  </div>
                ) : (
                  agentResponses.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="font-medium">You:</p>
                        <p>{item.question}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium">AI Agent:</p>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <form onSubmit={handleAgentSubmit} className="flex space-x-2">
                <Input 
                  value={agentPrompt}
                  onChange={(e) => setAgentPrompt(e.target.value)}
                  placeholder="Ask a question about your property data..."
                  className="flex-1"
                />
                <Button type="submit">Ask</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
      
      {mainTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">{activeDashboard.name}</h2>
              <DashboardSelector 
                dashboards={savedDashboards}
                activeDashboard={activeDashboard}
                onSelect={handleDashboardSelect}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  setIsEditingDashboard(true);
                  setNewDashboardName(activeDashboard.name);
                  setSaveDashboardDialogOpen(true);
                }}
              >
                <Save className="h-4 w-4" />
                Save Dashboard
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleCreateNewDashboard}
              >
                <Plus className="h-4 w-4" />
                New Dashboard
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardCards.map((card) => (
              <Card key={card.id}>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getCategoryIcon(card.category)}
                      <CardTitle>{card.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderCardOptionsMenu(card)}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 rounded-full" 
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderCardContent(card)}
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed flex items-center justify-center h-48">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setAddCardDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add new card
              </Button>
            </Card>
          </div>
        </div>
      )}
      
      {mainTab === 'myreports' && (
        <div className="space-y-6">
          <div className="rounded-md border">
            <div className="py-3 px-4 border-b bg-muted">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                <div className="col-span-4">Report Name</div>
                <div className="col-span-2">Format</div>
                <div className="col-span-2">Frequency</div>
                <div className="col-span-2">Last Generated</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>
            
            <div className="divide-y">
              {personalizedReports.map((report) => (
                <div key={report.id} className="py-3 px-4 hover:bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4">
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.description}</div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      {getReportFormatIcon(report.format)}
                      <span>{report.format}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      {getFrequencyIcon(report.frequency)}
                      <span>{report.frequency}</span>
                    </div>
                    <div className="col-span-2">
                      {report.lastGenerated}
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleGenerateReport(report.name)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:inline-block">Generate</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          setReportName(report.name);
                          setReportDescription(report.description);
                          setReportFrequency(report.frequency.toLowerCase());
                          setReportFormat(report.format.toLowerCase());
                          setReportRecipients(report.recipients.join(', '));
                          setCreateReportDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:inline-block">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:inline-block">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {personalizedReports.length === 0 && (
                <div className="py-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No personalized reports yet.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setCreateReportDialogOpen(true)}
                  >
                    Create your first report
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <Dialog open={addCardDialogOpen} onOpenChange={setAddCardDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Report Card</DialogTitle>
            <DialogDescription>
              Create a new card to visualize your property data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-title" className="text-right">
                Title
              </Label>
              <Input
                id="card-title"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Card title"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-category" className="text-right">
                Category
              </Label>
              <Select value={newCardCategory} onValueChange={setNewCardCategory}>
                <SelectTrigger id="card-category" className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leasing">Leasing</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-kpi" className="text-right">
                KPI
              </Label>
              <Select value={newCardKpi} onValueChange={setNewCardKpi}>
                <SelectTrigger id="card-kpi" className="col-span-3">
                  <SelectValue placeholder="Select KPI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="occupancy">Occupancy Rate</SelectItem>
                  <SelectItem value="leasing-velocity">Leasing Velocity</SelectItem>
                  <SelectItem value="rent-collection">Rent Collection</SelectItem>
                  <SelectItem value="delinquency">Delinquency Rate</SelectItem>
                  <SelectItem value="resolution-time">Work Order Resolution Time</SelectItem>
                  <SelectItem value="work-order-types">Work Order Types</SelectItem>
                  <SelectItem value="renewals">Renewal Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-type" className="text-right">
                Visualization
              </Label>
              <Select value={newCardType} onValueChange={setNewCardType}>
                <SelectTrigger id="card-type" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="table">Table</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-timeframe" className="text-right">
                Timeframe
              </Label>
              <Select value={newCardTimeframe} onValueChange={setNewCardTimeframe}>
                <SelectTrigger id="card-timeframe" className="col-span-3">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-market" className="text-right">
                Market
              </Label>
              <Select value={newCardMarket} onValueChange={setNewCardMarket}>
                <SelectTrigger id="card-market" className="col-span-3">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Markets</SelectItem>
                  <SelectItem value="atlanta">Atlanta</SelectItem>
                  <SelectItem value="tampa">Tampa</SelectItem>
                  <SelectItem value="orlando">Orlando</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCardDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddNewCard}>Add Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={saveDashboardDialogOpen} onOpenChange={setSaveDashboardDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditingDashboard ? 'Save Dashboard' : 'Create New Dashboard'}</DialogTitle>
            <DialogDescription>
              {isEditingDashboard 
                ? 'Update your dashboard with a new name.' 
                : 'Give your new dashboard a name.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dashboard-name" className="text-right">
                Name
              </Label>
              <Input
                id="dashboard-name"
                value={newDashboardName}
                onChange={(e) => setNewDashboardName(e.target.value)}
                placeholder="Dashboard name"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDashboardDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveDashboard}>
              {isEditingDashboard ? 'Save Changes' : 'Create Dashboard'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={createReportDialogOpen} onOpenChange={setCreateReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Personalized Report</DialogTitle>
            <DialogDescription>
              Configure your report settings and recipients.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="report-name" className="text-right">
                Name
              </Label>
              <Input
                id="report-name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Report name"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="report-description" className="text-right">
                Description
              </Label>
              <Input
                id="report-description"
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Brief description"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="report-frequency" className="text-right">
                Frequency
              </Label>
              <Select value={reportFrequency} onValueChange={setReportFrequency}>
                <SelectTrigger id="report-frequency" className="col-span-3">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="report-format" className="text-right">
                Format
              </Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger id="report-format" className="col-span-3">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="report-recipients" className="text-right">
                Recipients
              </Label>
              <Input
                id="report-recipients"
                value={reportRecipients}
                onChange={(e) => setReportRecipients(e.target.value)}
                placeholder="Email addresses (comma separated)"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateReportDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateReport}>Create Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsPage;
