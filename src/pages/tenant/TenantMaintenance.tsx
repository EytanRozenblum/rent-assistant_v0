
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench, ClipboardList, Calendar, MessageSquare } from 'lucide-react';

interface TenantMaintenanceProps {
  scenario: 'request' | 'workorder' | 'scheduling' | 'relationship';
}

const TenantMaintenance = ({ scenario }: TenantMaintenanceProps) => {
  const renderScenarioContent = () => {
    switch (scenario) {
      case 'request':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Wrench className="h-5 w-5 mr-2" />
              Maintenance Request
            </h3>
            <p className="text-sm">
              My kitchen sink is leaking and there's water under the cabinet.
              How do I submit a maintenance request?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Is there an emergency maintenance number?</li>
                <li>Do I need to be home when maintenance arrives?</li>
                <li>How quickly will someone come to fix this issue?</li>
                <li>Can I upload photos of the problem?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'workorder':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Work Order Triage
            </h3>
            <p className="text-sm">
              I submitted a request about my AC not working, but I haven't heard back.
              Can you check the status of my work order?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>What's the typical response time for AC issues?</li>
                <li>Can you escalate my work order to urgent?</li>
                <li>Has a technician been assigned to my case?</li>
                <li>The issue is getting worse - what should I do?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'scheduling':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Maintenance Scheduling
            </h3>
            <p className="text-sm">
              I received notification that a technician will visit, but I need to
              reschedule. How can I set a different appointment time?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>What time slots are available this week?</li>
                <li>Can we schedule an appointment after 5pm?</li>
                <li>How much notice do I need to give to reschedule?</li>
                <li>Will I receive a reminder before the appointment?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'relationship':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Tenant Relationship
            </h3>
            <p className="text-sm">
              I've had multiple maintenance issues this month. I'd like to discuss 
              my concerns about the property condition.
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Can I schedule a meeting with the property manager?</li>
                <li>What's the plan for addressing recurring issues?</li>
                <li>How do I provide feedback about maintenance service?</li>
                <li>Are there any planned upgrades for this unit?</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return <p>Select a maintenance scenario from the sidebar.</p>;
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

export default TenantMaintenance;
