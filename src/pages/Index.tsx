import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import OfferBanner from '@/components/OfferBanner';
import CuisineFilter from '@/components/CuisineFilter';
import { restaurants } from '@/data/restaurants';
import { Cuisine } from '@/utils/types';

const cuisines: Cuisine[] = [
  'Italian',
  'Japanese',
  'Indian',
  'Chinese',
  'Mexican',
  'Thai',
  'French',
  'Mediterranean',
  'American',
  'Vegetarian'
];

const HomePage = () => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [topRatedRestaurants, setTopRatedRestaurants] = useState(restaurants.slice(0, 4));

  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) 
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  useEffect(() => {
    if (selectedCuisines.length > 0) {
      const filteredRestaurants = restaurants
        .filter(restaurant => 
          restaurant.cuisine.some(cuisine => selectedCuisines.includes(cuisine))
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      
      setTopRatedRestaurants(filteredRestaurants);
    } else {
      const sorted = [...restaurants]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      
      setTopRatedRestaurants(sorted);
    }
  }, [selectedCuisines]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-4 md:mb-6 tracking-tight text-balance">
              Reserve Your Perfect Dining Experience
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto text-balance">
              Discover and book tables at the finest restaurants in your city, with exclusive offers and seamless reservations.
            </p>
            
            <div className="max-w-4xl mx-auto mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-medium">Top-Rated Restaurants</h2>
            <Link to="/book-table">
              <Button variant="link" className="group text-gray-900 flex items-center">
                View all
                <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <CuisineFilter 
            cuisines={cuisines} 
            selectedCuisines={selectedCuisines} 
            onSelectCuisine={handleCuisineSelect} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedRestaurants.map((restaurant, index) => (
              <RestaurantCard 
                key={restaurant.id} 
                restaurant={restaurant} 
                featured={index === 0} 
              />
            ))}
          </div>
        </div>
      </section>
      
      <OfferBanner restaurants={restaurants} />
      
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">How It Works</h2>
            <p className="text-gray-600">Book your table in three simple steps and enjoy a seamless dining experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-xl font-medium">1</span>
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">Find a Restaurant</h3>
              <p className="text-gray-600 text-sm">
                Browse through our curated selection of restaurants or search for your favorites.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-xl font-medium">2</span>
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">Make a Reservation</h3>
              <p className="text-gray-600 text-sm">
                Choose your preferred date, time, and party size to book your table.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-xl font-medium">3</span>
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">Enjoy Your Meal</h3>
              <p className="text-gray-600 text-sm">
                Receive instant confirmation and enjoy your dining experience.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              className="bg-black hover:bg-black/80 text-white px-6"
            >
              <Link to="/book-table">Book a Table Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <footer className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-serif text-lg font-medium mb-2">TableWish</div>
              <p className="text-gray-500 text-sm">The best way to discover and book restaurants.</p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">Home</Link>
              <Link to="/book-table" className="text-gray-600 hover:text-gray-900 text-sm">Book a Table</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact Us</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} TableWish. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
