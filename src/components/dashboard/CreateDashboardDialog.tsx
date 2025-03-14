
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
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, Gauge, BarChart, LineChart as LineChartIcon, PieChart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

interface Dashboard {
  id: string;
  name: string;
  isDefault?: boolean;
}

interface DashboardCard {
  id: number;
  title: string;
  type: string;
  kpi: string;
  timeframe: string;
  market: string;
  category: string;
}

interface CreateDashboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (dashboard: { name: string; cards: DashboardCard[] }) => void;
  defaultCards?: DashboardCard[];
}

const CreateDashboardDialog: React.FC<CreateDashboardDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  defaultCards = []
}) => {
  const [dashboardName, setDashboardName] = useState('');
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>(defaultCards);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardKpi, setNewCardKpi] = useState('occupancy');
  const [newCardType, setNewCardType] = useState('line');
  const [newCardTimeframe, setNewCardTimeframe] = useState('month');
  const [newCardMarket, setNewCardMarket] = useState('all');
  const [newCardCategory, setNewCardCategory] = useState('leasing');
  const [showAddCard, setShowAddCard] = useState(false);

  const handleSaveDashboard = () => {
    if (!dashboardName.trim()) {
      toast.error("Please enter a name for your dashboard");
      return;
    }

    if (dashboardCards.length === 0) {
      toast.error("Please add at least one card to your dashboard");
      return;
    }

    onSave({
      name: dashboardName,
      cards: dashboardCards
    });

    // Reset the form
    setDashboardName('');
    setDashboardCards([]);
    setShowAddCard(false);
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) {
      toast.error("Please enter a title for the card");
      return;
    }

    const newCard: DashboardCard = {
      id: Date.now(),
      title: newCardTitle,
      type: newCardType,
      kpi: newCardKpi,
      timeframe: newCardTimeframe,
      market: newCardMarket,
      category: newCardCategory
    };

    setDashboardCards([...dashboardCards, newCard]);
    
    // Reset card form
    setNewCardTitle('');
    setNewCardKpi('occupancy');
    setNewCardType('line');
    setNewCardTimeframe('month');
    setNewCardMarket('all');
    setNewCardCategory('leasing');
    setShowAddCard(false);
    
    toast.success("Card added to dashboard");
  };

  const handleRemoveCard = (cardId: number) => {
    setDashboardCards(dashboardCards.filter(card => card.id !== cardId));
    toast.success("Card removed from dashboard");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'line':
        return <LineChartIcon className="h-4 w-4 text-blue-500" />;
      case 'bar':
        return <BarChart className="h-4 w-4 text-green-500" />;
      case 'pie':
        return <PieChart className="h-4 w-4 text-amber-500" />;
      default:
        return <Gauge className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Dashboard</DialogTitle>
          <DialogDescription>
            Design your custom dashboard by adding the metrics you want to track.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="dashboard-name">Dashboard Name</Label>
            <Input
              id="dashboard-name"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              placeholder="My Custom Dashboard"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Dashboard Cards</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAddCard(true)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Card
              </Button>
            </div>

            {dashboardCards.length === 0 && !showAddCard && (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
                <p className="text-muted-foreground text-center mb-4">
                  Your dashboard is empty. Add some cards to get started.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddCard(true)}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add First Card
                </Button>
              </div>
            )}

            {showAddCard && (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">New Card</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddCard(false)}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-title">Title</Label>
                      <Input
                        id="card-title"
                        value={newCardTitle}
                        onChange={(e) => setNewCardTitle(e.target.value)}
                        placeholder="Card title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-type">Chart Type</Label>
                      <Select value={newCardType} onValueChange={setNewCardType}>
                        <SelectTrigger id="card-type">
                          <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-kpi">KPI</Label>
                      <Select value={newCardKpi} onValueChange={setNewCardKpi}>
                        <SelectTrigger id="card-kpi">
                          <SelectValue placeholder="Select KPI" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="occupancy">Occupancy Rate</SelectItem>
                          <SelectItem value="leasing-velocity">Leasing Velocity</SelectItem>
                          <SelectItem value="rent-collection">Rent Collection</SelectItem>
                          <SelectItem value="delinquency">Delinquency Rate</SelectItem>
                          <SelectItem value="resolution-time">Work Order Resolution Time</SelectItem>
                          <SelectItem value="renewals">Renewal Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-category">Category</Label>
                      <Select value={newCardCategory} onValueChange={setNewCardCategory}>
                        <SelectTrigger id="card-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leasing">Leasing</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-timeframe">Timeframe</Label>
                      <Select value={newCardTimeframe} onValueChange={setNewCardTimeframe}>
                        <SelectTrigger id="card-timeframe">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">Month</SelectItem>
                          <SelectItem value="quarter">Quarter</SelectItem>
                          <SelectItem value="year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-market">Market</Label>
                      <Select value={newCardMarket} onValueChange={setNewCardMarket}>
                        <SelectTrigger id="card-market">
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
                  
                  <div className="flex justify-end">
                    <Button onClick={handleAddCard}>Add to Dashboard</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {dashboardCards.length > 0 && (
              <div className="space-y-2">
                {dashboardCards.map((card) => (
                  <div key={card.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(card.type)}
                      <span>{card.title}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCard(card.id)}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveDashboard}
            disabled={!dashboardName.trim() || dashboardCards.length === 0}
          >
            Create Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDashboardDialog;
