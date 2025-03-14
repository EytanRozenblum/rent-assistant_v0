import React from 'react';
import { cn } from '@/lib/utils';
import { MetricData } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  metric: MetricData;
  className?: string;
  selectedValues?: string[];
  onDelete?: () => void;
  id?: number | string;
}

const MetricCard = ({ 
  metric, 
  className, 
  selectedValues = [],
  onDelete,
  id
}: MetricCardProps) => {
  const { label, value, change, status, markets, communities } = metric;
  
  const getStatusIcon = (statusValue: string | null) => {
    if (statusValue === 'increase_good') return <TrendingUp className="h-4 w-4 text-green-500 mr-1" />;
    if (statusValue === 'increase_bad') return <TrendingUp className="h-4 w-4 text-red-500 mr-1" />;
    if (statusValue === 'decrease_good') return <TrendingDown className="h-4 w-4 text-green-500 mr-1" />;
    if (statusValue === 'decrease_bad') return <TrendingDown className="h-4 w-4 text-red-500 mr-1" />;
    return <Minus className="h-4 w-4 text-gray-500 mr-1" />;
  };
  
  const getStatusColor = (statusValue: string | null) => {
    if (statusValue === 'increase_good') return 'text-green-500';
    if (statusValue === 'increase_bad') return 'text-red-500';
    if (statusValue === 'decrease_good') return 'text-green-500';
    if (statusValue === 'decrease_bad') return 'text-red-500';
    return 'text-gray-500';
  };
  
  const isPercentageMetric = label.includes('Rate') || label.includes('Occupancy') || label.includes('Delinq') || label.includes('Renewals') || label.includes('Increase');
  const isCurrencyMetric = label.includes('Rent');
  
  const formatValue = (val: number) => {
    if (isPercentageMetric) {
      return val.toFixed(1); // Always show one decimal place for percentage metrics
    }
    if (isCurrencyMetric) {
      return val.toLocaleString(); // Use locale-specific formatting for currency
    }
    return val.toLocaleString(); // Apply thousands separators to all other numbers
  };

  const formatChangeValue = (val: number) => {
    return val > 0 ? `+${val.toFixed(1)}%` : `${val.toFixed(1)}%`;
  };
  
  return (
    <div className={cn('bg-white rounded-lg shadow-sm p-4 pt-7 border border-gray-100 min-h-[105px]', className)}>
      <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
      <div className="flex flex-col">
        {/* Main metric (total) */}
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold">
            {isCurrencyMetric && '$'}
            {formatValue(value)}
            {isPercentageMetric ? '%' : ''}
            {label.includes('Resolution Time') ? ' days' : ''}
          </p>
          {change !== undefined && (
            <p className={cn('ml-2 flex items-center text-sm', getStatusColor(status))}>
              {getStatusIcon(status)}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </p>
          )}
        </div>

        {/* Community-specific metrics (when multiple communities are selected) */}
        {communities && selectedValues && selectedValues.length > 1 && (
          <div className="mt-2 space-y-2 border-t pt-2">
            {selectedValues.map(community => communities[community] && (
              <div key={community} className="flex items-center justify-between text-[11px] text-gray-500 min-h-[12px]">
                <span className="max-w-[60%] pr-2 leading-tight">{community.split('/')[1] || community}:</span>
                <div className="flex items-center flex-shrink-0">
                  <span className="font-medium whitespace-nowrap">
                    {isCurrencyMetric && '$'}
                    {formatValue(communities[community].value)}
                    {isPercentageMetric ? '%' : ''}
                    {label.includes('Resolution Time') ? ' days' : ''}
                  </span>
                  {communities[community].change !== undefined && (
                    <span className={cn('ml-1 flex items-center whitespace-nowrap', 
                      communities[community].status?.includes('good') ? 'text-green-500' : 
                      communities[community].status?.includes('bad') ? 'text-red-500' : 
                      'text-gray-500'
                    )}>
                      ({formatChangeValue(communities[community].change)})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Market-specific metrics (shown when no communities are selected) */}
        {markets && selectedValues.length === 0 && (
          <div className="mt-2 space-y-2 border-t pt-2">
            {Object.entries(markets).map(([market, data]) => (
              <div key={market} className="flex items-center justify-between text-[11px] text-gray-500 min-h-[12px]">
                <span className="pr-2 leading-tight">{market}:</span>
                <div className="flex items-center flex-shrink-0">
                  <span className="font-medium whitespace-nowrap">
                    {isCurrencyMetric && '$'}
                    {formatValue(data.value)}
                    {isPercentageMetric ? '%' : ''}
                    {label.includes('Resolution Time') ? ' days' : ''}
                  </span>
                  {data.change !== undefined && (
                    <span className={cn('ml-1 flex items-center whitespace-nowrap', 
                      data.status?.includes('good') ? 'text-green-500' : 
                      data.status?.includes('bad') ? 'text-red-500' : 
                      'text-gray-500'
                    )}>
                      ({formatChangeValue(data.change)})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
