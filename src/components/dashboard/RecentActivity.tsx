
import React from 'react';
import { AIConversation } from '@/types';
import { Phone, MessageSquare, Mail, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivityProps {
  conversations: AIConversation[];
}

const RecentActivity = ({ conversations }: RecentActivityProps) => {
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
  
  const getRelatedText = (conversation: AIConversation) => {
    switch (conversation.relatedTo) {
      case 'lead':
        return `Lead engagement`;
      case 'tenant':
        return `Tenant communication`;
      case 'maintenance':
        return `Maintenance coordination`;
      case 'general':
        return `General inquiry`;
      default:
        return '';
    }
  };
  
  const getSentimentColor = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'neutral':
        return 'bg-gray-100 text-gray-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-base font-medium mb-4">Recent AI Interactions</h3>
      <div className="space-y-4">
        {conversations.map((conversation) => {
          const date = new Date(conversation.dateTime);
          const timeAgo = formatDistanceToNow(date, { addSuffix: true });
          
          return (
            <div key={conversation.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
              <div className={`w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600`}>
                {getChannelIcon(conversation.channel)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{conversation.contactName}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{getRelatedText(conversation)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSentimentColor(conversation.sentiment)}`}>
                    {conversation.sentiment}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  {conversation.summary}
                </div>
                
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeAgo}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
