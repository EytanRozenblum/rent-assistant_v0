
import React from 'react';
import { NavLink } from 'react-router-dom';
import AppLogo from './AppLogo';
import { 
  Home, 
  Users, 
  FileText, 
  Wrench, 
  BarChart, 
  Settings, 
  MessageCircle,
  Building,
  Calendar,
  CreditCard,
  Map
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
          : 'text-sidebar-foreground hover:bg-sidebar-border hover:text-sidebar-foreground'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const AppSidebar = () => {
  return (
    <div className="h-screen w-64 border-r border-sidebar-border bg-sidebar fixed left-0 top-0 flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <NavLink to="/dashboard">
          <AppLogo />
        </NavLink>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <NavItem to="/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" />
        
        <div className="pt-4 pb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Leasing
          </div>
          <NavItem to="/leads" icon={<Users className="h-5 w-5" />} label="Leads & Tours" />
          <NavItem to="/applications" icon={<FileText className="h-5 w-5" />} label="Applications" />
        </div>
        
        <div className="pt-4 pb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Property Operations
          </div>
          <NavItem to="/tenants" icon={<Building className="h-5 w-5" />} label="Tenants" />
          <NavItem to="/rent" icon={<CreditCard className="h-5 w-5" />} label="Rent Collection" />
        </div>
        
        <div className="pt-4 pb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Renovation, Maintenance, and Turns
          </div>
          <NavItem to="/maintenance" icon={<Wrench className="h-5 w-5" />} label="Work Orders" />
          <NavItem to="/calendar" icon={<Calendar className="h-5 w-5" />} label="Calendar" />
          <NavItem to="/map" icon={<Map className="h-5 w-5" />} label="Map View" />
        </div>
        
        <div className="pt-4 pb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Communication
          </div>
          <NavItem to="/communications" icon={<MessageCircle className="h-5 w-5" />} label="AI Agent" />
        </div>
        
        <div className="pt-4 pb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Analytics
          </div>
          <NavItem to="/reports" icon={<BarChart className="h-5 w-5" />} label="Reports" />
        </div>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
      </div>
    </div>
  );
};

export default AppSidebar;
