
import React from 'react';
import TenantsTable from '@/components/tenants/TenantsTable';
import { mockTenants } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, FileText, DownloadCloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Tenants = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tenants</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <TenantsTable tenants={mockTenants} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Tenants;
