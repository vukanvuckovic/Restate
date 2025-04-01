import { ID } from "react-native-appwrite";
import { databases } from "./appwrite";
import { config } from "./config";

export const createTestReview = async () => {
  try {
    await databases.createDocument(config.db, config.reviews, ID.unique(), {
      rating: 4,
      review: "test",
      likes: 2,
      name: "Vukan",
      property: "67e2ff260019f77e26b4",
    });
  } catch (error) {
    console.error(error);
  }
};
