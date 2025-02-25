import { getMyBookings } from "@/appwrite/bookingActions";
import PaymentCard from "@/components/PaymentCard";
import TopBar from "@/components/TopBar";
import { Booking } from "@/types";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const Payments = () => {
  const [payments, setPayments] = useState<Booking[] | null>(null);

  useEffect(() => {
    getMyBookings().then(setPayments);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Payments" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={{ flex: 1, gap: 12, paddingHorizontal: 16, paddingVertical: 20 }}>
            {payments === null ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} height={220} width="100%" colorMode="light" />
              ))
            ) : payments.length > 0 ? (
              payments.map((payment) => (
                <PaymentCard key={payment.$id} payment={payment} />
              ))
            ) : (
              <Text style={{ alignSelf: "center" }}>No payments yet.</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Payments;
