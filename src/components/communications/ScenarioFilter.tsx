import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface CategoryOption {
  name: string;
  options: { value: string; label: string }[];
}

interface ScenarioFilterProps {
  options: CategoryOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const ScenarioFilter: React.FC<ScenarioFilterProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleCategory = (categoryName: string) => {
    const category = options.find(c => c.name === categoryName);
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
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    
    onChange(newSelectedValues);
  };

  const isCategorySelected = (categoryName: string) => {
    const category = options.find(c => c.name === categoryName);
    if (!category) return false;
    
    const categoryValues = category.options.map(opt => opt.value);
    return categoryValues.some(value => selectedValues.includes(value));
  };

  const isCategoryFullySelected = (categoryName: string) => {
    const category = options.find(c => c.name === categoryName);
    if (!category) return false;
    
    const categoryValues = category.options.map(opt => opt.value);
    return categoryValues.every(value => selectedValues.includes(value));
  };

  const getSelectedText = () => {
    if (selectedValues.length === 0) return 'All Scenarios';
    
    const categorySelections = options
      .filter(category => 
        category.options.some(option => selectedValues.includes(option.value))
      )
      .map(category => {
        const categoryValues = category.options.map(opt => opt.value);
        const allSelected = categoryValues.every(value => selectedValues.includes(value));
        
        if (allSelected) return category.name;
        
        const selectedLabels = category.options
          .filter(option => selectedValues.includes(option.value))
          .map(option => option.label.split('/').pop());
        
        return `${category.name} (${selectedLabels.join(', ')})`;
      });
    
    return categorySelections.join(', ');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-8 justify-between min-w-[150px] max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {getSelectedText()}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[490px] p-4" align="end">
        <div className="grid grid-cols-3 gap-10">
          {options.map((category) => (
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
              <div className="space-y-2 pl-4">
                {category.options.map((option) => {
                  const label = option.label.split('/').pop() || '';
                  const formattedLabel = label.length < 20 ? `${label}\n\u00A0` : label;
                  
                  return (
                    <div 
                      key={option.value} 
                      className="flex items-start gap-2 cursor-pointer text-[13px] hover:text-brand-600 h-[40px]"
                      onClick={() => toggleOption(option.value)}
                    >
                      <div className={cn(
                        "h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors mt-0.5",
                        selectedValues.includes(option.value) && "bg-brand-600 border-brand-600",
                        !selectedValues.includes(option.value) && "border-gray-200"
                      )}>
                        {selectedValues.includes(option.value) && <Check className="h-4 w-4 text-white" />}
                      </div>
                      <span className="leading-tight text-gray-600 whitespace-pre-line">
                        {formattedLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ScenarioFilter;
