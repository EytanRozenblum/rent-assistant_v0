import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MetricData } from '@/types';
import { Card } from '@/components/ui/card';

interface ChangeMetricDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (metricKey: string) => void;
  currentMetricId?: string | number | undefined;
  availableMetrics: MetricData[];
  mode: 'add' | 'change';
}

const ChangeMetricDialog: React.FC<ChangeMetricDialogProps> = ({
  open,
  onOpenChange,
  onSelect,
  currentMetricId,
  availableMetrics,
  mode = 'change'
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Metric Card' : 'Change Metric'}</DialogTitle>
        </DialogHeader>
        
        <p className="text-sm text-muted-foreground mb-4">
          {mode === 'add' 
            ? 'Select a metric to add to your dashboard' 
            : 'Select a new metric to display in this card'
          }
        </p>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            {availableMetrics.map((metric) => (
              <Card 
                key={metric.kpi} 
                className={`p-4 cursor-pointer hover:border-primary/50 transition-colors ${
                  metric.kpi === currentMetricId ? 'border-2 border-primary' : ''
                }`}
                onClick={() => onSelect(metric.kpi)}
              >
                <div className="flex flex-col">
                  <h3 className="font-medium">{metric.label}</h3>
                  <p className="text-sm text-muted-foreground">{getMetricDescription(metric.kpi)}</p>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to provide descriptions for metrics
function getMetricDescription(kpi: string): string {
  const descriptions: Record<string, string> = {
    'number_of_homes': 'Total number of properties in your portfolio',
    'average_rent': 'Average monthly rent across all properties',
    'occupancy': 'Percentage of occupied properties',
    'delinquency': 'Percentage of rent that is past due',
    'renewals': 'Percentage of residents who renew their leases',
    'rent-increase': 'Average rent increase percentage on renewals',
    // Add descriptions for other metrics as needed
  };
  
  return descriptions[kpi] || 'No description available';
}

export default ChangeMetricDialog; 