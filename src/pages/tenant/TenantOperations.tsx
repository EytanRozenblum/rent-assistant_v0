
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, FileSignature, LogOut, Truck } from 'lucide-react';

interface TenantOperationsProps {
  scenario: 'rent' | 'renewal' | 'moveout-notice' | 'moveout-coordination';
}

const TenantOperations = ({ scenario }: TenantOperationsProps) => {
  const renderScenarioContent = () => {
    switch (scenario) {
      case 'rent':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Rent Payment
            </h3>
            <p className="text-sm">
              I need to pay my rent for this month. What payment methods do you accept
              and is there an online portal I can use?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Is there a grace period for rent payments?</li>
                <li>Can I set up automatic payments?</li>
                <li>Do you charge a fee for credit card payments?</li>
                <li>I'm going to be late with my rent. What should I do?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'renewal':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <FileSignature className="h-5 w-5 mr-2" />
              Lease Renewal
            </h3>
            <p className="text-sm">
              My lease is expiring in 60 days. What are my options for renewal
              and will there be a rent increase?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Can I switch to a month-to-month lease?</li>
                <li>How much will my rent increase if I renew?</li>
                <li>Is there a discount for signing a longer lease?</li>
                <li>When do I need to inform you of my decision?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'moveout-notice':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <LogOut className="h-5 w-5 mr-2" />
              Move-Out Notice
            </h3>
            <p className="text-sm">
              I've decided not to renew my lease. How do I provide formal notice
              and how much notice is required?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Is there a specific form I need to complete?</li>
                <li>What happens if I need to break my lease early?</li>
                <li>Will I get my full security deposit back?</li>
                <li>What condition does the apartment need to be in when I leave?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'moveout-coordination':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Move-Out Coordination
            </h3>
            <p className="text-sm">
              I'm moving out next week. How do I schedule an inspection, return my keys,
              and provide my forwarding address?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>When will my final inspection be conducted?</li>
                <li>Where do I return my keys and parking pass?</li>
                <li>When can I expect my security deposit to be returned?</li>
                <li>Do I need to schedule an elevator for moving day?</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return <p>Select a property operations scenario from the sidebar.</p>;
    }
  };
  
  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0">
        {renderScenarioContent()}
      </CardContent>
    </Card>
  );
};

export default TenantOperations;
