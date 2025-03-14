import React, { useState, useEffect, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Bot, User, MessageSquare, Mail, Phone, List, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockRentCommunications } from '@/data/mockData';
import { useAuth } from "@/hooks/useAuth";

// Define the structure for rent communications
interface RentCommunication {
  id: string;
  tenantId: string;
  tenantName: string;
  channel: 'sms' | 'email' | 'voice';
  dateTime: string;
  summary: string;
  status: 'delivered' | 'failed' | 'committed' | 'pending';
  transcript: string;
  unit?: string;
  amount?: number;
  dueDate?: string;
  contactPhone?: string;
  contactEmail?: string;
  propertyManager?: string;
  actionItems?: string[];
  property: string;
  message: string;
}

interface PropertyManagerRentAIConsoleProps {
  communications?: RentCommunication[];
  currentManager?: string;
  searchQuery?: string;
  statusFilters?: string[];
  marketFilters: string[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-blue-100 text-blue-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'committed':
      return 'bg-orange-100 text-orange-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusDisplayName = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'Delivered';
    case 'failed':
      return 'Failed to Collect Payment';
    case 'committed':
      return 'Committed to Pay';
    case 'pending':
      return 'Pending Payment';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'sms':
      return <MessageSquare className="h-4 w-4" />;
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'voice':
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
    case 'voice':
      return 'Phone Call';
    default:
      return channel;
  }
};

const PropertyManagerRentAIConsole: React.FC<PropertyManagerRentAIConsoleProps> = ({
  communications = mockRentCommunications,
  currentManager = "John Davis", // Default for demo purposes
  searchQuery = "",
  statusFilters = [],
  marketFilters = []
}) => {
  const [selectedCommunication, setSelectedCommunication] = useState<RentCommunication | null>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [filteredCommunications, setFilteredCommunications] = useState<RentCommunication[]>([]);
  
  useEffect(() => {
    // Start with communications for the current property manager
    let filtered = communications.filter(
      comm => comm.propertyManager === currentManager
    );
    
    // Apply search filter if there's a query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comm => 
        comm.tenantName.toLowerCase().includes(query) || 
        comm.property.toLowerCase().includes(query) || 
        comm.message.toLowerCase().includes(query)
      );
    }
    
    // Apply status filters if any are selected
    if (statusFilters.length > 0) {
      filtered = filtered.filter(comm => 
        statusFilters.includes(comm.status)
      );
    }
    
    // Apply market filters if any are selected
    if (marketFilters.length > 0) {
      filtered = filtered.filter(comm => {
        // Assuming property follows format "City/Property"
        const market = comm.property.split('/')[0];
        return marketFilters.some(filter => filter.startsWith(market));
      });
    }
    
    setFilteredCommunications(filtered);
    
    // If the currently selected communication is filtered out, deselect it
    if (selectedCommunication && !filtered.some(comm => comm.id === selectedCommunication.id)) {
      setSelectedCommunication(null);
    }
  }, [communications, currentManager, searchQuery, statusFilters, marketFilters, selectedCommunication]);
  
  useEffect(() => {
    // Auto-select the first conversation when the component mounts
    // or when the filtered conversations change
    if (filteredCommunications.length > 0 && !selectedCommunication) {
      setSelectedCommunication(filteredCommunications[0]);
    }
  }, [filteredCommunications, selectedCommunication]);
  
  const handleSelectCommunication = (communication: RentCommunication) => {
    setSelectedCommunication(communication);
    setActiveTab('summary'); // Reset to summary tab when selecting a new communication
  };

  return (
    <div className="flex h-[600px] border rounded-md overflow-hidden">
      {/* Communications List */}
      <div className="w-1/3 border-r flex flex-col">
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
                    {getChannelIcon(communication.channel)}
                  </div>
                  <span className="font-medium">{communication.tenantName}</span>
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {communication.summary}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(communication.dateTime).toLocaleString(undefined, {
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
              No communications match your filters.
            </div>
          )}
        </div>
      </div>
      
      {/* Communication Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {selectedCommunication ? (
          <>
            {/* Communication Header */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                    {getChannelIcon(selectedCommunication.channel)}
                  </div>
                  <div>
                    <div className="font-medium">{selectedCommunication.tenantName}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{getChannelDisplayName(selectedCommunication.channel)}</span>
                      <span>•</span>
                      <span>{selectedCommunication.unit}</span>
                      <span>•</span>
                      <span>${selectedCommunication.amount?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Button with Dialog - Now bigger and on the right */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      Contact Tenant
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[280px]">
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-3">
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`tel:${selectedCommunication.contactPhone || '555-123-4567'}`)}
                        >
                          <Phone className="h-4 w-4 text-brand-600" />
                          <span>Call {selectedCommunication.tenantName}</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`sms:${selectedCommunication.contactPhone || '555-123-4567'}`)}
                        >
                          <MessageSquare className="h-4 w-4 text-brand-600" />
                          <span>Text {selectedCommunication.tenantName}</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`mailto:${selectedCommunication.contactEmail || 'contact@example.com'}`)}
                        >
                          <Mail className="h-4 w-4 text-brand-600" />
                          <span>Email {selectedCommunication.tenantName}</span>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Tab Navigation - Now more user-friendly */}
              <div className="mt-4 border-b">
                <div className="flex">
                  <button 
                    onClick={() => setActiveTab('summary')}
                    className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'summary' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <List className="h-4 w-4 mr-2" />
                    Summary
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('transcript')}
                    className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'transcript' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Transcript
                  </button>
                  
                  {selectedCommunication.channel === 'voice' && (
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
                  {/* Rent Details */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Rent Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Unit</p>
                        <p className="font-medium">{selectedCommunication.unit || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium">${selectedCommunication.amount?.toLocaleString() || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Due Date</p>
                        <p className="font-medium">{selectedCommunication.dueDate || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <Badge className={getStatusColor(selectedCommunication.status)}>
                          {getStatusDisplayName(selectedCommunication.status)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Property Manager</p>
                        <p className="font-medium">{selectedCommunication.propertyManager || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Communication Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Communication Summary</h4>
                    <p>{selectedCommunication.summary}</p>
                  </div>
                  
                  {/* Action Items */}
                  {selectedCommunication.actionItems && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium mb-2">Action Items</h4>
                      <ul className="list-disc list-inside">
                        {selectedCommunication.actionItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'transcript' && (
                <div>
                  {selectedCommunication.transcript.split('\n').map((line, index) => {
                    const isAI = line.startsWith('AI:');
                    const content = line.replace(/^(AI:|Michael:|Robert:|Amanda:|Daniel:|William:|Jessica:|Emily:|Sophia:|Olivia:|Alexander:|Isabella:)/, '').trim();
                    
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
                              {isAI ? 'AI Agent' : selectedCommunication.tenantName}
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
                    <p className="text-sm text-gray-500 mt-2">Duration: 3:45</p>
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

export default PropertyManagerRentAIConsole; 