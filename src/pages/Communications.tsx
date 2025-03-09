
import React from 'react';
import AIAgentConsole from '@/components/communications/AIAgentConsole';
import { mockAIConversations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Mail, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Communications = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Communications</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Text
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>AI Agent Console</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="console">
            <TabsList className="mb-4">
              <TabsTrigger value="console">Agent Console</TabsTrigger>
              <TabsTrigger value="history">Conversation History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="console">
              <AIAgentConsole conversations={mockAIConversations} />
            </TabsContent>
            
            <TabsContent value="history">
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 h-[600px] flex items-center justify-center">
                <div>
                  <h3 className="text-lg font-medium mb-2">Conversation History</h3>
                  <p>View and search through past conversations.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 h-[600px] flex items-center justify-center">
                <div>
                  <h3 className="text-lg font-medium mb-2">Communication Analytics</h3>
                  <p>View analytics and insights from AI communications.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Communications;
