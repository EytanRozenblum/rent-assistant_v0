
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockRentPayments } from '@/data/mockData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useLocation } from 'react-router-dom';

// Define the current property manager
const CURRENT_PROPERTY_MANAGER = "John Davis";

const RentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  
  // Check if we're in the property manager view
  const isManagerView = location.pathname.startsWith('/manager');
  
  // Filter payments based on the current view
  const paymentsData = isManagerView 
    ? mockRentPayments.filter(payment => payment.propertyManager === CURRENT_PROPERTY_MANAGER)
    : mockRentPayments;
  
  const filteredPayments = paymentsData.filter(payment => 
    payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary statistics
  const totalRent = paymentsData.reduce((sum, payment) => sum + payment.amount, 0);
  const collectedRent = paymentsData
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const collectionRate = Math.round((collectedRent / totalRent) * 100);
  
  const pendingRent = paymentsData
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const delinquentRent = paymentsData
    .filter(payment => payment.status === 'delinquent')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'delinquent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {isManagerView ? 'My Properties Rent Collection' : 'Rent Collection'}
        </h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-green-500" />
              ${collectedRent.toLocaleString()}
            </CardTitle>
            <CardDescription>Collected Rent</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={collectionRate} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">{collectionRate}% of ${totalRent.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-yellow-500" />
              ${pendingRent.toLocaleString()}
            </CardTitle>
            <CardDescription>Pending Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(pendingRent / totalRent) * 100} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">{Math.round((pendingRent / totalRent) * 100)}% of total rent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-red-500" />
              ${delinquentRent.toLocaleString()}
            </CardTitle>
            <CardDescription>Delinquent Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(delinquentRent / totalRent) * 100} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">{Math.round((delinquentRent / totalRent) * 100)}% of total rent</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            {isManagerView ? 'My Properties Rent Payments' : 'Rent Payments'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPayments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Date Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{payment.tenantName}</TableCell>
                    <TableCell>{payment.unit}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>{payment.datePaid || '—'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.paymentMethod || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payments found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RentPage;
