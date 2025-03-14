
import React from 'react';
import LeasingAgentSidebar from './LeasingAgentSidebar';
import AppHeader from './AppHeader';

interface LeasingAgentLayoutProps {
  children: React.ReactNode;
}

const LeasingAgentLayout = ({ children }: LeasingAgentLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <LeasingAgentSidebar />
      <div className="flex-1 ml-64">
        <AppHeader />
        <main className="p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LeasingAgentLayout;
