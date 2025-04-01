import { ID, Query } from "react-native-appwrite";
import { databases } from "./appwrite";
import { config } from "./config";
import { BookingProps, User } from "@/types";

export async function createBooking(bookingProp: BookingProps) {
  try {
    const booking = await databases.createDocument(
      config.db,
      config.bookings,
      ID.unique(),
      {
        ...bookingProp,
        adults: parseInt(bookingProp.adults),
        children: parseInt(bookingProp.children),
      }
    );

    return booking;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getBookings(user: User) {
  try {
    if (user) {
      const bookings = await databases.listDocuments(
        config.db,
        config.bookings,
        [Query.equal("user", user.$id)]
      );
      return bookings;
    } else {
      throw new Error("No user");
    }
  } catch (error) {
    console.error(error);
  }
}
