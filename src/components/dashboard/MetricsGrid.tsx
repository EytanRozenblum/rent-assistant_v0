
import React from 'react';
import MetricCard from './MetricCard';
import { MetricData } from '@/types';

interface MetricsGridProps {
  metrics: MetricData[];
  title?: string;
}

const MetricsGrid = ({ metrics, title }: MetricsGridProps) => {
  return (
    <div className="mb-6">
      {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;
