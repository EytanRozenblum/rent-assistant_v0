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
import { ExternalLink, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { Lead } from "@/types";

interface LeadDialogProps {
  lead: Lead;
  trigger: React.ReactNode;
}

const LeadDialog = ({ lead, trigger }: LeadDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{lead.name}</span>
            <Badge 
              variant={
                lead.status === 'hot' ? "destructive" :
                lead.status === 'warm' ? "default" :
                lead.status === 'cold' ? "secondary" : "outline"
              }
            >
              {lead.status}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-lg">
            Lead Details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-gray-400" />
                <p>{lead.email}</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4 text-gray-400" />
                <p>{lead.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Property of Interest</p>
              <p>{lead.propertyInterest}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Community (Market)</p>
              <p>{lead.community} ({lead.market})</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Leasing Agent</p>
              <p>{lead.assignedTo || 'Unassigned'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tour Information</p>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <p>{lead.tourScheduled || 'Not scheduled'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Notes</p>
            <p>{lead.notes || 'No notes available'}</p>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => {
                window.location.href = `mailto:${lead.email}`;
              }}
            >
              <Mail className="h-4 w-4" />
              Send Email
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.community)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                View Location
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDialog; 