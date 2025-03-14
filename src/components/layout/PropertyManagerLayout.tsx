
import React from 'react';
import PropertyManagerSidebar from './PropertyManagerSidebar';
import AppHeader from './AppHeader';

interface PropertyManagerLayoutProps {
  children: React.ReactNode;
}

const PropertyManagerLayout = ({ children }: PropertyManagerLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <PropertyManagerSidebar />
      <div className="flex-1 ml-64">
        <AppHeader />
        <main className="p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PropertyManagerLayout;
