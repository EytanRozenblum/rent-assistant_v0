
import React from 'react';
import { AIConversation } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageSquare, Mail, Clock, Users, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CommunicationsAnalyticsProps {
  conversations: AIConversation[];
}

const CommunicationsAnalytics = ({ conversations }: CommunicationsAnalyticsProps) => {
  // Calculate statistics
  const totalConversations = conversations.length;
  const voiceCount = conversations.filter(c => c.channel === 'voice').length;
  const smsCount = conversations.filter(c => c.channel === 'sms').length;
  const emailCount = conversations.filter(c => c.channel === 'email').length;
  
  // Average conversation time (mock data)
  const avgTime = Math.floor(Math.random() * 300 + 120); // 2-5 minutes
  const avgTimeMin = Math.floor(avgTime / 60);
  const avgTimeSec = avgTime % 60;
  
  // Channel distribution data for pie chart
  const channelData = [
    { name: 'Voice', value: voiceCount, color: '#4f46e5' },
    { name: 'SMS', value: smsCount, color: '#10b981' },
    { name: 'Email', value: emailCount, color: '#f59e0b' },
  ];
  
  // Sentiment distribution data
  const sentimentData = [
    { name: 'Positive', value: Math.floor(totalConversations * 0.65), color: '#10b981' },
    { name: 'Neutral', value: Math.floor(totalConversations * 0.25), color: '#6b7280' },
    { name: 'Negative', value: Math.floor(totalConversations * 0.1), color: '#ef4444' },
  ];
  
  // Activity by hour (mock data)
  const activityByHour = [
    { hour: '12am', count: 5 },
    { hour: '3am', count: 1 },
    { hour: '6am', count: 3 },
    { hour: '9am', count: 18 },
    { hour: '12pm', count: 25 },
    { hour: '3pm', count: 22 },
    { hour: '6pm', count: 15 },
    { hour: '9pm', count: 10 },
  ];
  
  return (
    <div className="space-y-6">
      {/* Metrics overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
              <h4 className="text-3xl font-bold">{totalConversations}</h4>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Conversation Time</p>
              <h4 className="text-3xl font-bold">{avgTimeMin}:{avgTimeSec.toString().padStart(2, '0')}</h4>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
              <h4 className="text-3xl font-bold">92%</h4>
            </div>
            <CheckCircle className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Positive Sentiment</p>
              <h4 className="text-3xl font-bold">65%</h4>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              😊
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Communication Channels */}
        <Card>
          <CardHeader>
            <CardTitle>Communication Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Activity by Hour */}
        <Card>
          <CardHeader>
            <CardTitle>Activity by Time of Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityByHour}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" name="Conversations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationsAnalytics;
