import React from 'react';
import { Lead } from '@/types';
import StatusBadge from '../shared/StatusBadge';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadDialog from './LeadDialog';

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
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Property of Interest</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Leasing Agent</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Community (Market)</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground w-48">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date Created</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tour Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">See in Yardi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.map((lead) => (
            <LeadDialog
              key={lead.id}
              lead={lead}
              trigger={
                <tr className="hover:bg-muted/50 cursor-pointer">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{lead.propertyInterest}</td>
                  <td className="px-4 py-3">{lead.assignedTo || 'Unassigned'}</td>
                  <td className="px-4 py-3">{lead.community} ({lead.market})</td>
                  <td className="px-4 py-3 w-48">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3">{lead.dateCreated}</td>
                  <td className="px-4 py-3">{lead.tourScheduled || 'Not scheduled'}</td>
                  <td className="px-4 py-3">
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
          {leads.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
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
