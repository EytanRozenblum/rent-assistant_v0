
import React, { useState } from 'react';
import { AIConversation } from '@/types';
import { Phone, MessageSquare, Mail, User, Bot, Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface AIAgentConsoleProps {
  conversations: AIConversation[];
}

const AIAgentConsole = ({ conversations }: AIAgentConsoleProps) => {
  const [selectedConversation, setSelectedConversation] = useState<AIConversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  
  const handleSelectConversation = (conversation: AIConversation) => {
    setSelectedConversation(conversation);
  };
  
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the AI agent.",
    });
    
    setInputText('');
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording 
        ? "Your voice recording has been stopped." 
        : "The AI agent is now listening to your voice input.",
    });
  };
  
  const getChannelIcon = (channel: 'voice' | 'sms' | 'email') => {
    switch (channel) {
      case 'voice':
        return <Phone className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-[600px] flex">
      {/* Conversations Sidebar */}
      <div className="w-1/4 border-r border-gray-100 overflow-y-auto">
        <div className="p-3 border-b border-gray-100">
          <h3 className="font-medium">Recent Conversations</h3>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''}`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                  {getChannelIcon(conversation.channel)}
                </div>
                <span className="font-medium">{conversation.contactName}</span>
              </div>
              <div className="text-sm text-gray-600 truncate">
                {conversation.summary}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(conversation.dateTime).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                  {getChannelIcon(selectedConversation.channel)}
                </div>
                <div>
                  <div className="font-medium">{selectedConversation.contactName}</div>
                  <div className="text-xs text-gray-500">{selectedConversation.channel}</div>
                </div>
              </div>
              
              <Tabs defaultValue="transcript">
                <TabsList>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <TabsContent value="transcript" className="mt-0 h-full">
                {selectedConversation.transcript.split('\n').map((line, index) => {
                  const isAI = line.startsWith('AI:');
                  const content = line.replace(/^(AI:|John:|Thomas:|Jennifer:)/, '').trim();
                  
                  if (!content) return null;
                  
                  return (
                    <div key={index} className={`flex mb-3 ${isAI ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${isAI ? 'bg-gray-100' : 'bg-brand-100 text-brand-900'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {isAI ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {isAI ? 'AI Agent' : selectedConversation.contactName}
                          </span>
                        </div>
                        <div>{content}</div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="summary" className="mt-0 h-full">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Conversation Summary</h4>
                  <p>{selectedConversation.summary}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Sentiment</h4>
                  <p className="capitalize">{selectedConversation.sentiment}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Action Items</h4>
                  <ul className="list-disc list-inside">
                    {selectedConversation.actionItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </div>
            
            {/* Chat Input */}
            <div className="p-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleRecording}
                  className={isRecording ? 'bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700' : ''}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                
                <Button onClick={handleSendMessage}>
                  <Send className="h-5 w-5 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-3 text-brand-300" />
              <p>Select a conversation to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgentConsole;
