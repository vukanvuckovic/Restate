import { databases } from "@/appwrite/appwrite";
import { config } from "@/appwrite/config";
import { ID } from "react-native-appwrite";

const placeholderProperty = {
  name: "Sunset Retreat",
  overview: `Discover the elegance of our villa in Barcelona. Nestled in a prime location, this exquisite property offers modern comfort, stylish interiors, and breathtaking views. Enjoy top-notch amenities including a pool and gym. A perfect retreat for travelers seeking relaxation and sophistication.`,
  country: "Spain",
  city: "Barcelona",
  address: "101 Ocean Drive",
  long: 2.1686, // Longitude of Barcelona
  lat: 41.3874, // Latitude of Barcelona
  category: "villa",
  facilities: ["pool", "laundry"],
  area: 250, // Area in square meters
  price: 300, // Price per night in USD
  beds: 3,
  bathrooms: 2,
};

export const testSeed = async () => {
  try {
    await databases.createDocument(config.db, config.properties, ID.unique(), {
      ...placeholderProperty,
      agent: "67e2b2c30033db05608c",
      images: ["123","245"],
    });

    console.log(placeholderProperty);
  } catch (error) {
    console.error(error);
  }
};
