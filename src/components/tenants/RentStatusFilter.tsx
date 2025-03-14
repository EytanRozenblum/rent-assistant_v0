import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface RentStatusFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const RENT_STATUSES = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'delinquent', label: 'Delinquent' }
];

const RentStatusFilter: React.FC<RentStatusFilterProps> = ({
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
    const allValues = RENT_STATUSES.map(status => status.value);
    const hasAll = allValues.every(value => selectedValues.includes(value));
    onChange(hasAll ? [] : allValues);
  };

  const getSelectedText = () => {
    if (selectedValues.length === 0) return 'All Rent Statuses';
    if (selectedValues.length === RENT_STATUSES.length) return 'All Rent Statuses';
    
    const selectedLabels = RENT_STATUSES
      .filter(status => selectedValues.includes(status.value))
      .map(status => status.label);
    
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
              selectedValues.length === RENT_STATUSES.length && "bg-brand-600 border-brand-600",
              selectedValues.length > 0 && selectedValues.length < RENT_STATUSES.length && "border-brand-600",
              selectedValues.length === 0 && "border-gray-200"
            )}>
              {selectedValues.length === RENT_STATUSES.length && <Check className="h-4 w-4 text-white" />}
              {selectedValues.length > 0 && selectedValues.length < RENT_STATUSES.length && (
                <div className="h-2.5 w-2.5 rounded-sm bg-brand-600"></div>
              )}
            </div>
            <span className="font-medium">All Rent Statuses</span>
          </div>
          <div className="space-y-2 pl-4">
            {RENT_STATUSES.map((status) => {
              return (
                <div 
                  key={status.value} 
                  className="grid grid-cols-[20px,1fr] gap-2 cursor-pointer text-[13px] hover:text-brand-600 h-[40px] items-center"
                  onClick={() => toggleOption(status.value)}
                >
                  <div className={cn(
                    "h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                    selectedValues.includes(status.value) && "bg-brand-600 border-brand-600",
                    !selectedValues.includes(status.value) && "border-gray-200"
                  )}>
                    {selectedValues.includes(status.value) && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <span className="leading-tight text-gray-600">
                    {status.label}
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

export default RentStatusFilter; 