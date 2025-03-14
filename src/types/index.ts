
export interface AIConversation {
  id: string;
  contactName: string;
  dateTime: string;
  channel: 'voice' | 'sms' | 'email';
  summary: string;
  transcript: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  actionItems: string[];
  scenario?: string;
  contactPhone?: string;
  contactEmail?: string;
  systemLinks?: string[];
  relatedTo?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'tour_scheduled' | 'application_sent' | 'application_received' | 'pending' | 'scheduled' | 'completed' | 'approved' | 'active';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  unitInterest?: string;
  dateCreated: string;
  market: string;
  community: string;
  assignedTo: string;
  status: LeadStatus;
  tourScheduled?: string;
  tourDateTime?: string;
  notes?: string;
  lastContact?: string;
  source?: string;
}

export type ApplicationStatus = 'pending' | 'approved' | 'denied' | 'reviewing';

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  unitType: string;
  dateSubmitted: string;
  status: ApplicationStatus;
  assignedTo?: string;
  propertyInterest?: string;
  backgroundCheck?: {
    status: 'pending' | 'completed' | 'failed';
    score?: number;
  };
  creditCheck?: {
    status: 'pending' | 'completed' | 'failed';
    score?: number;
  };
  incomeVerification?: {
    status: 'pending' | 'completed' | 'failed';
    verified: boolean;
  };
  leadId?: string;
}

export type TenantStatus = 'active' | 'inactive' | 'notice';
export type RentStatus = 'current' | 'delinquent' | 'paid' | 'pending';

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  unit: string;
  community: string;
  market: string;
  leaseEnd: string;
  leaseStart?: string;
  status: TenantStatus;
  rentStatus: RentStatus;
  propertyManager: string;
  rentAmount: number;
  notes?: string;
  moveInDate: string;
  delinquentAmount?: number;
}

export type MaintenanceStatus = 'new' | 'assigned' | 'in_progress' | 'completed' | 'pending' | 'scheduled';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent' | 'normal';

export interface MaintenanceRequest {
  id: string;
  tenantName: string;
  unit: string;
  issue: string;
  description: string;
  dateSubmitted: string;
  status: MaintenanceStatus;
  priority: PriorityLevel;
  assignedTo?: string;
  scheduledDate?: string;
  endDate?: string;
  community?: string;
  tenantId?: string;
}

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'delinquent';

export interface RentPayment {
  id: string;
  tenantName: string;
  unit: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paymentDate?: string;
  paymentMethod?: string;
  datePaid?: string;
  propertyManager?: string;
  tenantId?: string;
}

export type MetricChangeStatus = 'neutral' | 'up' | 'down' | 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad';

export interface MetricData {
  title: string;
  value: number | string;
  change: number;
  status: MetricChangeStatus;
  timeframe: string;
  format?: string;
  markets?: {
    name: string;
    value: number;
  }[];
}
