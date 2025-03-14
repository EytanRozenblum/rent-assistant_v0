import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ApplicationStatusFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const APPLICATION_STATUS_TYPES = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewing', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'denied', label: 'Denied' }
];

const ApplicationStatusFilter: React.FC<ApplicationStatusFilterProps> = ({
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

  const toggleAll = () => {
    const allValues = APPLICATION_STATUS_TYPES.map(type => type.value);
    const hasAll = allValues.every(value => selectedValues.includes(value));
    onChange(hasAll ? [] : allValues);
  };

  const getSelectedText = () => {
    if (selectedValues.length === 0) return 'All Statuses';
    if (selectedValues.length === APPLICATION_STATUS_TYPES.length) return 'All Statuses';
    
    const selectedLabels = APPLICATION_STATUS_TYPES
      .filter(type => selectedValues.includes(type.value))
      .map(type => type.label);
    
    if (selectedLabels.length <= 2) {
      return selectedLabels.join(', ');
    }
    
    return `${selectedValues.length} selected`;
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
      <PopoverContent className="w-[250px] p-4" align="end">
        <div className="space-y-2">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-brand-600"
            onClick={toggleAll}
          >
            <div className={cn(
              "h-5 w-5 rounded border flex items-center justify-center transition-colors",
              selectedValues.length === APPLICATION_STATUS_TYPES.length && "bg-brand-600 border-brand-600",
              selectedValues.length > 0 && selectedValues.length < APPLICATION_STATUS_TYPES.length && "border-brand-600",
              selectedValues.length === 0 && "border-gray-200"
            )}>
              {selectedValues.length === APPLICATION_STATUS_TYPES.length && <Check className="h-4 w-4 text-white" />}
              {selectedValues.length > 0 && selectedValues.length < APPLICATION_STATUS_TYPES.length && (
                <div className="h-2.5 w-2.5 rounded-sm bg-brand-600"></div>
              )}
            </div>
            <span className="font-medium">All Statuses</span>
          </div>
          <div className="space-y-1 pl-4">
            {APPLICATION_STATUS_TYPES.map((type) => {
              return (
                <div 
                  key={type.value} 
                  className="grid grid-cols-[20px,1fr] gap-2 cursor-pointer text-[13px] hover:text-brand-600 h-[32px] items-center"
                  onClick={() => toggleOption(type.value)}
                >
                  <div className={cn(
                    "h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                    selectedValues.includes(type.value) && "bg-brand-600 border-brand-600",
                    !selectedValues.includes(type.value) && "border-gray-200"
                  )}>
                    {selectedValues.includes(type.value) && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <span className="leading-tight text-gray-600">
                    {type.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ApplicationStatusFilter; 