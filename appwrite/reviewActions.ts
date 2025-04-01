import { ID } from "react-native-appwrite";
import { databases } from "./appwrite";
import { config } from "./config";

export const createReview = async (review: {
  name: string;
  review?: string;
  rating: number;
  property: string;
}) => {
  try {
    // Fetch the property details
    const fetchedProperty = await databases.getDocument(
      config.db,
      config.properties,
      review.property
    );

    // Ensure property has `rating` and `reviewCount` fields
    const currentRating = fetchedProperty.rating || 0;
    const currentReviewCount = fetchedProperty.reviewCount || 0;

    // Create the new review
    const newReview = await databases.createDocument(
      config.db,
      config.reviews,
      ID.unique(),
      {
        ...review,
        likes: 0,
      }
    );

    if (newReview) {
      // Calculate the new average rating
      const newReviewCount = currentReviewCount + 1;
      const newAvgRating =
        (currentRating * currentReviewCount + newReview.rating) /
        newReviewCount;

      // Update the property with the new rating and review count
      await databases.updateDocument(
        config.db,
        config.properties,
        fetchedProperty.$id,
        {
          rating: newAvgRating,
        }
      );

      console.log(
        `Updated property ${fetchedProperty.$id} with new rating: ${newAvgRating}`
      );
    }
  } catch (error) {
    console.error("Error adding review:", error);
  }
};
