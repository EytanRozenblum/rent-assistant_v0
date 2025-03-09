
export type Status = 
  | 'pending' 
  | 'active' 
  | 'completed' 
  | 'overdue' 
  | 'canceled'
  | 'approved'
  | 'rejected'
  | 'reviewing'
  | 'scheduled'
  | 'maintenance'
  | 'urgent'
  | 'normal'
  | 'low';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  source: string;
  status: Status;
  notes: string;
  dateCreated: string;
  nextFollowUp: string | null;
  tourScheduled: string | null;
  assignedTo: string;  // Leasing agent
}

export interface Application {
  id: string;
  leadId: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  status: Status;
  dateSubmitted: string;
  backgroundCheck: 'pending' | 'approved' | 'rejected';
  creditCheck: 'pending' | 'approved' | 'rejected';
  incomeVerification: 'pending' | 'approved' | 'rejected';
  assignedTo: string;  // Leasing agent
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  status: 'active' | 'inactive' | 'pending';
  rentStatus: 'paid' | 'pending' | 'overdue';
  region: string;
}

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  tenantName: string;
  unit: string;
  issue: string;
  description: string;
  dateSubmitted: string;
  status: Status;
  priority: 'urgent' | 'normal' | 'low';
  assignedTo: string | null;
  scheduledDate: string | null;
  region: string;
}

export interface AIConversation {
  id: string;
  relatedTo: 'lead' | 'tenant' | 'maintenance' | 'general';
  relatedId: string | null;
  contactName: string;
  contactType: 'lead' | 'tenant' | 'vendor' | 'other';
  channel: 'voice' | 'sms' | 'email';
  dateTime: string;
  transcript: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  actionItems: string[];
}

export interface RentPayment {
  id: string;
  tenantId: string;
  tenantName: string;
  unit: string;
  amount: number;
  dueDate: string;
  datePaid: string | null;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: 'bank' | 'card' | 'cash' | 'check' | null;
}

export interface MetricData {
  label: string;
  value: number;
  previousValue?: number;
  change?: number;
  status?: 'increase' | 'decrease' | 'neutral';
}

export interface ChartData {
  name: string;
  value: number;
}

export interface SuperItinerary {
  id: string;
  name: string;
  locations: {
    address: string;
    lat: number;
    lng: number;
    requestId: string;
    description: string;
  }[];
}
