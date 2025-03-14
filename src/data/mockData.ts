import { 
  Lead, 
  Application, 
  Tenant, 
  MaintenanceRequest, 
  AIConversation,
  RentPayment,
  MetricData,
  ChartData,
  RentCommunication
} from '@/types';

// Helper to generate today's date string in ISO format
const todayISO = new Date().toISOString().split('T')[0];

// Generate a datetime string for today at a specified hour and minute
const getTodayAt = (hour: number, minute: number = 0): string => {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    propertyInterest: '123 Maple Street',
    source: 'Website',
    status: 'new',
    notes: 'Interested in touring this weekend',
    dateCreated: '2025-03-15',
    nextFollowUp: '2025-03-18',
    tourScheduled: '2025-03-20',
    assignedTo: 'Sarah Johnson',
    market: 'Tampa',
    community: 'Preserve at Pine Grove'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    propertyInterest: '456 Oak Avenue',
    source: 'Zillow',
    status: 'contacted',
    notes: 'Very interested in the downtown location',
    dateCreated: '2025-03-10',
    nextFollowUp: '2025-03-17',
    tourScheduled: '2025-03-19',
    assignedTo: 'Mike Brown',
    market: 'Atlanta',
    community: 'Osborne Farms'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    propertyInterest: '789 Pine Court',
    source: 'Referral',
    status: 'tour_scheduled',
    notes: 'Completed tour, seems very interested',
    dateCreated: '2025-03-05',
    nextFollowUp: '2025-03-16',
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(14, 0),
    assignedTo: 'Alex Rodriguez',
    market: 'Atlanta',
    community: 'Suwanee Square'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    phone: '(555) 234-5678',
    propertyInterest: '321 Willow Drive',
    source: 'Facebook',
    status: 'application_sent',
    notes: 'Looking for immediate move-in',
    dateCreated: '2025-03-12',
    nextFollowUp: '2025-03-19',
    tourScheduled: '2025-03-21',
    assignedTo: 'Emily Wilson',
    market: 'Jacksonville',
    community: 'Sawyer\'s Preserve'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    phone: '(555) 345-6789',
    propertyInterest: '654 Cedar Lane',
    source: 'Instagram',
    status: 'application_received',
    notes: 'Interested in amenities and pet policy',
    dateCreated: '2025-03-08',
    nextFollowUp: '2025-03-18',
    tourScheduled: '2025-03-22',
    assignedTo: 'James Taylor',
    market: 'Tampa',
    community: 'Avila Bay'
  },
  {
    id: '6',
    name: 'Jennifer Lopez',
    email: 'jlopez@example.com',
    phone: '(555) 678-9012',
    propertyInterest: '987 Birch Street',
    source: 'Apartments.com',
    status: 'closed_won',
    notes: 'Interested in fenced yard for pets',
    dateCreated: '2025-03-14',
    nextFollowUp: '2025-03-20',
    tourScheduled: '2025-03-23',
    assignedTo: 'Alex Rodriguez',
    market: 'Tampa',
    community: 'Belmont'
  },
  {
    id: '7',
    name: 'Robert Garcia',
    email: 'rgarcia@example.com',
    phone: '(555) 789-0123',
    propertyInterest: '135 Spruce Road',
    source: 'Trulia',
    status: 'closed_lost',
    notes: 'Looking for home office space',
    dateCreated: '2025-03-09',
    nextFollowUp: '2025-03-16',
    tourScheduled: '2025-03-18',
    assignedTo: 'Emily Wilson',
    market: 'Orlando',
    community: 'Scattered'
  },
  {
    id: "lead-tampa-101",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(813) 555-1234",
    propertyInterest: "1542 Bayshore Drive",
    source: "Website",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Avila Bay",
    assignedTo: "Emily Wilson",
    status: "new",
    lastContact: getTodayAt(9, 15)
  },
  {
    id: "lead-tampa-102",
    name: "Mark Davis",
    email: "mark.davis@example.com",
    phone: "(813) 555-2345",
    propertyInterest: "3678 Belmont Avenue",
    source: "Zillow",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Belmont",
    assignedTo: "Emily Wilson",
    status: "contacted",
    lastContact: getTodayAt(10, 30)
  },
  {
    id: "lead-tampa-103",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@example.com",
    phone: "(813) 555-3456",
    propertyInterest: "2145 Harbor View Lane",
    source: "Referral",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Avila Bay",
    assignedTo: "Emily Wilson",
    status: "tour_scheduled",
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(13, 0), // 1:00 PM today
    notes: "Client is very interested in the bay view property."
  },
  {
    id: "lead-tampa-104",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "(813) 555-4567",
    propertyInterest: "4290 Belmont Heights Road",
    source: "Facebook",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Belmont",
    assignedTo: "Emily Wilson",
    status: "tour_scheduled",
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(15, 30), // 3:30 PM today
    notes: "Looking for pet-friendly options. Has a golden retriever."
  },
  {
    id: "lead-tampa-105",
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    phone: "(813) 555-5678",
    propertyInterest: "7823 Pine Grove Circle",
    source: "Instagram",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Preserve at Pine Grove",
    assignedTo: "Emily Wilson",
    status: "application_sent",
    lastContact: getTodayAt(11, 15)
  },
  {
    id: "lead-tampa-106",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "(813) 555-6789",
    propertyInterest: "1876 Avila Bay Drive",
    source: "Apartments.com",
    dateCreated: "2023-06-08",
    market: "Tampa",
    community: "Avila Bay",
    assignedTo: "Emily Wilson",
    status: "application_received",
    lastContact: "2023-06-10T09:30:00Z"
  },
  {
    id: "lead-atlanta-201",
    name: "Thomas Clark",
    email: "thomas.clark@example.com",
    phone: "(404) 555-1234",
    propertyInterest: "5432 Osborne Road",
    source: "Trulia",
    dateCreated: todayISO,
    market: "Atlanta",
    community: "Osborne Farms",
    assignedTo: "John Smith",
    status: "tour_scheduled",
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(11, 0) // 11:00 AM today
  },
  {
    id: "lead-atlanta-202",
    name: "Patricia Lee",
    email: "patricia.lee@example.com",
    phone: "(404) 555-2345",
    propertyInterest: "8901 Suwanee Creek Drive",
    source: "Website",
    dateCreated: todayISO,
    market: "Atlanta",
    community: "Suwanee Square",
    assignedTo: "John Smith",
    status: "new",
    lastContact: getTodayAt(8, 45)
  },
  {
    id: "lead-jacksonville-301",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "(904) 555-1234",
    propertyInterest: "3214 Sawyer's Creek Road",
    source: "Zillow",
    dateCreated: todayISO,
    market: "Jacksonville",
    community: "Sawyer's Preserve",
    assignedTo: "Lisa Johnson",
    status: "tour_scheduled",
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(14, 15) // 2:15 PM today
  }
];

// Export the current leasing agent constant
export const CURRENT_LEASING_AGENT = "Emily Wilson";

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: '1',
    leadId: '3',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    propertyInterest: '5678 Osborne Road',
    status: 'reviewing',
    dateSubmitted: '2025-03-12',
    backgroundCheck: 'approved',
    creditCheck: 'pending',
    incomeVerification: 'approved',
    assignedTo: 'Sarah Johnson',
    market: 'Atlanta',
    community: 'Osborne Farms'
  },
  {
    id: '2',
    leadId: '5',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    phone: '(555) 345-6789',
    propertyInterest: '2145 Avila Bay Drive',
    status: 'approved',
    dateSubmitted: '2025-03-10',
    backgroundCheck: 'approved',
    creditCheck: 'approved',
    incomeVerification: 'approved',
    assignedTo: 'Mike Brown',
    market: 'Tampa',
    community: 'Avila Bay'
  },
  {
    id: '3',
    leadId: '4',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    phone: '(555) 234-5678',
    propertyInterest: '3214 Sawyer\'s Creek Road',
    status: 'pending',
    dateSubmitted: '2025-03-14',
    backgroundCheck: 'pending',
    creditCheck: 'pending',
    incomeVerification: 'pending',
    assignedTo: 'Emily Wilson',
    market: 'Jacksonville',
    community: 'Sawyer\'s Preserve'
  },
  // Adding 5 more active applications
  {
    id: '4',
    leadId: 'lead-tampa-106',
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '(813) 555-6789',
    propertyInterest: '1876 Avila Bay Drive',
    status: 'reviewing',
    dateSubmitted: '2025-03-15',
    backgroundCheck: 'approved',
    creditCheck: 'pending',
    incomeVerification: 'approved',
    assignedTo: 'Emily Wilson',
    market: 'Tampa',
    community: 'Avila Bay'
  },
  {
    id: '5',
    leadId: 'lead-tampa-105',
    name: 'Maria Lopez',
    email: 'maria.lopez@example.com',
    phone: '(813) 555-5678',
    propertyInterest: '7823 Pine Grove Circle',
    status: 'pending',
    dateSubmitted: '2025-03-16',
    backgroundCheck: 'pending',
    creditCheck: 'pending',
    incomeVerification: 'pending',
    assignedTo: 'Emily Wilson',
    market: 'Tampa',
    community: 'Preserve at Pine Grove'
  },
  {
    id: '6',
    leadId: 'lead-atlanta-201',
    name: 'Thomas Clark',
    email: 'thomas.clark@example.com',
    phone: '(404) 555-1234',
    propertyInterest: '5432 Osborne Road',
    status: 'approved',
    dateSubmitted: '2025-03-11',
    backgroundCheck: 'approved',
    creditCheck: 'approved',
    incomeVerification: 'approved',
    assignedTo: 'John Smith',
    market: 'Atlanta',
    community: 'Osborne Farms'
  },
  {
    id: '7',
    leadId: 'lead-atlanta-202',
    name: 'Patricia Lee',
    email: 'patricia.lee@example.com',
    phone: '(404) 555-2345',
    propertyInterest: '8901 Suwanee Creek Drive',
    status: 'reviewing',
    dateSubmitted: '2025-03-13',
    backgroundCheck: 'approved',
    creditCheck: 'pending',
    incomeVerification: 'approved',
    assignedTo: 'John Smith',
    market: 'Atlanta',
    community: 'Suwanee Square'
  },
  {
    id: '8',
    leadId: 'lead-jacksonville-301',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '(904) 555-1234',
    propertyInterest: '3214 Sawyer\'s Creek Road',
    status: 'denied',
    dateSubmitted: '2025-03-09',
    backgroundCheck: 'denied',
    creditCheck: 'approved',
    incomeVerification: 'approved',
    assignedTo: 'Lisa Johnson',
    market: 'Jacksonville',
    community: 'Sawyer\'s Preserve'
  }
];

// Mock Tenants
export const mockTenants = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    unit: "1234 Peachtree Lane",
    leaseStart: "2024-12-15",
    leaseEnd: "2025-12-15",
    rentAmount: 1250,
    amountDQ: 0,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    unit: "4578 Magnolia Drive",
    leaseStart: "2025-03-01",
    leaseEnd: "2026-03-01",
    rentAmount: 1450,
    amountDQ: 1200,
    status: "attention_required",
    rentStatus: "delinquent",
    region: "Southeast",
    market: "Atlanta",
    community: "Suwanee Square",
    propertyManager: "John Davis"
  },
  {
    id: 3,
    name: "Jessica Williams",
    email: "jessica.williams@example.com",
    phone: "(555) 345-6789",
    unit: "789 Oakwood Circle",
    leaseStart: "2025-01-20",
    leaseEnd: "2026-01-20",
    rentAmount: 1350,
    amountDQ: 0,
    status: "active",
    rentStatus: "pending",
    region: "Southeast",
    market: "Atlanta",
    community: "Scattered",
    propertyManager: "John Davis"
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    phone: "(555) 456-7890",
    unit: "5623 Bayshore Boulevard",
    leaseStart: "2024-11-30",
    leaseEnd: "2025-11-30",
    rentAmount: 1200,
    amountDQ: 0,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Tampa",
    community: "Preserve at Pine Grove",
    propertyManager: "Emily Watson"
  },
  {
    id: 5,
    name: "Emily Taylor",
    email: "emily.taylor@example.com",
    phone: "(555) 567-8901",
    unit: "2345 Roswell Road",
    leaseStart: "2025-02-15",
    leaseEnd: "2026-02-15",
    rentAmount: 1550,
    amountDQ: 0,
    status: "attention_required",
    rentStatus: "pending",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis"
  },
  {
    id: 6,
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    phone: "(555) 678-9012",
    unit: "3456 Suwanee Creek Road",
    leaseStart: "2024-04-10",
    leaseEnd: "2025-04-10",
    rentAmount: 1300,
    amountDQ: 1500,
    status: "attention_required",
    rentStatus: "delinquent",
    region: "Southeast",
    market: "Atlanta",
    community: "Suwanee Square",
    propertyManager: "John Davis"
  },
  {
    id: 7,
    name: "Amanda Lee",
    email: "amanda.lee@example.com",
    phone: "(555) 789-0123",
    unit: "8901 Piedmont Avenue",
    leaseStart: "2025-02-28",
    leaseEnd: "2026-02-28",
    rentAmount: 1400,
    amountDQ: 700,
    status: "active",
    rentStatus: "delinquent",
    region: "Southeast",
    market: "Atlanta",
    community: "Scattered",
    propertyManager: "John Davis"
  },
  {
    id: 8,
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    phone: "(555) 890-1234",
    unit: "6789 Osborne Road",
    leaseStart: "2025-01-05",
    leaseEnd: "2026-01-05",
    rentAmount: 1500,
    amountDQ: 800,
    status: "attention_required",
    rentStatus: "delinquent",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis"
  },
  {
    id: 9,
    name: "Sophia Garcia",
    email: "sophia.garcia@example.com",
    phone: "(555) 901-2345",
    unit: "5432 McGinnis Ferry Road",
    leaseStart: "2024-05-20",
    leaseEnd: "2025-05-20",
    rentAmount: 1275,
    amountDQ: 0,
    status: "active",
    rentStatus: "pending",
    region: "Southeast",
    market: "Atlanta",
    community: "Suwanee Square",
    propertyManager: "John Davis"
  },
  {
    id: 10,
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "(555) 012-3456",
    unit: "1122 Ponce de Leon Avenue",
    leaseStart: "2025-03-15",
    leaseEnd: "2026-03-15",
    rentAmount: 1425,
    amountDQ: 0,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Scattered",
    propertyManager: "John Davis"
  },
  // Adding 5 more tenants for other property managers
  {
    id: 11,
    name: "Olivia Thompson",
    email: "olivia.thompson@example.com",
    phone: "(555) 123-4567",
    unit: "7890 Avila Circle",
    leaseStart: "2025-02-10",
    leaseEnd: "2026-02-10",
    rentAmount: 1225,
    amountDQ: 0,
    status: "active",
    rentStatus: "pending",
    region: "Southeast",
    market: "Tampa",
    community: "Avila Bay",
    propertyManager: "Emily Watson"
  },
  {
    id: 12,
    name: "William Brown",
    email: "william.brown@example.com",
    phone: "(555) 234-5678",
    unit: "4321 Belmont Shores Drive",
    leaseStart: "2025-01-25",
    leaseEnd: "2026-01-25",
    rentAmount: 1475,
    amountDQ: 2950,
    status: "attention_required",
    rentStatus: "delinquent",
    region: "Southeast",
    market: "Tampa",
    community: "Belmont",
    propertyManager: "Emily Watson"
  },
  {
    id: 13,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "(555) 345-6789",
    unit: "9876 Sawyer Lane",
    leaseStart: "2024-04-05",
    leaseEnd: "2025-04-05",
    rentAmount: 1375,
    amountDQ: 0,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Jacksonville",
    community: "Sawyer's Preserve",
    propertyManager: "Michael Roberts"
  },
  {
    id: 14,
    name: "Alexander Martin",
    email: "alexander.martin@example.com",
    phone: "(555) 456-7890",
    unit: "5544 Riverside Drive",
    leaseStart: "2024-03-20",
    leaseEnd: "2025-03-20",
    rentAmount: 1250,
    amountDQ: 1875,
    status: "attention_required",
    rentStatus: "delinquent",
    region: "Southeast",
    market: "Jacksonville",
    community: "Scattered",
    propertyManager: "Michael Roberts"
  },
  {
    id: 15,
    name: "Isabella Clark",
    email: "isabella.clark@example.com",
    phone: "(555) 567-8901",
    unit: "3210 Lake Eola Drive",
    leaseStart: "2024-05-15",
    leaseEnd: "2025-05-15",
    rentAmount: 1500,
    amountDQ: 0,
    status: "active",
    rentStatus: "pending",
    region: "Southeast",
    market: "Orlando",
    community: "Scattered",
    propertyManager: "Lisa Johnson"
  },
  {
    id: "t31",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "(555) 123-7890",
    unit: "2145 Peachtree Rd",
    leaseStart: "2024-08-15",
    leaseEnd: "2025-08-15",
    rentAmount: 1450,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t32",
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    phone: "(555) 234-8901",
    unit: "387 Oak Drive",
    leaseStart: "2025-09-01",
    leaseEnd: "2025-09-01",
    rentAmount: 1675,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Suwanee Square",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t33",
    name: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    phone: "(555) 345-9012",
    unit: "4521 Maple Avenue",
    leaseStart: "2024-07-31",
    leaseEnd: "2025-07-31",
    rentAmount: 1550,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t34",
    name: "Jamal Washington",
    email: "j.washington@example.com",
    phone: "(555) 456-0123",
    unit: "782 Piedmont Way",
    leaseStart: "2024-10-15",
    leaseEnd: "2025-10-15",
    rentAmount: 1350,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Scattered",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t35",
    name: "Olivia Kim",
    email: "olivia.kim@example.com",
    phone: "(555) 567-1234",
    unit: "1290 Ponce de Leon Ave",
    leaseStart: "2024-11-01",
    leaseEnd: "2025-11-01",
    rentAmount: 1725,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Suwanee Square",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t36",
    name: "Daniel Patel",
    email: "daniel.p@example.com",
    phone: "(555) 678-2345",
    unit: "3456 Roswell Road",
    leaseStart: "2024-08-31",
    leaseEnd: "2025-08-31",
    rentAmount: 1600,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t37",
    name: "Zoe Martinez",
    email: "zoe.m@example.com",
    phone: "(555) 789-3456",
    unit: "567 Peachtree Battle Ave",
    leaseStart: "2024-09-15",
    leaseEnd: "2025-09-15",
    rentAmount: 1400,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Scattered",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t38",
    name: "Benjamin Lee",
    email: "ben.lee@example.com",
    phone: "(555) 890-4567",
    unit: "8901 Lenox Road",
    leaseStart: "2024-10-01",
    leaseEnd: "2025-10-01",
    rentAmount: 1650,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Suwanee Square",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t39",
    name: "Amara Johnson",
    email: "amara.j@example.com",
    phone: "(555) 901-5678",
    unit: "2345 Howell Mill Road",
    leaseStart: "2024-07-15",
    leaseEnd: "2025-07-15",
    rentAmount: 1500,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t40",
    name: "Noah Garcia",
    email: "noah.g@example.com",
    phone: "(555) 012-6789",
    unit: "6789 Northside Drive",
    leaseStart: "2024-11-30",
    leaseEnd: "2025-11-30",
    rentAmount: 1375,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Scattered",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t41",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "(555) 123-4567",
    unit: "4210 Briarcliff Road",
    leaseStart: "2024-06-01",
    leaseEnd: "2025-06-01",
    rentAmount: 1525,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t42",
    name: "Jackson Williams",
    email: "jackson.w@example.com",
    phone: "(555) 234-5678",
    unit: "1845 Clifton Road",
    leaseStart: "2024-07-15",
    leaseEnd: "2025-07-15",
    rentAmount: 1700,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Suwanee Square",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t43",
    name: "Aiden Thompson",
    email: "aiden.t@example.com",
    phone: "(555) 345-6789",
    unit: "3678 Buford Highway",
    leaseStart: "2024-08-01",
    leaseEnd: "2025-08-01",
    rentAmount: 1475,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Scattered",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t44",
    name: "Maya Patel",
    email: "maya.patel@example.com",
    phone: "(555) 456-7890",
    unit: "2190 North Druid Hills Road",
    leaseStart: "2024-09-15",
    leaseEnd: "2025-09-15",
    rentAmount: 1625,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Osborne Farms",
    propertyManager: "John Davis",
    amountDQ: 0
  },
  {
    id: "t45",
    name: "Elijah Robinson",
    email: "elijah.r@example.com",
    phone: "(555) 567-8901",
    unit: "5432 Chamblee Dunwoody Road",
    leaseStart: "2024-10-01",
    leaseEnd: "2025-10-01",
    rentAmount: 1550,
    status: "active",
    rentStatus: "paid",
    region: "Southeast",
    market: "Atlanta",
    community: "Suwanee Square",
    propertyManager: "John Davis",
    amountDQ: 0
  }
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
    dateSubmitted: '2025-03-10T09:00:00',
    status: 'pending',
    priority: 'normal',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2025-03-18T10:30:00',
    endDate: '2025-03-18T12:30:00',
    community: 'Avila Bay',
    type: 'maintenance',
    market: 'Tampa'
  },
  {
    id: '2',
    tenantId: '3',
    tenantName: 'Thomas White',
    unit: 'Sunset 304',
    issue: 'HVAC not cooling',
    description: 'Air conditioner is running but not cooling the apartment.',
    dateSubmitted: '2025-03-12T11:15:00',
    status: 'scheduled',
    priority: 'urgent',
    assignedTo: 'Alex Rodriguez',
    scheduledDate: '2025-03-15T09:00:00',
    endDate: '2025-03-15T11:00:00',
    community: 'Belmont',
    type: 'maintenance',
    market: 'Tampa'
  },
  {
    id: '3',
    tenantId: '2',
    tenantName: 'Jennifer Lopez',
    unit: 'Riverfront 205',
    issue: 'Broken garbage disposal',
    description: 'Garbage disposal makes loud noise but doesn\'t work.',
    dateSubmitted: '2025-03-08T14:20:00',
    status: 'completed',
    priority: 'urgent',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2025-03-11T13:00:00',
    endDate: '2025-03-11T15:00:00',
    community: 'Preserve at Pine Grove',
    type: 'maintenance',
    market: 'Tampa'
  },
  {
    id: '4',
    tenantId: '5',
    tenantName: 'James Taylor',
    unit: 'Riverfront 110',
    issue: 'Clogged toilet',
    description: 'Toilet in the master bathroom is clogged and won\'t flush properly.',
    dateSubmitted: '2025-03-14T08:45:00',
    status: 'pending',
    priority: 'normal',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2025-03-14T09:45:00',
    endDate: '2025-03-14T11:45:00',
    community: 'Scattered',
    type: 'maintenance',
    market: 'Orlando'
  },
  {
    id: '5',
    tenantId: '4',
    tenantName: 'Patricia Martinez',
    unit: 'Oakwood 205',
    issue: 'Smoke detector beeping',
    description: 'Smoke detector is beeping intermittently, likely needs battery replacement.',
    dateSubmitted: '2025-03-13T16:30:00',
    status: 'scheduled',
    priority: 'low',
    assignedTo: 'Alex Rodriguez',
    scheduledDate: '2025-03-19T15:00:00',
    endDate: '2025-03-19T16:00:00',
    community: 'Osborne Farms',
    type: 'maintenance',
    market: 'Atlanta'
  },
];

// Mock AI Conversations
export const mockAIConversations: AIConversation[] = [
  {
    id: '1',
    contactName: 'John Smith',
    channel: 'voice' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-12T14:32',
    summary: 'Inquired about 2-bedroom house availability and pricing near Riverview, FL. Wants to visit 123 Maple Street on Saturday, March 15th at 1:00 PM.',
    transcript: `AI: Hello, thank you for calling PropertyAI. How can I assist you today?
John: Hi, I'm looking for information about 2-bedroom houses near Riverview or in the Tampa area.
AI: I'd be happy to help! We currently have two 2-bedroom houses available in the Riverview area. The first one is located at 123 Maple Street, Riverview, FL, and rents for $1,900 per month. House #2 is located at 456 Oakview Drive, Riverview, FL, and rents for $2,100 per month. Would you like to hear more about their amenities?
John: That sounds great. Yes sure!
AI: Of course. Both houses include updated kitchens with stainless steel appliances and quartz countertops, in-unit washer and dryer, and private driveways for convenient parking. Each also offers spacious living areas and bedrooms. The second house also features a nice sunroom and a renovated master bathroom. Would you like to schedule a tour of either house?
John: That sounds good. Let's do the first one the second one is a bit out of budget for me. Do you have any availability next weekend?
AI: Let me check our calendar. Yes, we have tour slots available next Saturday at 10:00 AM, 1:00 PM, and 3:00 PM, or Sunday at 1:00 PM and 3:00 PM. Would any of those times work for you?
John: Saturday at 1 PM would be perfect.
AI: Great! I'll schedule you for a tour of 123 Maple Street on Saturday, March 15th at 1:00 PM. Could I get your full name, email, and phone number to confirm the appointment?
John: Sure. It's John Smith, john.smith@email.com, and my phone number is 555-123-4567.
AI: Thank you, John. I've got you scheduled for Saturday, March 15th at 1:00 PM. You'll receive a confirmation email shortly with the details and directions to both houses. Is there anything else I can help you with today?
John: No, that's all. Thank you!
AI: You're welcome, John. We look forward to seeing you on Saturday. Feel free to call back if you have any other questions. Have a great day!`,
    sentiment: 'positive',
    actionItems: [
      'Will tour 123 Maple Street',
      'Scheduled tour for Saturday, March 15th at 1:00 PM',
      'Sent confirmation email with property details',
      'Added to Yardi'
    ],
    scenario: 'leasing/lead',
    systemLinks: {
      yardi: 'https://www.yardi.com/',
      calendar: 'https://calendar.google.com/calendar/u/0/r?pli=1',
      posting: 'https://www.brandywinehomesusa.com/'
    }
  },
  {
    id: '2',
    contactName: 'Jennifer Lee',
    channel: 'email' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-11T09:15:00',
    summary: 'Requested information about application process and required documentation for Maple Ridge townhomes.',
    transcript: `AI: Hello Jennifer, thank you for your inquiry about the application process for Maple Ridge townhomes. I'm happy to provide you with the information you need.
Jennifer: Hi, I'm interested in applying for a townhome at Maple Ridge. What documents do I need to prepare and what is the application fee?
AI: For the Maple Ridge townhomes application, you'll need to provide the following documents: government-issued ID, proof of income (last 3 pay stubs or offer letter), last 2 months of bank statements, and contact information for previous landlords. The application fee is $50 per applicant, and there's a $150 administrative fee if approved. Would you like me to send you the online application link?
Jennifer: Yes, please send me the link. How long does the approval process take?
AI: I've sent the application link to your email. The approval process typically takes 2-3 business days from the time we receive your completed application and all required documents. We'll run a credit and background check, verify your employment and rental history. Is there a specific move-in date you're considering?
Jennifer: I'm hoping to move in by April 1st if possible.
AI: Thank you for sharing your preferred move-in date. Based on our current availability, we do have units that would be ready for an April 1st move-in. Once your application is approved, we can work to secure one of those units for you. Is there anything specific you're looking for in terms of floor plan or location within the community?
Jennifer: I'd prefer a 2-bedroom with a garage if available.
AI: We do have 2-bedroom townhomes with attached garages available for April 1st move-in. They're 1,250 square feet with 2.5 bathrooms and start at $2,100 per month. I've updated your profile with this preference. Is there anything else you'd like to know about the application process or the property?
Jennifer: That's all for now, thank you for your help!
AI: You're welcome, Jennifer! If you have any questions while completing your application, please don't hesitate to reach out. We look forward to receiving your application and hopefully welcoming you to Maple Ridge soon. Have a great day!`,
    sentiment: 'positive',
    actionItems: [
      'Send application link via email',
      'Update CRM with preference for 2-bedroom with garage',
      'Follow up in 2 days if application not received'
    ],
    scenario: 'operations/renewal',
    systemLinks: {
      yardi: 'https://www.yardi.com/',
      calendar: 'https://calendar.google.com/calendar/u/0/r?pli=1',
      posting: 'https://www.brandywinehomesusa.com/'
    }
  },
  {
    id: '3',
    contactName: 'Thomas Wilson',
    channel: 'sms' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-10T16:45:00',
    summary: 'Maintenance request for leaking faucet in master bathroom. Scheduled repair for tomorrow between 1-3 PM.',
    transcript: `AI: Hello! This is PropertyAI from Oakwood Apartments. How can I assist you today?
Thomas: Hi, the faucet in my master bathroom is leaking and getting worse.
AI: I'm sorry to hear about the leaking faucet. I'd be happy to help get that fixed for you. Could you please confirm your apartment number so I can create a maintenance request?
Thomas: It's apartment 304.
AI: Thank you for confirming, Mr. Wilson in apartment 304. I've created a maintenance request for the leaking faucet in your master bathroom. Our maintenance team has availability tomorrow between 9-11 AM or 1-3 PM. Would either of those time slots work for you?
Thomas: 1-3 PM works better for me.
AI: Perfect. I've scheduled the maintenance visit for tomorrow between 1-3 PM. Our technician will call about 15 minutes before arriving. Is there anything else about the issue that would be helpful for our maintenance team to know?
Thomas: No, it's just a constant drip that's getting faster.
AI: Thank you for that information. I've added those details to the work order. You'll receive a confirmation text with the scheduled time, and another notification when the work is complete. Is there anything else I can assist you with today?
Thomas: No that's it, thanks!
AI: You're welcome! If you need anything else, feel free to text us anytime. Have a great day!`,
    sentiment: 'neutral',
    actionItems: [
      'Create maintenance work order for leaking faucet',
      'Schedule repair for tomorrow 1-3 PM',
      'Send confirmation text with scheduled time'
    ],
    scenario: 'maintenance/maintenance-requests',
    systemLinks: {
      yardi: 'https://www.yardi.com/',
      calendar: 'https://calendar.google.com/calendar/u/0/r?pli=1',
      maintenance: 'https://example.com/maintenance-portal/requests/34567'
    }
  },
  {
    id: '4',
    contactName: 'Sarah Johnson',
    channel: 'voice' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-09T13:20:00',
    summary: 'Discussed lease renewal options and negotiated a 14-month lease with $50 rent increase instead of the standard $100 increase.',
    transcript: `AI: Hello, thank you for calling PropertyAI. How can I assist you today?
Sarah: Hi, this is Sarah Johnson from apartment 512. I received a lease renewal notice and wanted to discuss the options.
AI: Hello Ms. Johnson, I'd be happy to discuss your lease renewal options. I see your current lease for apartment 512 at Parkview Apartments is set to expire on April 30th, 2025. We're offering a 12-month renewal with a $100 monthly increase, or a 6-month renewal with a $150 monthly increase. Which option were you considering?
Sarah: The $100 increase seems high. I've been a good tenant for two years now. Is there any way to reduce that?
AI: I understand your concern about the increase, Ms. Johnson. You're right that you've been a valued resident for two years with on-time payments and no issues. Based on your good standing, I could offer you a 14-month lease with only a $50 monthly increase. Would that be more agreeable?
Sarah: That sounds much better. I'd be interested in the 14-month option.
AI: Excellent. I'll prepare the 14-month lease renewal with the $50 monthly increase. Your new lease would run from May 1st, 2025 to June 30th, 2026, and your new monthly rent would be $1,750. I can send the renewal documents to your email for electronic signature. Is the email we have on file still current?
Sarah: Yes, my email is still the same.
AI: Perfect. I'll send the lease renewal documents to your email today. You'll have until March 25th to review and sign them. Is there anything else you'd like to discuss about your renewal or any questions about the process?
Sarah: No, that covers everything. Thank you for working with me on the price.
AI: You're very welcome, Ms. Johnson. We value you as a resident and appreciate your continued residency at Parkview Apartments. You should receive the renewal documents in your email within the next hour. Please don't hesitate to call if you have any questions after reviewing them. Have a wonderful day!`,
    sentiment: 'positive',
    actionItems: [
      'Prepare 14-month lease renewal with $50 increase',
      'Send renewal documents for electronic signature',
      'Update CRM with negotiated terms'
    ],
    scenario: 'operations/renewal',
    systemLinks: {
      yardi: 'https://www.yardi.com/',
      calendar: 'https://calendar.google.com/calendar/u/0/r?pli=1',
      leases: 'https://example.com/lease-portal/renewals/67890'
    }
  },
  {
    id: '5',
    contactName: 'Michael Chen',
    channel: 'voice' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-08T11:10:00',
    summary: 'Provided move-out instructions and scheduled final inspection for March 31st at 10:00 AM.',
    transcript: `AI: Hello, thank you for calling PropertyAI. How can I assist you today?
Michael: Hi, I need information about moving out. My lease ends next month.
AI: I'd be happy to help you with the move-out process. Could you please provide your name and apartment number so I can pull up your information?
Michael: Michael Chen, apartment 721.
AI: Thank you, Mr. Chen. I see that your lease for apartment 721 at Lakeside Apartments is set to end on March 31st, 2025. To ensure a smooth move-out process, I'd like to go over some important details with you. First, would you like to schedule your final inspection?
Michael: Yes, that would be helpful.
AI: We have availability on March 31st at 10:00 AM, 1:00 PM, or 4:00 PM for the final inspection. Would any of those times work for you?
Michael: 10:00 AM works best.
AI: Great, I've scheduled your final inspection for March 31st at 10:00 AM. Please ensure all your belongings are removed before this time. For a full refund of your security deposit, the apartment should be cleaned according to our move-out checklist, which I'll email to you. This includes cleaning appliances, floors, bathrooms, and walls. All keys, fobs, and parking permits must be returned at the final inspection. Do you have any questions about the cleaning requirements?
Michael: No, but when will I receive my security deposit back?
AI: Your security deposit will be processed within 30 days of your move-out date, assuming there are no damages beyond normal wear and tear. We'll mail the refund to your forwarding address. Could you please provide your forwarding address where we should send your security deposit?
Michael: Yes, it's 835 Pine Street, Apt 205, Westlake, CA 90210.
AI: Thank you. I've noted your forwarding address as 835 Pine Street, Apt 205, Westlake, CA 90210. I'll send you an email confirmation of your final inspection appointment and the move-out checklist. Is there anything else I can assist you with regarding your move-out?
Michael: That's all for now, thanks.
AI: You're welcome, Mr. Chen. If you have any other questions before your move-out date, please don't hesitate to contact us. We wish you all the best in your new home. Have a great day!`,
    sentiment: 'neutral',
    actionItems: [
      'Schedule final inspection for March 31st at 10:00 AM',
      'Send move-out checklist via email',
      'Update system with forwarding address'
    ],
    scenario: 'operations/moveout-notice',
    systemLinks: {
      yardi: 'https://www.yardi.com/',
      calendar: 'https://calendar.google.com/calendar/u/0/r?pli=1',
      moveout: 'https://example.com/resident-portal/moveout/01234'
    }
  }
];

// Mock Rent Payments
export const mockRentPayments: RentPayment[] = [
  {
    id: '1',
    tenantId: '1',
    tenantName: 'Robert Garcia',
    unit: 'Oakwood 101',
    amount: 1450,
    dueDate: '2025-03-01',
    datePaid: '2025-03-01',
    status: 'paid',
    paymentMethod: 'bank',
  },
  {
    id: '2',
    tenantId: '2',
    tenantName: 'Jennifer Lopez',
    unit: 'Riverfront 205',
    amount: 1700,
    dueDate: '2025-03-01',
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
    dueDate: '2025-03-01',
    datePaid: null,
    status: 'delinquent',
    paymentMethod: null,
  },
  {
    id: '4',
    tenantId: '4',
    tenantName: 'Patricia Martinez',
    unit: 'Oakwood 205',
    amount: 1500,
    dueDate: '2025-03-01',
    datePaid: '2025-02-28',
    status: 'paid',
    paymentMethod: 'card',
  },
  {
    id: '5',
    tenantId: '5',
    tenantName: 'James Taylor',
    unit: 'Riverfront 110',
    amount: 1650,
    dueDate: '2025-03-01',
    datePaid: '2025-02-27',
    status: 'paid',
    paymentMethod: 'bank',
  },
];

// Mock Metrics Data
export const mockDashboardMetrics: MetricData[] = [
  {
    kpi: 'number_of_homes',
    label: 'Number of Homes',
    value: 5121,
    change: 5.0,
    status: 'increase_good',
    markets: {
      Atlanta: { value: 1850, change: 6.1, status: 'increase_good' },
      Tampa: { value: 1425, change: 4.8, status: 'increase_good' },
      Jacksonville: { value: 1021, change: 3.9, status: 'increase_good' },
      Orlando: { value: 825, change: 5.5, status: 'increase_good' }
    },
    communities: {
      'Atlanta/Osborne Farms': { value: 750, change: 7.2, status: 'increase_good' },
      'Atlanta/Suwanee Square': { value: 680, change: 5.8, status: 'increase_good' },
      'Atlanta/Scattered': { value: 420, change: 4.5, status: 'increase_good' },
      'Tampa/Preserve at Pine Grove': { value: 450, change: 5.1, status: 'increase_good' },
      'Tampa/Avila Bay': { value: 380, change: 4.9, status: 'increase_good' },
      'Tampa/Belmont': { value: 325, change: 4.2, status: 'increase_good' },
      'Tampa/Scattered': { value: 270, change: 4.8, status: 'increase_good' },
      'Jacksonville/Sawyer\'s Preserve': { value: 680, change: 4.1, status: 'increase_good' },
      'Jacksonville/Scattered': { value: 341, change: 3.5, status: 'increase_good' },
      'Orlando/Scattered': { value: 825, change: 5.5, status: 'increase_good' }
    }
  },
  {
    kpi: 'average_rent',
    label: 'Average Rent (USD)',
    value: 1865,
    change: 3.9,
    status: 'increase_good',
    markets: {
      Atlanta: { value: 1950, change: 4.2, status: 'increase_good' },
      Tampa: { value: 1875, change: 3.9, status: 'increase_good' },
      Jacksonville: { value: 1725, change: 3.5, status: 'increase_good' },
      Orlando: { value: 1850, change: 3.6, status: 'increase_good' }
    },
    communities: {
      'Atlanta/Osborne Farms': { value: 2100, change: 4.5, status: 'increase_good' },
      'Atlanta/Suwanee Square': { value: 1950, change: 4.2, status: 'increase_good' },
      'Atlanta/Scattered': { value: 1800, change: 3.8, status: 'increase_good' },
      'Tampa/Preserve at Pine Grove': { value: 1950, change: 4.1, status: 'increase_good' },
      'Tampa/Avila Bay': { value: 1890, change: 3.9, status: 'increase_good' },
      'Tampa/Belmont': { value: 1850, change: 3.7, status: 'increase_good' },
      'Tampa/Scattered': { value: 1810, change: 3.8, status: 'increase_good' },
      'Jacksonville/Sawyer\'s Preserve': { value: 1775, change: 3.6, status: 'increase_good' },
      'Jacksonville/Scattered': { value: 1675, change: 3.4, status: 'increase_good' },
      'Orlando/Scattered': { value: 1850, change: 3.6, status: 'increase_good' }
    }
  },
  {
    kpi: 'occupancy',
    label: 'Monthly Occupancy',
    value: 92.6,
    change: 0.1,
    status: 'increase_good',  // Higher occupancy is good
    markets: {
      Atlanta: { value: 93.6, change: 1.2, status: 'increase_good' },
      Tampa: { value: 92.1, change: -0.8, status: 'decrease_bad' },
      Jacksonville: { value: 92.8, change: -0.9, status: 'decrease_bad' },
      Orlando: { value: 93.4, change: 0.9, status: 'increase_good' }
    },
    communities: {
      'Atlanta/Osborne Farms': { value: 94.0, change: 1.5, status: 'increase_good' },
      'Atlanta/Suwanee Square': { value: 93.2, change: 1.0, status: 'increase_good' },
      'Atlanta/Scattered': { value: 93.5, change: 1.3, status: 'increase_good' },
      'Tampa/Preserve at Pine Grove': { value: 91.0, change: -1.0, status: 'decrease_bad' },
      'Tampa/Avila Bay': { value: 92.0, change: -0.5, status: 'decrease_bad' },
      'Tampa/Belmont': { value: 91.5, change: -0.8, status: 'decrease_bad' },
      'Tampa/Scattered': { value: 91.8, change: -0.6, status: 'decrease_bad' },
      'Jacksonville/Sawyer\'s Preserve': { value: 92.5, change: -0.7, status: 'decrease_bad' },
      'Jacksonville/Scattered': { value: 92.9, change: -0.5, status: 'decrease_bad' },
      'Orlando/Scattered': { value: 93.4, change: 0.9, status: 'increase_good' }
    }
  },
  {
    kpi: 'delinquency',
    label: 'Delinqu. (% billed rent)',
    value: 3.3,
    change: 0.2,
    status: 'increase_bad',
    markets: {
      Atlanta: { value: 2.8, change: -0.2, status: 'decrease_good' },
      Tampa: { value: 3.3, change: 0.5, status: 'increase_bad' },
      Jacksonville: { value: 3.6, change: 0.2, status: 'increase_bad' },
      Orlando: { value: 3.2, change: -0.5, status: 'decrease_good' }
    },
    communities: {
      'Atlanta/Osborne Farms': { value: 2.7, change: -0.3, status: 'decrease_good' },
      'Atlanta/Suwanee Square': { value: 2.9, change: -0.1, status: 'decrease_good' },
      'Atlanta/Scattered': { value: 2.8, change: -0.2, status: 'decrease_good' },
      'Tampa/Preserve at Pine Grove': { value: 3.4, change: 0.4, status: 'increase_bad' },
      'Tampa/Avila Bay': { value: 3.5, change: 0.6, status: 'increase_bad' },
      'Tampa/Belmont': { value: 3.3, change: 0.5, status: 'increase_bad' },
      'Tampa/Scattered': { value: 3.6, change: 0.7, status: 'increase_bad' },
      'Jacksonville/Sawyer\'s Preserve': { value: 3.5, change: 0.3, status: 'increase_bad' },
      'Jacksonville/Scattered': { value: 3.7, change: 0.4, status: 'increase_bad' },
      'Orlando/Scattered': { value: 3.1, change: -0.4, status: 'decrease_good' }
    }
  },
  {
    kpi: 'renewals',
    label: 'Renewals (%)',
    value: 70.0,
    change: -0.2,
    status: 'increase_good',  // Decreasing renewals is bad
    markets: {
      Atlanta: { value: 71.9, change: 1.4, status: 'increase_good' },
      Tampa: { value: 70.2, change: -1.6, status: 'decrease_bad' },
      Jacksonville: { value: 67.5, change: -1.4, status: 'decrease_bad' },
      Orlando: { value: 69.8, change: 2.6, status: 'increase_good' }
    },
    communities: {
      'Atlanta/Osborne Farms': { value: 72.0, change: 1.5, status: 'increase_good' },
      'Atlanta/Suwanee Square': { value: 71.5, change: 1.2, status: 'increase_good' },
      'Atlanta/Scattered': { value: 71.8, change: 1.3, status: 'increase_good' },
      'Tampa/Preserve at Pine Grove': { value: 69.0, change: -1.8, status: 'decrease_bad' },
      'Tampa/Avila Bay': { value: 70.0, change: -1.5, status: 'decrease_bad' },
      'Tampa/Belmont': { value: 70.5, change: -1.4, status: 'decrease_bad' },
      'Tampa/Scattered': { value: 70.8, change: -1.3, status: 'decrease_bad' },
      'Jacksonville/Sawyer\'s Preserve': { value: 67.0, change: -1.5, status: 'decrease_bad' },
      'Jacksonville/Scattered': { value: 67.8, change: -1.3, status: 'decrease_bad' },
      'Orlando/Scattered': { value: 69.5, change: 2.5, status: 'increase_good' }
    }
  },
  {
    kpi: 'rent-increase',
    label: 'Rent Increase (%)',
    value: 5.8,
    change: 0.7,
    status: 'increase_good',  // Too high rent increases might lead to more move-outs
    markets: {
      Atlanta: { value: 6.2, change: 0.9, status: 'increase_good' },
      Tampa: { value: 5.9, change: 0.8, status: 'increase_good' },
      Jacksonville: { value: 5.4, change: 0.5, status: 'increase_good' },
      Orlando: { value: 5.7, change: 0.6, status: 'increase_good' }
    },
    communities: {
      'Atlanta/Osborne Farms': { value: 6.5, change: 1.0, status: 'increase_good' },
      'Atlanta/Suwanee Square': { value: 6.0, change: 0.8, status: 'increase_good' },
      'Atlanta/Scattered': { value: 6.3, change: 0.9, status: 'increase_good' },
      'Tampa/Preserve at Pine Grove': { value: 5.8, change: 0.7, status: 'increase_good' },
      'Tampa/Avila Bay': { value: 5.7, change: 0.6, status: 'increase_good' },
      'Tampa/Belmont': { value: 5.6, change: 0.5, status: 'increase_good' },
      'Tampa/Scattered': { value: 5.9, change: 0.8, status: 'increase_good' },
      'Jacksonville/Sawyer\'s Preserve': { value: 5.5, change: 0.6, status: 'increase_good' },
      'Jacksonville/Scattered': { value: 5.3, change: 0.4, status: 'increase_good' },
      'Orlando/Scattered': { value: 5.6, change: 0.5, status: 'increase_good' }
    }
  }
];

export const mockLeadMetrics: MetricData[] = [
  {
    kpi:'renewals',
    label: '% Renewals trend',
    value: 68.5,
    change: 4.2,
    status: 'increase_good',
    markets: {
      Atlanta: { value: 68.5, change: 4.2, status: 'increase_good' },
      Tampa: { value: 68.5, change: 4.2, status: 'increase_good' },
      Jacksonville: { value: 68.5, change: 4.2, status: 'increase_good' },
      Orlando: { value: 68.5, change: 4.2, status: 'increase_good' }
    },
    communities: {
      'Atlanta/Osborne Farms': { value: 68.0, change: 4.0, status: 'increase_good' },
      'Atlanta/Suwanee Square': { value: 68.2, change: 4.1, status: 'increase_good' },
      'Atlanta/Scattered': { value: 68.3, change: 4.2, status: 'increase_good' },
      'Tampa/Preserve at Pine Grove': { value: 68.4, change: 4.3, status: 'increase_good' },
      'Tampa/Avila Bay': { value: 68.1, change: 4.0, status: 'increase_good' },
      'Tampa/Belmont': { value: 68.2, change: 4.1, status: 'increase_good' },
      'Tampa/Scattered': { value: 68.3, change: 4.2, status: 'increase_good' },
      'Jacksonville/Sawyer\'s Preserve': { value: 68.4, change: 4.3, status: 'increase_good' },
      'Jacksonville/Scattered': { value: 68.0, change: 4.0, status: 'increase_good' },
      'Orlando/Scattered': { value: 68.5, change: 4.2, status: 'increase_good' }
    }
  }
];

export const mockOperationMetrics: MetricData[] = [];

// Mock Renewals Trend Data
export const mockRenewalsTrendData = [
  { month: 'Mar 24', Atlanta: 68.4, Tampa: 71.2, Jacksonville: 69.1, Orlando: 72.3, Average: 70.2, 'Atlanta/Osborne Farms': 70.0, 'Atlanta/Suwanee Square': 67.5, 'Atlanta/Scattered': 68.0, 'Tampa/Preserve at Pine Grove': 72.0, 'Tampa/Avila Bay': 70.5, 'Tampa/Belmont': 71.0, 'Tampa/Scattered': 71.5, 'Jacksonville/Sawyer\'s Preserve': 69.0, 'Jacksonville/Scattered': 69.2, 'Orlando/Scattered': 72.3 },
  { month: 'Apr 24', Atlanta: 69.8, Tampa: 70.5, Jacksonville: 67.2, Orlando: 71.9, Average: 69.9, 'Atlanta/Osborne Farms': 71.0, 'Atlanta/Suwanee Square': 68.5, 'Atlanta/Scattered': 69.0, 'Tampa/Preserve at Pine Grove': 71.5, 'Tampa/Avila Bay': 70.0, 'Tampa/Belmont': 70.8, 'Tampa/Scattered': 70.9, 'Jacksonville/Sawyer\'s Preserve': 68.5, 'Jacksonville/Scattered': 68.8, 'Orlando/Scattered': 71.9 },
  { month: 'May 24', Atlanta: 70.5, Tampa: 69.8, Jacksonville: 68.0, Orlando: 72.0, Average: 70.1, 'Atlanta/Osborne Farms': 71.5, 'Atlanta/Suwanee Square': 69.0, 'Atlanta/Scattered': 69.5, 'Tampa/Preserve at Pine Grove': 71.0, 'Tampa/Avila Bay': 69.5, 'Tampa/Belmont': 70.5, 'Tampa/Scattered': 70.4, 'Jacksonville/Sawyer\'s Preserve': 68.0, 'Jacksonville/Scattered': 68.3, 'Orlando/Scattered': 72.0 },
  { month: 'Jun 24', Atlanta: 71.0, Tampa: 70.0, Jacksonville: 67.5, Orlando: 71.5, Average: 70.0, 'Atlanta/Osborne Farms': 72.0, 'Atlanta/Suwanee Square': 69.5, 'Atlanta/Scattered': 70.0, 'Tampa/Preserve at Pine Grove': 70.5, 'Tampa/Avila Bay': 69.0, 'Tampa/Belmont': 70.0, 'Tampa/Scattered': 70.2, 'Jacksonville/Sawyer\'s Preserve': 67.5, 'Jacksonville/Scattered': 67.8, 'Orlando/Scattered': 71.5 },
  { month: 'Jul 24', Atlanta: 70.8, Tampa: 70.2, Jacksonville: 67.8, Orlando: 71.2, Average: 70.0, 'Atlanta/Osborne Farms': 71.8, 'Atlanta/Suwanee Square': 69.2, 'Atlanta/Scattered': 69.8, 'Tampa/Preserve at Pine Grove': 70.2, 'Tampa/Avila Bay': 69.2, 'Tampa/Belmont': 70.2, 'Tampa/Scattered': 70.1, 'Jacksonville/Sawyer\'s Preserve': 67.8, 'Jacksonville/Scattered': 68.0, 'Orlando/Scattered': 71.2 },
  { month: 'Aug 24', Atlanta: 71.2, Tampa: 70.5, Jacksonville: 68.2, Orlando: 71.8, Average: 70.4, 'Atlanta/Osborne Farms': 72.2, 'Atlanta/Suwanee Square': 69.8, 'Atlanta/Scattered': 70.2, 'Tampa/Preserve at Pine Grove': 70.8, 'Tampa/Avila Bay': 69.8, 'Tampa/Belmont': 70.8, 'Tampa/Scattered': 70.5, 'Jacksonville/Sawyer\'s Preserve': 68.2, 'Jacksonville/Scattered': 68.5, 'Orlando/Scattered': 71.8 },
  { month: 'Sep 24', Atlanta: 71.5, Tampa: 70.8, Jacksonville: 68.5, Orlando: 72.0, Average: 70.7, 'Atlanta/Osborne Farms': 72.5, 'Atlanta/Suwanee Square': 70.0, 'Atlanta/Scattered': 70.5, 'Tampa/Preserve at Pine Grove': 71.0, 'Tampa/Avila Bay': 70.0, 'Tampa/Belmont': 71.0, 'Tampa/Scattered': 70.7, 'Jacksonville/Sawyer\'s Preserve': 68.5, 'Jacksonville/Scattered': 68.7, 'Orlando/Scattered': 72.0 },
  { month: 'Oct 24', Atlanta: 71.8, Tampa: 71.0, Jacksonville: 68.8, Orlando: 72.2, Average: 70.9, 'Atlanta/Osborne Farms': 72.8, 'Atlanta/Suwanee Square': 70.2, 'Atlanta/Scattered': 70.8, 'Tampa/Preserve at Pine Grove': 71.2, 'Tampa/Avila Bay': 70.2, 'Tampa/Belmont': 71.2, 'Tampa/Scattered': 70.9, 'Jacksonville/Sawyer\'s Preserve': 68.8, 'Jacksonville/Scattered': 68.9, 'Orlando/Scattered': 72.2 },
  { month: 'Nov 24', Atlanta: 72.0, Tampa: 71.2, Jacksonville: 69.0, Orlando: 72.5, Average: 71.1, 'Atlanta/Osborne Farms': 73.0, 'Atlanta/Suwanee Square': 70.5, 'Atlanta/Scattered': 71.0, 'Tampa/Preserve at Pine Grove': 71.5, 'Tampa/Avila Bay': 70.5, 'Tampa/Belmont': 71.5, 'Tampa/Scattered': 71.1, 'Jacksonville/Sawyer\'s Preserve': 69.0, 'Jacksonville/Scattered': 69.2, 'Orlando/Scattered': 72.5 },
  { month: 'Dec 24', Atlanta: 72.2, Tampa: 71.5, Jacksonville: 69.2, Orlando: 72.8, Average: 71.3, 'Atlanta/Osborne Farms': 73.2, 'Atlanta/Suwanee Square': 70.8, 'Atlanta/Scattered': 71.2, 'Tampa/Preserve at Pine Grove': 71.8, 'Tampa/Avila Bay': 70.8, 'Tampa/Belmont': 71.8, 'Tampa/Scattered': 71.3, 'Jacksonville/Sawyer\'s Preserve': 69.2, 'Jacksonville/Scattered': 69.4, 'Orlando/Scattered': 72.8 },
  { month: 'Jan 25', Atlanta: 72.5, Tampa: 71.8, Jacksonville: 69.5, Orlando: 73.0, Average: 71.5, 'Atlanta/Osborne Farms': 73.5, 'Atlanta/Suwanee Square': 71.0, 'Atlanta/Scattered': 71.5, 'Tampa/Preserve at Pine Grove': 72.0, 'Tampa/Avila Bay': 71.0, 'Tampa/Belmont': 72.0, 'Tampa/Scattered': 71.5, 'Jacksonville/Sawyer\'s Preserve': 69.5, 'Jacksonville/Scattered': 69.6, 'Orlando/Scattered': 73.0 },
  { month: 'Feb 25', Atlanta: 72.8, Tampa: 72.0, Jacksonville: 69.8, Orlando: 73.2, Average: 71.7, 'Atlanta/Osborne Farms': 73.8, 'Atlanta/Suwanee Square': 71.2, 'Atlanta/Scattered': 71.8, 'Tampa/Preserve at Pine Grove': 72.2, 'Tampa/Avila Bay': 71.2, 'Tampa/Belmont': 72.2, 'Tampa/Scattered': 71.7, 'Jacksonville/Sawyer\'s Preserve': 69.8, 'Jacksonville/Scattered': 69.9, 'Orlando/Scattered': 73.2 }
];

// Mock Occupancy Trend Data
export const mockOccupancyTrendData = [
  { month: 'Mar 24', Atlanta: 94.2, Tampa: 91.5, Jacksonville: 93.1, Orlando: 92.4, Average: 92.8, 'Atlanta/Osborne Farms': 95.0, 'Atlanta/Suwanee Square': 93.5, 'Atlanta/Scattered': 94.0, 'Tampa/Preserve at Pine Grove': 91.0, 'Tampa/Avila Bay': 92.0, 'Tampa/Belmont': 91.5, 'Tampa/Scattered': 91.8, 'Jacksonville/Sawyer\'s Preserve': 93.0, 'Jacksonville/Scattered': 93.2, 'Orlando/Scattered': 92.4 },
  { month: 'Apr 24', Atlanta: 93.8, Tampa: 92.1, Jacksonville: 92.5, Orlando: 93.2, Average: 92.9, 'Atlanta/Osborne Farms': 94.5, 'Atlanta/Suwanee Square': 92.5, 'Atlanta/Scattered': 93.0, 'Tampa/Preserve at Pine Grove': 92.0, 'Tampa/Avila Bay': 91.5, 'Tampa/Belmont': 92.2, 'Tampa/Scattered': 92.1, 'Jacksonville/Sawyer\'s Preserve': 92.5, 'Jacksonville/Scattered': 92.8, 'Orlando/Scattered': 93.2 },
  { month: 'May 24', Atlanta: 93.5, Tampa: 92.0, Jacksonville: 92.8, Orlando: 93.0, Average: 92.8, 'Atlanta/Osborne Farms': 94.0, 'Atlanta/Suwanee Square': 92.0, 'Atlanta/Scattered': 92.5, 'Tampa/Preserve at Pine Grove': 91.8, 'Tampa/Avila Bay': 91.2, 'Tampa/Belmont': 91.9, 'Tampa/Scattered': 91.7, 'Jacksonville/Sawyer\'s Preserve': 92.8, 'Jacksonville/Scattered': 92.9, 'Orlando/Scattered': 93.0 },
  { month: 'Jun 24', Atlanta: 93.2, Tampa: 91.8, Jacksonville: 92.6, Orlando: 92.8, Average: 92.6, 'Atlanta/Osborne Farms': 93.8, 'Atlanta/Suwanee Square': 91.8, 'Atlanta/Scattered': 92.3, 'Tampa/Preserve at Pine Grove': 91.6, 'Tampa/Avila Bay': 91.0, 'Tampa/Belmont': 91.7, 'Tampa/Scattered': 91.5, 'Jacksonville/Sawyer\'s Preserve': 92.6, 'Jacksonville/Scattered': 92.7, 'Orlando/Scattered': 92.8 },
  { month: 'Jul 24', Atlanta: 93.0, Tampa: 91.6, Jacksonville: 92.4, Orlando: 92.6, Average: 92.4, 'Atlanta/Osborne Farms': 93.6, 'Atlanta/Suwanee Square': 91.6, 'Atlanta/Scattered': 92.1, 'Tampa/Preserve at Pine Grove': 91.4, 'Tampa/Avila Bay': 90.8, 'Tampa/Belmont': 91.5, 'Tampa/Scattered': 91.3, 'Jacksonville/Sawyer\'s Preserve': 92.4, 'Jacksonville/Scattered': 92.5, 'Orlando/Scattered': 92.6 },
  { month: 'Aug 24', Atlanta: 92.8, Tampa: 91.4, Jacksonville: 92.2, Orlando: 92.4, Average: 92.2, 'Atlanta/Osborne Farms': 93.4, 'Atlanta/Suwanee Square': 91.4, 'Atlanta/Scattered': 91.9, 'Tampa/Preserve at Pine Grove': 91.2, 'Tampa/Avila Bay': 90.6, 'Tampa/Belmont': 91.3, 'Tampa/Scattered': 91.1, 'Jacksonville/Sawyer\'s Preserve': 92.2, 'Jacksonville/Scattered': 92.3, 'Orlando/Scattered': 92.4 },
  { month: 'Sep 24', Atlanta: 92.6, Tampa: 91.2, Jacksonville: 92.0, Orlando: 92.2, Average: 92.0, 'Atlanta/Osborne Farms': 93.2, 'Atlanta/Suwanee Square': 91.2, 'Atlanta/Scattered': 91.7, 'Tampa/Preserve at Pine Grove': 91.0, 'Tampa/Avila Bay': 90.4, 'Tampa/Belmont': 91.1, 'Tampa/Scattered': 90.9, 'Jacksonville/Sawyer\'s Preserve': 92.0, 'Jacksonville/Scattered': 92.1, 'Orlando/Scattered': 92.2 },
  { month: 'Oct 24', Atlanta: 92.4, Tampa: 91.0, Jacksonville: 91.8, Orlando: 92.0, Average: 91.8, 'Atlanta/Osborne Farms': 93.0, 'Atlanta/Suwanee Square': 91.0, 'Atlanta/Scattered': 91.5, 'Tampa/Preserve at Pine Grove': 90.8, 'Tampa/Avila Bay': 90.2, 'Tampa/Belmont': 90.9, 'Tampa/Scattered': 90.7, 'Jacksonville/Sawyer\'s Preserve': 91.8, 'Jacksonville/Scattered': 91.9, 'Orlando/Scattered': 92.0 },
  { month: 'Nov 24', Atlanta: 92.2, Tampa: 90.8, Jacksonville: 91.6, Orlando: 91.8, Average: 91.6, 'Atlanta/Osborne Farms': 92.8, 'Atlanta/Suwanee Square': 90.8, 'Atlanta/Scattered': 91.3, 'Tampa/Preserve at Pine Grove': 90.6, 'Tampa/Avila Bay': 90.0, 'Tampa/Belmont': 90.7, 'Tampa/Scattered': 90.5, 'Jacksonville/Sawyer\'s Preserve': 91.6, 'Jacksonville/Scattered': 91.7, 'Orlando/Scattered': 91.8 },
  { month: 'Dec 24', Atlanta: 92.0, Tampa: 90.6, Jacksonville: 91.4, Orlando: 91.6, Average: 91.4, 'Atlanta/Osborne Farms': 92.6, 'Atlanta/Suwanee Square': 90.6, 'Atlanta/Scattered': 91.1, 'Tampa/Preserve at Pine Grove': 90.4, 'Tampa/Avila Bay': 89.8, 'Tampa/Belmont': 90.5, 'Tampa/Scattered': 90.3, 'Jacksonville/Sawyer\'s Preserve': 91.4, 'Jacksonville/Scattered': 91.5, 'Orlando/Scattered': 91.6 },
  { month: 'Jan 25', Atlanta: 91.8, Tampa: 90.4, Jacksonville: 91.2, Orlando: 91.4, Average: 91.2, 'Atlanta/Osborne Farms': 92.4, 'Atlanta/Suwanee Square': 90.4, 'Atlanta/Scattered': 90.9, 'Tampa/Preserve at Pine Grove': 90.2, 'Tampa/Avila Bay': 89.6, 'Tampa/Belmont': 90.3, 'Tampa/Scattered': 90.1, 'Jacksonville/Sawyer\'s Preserve': 91.2, 'Jacksonville/Scattered': 91.3, 'Orlando/Scattered': 91.4 },
  { month: 'Feb 25', Atlanta: 91.6, Tampa: 90.2, Jacksonville: 91.0, Orlando: 91.2, Average: 91.0, 'Atlanta/Osborne Farms': 92.2, 'Atlanta/Suwanee Square': 90.2, 'Atlanta/Scattered': 90.7, 'Tampa/Preserve at Pine Grove': 90.0, 'Tampa/Avila Bay': 89.4, 'Tampa/Belmont': 90.1, 'Tampa/Scattered': 89.9, 'Jacksonville/Sawyer\'s Preserve': 91.0, 'Jacksonville/Scattered': 91.1, 'Orlando/Scattered': 91.2 }
];

// Mock Delinquency Trend Data
export const mockDelinquencyTrendData = [
  { month: 'Mar 24', Atlanta: 3.2, Tampa: 3.5, Jacksonville: 3.1, Orlando: 3.4, Average: 3.3, 'Atlanta/Osborne Farms': 3.0, 'Atlanta/Suwanee Square': 3.3, 'Atlanta/Scattered': 3.1, 'Tampa/Preserve at Pine Grove': 3.5, 'Tampa/Avila Bay': 3.6, 'Tampa/Belmont': 3.4, 'Tampa/Scattered': 3.5, 'Jacksonville/Sawyer\'s Preserve': 3.1, 'Jacksonville/Scattered': 3.2, 'Orlando/Scattered': 3.4 },
  { month: 'Apr 24', Atlanta: 3.1, Tampa: 3.6, Jacksonville: 3.0, Orlando: 3.5, Average: 3.3, 'Atlanta/Osborne Farms': 2.9, 'Atlanta/Suwanee Square': 3.4, 'Atlanta/Scattered': 3.2, 'Tampa/Preserve at Pine Grove': 3.6, 'Tampa/Avila Bay': 3.7, 'Tampa/Belmont': 3.5, 'Tampa/Scattered': 3.6, 'Jacksonville/Sawyer\'s Preserve': 3.0, 'Jacksonville/Scattered': 3.1, 'Orlando/Scattered': 3.5 },
  { month: 'May 24', Atlanta: 3.0, Tampa: 3.7, Jacksonville: 2.9, Orlando: 3.6, Average: 3.3, 'Atlanta/Osborne Farms': 2.8, 'Atlanta/Suwanee Square': 3.5, 'Atlanta/Scattered': 3.3, 'Tampa/Preserve at Pine Grove': 3.7, 'Tampa/Avila Bay': 3.8, 'Tampa/Belmont': 3.6, 'Tampa/Scattered': 3.7, 'Jacksonville/Sawyer\'s Preserve': 2.9, 'Jacksonville/Scattered': 3.0, 'Orlando/Scattered': 3.6 },
  { month: 'Jun 24', Atlanta: 2.9, Tampa: 3.8, Jacksonville: 2.8, Orlando: 3.7, Average: 3.3, 'Atlanta/Osborne Farms': 2.7, 'Atlanta/Suwanee Square': 3.6, 'Atlanta/Scattered': 3.4, 'Tampa/Preserve at Pine Grove': 3.8, 'Tampa/Avila Bay': 3.9, 'Tampa/Belmont': 3.7, 'Tampa/Scattered': 3.8, 'Jacksonville/Sawyer\'s Preserve': 2.8, 'Jacksonville/Scattered': 2.9, 'Orlando/Scattered': 3.7 },
  { month: 'Jul 24', Atlanta: 2.8, Tampa: 3.9, Jacksonville: 2.7, Orlando: 3.8, Average: 3.3, 'Atlanta/Osborne Farms': 2.6, 'Atlanta/Suwanee Square': 3.7, 'Atlanta/Scattered': 3.5, 'Tampa/Preserve at Pine Grove': 3.9, 'Tampa/Avila Bay': 4.0, 'Tampa/Belmont': 3.8, 'Tampa/Scattered': 3.9, 'Jacksonville/Sawyer\'s Preserve': 2.7, 'Jacksonville/Scattered': 2.8, 'Orlando/Scattered': 3.8 },
  { month: 'Aug 24', Atlanta: 2.7, Tampa: 4.0, Jacksonville: 2.6, Orlando: 3.9, Average: 3.3, 'Atlanta/Osborne Farms': 2.5, 'Atlanta/Suwanee Square': 3.8, 'Atlanta/Scattered': 3.6, 'Tampa/Preserve at Pine Grove': 4.0, 'Tampa/Avila Bay': 4.1, 'Tampa/Belmont': 3.9, 'Tampa/Scattered': 4.0, 'Jacksonville/Sawyer\'s Preserve': 2.6, 'Jacksonville/Scattered': 2.7, 'Orlando/Scattered': 3.9 },
  { month: 'Sep 24', Atlanta: 2.6, Tampa: 4.1, Jacksonville: 2.5, Orlando: 4.0, Average: 3.3, 'Atlanta/Osborne Farms': 2.4, 'Atlanta/Suwanee Square': 3.9, 'Atlanta/Scattered': 3.7, 'Tampa/Preserve at Pine Grove': 4.1, 'Tampa/Avila Bay': 4.2, 'Tampa/Belmont': 4.0, 'Tampa/Scattered': 4.1, 'Jacksonville/Sawyer\'s Preserve': 2.5, 'Jacksonville/Scattered': 2.6, 'Orlando/Scattered': 4.0 },
  { month: 'Oct 24', Atlanta: 2.5, Tampa: 4.2, Jacksonville: 2.4, Orlando: 4.1, Average: 3.3, 'Atlanta/Osborne Farms': 2.3, 'Atlanta/Suwanee Square': 4.0, 'Atlanta/Scattered': 3.8, 'Tampa/Preserve at Pine Grove': 4.2, 'Tampa/Avila Bay': 4.3, 'Tampa/Belmont': 4.1, 'Tampa/Scattered': 4.2, 'Jacksonville/Sawyer\'s Preserve': 2.4, 'Jacksonville/Scattered': 2.5, 'Orlando/Scattered': 4.1 },
  { month: 'Nov 24', Atlanta: 2.4, Tampa: 4.3, Jacksonville: 2.3, Orlando: 4.2, Average: 3.3, 'Atlanta/Osborne Farms': 2.2, 'Atlanta/Suwanee Square': 4.1, 'Atlanta/Scattered': 3.9, 'Tampa/Preserve at Pine Grove': 4.3, 'Tampa/Avila Bay': 4.4, 'Tampa/Belmont': 4.2, 'Tampa/Scattered': 4.3, 'Jacksonville/Sawyer\'s Preserve': 2.3, 'Jacksonville/Scattered': 2.4, 'Orlando/Scattered': 4.2 },
  { month: 'Dec 24', Atlanta: 2.3, Tampa: 4.4, Jacksonville: 2.2, Orlando: 4.3, Average: 3.3, 'Atlanta/Osborne Farms': 2.1, 'Atlanta/Suwanee Square': 4.2, 'Atlanta/Scattered': 4.0, 'Tampa/Preserve at Pine Grove': 4.4, 'Tampa/Avila Bay': 4.5, 'Tampa/Belmont': 4.3, 'Tampa/Scattered': 4.4, 'Jacksonville/Sawyer\'s Preserve': 2.2, 'Jacksonville/Scattered': 2.3, 'Orlando/Scattered': 4.3 },
  { month: 'Jan 25', Atlanta: 2.2, Tampa: 4.5, Jacksonville: 2.1, Orlando: 4.4, Average: 3.3, 'Atlanta/Osborne Farms': 2.0, 'Atlanta/Suwanee Square': 4.3, 'Atlanta/Scattered': 4.1, 'Tampa/Preserve at Pine Grove': 4.5, 'Tampa/Avila Bay': 4.6, 'Tampa/Belmont': 4.4, 'Tampa/Scattered': 4.5, 'Jacksonville/Sawyer\'s Preserve': 2.1, 'Jacksonville/Scattered': 2.2, 'Orlando/Scattered': 4.4 },
  { month: 'Feb 25', Atlanta: 2.1, Tampa: 4.6, Jacksonville: 2.0, Orlando: 4.5, Average: 3.3, 'Atlanta/Osborne Farms': 1.9, 'Atlanta/Suwanee Square': 4.4, 'Atlanta/Scattered': 4.2, 'Tampa/Preserve at Pine Grove': 4.6, 'Tampa/Avila Bay': 4.7, 'Tampa/Belmont': 4.5, 'Tampa/Scattered': 4.6, 'Jacksonville/Sawyer\'s Preserve': 2.0, 'Jacksonville/Scattered': 2.1, 'Orlando/Scattered': 4.5 }
];

// Define technician locations
export const technicianLocations = {
  'John D.': ['Atlanta/Osborne Farms', 'Atlanta/Suwanee Square'],
  'Maria L.': ['Atlanta/Scattered'],
  'Peter F.': ['Tampa/Preserve at Pine Grove', 'Tampa/Avila Bay', 'Tampa/Belmont', 'Tampa/Scattered'],
  'Lisa M.': ['Jacksonville/Sawyer\'s Preserve', 'Jacksonville/Scattered'],
  'Emily T.': ['Orlando/Scattered']
};

// Mock Bill Hours Trend Data
export const mockBillHoursTrendData = [
  { month: 'Mar 24', Atlanta: 8.2, Tampa: 7.5, Jacksonville: 8.1, Orlando: 7.4, Average: 7.8, 'Atlanta/Osborne Farms': 8.5, 'Atlanta/Suwanee Square': 7.8, 'Atlanta/Scattered': 8.0, 'Tampa/Preserve at Pine Grove': 7.2, 'Tampa/Avila Bay': 7.4, 'Tampa/Belmont': 7.3, 'Tampa/Scattered': 7.5, 'Jacksonville/Sawyer\'s Preserve': 8.1, 'Jacksonville/Scattered': 8.0, 'Orlando/Scattered': 7.4 },
  { month: 'Apr 24', Atlanta: 8.0, Tampa: 7.6, Jacksonville: 8.0, Orlando: 7.5, Average: 7.8, 'Atlanta/Osborne Farms': 8.3, 'Atlanta/Suwanee Square': 7.9, 'Atlanta/Scattered': 8.1, 'Tampa/Preserve at Pine Grove': 7.3, 'Tampa/Avila Bay': 7.5, 'Tampa/Belmont': 7.4, 'Tampa/Scattered': 7.6, 'Jacksonville/Sawyer\'s Preserve': 8.0, 'Jacksonville/Scattered': 7.9, 'Orlando/Scattered': 7.5 },
  { month: 'May 24', Atlanta: 7.9, Tampa: 7.7, Jacksonville: 7.9, Orlando: 7.6, Average: 7.8, 'Atlanta/Osborne Farms': 8.2, 'Atlanta/Suwanee Square': 8.0, 'Atlanta/Scattered': 8.2, 'Tampa/Preserve at Pine Grove': 7.4, 'Tampa/Avila Bay': 7.6, 'Tampa/Belmont': 7.5, 'Tampa/Scattered': 7.7, 'Jacksonville/Sawyer\'s Preserve': 7.9, 'Jacksonville/Scattered': 7.8, 'Orlando/Scattered': 7.6 },
  { month: 'Jun 24', Atlanta: 7.8, Tampa: 7.8, Jacksonville: 7.8, Orlando: 7.7, Average: 7.8, 'Atlanta/Osborne Farms': 8.1, 'Atlanta/Suwanee Square': 8.1, 'Atlanta/Scattered': 8.3, 'Tampa/Preserve at Pine Grove': 7.5, 'Tampa/Avila Bay': 7.7, 'Tampa/Belmont': 7.6, 'Tampa/Scattered': 7.8, 'Jacksonville/Sawyer\'s Preserve': 7.8, 'Jacksonville/Scattered': 7.7, 'Orlando/Scattered': 7.7 },
  { month: 'Jul 24', Atlanta: 7.7, Tampa: 7.9, Jacksonville: 7.7, Orlando: 7.8, Average: 7.8, 'Atlanta/Osborne Farms': 8.0, 'Atlanta/Suwanee Square': 8.2, 'Atlanta/Scattered': 8.4, 'Tampa/Preserve at Pine Grove': 7.6, 'Tampa/Avila Bay': 7.8, 'Tampa/Belmont': 7.7, 'Tampa/Scattered': 7.9, 'Jacksonville/Sawyer\'s Preserve': 7.7, 'Jacksonville/Scattered': 7.6, 'Orlando/Scattered': 7.8 },
  { month: 'Aug 24', Atlanta: 7.6, Tampa: 8.0, Jacksonville: 7.6, Orlando: 7.9, Average: 7.8, 'Atlanta/Osborne Farms': 7.9, 'Atlanta/Suwanee Square': 8.3, 'Atlanta/Scattered': 8.5, 'Tampa/Preserve at Pine Grove': 7.7, 'Tampa/Avila Bay': 7.9, 'Tampa/Belmont': 7.8, 'Tampa/Scattered': 8.0, 'Jacksonville/Sawyer\'s Preserve': 7.6, 'Jacksonville/Scattered': 7.5, 'Orlando/Scattered': 7.9 },
  { month: 'Sep 24', Atlanta: 7.5, Tampa: 8.1, Jacksonville: 7.5, Orlando: 8.0, Average: 7.8, 'Atlanta/Osborne Farms': 7.8, 'Atlanta/Suwanee Square': 8.4, 'Atlanta/Scattered': 8.6, 'Tampa/Preserve at Pine Grove': 7.8, 'Tampa/Avila Bay': 8.0, 'Tampa/Belmont': 7.9, 'Tampa/Scattered': 8.1, 'Jacksonville/Sawyer\'s Preserve': 7.5, 'Jacksonville/Scattered': 7.4, 'Orlando/Scattered': 8.0 },
  { month: 'Oct 24', Atlanta: 7.4, Tampa: 8.2, Jacksonville: 7.4, Orlando: 8.1, Average: 7.8, 'Atlanta/Osborne Farms': 7.7, 'Atlanta/Suwanee Square': 8.5, 'Atlanta/Scattered': 8.7, 'Tampa/Preserve at Pine Grove': 7.9, 'Tampa/Avila Bay': 8.1, 'Tampa/Belmont': 8.0, 'Tampa/Scattered': 8.2, 'Jacksonville/Sawyer\'s Preserve': 7.4, 'Jacksonville/Scattered': 7.3, 'Orlando/Scattered': 8.1 },
  { month: 'Nov 24', Atlanta: 7.3, Tampa: 8.3, Jacksonville: 7.3, Orlando: 8.2, Average: 7.8, 'Atlanta/Osborne Farms': 7.6, 'Atlanta/Suwanee Square': 8.6, 'Atlanta/Scattered': 8.8, 'Tampa/Preserve at Pine Grove': 8.0, 'Tampa/Avila Bay': 8.2, 'Tampa/Belmont': 8.1, 'Tampa/Scattered': 8.3, 'Jacksonville/Sawyer\'s Preserve': 7.3, 'Jacksonville/Scattered': 7.2, 'Orlando/Scattered': 8.2 },
  { month: 'Dec 24', Atlanta: 7.2, Tampa: 8.4, Jacksonville: 7.2, Orlando: 8.3, Average: 7.8, 'Atlanta/Osborne Farms': 7.5, 'Atlanta/Suwanee Square': 8.7, 'Atlanta/Scattered': 8.9, 'Tampa/Preserve at Pine Grove': 8.1, 'Tampa/Avila Bay': 8.3, 'Tampa/Belmont': 8.2, 'Tampa/Scattered': 8.4, 'Jacksonville/Sawyer\'s Preserve': 7.2, 'Jacksonville/Scattered': 7.1, 'Orlando/Scattered': 8.3 },
  { month: 'Jan 25', Atlanta: 7.1, Tampa: 8.5, Jacksonville: 7.1, Orlando: 8.4, Average: 7.8, 'Atlanta/Osborne Farms': 7.4, 'Atlanta/Suwanee Square': 8.8, 'Atlanta/Scattered': 9.0, 'Tampa/Preserve at Pine Grove': 8.2, 'Tampa/Avila Bay': 8.4, 'Tampa/Belmont': 8.3, 'Tampa/Scattered': 8.5, 'Jacksonville/Sawyer\'s Preserve': 7.1, 'Jacksonville/Scattered': 7.0, 'Orlando/Scattered': 8.4 },
  { month: 'Feb 25', Atlanta: 7.0, Tampa: 8.6, Jacksonville: 7.0, Orlando: 8.5, Average: 7.8, 'Atlanta/Osborne Farms': 7.3, 'Atlanta/Suwanee Square': 8.9, 'Atlanta/Scattered': 9.1, 'Tampa/Preserve at Pine Grove': 8.3, 'Tampa/Avila Bay': 8.5, 'Tampa/Belmont': 8.4, 'Tampa/Scattered': 8.6, 'Jacksonville/Sawyer\'s Preserve': 7.0, 'Jacksonville/Scattered': 6.9, 'Orlando/Scattered': 8.5 }
];

// Mock Work Orders Trend Data
export const mockWorkOrdersTrendData = [
  { month: 'Mar 24', Atlanta: 15, Tampa: 12, Jacksonville: 14, Orlando: 13, Average: 13.5, 'Atlanta/Osborne Farms': 16, 'Atlanta/Suwanee Square': 14, 'Atlanta/Scattered': 15, 'Tampa/Preserve at Pine Grove': 12, 'Tampa/Avila Bay': 11, 'Tampa/Belmont': 12, 'Tampa/Scattered': 13, 'Jacksonville/Sawyer\'s Preserve': 14, 'Jacksonville/Scattered': 13, 'Orlando/Scattered': 13 },
  { month: 'Apr 24', Atlanta: 14, Tampa: 13, Jacksonville: 13, Orlando: 14, Average: 13.5, 'Atlanta/Osborne Farms': 15, 'Atlanta/Suwanee Square': 13, 'Atlanta/Scattered': 14, 'Tampa/Preserve at Pine Grove': 13, 'Tampa/Avila Bay': 12, 'Tampa/Belmont': 13, 'Tampa/Scattered': 14, 'Jacksonville/Sawyer\'s Preserve': 13, 'Jacksonville/Scattered': 12, 'Orlando/Scattered': 14 },
  { month: 'May 24', Atlanta: 13, Tampa: 14, Jacksonville: 12, Orlando: 15, Average: 13.5, 'Atlanta/Osborne Farms': 14, 'Atlanta/Suwanee Square': 12, 'Atlanta/Scattered': 13, 'Tampa/Preserve at Pine Grove': 14, 'Tampa/Avila Bay': 13, 'Tampa/Belmont': 14, 'Tampa/Scattered': 15, 'Jacksonville/Sawyer\'s Preserve': 12, 'Jacksonville/Scattered': 11, 'Orlando/Scattered': 15 },
  { month: 'Jun 24', Atlanta: 12, Tampa: 15, Jacksonville: 11, Orlando: 16, Average: 13.5, 'Atlanta/Osborne Farms': 13, 'Atlanta/Suwanee Square': 11, 'Atlanta/Scattered': 12, 'Tampa/Preserve at Pine Grove': 15, 'Tampa/Avila Bay': 14, 'Tampa/Belmont': 15, 'Tampa/Scattered': 16, 'Jacksonville/Sawyer\'s Preserve': 11, 'Jacksonville/Scattered': 10, 'Orlando/Scattered': 16 },
  { month: 'Jul 24', Atlanta: 11, Tampa: 16, Jacksonville: 10, Orlando: 17, Average: 13.5, 'Atlanta/Osborne Farms': 12, 'Atlanta/Suwanee Square': 10, 'Atlanta/Scattered': 11, 'Tampa/Preserve at Pine Grove': 16, 'Tampa/Avila Bay': 15, 'Tampa/Belmont': 16, 'Tampa/Scattered': 17, 'Jacksonville/Sawyer\'s Preserve': 10, 'Jacksonville/Scattered': 9, 'Orlando/Scattered': 17 },
  { month: 'Aug 24', Atlanta: 10, Tampa: 17, Jacksonville: 9, Orlando: 18, Average: 13.5, 'Atlanta/Osborne Farms': 11, 'Atlanta/Suwanee Square': 9, 'Atlanta/Scattered': 10, 'Tampa/Preserve at Pine Grove': 17, 'Tampa/Avila Bay': 16, 'Tampa/Belmont': 17, 'Tampa/Scattered': 18, 'Jacksonville/Sawyer\'s Preserve': 9, 'Jacksonville/Scattered': 8, 'Orlando/Scattered': 18 },
  { month: 'Sep 24', Atlanta: 9, Tampa: 18, Jacksonville: 8, Orlando: 19, Average: 13.5, 'Atlanta/Osborne Farms': 10, 'Atlanta/Suwanee Square': 8, 'Atlanta/Scattered': 9, 'Tampa/Preserve at Pine Grove': 18, 'Tampa/Avila Bay': 17, 'Tampa/Belmont': 18, 'Tampa/Scattered': 19, 'Jacksonville/Sawyer\'s Preserve': 8, 'Jacksonville/Scattered': 7, 'Orlando/Scattered': 19 },
  { month: 'Oct 24', Atlanta: 8, Tampa: 19, Jacksonville: 7, Orlando: 20, Average: 13.5, 'Atlanta/Osborne Farms': 9, 'Atlanta/Suwanee Square': 7, 'Atlanta/Scattered': 8, 'Tampa/Preserve at Pine Grove': 19, 'Tampa/Avila Bay': 18, 'Tampa/Belmont': 19, 'Tampa/Scattered': 20, 'Jacksonville/Sawyer\'s Preserve': 7, 'Jacksonville/Scattered': 6, 'Orlando/Scattered': 20 },
  { month: 'Nov 24', Atlanta: 7, Tampa: 20, Jacksonville: 6, Orlando: 21, Average: 13.5, 'Atlanta/Osborne Farms': 8, 'Atlanta/Suwanee Square': 6, 'Atlanta/Scattered': 7, 'Tampa/Preserve at Pine Grove': 20, 'Tampa/Avila Bay': 19, 'Tampa/Belmont': 20, 'Tampa/Scattered': 21, 'Jacksonville/Sawyer\'s Preserve': 6, 'Jacksonville/Scattered': 5, 'Orlando/Scattered': 21 },
  { month: 'Dec 24', Atlanta: 6, Tampa: 21, Jacksonville: 5, Orlando: 22, Average: 13.5, 'Atlanta/Osborne Farms': 7, 'Atlanta/Suwanee Square': 5, 'Atlanta/Scattered': 6, 'Tampa/Preserve at Pine Grove': 21, 'Tampa/Avila Bay': 20, 'Tampa/Belmont': 21, 'Tampa/Scattered': 22, 'Jacksonville/Sawyer\'s Preserve': 5, 'Jacksonville/Scattered': 4, 'Orlando/Scattered': 22 },
  { month: 'Jan 25', Atlanta: 5, Tampa: 22, Jacksonville: 4, Orlando: 23, Average: 13.5, 'Atlanta/Osborne Farms': 6, 'Atlanta/Suwanee Square': 4, 'Atlanta/Scattered': 5, 'Tampa/Preserve at Pine Grove': 22, 'Tampa/Avila Bay': 21, 'Tampa/Belmont': 22, 'Tampa/Scattered': 23, 'Jacksonville/Sawyer\'s Preserve': 4, 'Jacksonville/Scattered': 3, 'Orlando/Scattered': 23 },
  { month: 'Feb 25', Atlanta: 4, Tampa: 23, Jacksonville: 3, Orlando: 24, Average: 13.5, 'Atlanta/Osborne Farms': 5, 'Atlanta/Suwanee Square': 3, 'Atlanta/Scattered': 4, 'Tampa/Preserve at Pine Grove': 23, 'Tampa/Avila Bay': 22, 'Tampa/Belmont': 23, 'Tampa/Scattered': 24, 'Jacksonville/Sawyer\'s Preserve': 3, 'Jacksonville/Scattered': 2, 'Orlando/Scattered': 24 }
];

// Mock Leasing Timeline Trend Data
export const mockLeasingTimelineTrendData = [
  { month: 'Mar 24', Atlanta: { 'Lead to Sign': 30, 'Sign to Move': 15 }, Tampa: { 'Lead to Sign': 28, 'Sign to Move': 14 }, Jacksonville: { 'Lead to Sign': 29, 'Sign to Move': 15 }, Orlando: { 'Lead to Sign': 31, 'Sign to Move': 16 }, Average: { 'Lead to Sign': 29.5, 'Sign to Move': 15 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 32, 'Sign to Move': 16 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 28, 'Sign to Move': 14 }, 'Atlanta/Scattered': { 'Lead to Sign': 30, 'Sign to Move': 15 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 27, 'Sign to Move': 13 }, 'Tampa/Avila Bay': { 'Lead to Sign': 29, 'Sign to Move': 14 }, 'Tampa/Belmont': { 'Lead to Sign': 28, 'Sign to Move': 13 }, 'Tampa/Scattered': { 'Lead to Sign': 29, 'Sign to Move': 14 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 29, 'Sign to Move': 15 }, 'Jacksonville/Scattered': { 'Lead to Sign': 28, 'Sign to Move': 14 }, 'Orlando/Scattered': { 'Lead to Sign': 31, 'Sign to Move': 16 } },
  { month: 'Apr 24', Atlanta: { 'Lead to Sign': 29, 'Sign to Move': 14 }, Tampa: { 'Lead to Sign': 27, 'Sign to Move': 13 }, Jacksonville: { 'Lead to Sign': 28, 'Sign to Move': 14 }, Orlando: { 'Lead to Sign': 30, 'Sign to Move': 15 }, Average: { 'Lead to Sign': 28.5, 'Sign to Move': 14.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 31, 'Sign to Move': 15 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 27, 'Sign to Move': 13 }, 'Atlanta/Scattered': { 'Lead to Sign': 29, 'Sign to Move': 14 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 26, 'Sign to Move': 12 }, 'Tampa/Avila Bay': { 'Lead to Sign': 28, 'Sign to Move': 13 }, 'Tampa/Belmont': { 'Lead to Sign': 27, 'Sign to Move': 12 }, 'Tampa/Scattered': { 'Lead to Sign': 28, 'Sign to Move': 13 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 28, 'Sign to Move': 14 }, 'Jacksonville/Scattered': { 'Lead to Sign': 27, 'Sign to Move': 13 }, 'Orlando/Scattered': { 'Lead to Sign': 30, 'Sign to Move': 15 } },
  { month: 'May 24', Atlanta: { 'Lead to Sign': 28, 'Sign to Move': 13 }, Tampa: { 'Lead to Sign': 26, 'Sign to Move': 12 }, Jacksonville: { 'Lead to Sign': 27, 'Sign to Move': 13 }, Orlando: { 'Lead to Sign': 29, 'Sign to Move': 14 }, Average: { 'Lead to Sign': 27.5, 'Sign to Move': 13.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 30, 'Sign to Move': 14 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 26, 'Sign to Move': 12 }, 'Atlanta/Scattered': { 'Lead to Sign': 28, 'Sign to Move': 13 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 25, 'Sign to Move': 11 }, 'Tampa/Avila Bay': { 'Lead to Sign': 27, 'Sign to Move': 12 }, 'Tampa/Belmont': { 'Lead to Sign': 26, 'Sign to Move': 11 }, 'Tampa/Scattered': { 'Lead to Sign': 27, 'Sign to Move': 12 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 27, 'Sign to Move': 13 }, 'Jacksonville/Scattered': { 'Lead to Sign': 26, 'Sign to Move': 12 }, 'Orlando/Scattered': { 'Lead to Sign': 29, 'Sign to Move': 14 } },
  { month: 'Jun 24', Atlanta: { 'Lead to Sign': 27, 'Sign to Move': 12 }, Tampa: { 'Lead to Sign': 25, 'Sign to Move': 11 }, Jacksonville: { 'Lead to Sign': 26, 'Sign to Move': 12 }, Orlando: { 'Lead to Sign': 28, 'Sign to Move': 13 }, Average: { 'Lead to Sign': 26.5, 'Sign to Move': 12.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 29, 'Sign to Move': 13 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 25, 'Sign to Move': 11 }, 'Atlanta/Scattered': { 'Lead to Sign': 27, 'Sign to Move': 12 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 24, 'Sign to Move': 10 }, 'Tampa/Avila Bay': { 'Lead to Sign': 26, 'Sign to Move': 11 }, 'Tampa/Belmont': { 'Lead to Sign': 25, 'Sign to Move': 10 }, 'Tampa/Scattered': { 'Lead to Sign': 26, 'Sign to Move': 11 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 26, 'Sign to Move': 12 }, 'Jacksonville/Scattered': { 'Lead to Sign': 25, 'Sign to Move': 11 }, 'Orlando/Scattered': { 'Lead to Sign': 28, 'Sign to Move': 13 } },
  { month: 'Jul 24', Atlanta: { 'Lead to Sign': 26, 'Sign to Move': 11 }, Tampa: { 'Lead to Sign': 24, 'Sign to Move': 10 }, Jacksonville: { 'Lead to Sign': 25, 'Sign to Move': 11 }, Orlando: { 'Lead to Sign': 27, 'Sign to Move': 12 }, Average: { 'Lead to Sign': 25.5, 'Sign to Move': 11.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 28, 'Sign to Move': 12 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 24, 'Sign to Move': 10 }, 'Atlanta/Scattered': { 'Lead to Sign': 26, 'Sign to Move': 11 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 23, 'Sign to Move': 9 }, 'Tampa/Avila Bay': { 'Lead to Sign': 25, 'Sign to Move': 10 }, 'Tampa/Belmont': { 'Lead to Sign': 24, 'Sign to Move': 9 }, 'Tampa/Scattered': { 'Lead to Sign': 25, 'Sign to Move': 10 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 25, 'Sign to Move': 11 }, 'Jacksonville/Scattered': { 'Lead to Sign': 24, 'Sign to Move': 10 }, 'Orlando/Scattered': { 'Lead to Sign': 27, 'Sign to Move': 12 } },
  { month: 'Aug 24', Atlanta: { 'Lead to Sign': 25, 'Sign to Move': 10 }, Tampa: { 'Lead to Sign': 23, 'Sign to Move': 9 }, Jacksonville: { 'Lead to Sign': 24, 'Sign to Move': 10 }, Orlando: { 'Lead to Sign': 26, 'Sign to Move': 11 }, Average: { 'Lead to Sign': 24.5, 'Sign to Move': 10.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 27, 'Sign to Move': 11 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 23, 'Sign to Move': 9 }, 'Atlanta/Scattered': { 'Lead to Sign': 25, 'Sign to Move': 10 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 22, 'Sign to Move': 8 }, 'Tampa/Avila Bay': { 'Lead to Sign': 24, 'Sign to Move': 9 }, 'Tampa/Belmont': { 'Lead to Sign': 23, 'Sign to Move': 8 }, 'Tampa/Scattered': { 'Lead to Sign': 24, 'Sign to Move': 9 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 24, 'Sign to Move': 10 }, 'Jacksonville/Scattered': { 'Lead to Sign': 23, 'Sign to Move': 9 }, 'Orlando/Scattered': { 'Lead to Sign': 26, 'Sign to Move': 11 } },
  { month: 'Sep 24', Atlanta: { 'Lead to Sign': 24, 'Sign to Move': 9 }, Tampa: { 'Lead to Sign': 22, 'Sign to Move': 8 }, Jacksonville: { 'Lead to Sign': 23, 'Sign to Move': 9 }, Orlando: { 'Lead to Sign': 25, 'Sign to Move': 10 }, Average: { 'Lead to Sign': 23.5, 'Sign to Move': 9.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 26, 'Sign to Move': 10 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 22, 'Sign to Move': 8 }, 'Atlanta/Scattered': { 'Lead to Sign': 24, 'Sign to Move': 9 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 21, 'Sign to Move': 7 }, 'Tampa/Avila Bay': { 'Lead to Sign': 23, 'Sign to Move': 8 }, 'Tampa/Belmont': { 'Lead to Sign': 22, 'Sign to Move': 7 }, 'Tampa/Scattered': { 'Lead to Sign': 23, 'Sign to Move': 8 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 23, 'Sign to Move': 9 }, 'Jacksonville/Scattered': { 'Lead to Sign': 22, 'Sign to Move': 8 }, 'Orlando/Scattered': { 'Lead to Sign': 25, 'Sign to Move': 10 } },
  { month: 'Oct 24', Atlanta: { 'Lead to Sign': 23, 'Sign to Move': 8 }, Tampa: { 'Lead to Sign': 21, 'Sign to Move': 7 }, Jacksonville: { 'Lead to Sign': 22, 'Sign to Move': 8 }, Orlando: { 'Lead to Sign': 24, 'Sign to Move': 9 }, Average: { 'Lead to Sign': 22.5, 'Sign to Move': 8.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 25, 'Sign to Move': 9 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 21, 'Sign to Move': 7 }, 'Atlanta/Scattered': { 'Lead to Sign': 23, 'Sign to Move': 8 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 20, 'Sign to Move': 6 }, 'Tampa/Avila Bay': { 'Lead to Sign': 22, 'Sign to Move': 7 }, 'Tampa/Belmont': { 'Lead to Sign': 21, 'Sign to Move': 6 }, 'Tampa/Scattered': { 'Lead to Sign': 22, 'Sign to Move': 7 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 22, 'Sign to Move': 8 }, 'Jacksonville/Scattered': { 'Lead to Sign': 21, 'Sign to Move': 7 }, 'Orlando/Scattered': { 'Lead to Sign': 24, 'Sign to Move': 9 } },
  { month: 'Nov 24', Atlanta: { 'Lead to Sign': 22, 'Sign to Move': 7 }, Tampa: { 'Lead to Sign': 20, 'Sign to Move': 6 }, Jacksonville: { 'Lead to Sign': 21, 'Sign to Move': 7 }, Orlando: { 'Lead to Sign': 23, 'Sign to Move': 8 }, Average: { 'Lead to Sign': 21.5, 'Sign to Move': 7.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 24, 'Sign to Move': 8 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 20, 'Sign to Move': 6 }, 'Atlanta/Scattered': { 'Lead to Sign': 22, 'Sign to Move': 7 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 19, 'Sign to Move': 5 }, 'Tampa/Avila Bay': { 'Lead to Sign': 21, 'Sign to Move': 6 }, 'Tampa/Belmont': { 'Lead to Sign': 20, 'Sign to Move': 5 }, 'Tampa/Scattered': { 'Lead to Sign': 21, 'Sign to Move': 6 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 21, 'Sign to Move': 7 }, 'Jacksonville/Scattered': { 'Lead to Sign': 20, 'Sign to Move': 6 }, 'Orlando/Scattered': { 'Lead to Sign': 23, 'Sign to Move': 8 } },
  { month: 'Dec 24', Atlanta: { 'Lead to Sign': 21, 'Sign to Move': 6 }, Tampa: { 'Lead to Sign': 19, 'Sign to Move': 5 }, Jacksonville: { 'Lead to Sign': 20, 'Sign to Move': 6 }, Orlando: { 'Lead to Sign': 22, 'Sign to Move': 7 }, Average: { 'Lead to Sign': 20.5, 'Sign to Move': 6.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 23, 'Sign to Move': 7 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 19, 'Sign to Move': 5 }, 'Atlanta/Scattered': { 'Lead to Sign': 21, 'Sign to Move': 6 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 18, 'Sign to Move': 4 }, 'Tampa/Avila Bay': { 'Lead to Sign': 20, 'Sign to Move': 5 }, 'Tampa/Belmont': { 'Lead to Sign': 19, 'Sign to Move': 4 }, 'Tampa/Scattered': { 'Lead to Sign': 20, 'Sign to Move': 5 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 20, 'Sign to Move': 6 }, 'Jacksonville/Scattered': { 'Lead to Sign': 19, 'Sign to Move': 5 }, 'Orlando/Scattered': { 'Lead to Sign': 22, 'Sign to Move': 7 } },
  { month: 'Jan 25', Atlanta: { 'Lead to Sign': 20, 'Sign to Move': 5 }, Tampa: { 'Lead to Sign': 18, 'Sign to Move': 4 }, Jacksonville: { 'Lead to Sign': 19, 'Sign to Move': 5 }, Orlando: { 'Lead to Sign': 21, 'Sign to Move': 6 }, Average: { 'Lead to Sign': 19.5, 'Sign to Move': 5.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 22, 'Sign to Move': 6 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 18, 'Sign to Move': 4 }, 'Atlanta/Scattered': { 'Lead to Sign': 20, 'Sign to Move': 5 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 17, 'Sign to Move': 3 }, 'Tampa/Avila Bay': { 'Lead to Sign': 19, 'Sign to Move': 4 }, 'Tampa/Belmont': { 'Lead to Sign': 18, 'Sign to Move': 3 }, 'Tampa/Scattered': { 'Lead to Sign': 19, 'Sign to Move': 4 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 19, 'Sign to Move': 5 }, 'Jacksonville/Scattered': { 'Lead to Sign': 18, 'Sign to Move': 4 }, 'Orlando/Scattered': { 'Lead to Sign': 21, 'Sign to Move': 6 } },
  { month: 'Feb 25', Atlanta: { 'Lead to Sign': 19, 'Sign to Move': 4 }, Tampa: { 'Lead to Sign': 17, 'Sign to Move': 3 }, Jacksonville: { 'Lead to Sign': 18, 'Sign to Move': 4 }, Orlando: { 'Lead to Sign': 20, 'Sign to Move': 5 }, Average: { 'Lead to Sign': 18.5, 'Sign to Move': 4.5 }, 'Atlanta/Osborne Farms': { 'Lead to Sign': 21, 'Sign to Move': 5 }, 'Atlanta/Suwanee Square': { 'Lead to Sign': 17, 'Sign to Move': 3 }, 'Atlanta/Scattered': { 'Lead to Sign': 19, 'Sign to Move': 4 }, 'Tampa/Preserve at Pine Grove': { 'Lead to Sign': 16, 'Sign to Move': 2 }, 'Tampa/Avila Bay': { 'Lead to Sign': 18, 'Sign to Move': 3 }, 'Tampa/Belmont': { 'Lead to Sign': 17, 'Sign to Move': 2 }, 'Tampa/Scattered': { 'Lead to Sign': 18, 'Sign to Move': 3 }, 'Jacksonville/Sawyer\'s Preserve': { 'Lead to Sign': 18, 'Sign to Move': 4 }, 'Jacksonville/Scattered': { 'Lead to Sign': 17, 'Sign to Move': 3 }, 'Orlando/Scattered': { 'Lead to Sign': 20, 'Sign to Move': 5 } }
];

// Mock Occupancy Data
export const mockOccupancyData = [
  { month: 'Mar 24', Atlanta: 94.2, Tampa: 91.5, Jacksonville: 93.1, Orlando: 92.4, Average: 92.8, 'Atlanta/Osborne Farms': 95.0, 'Atlanta/Suwanee Square': 93.5, 'Atlanta/Scattered': 94.0, 'Tampa/Preserve at Pine Grove': 91.0, 'Tampa/Avila Bay': 92.0, 'Tampa/Belmont': 91.5, 'Tampa/Scattered': 91.8, 'Jacksonville/Sawyer\'s Preserve': 93.0, 'Jacksonville/Scattered': 93.2, 'Orlando/Scattered': 92.4 },
  { month: 'Apr 24', Atlanta: 93.8, Tampa: 92.1, Jacksonville: 92.5, Orlando: 93.2, Average: 92.9, 'Atlanta/Osborne Farms': 94.5, 'Atlanta/Suwanee Square': 92.5, 'Atlanta/Scattered': 93.0, 'Tampa/Preserve at Pine Grove': 92.0, 'Tampa/Avila Bay': 91.5, 'Tampa/Belmont': 92.2, 'Tampa/Scattered': 92.1, 'Jacksonville/Sawyer\'s Preserve': 92.5, 'Jacksonville/Scattered': 92.8, 'Orlando/Scattered': 93.2 },
  { month: 'May 24', Atlanta: 93.5, Tampa: 92.0, Jacksonville: 92.8, Orlando: 93.0, Average: 92.8, 'Atlanta/Osborne Farms': 94.0, 'Atlanta/Suwanee Square': 92.0, 'Atlanta/Scattered': 92.5, 'Tampa/Preserve at Pine Grove': 91.8, 'Tampa/Avila Bay': 91.2, 'Tampa/Belmont': 91.9, 'Tampa/Scattered': 91.7, 'Jacksonville/Sawyer\'s Preserve': 92.8, 'Jacksonville/Scattered': 92.9, 'Orlando/Scattered': 93.0 },
  { month: 'Jun 24', Atlanta: 93.2, Tampa: 91.8, Jacksonville: 92.6, Orlando: 92.8, Average: 92.6, 'Atlanta/Osborne Farms': 93.8, 'Atlanta/Suwanee Square': 91.8, 'Atlanta/Scattered': 92.3, 'Tampa/Preserve at Pine Grove': 91.6, 'Tampa/Avila Bay': 91.0, 'Tampa/Belmont': 91.7, 'Tampa/Scattered': 91.5, 'Jacksonville/Sawyer\'s Preserve': 92.6, 'Jacksonville/Scattered': 92.7, 'Orlando/Scattered': 92.8 },
  { month: 'Jul 24', Atlanta: 93.0, Tampa: 91.6, Jacksonville: 92.4, Orlando: 92.6, Average: 92.4, 'Atlanta/Osborne Farms': 93.6, 'Atlanta/Suwanee Square': 91.6, 'Atlanta/Scattered': 92.1, 'Tampa/Preserve at Pine Grove': 91.4, 'Tampa/Avila Bay': 90.8, 'Tampa/Belmont': 91.5, 'Tampa/Scattered': 91.3, 'Jacksonville/Sawyer\'s Preserve': 92.4, 'Jacksonville/Scattered': 92.5, 'Orlando/Scattered': 92.6 },
  { month: 'Aug 24', Atlanta: 92.8, Tampa: 91.4, Jacksonville: 92.2, Orlando: 92.4, Average: 92.2, 'Atlanta/Osborne Farms': 93.4, 'Atlanta/Suwanee Square': 91.4, 'Atlanta/Scattered': 91.9, 'Tampa/Preserve at Pine Grove': 91.2, 'Tampa/Avila Bay': 90.6, 'Tampa/Belmont': 91.3, 'Tampa/Scattered': 91.1, 'Jacksonville/Sawyer\'s Preserve': 92.2, 'Jacksonville/Scattered': 92.3, 'Orlando/Scattered': 92.4 },
  { month: 'Sep 24', Atlanta: 92.6, Tampa: 91.2, Jacksonville: 92.0, Orlando: 92.2, Average: 92.0, 'Atlanta/Osborne Farms': 93.2, 'Atlanta/Suwanee Square': 91.2, 'Atlanta/Scattered': 91.7, 'Tampa/Preserve at Pine Grove': 91.0, 'Tampa/Avila Bay': 90.4, 'Tampa/Belmont': 91.1, 'Tampa/Scattered': 90.9, 'Jacksonville/Sawyer\'s Preserve': 92.0, 'Jacksonville/Scattered': 92.1, 'Orlando/Scattered': 92.2 },
  { month: 'Oct 24', Atlanta: 92.4, Tampa: 91.0, Jacksonville: 91.8, Orlando: 92.0, Average: 91.8, 'Atlanta/Osborne Farms': 93.0, 'Atlanta/Suwanee Square': 91.0, 'Atlanta/Scattered': 91.5, 'Tampa/Preserve at Pine Grove': 90.8, 'Tampa/Avila Bay': 90.2, 'Tampa/Belmont': 90.9, 'Tampa/Scattered': 90.7, 'Jacksonville/Sawyer\'s Preserve': 91.8, 'Jacksonville/Scattered': 91.9, 'Orlando/Scattered': 92.0 },
  { month: 'Nov 24', Atlanta: 92.2, Tampa: 90.8, Jacksonville: 91.6, Orlando: 91.8, Average: 91.6, 'Atlanta/Osborne Farms': 92.8, 'Atlanta/Suwanee Square': 90.8, 'Atlanta/Scattered': 91.3, 'Tampa/Preserve at Pine Grove': 90.6, 'Tampa/Avila Bay': 90.0, 'Tampa/Belmont': 90.7, 'Tampa/Scattered': 90.5, 'Jacksonville/Sawyer\'s Preserve': 91.6, 'Jacksonville/Scattered': 91.7, 'Orlando/Scattered': 91.8 },
  { month: 'Dec 24', Atlanta: 92.0, Tampa: 90.6, Jacksonville: 91.4, Orlando: 91.6, Average: 91.4, 'Atlanta/Osborne Farms': 92.6, 'Atlanta/Suwanee Square': 90.6, 'Atlanta/Scattered': 91.1, 'Tampa/Preserve at Pine Grove': 90.4, 'Tampa/Avila Bay': 89.8, 'Tampa/Belmont': 90.5, 'Tampa/Scattered': 90.3, 'Jacksonville/Sawyer\'s Preserve': 91.4, 'Jacksonville/Scattered': 91.5, 'Orlando/Scattered': 91.6 },
  { month: 'Jan 25', Atlanta: 91.8, Tampa: 90.4, Jacksonville: 91.2, Orlando: 91.4, Average: 91.3, 'Atlanta/Osborne Farms': 92.4, 'Atlanta/Suwanee Square': 90.4, 'Atlanta/Scattered': 90.9, 'Tampa/Preserve at Pine Grove': 90.2, 'Tampa/Avila Bay': 89.6, 'Tampa/Belmont': 90.3, 'Tampa/Scattered': 90.1, 'Jacksonville/Sawyer\'s Preserve': 91.2, 'Jacksonville/Scattered': 91.3, 'Orlando/Scattered': 91.4 },
  { month: 'Feb 25', Atlanta: 91.6, Tampa: 90.2, Jacksonville: 91.0, Orlando: 91.2, Average: 91.2, 'Atlanta/Osborne Farms': 92.2, 'Atlanta/Suwanee Square': 90.2, 'Atlanta/Scattered': 90.7, 'Tampa/Preserve at Pine Grove': 90.0, 'Tampa/Avila Bay': 89.4, 'Tampa/Belmont': 90.1, 'Tampa/Scattered': 89.9, 'Jacksonville/Sawyer\'s Preserve': 91.0, 'Jacksonville/Scattered': 91.1, 'Orlando/Scattered': 91.2 }
];

// Mock Delinquency Data
export const mockDelinquencyData = [
  { month: 'Mar 24', Atlanta: 3.2, Tampa: 3.5, Jacksonville: 3.1, Orlando: 3.4, Average: 3.3, 'Atlanta/Osborne Farms': 3.0, 'Atlanta/Suwanee Square': 3.3, 'Atlanta/Scattered': 3.1, 'Tampa/Preserve at Pine Grove': 3.5, 'Tampa/Avila Bay': 3.6, 'Tampa/Belmont': 3.4, 'Tampa/Scattered': 3.5, 'Jacksonville/Sawyer\'s Preserve': 3.1, 'Jacksonville/Scattered': 3.2, 'Orlando/Scattered': 3.4 },
  { month: 'Apr 24', Atlanta: 3.1, Tampa: 3.6, Jacksonville: 3.0, Orlando: 3.5, Average: 3.3, 'Atlanta/Osborne Farms': 2.9, 'Atlanta/Suwanee Square': 3.4, 'Atlanta/Scattered': 3.2, 'Tampa/Preserve at Pine Grove': 3.6, 'Tampa/Avila Bay': 3.7, 'Tampa/Belmont': 3.5, 'Tampa/Scattered': 3.6, 'Jacksonville/Sawyer\'s Preserve': 3.0, 'Jacksonville/Scattered': 3.1, 'Orlando/Scattered': 3.5 },
  { month: 'May 24', Atlanta: 3.0, Tampa: 3.7, Jacksonville: 2.9, Orlando: 3.6, Average: 3.3, 'Atlanta/Osborne Farms': 2.8, 'Atlanta/Suwanee Square': 3.5, 'Atlanta/Scattered': 3.3, 'Tampa/Preserve at Pine Grove': 3.7, 'Tampa/Avila Bay': 3.8, 'Tampa/Belmont': 3.6, 'Tampa/Scattered': 3.7, 'Jacksonville/Sawyer\'s Preserve': 2.9, 'Jacksonville/Scattered': 3.0, 'Orlando/Scattered': 3.6 },
  { month: 'Jun 24', Atlanta: 2.9, Tampa: 3.8, Jacksonville: 2.8, Orlando: 3.7, Average: 3.3, 'Atlanta/Osborne Farms': 2.7, 'Atlanta/Suwanee Square': 3.6, 'Atlanta/Scattered': 3.4, 'Tampa/Preserve at Pine Grove': 3.8, 'Tampa/Avila Bay': 3.9, 'Tampa/Belmont': 3.7, 'Tampa/Scattered': 3.8, 'Jacksonville/Sawyer\'s Preserve': 2.8, 'Jacksonville/Scattered': 2.9, 'Orlando/Scattered': 3.7 },
  { month: 'Jul 24', Atlanta: 2.8, Tampa: 3.9, Jacksonville: 2.7, Orlando: 3.8, Average: 3.3, 'Atlanta/Osborne Farms': 2.6, 'Atlanta/Suwanee Square': 3.7, 'Atlanta/Scattered': 3.5, 'Tampa/Preserve at Pine Grove': 3.9, 'Tampa/Avila Bay': 4.0, 'Tampa/Belmont': 3.8, 'Tampa/Scattered': 3.9, 'Jacksonville/Sawyer\'s Preserve': 2.7, 'Jacksonville/Scattered': 2.8, 'Orlando/Scattered': 3.8 },
  { month: 'Aug 24', Atlanta: 2.7, Tampa: 4.0, Jacksonville: 2.6, Orlando: 3.9, Average: 3.3, 'Atlanta/Osborne Farms': 2.5, 'Atlanta/Suwanee Square': 3.8, 'Atlanta/Scattered': 3.6, 'Tampa/Preserve at Pine Grove': 4.0, 'Tampa/Avila Bay': 4.1, 'Tampa/Belmont': 3.9, 'Tampa/Scattered': 4.0, 'Jacksonville/Sawyer\'s Preserve': 2.6, 'Jacksonville/Scattered': 2.7, 'Orlando/Scattered': 3.9 },
  { month: 'Sep 24', Atlanta: 2.6, Tampa: 4.1, Jacksonville: 2.5, Orlando: 4.0, Average: 3.3, 'Atlanta/Osborne Farms': 2.4, 'Atlanta/Suwanee Square': 3.9, 'Atlanta/Scattered': 3.7, 'Tampa/Preserve at Pine Grove': 4.1, 'Tampa/Avila Bay': 4.2, 'Tampa/Belmont': 4.0, 'Tampa/Scattered': 4.1, 'Jacksonville/Sawyer\'s Preserve': 2.5, 'Jacksonville/Scattered': 2.6, 'Orlando/Scattered': 4.0 },
  { month: 'Oct 24', Atlanta: 2.5, Tampa: 4.2, Jacksonville: 2.4, Orlando: 4.1, Average: 3.3, 'Atlanta/Osborne Farms': 2.3, 'Atlanta/Suwanee Square': 4.0, 'Atlanta/Scattered': 3.8, 'Tampa/Preserve at Pine Grove': 4.2, 'Tampa/Avila Bay': 4.3, 'Tampa/Belmont': 4.1, 'Tampa/Scattered': 4.2, 'Jacksonville/Sawyer\'s Preserve': 2.4, 'Jacksonville/Scattered': 2.5, 'Orlando/Scattered': 4.1 },
  { month: 'Nov 24', Atlanta: 2.4, Tampa: 4.3, Jacksonville: 2.3, Orlando: 4.2, Average: 3.3, 'Atlanta/Osborne Farms': 2.2, 'Atlanta/Suwanee Square': 4.1, 'Atlanta/Scattered': 3.9, 'Tampa/Preserve at Pine Grove': 4.3, 'Tampa/Avila Bay': 4.4, 'Tampa/Belmont': 4.2, 'Tampa/Scattered': 4.3, 'Jacksonville/Sawyer\'s Preserve': 2.3, 'Jacksonville/Scattered': 2.4, 'Orlando/Scattered': 4.2 },
  { month: 'Dec 24', Atlanta: 2.3, Tampa: 4.4, Jacksonville: 2.2, Orlando: 4.3, Average: 3.3, 'Atlanta/Osborne Farms': 2.1, 'Atlanta/Suwanee Square': 4.2, 'Atlanta/Scattered': 4.0, 'Tampa/Preserve at Pine Grove': 4.4, 'Tampa/Avila Bay': 4.5, 'Tampa/Belmont': 4.3, 'Tampa/Scattered': 4.4, 'Jacksonville/Sawyer\'s Preserve': 2.2, 'Jacksonville/Scattered': 2.3, 'Orlando/Scattered': 4.3 },
  { month: 'Jan 25', Atlanta: 2.2, Tampa: 4.5, Jacksonville: 2.1, Orlando: 4.4, Average: 3.3, 'Atlanta/Osborne Farms': 2.0, 'Atlanta/Suwanee Square': 4.3, 'Atlanta/Scattered': 4.1, 'Tampa/Preserve at Pine Grove': 4.5, 'Tampa/Avila Bay': 4.6, 'Tampa/Belmont': 4.4, 'Tampa/Scattered': 4.5, 'Jacksonville/Sawyer\'s Preserve': 2.1, 'Jacksonville/Scattered': 2.2, 'Orlando/Scattered': 4.4 },
  { month: 'Feb 25', Atlanta: 2.1, Tampa: 4.6, Jacksonville: 2.0, Orlando: 4.5, Average: 3.3, 'Atlanta/Osborne Farms': 1.9, 'Atlanta/Suwanee Square': 4.4, 'Atlanta/Scattered': 4.2, 'Tampa/Preserve at Pine Grove': 4.6, 'Tampa/Avila Bay': 4.7, 'Tampa/Belmont': 4.5, 'Tampa/Scattered': 4.6, 'Jacksonville/Sawyer\'s Preserve': 2.0, 'Jacksonville/Scattered': 2.1, 'Orlando/Scattered': 4.5 }
];

export const mockBillHoursData: ChartData[] = [
  { name: 'John D.', value: 6.8 },
  { name: 'Maria L.', value: 7.2 },
  { name: 'Roberto S.', value: 6.5 },
  { name: 'Sarah K.', value: 7.0 }
];

export const mockWorkOrdersData: ChartData[] = [
  { name: 'John D.', value: 8.5 },
  { name: 'Maria L.', value: 7.8 },
  { name: 'Roberto S.', value: 8.2 },
  { name: 'Sarah K.', value: 7.5 }
];

// Mock Rent Communications
export const mockRentCommunications: RentCommunication[] = [
  {
    id: "comm1",
    tenantId: "2",
    tenantName: "Michael Chen",
    channel: "sms",
    dateTime: "2023-05-15T10:30:00",
    summary: "Rent payment reminder sent",
    status: "pending",
    rentStatus: "delinquent",
    transcript: "AI: Hello Michael, this is a friendly reminder that your rent payment of $1,450 is now 15 days past due. Please make your payment to avoid additional late fees.\nMichael: Thanks for the reminder, I'll take care of it today.",
    unit: "4578 Magnolia Drive",
    amount: 1450,
    dueDate: "2023-05-01",
    contactPhone: "(555) 234-5678",
    contactEmail: "michael.chen@example.com",
    propertyManager: "John Davis",
    actionItems: [
      "Payment reminder sent via SMS",
      "Tenant confirmed payment will be made today",
      "Follow up scheduled if payment not received by EOD"
    ]
  },
  {
    id: "comm2",
    tenantId: "3",
    tenantName: "Jessica Williams",
    channel: "email",
    dateTime: "2023-05-14T09:15:00",
    summary: "Upcoming rent payment reminder",
    status: "pending",
    rentStatus: "pending",
    transcript: "AI: Dear Jessica Williams, This is a friendly reminder that your rent payment of $1,350 is due on May 1st. Please make your payment on time to avoid late fees.\nJessica: Thank you for the reminder. I've scheduled the payment for tomorrow.",
    unit: "789 Oakwood Circle",
    amount: 1350,
    dueDate: "2023-05-01",
    contactPhone: "(555) 345-6789",
    contactEmail: "jessica.williams@example.com",
    propertyManager: "John Davis",
    actionItems: [
      "Reminder sent via email",
      "Tenant confirmed payment scheduled for tomorrow",
      "Verify payment receipt on May 16"
    ]
  },
  {
    id: "comm3",
    tenantId: "5",
    tenantName: "Emily Taylor",
    channel: "sms",
    dateTime: "2023-05-13T14:45:00",
    summary: "Rent payment reminder",
    status: "pending",
    rentStatus: "pending",
    transcript: "AI: Hello Emily, this is a friendly reminder that your rent payment of $1,550 is due on May 1st. Please make your payment on time to avoid late fees.\nEmily: I'll make the payment this weekend. Thanks for the reminder.",
    unit: "2345 Roswell Road",
    amount: 1550,
    dueDate: "2023-05-01",
    contactPhone: "(555) 567-8901",
    contactEmail: "emily.taylor@example.com",
    propertyManager: "John Davis",
    actionItems: [
      "Payment reminder sent via SMS",
      "Tenant promised payment by weekend",
      "Follow up scheduled for Monday if payment not received"
    ]
  },
  {
    id: "comm4",
    tenantId: "6",
    tenantName: "Robert Martinez",
    channel: "voice",
    dateTime: "2023-05-12T11:30:00",
    summary: "Urgent payment discussion",
    status: "committed",
    rentStatus: "delinquent",
    transcript: "AI: Hello Robert, I'm calling about your significantly overdue rent payment. Our records show you have an outstanding balance of $1,500.\nRobert: Yes, I'm aware. I've been having some financial difficulties but I just received my paycheck today.\nAI: I understand. When do you think you'll be able to make a payment?\nRobert: I can make a payment of $750 today and the remaining $750 next Friday.\nAI: That sounds like a good plan. I'll note that in your account.",
    unit: "3456 Suwanee Creek Road",
    amount: 1300,
    dueDate: "2023-04-01",
    contactPhone: "(555) 678-9012",
    contactEmail: "robert.martinez@example.com",
    propertyManager: "John Davis",
    actionItems: [
      "Payment plan established via phone",
      "Expect $750 payment today",
      "Expect remaining $750 next Friday",
      "Follow up if first payment not received"
    ]
  },
  {
    id: "comm5",
    tenantId: "7",
    tenantName: "Amanda Lee",
    channel: "email",
    dateTime: "2023-05-11T09:00:00",
    summary: "Late payment notification",
    status: "committed",
    rentStatus: "delinquent",
    transcript: "AI: Dear Amanda Lee, Our records show that your rent payment of $1,400 is now overdue. Please make your payment as soon as possible to avoid additional late fees.\nAmanda: I apologize for the delay. I've been out of town and will make the payment when I return tomorrow.",
    unit: "8901 Piedmont Avenue",
    amount: 1400,
    dueDate: "2023-05-01",
    contactPhone: "(555) 789-0123",
    contactEmail: "amanda.lee@example.com",
    propertyManager: "John Davis",
    actionItems: [
      "Late payment notification sent via email",
      "Tenant promised payment tomorrow",
      "Follow up if payment not received by EOD tomorrow"
    ]
  },
  {
    id: "comm6",
    tenantId: "8",
    tenantName: "Daniel Kim",
    channel: "sms",
    dateTime: "2023-05-10T16:15:00",
    summary: "Payment plan discussion",
    status: "failed",
    rentStatus: "delinquent",
    transcript: "AI: Hello Daniel, I'm reaching out about your overdue rent payment of $1,500. Would you like to discuss payment options?\nDaniel: Yes, I've been meaning to call about that. I can pay $500 now and then $500 each week for the next two weeks.\nAI: That sounds like a reasonable plan. I'll update your account with this arrangement.",
    unit: "6789 Osborne Road",
    amount: 1500,
    dueDate: "2023-05-01",
    contactPhone: "(555) 890-1234",
    contactEmail: "daniel.kim@example.com",
    propertyManager: "John Davis",
    actionItems: [
      "Payment plan established via SMS",
      "Expect $500 payment today",
      "Expect $500 payment next week",
      "Expect final $500 payment in two weeks",
      "Flag for follow-up if first payment missed"
    ]
  },
  {
    id: "comm7",
    tenantId: "9",
    tenantName: "Sophia Garcia",
    channel: "email",
    dateTime: "2023-05-09T10:45:00",
    summary: "Rent payment reminder",
    status: "pending",
    rentStatus: "pending",
    transcript: "AI: Dear Sophia Garcia, This is a friendly reminder that your rent payment of $1,275 is due on May 1st. Please make your payment on time to avoid late fees.\nSophia: Thank you for the reminder. I'll make the payment this week.",
    unit: "5432 McGinnis Ferry Road",
    amount: 1275,
    dueDate: "2023-05-01",
    contactPhone: "(555) 901-2345",
    contactEmail: "sophia.garcia@example.com",
    propertyManager: "John Davis",
    actionItems: [
      "Payment reminder sent via email",
      "Tenant promised payment this week",
      "Follow up if payment not received by Friday"
    ]
  },
  {
    id: "comm8",
    tenantId: "11",
    tenantName: "Olivia Thompson",
    channel: "sms",
    dateTime: "2023-05-08T13:30:00",
    summary: "Rent payment reminder",
    status: "committed",
    rentStatus: "pending",
    transcript: "AI: Hello Olivia, this is a friendly reminder that your rent payment of $1,225 is due on May 1st. Please make your payment on time to avoid late fees.\nOlivia: Thanks for the reminder! I'll make the payment today.",
    unit: "7890 Avila Circle",
    amount: 1225,
    dueDate: "2023-05-01",
    contactPhone: "(555) 123-4567",
    contactEmail: "olivia.thompson@example.com",
    propertyManager: "Emily Watson",
    actionItems: [
      "Payment reminder sent via SMS",
      "Tenant committed to pay today",
      "Verify payment receipt tomorrow"
    ]
  },
  {
    id: "comm9",
    tenantId: "12",
    tenantName: "William Brown",
    channel: "voice",
    dateTime: "2023-05-07T14:00:00",
    summary: "Urgent payment discussion",
    status: "pending",
    rentStatus: "delinquent",
    transcript: "AI: Hello William, I'm calling about your significantly overdue rent payment. Our records show you have an outstanding balance of $2,950, which is equivalent to two months of rent.\nWilliam: I've been dealing with some serious financial hardships. I lost my job last month.\nAI: I'm sorry to hear that. Would you like to discuss potential assistance programs or a payment plan?\nWilliam: Yes, that would be very helpful. I'm actively looking for a new job and expect to have income again soon.\nAI: We can work with you on this. Let's set up a meeting with the property manager to discuss options.",
    unit: "4321 Belmont Shores Drive",
    amount: 1475,
    dueDate: "2023-04-01",
    contactPhone: "(555) 234-5678",
    contactEmail: "william.brown@example.com",
    propertyManager: "Emily Watson",
    actionItems: [
      "Urgent payment discussion via phone",
      "Tenant experiencing significant financial hardship",
      "Schedule meeting with property manager",
      "Research assistance programs for tenant",
      "Flag account for special handling"
    ]
  },
  {
    id: "comm10",
    tenantId: "14",
    tenantName: "Alexander Martin",
    channel: "email",
    dateTime: "2023-05-06T11:45:00",
    summary: "Late payment notification",
    status: "delivered",
    rentStatus: "delinquent",
    transcript: "AI: Dear Alexander Martin, Your rent payment of $1,250 is now significantly overdue. Our records show you have an outstanding balance of $1,875. Please contact us immediately to discuss payment options and avoid potential eviction proceedings.\nAlexander: I apologize for the delay. I've been hospitalized for the past few weeks. I'll call the office tomorrow to discuss a payment plan.",
    unit: "5544 Riverside Drive",
    amount: 1250,
    dueDate: "2023-04-01",
    contactPhone: "(555) 456-7890",
    contactEmail: "alexander.martin@example.com",
    propertyManager: "Michael Roberts",
    actionItems: [
      "Late payment notification sent via email",
      "Tenant reported medical emergency",
      "Expect call from tenant tomorrow",
      "Prepare payment plan options",
      "Flag for compassionate handling"
    ]
  },
  {
    id: "comm11",
    tenantId: "15",
    tenantName: "Isabella Clark",
    channel: "sms",
    dateTime: "2023-05-05T15:20:00",
    summary: "Rent payment reminder",
    status: "failed",
    rentStatus: "pending",
    transcript: "AI: Hello Isabella, this is a friendly reminder that your rent payment of $1,500 is due on May 1st. Please make your payment on time to avoid late fees.\nIsabella: Thank you for the reminder. I've already set up automatic payment for tomorrow.",
    unit: "3210 Lake Eola Drive",
    amount: 1500,
    dueDate: "2023-05-01",
    contactPhone: "(555) 567-8901",
    contactEmail: "isabella.clark@example.com",
    propertyManager: "Lisa Johnson",
    actionItems: [
      "Reminder sent via SMS",
      "Tenant confirmed automatic payment scheduled",
      "Verify payment receipt tomorrow",
      "Consider suggesting enrollment in autopay program"
    ]
  }
];

// Define the current superintendent constant
export const CURRENT_SUPER = "Michael Rodriguez";

// Mock Superintendent Communications
export const mockSuperCommunications = [
  {
    id: '1',
    tenantName: 'Robert Garcia',
    unit: 'Oakwood 101',
    community: 'Atlanta/Osborne Farms',
    superintendent: 'Michael Rodriguez',
    status: 'urgent',
    message: 'Water leak reported in bathroom, possible pipe burst. Tenant reports water coming through ceiling. Immediate attention required.',
    date: '2025-03-15T09:30:00',
    category: 'plumbing'
  },
  {
    id: '2',
    tenantName: 'Jennifer Lopez',
    unit: 'Riverfront 205',
    community: 'Tampa/Preserve at Pine Grove',
    superintendent: 'Michael Rodriguez',
    status: 'scheduled',
    message: 'HVAC maintenance scheduled for tomorrow between 1-3 PM. Unit is cooling but not efficiently.',
    date: '2025-03-14T14:15:00',
    category: 'hvac'
  },
  {
    id: '3',
    tenantName: 'Thomas White',
    unit: 'Sunset 304',
    community: 'Jacksonville/Sawyer\'s Preserve',
    superintendent: 'Michael Rodriguez',
    status: 'completed',
    message: 'Replaced broken garbage disposal as requested. Also noticed and fixed a small leak under the sink.',
    date: '2025-03-13T11:45:00',
    category: 'appliance'
  },
  {
    id: '4',
    tenantName: 'Patricia Martinez',
    unit: 'Oakwood 205',
    community: 'Atlanta/Osborne Farms',
    superintendent: 'Michael Rodriguez',
    status: 'scheduled',
    message: 'Smoke detector replacement scheduled for Mar 19. Current detector is beeping intermittently.',
    date: '2025-03-13T16:30:00',
    category: 'safety'
  },
  {
    id: '5',
    tenantName: 'James Taylor',
    unit: 'Riverfront 110',
    community: 'Tampa/Preserve at Pine Grove',
    superintendent: 'Michael Rodriguez',
    status: 'urgent',
    message: 'No hot water in apartment. Tenant has reported water heater making unusual noises yesterday.',
    date: '2025-03-15T08:15:00',
    category: 'plumbing'
  },
  {
    id: '6',
    tenantName: 'Mary Johnson',
    unit: 'Sunset 202',
    community: 'Orlando/Scattered',
    superintendent: 'Michael Rodriguez',
    status: 'completed',
    message: 'Repaired loose balcony railing as reported. Inspected all other railings and found them secure.',
    date: '2025-03-10T13:20:00',
    category: 'structural'
  },
  {
    id: '7',
    tenantName: 'Daniel Brown',
    unit: 'Oakwood 303',
    community: 'Atlanta/Suwanee Square',
    superintendent: 'Michael Rodriguez',
    status: 'scheduled',
    message: 'Window replacement scheduled for Mar 20. Current window has crack that is expanding.',
    date: '2025-03-12T10:30:00',
    category: 'windows'
  },
  {
    id: '8',
    tenantName: 'Sarah Wilson',
    unit: 'Riverfront 307',
    community: 'Tampa/Avila Bay',
    superintendent: 'Michael Rodriguez',
    status: 'completed',
    message: 'Fixed kitchen light fixture flickering issue. Replaced ballast and verified operation.',
    date: '2025-03-11T15:45:00',
    category: 'electrical'
  },
  {
    id: '9',
    tenantName: 'Michael Davis',
    unit: 'Sunset 105',
    community: 'Jacksonville/Scattered',
    superintendent: 'Michael Rodriguez',
    status: 'urgent',
    message: 'Front door lock jammed, tenant unable to enter apartment. Locksmith dispatched.',
    date: '2025-03-15T17:00:00',
    category: 'locks'
  },
  {
    id: '10',
    tenantName: 'Emily Thompson',
    unit: 'Oakwood 404',
    community: 'Atlanta/Scattered',
    superintendent: 'Michael Rodriguez',
    status: 'scheduled',
    message: 'Dishwasher making loud noise during operation. Repair scheduled for Mar 18.',
    date: '2025-03-14T09:15:00',
    category: 'appliance'
  }
];

// Add after the mockSuperCommunications array

// Define the current leasing agent constant

// Mock Leasing Agent Communications
export const mockLeasingCommunications = [
  {
    id: '1',
    prospectName: 'Sarah Johnson',
    propertyInterest: '245 Oakridge Drive',
    community: 'Osborne Farms',
    market: 'Atlanta',
    leasingAgent: 'Emily Wilson',
    status: 'inquiry',
    message: 'Initial inquiry about 3-bedroom homes, pricing, and availability for April move-in. Interested in pet policies and yard size.',
    date: '2025-03-12T10:30:00',
    category: 'inquiry',
    transcript: `AI: Hello! Thank you for your interest in our Atlanta properties. How can I help you today?
Sarah Johnson: Hi, I'm looking for information about homes in the Osborne Farms area.
AI: Great! We have several properties available in Osborne Farms. Are you interested in a specific size or number of bedrooms?
Sarah Johnson: I'm looking for a 3-bedroom home with a fenced yard. What's your pet policy?
AI: Many of our homes in Osborne Farms have 3 bedrooms and fenced yards. We are pet-friendly with a $500 pet deposit and $35 monthly pet rent. We have a lovely property at 245 Oakridge Drive that might be perfect for you. Would you like to schedule a tour?`
  },
  {
    id: '2',
    prospectName: 'Michael Chen',
    propertyInterest: '187 Riverside Lane',
    community: 'Preserve at Pine Grove',
    market: 'Tampa',
    leasingAgent: 'Emily Wilson',
    status: 'tour_scheduled',
    message: 'Tour scheduled for tomorrow at 2 PM. Looking for 4-bedroom with fenced yard. Mentioned parking needs for 2 vehicles.',
    date: '2025-03-14T14:15:00',
    category: 'tour',
    transcript: `AI: Hello! I'd like to confirm your tour scheduled for 3/14/2025, 2:15:00 PM at 187 Riverside Lane. Is this time still convenient for you?
Michael Chen: Yes, that works for me. I'm especially interested in seeing the yard and garage space.
AI: Perfect! Your tour is confirmed with Emily Wilson, our leasing specialist. She'll show you the entire property including the yard and garage. Is there anything specific you'd like to know about the neighborhood?
Michael Chen: I'd like to know about nearby schools and shopping areas.
AI: Absolutely! Emily Wilson will provide information about the local schools and amenities. The property is near several well-rated schools and just 10 minutes from a shopping center. We look forward to meeting you!`
  },
  {
    id: '3',
    prospectName: 'Jessica Rodriguez',
    propertyInterest: '722 Parkview Avenue',
    community: 'Scattered',
    market: 'Orlando',
    leasingAgent: 'Emily Wilson',
    status: 'application_sent',
    message: 'Application sent for review. Follow-up call about income verification documents and pet deposit information.',
    date: '2025-03-11T11:45:00',
    category: 'application',
    transcript: `AI: Hello Jessica Rodriguez, I'm following up regarding your application for 722 Parkview Avenue. Our team is currently reviewing your information.
Jessica Rodriguez: Thanks for the update. How long does the review process usually take?
AI: Our standard review process takes 2-3 business days. We're checking credit history, income verification, and rental references. Do you have any questions about the process?
Jessica Rodriguez: What's the minimum credit score requirement?
AI: We typically look for a credit score of 650 or higher, but we consider the complete application. If needed, we can discuss options like a higher security deposit or having a guarantor. The 722 Parkview Avenue property is very popular, so we're trying to process applications quickly.`
  },
  {
    id: '4',
    prospectName: 'David Taylor',
    propertyInterest: '528 Suwanee Circle',
    community: 'Suwanee Square',
    market: 'Atlanta',
    leasingAgent: 'Emily Wilson',
    status: 'application_received',
    message: 'Application received. Discussion about credit score requirements and guarantor options. Will provide additional references.',
    date: '2025-03-10T16:30:00',
    category: 'screening',
    transcript: `AI: Hello David Taylor, I wanted to let you know we've received your application for 528 Suwanee Circle and have begun the screening process.
David Taylor: Great, thank you. Are there any documents I need to provide?
AI: We'll need your last two pay stubs or proof of income, and we'll be contacting your previous landlords for references. Your credit check is already in progress.
David Taylor: I just started a new job. Will that be an issue?
AI: As long as you can provide an offer letter and verification of employment, that should be fine. Our goal is to complete your screening by 3/13/2025.`
  },
  {
    id: '5',
    prospectName: 'Jennifer Lee',
    propertyInterest: '953 Avila Drive',
    community: 'Avila Bay',
    market: 'Tampa',
    leasingAgent: 'Emily Wilson',
    status: 'approved',
    message: 'Application approved. Discussion about lease signing date and move-in details. Requested information about utility setup.',
    date: '2025-03-12T09:15:00',
    category: 'approval',
    transcript: `AI: Congratulations Jennifer Lee! I'm pleased to inform you that your application for 953 Avila Drive has been approved.
Jennifer Lee: That's wonderful news! What are the next steps?
AI: We'll need you to sign the lease agreement within 48 hours to secure the property. Would you prefer to do this electronically or in person?
Jennifer Lee: Electronic would be easiest for me. When can I move in?
AI: We can send the lease documents today via email. Based on your requested move-in date, you can move in on April 1st. We'll also need your security deposit and first month's rent before providing keys. Do you have any questions about utilities or the move-in process?`
  },
  {
    id: '6',
    prospectName: 'Robert Wilson',
    propertyInterest: '341 Magnolia Court',
    community: 'Scattered',
    market: 'Orlando',
    leasingAgent: 'Emily Wilson',
    status: 'inquiry',
    message: 'Inquiry about pricing for 4-bedroom homes and any current specials. Asked about school districts and neighborhood amenities.',
    date: '2025-03-09T13:20:00',
    category: 'pricing',
    transcript: `AI: Hello! Thank you for your interest in our properties in Scattered. How can I assist you today?
Robert Wilson: I'm wondering about pricing for homes in the area, particularly 4-bedroom properties.
AI: In Scattered, our 4-bedroom homes typically rent for between $2,200 and $2,600 per month, depending on features like updated kitchens, finished basements, or larger yards. Are you looking for any specific features?
Robert Wilson: Do you offer any move-in specials or discounts?
AI: Yes! We currently have a spring special offering half off the first month's rent for leases signed before April 15th. We also waive the application fee for qualified military personnel and first responders.`
  },
  {
    id: '7',
    prospectName: 'Emma Garcia',
    propertyInterest: '675 Belmont Road',
    community: 'Belmont',
    market: 'Tampa',
    leasingAgent: 'Emily Wilson',
    status: 'tour_scheduled',
    message: 'Virtual tour scheduled for March 15. Relocating from out of state. Requested information about nearby schools and public transportation.',
    date: '2025-03-08T10:30:00',
    category: 'location',
    transcript: `AI: Hello Emma Garcia! I understand you're relocating to our area. How can I help make your move easier?
Emma Garcia: I'd like to know more about Belmont and what's around it. Particularly schools and transportation.
AI: Belmont is located in a family-friendly area with excellent schools. The elementary school is rated 8/10 on GreatSchools, and there's a middle and high school within 3 miles. Public transportation includes bus routes that connect to downtown, and there's a commuter train station about 4 miles away. The neighborhood has several parks within walking distance and a community center with a pool.
Emma Garcia: That sounds promising. What about grocery stores and restaurants?
AI: You'll find a Publix supermarket just 5 minutes away, along with several local restaurants and cafes. There's a larger shopping center about 10 minutes by car with more retail options, restaurants, and a movie theater.`
  },
  {
    id: '8',
    prospectName: 'Thomas Brown',
    propertyInterest: '442 Sawyer Lane',
    community: 'Sawyer\'s Preserve',
    market: 'Jacksonville',
    leasingAgent: 'Emily Wilson',
    status: 'declined',
    message: 'Application declined due to insufficient income. Discussion about alternative properties with lower rent requirements.',
    date: '2025-03-07T15:45:00',
    category: 'application',
    transcript: `AI: Hello Thomas Brown, I'm reaching out regarding your application for 442 Sawyer Lane. I regret to inform you that we were unable to approve your application at this time.
Thomas Brown: Can you tell me why it was declined?
AI: The primary reason was the income verification. Our policy requires that monthly income be at least three times the monthly rent. We do have other properties with lower rental rates that might be more suitable. Would you be interested in hearing about those options?
Thomas Brown: Yes, please. What other properties do you have available?
AI: We have a nice home in Jacksonville with a monthly rent that's about $400 less. It's still a 3-bedroom but slightly smaller. Would you like to schedule a tour of this property instead?`
  },
  {
    id: '9',
    prospectName: 'Sophia Martinez',
    propertyInterest: '829 Scattered Way',
    community: 'Scattered',
    market: 'Jacksonville',
    leasingAgent: 'Emily Wilson',
    status: 'inquiry',
    message: 'Detailed questions about property maintenance, lawn care responsibilities, and whether a home office space can be built in the garage.',
    date: '2025-03-13T17:00:00',
    category: 'amenities',
    transcript: `AI: Hello Sophia Martinez, thank you for your interest in 829 Scattered Way. How can I assist you today?
Sophia Martinez: I have some questions about the property maintenance and whether I can build a home office in the garage.
AI: For maintenance, our company handles all structural, plumbing, electrical, and HVAC issues. Tenants are responsible for lawn care and basic upkeep, though we do offer a lawn service add-on for $120 per month. Regarding modifications to the garage, any permanent changes would need approval, but we're generally open to reasonable improvements. Could you tell me more about what you're planning?
Sophia Martinez: I'd just need to add electrical outlets and possibly insulation to make it comfortable as a workspace.
AI: Adding outlets would likely be approved as long as it's done by a licensed electrician. Insulation might also be permitted if it doesn't alter the structure. Would you like to discuss this further during a property tour?`
  },
  {
    id: '10',
    prospectName: 'Daniel Kim',
    propertyInterest: '156 Osborne Street',
    community: 'Osborne Farms',
    market: 'Atlanta',
    leasingAgent: 'Emily Wilson',
    status: 'tour_scheduled',
    message: 'Tour scheduled for next week. Specific interest in home layout and storage space. Asked about noise levels from neighboring properties.',
    date: '2025-03-15T09:15:00',
    category: 'tour',
    transcript: `AI: Hello Daniel Kim! I'd like to confirm your tour scheduled for March 15th at 156 Osborne Street. Is this time still convenient for you?
Daniel Kim: Yes, that works for me. I'm particularly interested in the home layout and storage options.
AI: Perfect! Your tour is confirmed with Emily Wilson. She'll be sure to highlight the layout and all storage areas throughout the home. Is there anything specific about the layout you're looking for?
Daniel Kim: I work from home, so I need a good space for a home office. Also, what's the noise level like from neighboring properties?
AI: Emily will show you several spaces that would work well as a home office. Regarding noise, Osborne Farms is known for being a quiet community with good spacing between homes. Most neighbors are families or professionals, and the HOA has noise regulations to ensure everyone's comfort. We look forward to meeting you on the 15th!`
  }
];
