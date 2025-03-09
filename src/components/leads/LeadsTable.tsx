
import React from 'react';
import { Lead } from '@/types';
import StatusBadge from '../shared/StatusBadge';

interface LeadsTableProps {
  leads: Lead[];
}

const LeadsTable = ({ leads }: LeadsTableProps) => {
  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Property Interest</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Leasing Agent</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Source</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date Created</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tour Date</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-muted/50">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </div>
              </td>
              <td className="px-4 py-3">{lead.propertyInterest}</td>
              <td className="px-4 py-3">{lead.assignedTo || 'Unassigned'}</td>
              <td className="px-4 py-3">{lead.source}</td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3">{lead.dateCreated}</td>
              <td className="px-4 py-3">{lead.tourScheduled || 'Not scheduled'}</td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                No leads found matching the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
