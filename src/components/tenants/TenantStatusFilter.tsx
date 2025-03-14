import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface TenantStatusFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
  filterType: 'status' | 'rentStatus';
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'attention_required', label: 'Attention Required' }
];

const RENT_STATUS_OPTIONS = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'delinquent', label: 'Delinquent' }
];

const TenantStatusFilter: React.FC<TenantStatusFilterProps> = ({
  selectedValues,
  onChange,
  filterType
}) => {
  const [open, setOpen] = useState(false);
  
  const options = filterType === 'status' ? STATUS_OPTIONS : RENT_STATUS_OPTIONS;
  const filterLabel = filterType === 'status' ? 'Status' : 'Rent Status';

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const toggleAll = () => {
    const allValues = options.map(option => option.value);
    const hasAll = allValues.every(value => selectedValues.includes(value));
    onChange(hasAll ? [] : allValues);
  };

  const getSelectedText = () => {
    if (selectedValues.length === 0) return `All ${filterLabel}`;
    if (selectedValues.length === options.length) return `All ${filterLabel}`;
    
    const selectedLabels = options
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label);
    
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
          className="h-9 justify-between min-w-[130px]"
        >
          <span className="truncate">{getSelectedText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-3" align="end">
        <div className="space-y-2">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-brand-600"
            onClick={toggleAll}
          >
            <div className={cn(
              "h-5 w-5 rounded border flex items-center justify-center transition-colors",
              selectedValues.length === options.length && "bg-brand-600 border-brand-600",
              selectedValues.length > 0 && selectedValues.length < options.length && "border-brand-600",
              selectedValues.length === 0 && "border-gray-200"
            )}>
              {selectedValues.length === options.length && <Check className="h-4 w-4 text-white" />}
              {selectedValues.length > 0 && selectedValues.length < options.length && (
                <div className="h-2.5 w-2.5 rounded-sm bg-brand-600"></div>
              )}
            </div>
            <span className="font-medium">All {filterLabel}</span>
          </div>
          <div className="space-y-1 pl-3">
            {options.map((option) => (
              <div 
                key={option.value} 
                className="grid grid-cols-[20px,1fr] gap-2 cursor-pointer text-[13px] hover:text-brand-600 h-[32px] items-center"
                onClick={() => toggleOption(option.value)}
              >
                <div className={cn(
                  "h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                  selectedValues.includes(option.value) && "bg-brand-600 border-brand-600",
                  !selectedValues.includes(option.value) && "border-gray-200"
                )}>
                  {selectedValues.includes(option.value) && <Check className="h-4 w-4 text-white" />}
                </div>
                <span className="leading-tight text-gray-600">
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TenantStatusFilter; 