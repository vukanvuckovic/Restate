import { databases, storage } from "@/appwrite/appwrite";
import { config } from "@/appwrite/config";
import { ID } from "react-native-appwrite";

const categories = [
  "apartment",
  "house",
  "villa",
  "duplex",
  "penthouse",
  "mansion",
  "beachfront",
] as const;

const facilities = [
  "parking",
  "pool",
  "gym",
  "restaurant",
  "wifi",
  "sportCenter",
  "petCenter",
  "laundry",
] as const;

const locations = [
  { country: "USA", city: "New York", lat: 40.7128, long: -74.006 },
  { country: "France", city: "Paris", lat: 48.8566, long: 2.3522 },
  { country: "Italy", city: "Rome", lat: 41.9028, long: 12.4964 },
  { country: "Spain", city: "Barcelona", lat: 41.3874, long: 2.1686 },
  { country: "Germany", city: "Berlin", lat: 52.52, long: 13.405 },
  { country: "Greece", city: "Athens", lat: 37.9838, long: 23.7275 },
  { country: "Mexico", city: "Cancún", lat: 21.1619, long: -86.8515 },
  { country: "Thailand", city: "Bangkok", lat: 13.7563, long: 100.5018 },
  { country: "Australia", city: "Sydney", lat: -33.8688, long: 151.2093 },
  { country: "Brazil", city: "Rio de Janeiro", lat: -22.9068, long: -43.1729 },
];

const propertyNames = [
  "Azure Haven Resort",
  "Skyline Heights",
  "Golden Sands Villa",
  "Palm Serenity Lodge",
  "Elysian Towers",
  "The Grand Mirage",
  "Sunset Retreat",
  "Blue Horizon Residences",
  "The Royal View",
  "Infinity Bay Suites",
  "Ocean Breeze Apartments",
  "Prestige Heights",
  "La Bella Casa",
  "Celestial Mansion",
  "Urban Oasis Duplex",
  "The Emerald Stay",
  "Velvet Sunset Villa",
  "Paradise Loft",
  "Monte Carlo Mansion",
  "The Riviera Escape",
];

const getRandomElement = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (min: number, max: number) =>
  (Math.random() * (max - min) + min).toFixed(6);

const generateAddress = () =>
  `${Math.floor(Math.random() * 900) + 100} ${getRandomElement([
    "Main St",
    "Broadway",
    "Highland Ave",
    "Ocean Drive",
    "Park Lane",
  ])}`;

export const seedProperties = async () => {
  try {
    console.log("Starting property seeding...");

    // Step 1: Delete all existing properties
    const existingProperties = await databases.listDocuments(
      config.db,
      config.properties
    );
    for (const property of existingProperties.documents) {
      await databases.deleteDocument(
        config.db,
        config.properties,
        property.$id
      );
    }
    console.log(`Deleted ${existingProperties.documents.length} properties.`);

    // Step 2: Fetch agents
    const agentList = await databases.listDocuments(config.db, config.agents);
    const agents = agentList.documents;
    if (agents.length === 0) {
      console.log("No agents available, skipping property seeding.");
      return;
    }
    console.log("Fetched agents:", agents.length);

    // Step 3: Fetch images
    const imageList = await storage.listFiles(config.propertyImages);
    const images = imageList.files;
    if (images.length === 0) {
      console.log("No images available, skipping property seeding.");
      return;
    }

    // Pre-fetch all image URLs
    const imageUrls = await Promise.all(
      images.map((item) =>
        storage.getFilePreview(config.propertyImages, item.$id)
      )
    );
    console.log("Fetched images:", images.length);

    // Step 4: Generate and seed new properties
    for (let i = 0; i < 100; i++) {
      const location = getRandomElement(locations);
      const offsetLat = parseFloat(getRandomNumber(-0.05, 0.05));
      const offsetLong = parseFloat(getRandomNumber(-0.05, 0.05));

      // Generate unique images per property
      const numberOfImages = Math.min(5, images.length);
      const selectedImages = Array.from(
        { length: numberOfImages },
        () => imageUrls[Math.floor(Math.random() * images.length)]
      );

      // Select a random agent
      const randomAgentIndex = Math.floor(Math.random() * agents.length);

      const propertyData = {
        name:
          i % 5 === 0
            ? getRandomElement(propertyNames)
            : `Luxury ${getRandomElement(categories)} in ${location.city}`,
        overview: `Discover the elegance of our ${getRandomElement(
          categories
        )} in ${
          location.city
        }. Nestled in a prime location, this exquisite property offers modern comfort, stylish interiors, and breathtaking views. Enjoy top-notch amenities including ${getRandomElement(
          facilities
        )} and ${getRandomElement(
          facilities
        )}. A perfect retreat for travelers seeking relaxation and sophistication.`,
        country: location.country,
        city: location.city,
        address: generateAddress(),
        long: parseFloat((location.long + offsetLong).toFixed(6)),
        lat: parseFloat((location.lat + offsetLat).toFixed(6)),
        category: getRandomElement(categories),
        facilities: Array.from(
          { length: Math.floor(Math.random() * 4) + 2 },
          () => getRandomElement(facilities)
        ), // 2-5 random facilities
        beds: Math.floor(Math.random() * 6) + 1, // Between 1 and 6
        bathrooms: Math.floor(Math.random() * 5) + 1,
        area: Math.floor(Math.random() * 300) + 50, // Between 50 and 350 sqm
        price: Math.floor(Math.random() * 500) + 50, // Between $50 and $550 per night
        images: selectedImages,
        agent: agents[randomAgentIndex].$id,
        rating: 0,
      };

      await databases.createDocument(
        config.db,
        config.properties,
        ID.unique(),
        propertyData
      );

      console.log("Seeded property:", propertyData.name);
    }

    console.log("Property seeding completed.");
  } catch (error) {
    console.error("Error during property seeding:", error);
  }
};
