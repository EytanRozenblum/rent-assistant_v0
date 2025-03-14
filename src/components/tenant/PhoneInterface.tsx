import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type Screen = 'contact' | 'calling' | 'inCall';

interface PhoneInterfaceProps {
  scenario?: string;
  onScreenChange?: (screen: Screen) => void;
  onCallStarted?: () => void;
  playVideo?: () => void;
  currentScreen?: Screen;
  setCurrentScreen?: (screen: Screen) => void;
}

const VIDEO_PATHS = {
  lead: '/phone_calls/leasing/lead.mp4',
  application: '/phone_calls/leasing/application.mp4',
  signing: '/phone_calls/leasing/signing.mp4',
  premove: '/phone_calls/leasing/premove.mp4',
  onboarding: '/phone_calls/leasing/onboarding.mp4'
};

const PhoneInterface = ({ 
  scenario = 'lead', 
  onScreenChange, 
  onCallStarted,
  playVideo,
  currentScreen: externalScreen,
  setCurrentScreen: externalSetScreen
}: PhoneInterfaceProps) => {
  const [internalScreen, setInternalScreen] = useState<Screen>('contact');
  const [callTime, setCallTime] = useState(0);
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentScreen = externalScreen || internalScreen;
  const setCurrentScreen = externalSetScreen || setInternalScreen;
  
  useEffect(() => {
    console.log('PhoneInterface - Current scenario:', scenario);
    console.log('PhoneInterface - Current screen:', currentScreen);
  }, [scenario, currentScreen]);
  
  useEffect(() => {
    setCurrentScreen('contact');
    setCallTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [location.pathname, setCurrentScreen]);
  
  useEffect(() => {
    onScreenChange?.(currentScreen);
    
    if (currentScreen === 'inCall') {
      onCallStarted?.();
    }
  }, [currentScreen, onScreenChange, onCallStarted]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentScreen === 'inCall') {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);

      console.log('Attempting to play audio for scenario:', scenario);
      const videoPath = VIDEO_PATHS[scenario as keyof typeof VIDEO_PATHS] || VIDEO_PATHS.lead;
      console.log('Audio path:', videoPath);
      
      const audio = new Audio(videoPath);
      audioRef.current = audio;
      
      audio.play()
        .then(() => {
          console.log('Audio playing successfully');
        })
        .catch(error => {
          console.error('Error playing audio:', error);
        });
    }
    
    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [currentScreen, scenario]);
  
  const handleCall = () => {
    setCurrentScreen('calling');
    setTimeout(() => {
      setCallTime(0);
      setCurrentScreen('inCall');
    }, 2000);
  };
  
  const handleHangUp = () => {
    setCurrentScreen('contact');
  };
  
  if (currentScreen === 'contact') {
    return (
      <img 
        src="/phone_screens/contact_screen.png" 
        alt="Contact Screen" 
        className="w-full h-full object-cover cursor-pointer"
        onClick={handleCall}
      />
    );
  }
  
  if (currentScreen === 'calling') {
    return (
      <img 
        src="/phone_screens/calling_screen.png" 
        alt="Calling Screen" 
        className="w-full h-full object-cover"
      />
    );
  }
  
  return (
    <div className="relative w-full h-full">
      <img 
        src="/phone_screens/in_call_screen.png" 
        alt="In Call Screen" 
        className="w-full h-full object-cover cursor-pointer"
        onClick={handleHangUp}
      />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-white text-xl font-semibold">
        {formatTime(callTime)}
      </div>
    </div>
  );
};

export default PhoneInterface;
