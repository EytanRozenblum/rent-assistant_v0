import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Bot, User, MessageSquare, Mail, Phone, AlertCircle, CheckCircle2, Clock, Calendar, FileText, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLeasingCommunications, CURRENT_LEASING_AGENT } from '@/data/mockData';

// Define the structure for leasing agent communications
interface LeasingCommunication {
  id: string;
  prospectName: string;
  propertyInterest: string;
  community: string;
  market: string;
  leasingAgent: string;
  status: 'inquiry' | 'tour_scheduled' | 'application_sent' | 'application_received' | 'approved' | 'declined';
  message: string;
  date: string;
  category: string;
  transcript: string;
  channel?: 'sms' | 'email' | 'phone';
}

interface LeasingAgentCommunicationAIConsoleProps {
  searchQuery?: string;
  marketFilters: string[];
  topicFilters?: string[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'inquiry':
      return <MessageCircle className="h-5 w-5 text-blue-500" />;
    case 'tour_scheduled':
      return <Calendar className="h-5 w-5 text-purple-500" />;
    case 'application_sent':
      return <FileText className="h-5 w-5 text-yellow-500" />;
    case 'application_received':
      return <FileText className="h-5 w-5 text-orange-500" />;
    case 'approved':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'declined':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <MessageSquare className="h-5 w-5 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'inquiry':
      return 'bg-blue-100 text-blue-800';
    case 'tour_scheduled':
      return 'bg-amber-100 text-amber-800';
    case 'application_sent':
      return 'bg-purple-100 text-purple-800';
    case 'application_received':
      return 'bg-indigo-100 text-indigo-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'declined':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Determine channel based on ID for demonstration purposes
const getChannel = (id: string): 'sms' | 'email' | 'phone' => {
  // Use the last digit of the ID to determine channel type
  const lastDigit = parseInt(id.slice(-1));
  if (lastDigit >= 0 && lastDigit <= 3) {
    return 'sms';
  } else if (lastDigit >= 4 && lastDigit <= 7) {
    return 'email';
  } else {
    return 'phone';
  }
};

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'sms':
      return <MessageSquare className="h-4 w-4" />;
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'phone':
      return <Phone className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const getChannelDisplayName = (channel: string) => {
  switch (channel) {
    case 'sms':
      return 'Text Message';
    case 'email':
      return 'Email';
    case 'phone':
      return 'Phone Call';
    default:
      return 'Communication';
  }
};

const getStatusDisplayName = (status: string) => {
  switch (status) {
    case 'inquiry':
      return 'Inquiry';
    case 'tour_scheduled':
      return 'Tour Scheduled';
    case 'application_sent':
      return 'Application Sent';
    case 'application_received':
      return 'Application Received';
    case 'approved':
      return 'Approved';
    case 'declined':
      return 'Declined';
    default:
      return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
};

const LeasingAgentCommunicationAIConsole: React.FC<LeasingAgentCommunicationAIConsoleProps> = ({
  searchQuery = "",
  marketFilters = [],
  topicFilters = []
}) => {
  const [filteredCommunications, setFilteredCommunications] = useState<LeasingCommunication[]>([]);
  const [selectedCommunication, setSelectedCommunication] = useState<LeasingCommunication | null>(null);
  const [activeTab, setActiveTab] = useState('summary');

  // Function to handle selecting a communication
  const handleSelectCommunication = (communication: LeasingCommunication) => {
    setSelectedCommunication(communication);
    setActiveTab('summary');
  };

  useEffect(() => {
    let filtered = mockLeasingCommunications.filter(
      comm => comm.leasingAgent === CURRENT_LEASING_AGENT
    );
    
    // Add channel info to each communication
    filtered = filtered.map(comm => ({
      ...comm,
      channel: getChannel(comm.id)
    }));
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comm => 
        comm.prospectName.toLowerCase().includes(query) || 
        comm.community.toLowerCase().includes(query) || 
        comm.message.toLowerCase().includes(query) ||
        comm.propertyInterest.toLowerCase().includes(query)
      );
    }
    
    if (marketFilters.length > 0) {
      filtered = filtered.filter(comm => {
        return marketFilters.some(filter => comm.community.includes(filter));
      });
    }

    // Add filtering by leasing topics
    if (topicFilters.length > 0) {
      filtered = filtered.filter(comm => topicFilters.includes(comm.category));
    }
    
    setFilteredCommunications(filtered as LeasingCommunication[]);
    
    // If we have communications and none selected, select the first one
    if (filtered.length > 0 && !selectedCommunication) {
      setSelectedCommunication(filtered[0] as LeasingCommunication);
    } else if (filtered.length === 0) {
      setSelectedCommunication(null);
    }
  }, [searchQuery, marketFilters, topicFilters, selectedCommunication]);

  return (
    <div className="flex border rounded-md overflow-hidden h-[600px]">
      {/* Communications Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-3 border-b">
          <h3 className="font-medium">Recent Communications</h3>
        </div>
        
        <div className="overflow-y-auto">
          {filteredCommunications.length > 0 ? (
            filteredCommunications.map((communication) => (
              <div 
                key={communication.id}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedCommunication?.id === communication.id ? 'bg-gray-50' : ''}`}
                onClick={() => handleSelectCommunication(communication)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                    {getChannelIcon(communication.channel || 'sms')}
                  </div>
                  <span className="font-medium">{communication.prospectName}</span>
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {communication.message}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(communication.date).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                <div className="mt-1">
                  <Badge className={getStatusColor(communication.status)}>
                    {getStatusDisplayName(communication.status)}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No communications match your filters</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Detail View */}
      <div className="flex-1 flex flex-col">
        {selectedCommunication ? (
          <>
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                    {getChannelIcon(selectedCommunication.channel || 'sms')}
                  </div>
                  <div>
                    <div className="font-medium">{selectedCommunication.prospectName}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{getChannelDisplayName(selectedCommunication.channel || 'sms')}</span>
                      <span>•</span>
                      <span>{selectedCommunication.propertyInterest}</span>
                      <span>•</span>
                      <span>{selectedCommunication.community}</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Button with Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      Contact Prospect
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[280px]">
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-3">
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`tel:555-123-4567`, '_blank')}
                        >
                          <Phone className="h-4 w-4 text-brand-600" />
                          <span>Call {selectedCommunication.prospectName}</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`sms:555-123-4567`, '_blank')}
                        >
                          <MessageSquare className="h-4 w-4 text-brand-600" />
                          <span>Text {selectedCommunication.prospectName}</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`mailto:prospect@example.com`, '_blank')}
                        >
                          <Mail className="h-4 w-4 text-brand-600" />
                          <span>Email {selectedCommunication.prospectName}</span>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Tabs */}
              <div className="mt-4 border-b">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'summary' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('transcript')}
                    className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'transcript' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Transcript
                  </button>
                  {selectedCommunication.channel === 'phone' && (
                    <button
                      onClick={() => setActiveTab('conversation')}
                      className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'conversation' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Recording
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Communication Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'summary' && (
                <div>
                  {/* Prospect Details */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Prospect Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{selectedCommunication.prospectName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Property Interest</p>
                        <p className="font-medium">{selectedCommunication.propertyInterest}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Community</p>
                        <p className="font-medium">{selectedCommunication.community}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <Badge className={getStatusColor(selectedCommunication.status)}>
                          {getStatusDisplayName(selectedCommunication.status)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Communication Channel</p>
                        <p className="font-medium flex items-center gap-1">
                          {getChannelIcon(selectedCommunication.channel || 'sms')}
                          <span>{getChannelDisplayName(selectedCommunication.channel || 'sms')}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{new Date(selectedCommunication.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Communication Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Communication Summary</h4>
                    <p>{selectedCommunication.message}</p>
                  </div>
                  
                  {/* Action Items */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Recommended Actions</h4>
                    <ul className="list-disc list-inside">
                      {selectedCommunication.status === 'inquiry' && (
                        <>
                          <li>Follow up with detailed property information</li>
                          <li>Offer a tour scheduling opportunity</li>
                          <li>Share floor plans and virtual tour links</li>
                        </>
                      )}
                      {selectedCommunication.status === 'tour_scheduled' && (
                        <>
                          <li>Send tour confirmation with directions</li>
                          <li>Prepare personalized tour highlights based on interests</li>
                          <li>Set reminder to follow up after tour</li>
                        </>
                      )}
                      {(selectedCommunication.status === 'application_sent' || selectedCommunication.status === 'application_received') && (
                        <>
                          <li>Review application for completeness</li>
                          <li>Verify income and rental history</li>
                          <li>Prepare approval or alternative options</li>
                        </>
                      )}
                      {selectedCommunication.status === 'approved' && (
                        <>
                          <li>Schedule lease signing</li>
                          <li>Prepare move-in information package</li>
                          <li>Coordinate key handoff and orientation</li>
                        </>
                      )}
                      {selectedCommunication.status === 'declined' && (
                        <>
                          <li>Offer alternative properties or floor plans</li>
                          <li>Suggest guarantor or deposit options</li>
                          <li>Keep prospect in database for future availability</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'transcript' && (
                <div className="p-4 overflow-y-auto">
                  {selectedCommunication.transcript.split('\n').map((line, index) => {
                    const isAI = line.startsWith('AI:');
                    const content = line.replace(/^(AI:|.*?:)/, '').trim();
                    
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
                              {isAI ? 'AI Agent' : selectedCommunication.prospectName}
                            </span>
                          </div>
                          <div>{content}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {activeTab === 'conversation' && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Phone className="h-12 w-12 mx-auto mb-3 text-brand-300" />
                    <p>Call recording would play here</p>
                    <p className="text-sm text-gray-500 mt-2">Duration: 3:12</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-3 text-brand-300" />
              <p>Select a communication to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeasingAgentCommunicationAIConsole; 