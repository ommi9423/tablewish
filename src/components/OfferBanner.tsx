
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Restaurant } from '@/utils/types';

interface OfferBannerProps {
  restaurants: Restaurant[];
}

const OfferBanner: React.FC<OfferBannerProps> = ({ restaurants }) => {
  // Get restaurants with discounts
  const restaurantsWithDiscounts = restaurants.filter(restaurant => restaurant.discount);
  
  if (restaurantsWithDiscounts.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-black/95 text-white py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-medium">Special Offers</h2>
          <p className="mt-2 text-gray-400 max-w-2xl">Discover exclusive deals and discounts from our restaurant partners.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantsWithDiscounts.slice(0, 3).map((restaurant) => (
            <Link 
              key={restaurant.id} 
              to={`/restaurant/${restaurant.id}`}
              className="group relative flex flex-col bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300 overflow-hidden hover-lift"
            >
              <div className="absolute top-3 right-3 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
                {restaurant.discount?.percentage}% OFF
              </div>
              
              <h3 className="font-serif text-lg font-medium">{restaurant.name}</h3>
              
              <div className="mt-3 text-sm text-gray-300">{restaurant.discount?.description}</div>
              
              <div className="mt-auto pt-4 flex items-center text-sm font-medium">
                Book now
                <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
