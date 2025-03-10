
import React from 'react';
import SuperintendentSidebar from './SuperintendentSidebar';
import AppHeader from './AppHeader';

interface SuperintendentLayoutProps {
  children: React.ReactNode;
}

const SuperintendentLayout = ({ children }: SuperintendentLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SuperintendentSidebar />
      <div className="flex-1 ml-64">
        <AppHeader />
        <main className="p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperintendentLayout;
