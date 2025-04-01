import { databases } from "@/appwrite/appwrite";
import { config } from "@/appwrite/config";
import { createReview } from "@/appwrite/reviewActions";
import { ID, Query } from "react-native-appwrite";

const reviewers = [
  { name: "John Doe", review: "Great place! Would visit again." },
  { name: "Jane Smith", review: "Loved the atmosphere and service." },
  { name: "Mark Johnson", review: "Decent experience, but could be better." },
  { name: "Emily Davis", review: "Absolutely fantastic, highly recommend!" },
  { name: "Michael Brown", review: "Good value for money." },
];

const getRandomReview = () => {
  const randomIndex = Math.floor(Math.random() * reviewers.length);
  return reviewers[randomIndex];
};

export const seedReviews = async () => {
  try {
    // Fetch all properties
    const properties = await databases.listDocuments(
      config.db,
      config.properties
    );

    if (!properties || properties.documents.length === 0) {
      console.log("No properties found.");
      return;
    }

    for (const property of properties.documents) {
      const propertyId = property.$id;

      // Ensure at least 2 reviews per property
      for (let i = 0; i < 2; i++) {
        const { name, review } = getRandomReview();
        const rating = Math.floor(Math.random() * 5) + 1; // Random rating between 1-5

        await createReview({
          name,
          review,
          rating,
          property: propertyId,
        });

        console.log(`Review added for property: ${propertyId}`);
      }
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding reviews:", error);
  }
};

export const linkPropertiesWithReviews = async () => {
  try {
    const properties = await databases.listDocuments(
      config.db,
      config.properties,
      [Query.limit(100)]
    );
    const reviews = await databases.listDocuments(config.db, config.reviews, [
      Query.limit(50),
    ]);

    // for (const property of properties.documents) {
    //   const randomNumber = Math.floor(Math.random() * 50);
    //   const randomReview = reviews.documents[randomNumber];
    //   console.log("random-review, random-number", randomReview, randomNumber);
    //   await databases.updateDocument(
    //     config.db,
    //     config.properties,
    //     property.$id,
    //     {
    //       reviews: [...property.reviews, randomReview.$id],
    //     }
    //   );
    //   console.log("seeded something");
    // }

    for (const review of reviews.documents) {
      const randomNumber = Math.abs(Math.floor(Math.random() * 100));
      const randomProperty = properties.documents[randomNumber];
      //   console.log("random-property", randomProperty, randomNumber);
      await databases.updateDocument(config.db, config.reviews, review.$id, {
        property: randomProperty.$id,
      });
      console.log("seeded something");
    }
    console.log("finished seeding something");
  } catch (error) {
    console.error(error);
  }
};

export const testLinkProperty = async () => {
  await databases.updateDocument(
    config.db,
    config.properties,
    "67e2ff260019f77e26b4",
    {
      reviews: ["67e301b20031e7dd9199"],
    }
  );
};
