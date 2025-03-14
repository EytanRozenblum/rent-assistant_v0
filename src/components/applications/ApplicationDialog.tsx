import React from 'react';
import { Application } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface ApplicationDialogProps {
  application: Application;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationDialog = ({ application, open, onOpenChange }: ApplicationDialogProps) => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Applicant Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{application.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>{application.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property Interest</p>
                <p>{application.propertyInterest}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date Submitted</p>
                <p>{application.dateSubmitted}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Application Status</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Overall Status</p>
                <Badge className={getStatusColor(application.status)}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Background Check</p>
                <Badge className={getStatusColor(application.backgroundCheck)}>
                  {application.backgroundCheck.charAt(0).toUpperCase() + application.backgroundCheck.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credit Check</p>
                <Badge className={getStatusColor(application.creditCheck)}>
                  {application.creditCheck.charAt(0).toUpperCase() + application.creditCheck.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Income Verification</p>
                <Badge className={getStatusColor(application.incomeVerification)}>
                  {application.incomeVerification.charAt(0).toUpperCase() + application.incomeVerification.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p>{application.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Community (Market)</p>
                <p>{application.community} ({application.market})</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog; 