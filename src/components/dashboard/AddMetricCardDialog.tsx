
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface DashboardMetric {
  id: number;
  title: string;
  value: number | string;
  change: number;
  status: 'neutral' | 'up' | 'down' | 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad';
  format?: string;
}

interface AddMetricCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (metric: DashboardMetric) => void;
}

const AddMetricCardDialog: React.FC<AddMetricCardDialogProps> = ({
  open,
  onOpenChange,
  onSave
}) => {
  const [metricTitle, setMetricTitle] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [metricChange, setMetricChange] = useState('0');
  const [metricStatus, setMetricStatus] = useState<DashboardMetric['status']>('neutral');
  const [metricFormat, setMetricFormat] = useState('');

  const handleSaveMetric = () => {
    if (!metricTitle.trim()) {
      toast.error("Please enter a title for the metric");
      return;
    }

    if (!metricValue) {
      toast.error("Please enter a value for the metric");
      return;
    }

    const newMetric: DashboardMetric = {
      id: Date.now(),
      title: metricTitle,
      value: isNaN(Number(metricValue)) ? metricValue : Number(metricValue),
      change: Number(metricChange) || 0,
      status: metricStatus,
      format: metricFormat || undefined
    };

    onSave(newMetric);
    resetForm();
  };

  const resetForm = () => {
    setMetricTitle('');
    setMetricValue('');
    setMetricChange('0');
    setMetricStatus('neutral');
    setMetricFormat('');
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Metric Card</DialogTitle>
          <DialogDescription>
            Create a new metric card to display on your dashboard.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="metric-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="metric-title"
                  value={metricTitle}
                  onChange={(e) => setMetricTitle(e.target.value)}
                  placeholder="Metric title"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="metric-value" className="text-right">
                  Value
                </Label>
                <Input
                  id="metric-value"
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  placeholder="Example: 94.5 or $1,200"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="metric-change" className="text-right">
                  Change %
                </Label>
                <Input
                  id="metric-change"
                  type="number"
                  value={metricChange}
                  onChange={(e) => setMetricChange(e.target.value)}
                  placeholder="1.5"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="metric-status" className="text-right">
                  Status
                </Label>
                <Select value={metricStatus} onValueChange={(value) => setMetricStatus(value as DashboardMetric['status'])}>
                  <SelectTrigger id="metric-status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="up">Up</SelectItem>
                    <SelectItem value="down">Down</SelectItem>
                    <SelectItem value="increase_good">Increase (Good)</SelectItem>
                    <SelectItem value="increase_bad">Increase (Bad)</SelectItem>
                    <SelectItem value="decrease_good">Decrease (Good)</SelectItem>
                    <SelectItem value="decrease_bad">Decrease (Bad)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="metric-format" className="text-right">
                  Format
                </Label>
                <Select value={metricFormat} onValueChange={setMetricFormat}>
                  <SelectTrigger id="metric-format" className="col-span-3">
                    <SelectValue placeholder="Select format (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="currency">Currency ($)</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter className="mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveMetric} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Metric
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMetricCardDialog;
