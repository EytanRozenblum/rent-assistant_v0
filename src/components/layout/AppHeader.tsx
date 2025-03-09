
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  User,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getTitleFromPath = (pathname: string): string => {
  const pathMap: Record<string, string> = {
    '/': 'Dashboard',
    '/leads': 'Leads & Tours',
    '/applications': 'Applications',
    '/tenants': 'Tenants',
    '/rent': 'Rent Collection',
    '/maintenance': 'Maintenance',
    '/calendar': 'Calendar',
    '/communications': 'AI Communications',
    '/reports': 'Reports',
    '/settings': 'Settings',
  };
  
  return pathMap[pathname] || 'Dashboard';
};

const AppHeader = () => {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);
  
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background fixed top-0 left-64 right-0 z-10">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 py-2 pr-4 border border-input rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <span>Admin</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
