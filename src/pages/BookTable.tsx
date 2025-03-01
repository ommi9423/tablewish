
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RestaurantCard from '@/components/RestaurantCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import { restaurants } from '@/data/restaurants';
import { Restaurant, FilterOptions } from '@/utils/types';

const BookTablePage = () => {
  const [searchParams] = useSearchParams();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [filters, setFilters] = useState<FilterOptions>({
    cuisine: [],
    vegetarian: null,
    priceRange: [1, 4],
    rating: null,
    searchTerm: searchParams.get('q') || '',
  });

  const handleSearch = (
    searchTerm: string,
    location: string,
    date: string,
    partySize: string
  ) => {
    setFilters(prev => ({
      ...prev,
      searchTerm
    }));
  };

  const handleFilterChange = (name: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      cuisine: [],
      vegetarian: null,
      priceRange: [1, 4],
      rating: null,
      searchTerm: '',
    });
  };

  useEffect(() => {
    let results = [...restaurants];

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      results = results.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(searchLower) || 
          restaurant.cuisine.some(c => c.toLowerCase().includes(searchLower)) ||
          restaurant.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply cuisine filter
    if (filters.cuisine.length > 0) {
      results = results.filter(
        restaurant => restaurant.cuisine.some(c => filters.cuisine.includes(c))
      );
    }

    // Apply vegetarian filter
    if (filters.vegetarian) {
      results = results.filter(restaurant => restaurant.isVegetarian);
    }

    // Apply price range filter
    if (filters.priceRange) {
      results = results.filter(
        restaurant => 
          restaurant.priceRange >= filters.priceRange[0] && 
          restaurant.priceRange <= filters.priceRange[1]
      );
    }

    // Apply rating filter
    if (filters.rating) {
      results = results.filter(restaurant => restaurant.rating >= filters.rating);
    }

    setFilteredRestaurants(results);
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-10">
        {/* Search Bar */}
        <div className="container mx-auto px-4 md:px-6 mb-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-2xl md:text-3xl font-medium mb-6 tracking-tight text-center md:text-left">
              Find a Table
            </h1>
            <SearchBar onSearch={handleSearch} compact />
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <FilterBar 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onClearFilters={handleClearFilters} 
            />
            
            {/* Results */}
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">
                {filteredRestaurants.length} Restaurant{filteredRestaurants.length !== 1 ? 's' : ''} Found
              </h2>
              {filters.searchTerm && (
                <p className="text-gray-600">
                  Showing results for: <span className="font-medium">{filters.searchTerm}</span>
                </p>
              )}
            </div>
            
            {/* Restaurant Grid */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto py-8 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TableWish. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BookTablePage;
