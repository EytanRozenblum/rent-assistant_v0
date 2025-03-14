
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { BarChart, LineChart, PieChart, Plus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface DashboardCard {
  id: number;
  title: string;
  type: string;
  kpi: string;
  timeframe: string;
  market: string;
  category: string;
}

interface AddGraphDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (card: DashboardCard) => void;
}

const AddGraphDialog: React.FC<AddGraphDialogProps> = ({
  open,
  onOpenChange,
  onSave
}) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardType, setCardType] = useState('line');
  const [cardKpi, setCardKpi] = useState('occupancy');
  const [cardTimeframe, setCardTimeframe] = useState('month');
  const [cardMarket, setCardMarket] = useState('all');
  const [cardCategory, setCardCategory] = useState('leasing');

  const handleSaveCard = () => {
    if (!cardTitle.trim()) {
      toast.error("Please enter a title for the graph");
      return;
    }

    const newCard: DashboardCard = {
      id: Date.now(),
      title: cardTitle,
      type: cardType,
      kpi: cardKpi,
      timeframe: cardTimeframe,
      market: cardMarket,
      category: cardCategory
    };

    onSave(newCard);
    resetForm();
  };

  const resetForm = () => {
    setCardTitle('');
    setCardType('line');
    setCardKpi('occupancy');
    setCardTimeframe('month');
    setCardMarket('all');
    setCardCategory('leasing');
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
          <DialogDescription>
            Create a new graph card to display on your dashboard.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="card-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="card-title"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  placeholder="Graph title"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Chart Type
                </Label>
                <div className="col-span-3">
                  <ToggleGroup 
                    type="single" 
                    value={cardType} 
                    onValueChange={(value) => value && setCardType(value)}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="line" aria-label="Line Chart" className="flex items-center gap-2">
                      <LineChart className="h-4 w-4" />
                      <span>Line</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="bar" aria-label="Bar Chart" className="flex items-center gap-2">
                      <BarChart className="h-4 w-4" />
                      <span>Bar</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="pie" aria-label="Pie Chart" className="flex items-center gap-2">
                      <PieChart className="h-4 w-4" />
                      <span>Pie</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="card-category" className="text-right">
                  Category
                </Label>
                <Select value={cardCategory} onValueChange={setCardCategory}>
                  <SelectTrigger id="card-category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leasing">Leasing</SelectItem>
                    <SelectItem value="operations">Property Operations</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="card-kpi" className="text-right">
                  KPI
                </Label>
                <Select value={cardKpi} onValueChange={setCardKpi}>
                  <SelectTrigger id="card-kpi" className="col-span-3">
                    <SelectValue placeholder="Select KPI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="occupancy">Occupancy Rate</SelectItem>
                    <SelectItem value="leasing-velocity">Leasing Velocity</SelectItem>
                    <SelectItem value="renewals">Renewal Rate</SelectItem>
                    <SelectItem value="delinquency">Delinquency Rate</SelectItem>
                    <SelectItem value="work-orders">Work Orders</SelectItem>
                    <SelectItem value="billable-hours">Billable Hours</SelectItem>
                    <SelectItem value="resolution-time">Resolution Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="card-timeframe" className="text-right">
                  Timeframe
                </Label>
                <Select value={cardTimeframe} onValueChange={setCardTimeframe}>
                  <SelectTrigger id="card-timeframe" className="col-span-3">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="card-market" className="text-right">
                  Market
                </Label>
                <Select value={cardMarket} onValueChange={setCardMarket}>
                  <SelectTrigger id="card-market" className="col-span-3">
                    <SelectValue placeholder="Select market" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Markets</SelectItem>
                    <SelectItem value="atlanta">Atlanta</SelectItem>
                    <SelectItem value="tampa">Tampa</SelectItem>
                    <SelectItem value="orlando">Orlando</SelectItem>
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
          <Button onClick={handleSaveCard} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGraphDialog;
