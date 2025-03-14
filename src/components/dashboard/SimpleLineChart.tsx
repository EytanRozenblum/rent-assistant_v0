import React, { useState, useRef, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import ChartDetailModal from './ChartDetailModal';

interface SimpleLineChartProps {
  data: any[];
  title?: string;
  yAxisLabel?: string;
  fullsize?: boolean;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, title, yAxisLabel, fullsize = false }) => {
  // State to track the currently hovered line
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Track mouse position within chart area
  const handleMouseMove = (e: React.MouseEvent) => {
    if (chartRef.current && hoveredLine) {
      const rect = chartRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Clear mouse position when leaving chart or no line is hovered
  const handleMouseLeave = () => {
    setHoveredLine(null);
    setMousePosition(null);
  };

  // Calculate global min and max values across all data points
  const allValues = data.flatMap(item =>
    Object.entries(item)
      .filter(([key]) => key !== 'month')
      .map(([_, value]) => value as number)
  );
  
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);
  
  // Set the y-axis range with some padding
  const yAxisMin = Math.floor(globalMin * 0.95);
  const yAxisMax = Math.ceil(globalMax * 1.05);

  // Create a helper function to format community names consistently
  const formatCommunityName = (key: string): string => {
    // For market/community format
    if (key.includes('/')) {
      const [market, community] = key.split('/');
      
      // Special case for Scattered communities
      if (community === 'Scattered') {
        return `Scattered (${market})`;
      }
      
      // Regular communities - show only the community name
      return community;
    }
    
    // For markets or other values, show as is
    return key;
  };

  // Custom tooltip component that positions to the right of the cursor
  const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      // Check if we're in the first quarter (Mar/Apr/May)
      const isFirstQuarter = label.includes('Mar') || label.includes('Apr') || label.includes('May');
      
      return (
        <div 
          className="bg-white p-1.5 border border-gray-200 shadow-md rounded text-xs min-w-[120px]"
          style={{
            transform: isFirstQuarter ? 'translateX(60px)' : 'none'
          }}
        >
          <p className="font-medium text-[10px] text-gray-500">{label}</p>
          <div className="flex flex-col gap-0.5">
            {payload.map((entry, index) => (
              <div 
                key={`item-${index}`} 
                className="flex items-center gap-1.5"
                style={{ 
                  color: entry.color,
                  fontWeight: entry.dataKey === hoveredLine ? 'bold' : 'normal'
                }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span>{`${formatCommunityName(entry.dataKey)}: ${entry.value}`}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Add a legend formatter to display just community names while preserving full keys for color selection
  const formatLegendText = (value: string): string => {
    return formatCommunityName(value);
  };

  // Add click handler to open the detail modal
  const handleChartClick = () => {
    if (!fullsize) {
      setDetailModalOpen(true);
    }
  };

  return (
    <>
      <div className={`${fullsize ? 'h-full' : 'h-[250px]'} relative`}>
        {!fullsize && <h3 className="text-base font-medium mb-4">{title}</h3>}

        <div 
          ref={chartRef}
          className="h-full cursor-pointer relative" 
          onClick={handleChartClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Hover label that follows cursor */}
          {hoveredLine && mousePosition && (
            <div 
              className="absolute pointer-events-none bg-white px-2 py-1 text-xs rounded shadow border border-gray-200 z-10"
              style={{ 
                left: `${mousePosition.x + 10}px`, 
                top: `${mousePosition.y - 25}px`,
                color: getLineColor(hoveredLine)
              }}
            >
              {formatCommunityName(hoveredLine)}
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                interval={1}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                label={{
                  value: yAxisLabel,
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
                domain={[yAxisMin, yAxisMax]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                position={{ x: 10, y: -30 }}
                cursor={{ strokeDasharray: '3 3' }}
                offset={15}
                wrapperStyle={{ left: 'auto' }}
              />
              {Object.keys(data[0])
                .filter(key => key !== 'month')
                .map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={getLineColor(key)}
                    strokeWidth={key === hoveredLine ? 3 : key === 'Average' || key === 'Total' ? 2 : 1}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                    onMouseOver={() => {
                      setHoveredLine(key);
                    }}
                    onMouseOut={() => {
                      // Don't reset hoveredLine here as it would flicker when moving between points
                      // We'll reset in the chart container's onMouseLeave
                    }}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ChartDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        data={data}
        title={title || ""}
        yAxisLabel={yAxisLabel}
        chartType="line"
      />
    </>
  );
};

const getLineColor = (key: string): string => {
  // Base market colors
  const marketColors = {
    'Atlanta': '#0369a1',       // Blue
    'Tampa': '#15803d',         // Green
    'Jacksonville': '#b91c1c',  // Red (changed from yellow)
    'Orlando': '#ca8a04',       // Yellow (changed from red)
    'Total': '#000000',         // Black
    'Average': '#000000',       // Black
  };

  // Specific community colors
  const communityColors = {
    'Atlanta/Osborne Farms': '#60a5fa', // Light blue
    'Atlanta/Suwanee Square': '#93c5fd', // Another light blue
    'Atlanta/Scattered': '#bfdbfe', // Another light blue
    
    // Tampa communities (greens)
    'Tampa/Preserve at Pine Grove': '#34d399', // Medium bright green
    'Tampa/Avila Bay': '#6ee7b7',            // Mint green
    'Tampa/Belmont': '#86efac',              // Light mint green
    'Tampa/Scattered': '#10b981',            // Teal green
    
    // Jacksonville communities (reds - updated from yellows)
    "Jacksonville/Sawyer's Preserve": '#f87171', // Light red
    'Jacksonville/Scattered': '#fca5a5',         // Lighter red
    
    // Orlando communities (yellows - updated from reds)
    'Orlando/Scattered': '#fcd34d',             // Light yellow
  };

  // Check if key is a specific community
  if (communityColors[key]) {
    return communityColors[key];
  }

  // Check if key is a direct market or special value
  if (marketColors[key]) {
    return marketColors[key];
  }
    
  // Fallback colors for any other values
  const fallbackColors = [
    '#818cf8', // Indigo
    '#c084fc', // Purple
    '#e879f9', // Fuchsia
    '#fb7185', // Rose
  ];
  
  // Create a hash of the key for consistent color assignment
  const hashCode = [...key].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbackColors[hashCode % fallbackColors.length];
};

// Helper function to lighten a hex color
const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

export default SimpleLineChart;