import React from 'react';
import MetricCard from './MetricCard';
import { MetricData } from '@/types';
import { cn } from '@/lib/utils';

interface MetricsGridProps {
  metrics: MetricData[];
  title?: string;
  className?: string;
  selectedMarket: string;
}

const MetricsGrid = ({ metrics, title, className, selectedMarket }: MetricsGridProps) => {
  return (
    <div className="mb-6">
      {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
        {metrics.map((metric, index) => (
          <MetricCard 
            key={index} 
            metric={metric} 
            selectedMarket={selectedMarket}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;
