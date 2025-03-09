
import React from 'react';
import { cn } from '@/lib/utils';
import { MetricData } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  metric: MetricData;
  className?: string;
}

const MetricCard = ({ metric, className }: MetricCardProps) => {
  const { label, value, change, status } = metric;
  
  const getStatusIcon = () => {
    if (status === 'increase') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (status === 'decrease') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };
  
  const getStatusColor = () => {
    if (status === 'increase') return 'text-green-500';
    if (status === 'decrease') return 'text-red-500';
    return 'text-gray-500';
  };
  
  return (
    <div className={cn('bg-white rounded-lg shadow-sm p-4 border border-gray-100', className)}>
      <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
      <div className="flex items-end gap-2">
        <div className="text-2xl font-bold">
          {typeof value === 'number' && Number.isInteger(value) ? value : value.toFixed(1)}
          {label.includes('Rate') || label.includes('Occupancy') ? '%' : ''}
          {label.includes('Resolution Time') ? ' days' : ''}
        </div>
        {change !== undefined && (
          <div className={cn('flex items-center text-sm mb-1 gap-0.5', getStatusColor())}>
            {getStatusIcon()}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
