
import React from 'react';
import { MaintenanceRequest } from '@/types';
import StatusBadge from '../shared/StatusBadge';

interface MaintenanceTableProps {
  requests: MaintenanceRequest[];
}

const MaintenanceTable = ({ requests }: MaintenanceTableProps) => {
  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tenant</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Unit</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Issue</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Assigned To</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Priority</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Scheduled</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-muted/50">
              <td className="px-4 py-3">{request.tenantName}</td>
              <td className="px-4 py-3">{request.unit}</td>
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium">{request.issue}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{request.description}</div>
                </div>
              </td>
              <td className="px-4 py-3">{request.dateSubmitted}</td>
              <td className="px-4 py-3">{request.assignedTo || 'Unassigned'}</td>
              <td className="px-4 py-3">
                <StatusBadge status={request.priority} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={request.status} />
              </td>
              <td className="px-4 py-3">{request.scheduledDate || 'Not scheduled'}</td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
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
