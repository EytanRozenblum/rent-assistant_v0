
import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, Star, PlusCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Dashboard {
  id: string;
  name: string;
  isDefault?: boolean;
  cards?: any[]; // Added cards property
}

interface DashboardSelectorProps {
  dashboards: Dashboard[];
  activeDashboard: Dashboard;
  onSelect: (dashboard: Dashboard) => void;
}

const DashboardSelector: React.FC<DashboardSelectorProps> = ({
  dashboards,
  activeDashboard,
  onSelect
}) => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    // This will be handled by the CreateDashboardDialog component
    const createDashboardEvent = new CustomEvent('create-dashboard', {
      detail: { action: 'open' }
    });
    document.dispatchEvent(createDashboardEvent);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1 text-muted-foreground">
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel>Switch Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dashboards.map((dashboard) => (
          <DropdownMenuItem 
            key={dashboard.id}
            onClick={() => onSelect(dashboard)}
            className="cursor-pointer flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              {dashboard.isDefault && <Star className="h-3.5 w-3.5 text-amber-500" />}
              <span>{dashboard.name}</span>
            </div>
            {activeDashboard.id === dashboard.id && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleCreateNew}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Create New Dashboard</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardSelector;
