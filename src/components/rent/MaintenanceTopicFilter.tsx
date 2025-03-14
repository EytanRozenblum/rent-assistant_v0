import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface MaintenanceTopicFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MAINTENANCE_CATEGORIES = {
  maintenance: [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'appliance', label: 'Appliances' },
    { value: 'structural', label: 'Structural' },
    { value: 'locks', label: 'Locks & Security' },
    { value: 'pest', label: 'Pest Control' },
  ],
  other: [
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'common_areas', label: 'Common Areas' },
    { value: 'noise', label: 'Noise Complaints' },
    { value: 'security', label: 'Security Concerns' },
    { value: 'amenities', label: 'Amenities' },
  ]
};

// Flatten all topics for convenience
const ALL_TOPICS = [
  ...MAINTENANCE_CATEGORIES.maintenance,
  ...MAINTENANCE_CATEGORIES.other
];

const MaintenanceTopicFilter: React.FC<MaintenanceTopicFilterProps> = ({
  selectedValues,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const toggleCategory = (category: 'maintenance' | 'other') => {
    const categoryValues = MAINTENANCE_CATEGORIES[category].map(topic => topic.value);
    const hasAllInCategory = categoryValues.every(value => selectedValues.includes(value));
    
    const newSelection = hasAllInCategory
      ? selectedValues.filter(value => !categoryValues.includes(value))
      : [...new Set([...selectedValues, ...categoryValues])];
    
    onChange(newSelection);
  };

  const getSelectedText = () => {
    if (selectedValues.length === 0) return 'All Topics';
    if (selectedValues.length === ALL_TOPICS.length) return 'All Topics';
    
    const selectedLabels = ALL_TOPICS
      .filter(topic => selectedValues.includes(topic.value))
      .map(topic => topic.label);
    
    if (selectedLabels.length === 1) {
      return selectedLabels[0];
    }
    
    return `${selectedValues.length} selected`;
  };

  const isCategorySelected = (category: 'maintenance' | 'other') => {
    const categoryValues = MAINTENANCE_CATEGORIES[category].map(topic => topic.value);
    return categoryValues.every(value => selectedValues.includes(value));
  };

  const isCategoryPartiallySelected = (category: 'maintenance' | 'other') => {
    const categoryValues = MAINTENANCE_CATEGORIES[category].map(topic => topic.value);
    return categoryValues.some(value => selectedValues.includes(value)) && 
           !categoryValues.every(value => selectedValues.includes(value));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-8 justify-between min-w-[150px] max-w-[200px]"
        >
          <span className="truncate">{getSelectedText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-4" align="end">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Maintenance Category */}
            <div>
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-brand-600 mb-2"
                onClick={() => toggleCategory('maintenance')}
              >
                <div className={cn(
                  "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                  isCategorySelected('maintenance') && "bg-brand-600 border-brand-600",
                  isCategoryPartiallySelected('maintenance') && "border-brand-600",
                  !isCategorySelected('maintenance') && !isCategoryPartiallySelected('maintenance') && "border-gray-200"
                )}>
                  {isCategorySelected('maintenance') && <Check className="h-4 w-4 text-white" />}
                  {isCategoryPartiallySelected('maintenance') && (
                    <div className="h-2.5 w-2.5 rounded-sm bg-brand-600"></div>
                  )}
                </div>
                <span className="font-medium">Maintenance</span>
              </div>
              
              <div className="space-y-2 pl-4">
                {MAINTENANCE_CATEGORIES.maintenance.map((topic) => (
                  <div 
                    key={topic.value} 
                    className="grid grid-cols-[20px,1fr] gap-2 cursor-pointer text-[13px] hover:text-brand-600 h-[28px] items-center"
                    onClick={() => toggleOption(topic.value)}
                  >
                    <div className={cn(
                      "h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                      selectedValues.includes(topic.value) && "bg-brand-600 border-brand-600",
                      !selectedValues.includes(topic.value) && "border-gray-200"
                    )}>
                      {selectedValues.includes(topic.value) && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <span className="leading-tight text-gray-600">
                      {topic.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Other Category */}
            <div>
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-brand-600 mb-2"
                onClick={() => toggleCategory('other')}
              >
                <div className={cn(
                  "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                  isCategorySelected('other') && "bg-brand-600 border-brand-600",
                  isCategoryPartiallySelected('other') && "border-brand-600",
                  !isCategorySelected('other') && !isCategoryPartiallySelected('other') && "border-gray-200"
                )}>
                  {isCategorySelected('other') && <Check className="h-4 w-4 text-white" />}
                  {isCategoryPartiallySelected('other') && (
                    <div className="h-2.5 w-2.5 rounded-sm bg-brand-600"></div>
                  )}
                </div>
                <span className="font-medium">Other</span>
              </div>
              
              <div className="space-y-2 pl-4">
                {MAINTENANCE_CATEGORIES.other.map((topic) => (
                  <div 
                    key={topic.value} 
                    className="grid grid-cols-[20px,1fr] gap-2 cursor-pointer text-[13px] hover:text-brand-600 h-[28px] items-center"
                    onClick={() => toggleOption(topic.value)}
                  >
                    <div className={cn(
                      "h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                      selectedValues.includes(topic.value) && "bg-brand-600 border-brand-600",
                      !selectedValues.includes(topic.value) && "border-gray-200"
                    )}>
                      {selectedValues.includes(topic.value) && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <span className="leading-tight text-gray-600">
                      {topic.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MaintenanceTopicFilter; 