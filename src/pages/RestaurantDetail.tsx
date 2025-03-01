
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { restaurants } from '@/data/restaurants';
import { Restaurant } from '@/utils/types';
import Navbar from '@/components/Navbar';
import ReservationForm from '@/components/ReservationForm';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching restaurant data
    setLoading(true);
    setTimeout(() => {
      const foundRestaurant = restaurants.find(r => r.id === id) || null;
      setRestaurant(foundRestaurant);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="font-serif text-2xl md:text-3xl font-medium mb-4">Restaurant not found</h1>
          <p className="text-gray-600 mb-6">The restaurant you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/book-table')}>
            View All Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="pt-20 animate-fade-in">
        {/* Restaurant Header Image */}
        <div className="relative h-[30vh] md:h-[40vh] overflow-hidden">
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Back Button */}
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute top-4 left-4 rounded-full p-2 h-10 w-10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          {/* Discount Badge */}
          {restaurant.discount && (
            <div className="absolute top-4 right-4 bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
              {restaurant.discount.percentage}% OFF
            </div>
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Restaurant Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="font-serif text-2xl md:text-3xl font-medium mb-2 tracking-tight">
                    {restaurant.name}
                  </h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center bg-gray-50 py-1 px-2 rounded-md mr-3">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({restaurant.reviewCount})</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">{restaurant.location}</span>
                      <span className="font-medium">{'$'.repeat(restaurant.priceRange)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {restaurant.cuisine.map((cuisine) => (
                      <Badge 
                        key={cuisine} 
                        variant="secondary" 
                        className="text-xs font-normal bg-gray-50 text-gray-700"
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
                  
                  <p className="text-gray-600">{restaurant.description}</p>
                </div>
                
                {/* Call to Action */}
                <div className="md:ml-6 md:w-1/3 shrink-0">
                  <Button
                    className="w-full bg-black hover:bg-black/80 text-white"
                    size="lg"
                    onClick={() => {
                      const reservationSection = document.getElementById('reservation-section');
                      if (reservationSection) {
                        reservationSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Reserve a table
                  </Button>
                  
                  {restaurant.discount && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                      <div className="font-medium mb-1 text-black">Special Offer</div>
                      <div className="text-gray-600">{restaurant.discount.description}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Details Tabs */}
            <Tabs defaultValue="info" className="mb-12">
              <TabsList className="mb-6">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="reservation" id="reservation-tab">Reservation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Restaurant Features */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="font-serif text-lg font-medium mb-4">Features</h2>
                    <ul className="space-y-3">
                      {restaurant.features?.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-700">
                          <Check className="h-5 w-5 text-green-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Opening Hours */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="font-serif text-lg font-medium mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-gray-500" />
                      Opening Hours
                    </h2>
                    <ul className="space-y-2">
                      {Object.entries(restaurant.openingHours || {}).map(([day, hours]) => (
                        <li key={day} className="flex justify-between text-gray-700">
                          <span>{day}</span>
                          <span>{hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Location */}
                  <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
                    <h2 className="font-serif text-lg font-medium mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                      Location
                    </h2>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Map will be displayed here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reservation" id="reservation-section" className="animate-fade-in">
                <ReservationForm restaurant={restaurant} />
              </TabsContent>
            </Tabs>
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

export default RestaurantDetail;
