import React, { useState, useEffect, useMemo } from 'react';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import MetricCard from '@/components/dashboard/MetricCard';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import { 
  mockDashboardMetrics, 
  mockRenewalsTrendData,
  mockOccupancyTrendData,
  mockDelinquencyTrendData,
  mockBillHoursTrendData,
  mockWorkOrdersTrendData,
  mockLeasingTimelineTrendData,
  technicianLocations
} from '@/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, Plus, X, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import DashboardSelector from '@/components/dashboard/DashboardSelector';
import CreateDashboardDialog from '@/components/dashboard/CreateDashboardDialog';
import AddMetricCardDialog from '@/components/dashboard/AddMetricCardDialog';
import AddGraphDialog from '@/components/dashboard/AddGraphDialog';
import { toast } from 'sonner';
import { MetricData } from '@/types';
import ChangeMetricDialog from '@/components/dashboard/ChangeMetricDialog';

interface DashboardCard {
  id: number;
  title: string;
  type: string;
  kpi: string;
  timeframe: string;
  market: string;
  category: string;
}

interface Dashboard {
  id: string;
  name: string;
  isDefault?: boolean;
  cards?: DashboardCard[];
  metrics?: DashboardMetric[];
}

interface DashboardMetric {
  id: number;
  title: string;
  value: number | string;
  change: number;
  status: 'neutral' | 'up' | 'down' | 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad';
  format?: string;
}

const initialDashboards: Dashboard[] = [
  { 
    id: '1', 
    name: 'Default Dashboard', 
    isDefault: true,
    cards: [
      { id: 1, title: 'Renewals', type: 'line', kpi: 'renewals', timeframe: 'year', market: 'all', category: 'leasing' },
      { id: 2, title: 'Occupancy Rate', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all', category: 'operations' },
      // { id: 3, title: 'Billable Hours/ Day/ Tech', type: 'line', kpi: 'billable-hours', timeframe: 'quarter', market: 'all', category: 'maintenance' },
      { id: 3, title: 'Delinquency', type: 'line', kpi: 'delinquency', timeframe: 'year', market: 'all', category: 'operations' },
      { id: 4, title: 'Leasing Timeline', type: 'bar', kpi: 'leasing-velocity', timeframe: 'quarter', market: 'all', category: 'leasing' },
      // { id: 6, title: 'Work Orders/ Day/ Tech', type: 'line', kpi: 'work-orders', timeframe: 'month', market: 'all', category: 'maintenance' }
    ]
  },
  { 
    id: '2', 
    name: 'Leasing Dashboard', 
    isDefault: false,
    cards: [
      { id: 1, title: 'Leasing Velocity', type: 'bar', kpi: 'leasing-velocity', timeframe: 'quarter', market: 'all', category: 'leasing' },
      { id: 2, title: 'Occupancy by Market', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all', category: 'leasing' },
      { id: 3, title: 'Renewal Trends', type: 'line', kpi: 'renewals', timeframe: 'year', market: 'all', category: 'leasing' }
    ]
  },
  // { 
  //   id: '3', 
  //   name: 'Maintenance KPIs', 
  //   isDefault: false,
  //   cards: [
  //     { id: 1, title: 'Work Order Resolution', type: 'line', kpi: 'resolution-time', timeframe: 'month', market: 'all', category: 'maintenance' },
  //     { id: 2, title: 'Billable Hours', type: 'line', kpi: 'billable-hours', timeframe: 'month', market: 'all', category: 'maintenance' },
  //     { id: 3, title: 'Work Orders per Tech', type: 'bar', kpi: 'work-orders', timeframe: 'month', market: 'all', category: 'maintenance' }
  //   ]
  // },
  { 
    id: '4', 
    name: 'Occupancy Tracker', 
    isDefault: false,
    cards: [
      { id: 1, title: 'Occupancy Trends', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all', category: 'leasing' },
      { id: 2, title: 'Delinquency Rate', type: 'line', kpi: 'delinquency', timeframe: 'quarter', market: 'all', category: 'operations' }
    ] 
  }
];

const Dashboard = () => {
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [dashboards, setDashboards] = useState<Dashboard[]>(initialDashboards);
  const [activeDashboard, setActiveDashboard] = useState<Dashboard>(dashboards[0]);
  const [createDashboardOpen, setCreateDashboardOpen] = useState(false);
  const [addMetricCardOpen, setAddMetricCardOpen] = useState(false);
  const [addGraphOpen, setAddGraphOpen] = useState(false);
  const [customMetrics, setCustomMetrics] = useState<DashboardMetric[]>([]);
  const [hiddenMetrics, setHiddenMetrics] = useState<string[]>([]);
  const [changeMetricOpen, setChangeMetricOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'change'>('change');
  const [metricToChange, setMetricToChange] = useState<{id: string | number, index: number} | null>(null);

  useEffect(() => {
    const handleCreateDashboardEvent = (event: CustomEvent) => {
      if (event.detail?.action === 'open') {
        setCreateDashboardOpen(true);
      }
    };

    document.addEventListener('create-dashboard', handleCreateDashboardEvent as EventListener);
    
    return () => {
      document.removeEventListener('create-dashboard', handleCreateDashboardEvent as EventListener);
    };
  }, []);

  useEffect(() => {
    // Check if there's a saved default dashboard ID
    const savedDefaultId = localStorage.getItem('defaultDashboardId');
    
    if (savedDefaultId) {
      // Find the dashboard with this ID
      const defaultDashboard = dashboards.find(d => d.id === savedDefaultId);
      if (defaultDashboard) {
        setActiveDashboard(defaultDashboard);
      }
    } else {
      // Otherwise use the one marked as default in the initial data
      const defaultDashboard = dashboards.find(d => d.isDefault);
      if (defaultDashboard) {
        setActiveDashboard(defaultDashboard);
      }
    }
  }, [dashboards]);

  const getMarketFromCommunity = (community: string): string => {
    return community.split('/')[0];
  };

  const getSelectedMarkets = (): string[] => {
    if (selectedMarketCommunities.length === 0) return ['all'];
    
    const markets = selectedMarketCommunities.map(getMarketFromCommunity);
    return [...new Set(markets)];
  };

  const determineTrendStatus = (kpi: string, change: number): string => {
    const increaseGoodKPIs = ['occupancy', 'renewals', 'rent-increase', 'number_of_homes', 'average_rent'];
    const decreaseGoodKPIs = ['delinquency'];

    if (increaseGoodKPIs.includes(kpi)) {
      return change > 0 ? 'increase_good' : change < 0 ? 'decrease_bad' : 'neutral';
    } else if (decreaseGoodKPIs.includes(kpi)) {
      return change > 0 ? 'increase_bad' : change < 0 ? 'decrease_good' : 'neutral';
    }
    return 'neutral';
  };

  const filterMetricsBySelection = (metrics: MetricData[]) => {
    console.log('Selected Market Communities:', selectedMarketCommunities);

    if (selectedMarketCommunities.length === 0) {
      return metrics;
    }

    return metrics.map(metric => {
      if (selectedMarketCommunities.length === 1) {
        const community = selectedMarketCommunities[0];
        console.log('Filtering for community:', community);
        return {
          ...metric,
          value: metric.communities?.[community]?.value ?? metric.value,
          change: metric.communities?.[community]?.change ?? metric.change,
          status: metric.communities?.[community]?.status ?? metric.status,
        };
      }

      if (metric.kpi === 'number_of_homes') {
        // Sum for number_of_homes
        const totalHomes = selectedMarketCommunities.reduce((acc, community) => {
          const communityValue = metric.communities?.[community]?.value ?? 0;
          console.log(`Community: ${community}, Value: ${communityValue}`);
          return acc + communityValue;
        }, 0);

        const totalChange = selectedMarketCommunities.reduce((acc, community) => {
          return acc + (metric.communities?.[community]?.change ?? 0);
        }, 0);

        const averageChange = totalChange / selectedMarketCommunities.length;
        const status = determineTrendStatus(metric.kpi, averageChange);

        return {
          ...metric,
          value: totalHomes,
          change: averageChange,
          status,
        };
      } else {
        // Average for other KPIs
        const totalValue = selectedMarketCommunities.reduce((acc, community) => {
          const communityValue = metric.communities?.[community]?.value ?? 0;
          console.log(`Community: ${community}, Value: ${communityValue}`);
          return acc + communityValue;
        }, 0);

        let averageValue;
        if (metric.kpi === 'average_rent') {
          averageValue = (totalValue / selectedMarketCommunities.length).toFixed(0);
        } else {
          averageValue = (totalValue / selectedMarketCommunities.length).toFixed(1);
        }

        const totalChange = selectedMarketCommunities.reduce((acc, community) => {
          return acc + (metric.communities?.[community]?.change ?? 0);
        }, 0);

        const averageChange = totalChange / selectedMarketCommunities.length;
        const status = determineTrendStatus(metric.kpi, averageChange);

        return {
          ...metric,
          value: parseFloat(averageValue), // Convert back to number
          change: averageChange,
          status,
        };
      }
    });
  };

  const filterChartData = (data: any[], isStacked = false, isTechnician = false) => {
    // If no communities selected, show only totals and markets
    if (selectedMarketCommunities.length === 0) {
      return data.map(item => {
        const result = { month: item.month };
        
        // Include Total/Average
        if (item.Total || item.Average) {
          result.Total = item.Total || item.Average;
        }
        
        // Include only market-level data
        ['Atlanta', 'Tampa', 'Jacksonville', 'Orlando'].forEach(market => {
          if (item[market]) {
            result[market] = item[market];
          }
        });
        
        // Handle special case for stacked charts
        if (isStacked) {
          if (item['Lead to Sign']) result['Lead to Sign'] = item['Lead to Sign'];
          if (item['Sign to Move']) result['Sign to Move'] = item['Sign to Move'];
        }
        
        // Handle special case for technician data
        if (isTechnician) {
          if (item['Average per tech']) result['Average per tech'] = item['Average per tech'];
        }
        
        return result;
      });
    }
    
    // When communities are selected, show selected communities, their market, and total
    return data.map(item => {
      const result = { month: item.month };
      
      // Include Total/Average
      if (item.Total || item.Average) {
        result.Total = item.Total || item.Average;
      }
      
      // Get unique markets from selected communities
      const selectedMarkets = [...new Set(selectedMarketCommunities.map(c => c.split('/')[0]))];
      
      // Include the market totals for selected markets
      selectedMarkets.forEach(market => {
        if (item[market]) {
          result[market] = item[market];
        }
      });
      
      // Include selected communities (KEEP full market/community format for color matching)
      selectedMarketCommunities.forEach(community => {
        if (item[community]) {
          // Keep the full market/community format for proper color matching
          result[community] = item[community];
        }
      });
      
      // Handle special case for stacked charts
      if (isStacked) {
        if (item['Lead to Sign']) result['Lead to Sign'] = item['Lead to Sign'];
        if (item['Sign to Move']) result['Sign to Move'] = item['Sign to Move'];
      }
      
      // Handle special case for technician data
      if (isTechnician) {
        if (item['Average per tech']) result['Average per tech'] = item['Average per tech'];
      }
      
      return result;
    });
  };

  const handleDashboardSelect = (dashboard: Dashboard) => {
    setActiveDashboard(dashboard);
  };

  const handleCreateDashboard = (newDashboard: { name: string; cards: DashboardCard[] }) => {
    const dashboardToAdd: Dashboard = {
      id: Date.now().toString(),
      name: newDashboard.name,
      isDefault: false,
      cards: newDashboard.cards
    };
    
    setDashboards([...dashboards, dashboardToAdd]);
    setActiveDashboard(dashboardToAdd);
    setCreateDashboardOpen(false);
    
    toast.success(`Dashboard "${newDashboard.name}" created successfully`);
  };

  const handleAddMetricCard = (metric: DashboardMetric) => {
    setCustomMetrics([...customMetrics, metric]);
    setAddMetricCardOpen(false);
    toast.success("New metric card added successfully");
  };

  const handleAddGraph = (graph: DashboardCard) => {
    const updatedDashboard = { 
      ...activeDashboard,
      cards: [...(activeDashboard.cards || []), graph]
    };
    
    const updatedDashboards = dashboards.map(d => 
      d.id === activeDashboard.id ? updatedDashboard : d
    );
    
    setDashboards(updatedDashboards);
    setActiveDashboard(updatedDashboard);
    setAddGraphOpen(false);
    
    toast.success("New graph added successfully");
  };

  const handleDeleteMetric = (metricId: number | string) => {
    if (typeof metricId === 'number') {
      setCustomMetrics(customMetrics.filter(m => m.id !== metricId));
    } else if (typeof metricId === 'string') {
      setHiddenMetrics([...hiddenMetrics, metricId]);
    }
    toast.success('Metric removed from dashboard');
  };

  const handleDeleteCard = (cardId: number) => {
    const updatedDashboard = { 
      ...activeDashboard,
      cards: activeDashboard.cards?.filter(card => card.id !== cardId) || []
    };
    
    const updatedDashboards = dashboards.map(d => 
      d.id === activeDashboard.id ? updatedDashboard : d
    );
    
    setDashboards(updatedDashboards);
    setActiveDashboard(updatedDashboard);
    
    toast.success("Card removed successfully");
  };

  const renderCardOptions = (cardId: number) => {
    return (
      <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Edit card
              </DropdownMenuItem>
              <DropdownMenuItem>
                Change visualization
              </DropdownMenuItem>
              <DropdownMenuItem>
                Move position
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 rounded-full" 
          onClick={() => handleDeleteCard(cardId)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const filteredMetrics = useMemo(() => {
    // Get default metrics that aren't hidden
    const defaultMetrics = mockDashboardMetrics
      .filter(m => !hiddenMetrics.includes(m.label))
      .map(m => ({ ...m, id: m.label })); // Use label as ID for default metrics
    
    // Combine with custom metrics and sort based on position info
    const combinedMetrics = [...defaultMetrics, ...customMetrics];
    
    // Maintain the original ordering by using the index positions
    const sortedMetrics = [...combinedMetrics].sort((a, b) => {
      // Custom metrics with originalPosition go where they belong
      if ('originalPosition' in a && 'originalPosition' in b) {
        return (a.originalPosition as number) - (b.originalPosition as number);
      }
      if ('originalPosition' in a) {
        return (a.originalPosition as number) - defaultMetrics.findIndex(m => m.id === b.id);
      }
      if ('originalPosition' in b) {
        return defaultMetrics.findIndex(m => m.id === a.id) - (b.originalPosition as number);
      }
      // Default ordering for metrics without position info
      return 0;
    });
    
    return filterMetricsBySelection(sortedMetrics);
  }, [mockDashboardMetrics, customMetrics, hiddenMetrics, selectedMarketCommunities]);

  const handleChangeMetric = (newMetricKey: string) => {
    const selectedMetric = mockDashboardMetrics.find(mock => mock.kpi === newMetricKey);
    if (!selectedMetric) return;
    
    if (dialogMode === 'add') {
      // Add new metric card
      const newMetric = {
        ...selectedMetric,
        id: Date.now(), // Generate a unique ID for the new card
      };
      
      setCustomMetrics([...customMetrics, newMetric]);
      toast.success("New metric card added successfully");
    } else if (metricToChange) {
      // Change existing metric (existing logic)
      if (typeof metricToChange.id === 'number') {
        // For custom metrics, update in place
        setCustomMetrics(customMetrics.map(m => 
          m.id === metricToChange.id 
            ? {...selectedMetric, id: m.id}
            : m
        ));
      } else {
        // For default metrics, maintain position by replacing in the hiddenMetrics list
        const newHiddenMetrics = hiddenMetrics.filter(id => id !== metricToChange.id);
        newHiddenMetrics.push(metricToChange.id as string);
        
        const newCustomMetric = {
          ...selectedMetric,
          id: `custom_${Date.now()}`,
          originalPosition: metricToChange.index
        };
        
        setHiddenMetrics(newHiddenMetrics);
        setCustomMetrics([...customMetrics, newCustomMetric]);
      }
      
      toast.success("Metric changed successfully");
    }
    
    setChangeMetricOpen(false);
  };

  const setDashboardAsDefault = () => {
    // Update the dashboards array to mark current dashboard as default
    const updatedDashboards = dashboards.map(dash => ({
      ...dash,
      isDefault: dash.id === activeDashboard.id
    }));
    
    setDashboards(updatedDashboards);
    
    // Save to local storage for persistence
    localStorage.setItem('defaultDashboardId', activeDashboard.id);
    
    toast.success("This dashboard has been set as your default view");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">
            {activeDashboard.name}
          </h2>
          <DashboardSelector 
            dashboards={dashboards}
            activeDashboard={activeDashboard}
            onSelect={handleDashboardSelect}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={setDashboardAsDefault}
            className="text-xs"
          >
            Set as Default
          </Button>
          <MarketCommunityFilter 
            selectedValues={selectedMarketCommunities} 
            onChange={setSelectedMarketCommunities} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {filteredMetrics.map((metric, index) => (
          <div key={index} className="relative">
            <div className="absolute top-1.5 right-2 flex items-center gap-1 z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => {
                      setDialogMode('change');
                      setMetricToChange({id: metric.id, index: index});
                      setChangeMetricOpen(true);
                    }}>
                      Change metric
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 rounded-full" 
                onClick={() => handleDeleteMetric(metric.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <MetricCard 
              key={index} 
              metric={metric as MetricData} 
              selectedValues={selectedMarketCommunities}
              id={metric.id}
            />
          </div>
        ))}
        <Card 
          className="add-card-button h-full flex items-center justify-center p-4 cursor-pointer" 
          onClick={() => {
            setDialogMode('add');
            setMetricToChange(null);
            setChangeMetricOpen(true);
          }}
        >
          <div className="w-full min-h-[105px] bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center">
            <Plus className="h-5 w-5 mb-2" />
            <span className="text-sm text-gray-500">Add new card</span>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeDashboard.cards?.map((card) => (
          <Card key={card.id} className="p-4 relative h-[310px]">
            {renderCardOptions(card.id)}
            {card.type === 'line' ? (
              <SimpleLineChart 
                data={filterChartData(
                  card.kpi === 'occupancy' ? mockOccupancyTrendData :
                  card.kpi === 'renewals' ? mockRenewalsTrendData :
                  card.kpi === 'delinquency' ? mockDelinquencyTrendData :
                  mockRenewalsTrendData
                )} 
                title={card.title}
                yAxisLabel={card.kpi.includes('time') ? 'Days' : '%'}
              />
            ) : (
              <SimpleBarChart 
                data={mockLeasingTimelineTrendData} 
                title="Leasing Timeline Trend"
                yAxisLabel="Days"
                stacked={true}
                selectedValues={selectedMarketCommunities}
              />
            )}
          </Card>
        ))}

        {(!activeDashboard.cards || activeDashboard.cards.length === 0) && (
          <>
            <Card className="p-4 relative h-[310px]">
              {renderCardOptions(-1)}
              <SimpleLineChart 
                data={filterChartData(mockRenewalsTrendData)} 
                title="Renewals (%) trend by market"
                yAxisLabel="%"
              />
            </Card>
            <Card className="p-4 relative h-[310px]">
              {renderCardOptions(-2)}
              <SimpleBarChart 
                data={mockLeasingTimelineTrendData} 
                title="Leasing Timeline Trend"
                yAxisLabel="Days"
                stacked={true}
              />
            </Card>
            <Card className="p-4 relative h-[310px]">
              {renderCardOptions(-3)}
              <SimpleLineChart 
                data={filterChartData(mockOccupancyTrendData)} 
                title="Occupancy Rate (%) trend by market"
                yAxisLabel="%"
              />
            </Card>
            <Card className="p-4 relative h-[310px]">
              {renderCardOptions(-4)}
              <SimpleLineChart 
                data={filterChartData(mockDelinquencyTrendData)} 
                title="Delinquency Rate (%) trend by market"
                yAxisLabel="%"
              />
            </Card>
            <Card className="p-4 relative h-[310px]">
              {renderCardOptions(-5)}
              <SimpleLineChart 
                data={filterChartData(
                  mockBillHoursTrendData, 
                  false, 
                  true
                )} 
                title="Billable Hours/ Day/ Technician"
                yAxisLabel="Hours"
              />
            </Card>
            <Card className="p-4 relative h-[310px]">
              {renderCardOptions(-6)}
              <SimpleLineChart 
                data={filterChartData(mockWorkOrdersTrendData, false, true)} 
                title="Work Orders/ Day/ Technician"
                yAxisLabel="Orders"
              />
            </Card>
          </>
        )}

        <Card 
          className="add-card-button h-[310px] flex items-center justify-center p-4 cursor-pointer" 
          onClick={() => setAddGraphOpen(true)}
        >
          <div className="w-[65%] h-[55%] bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center">
            <Plus className="h-6 w-6 mb-2" />
            <span className="text-sm text-gray-500">Add new card</span>
          </div>
        </Card>
      </div>

      <CreateDashboardDialog 
        open={createDashboardOpen}
        onOpenChange={setCreateDashboardOpen}
        onSave={handleCreateDashboard}
      />

      <AddMetricCardDialog
        open={addMetricCardOpen}
        onOpenChange={setAddMetricCardOpen}
        onSave={handleAddMetricCard}
      />

      <AddGraphDialog
        open={addGraphOpen}
        onOpenChange={setAddGraphOpen}
        onSave={handleAddGraph}
      />

      <ChangeMetricDialog
        open={changeMetricOpen}
        onOpenChange={setChangeMetricOpen}
        onSelect={handleChangeMetric}
        currentMetricId={metricToChange?.id}
        availableMetrics={mockDashboardMetrics}
        mode={dialogMode}
      />
    </div>
  );
};

export default Dashboard;
