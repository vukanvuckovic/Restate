import MyBookingCard from "@/components/MyBookingCard";
import PaymentCard from "@/components/PaymentCard";
import TopBar from "@/components/TopBar";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

const Payments = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Payments" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, gap: 12, paddingHorizontal: 16, paddingTop: 12 }}
          >
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Payments;
