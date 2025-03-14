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
import { ExternalLink, Mail, Phone, Calendar, Home, DollarSign, MapPin } from "lucide-react";
import { Tenant } from "@/types";

interface TenantDialogProps {
  tenant: Tenant;
  trigger: React.ReactNode;
}

const TenantDialog = ({ tenant, trigger }: TenantDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{tenant.name}</span>
            <div className="flex gap-2">
              <Badge 
                variant={
                  tenant.status === 'active' ? "default" :
                  tenant.status === 'pending' ? "secondary" :
                  tenant.status === 'notice' ? "destructive" : "outline"
                }
              >
                {tenant.status}
              </Badge>
              <Badge 
                variant={
                  tenant.rentStatus === 'paid' ? "default" :
                  tenant.rentStatus === 'pending' ? "secondary" :
                  tenant.rentStatus === 'delinquent' ? "destructive" : "outline"
                }
              >
                {tenant.rentStatus}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-lg">
            Tenant Details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-gray-400" />
                <p>{tenant.email}</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4 text-gray-400" />
                <p>{tenant.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unit</p>
              <div className="flex items-center gap-2 mt-1">
                <Home className="h-4 w-4 text-gray-400" />
                <p>{tenant.unit}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Community (Market)</p>
              <p>{tenant.community} ({tenant.market})</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rent</p>
              <div className="flex items-center gap-2 mt-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <p>${tenant.rentAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lease Start</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p>{tenant.leaseStart}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lease End</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p>{tenant.leaseEnd}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Notes</p>
            <p>{tenant.notes || 'No notes available'}</p>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => {
                window.location.href = `mailto:${tenant.email}`;
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tenant.unit + ' ' + tenant.community)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TenantDialog; 