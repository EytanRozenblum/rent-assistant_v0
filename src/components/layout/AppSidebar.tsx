import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  Map,
  Bot,
  MessageSquare,
  LineChart
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  className?: string;
}

interface SubNavItemProps {
  to: string;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ to, icon, label, isActive, className }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive: linkActive }) => 
      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive || linkActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
          : 'text-sidebar-foreground hover:bg-sidebar-border hover:text-sidebar-foreground'
      } ${className || ''}`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const SubNavItem = ({ to, label, isActive }: SubNavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive: linkActive }) => 
      `flex items-center pl-11 py-2 rounded-md transition-colors text-sm ${
        isActive || linkActive
          ? 'text-sidebar-accent-foreground font-medium' 
          : 'text-sidebar-foreground hover:bg-sidebar-border hover:text-sidebar-foreground'
      }`
    }
  >
    <span>{label}</span>
  </NavLink>
);

const AppSidebar = () => {
  const location = useLocation();
  
  // Check if we're on reports page or creating a dashboard from dashboard page
  const isReportsActive = 
    location.pathname === '/reports' || 
    (location.pathname === '/dashboard' && location.search.includes('create'));
    
  // Check if we're on specific reports tabs
  const isAskAgentActive = location.pathname === '/reports' && 
    (!location.search || location.search.includes('tab=ask'));
  
  const isMyReportsActive = location.pathname === '/reports' && 
    location.search.includes('tab=myreports');

  const isAnalyticsExpanded = isReportsActive || isAskAgentActive || isMyReportsActive;

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
            AI Communications
          </div>
          <NavItem to="/communications" icon={<Bot className="h-5 w-5" />} label="AI Chats with Tenants" />
        </div>
        
        <div className="pt-4 pb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Analytics
          </div>

          <NavItem 
            to="/ask" 
            icon={<MessageSquare className="h-5 w-5" />} 
            label="Chat with your AI Assistant" 
          />
          <NavItem 
            to="/myreports" 
            icon={<LineChart className="h-5 w-5" />} 
            label="My Reports" 
          />
        </div>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
      </div>
    </div>
  );
};

export default AppSidebar;
