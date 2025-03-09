
import React from 'react';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import SimplePieChart from '@/components/dashboard/SimplePieChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { 
  mockDashboardMetrics, 
  mockLeadMetrics, 
  mockOperationMetrics,
  mockOccupancyData,
  mockLeadSourceData,
  mockMaintenanceData,
  mockAIConversations
} from '@/data/mockData';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div>
      <MetricsGrid metrics={mockDashboardMetrics} title="Property Overview" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MetricsGrid metrics={mockLeadMetrics} title="Leasing" />
        <MetricsGrid metrics={mockOperationMetrics} title="Operations" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SimpleLineChart 
          data={mockOccupancyData} 
          title="Occupancy Rate Trend" 
        />
        
        <SimplePieChart 
          data={mockLeadSourceData} 
          title="Lead Sources" 
        />
        
        <SimplePieChart 
          data={mockMaintenanceData} 
          title="Maintenance Categories" 
        />
      </div>
      
      <Card className="p-4">
        <RecentActivity conversations={mockAIConversations} />
      </Card>
    </div>
  );
};

export default Dashboard;
