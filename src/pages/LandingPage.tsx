
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/layout/AppLogo';

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <header className="w-full py-6 px-8">
        <AppLogo />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold tracking-tight mb-8">
          AI-Native Property
          <br />
          Management
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Avallon turns complex property operations into automated
          resolutions by supercharging property manager productivity.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/dashboard')}
          >
            Property Manager Dashboard
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/super')}
          >
            Superintendent Access
          </Button>
        </div>
        
        <div className="mt-32">
          <p className="text-lg font-medium text-gray-700 mb-8">
            Built by AI engineers and industry professionals from:
          </p>
          
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-80">
            <div className="h-12 w-36 bg-gray-200 rounded flex items-center justify-center">Company 1</div>
            <div className="h-12 w-36 bg-gray-200 rounded flex items-center justify-center">Company 2</div>
            <div className="h-12 w-36 bg-gray-200 rounded flex items-center justify-center">Company 3</div>
            <div className="h-12 w-36 bg-gray-200 rounded flex items-center justify-center">Company 4</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
