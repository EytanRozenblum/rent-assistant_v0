
import React from 'react';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 ml-64">
        <AppHeader />
        <main className="p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
