
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { InfoIcon } from 'lucide-react';

const PlaceholderPage = () => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  const pageName = path.charAt(0).toUpperCase() + path.slice(1);
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">{pageName}</h1>
      </div>
      
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <InfoIcon className="h-12 w-12 mb-4 mx-auto text-brand-300" />
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              The {pageName} page is under development. Check back later for updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
