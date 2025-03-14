import React, { useState, useRef } from 'react';
import { AIConversation } from '@/types';
import { Phone, MessageSquare, Mail, User, Bot, Send, Mic, MicOff, FileText, List, MessageCircle, Home, Settings, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ConversationView from '@/components/communications/ConversationView';
import { Badge } from "@/components/ui/badge";
import PhoneInterface from '@/components/tenant/PhoneInterface';
import TenantVoiceAgent, { TenantVoiceAgentRef } from '@/components/tenant/TenantVoiceAgent';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import components for different department consoles
import LeasingAgentCommunicationAIConsole from '@/components/rent/LeasingAgentCommunicationAIConsole';
import PropertyManagerRentAIConsole from '@/components/rent/PropertyManagerRentAIConsole';
import SuperintendentCommunicationAIConsole from '@/components/rent/SuperintendentCommunicationAIConsole';

interface AIAgentConsoleProps {
  conversations: AIConversation[];
  activeDepartment: string;
  activeView: string;
  searchQuery: string;
  marketFilters: string[];
  leasingTopicFilters: string[];
  statusFilters: string[];
  maintenanceTopicFilters: string[];
}

const getCategoryBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'leasing':
      return 'bg-blue-100 text-blue-800';
    case 'operations':
      return 'bg-purple-100 text-purple-800';
    case 'maintenance':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getSubcategoryBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'leasing':
      return 'bg-blue-50 text-blue-700';
    case 'operations':
      return 'bg-purple-50 text-purple-700';
    case 'maintenance':
      return 'bg-orange-50 text-orange-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};

const formatCategory = (scenario: string) => {
  if (!scenario) return 'General';
  const [category] = scenario.split('/');
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const formatSubcategory = (scenario: string) => {
  if (!scenario) return 'Inquiry';
  const [_, type] = scenario.split('/');
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ');
};

const getChannelDisplayName = (channel: string) => {
  switch (channel.toLowerCase()) {
    case 'voice':
      return 'Phone Call';
    case 'sms':
      return 'Text Message';
    case 'email':
      return 'Email';
    default:
      return channel;
  }
};

const AIAgentConsole: React.FC<AIAgentConsoleProps> = ({
  conversations,
  activeDepartment,
  activeView,
  searchQuery,
  marketFilters,
  leasingTopicFilters,
  statusFilters,
  maintenanceTopicFilters
}) => {
  const [selectedConversation, setSelectedConversation] = useState<AIConversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const [currentScreen, setCurrentScreen] = useState<'contact' | 'calling' | 'inCall'>('contact');
  const voiceAgentRef = useRef<TenantVoiceAgentRef>(null);
  const [activeTab, setActiveTab] = useState('summary');
  
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
  
  const getChannelIcon = (channel: string) => {
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
  
  const handleCallStarted = () => {
    // Any logic needed when call starts
  };

  const handlePlayVideo = () => {
    voiceAgentRef.current?.playVideo();
  };

  const handleScreenChange = (screen: 'contact' | 'calling' | 'inCall') => {
    setCurrentScreen(screen);
  };

  // Extract scenario from the selected conversation
  const getScenario = () => {
    if (!selectedConversation?.scenario) return 'lead';
    
    // Extract the scenario part after the slash
    const parts = selectedConversation.scenario.split('/');
    return parts.length > 1 ? parts[1] : parts[0];
  };
  
  return (
    <div className="space-y-4">
      {/* Main Content Area */}
      <Tabs value={activeDepartment} className="w-full">
        <TabsContent value="leasing">
          {activeView === 'console' ? (
            <LeasingAgentCommunicationAIConsole 
              searchQuery={searchQuery}
              marketFilters={marketFilters}
              topicFilters={leasingTopicFilters}
            />
          ) : (
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Leasing Analytics</h2>
              <p className="text-muted-foreground">Leasing analytics dashboard coming soon.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="operations">
          {activeView === 'console' ? (
            <PropertyManagerRentAIConsole 
              searchQuery={searchQuery}
              marketFilters={marketFilters}
              statusFilters={statusFilters}
            />
          ) : (
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Property Operations Analytics</h2>
              <p className="text-muted-foreground">Property operations analytics dashboard coming soon.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="maintenance">
          {activeView === 'console' ? (
            <SuperintendentCommunicationAIConsole 
              searchQuery={searchQuery}
              marketFilters={marketFilters}
              topicFilters={maintenanceTopicFilters}
              statusFilters={statusFilters}
            />
          ) : (
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Maintenance Analytics</h2>
              <p className="text-muted-foreground">Maintenance analytics dashboard coming soon.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAgentConsole;
