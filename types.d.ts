import { Models } from "react-native-appwrite";

export interface User extends Models.Document {
  name: string;
  email: string;
  phone?: string;
}

export interface Agent extends Models.Document {
  name: string;
  image: string;
}

export interface Review extends Models.Document {
  name: string;
  review?: string;
  rating: number;
  likes: number;
  property: string;
}

export interface Property extends Models.Document {
  name: string;
  category: string;
  images: string[];
  price: number;
  rating: number;
  beds: number;
  bathrooms: number;
  area: number;
  overview: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  long: number;
  facilities: string[];
  reviews: Review[];
  agent: Agent;
}

export interface Booking extends Models.Document {
  name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  from: string;
  to: string;
  days: number;
  price: number;
  user: string;
  property: Property;
}

export interface BookingProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  from: Date;
  to: Date;
  property: string;
  price: number;
  days: number;
  user: string;
}
