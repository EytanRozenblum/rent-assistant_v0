import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, MessageCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CURRENT_LEASING_AGENT } from '@/data/mockData';

const AskPage = () => {
  const [agentPrompt, setAgentPrompt] = useState('');
  const [agentResponses, setAgentResponses] = useState<{
    question: string;
    answer: string;
    id: string;
  }[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agentPrompt.trim()) {
      const newConversation = {
        id: Date.now().toString(),
        question: agentPrompt,
        answer: 'I am analyzing your request for data insights. In a real implementation, this would connect to your property data to generate accurate analytics information.'
      };
      setAgentResponses([newConversation, ...agentResponses]);
      setSelectedConversationId(newConversation.id);
      setAgentPrompt('');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Chat with your AI Assistant</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_LEASING_AGENT}</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Export
          </Button>
          
          <Button 
            size="sm" 
            className="flex items-center gap-1 min-w-[125px] justify-center"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-[300px,1fr] gap-6">
        {/* Conversations List */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {agentResponses.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {agentResponses.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer hover:bg-muted/50",
                      selectedConversationId === conversation.id && "bg-muted"
                    )}
                    onClick={() => setSelectedConversationId(conversation.id)}
                  >
                    <p className="font-medium text-sm truncate">{conversation.question}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {conversation.answer.substring(0, 60)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Chat Area */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>Ask your Leasing Agent AI Assistant</CardTitle>
            <CardDescription>Ask questions about your leasing data and get AI-powered insights</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {agentResponses.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No conversations yet. Ask a question to get started.</p>
                </div>
              ) : (
                agentResponses
                  .filter(item => !selectedConversationId || item.id === selectedConversationId)
                  .map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="font-medium">You:</p>
                        <p>{item.question}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium">AI Agent:</p>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
            
            <form onSubmit={handleAgentSubmit} className="flex space-x-2">
              <Input 
                value={agentPrompt}
                onChange={(e) => setAgentPrompt(e.target.value)}
                placeholder="Ask a question about your leasing data..."
                className="flex-1"
              />
              <Button type="submit">Ask</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AskPage; 