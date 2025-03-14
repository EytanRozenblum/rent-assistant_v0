import React from 'react';
import { AIConversation } from '@/types';

interface ConversationViewProps {
  conversation: AIConversation;
}

const ConversationView: React.FC<ConversationViewProps> = ({ conversation }) => {
  // Add console log to debug
  console.log('ConversationView received conversation:', conversation);
  
  return (
    <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-200 rounded-lg p-6">
      <div className="text-center">
        <h3 className="text-xl font-medium mb-2">Listen to conversation</h3>
        <p className="text-gray-600">
          {conversation?.contactName || 'Unknown'}'s {conversation?.channel || 'communication'} conversation 
          {conversation?.scenario ? ` about ${conversation.scenario}` : ''}
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Click to start listening to this conversation
        </p>
      </div>
    </div>
  );
};

export default ConversationView;
