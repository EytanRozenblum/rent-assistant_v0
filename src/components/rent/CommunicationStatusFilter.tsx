import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface CommunicationStatusFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

interface CategoryOption {
  name: string;
  options: { value: string; label: string }[];
}

const STATUS_CATEGORIES: CategoryOption[] = [
  {
    name: 'Rent Collection',
    options: [
      { value: 'delivered', label: 'Message Delivered' },
      { value: 'failed', label: 'Failed to Collect Payment' },
      { value: 'committed', label: 'Committed to Pay' },
      { value: 'pending', label: 'Pending Payment' }
    ]
  },
  {
    name: 'Other',
    options: [
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'lease_renewal', label: 'Lease Renewal' },
      { value: 'notice', label: 'Notice' },
      { value: 'general', label: 'General Communication' }
    ]
  }
];

const CommunicationStatusFilter: React.FC<CommunicationStatusFilterProps> = ({
  selectedValues,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleCategory = (categoryName: string) => {
    const category = STATUS_CATEGORIES.find(c => c.name === categoryName);
    if (!category) return;

    const categoryValues = category.options.map(opt => opt.value);
    const allCategoryValuesSelected = categoryValues.every(value => 
      selectedValues.includes(value)
    );

    let newSelectedValues: string[];
    
    if (allCategoryValuesSelected) {
      newSelectedValues = selectedValues.filter(value => !categoryValues.includes(value));
    } else {
      const valuesToAdd = categoryValues.filter(value => !selectedValues.includes(value));
      newSelectedValues = [...selectedValues, ...valuesToAdd];
    }
    
    onChange(newSelectedValues);
  };

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const isCategorySelected = (categoryName: string) => {
    const category = STATUS_CATEGORIES.find(c => c.name === categoryName);
    if (!category) return false;
    
    const categoryValues = category.options.map(opt => opt.value);
    return categoryValues.some(value => selectedValues.includes(value));
  };

  const isCategoryFullySelected = (categoryName: string) => {
    const category = STATUS_CATEGORIES.find(c => c.name === categoryName);
    if (!category) return false;
    
    const categoryValues = category.options.map(opt => opt.value);
    return categoryValues.every(value => selectedValues.includes(value));
  };

  const getSelectedText = () => {
    const allOptions = STATUS_CATEGORIES.flatMap(cat => cat.options);
    const allValues = allOptions.map(opt => opt.value);
    
    if (selectedValues.length === 0) return 'All Topics';
    if (selectedValues.length === allValues.length) return 'All Topics';
    
    const selectedLabels = allOptions
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label);
    
    if (selectedLabels.length <= 2) {
      return selectedLabels.join(', ');
    }
    
    return `${selectedValues.length} selected`;
  };

  const toggleAll = () => {
    const allValues = STATUS_CATEGORIES.flatMap(cat => cat.options.map(opt => opt.value));
    const hasAll = allValues.every(value => selectedValues.includes(value));
    onChange(hasAll ? [] : allValues);
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
      <PopoverContent className="w-[500px] p-4" align="end">
        <div className="grid grid-cols-2 gap-4">
          {STATUS_CATEGORIES.map((category) => (
            <div key={category.name} className="space-y-2">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-brand-600"
                onClick={() => toggleCategory(category.name)}
              >
                <div className={cn(
                  "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                  isCategoryFullySelected(category.name) && "bg-brand-600 border-brand-600",
                  isCategorySelected(category.name) && !isCategoryFullySelected(category.name) && "border-brand-600",
                  !isCategorySelected(category.name) && "border-gray-200"
                )}>
                  {isCategoryFullySelected(category.name) && <Check className="h-4 w-4 text-white" />}
                  {isCategorySelected(category.name) && !isCategoryFullySelected(category.name) && (
                    <div className="h-2.5 w-2.5 rounded-sm bg-brand-600"></div>
                  )}
                </div>
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="space-y-1 pl-4">
                {category.options.map((option) => (
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
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CommunicationStatusFilter; 