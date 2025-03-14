import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Search,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { mockTenants } from '@/data/mockData';
import TenantsTable from '@/components/tenants/TenantsTable';
import TenantStatusFilter from '@/components/tenants/TenantStatusFilter';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';

// Current property manager constant
const CURRENT_MANAGER = "John Davis";

const PropertyManagerTenants = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [rentStatusFilters, setRentStatusFilters] = useState<string[]>([]);
  const [marketFilters, setMarketFilters] = useState<string[]>([]);
  const [filteredTenants, setFilteredTenants] = useState([]);

  // Filter tenants based on search query and filters
  useEffect(() => {
    // First filter by property manager
    let filtered = mockTenants.filter(tenant => tenant.propertyManager === CURRENT_MANAGER);
    
    // Then apply other filters
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tenant => 
        tenant.name.toLowerCase().includes(query) || 
        tenant.unit.toLowerCase().includes(query) || 
        tenant.email.toLowerCase().includes(query) ||
        tenant.community.toLowerCase().includes(query)
      );
    }

    // Apply market filters
    if (marketFilters.length > 0) {
      filtered = filtered.filter(tenant => {
        // Assuming community follows the format "City/Community"
        const tenantMarket = tenant.community.split('/')[0];
        return marketFilters.some(filter => filter.startsWith(tenantMarket));
      });
    }

    if (statusFilters.length > 0) {
      filtered = filtered.filter(tenant => statusFilters.includes(tenant.status));
    }

    if (rentStatusFilters.length > 0) {
      filtered = filtered.filter(tenant => rentStatusFilters.includes(tenant.rentStatus));
    }

    setFilteredTenants(filtered);
  }, [searchQuery, statusFilters, rentStatusFilters, marketFilters]);

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
          <h1 className="text-2xl font-bold">Tenants</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_MANAGER}</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto"
            onClick={() => navigate('/manager/tenants/add')}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
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
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All My Tenants</CardTitle>
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
                onChange={setMarketFilters}
              />
              <TenantStatusFilter 
                selectedValues={rentStatusFilters}
                onChange={setRentStatusFilters}
                filterType="rentStatus"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTenants.length > 0 ? (
            <TenantsTable tenants={filteredTenants} />
          ) : (
            <div className="text-center py-6">
              <p>No tenants found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyManagerTenants; 