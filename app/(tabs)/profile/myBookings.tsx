import { getMyBookings } from "@/appwrite/bookingActions";
import MyBookingCard from "@/components/MyBookingCard";
import TopBar from "@/components/TopBar";
import { Booking } from "@/types";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    getMyBookings().then(setBookings);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="My Bookings" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={{ flex: 1, gap: 12, paddingHorizontal: 16, paddingVertical: 20 }}>
            {bookings === null ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} height={220} width="100%" colorMode="light" />
              ))
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <MyBookingCard key={booking.$id} booking={booking} />
              ))
            ) : (
              <Text style={{ alignSelf: "center" }}>No bookings yet.</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MyBookings;
