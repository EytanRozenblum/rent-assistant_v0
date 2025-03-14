
import React from 'react';
import { NavLink } from 'react-router-dom';
import AppLogo from './AppLogo';
import { 
  Sun,
  Users,
  HandCoins,
  Settings, 
  CreditCard,
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

const PropertyManagerSidebar = () => {
  return (
    <div className="h-screen w-64 border-r border-sidebar-border bg-sidebar fixed left-0 top-0 flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <NavLink to="/manager">
          <AppLogo />
        </NavLink>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <NavItem to="/manager" icon={<Sun className="h-5 w-5" />} label="My Day" end={true} />
        <NavItem to="/manager/tenants" icon={<Users className="h-5 w-5" />} label="Tenants" />
        <NavItem to="/manager/communication" icon={<Bot className="h-5 w-5" />} label="AI Chats with Tenants" />
        <NavItem to="/manager/ask" icon={<MessageSquare className="h-5 w-5" />} label="Chat with your AI Assistant" 
        />
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <NavItem to="/manager/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
      </div>
    </div>
  );
};

export default PropertyManagerSidebar;
