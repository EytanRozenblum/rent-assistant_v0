import { 
  Lead, 
  Application, 
  Tenant, 
  MaintenanceRequest, 
  AIConversation,
  RentPayment,
  MetricData,
  ChartData
} from '@/types';

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    propertyInterest: 'Oakwood Apartments - 2BR',
    source: 'Website',
    status: 'pending',
    notes: 'Interested in touring this weekend',
    dateCreated: '2023-09-15',
    nextFollowUp: '2023-09-18',
    tourScheduled: '2023-09-20',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    propertyInterest: 'Riverfront Condos - 1BR',
    source: 'Zillow',
    status: 'active',
    notes: 'Very interested in the downtown location',
    dateCreated: '2023-09-10',
    nextFollowUp: '2023-09-17',
    tourScheduled: '2023-09-19',
    assignedTo: 'Mike Brown'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    propertyInterest: 'Sunset Apartments - 3BR',
    source: 'Referral',
    status: 'completed',
    notes: 'Completed tour, seems very interested',
    dateCreated: '2023-09-05',
    nextFollowUp: '2023-09-16',
    tourScheduled: null,
    assignedTo: 'Alex Rodriguez'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    phone: '(555) 234-5678',
    propertyInterest: 'Oakwood Apartments - 1BR',
    source: 'Facebook',
    status: 'pending',
    notes: 'Looking for immediate move-in',
    dateCreated: '2023-09-12',
    nextFollowUp: '2023-09-19',
    tourScheduled: '2023-09-21',
    assignedTo: 'Emily Wilson'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    phone: '(555) 345-6789',
    propertyInterest: 'Riverfront Condos - 2BR',
    source: 'Instagram',
    status: 'active',
    notes: 'Interested in amenities and pet policy',
    dateCreated: '2023-09-08',
    nextFollowUp: '2023-09-18',
    tourScheduled: '2023-09-22',
    assignedTo: 'James Taylor'
  },
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: '1',
    leadId: '3',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    propertyInterest: 'Sunset Apartments - 3BR',
    status: 'reviewing',
    dateSubmitted: '2023-09-12',
    backgroundCheck: 'approved',
    creditCheck: 'pending',
    incomeVerification: 'approved',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: '2',
    leadId: '5',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    phone: '(555) 345-6789',
    propertyInterest: 'Riverfront Condos - 2BR',
    status: 'approved',
    dateSubmitted: '2023-09-10',
    backgroundCheck: 'approved',
    creditCheck: 'approved',
    incomeVerification: 'approved',
    assignedTo: 'Mike Brown'
  },
  {
    id: '3',
    leadId: '4',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    phone: '(555) 234-5678',
    propertyInterest: 'Oakwood Apartments - 1BR',
    status: 'pending',
    dateSubmitted: '2023-09-14',
    backgroundCheck: 'pending',
    creditCheck: 'pending',
    incomeVerification: 'pending',
    assignedTo: 'Emily Wilson'
  },
];

// Mock Tenants
export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Robert Garcia',
    email: 'robert.g@example.com',
    phone: '(555) 567-8901',
    unit: 'Oakwood 101',
    leaseStart: '2023-01-15',
    leaseEnd: '2024-01-14',
    rentAmount: 1450,
    status: 'active',
    rentStatus: 'paid',
    region: 'North'
  },
  {
    id: '2',
    name: 'Jennifer Lopez',
    email: 'jlopez@example.com',
    phone: '(555) 678-9012',
    unit: 'Riverfront 205',
    leaseStart: '2023-03-01',
    leaseEnd: '2024-02-29',
    rentAmount: 1700,
    status: 'active',
    rentStatus: 'pending',
    region: 'South'
  },
  {
    id: '3',
    name: 'Thomas White',
    email: 'twhite@example.com',
    phone: '(555) 789-0123',
    unit: 'Sunset 304',
    leaseStart: '2022-11-01',
    leaseEnd: '2023-10-31',
    rentAmount: 1950,
    status: 'active',
    rentStatus: 'overdue',
    region: 'East'
  },
  {
    id: '4',
    name: 'Patricia Martinez',
    email: 'pmartinez@example.com',
    phone: '(555) 890-1234',
    unit: 'Oakwood 205',
    leaseStart: '2023-05-15',
    leaseEnd: '2024-05-14',
    rentAmount: 1500,
    status: 'active',
    rentStatus: 'paid',
    region: 'West'
  },
  {
    id: '5',
    name: 'James Taylor',
    email: 'jtaylor@example.com',
    phone: '(555) 901-2345',
    unit: 'Riverfront 110',
    leaseStart: '2023-02-01',
    leaseEnd: '2024-01-31',
    rentAmount: 1650,
    status: 'active',
    rentStatus: 'paid',
    region: 'Central'
  },
];

// Mock Maintenance Requests
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    tenantId: '1',
    tenantName: 'Robert Garcia',
    unit: 'Oakwood 101',
    issue: 'Leaking faucet',
    description: 'The kitchen sink faucet is dripping constantly.',
    dateSubmitted: '2023-09-10',
    status: 'pending',
    priority: 'normal',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2023-09-18',
    region: 'North'
  },
  {
    id: '2',
    tenantId: '3',
    tenantName: 'Thomas White',
    unit: 'Sunset 304',
    issue: 'HVAC not cooling',
    description: 'Air conditioner is running but not cooling the apartment.',
    dateSubmitted: '2023-09-12',
    status: 'scheduled',
    priority: 'urgent',
    assignedTo: 'Alex Rodriguez',
    scheduledDate: '2023-09-15',
    region: 'East'
  },
  {
    id: '3',
    tenantId: '2',
    tenantName: 'Jennifer Lopez',
    unit: 'Riverfront 205',
    issue: 'Broken garbage disposal',
    description: 'Garbage disposal makes loud noise but doesn\'t work.',
    dateSubmitted: '2023-09-08',
    status: 'completed',
    priority: 'normal',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2023-09-11',
    region: 'South'
  },
  {
    id: '4',
    tenantId: '5',
    tenantName: 'James Taylor',
    unit: 'Riverfront 110',
    issue: 'Clogged toilet',
    description: 'Toilet in the master bathroom is clogged and won\'t flush properly.',
    dateSubmitted: '2023-09-14',
    status: 'pending',
    priority: 'urgent',
    assignedTo: null,
    scheduledDate: null,
    region: 'Central'
  },
  {
    id: '5',
    tenantId: '4',
    tenantName: 'Patricia Martinez',
    unit: 'Oakwood 205',
    issue: 'Smoke detector beeping',
    description: 'Smoke detector is beeping intermittently, likely needs battery replacement.',
    dateSubmitted: '2023-09-13',
    status: 'scheduled',
    priority: 'low',
    assignedTo: 'Alex Rodriguez',
    scheduledDate: '2023-09-19',
    region: 'West'
  },
];

// Mock AI Conversations
export const mockAIConversations: AIConversation[] = [
  {
    id: '1',
    relatedTo: 'lead',
    relatedId: '1',
    contactName: 'John Smith',
    contactType: 'lead',
    channel: 'voice',
    dateTime: '2023-09-15T14:30:00',
    transcript: 'AI: Hello, this is PropertyAI assistant. How can I help you today?\nJohn: I\'m interested in touring the Oakwood Apartments.\nAI: Great! We have availability this weekend. Would Saturday at 2 PM work for you?\nJohn: Yes, that works perfectly.\nAI: Excellent! I\'ve scheduled your tour for Saturday at 2 PM. You\'ll receive a confirmation email shortly. Is there anything else I can help with?',
    summary: 'Scheduled a property tour for Oakwood Apartments on Saturday at 2 PM.',
    sentiment: 'positive',
    actionItems: ['Send tour confirmation email', 'Update CRM with tour details'],
  },
  {
    id: '2',
    relatedTo: 'tenant',
    relatedId: '3',
    contactName: 'Thomas White',
    contactType: 'tenant',
    channel: 'sms',
    dateTime: '2023-09-12T10:15:00',
    transcript: 'Thomas: My AC isn\'t cooling, can someone look at it?\nAI: I\'m sorry to hear that. I can help schedule a maintenance visit. Is this an urgent matter?\nThomas: Yes, it\'s very hot in the apartment.\nAI: I understand. I\'ve created an urgent maintenance request, and a technician will contact you within 4 hours. If you don\'t hear back by 2:15 PM, please let us know.',
    summary: 'Created urgent maintenance request for AC not cooling.',
    sentiment: 'negative',
    actionItems: ['Follow up on HVAC repair', 'Check if technician contacted tenant'],
  },
  {
    id: '3',
    relatedTo: 'maintenance',
    relatedId: '3',
    contactName: 'Jennifer Lopez',
    contactType: 'tenant',
    channel: 'email',
    dateTime: '2023-09-09T16:45:00',
    transcript: 'Jennifer: I wanted to report that my garbage disposal is broken.\nAI: Thank you for reporting this issue. Can you provide any additional details about the problem?\nJennifer: It makes a loud noise but doesn\'t seem to be working properly.\nAI: I understand. I\'ve created a maintenance request for your broken garbage disposal. A technician will be scheduled to visit your unit. You\'ll receive a notification once the appointment is confirmed.',
    summary: 'Created maintenance request for broken garbage disposal.',
    sentiment: 'neutral',
    actionItems: ['Schedule maintenance appointment', 'Send confirmation when scheduled'],
  },
];

// Mock Rent Payments
export const mockRentPayments: RentPayment[] = [
  {
    id: '1',
    tenantId: '1',
    tenantName: 'Robert Garcia',
    unit: 'Oakwood 101',
    amount: 1450,
    dueDate: '2023-09-01',
    datePaid: '2023-09-01',
    status: 'paid',
    paymentMethod: 'bank',
  },
  {
    id: '2',
    tenantId: '2',
    tenantName: 'Jennifer Lopez',
    unit: 'Riverfront 205',
    amount: 1700,
    dueDate: '2023-09-01',
    datePaid: null,
    status: 'pending',
    paymentMethod: null,
  },
  {
    id: '3',
    tenantId: '3',
    tenantName: 'Thomas White',
    unit: 'Sunset 304',
    amount: 1950,
    dueDate: '2023-09-01',
    datePaid: null,
    status: 'overdue',
    paymentMethod: null,
  },
  {
    id: '4',
    tenantId: '4',
    tenantName: 'Patricia Martinez',
    unit: 'Oakwood 205',
    amount: 1500,
    dueDate: '2023-09-01',
    datePaid: '2023-08-30',
    status: 'paid',
    paymentMethod: 'card',
  },
  {
    id: '5',
    tenantId: '5',
    tenantName: 'James Taylor',
    unit: 'Riverfront 110',
    amount: 1650,
    dueDate: '2023-09-01',
    datePaid: '2023-08-29',
    status: 'paid',
    paymentMethod: 'bank',
  },
];

// Mock Metrics Data
export const mockDashboardMetrics: MetricData[] = [
  {
    label: 'Total Properties',
    value: 3,
    previousValue: 3,
    change: 0,
    status: 'neutral',
  },
  {
    label: 'Total Units',
    value: 120,
    previousValue: 118,
    change: 1.7,
    status: 'increase',
  },
  {
    label: 'Occupancy Rate',
    value: 92,
    previousValue: 89,
    change: 3.4,
    status: 'increase',
  },
  {
    label: 'Active Leases',
    value: 110,
    previousValue: 105,
    change: 4.8,
    status: 'increase',
  },
];

export const mockLeadMetrics: MetricData[] = [
  {
    label: 'New Leads (30d)',
    value: 28,
    previousValue: 22,
    change: 27.3,
    status: 'increase',
  },
  {
    label: 'Tours Scheduled',
    value: 15,
    previousValue: 12,
    change: 25,
    status: 'increase',
  },
  {
    label: 'Applications',
    value: 8,
    previousValue: 10,
    change: -20,
    status: 'decrease',
  },
  {
    label: 'Conversion Rate',
    value: 28.6,
    previousValue: 31.8,
    change: -10.1,
    status: 'decrease',
  },
];

export const mockOperationMetrics: MetricData[] = [
  {
    label: 'On-Time Rent',
    value: 86,
    previousValue: 82,
    change: 4.9,
    status: 'increase',
  },
  {
    label: 'Maintenance Requests',
    value: 23,
    previousValue: 19,
    change: 21.1,
    status: 'increase',
  },
  {
    label: 'Avg. Resolution Time',
    value: 1.8,
    previousValue: 2.2,
    change: -18.2,
    status: 'increase',
  },
  {
    label: 'Renewals (30d)',
    value: 12,
    previousValue: 10,
    change: 20,
    status: 'increase',
  },
];

// Chart Data
export const mockOccupancyData: ChartData[] = [
  { name: 'Jan', value: 85 },
  { name: 'Feb', value: 88 },
  { name: 'Mar', value: 87 },
  { name: 'Apr', value: 89 },
  { name: 'May', value: 91 },
  { name: 'Jun', value: 90 },
  { name: 'Jul', value: 92 },
  { name: 'Aug', value: 91 },
  { name: 'Sep', value: 92 },
];

export const mockLeadSourceData: ChartData[] = [
  { name: 'Website', value: 35 },
  { name: 'Zillow', value: 25 },
  { name: 'Referral', value: 15 },
  { name: 'Facebook', value: 12 },
  { name: 'Instagram', value: 8 },
  { name: 'Other', value: 5 },
];

export const mockMaintenanceData: ChartData[] = [
  { name: 'Plumbing', value: 32 },
  { name: 'HVAC', value: 28 },
  { name: 'Electrical', value: 15 },
  { name: 'Appliance', value: 12 },
  { name: 'Structural', value: 8 },
  { name: 'Other', value: 5 },
];

