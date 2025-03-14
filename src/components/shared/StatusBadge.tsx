import React from 'react';

type StatusType = 
  // Lead statuses
  | 'new' | 'contacted' | 'tour_scheduled' | 'application_sent' | 'application_received' | 'closed_won' | 'closed_lost'
  // Tenant statuses
  | 'active' | 'pending' | 'past' | 'notice-given'
  // Rent statuses
  | 'paid' | 'partial' | 'delinquent' | 'grace-period'
  // Maintenance priority levels
  | 'urgent' | 'normal' | 'low'
  // Maintenance status types
  | 'completed' | 'scheduled' | 'in progress' | 'assigned' | 'unassigned';

interface StatusBadgeProps {
  status: StatusType | string; // Added string to accommodate any other status values
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      // Lead statuses
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-purple-100 text-purple-800';
      case 'tour_scheduled':
        return 'bg-amber-100 text-amber-800';
      case 'application_sent':
        return 'bg-indigo-100 text-indigo-800';
      case 'application_received':
        return 'bg-emerald-100 text-emerald-800';
      case 'closed_won':
        return 'bg-green-100 text-green-800';
      case 'closed_lost':
        return 'bg-red-100 text-red-800';
      
      // Tenant statuses
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'past':
        return 'bg-gray-100 text-gray-800';
      case 'notice-given':
        return 'bg-orange-100 text-orange-800';
      
      // Rent statuses
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-amber-100 text-amber-800';
      case 'delinquent':
        return 'bg-red-100 text-red-800';
      case 'grace-period':
        return 'bg-blue-100 text-blue-800';
      
      // Maintenance priority levels
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      
      // Maintenance status types
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-amber-100 text-amber-800';
      case 'assigned':
        return 'bg-purple-100 text-purple-800';
      case 'unassigned':
        return 'bg-gray-500 text-white';
      
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplayText = () => {
    switch (status) {
      // Lead statuses
      case 'new':
        return 'New Lead';
      case 'contacted':
        return 'Contacted';
      case 'tour_scheduled':
        return 'Tour Scheduled';
      case 'application_sent':
        return 'Application Sent';
      case 'application_received':
        return 'Application Received';
      case 'closed_won':
        return 'Closed Won';
      case 'closed_lost':
        return 'Closed Lost';
      
      // For other statuses, use the default formatting
      default:
        return formatStatus(status);
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {getStatusDisplayText()}
    </span>
  );
};

export default StatusBadge;
