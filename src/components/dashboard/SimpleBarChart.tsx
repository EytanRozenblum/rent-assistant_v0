import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartDetailModal from './ChartDetailModal';

interface SimpleBarChartProps {
  data: any[];
  title: string;
  xAxisKey?: string;
  yAxisLabel?: string;
  bars?: {
    dataKey: string;
    color: string;
    stackId?: string;
  }[];
  stacked?: boolean;
  fullsize?: boolean;
  selectedValues?: string[]; // Add support for selected communities
}

const SimpleBarChart = ({ 
  data, 
  title, 
  xAxisKey = 'month', 
  yAxisLabel = 'Days',
  bars,
  stacked = true, // Default to stacked for timeline data
  fullsize = false,
  selectedValues = [] // Default to empty array
}: SimpleBarChartProps) => {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Function to prepare data for the chart
  const prepareData = (rawData: any[]) => {
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      return [];
    }
    
    // Check if we have specific communities selected
    const selectedCommunities = selectedValues.filter(v => v.includes('/'));
    const selectedMarkets = selectedValues.filter(v => !v.includes('/'));
    
    return rawData.map(item => {
      // Initialize with the month
      const result: any = { month: item.month || 'Unknown' };
      
      // Case 1: If specific communities are selected (highest priority)
      if (selectedCommunities.length > 0) {
        // For a single community, use its data directly
        if (selectedCommunities.length === 1) {
          const communityKey = selectedCommunities[0];
          if (item[communityKey] && typeof item[communityKey] === 'object') {
            result['Lead to Sign'] = item[communityKey]['Lead to Sign'] || 0;
            result['Sign to Move'] = item[communityKey]['Sign to Move'] || 0;
            return result;
          }
        }
        
        // For multiple communities, calculate average
        let leadSum = 0;
        let moveSum = 0;
        let count = 0;
        
        selectedCommunities.forEach(community => {
          if (item[community] && typeof item[community] === 'object') {
            leadSum += item[community]['Lead to Sign'] || 0;
            moveSum += item[community]['Sign to Move'] || 0;
            count++;
          }
        });
        
        if (count > 0) {
          result['Lead to Sign'] = leadSum / count;
          result['Sign to Move'] = moveSum / count;
          return result;
        }
      }
      
      // Case 2: If specific markets are selected (second priority)
      if (selectedMarkets.length > 0) {
        // For a single market, use its data directly
        if (selectedMarkets.length === 1) {
          const marketKey = selectedMarkets[0];
          if (item[marketKey] && typeof item[marketKey] === 'object') {
            result['Lead to Sign'] = item[marketKey]['Lead to Sign'] || 0;
            result['Sign to Move'] = item[marketKey]['Sign to Move'] || 0;
            return result;
          }
        }
        
        // For multiple markets, calculate average
        let leadSum = 0;
        let moveSum = 0;
        let count = 0;
        
        selectedMarkets.forEach(market => {
          if (item[market] && typeof item[market] === 'object') {
            leadSum += item[market]['Lead to Sign'] || 0;
            moveSum += item[market]['Sign to Move'] || 0;
            count++;
          }
        });
        
        if (count > 0) {
          result['Lead to Sign'] = leadSum / count;
          result['Sign to Move'] = moveSum / count;
          return result;
        }
      }
      
      // Case 3: No specific selection, use Average
      if (item.Average && typeof item.Average === 'object') {
        result['Lead to Sign'] = item.Average['Lead to Sign'] || 0;
        result['Sign to Move'] = item.Average['Sign to Move'] || 0;
        return result;
      }
      
      // Case 4: No Average data, try to use standard format
      if (typeof item['Lead to Sign'] === 'number' && typeof item['Sign to Move'] === 'number') {
        return item;
      }
      
      // Case 5: Fallback to first available market
      const markets = ['Atlanta', 'Tampa', 'Jacksonville', 'Orlando'];
      for (const market of markets) {
        if (item[market] && typeof item[market] === 'object') {
          result['Lead to Sign'] = item[market]['Lead to Sign'] || 0;
          result['Sign to Move'] = item[market]['Sign to Move'] || 0;
          return result;
        }
      }
      
      // Empty data as last resort
      result['Lead to Sign'] = 0;
      result['Sign to Move'] = 0;
      return result;
    });
  };
  
  // Process the data
  const chartData = prepareData(data);
  
  // If we have no data, show a message
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-gray-500">
        No data available
      </div>
    );
  }
  
  // Custom tooltip component for better display
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-lg rounded">
          <p className="text-xs font-semibold mb-1">{label}</p>
          
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name}: {Number(entry.value).toFixed(1)} days
              </span>
            </div>
          ))}
          
          {stacked && payload.length > 1 && (
            <div className="mt-1 pt-1 border-t border-gray-200 text-xs font-semibold">
              Total: {payload.reduce((sum: number, entry: any) => sum + (Number(entry.value) || 0), 0).toFixed(1)} days
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };
  
  // Calculate Y-axis domain
  const allValues = chartData.flatMap(item => {
    const values = [];
    if (typeof item['Lead to Sign'] === 'number') values.push(item['Lead to Sign']);
    if (typeof item['Sign to Move'] === 'number') values.push(item['Sign to Move']);
    if (stacked) {
      values.push((item['Lead to Sign'] || 0) + (item['Sign to Move'] || 0));
    }
    return values;
  });
  
  const yMin = Math.max(0, Math.min(...allValues, 0)); // Don't go below 0
  const yMax = Math.max(...allValues, 10);
  const yDomain = [yMin, Math.ceil(yMax * 1.1)]; // Add 10% padding
  
  // Handle chart click to open detail modal
  const handleChartClick = () => {
    if (!fullsize) {
      setDetailModalOpen(true);
    }
  };

  // Get subtitle based on selected values
  const getSubtitle = () => {
    if (selectedValues.length === 0) return "All markets (Average)";
    
    if (selectedValues.length === 1) {
      return selectedValues[0].includes('/') ? 
        selectedValues[0].split('/')[1] : // Community name only
        `${selectedValues[0]} market`;    // Market name
    } 
    
    // Multiple selections
    const markets = selectedValues.filter(v => !v.includes('/')).length;
    const communities = selectedValues.filter(v => v.includes('/')).length;
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100%)]">
        {/* Reduce title margin to gain space */}
        <div className="mb-1">
          <h3 className="text-sm font-medium">{title}</h3>
          {selectedValues.length > 0 && (
            <p className="text-xs text-muted-foreground">{getSubtitle()}</p>
          )}
        </div>
        
        {/* Allow flex-1 to take more space */}
        <div className="flex-1">
          <div className="h-full cursor-pointer" onClick={handleChartClick}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey={xAxisKey} 
                  tick={{ fontSize: 12 }}
                  height={30}
                  angle={-45}
                  textAnchor="end"
                  interval={1}
                />
                <YAxis 
                  domain={yDomain}
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: yAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fontSize: 12 }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                <Bar 
                  dataKey="Lead to Sign" 
                  fill="#3391b1" 
                  name="Lead to Sign"
                  stackId={stacked ? "a" : undefined}
                  radius={stacked ? [2, 2, 0, 0] : 2}
                  onMouseOver={() => setHoveredBar("Lead to Sign")}
                />
                <Bar 
                  dataKey="Sign to Move" 
                  fill="#7bccee" 
                  name="Sign to Move"
                  stackId={stacked ? "a" : undefined}
                  radius={stacked ? [0, 0, 2, 2] : 2}
                  onMouseOver={() => setHoveredBar("Sign to Move")}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ChartDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        data={chartData}
        title={title}
        yAxisLabel={yAxisLabel}
        chartType="bar"
        stacked={stacked}
        bars={[
          { dataKey: "Lead to Sign", color: "#3391b1", stackId: stacked ? "a" : undefined },
          { dataKey: "Sign to Move", color: "#7bccee", stackId: stacked ? "a" : undefined }
        ]}
      />
    </>
  );
};

export default SimpleBarChart;