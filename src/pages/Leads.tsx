import React, { useState } from 'react';
import LeadsTable from '@/components/leads/LeadsTable';
import { mockLeads } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, FileText, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Leads = () => {
  const [leasingAgent, setLeasingAgent] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');

  const filteredLeads = mockLeads.filter(lead => {
    if (leasingAgent !== 'all' && lead.assignedTo !== leasingAgent) {
      return false;
    }
    if (status !== 'all' && lead.status !== status) {
      return false;
    }
    return true;
  });

  const leasingAgents = [...new Set(mockLeads.map(lead => lead.assignedTo))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads & Tours</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <BarChart className="h-4 w-4 mr-2" />
            Activity Dashboard
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="leads">
        <TabsList className="mb-6">
          <TabsTrigger value="leads">All Leads</TabsTrigger>
          <TabsTrigger value="initial">Initial Contact</TabsTrigger>
          <TabsTrigger value="scheduled">Tour Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed Application</TabsTrigger>
          <TabsTrigger value="signed">Lease Signed</TabsTrigger>
          <TabsTrigger value="onboarded">Onboarded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads">
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <CardTitle>Current Leads</CardTitle>
              
              <div className="flex gap-4">
                <Select value={leasingAgent} onValueChange={setLeasingAgent}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Leasing Agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    {leasingAgents.map(agent => (
                      <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Initial Contact</SelectItem>
                    <SelectItem value="scheduled">Tour Scheduled</SelectItem>
                    <SelectItem value="completed">Application Completed</SelectItem>
                    <SelectItem value="approved">Lease Signed</SelectItem>
                    <SelectItem value="active">Onboarded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={filteredLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="initial">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Initial Contact Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={mockLeads.filter(lead => lead.status === 'pending')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tour Scheduled Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={mockLeads.filter(lead => lead.status === 'scheduled')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Completed Application Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={mockLeads.filter(lead => lead.status === 'completed')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="signed">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Lease Signed Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={mockLeads.filter(lead => lead.status === 'approved')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="onboarded">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Onboarded Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={mockLeads.filter(lead => lead.status === 'active')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leads;
