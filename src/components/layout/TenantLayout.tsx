import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, Settings, ChevronLeft,
  BookOpen, Building, Wrench
} from 'lucide-react';
import TenantVoiceAgent from '../tenant/TenantVoiceAgent';
import PhoneInterface from '../tenant/PhoneInterface';

interface TenantLayoutProps {
  children: ReactNode;
}

const TenantLayout = ({ children }: TenantLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('leasing')) return 'Leasing';
    if (path.includes('operations')) return 'Property Operations';
    if (path.includes('maintenance')) return 'Maintenance';
    return 'Tenant Interface';
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="py-4 px-6 bg-white shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">AI-Powered Tenant Interface</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/tenant')}>
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1 p-6">
        <aside className="w-64 mr-6">
          <Card className="p-4">
            <h2 className="font-medium mb-4 text-lg">Demo Scenarios</h2>
            
            <div className="space-y-1">
              <h3 className="font-medium text-sm text-gray-500 mb-2 mt-4 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" /> 
                Leasing
              </h3>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/leasing/lead')}
              >
                Lead Interaction
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/leasing/application')} 
              >
                Application Support
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/leasing/signing')} 
              >
                Lease Signing
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/leasing/premove')} 
              >
                Pre-Move-in Prep
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/leasing/onboarding')} 
              >
                Tenant Onboarding
              </Button>
              
              <h3 className="font-medium text-sm text-gray-500 mb-2 mt-4 flex items-center">
                <Building className="h-4 w-4 mr-2" /> 
                Property Operations
              </h3>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/operations/rent')} 
              >
                Rent Collection
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/operations/renewal')} 
              >
                Lease Renewals
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/operations/moveout-notice')} 
              >
                Move-Out Notices
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/operations/moveout-coordination')} 
              >
                Move-Out Coordination
              </Button>
              
              <h3 className="font-medium text-sm text-gray-500 mb-2 mt-4 flex items-center">
                <Wrench className="h-4 w-4 mr-2" /> 
                Maintenance
              </h3>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/maintenance/request')} 
              >
                Maintenance Requests
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/maintenance/workorder')} 
              >
                Work Order Triage
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/maintenance/scheduling')} 
              >
                Maintenance Scheduling
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/tenant/maintenance/relationship')} 
              >
                Tenant Relationship
              </Button>
            </div>
          </Card>
        </aside>
        
        <main className="flex-1">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{getPageTitle()}</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="mx-auto" style={{ width: "300px", height: "600px" }}>
                <PhoneInterface />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <TenantVoiceAgent />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TenantLayout;
