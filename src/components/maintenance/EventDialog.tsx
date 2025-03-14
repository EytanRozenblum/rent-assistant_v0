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
import { ExternalLink, ImageIcon, Info, MapPin } from "lucide-react";
import { MaintenanceRequest } from "@/types";

interface EventDialogProps {
  event: MaintenanceRequest;
  trigger: React.ReactNode;
}

const EventDialog = ({ event, trigger }: EventDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{event.issue}</span>
            <Badge 
              variant={
                event.priority === 'urgent' ? "destructive" :
                event.priority === 'high' ? "default" : "secondary"
              }
            >
              {event.priority}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-lg">
            Maintenance Request Details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
              <p>
                {event.scheduledDate 
                  ? `${format(new Date(event.scheduledDate), 'MMM d, yyyy h:mm a')} - ${format(new Date(event.endDate!), 'h:mm a')}`
                  : 'Not scheduled'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p>{event.unit} ({event.community})</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tenant</p>
              <p>{event.tenantName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p className="capitalize">{event.status}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p>{event.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
            <p>{event.assignedTo || 'Unassigned'}</p>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <ImageIcon className="h-4 w-4" />
              View Images
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.unit + ' ' + event.community)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Get There
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog; 