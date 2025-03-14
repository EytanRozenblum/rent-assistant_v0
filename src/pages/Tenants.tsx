import React, { useState, useEffect } from 'react';
import TenantsTable from '@/components/tenants/TenantsTable';
import { mockTenants } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Download, FileText, Search, ExternalLink, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import RentStatusFilter from '@/components/tenants/RentStatusFilter';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const Tenants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [selectedRentStatuses, setSelectedRentStatuses] = useState<string[]>([]);
  const [filteredTenants, setFilteredTenants] = useState(mockTenants);

  // Filter tenants based on selected filters and search query
  useEffect(() => {
    let filtered = mockTenants;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tenant => 
        tenant.name.toLowerCase().includes(query) || 
        tenant.unit.toLowerCase().includes(query) || 
        tenant.email.toLowerCase().includes(query) ||
        tenant.community.toLowerCase().includes(query) ||
        (tenant.propertyManager && tenant.propertyManager.toLowerCase().includes(query))
      );
    }
    
    // Filter by market/community
    if (selectedMarketCommunities.length > 0) {
      filtered = filtered.filter(tenant => {
        const marketCommunity = `${tenant.market}/${tenant.community}`;
        return selectedMarketCommunities.some(mc => marketCommunity.includes(mc));
      });
    }
    
    // Filter by rent status
    if (selectedRentStatuses.length > 0) {
      filtered = filtered.filter(tenant => 
        selectedRentStatuses.includes(tenant.rentStatus)
      );
    }
    
    setFilteredTenants(filtered);
  }, [searchQuery, selectedMarketCommunities, selectedRentStatuses]);

  // Calculate summary statistics based on tenant rent status
  const collectedRent = mockTenants
    .filter(tenant => tenant.rentStatus === 'paid')
    .reduce((sum, tenant) => sum + (tenant.rentAmount || 0), 0);
  
  const pendingRent = mockTenants
    .filter(tenant => tenant.rentStatus === 'pending')
    .reduce((sum, tenant) => sum + (tenant.rentAmount || 0), 0);
  
  const delinquentRent = mockTenants
    .filter(tenant => tenant.rentStatus === 'delinquent')
    .reduce((sum, tenant) => sum + (tenant.amountDQ || 0), 0);
  
  const totalRent = mockTenants.reduce((sum, tenant) => sum + (tenant.rentAmount || 0), 0);
  const collectionRate = totalRent > 0 ? Math.round((collectedRent / totalRent) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tenants</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Yardi
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
          <CardTitle>All Tenants</CardTitle>
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
                selectedValues={selectedMarketCommunities}
                onChange={setSelectedMarketCommunities}
              />
              <RentStatusFilter 
                selectedValues={selectedRentStatuses}
                onChange={setSelectedRentStatuses}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTenants.length > 0 ? (
            <TenantsTable tenants={filteredTenants} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tenants found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Tenants;
