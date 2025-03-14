import React from 'react';
import { MaintenanceRequest } from '@/types';
import StatusBadge from '../shared/StatusBadge';
import { format } from 'date-fns';
import EventDialog from './EventDialog';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaintenanceTableProps {
  requests: MaintenanceRequest[];
}

const MaintenanceTable = ({ requests }: MaintenanceTableProps) => {
  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-muted">
          <tr>
            <th className="w-[13%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tenant</th>
            <th className="w-[12%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">Unit</th>
            <th className="w-[15%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">Issue</th>
            <th className="w-[14%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
            <th className="w-[10%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">Assigned To</th>
            <th className="w-[6%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">Priority</th>
            <th className="w-[6%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            <th className="w-[14%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">Scheduled</th>
            <th className="w-[10%] px-4 py-3 text-left text-sm font-medium text-muted-foreground">See in Yardi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {requests.map((request) => (
            <EventDialog
              key={request.id}
              event={request}
              trigger={
                <tr className="hover:bg-muted/50 cursor-pointer">
                  <td className="w-[13%] px-4 py-3">{request.tenantName}</td>
                  <td className="w-[12%] px-4 py-3">{request.unit}</td>
                  <td className="w-[15%] px-4 py-3">
                    <div>
                      <div className="font-medium">{request.issue}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{request.description}</div>
                    </div>
                  </td>
                  <td className="w-[14%] px-4 py-3">{format(new Date(request.dateSubmitted), 'yyyy-MM-dd')}</td>
                  <td className="w-[10%] px-4 py-3">{request.assignedTo || 'Unassigned'}</td>
                  <td className="w-[6%] px-4 py-3">
                    <StatusBadge status={request.priority} />
                  </td>
                  <td className="w-[6%] px-4 py-3">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="w-[14%] px-4 py-3">
                    {request.scheduledDate 
                      ? format(new Date(request.scheduledDate), 'yyyy-MM-dd hh:mm a')
                      : 'Not scheduled'}
                  </td>
                  <td className="w-[10%] px-4 py-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      title="See in Yardi"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the dialog from opening
                        window.open('https://www.yardi.com', '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              }
            />
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                No maintenance requests found matching the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceTable;
