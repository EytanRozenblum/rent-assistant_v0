import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Download, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import LeasingAgentCommunicationAIConsole from '@/components/rent/LeasingAgentCommunicationAIConsole';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import LeasingTopicFilter from '@/components/rent/LeasingTopicFilter';
import { CURRENT_LEASING_AGENT } from '@/data/mockData';

const LeasingAgentCommunication = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [marketFilters, setMarketFilters] = useState<string[]>([]);
  const [topicFilters, setTopicFilters] = useState<string[]>([]);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI Chats with Leads</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_LEASING_AGENT}</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto"
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
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search communications..."
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
              <LeasingTopicFilter 
                selectedValues={topicFilters}
                onChange={setTopicFilters}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <LeasingAgentCommunicationAIConsole 
            searchQuery={searchQuery}
            marketFilters={marketFilters}
            topicFilters={topicFilters}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LeasingAgentCommunication; 