import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface LeasingTopicFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const LEASING_CATEGORIES = {
  leasing: [
    { value: 'inquiry', label: 'General Inquiry' },
    { value: 'tour', label: 'Tour Scheduling' },
    { value: 'application', label: 'Application' },
    { value: 'screening', label: 'Screening' },
    { value: 'approval', label: 'Approval Process' },
  ],
  other: [
    { value: 'pricing', label: 'Pricing & Fees' },
    { value: 'amenities', label: 'Amenities' },
    { value: 'availability', label: 'Availability' },
    { value: 'policies', label: 'Policies' },
    { value: 'location', label: 'Location Info' },
  ]
};

// Flatten all topics for convenience
const ALL_TOPICS = [
  ...LEASING_CATEGORIES.leasing,
  ...LEASING_CATEGORIES.other
];

const LeasingTopicFilter: React.FC<LeasingTopicFilterProps> = ({
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

  const toggleCategory = (category: 'leasing' | 'other') => {
    const categoryValues = LEASING_CATEGORIES[category].map(topic => topic.value);
    const hasAllInCategory = categoryValues.every(value => selectedValues.includes(value));
    
    const newSelection = hasAllInCategory
      ? selectedValues.filter(value => !categoryValues.includes(value))
      : [...new Set([...selectedValues, ...categoryValues])];
    
    onChange(newSelection);
  };

  const getSelectedText = () => {
    if (selectedValues.length === 0) return 'All Categories';
    if (selectedValues.length === ALL_TOPICS.length) return 'All Categories';
    
    const selectedLabels = ALL_TOPICS
      .filter(topic => selectedValues.includes(topic.value))
      .map(topic => topic.label);
    
    if (selectedLabels.length === 1) {
      return selectedLabels[0];
    }
    
    return `${selectedValues.length} selected`;
  };

  const isCategorySelected = (category: 'leasing' | 'other') => {
    const categoryValues = LEASING_CATEGORIES[category].map(topic => topic.value);
    return categoryValues.every(value => selectedValues.includes(value));
  };

  const isCategoryPartiallySelected = (category: 'leasing' | 'other') => {
    const categoryValues = LEASING_CATEGORIES[category].map(topic => topic.value);
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
            {/* Leasing Category */}
            <div>
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-brand-600 mb-2"
                onClick={() => toggleCategory('leasing')}
              >
                <div className={cn(
                  "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                  isCategorySelected('leasing') && "bg-brand-600 border-brand-600",
                  isCategoryPartiallySelected('leasing') && "border-brand-600",
                  !isCategorySelected('leasing') && !isCategoryPartiallySelected('leasing') && "border-gray-200"
                )}>
                  {isCategorySelected('leasing') && <Check className="h-4 w-4 text-white" />}
                  {isCategoryPartiallySelected('leasing') && (
                    <div className="h-2.5 w-2.5 rounded-sm bg-brand-600"></div>
                  )}
                </div>
                <span className="font-medium">Leasing</span>
              </div>
              
              <div className="space-y-2 pl-4">
                {LEASING_CATEGORIES.leasing.map((topic) => (
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
                {LEASING_CATEGORIES.other.map((topic) => (
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

export default LeasingTopicFilter; 