
import React from 'react';
import { Cuisine } from '@/utils/types';
import { cn } from '@/lib/utils';

interface CuisineFilterProps {
  cuisines: Cuisine[];
  selectedCuisines: string[];
  onSelectCuisine: (cuisine: string) => void;
}

const CuisineFilter: React.FC<CuisineFilterProps> = ({ 
  cuisines, 
  selectedCuisines, 
  onSelectCuisine 
}) => {
  return (
    <div className="mb-8">
      <h2 className="font-serif text-xl mb-4">Cuisines</h2>
      <div className="flex flex-wrap gap-2">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => onSelectCuisine(cuisine)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all duration-200",
              "border",
              selectedCuisines.includes(cuisine) 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            )}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CuisineFilter;
