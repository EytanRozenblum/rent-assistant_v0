
import React from 'react';
import { Building2 } from 'lucide-react';

const AppLogo = () => {
  return (
    <div className="flex items-center gap-2 px-2">
      <Building2 className="h-6 w-6 text-brand-500" />
      <span className="font-bold text-xl text-brand-600">PropertyAI</span>
    </div>
  );
};

export default AppLogo;
