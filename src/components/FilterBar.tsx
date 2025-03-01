
import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { FilterOptions } from '@/utils/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (name: keyof FilterOptions, value: any) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const handlePriceChange = (value: number[]) => {
    onFilterChange('priceRange', value);
  };

  const handleRatingChange = (value: number[]) => {
    onFilterChange('rating', value[0]);
  };

  const handleVegetarianChange = (checked: boolean) => {
    onFilterChange('vegetarian', checked);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm mb-6">
      <div className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <span className="font-medium text-sm">Filters</span>
        </div>

        {/* Price Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm">
              Price Range
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 p-4">
            <DropdownMenuLabel>Price Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="pt-2 pb-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500">$</span>
                <span className="text-xs text-gray-500">$$$$</span>
              </div>
              <Slider
                defaultValue={[1, 4]}
                max={4}
                min={1}
                step={1}
                onValueChange={handlePriceChange}
              />
              <div className="mt-2 text-xs text-center text-gray-600">
                {filters.priceRange ? `${'$'.repeat(filters.priceRange[0])} to ${'$'.repeat(filters.priceRange[1])}` : '$-$$$$'}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Rating Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm">
              Rating
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-4">
            <DropdownMenuLabel>Minimum Rating</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="pt-2 pb-4">
              <Slider
                defaultValue={[4]}
                max={5}
                min={1}
                step={0.5}
                onValueChange={handleRatingChange}
              />
              <div className="mt-2 text-xs text-center text-gray-600">
                {filters.rating || 0} stars and above
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Vegetarian Filter */}
        <div className="flex items-center space-x-2">
          <Switch 
            id="vegetarian-only" 
            checked={filters.vegetarian === true}
            onCheckedChange={handleVegetarianChange}
          />
          <label htmlFor="vegetarian-only" className="text-sm cursor-pointer">
            Vegetarian Only
          </label>
        </div>

        {/* Clear Filters */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sm"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
