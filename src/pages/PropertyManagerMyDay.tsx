import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, HandCoins, CalendarClock, CreditCard, Search, ExternalLink, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockTenants } from '@/data/mockData';
import TenantsTable from '@/components/tenants/TenantsTable';
import TenantStatusFilter from '@/components/tenants/TenantStatusFilter';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';

const CURRENT_MANAGER = "John Davis";

const PropertyManagerMyDay = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [rentStatusFilters, setRentStatusFilters] = useState<string[]>([]);
  const [marketFilters, setMarketFilters] = useState<string[]>([]);
  const [filteredAttentionTenants, setFilteredAttentionTenants] = useState([]);
  const [myTenants, setMyTenants] = useState([]);
  
  // Debug log for filter changes
  useEffect(() => {
    console.log("Market filters updated:", marketFilters);
    console.log("Rent status filters updated:", rentStatusFilters);
  }, [marketFilters, rentStatusFilters]);
  
  // Get all tenants for the current property manager
  useEffect(() => {
    const managerTenants = mockTenants.filter(
      tenant => tenant.propertyManager === CURRENT_MANAGER
    );
    setMyTenants(managerTenants);
    
    // Initialize attention required tenants
    const attentionRequired = managerTenants.filter(
      tenant => tenant.rentStatus === 'delinquent' || tenant.rentStatus === 'pending'
    );
    setFilteredAttentionTenants(attentionRequired);
  }, []);

  // Filter attention required tenants based on search query and filters
  useEffect(() => {
    // Start with all attention required tenants for the current manager
    let baseAttentionTenants = mockTenants.filter(
      tenant => (tenant.rentStatus === 'delinquent' || tenant.rentStatus === 'pending') && 
                tenant.propertyManager === CURRENT_MANAGER
    );
    
    console.log("Starting with attention tenants:", baseAttentionTenants.length);
    
    // Apply search filter if there's a query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      baseAttentionTenants = baseAttentionTenants.filter(tenant => 
        tenant.name.toLowerCase().includes(query) || 
        tenant.unit.toLowerCase().includes(query) || 
        tenant.email.toLowerCase().includes(query) ||
        tenant.community.toLowerCase().includes(query)
      );
      console.log("After search filter:", baseAttentionTenants.length);
    }

    // Apply market filters if any are selected
    if (marketFilters.length > 0) {
      console.log("Applying market filters:", marketFilters);
      baseAttentionTenants = baseAttentionTenants.filter(tenant => {
        // Log each tenant's community to verify format
        console.log(`Tenant ${tenant.name} community: ${tenant.community}`);
        
        // Correctly match the community format from MarketCommunityFilter
        return marketFilters.includes(tenant.community);
      });
      console.log("After market filter:", baseAttentionTenants.length);
    }

    // Apply rent status filters if any are selected
    if (rentStatusFilters.length > 0) {
      console.log("Applying rent status filters:", rentStatusFilters);
      baseAttentionTenants = baseAttentionTenants.filter(tenant => 
        rentStatusFilters.includes(tenant.rentStatus)
      );
      console.log("After rent status filter:", baseAttentionTenants.length);
    }

    setFilteredAttentionTenants(baseAttentionTenants);
  }, [searchQuery, rentStatusFilters, marketFilters]);

  // Calculate summary statistics based on tenant rent status
  const managerTenants = mockTenants.filter(tenant => 
    tenant.propertyManager === CURRENT_MANAGER
  );

  const collectedRent = managerTenants
    .filter(tenant => tenant.rentStatus === 'paid')
    .reduce((sum, tenant) => sum + (tenant.rentAmount || 0), 0);
  
  const pendingRent = managerTenants
    .filter(tenant => tenant.rentStatus === 'pending')
    .reduce((sum, tenant) => sum + (tenant.rentAmount || 0), 0);
  
  const delinquentRent = managerTenants
    .filter(tenant => tenant.rentStatus === 'delinquent')
    .reduce((sum, tenant) => sum + (tenant.amountDQ || 0), 0);
  
  const totalRent = managerTenants.reduce((sum, tenant) => sum + (tenant.rentAmount || 0), 0);
  const collectionRate = totalRent > 0 ? Math.round((collectedRent / totalRent) * 100) : 0;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Day</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_MANAGER}</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/manager/tenants')}
          >
            <Users className="h-4 w-4 mr-2" />
            All Tenants
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/manager/communication')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Rent Collection
          </Button>
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            See in Yardi
          </Button>
        </div>
      </div>
      
      {/* Rent Summary Cards */}
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
            <Progress value={totalRent > 0 ? (pendingRent / totalRent) * 100 : 0} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">{totalRent > 0 ? Math.round((pendingRent / totalRent) * 100) : 0}% of ${totalRent.toLocaleString()}</p>
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
            <Progress value={totalRent > 0 ? (delinquentRent / totalRent) * 100 : 0} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">{totalRent > 0 ? Math.round((delinquentRent / totalRent) * 100) : 0}% of ${totalRent.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col gap-6 w-full">
        {/* Second Card - Tenants Requiring Attention with Search and Filter */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Tenants Requiring Attention</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tenants..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <MarketCommunityFilter
                  selectedValues={marketFilters}
                  onChange={(values) => {
                    console.log("Market filter changed to:", values);
                    setMarketFilters(values);
                  }}
                />
                <TenantStatusFilter 
                  selectedValues={rentStatusFilters}
                  onChange={(values) => {
                    console.log("Rent status filter changed to:", values);
                    setRentStatusFilters(values);
                  }}
                  filterType="rentStatus"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredAttentionTenants.length > 0 ? (
              <div className="overflow-auto">
                <TenantsTable tenants={filteredAttentionTenants} />
              </div>
            ) : (
              <div className="text-center py-6">
                <p>No tenants require immediate attention matching your filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Daily Summary Card */}
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total units</span>
                <span className="font-medium">148</span>
              </div>
              <div className="flex justify-between">
                <span>Occupancy rate</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex justify-between">
                <span>Delinquent accounts</span>
                <span className="font-medium text-destructive">4</span>
              </div>
              <div className="flex justify-between">
                <span>Expiring leases (30 days)</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span>Scheduled tours today</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span>Pending maintenance</span>
                <span className="font-medium">14</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyManagerMyDay;
