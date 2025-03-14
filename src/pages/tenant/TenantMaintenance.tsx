import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TenantMaintenance = () => {
  const [phoneState, setPhoneState] = useState('contact');
  const [callTime, setCallTime] = useState(0);
  const [showClock, setShowClock] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  
  useEffect(() => {
    // Cleanup timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const startCallSimulation = () => {
    // First transition to calling screen
    setPhoneState('calling');
    
    // After 2 seconds, transition to in-call and start the clock
    setTimeout(() => {
      setPhoneState('in-call');
      setShowClock(true);
      
      // Start the call timer
      timerRef.current = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      
    }, 2000);
    
    // Start the video after 2 seconds
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 2000);
  };
  
  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const renderPhoneScreen = () => {
    switch (phoneState) {
      case 'contact':
        return <img src="/contact_screen.png" alt="Contact screen" className="w-full rounded-lg shadow-lg" />;
      case 'calling':
        return <img src="/calling_screen.png" alt="Calling screen" className="w-full rounded-lg shadow-lg" />;
      case 'in-call':
        return (
          <div className="relative">
            <img src="/in_call_screen.png" alt="In-call screen" className="w-full rounded-lg shadow-lg" />
            {showClock && (
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-white text-lg font-mono">
                {formatCallTime(callTime)}
              </div>
            )}
          </div>
        );
      default:
        return <img src="/contact_screen.png" alt="Contact screen" className="w-full rounded-lg shadow-lg" />;
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-medium flex items-center mb-6">
          <Phone className="h-5 w-5 mr-2" />
          Property AI Call Assistant
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            {renderPhoneScreen()}
          </div>
          
          <div className="md:w-1/2">
            <video 
              ref={videoRef}
              src="/lead.mp4" 
              className="w-full rounded-lg shadow-lg" 
              controls
              preload="auto"
            />
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            size="lg" 
            className="px-8 py-2"
            onClick={startCallSimulation}
            disabled={phoneState !== 'contact'}
          >
            <Phone className="mr-2 h-5 w-5" />
            Simulate Property Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantMaintenance;