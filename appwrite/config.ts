export const config = {
  project: process.env.EXPO_PUBLIC_PROJECT_ID!,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  db: process.env.EXPO_PUBLIC_DATABASE_ID!,
  reviews: process.env.EXPO_PUBLIC_REVIEWS_COLLECTION!,
  agents: process.env.EXPO_PUBLIC_AGENTS_COLLECTION!,
  properties: process.env.EXPO_PUBLIC_PROPERTIES_COLLECTION!,
  users: process.env.EXPO_PUBLIC_USERS_COLLECTION!,
  bookings: process.env.EXPO_PUBLIC_BOOKINGS_COLLECTION!,
  // propertyImages: process.env.EXPO_PUBLIC_PROPERTIES_BUCKET!,
  // agentImages: process.env.EXPO_PUBLIC_AGENTS_BUCKET!,
  // admin: process.env.EXPO_PUBLIC_ADMIN!,
};
