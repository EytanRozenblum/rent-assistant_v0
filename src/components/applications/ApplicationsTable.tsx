import React from 'react';
import { Application } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApplicationDialog from './ApplicationDialog';

interface ApplicationsTableProps {
  applications: Application[];
}

const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Property Address</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date Submitted</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Leasing Agent</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Background Check</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Credit Check</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Income Verification</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">See in Yardi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {applications.map((application) => (
            <tr key={application.id} className="hover:bg-muted/50 cursor-pointer">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium">{application.name}</div>
                  <div className="text-sm text-gray-500">{application.email}</div>
                </div>
              </td>
              <td className="px-4 py-3">{application.propertyInterest}</td>
              <td className="px-4 py-3">{application.dateSubmitted}</td>
              <td className="px-4 py-3">{application.assignedTo || 'Unassigned'}</td>

              <td className="px-4 py-3">
                <Badge className={getStatusColor(application.status)}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge className={getStatusColor(application.backgroundCheck)}>
                  {application.backgroundCheck.charAt(0).toUpperCase() + application.backgroundCheck.slice(1)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge className={getStatusColor(application.creditCheck)}>
                  {application.creditCheck.charAt(0).toUpperCase() + application.creditCheck.slice(1)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge className={getStatusColor(application.incomeVerification)}>
                  {application.incomeVerification.charAt(0).toUpperCase() + application.incomeVerification.slice(1)}
                </Badge>
              </td>
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
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                No applications found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable; 