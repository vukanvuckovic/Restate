import { Query } from "react-native-appwrite";
import { databases } from "./appwrite";
import { config } from "./config";
import { Property } from "@/types";

export async function getLatestProperties(): Promise<Property[]> {
  try {
    const result = await databases.listDocuments(config.db, config.properties, [
      Query.orderAsc("$createdAt"),
      Query.limit(5),
    ]);
    return result.documents as Property[];
  } catch {
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
  priceFrom,
  priceTo,
  areaFrom,
  areaTo,
  bathrooms,
  bedrooms,
}: {
  filter?: string;
  query?: string;
  limit?: number;
  priceFrom?: string;
  priceTo?: string;
  areaFrom?: string;
  areaTo?: string;
  bathrooms?: string;
  bedrooms?: string;
}): Promise<Property[]> {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "all") {
      buildQuery.push(Query.equal("category", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("category", query),
        ])
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    if (priceTo) {
      buildQuery.push(Query.lessThan("price", parseInt(priceTo)));
    }
    if (priceFrom) {
      buildQuery.push(Query.greaterThan("price", parseInt(priceFrom)));
    }
    if (areaTo) {
      buildQuery.push(Query.lessThan("area", parseInt(areaTo)));
    }
    if (areaFrom) {
      buildQuery.push(Query.greaterThan("area", parseInt(areaFrom)));
    }
    if (bathrooms) {
      buildQuery.push(Query.greaterThanEqual("bathrooms", parseInt(bathrooms)));
    }
    if (bedrooms) {
      buildQuery.push(Query.greaterThanEqual("bedrooms", parseInt(bedrooms)));
    }

    const result = await databases.listDocuments(
      config.db,
      config.properties,
      buildQuery
    );
    return result.documents as Property[];
  } catch {
    return [];
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const result = await databases.getDocument(config.db, config.properties, id);
    return result as Property;
  } catch {
    return null;
  }
}
