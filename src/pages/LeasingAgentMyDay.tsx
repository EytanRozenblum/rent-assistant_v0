import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ExternalLink, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LeadsTable from '@/components/leads/LeadsTable';
import { mockLeads, CURRENT_LEASING_AGENT } from '@/data/mockData';
import { format } from 'date-fns';

const LeasingAgentMyDay = () => {
  const navigate = useNavigate();
  
  // Today's date in ISO format for filtering
  const todayISO = new Date().toISOString().split('T')[0];
  
  // Filter leads for today's appointments and contacts for the current agent
  const todaysTours = mockLeads.filter(
    lead => lead.assignedTo === CURRENT_LEASING_AGENT && 
            lead.status === 'tour_scheduled' &&
            lead.tourScheduled === todayISO
  );
  
  // Leads that need to be contacted today
  const todaysContacts = mockLeads.filter(
    lead => lead.assignedTo === CURRENT_LEASING_AGENT && 
            lead.dateCreated === todayISO &&
            (lead.status === 'new' || lead.status === 'contacted')
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Day</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_LEASING_AGENT}</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline"
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/agent/calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Open Calendar
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/agent/applications')}
          >
            <FileText className="h-4 w-4 mr-2" />
            All Applications
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/agent/leads')}
          >
            <Users className="h-4 w-4 mr-2" />
            All Leads
          </Button>
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Today's Tours</CardTitle>
          </CardHeader>
          <CardContent>
            {todaysTours.length > 0 ? (
              <LeadsTable leads={todaysTours} />
            ) : (
              <div className="text-center py-6">
                <p>No tours scheduled for today.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Leads To Contact Today</CardTitle>
          </CardHeader>
          <CardContent>
            {todaysContacts.length > 0 ? (
              <LeadsTable leads={todaysContacts} />
            ) : (
              <div className="text-center py-6">
                <p>No new leads to contact today.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total scheduled tours</span>
                <span className="font-medium">{todaysTours.length}</span>
              </div>
              <div className="flex justify-between">
                <span>New leads to contact</span>
                <span className="font-medium">{todaysContacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span>First appointment</span>
                <span className="font-medium">
                  {todaysTours.length > 0 ? 
                    format(new Date(todaysTours[0].tourDateTime!), 'h:mm a') : 
                    'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last appointment</span>
                <span className="font-medium">
                  {todaysTours.length > 0 ? 
                    format(new Date(todaysTours[todaysTours.length - 1].tourDateTime!), 'h:mm a') : 
                    'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Applications pending review</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeasingAgentMyDay;
