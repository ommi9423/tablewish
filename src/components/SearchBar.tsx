
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  compact?: boolean;
  onSearch?: (searchTerm: string, location: string, date: string, partySize: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  compact = false,
  onSearch 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [partySize, setPartySize] = useState('2');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchTerm, location, date, partySize);
    } else {
      // Construct query string and navigate
      const params = new URLSearchParams();
      if (searchTerm) params.append('q', searchTerm);
      if (location) params.append('location', location);
      if (date) params.append('date', date);
      if (partySize) params.append('party', partySize);
      
      navigate(`/book-table?${params.toString()}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`w-full rounded-xl bg-white shadow-lg border border-gray-100 transition-all duration-300 ${compact ? 'p-3' : 'p-4 md:p-6'}`}
    >
      <div className={`grid gap-4 ${compact ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-4'}`}>
        {/* Restaurant/Cuisine Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-gray-200 pl-10 p-2.5 text-sm text-gray-900 bg-gray-50 focus:ring-black focus:border-black"
            placeholder="Restaurant or cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Location */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-gray-200 pl-10 p-2.5 text-sm text-gray-900 bg-gray-50 focus:ring-black focus:border-black"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        {/* Date */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            className="block w-full rounded-lg border-gray-200 pl-10 p-2.5 text-sm text-gray-900 bg-gray-50 focus:ring-black focus:border-black"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        
        {/* Party Size & Search Button */}
        <div className="grid grid-cols-3 gap-2">
          <div className="relative col-span-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full rounded-lg border-gray-200 pl-10 p-2.5 text-sm text-gray-900 bg-gray-50 focus:ring-black focus:border-black appearance-none"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'people'}
                </option>
              ))}
              <option value="11+">11+ people</option>
            </select>
          </div>
          
          <Button 
            type="submit" 
            className="col-span-2 bg-black hover:bg-black/80 text-white"
          >
            Find Tables
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
