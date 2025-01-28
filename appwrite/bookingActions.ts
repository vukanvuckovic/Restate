import { ID, Query } from "react-native-appwrite";
import { databases } from "./appwrite";
import { config } from "./config";
import { Booking, BookingProps } from "@/types";
import { getCurrentUser } from "./userActions";

export async function createBooking(booking: BookingProps): Promise<Booking | null> {
  try {
    const result = await databases.createDocument(
      config.db,
      config.bookings,
      ID.unique(),
      {
        name: `${booking.firstName} ${booking.lastName}`,
        phone: booking.phone,
        email: booking.email,
        adults: booking.adults,
        children: booking.children,
        from: booking.from,
        to: booking.to,
        user: booking.user,
        property: booking.property,
        price:
          (booking.price * booking.adults +
            booking.price * booking.children * 0.9) *
          (booking.days > 0 ? booking.days : 1),
        days: booking.days,
      }
    );
    return result as Booking;
  } catch {
    return null;
  }
}

export async function getMyBookings(): Promise<Booking[] | null> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;

    const result = await databases.listDocuments(config.db, config.bookings, [
      Query.equal("user", currentUser.$id),
    ]);

    return result.documents as Booking[];
  } catch {
    return null;
  }
}
