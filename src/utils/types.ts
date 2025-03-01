
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  priceRange: 1 | 2 | 3 | 4; // $ to $$$$
  rating: number;
  reviewCount: number;
  imageUrl: string;
  location: string;
  isVegetarian: boolean;
  description: string;
  features?: string[];
  openingHours?: {
    [key: string]: string;
  };
  discount?: {
    percentage: number;
    description: string;
  } | null;
}

export interface ReservationFormData {
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
  name: string;
  email: string;
  phone: string;
}

export interface FilterOptions {
  cuisine: string[];
  vegetarian: boolean | null;
  priceRange: number[] | null;
  rating: number | null;
  searchTerm: string;
}

export type Cuisine = 
  | 'Italian' 
  | 'Japanese' 
  | 'Indian' 
  | 'Chinese' 
  | 'Mexican' 
  | 'Thai' 
  | 'French' 
  | 'Mediterranean' 
  | 'American' 
  | 'BBQ'
  | 'Seafood'
  | 'Steakhouse'
  | 'Vegetarian'
  | 'Vegan'
  | 'Fusion';
