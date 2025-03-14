import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const markets = [
  { value: 'all', label: 'See all markets' },
  { value: 'atlanta', label: 'Atlanta' },
  { value: 'tampa', label: 'Tampa' },
  { value: 'jacksonville', label: 'Jacksonville' },
  { value: 'orlando', label: 'Orlando' },
  { value: 'total', label: 'Total' },
];

interface MarketFilterProps {
  selectedMarket: string;
  onMarketChange: (market: string) => void;
}

const MarketFilter: React.FC<MarketFilterProps> = ({ selectedMarket, onMarketChange }) => {
  return (
    <div className="flex items-center justify-end mb-6">
      <Select value={selectedMarket} onValueChange={onMarketChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select market" />
        </SelectTrigger>
        <SelectContent>
          {markets.map((market) => (
            <SelectItem key={market.value} value={market.value}>
              {market.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MarketFilter; 