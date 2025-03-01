
import { Restaurant } from '../utils/types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    cuisine: ['Italian'],
    priceRange: 3,
    rating: 4.7,
    reviewCount: 235,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'Downtown',
    isVegetarian: false,
    description: 'Authentic Italian cuisine with handmade pasta and wood-fired pizza in an elegant setting.',
    features: ['Outdoor Seating', 'Full Bar', 'Private Dining'],
    openingHours: {
      'Monday-Thursday': '11:00 AM - 10:00 PM',
      'Friday-Saturday': '11:00 AM - 11:00 PM',
      'Sunday': '12:00 PM - 9:00 PM'
    },
    discount: {
      percentage: 15,
      description: 'Early bird special: 15% off before 6 PM'
    }
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    cuisine: ['Japanese'],
    priceRange: 4,
    rating: 4.9,
    reviewCount: 412,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'Financial District',
    isVegetarian: false,
    description: 'Premium sushi and Japanese delicacies crafted by master chefs using the freshest ingredients.',
    features: ['Omakase Experience', 'Sake Selection', 'Counter Seating'],
    openingHours: {
      'Tuesday-Sunday': '5:00 PM - 11:00 PM',
      'Monday': 'Closed'
    }
  },
  {
    id: '3',
    name: 'Green Leaf',
    cuisine: ['Vegetarian', 'Vegan'],
    priceRange: 2,
    rating: 4.5,
    reviewCount: 189,
    imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'Midtown',
    isVegetarian: true,
    description: 'Farm-to-table vegetarian and vegan dishes with seasonal ingredients in a relaxed atmosphere.',
    features: ['Organic Ingredients', 'Gluten-Free Options', 'Cold-Pressed Juices'],
    openingHours: {
      'Monday-Sunday': '8:00 AM - 9:00 PM'
    },
    discount: {
      percentage: 10,
      description: '10% off for students with ID'
    }
  },
  {
    id: '4',
    name: 'Spice Route',
    cuisine: ['Indian'],
    priceRange: 2,
    rating: 4.6,
    reviewCount: 267,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'West End',
    isVegetarian: false,
    description: 'Authentic regional Indian cuisine featuring aromatic spices and traditional cooking methods.',
    features: ['Tandoor Oven', 'Specialty Curry Selection', 'Family-Style Dining'],
    openingHours: {
      'Monday-Sunday': '11:30 AM - 10:00 PM'
    }
  },
  {
    id: '5',
    name: 'Bistro Français',
    cuisine: ['French'],
    priceRange: 4,
    rating: 4.8,
    reviewCount: 325,
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'Downtown',
    isVegetarian: false,
    description: 'Classic French cuisine with a modern twist, featuring seasonal ingredients and an extensive wine list.',
    features: ['Wine Pairing', 'Chef\'s Tasting Menu', 'Intimate Setting'],
    openingHours: {
      'Tuesday-Saturday': '5:00 PM - 10:00 PM',
      'Sunday-Monday': 'Closed'
    }
  },
  {
    id: '6',
    name: 'Taqueria Cinco',
    cuisine: ['Mexican'],
    priceRange: 2,
    rating: 4.4,
    reviewCount: 198,
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'Midtown',
    isVegetarian: false,
    description: 'Authentic Mexican street food with handmade tortillas and house-made salsas in a vibrant setting.',
    features: ['House Margaritas', 'Fresh Guacamole', 'Open Kitchen'],
    openingHours: {
      'Monday-Sunday': '11:00 AM - 11:00 PM'
    },
    discount: {
      percentage: 20,
      description: 'Taco Tuesday: 20% off all tacos'
    }
  },
  {
    id: '7',
    name: 'Golden Dragon',
    cuisine: ['Chinese'],
    priceRange: 3,
    rating: 4.5,
    reviewCount: 276,
    imageUrl: 'https://images.unsplash.com/photo-1588417446573-996419f62b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'Chinatown',
    isVegetarian: false,
    description: 'Traditional Chinese delicacies and dim sum prepared by skilled chefs using authentic techniques.',
    features: ['Dim Sum Carts', 'Lazy Susan Tables', 'Tea Selection'],
    openingHours: {
      'Monday-Sunday': '11:00 AM - 10:30 PM'
    }
  },
  {
    id: '8',
    name: 'The Grill House',
    cuisine: ['American', 'Steakhouse'],
    priceRange: 4,
    rating: 4.7,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'Downtown',
    isVegetarian: false,
    description: 'Premium aged steaks and classic American fare served in an upscale, sophisticated atmosphere.',
    features: ['Dry-Aged Steaks', 'Craft Cocktails', 'Private Booths'],
    openingHours: {
      'Monday-Thursday': '5:00 PM - 10:00 PM',
      'Friday-Saturday': '5:00 PM - 11:00 PM',
      'Sunday': '4:00 PM - 9:00 PM'
    }
  }
];
