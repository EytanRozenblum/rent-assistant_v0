import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ExternalLink, ImageIcon, Info, MapPin, User, FileText } from "lucide-react";
import { Lead, Application } from "@/types";

interface LeadEventDialogProps {
  event: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    type: 'tour' | 'application';
    details: Lead | Application;
  };
  trigger: React.ReactNode;
}

const STATUS_OPTIONS = [
  {
    name: 'Rent Collection',
    options: [
      { value: 'new', label: 'New Lead' },
      { value: 'contacted', label: 'Contacted' },
      { value: 'tour_scheduled', label: 'Scheduled Tour' },
      { value: 'application_sent', label: 'Application Sent' }
    ]
  },
  {
    name: 'Other',
    options: [
      { value: 'application_received', label: 'Application Received' },
      { value: 'closed_won', label: 'Closed Won' },
      { value: 'closed_lost', label: 'Closed Lost' }
    ]
  }
];

const LeadEventDialog = ({ event, trigger }: LeadEventDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{event.title}</span>
            <Badge variant={event.type === 'tour' ? "default" : "secondary"}>
              {event.type}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-lg">
            {event.type === 'tour' ? 'Property Tour Details' : 'Application Review Details'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-8 mt-4">
          {/* First Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                <p>{format(event.startTime, 'MMM d, yyyy h:mm a')} - {format(event.endTime, 'h:mm a')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p>{event.type === 'tour' ? event.details.propertyInterest : event.details.propertyAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contact</p>
                <p>{event.details.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="capitalize">
                  {STATUS_OPTIONS
                    .flatMap(category => category.options)
                    .find(status => status.value === event.details.status)?.label || event.details.status}
                </p>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Other</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contact Details</p>
                <div className="grid gap-2 mt-1">
                  <p>Email: {event.details.email}</p>
                  <p>Phone: {event.details.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p>{event.details.notes || 'No notes available'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                <p>{event.details.assignedTo || 'Unassigned'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            View Details
          </Button>
          <Button 
            className="flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://www.yardi.com', '_blank');
            }}
          >
            <ExternalLink className="h-4 w-4" />
            See in Yardi
          </Button>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              event.type === 'tour' ? event.details.propertyInterest : event.details.propertyAddress
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Get There
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadEventDialog; 