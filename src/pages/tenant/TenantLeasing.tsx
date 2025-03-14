
import React, { useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';
import PhoneInterface from '@/components/tenant/PhoneInterface';
import TenantVoiceAgent, { TenantVoiceAgentRef } from '@/components/tenant/TenantVoiceAgent';

type Screen = 'contact' | 'calling' | 'inCall';

interface TenantLeasingProps {
  scenario?: string;
}

const TenantLeasing: React.FC<TenantLeasingProps> = ({ scenario: propScenario }) => {
  // Extract the scenario from the URL path
  const params = useParams();
  const location = useLocation();
  
  // Log the full URL and params for debugging
  console.log('Current location:', location);
  console.log('Current params:', params);
  
  const urlScenario = params['*']?.split('/').pop();
  const scenario = propScenario || urlScenario || 'lead';
  
  const [currentScreen, setCurrentScreen] = useState<Screen>('contact');
  const [isPlaying, setIsPlaying] = useState(false);
  const voiceAgentRef = useRef<TenantVoiceAgentRef>(null);
  
  const toggleVideoAndScreen = () => {
    if (isPlaying) {
      voiceAgentRef.current?.playVideo();
      setCurrentScreen('contact');
      setIsPlaying(false);
    } else {
      setCurrentScreen('calling');
      setTimeout(() => {
        setCurrentScreen('inCall');
      }, 2000);
      voiceAgentRef.current?.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Home className="h-5 w-5 mr-2" />
              PropertyAI Voice Assistant - {scenario || 'lead'} Interaction
            </h3>
            <p className="text-sm">
              Start a call using the phone interface to see the AI assistant in action.
            </p>
          </div>
        </div>
        
        <Card className="w-full md:w-[700px] flex-shrink-0 relative">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-[280px]">
                <PhoneInterface
                  currentScreen={currentScreen}
                  setCurrentScreen={setCurrentScreen}
                  scenario={scenario}
                />
              </div>
              
              <div className="flex-1">
                <TenantVoiceAgent
                  ref={voiceAgentRef}
                  currentScreen={currentScreen}
                  scenario={scenario}
                  onScreenChange={setCurrentScreen}
                />
              </div>
            </div>
          </CardContent>
          
          <button
            onClick={toggleVideoAndScreen}
            className="absolute bottom-0 left-0 right-0 h-16 bg-transparent hover:bg-black/[0.02] transition-colors duration-200 z-10"
            style={{ border: 'none', outline: 'none' }}
          />
        </Card>
      </CardContent>
    </Card>
  );
};

export default TenantLeasing;
