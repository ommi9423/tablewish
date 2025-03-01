
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Restaurant } from '@/utils/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
  featured?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, featured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const priceLabel = Array(restaurant.priceRange).fill('$').join('');
  
  return (
    <div 
      className={cn(
        "group relative rounded-xl overflow-hidden hover-lift subtle-shadow transition-all duration-300",
        featured ? "md:col-span-2" : "",
        "border border-gray-100"
      )}
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block">
        {/* Image Container */}
        <div className="lazy-image-container aspect-[4/3]">
          <div className={cn("shimmer", imageLoaded ? "animate-shimmer" : "")}></div>
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name}
            className={cn(
              "lazy-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              imageLoaded ? "loaded" : ""
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Discount Badge */}
          {restaurant.discount && (
            <div className="absolute top-3 right-3 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
              {restaurant.discount.percentage}% OFF
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-serif text-lg font-medium mb-1 tracking-tight">{restaurant.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="mr-3">{restaurant.location}</span>
                <span className="font-medium text-gray-900">{priceLabel}</span>
              </div>
            </div>
            
            <div className="flex items-center bg-gray-50 py-1 px-2 rounded-md">
              <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          
          {/* Cuisine Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {restaurant.cuisine.map((cuisine) => (
              <Badge 
                key={cuisine} 
                variant="secondary" 
                className="text-xs font-normal bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                {cuisine}
              </Badge>
            ))}
            {restaurant.isVegetarian && (
              <Badge 
                variant="outline" 
                className="text-xs font-normal border-green-300 text-green-700 bg-green-50"
              >
                Vegetarian
              </Badge>
            )}
          </div>
          
          {/* Features Preview */}
          {featured && restaurant.features && (
            <p className="mt-3 text-sm text-gray-500 line-clamp-2">
              {restaurant.features.join(' · ')}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
