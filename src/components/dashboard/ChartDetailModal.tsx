import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import SimpleLineChart from './SimpleLineChart';
import SimpleBarChart from './SimpleBarChart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChartDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any[];
  title: string;
  yAxisLabel?: string;
  chartType: 'line' | 'bar';
  stacked?: boolean;
  bars?: {
    dataKey: string;
    color: string;
    stackId?: string;
  }[];
}

const ChartDetailModal: React.FC<ChartDetailModalProps> = ({
  open,
  onOpenChange,
  data,
  title,
  yAxisLabel,
  chartType,
  stacked,
  bars
}) => {
  const [activeView, setActiveView] = useState<'chart' | 'table'>('chart');
  
  // Format the community names
  const formatCommunityName = (key: string): string => {
    if (key === 'month') return 'Month';
    if (key === 'Total') return 'Total';
    
    if (key.includes('/')) {
      const [market, community] = key.split('/');
      
      if (community === 'Scattered') {
        return `Scattered (${market})`;
      }
      
      return community;
    }
    
    return key;
  };

  // Group and organize data for the table view
  const organizeTableData = () => {
    if (!data.length) return [];
    
    const months = data.map(item => item.month);
    const result: any[] = [];
    
    // Get all keys except 'month'
    const allKeys = Object.keys(data[0]).filter(key => key !== 'month');
    
    // Separate different types of keys
    const markets = allKeys.filter(key => !key.includes('/') && key !== 'Total' && key !== 'Average');
    const communities = allKeys.filter(key => key.includes('/'));
    
    // Group communities by market
    const communityByMarket: {[key: string]: string[]} = {};
    markets.forEach(market => {
      communityByMarket[market] = communities.filter(comm => comm.startsWith(`${market}/`));
    });
    
    // First section: Filtered communities
    communities.forEach(community => {
      const communityRow: any = {
        isMarket: false,
        isTotal: false,
        isSeparator: false,
        location: formatCommunityName(community),
        originalKey: community
      };
      
      // Add data for each month
      months.forEach((month, i) => {
        communityRow[month] = data[i][community];
      });
      
      result.push(communityRow);
    });
    
    // Add filtered total
    if (communities.length > 0) {
      const filteredTotalRow: any = {
        isMarket: false,
        isTotal: true,
        isSeparator: false,
        location: 'Filtered Total',
        originalKey: 'filtered_total'
      };
      
      // Calculate totals for each month
      months.forEach((month, i) => {
        const communityValues = communities.map(comm => data[i][comm] || 0);
        const isPercentage = yAxisLabel?.includes('%');
        
        if (isPercentage) {
          filteredTotalRow[month] = communityValues.length ? 
            communityValues.reduce((sum, val) => {
              // Handle nested objects for stacked data
              if (typeof val === 'object' && val !== null) {
                // If it has a value property, use that
                if (val.value !== undefined) {
                  return sum + (val.value || 0);
                }
                
                // For leasing timeline data
                if (val['Lead to Sign'] !== undefined && val['Sign to Move'] !== undefined) {
                  return sum + (val['Lead to Sign'] || 0) + (val['Sign to Move'] || 0);
                }
                
                // Otherwise sum all numeric properties
                return sum + Object.values(val)
                  .filter(v => typeof v === 'number')
                  .reduce((s, v) => s + v, 0);
              }
              
              return sum + (val || 0);
            }, 0) / communityValues.length : 0;
        } else {
          filteredTotalRow[month] = communityValues.reduce((sum, val) => {
            // Handle nested objects for stacked data
            if (typeof val === 'object' && val !== null) {
              // If it has a value property, use that
              if (val.value !== undefined) {
                return sum + (val.value || 0);
              }
              
              // For leasing timeline data
              if (val['Lead to Sign'] !== undefined && val['Sign to Move'] !== undefined) {
                return sum + (val['Lead to Sign'] || 0) + (val['Sign to Move'] || 0);
              }
              
              // Otherwise sum all numeric properties
              return sum + Object.values(val)
                .filter(v => typeof v === 'number')
                .reduce((s, v) => s + v, 0);
            }
            
            return sum + (val || 0);
          }, 0);
        }
      });
      
      result.push(filteredTotalRow);
      
      // Add separator only if communities are present
      result.push({
        isSeparator: true,
        originalKey: 'separator'
      });
    }
    
    // Add "Total [MarketName]" for each market
    markets.forEach(market => {
      const marketTotalRow: any = {
        isMarket: false,
        isTotal: true,
        isGrandTotal: false,
        isSeparator: false,
        location: `${market}`,
        originalKey: `total_${market}`
      };
      
      // Get the market data directly (not calculating from communities)
      months.forEach((month, i) => {
        marketTotalRow[month] = data[i][market];
      });
      
      result.push(marketTotalRow);
    });
    
    // Add the non-filtered Total (using the Total key if available, or calculating)
    if (allKeys.includes('Total')) {
      // If Total is available in the data
      const totalRow: any = {
        isMarket: false,
        isTotal: true,
        isGrandTotal: true,
        isSeparator: false,
        location: 'Total',
        originalKey: 'grand_total'
      };
      
      // Use the existing Total data
      months.forEach((month, i) => {
        totalRow[month] = data[i]['Total'];
      });
      
      result.push(totalRow);
    } else {
      // Calculate Total across all markets
      const totalRow: any = {
        isMarket: false,
        isTotal: true,
        isGrandTotal: true,
        isSeparator: false,
        location: 'Total',
        originalKey: 'grand_total'
      };
      
      // Calculate totals for each month across all markets
      months.forEach((month, i) => {
        const allMarketValues = markets.map(market => data[i][market] || 0);
        const isPercentage = yAxisLabel?.includes('%');
        
        if (isPercentage) {
          totalRow[month] = allMarketValues.length ? 
            allMarketValues.reduce((sum, val) => {
              // Handle nested objects for stacked data
              if (typeof val === 'object' && val !== null) {
                // If it has a value property, use that
                if (val.value !== undefined) {
                  return sum + (val.value || 0);
                }
                
                // For leasing timeline data
                if (val['Lead to Sign'] !== undefined && val['Sign to Move'] !== undefined) {
                  return sum + (val['Lead to Sign'] || 0) + (val['Sign to Move'] || 0);
                }
                
                // Otherwise sum all numeric properties
                return sum + Object.values(val)
                  .filter(v => typeof v === 'number')
                  .reduce((s, v) => s + v, 0);
              }
              
              return sum + (val || 0);
            }, 0) / allMarketValues.length : 0;
        } else {
          totalRow[month] = allMarketValues.reduce((sum, val) => {
            // Handle nested objects for stacked data
            if (typeof val === 'object' && val !== null) {
              // If it has a value property, use that
              if (val.value !== undefined) {
                return sum + (val.value || 0);
              }
              
              // For leasing timeline data
              if (val['Lead to Sign'] !== undefined && val['Sign to Move'] !== undefined) {
                return sum + (val['Lead to Sign'] || 0) + (val['Sign to Move'] || 0);
              }
              
              // Otherwise sum all numeric properties
              return sum + Object.values(val)
                .filter(v => typeof v === 'number')
                .reduce((s, v) => s + v, 0);
            }
            
            return sum + (val || 0);
          }, 0);
        }
      });
      
      result.push(totalRow);
    }
    
    return result;
  };

  // Function to handle exports
  const handleExport = (type: 'excel' | 'pdf') => {
    console.log(`Exporting to ${type}...`);
    // In a real app, you would implement actual export functionality here
    const message = type === 'excel' ? 'Excel export initiated' : 'PDF export initiated';
    alert(message);
  };

  const tableData = organizeTableData();

  // Helper function to format cell values
  const formatCellValue = (value: any): string => {
    if (value === undefined || value === null) return '-';
    
    // Handle object values (for stacked bar data)
    if (typeof value === 'object') {
      // If it has a single value property, use that
      if (value.value !== undefined) {
        return typeof value.value === 'number' 
          ? value.value.toFixed(1)
          : String(value.value);
      }
      
      // For leasing timeline data that might have Lead to Sign and Sign to Move
      if (value['Lead to Sign'] !== undefined && value['Sign to Move'] !== undefined) {
        const leadToSign = typeof value['Lead to Sign'] === 'number' 
          ? value['Lead to Sign'].toFixed(1) 
          : value['Lead to Sign'];
          
        const signToMove = typeof value['Sign to Move'] === 'number' 
          ? value['Sign to Move'].toFixed(1) 
          : value['Sign to Move'];
          
        return `${leadToSign} + ${signToMove}`;
      }
      
      // For other objects, try to extract values intelligently
      const entries = Object.entries(value);
      if (entries.length > 0) {
        return entries
          .map(([key, val]) => {
            const formattedVal = typeof val === 'number' ? val.toFixed(1) : val;
            return `${key}: ${formattedVal}`;
          })
          .join(', ');
      }
      
      return JSON.stringify(value);
    }
    
    // Handle number values
    return typeof value === 'number' 
      ? value.toFixed(1) 
      : String(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[90vw] h-[80vh] p-6 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <Tabs 
              value={activeView} 
              onValueChange={(value) => setActiveView(value as 'chart' | 'table')}
              className="w-60"
            >
              <TabsList className="w-full">
                <TabsTrigger value="chart" className="flex-1">Chart</TabsTrigger>
                <TabsTrigger value="table" className="flex-1">Table</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleExport('excel')}
              >
                <Upload className="h-4 w-4" />
                <span>Export to Excel</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleExport('pdf')}
              >
                <Upload className="h-4 w-4" />
                <span>Export to PDF</span>
              </Button>
            </div>
          </div>
          
          <Card className="flex-1 overflow-hidden">
            <div className="p-4 h-full flex flex-col">
              <h3 className="text-lg mb-4 text-center font-normal text-muted-foreground">
                {title} 
                {(() => {
                  const filteredCommunities = tableData
                    .filter(row => !row.isSeparator && !row.isGrandTotal && !row.originalKey.startsWith('total_') && !row.originalKey.startsWith('filtered_'))
                    .map(row => row.originalKey);
                  
                  // If no communities are specifically filtered
                  if (filteredCommunities.length === 0) {
                    return (
                      <span>
                        {' '}for all markets ({data[0]?.month} - {data[data.length - 1]?.month})
                      </span>
                    );
                  }

                  // Group communities by market
                  const communityByMarket: {[key: string]: string[]} = {};
                  Object.keys(data[0] || {})
                    .filter(key => key.includes('/'))
                    .forEach(community => {
                      const market = community.split('/')[0];
                      if (!communityByMarket[market]) communityByMarket[market] = [];
                      communityByMarket[market].push(community);
                    });
                  
                  // Check if all communities from certain markets are selected
                  const marketsWithAllCommunities: string[] = [];
                  Object.entries(communityByMarket).forEach(([market, communities]) => {
                    const allSelected = communities.every(comm => filteredCommunities.includes(comm));
                    if (allSelected && communities.length > 1) {
                      marketsWithAllCommunities.push(market);
                    }
                  });
                  
                  // Get communities not covered by "all market communities"
                  const remainingCommunities = filteredCommunities
                    .filter(comm => {
                      const market = comm.split('/')[0];
                      return !marketsWithAllCommunities.includes(market);
                    })
                    .map(comm => formatCommunityName(comm));
                  
                  return (
                    <span>
                      {' '}for {marketsWithAllCommunities.length > 0 ? (
                        <>
                          {marketsWithAllCommunities.map(market => `${market} communities`).join(', ')}
                          {remainingCommunities.length > 0 && `, ${remainingCommunities.join(', ')}`}
                        </>
                      ) : (
                        filteredCommunities.map(comm => formatCommunityName(comm)).join(', ')
                      )}
                      {' '}({data[0]?.month} - {data[data.length - 1]?.month})
                    </span>
                  );
                })()}
              </h3>
              
              <div className="flex-1 overflow-auto">
                {activeView === 'chart' ? (
                  // Chart view with title being passed
                  chartType === 'line' ? (
                    <SimpleLineChart 
                      data={data}
                      title={title}
                      yAxisLabel={yAxisLabel}
                      fullsize
                    />
                  ) : (
                    <SimpleBarChart 
                      data={data}
                      title={title}
                      yAxisLabel={yAxisLabel}
                      stacked={stacked}
                      bars={bars}
                      fullsize
                    />
                  )
                ) : (
                  // Table view
                  <div className="h-full flex items-center justify-center">
                    <div className="table-container w-[95%] overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground sticky top-0 bg-muted">Location</th>
                            {data.map(item => (
                              <th key={item.month} className="px-4 py-3 text-left text-sm font-medium text-muted-foreground sticky top-0 bg-muted">
                                {item.month}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {tableData.map((row, index) => 
                            row.isSeparator ? (
                              <tr key="separator" className="border-t-4 border-double border-muted-foreground/20">
                                <td colSpan={data.length + 1} className="h-1 p-0"></td>
                              </tr>
                            ) : (
                              <tr 
                                key={row.originalKey}
                                className={
                                  row.isGrandTotal ? "bg-muted/80" :
                                  row.isTotal && row.originalKey === 'filtered_total' ? "bg-muted/60" :
                                  row.isTotal && row.originalKey.startsWith('total_') ? "bg-white" :
                                  row.isMarket ? "bg-muted/30" : 
                                  "hover:bg-muted/10"
                                }
                              >
                                <td className={`px-4 py-3 ${row.isGrandTotal || row.isMarket ? "font-medium" : ""}`}>
                                  {row.location}
                                </td>
                                {data.map(item => (
                                  <td 
                                    key={`${row.originalKey}-${item.month}`} 
                                    className={`px-4 py-3 ${row.isTotal || row.isGrandTotal ? "font-medium" : ""}`}
                                  >
                                    {formatCellValue(row[item.month])}
                                  </td>
                                ))}
                              </tr>
                            )
                          )}
                          {tableData.length === 0 && (
                            <tr>
                              <td colSpan={data.length + 1} className="px-4 py-8 text-center text-muted-foreground">
                                No data available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChartDetailModal; 