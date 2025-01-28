import { ID } from "react-native-appwrite";
import { databases } from "./appwrite";
import { config } from "./config";

interface CreateReviewParams {
  name: string;
  review?: string;
  rating: number;
  property: string;
}

export async function createReview(review: CreateReviewParams): Promise<boolean> {
  try {
    const property = await databases.getDocument(
      config.db,
      config.properties,
      review.property
    );

    const currentRating = property.rating || 0;
    const currentReviewCount = property.reviews.length || 0;

    const newReview = await databases.createDocument(
      config.db,
      config.reviews,
      ID.unique(),
      { ...review, likes: 0 }
    );

    const newReviewCount = currentReviewCount + 1;
    const newAvgRating =
      (currentRating * currentReviewCount + newReview.rating) / newReviewCount;

    await databases.updateDocument(config.db, config.properties, property.$id, {
      rating: newAvgRating,
    });

    return true;
  } catch {
    return false;
  }
}
