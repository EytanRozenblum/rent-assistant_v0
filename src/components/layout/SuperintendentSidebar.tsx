import React from 'react';
import { NavLink } from 'react-router-dom';
import AppLogo from './AppLogo';
import { 
  Wrench, 
  Calendar,
  Map,
  Settings,
  Sun,
  Bot,
  MessageSquare,
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

const NavItem = ({ to, icon, label, end = false }: NavItemProps) => (
  <NavLink
    to={to}
    end={end}
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

const SuperintendentSidebar = () => {
  return (
    <div className="h-screen w-64 border-r border-sidebar-border bg-sidebar fixed left-0 top-0 flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <NavLink to="/super">
          <AppLogo />
        </NavLink>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <NavItem to="/super" icon={<Sun className="h-5 w-5" />} label="My Day" end={true} />
        <NavItem to="/super/dashboard" icon={<Wrench className="h-5 w-5" />} label="Work Orders" />
        <NavItem to="/super/calendar" icon={<Calendar className="h-5 w-5" />} label="Calendar" />
        <NavItem to="/super/map" icon={<Map className="h-5 w-5" />} label="Map View" />
        <NavItem to="/super/communication" icon={<Bot className="h-5 w-5" />} label="AI Chats with Tenants" />
        <NavItem to="/super/ask" icon={<MessageSquare className="h-5 w-5" />} label="Chat with your AI Assistant" 
        />
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <NavItem to="/super/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
      </div>
    </div>
  );
};

export default SuperintendentSidebar;
