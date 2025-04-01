import MyBookingCard from "@/components/MyBookingCard";
import TopBar from "@/components/TopBar";
import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { ArrowLeft2, Heart } from "iconsax-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const myBookings = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <TopBar title="My Bookings" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              gap: 12,
              paddingHorizontal: 16,
              paddingVertical: 20,
            }}
          >
            <MyBookingCard />
            <MyBookingCard />
            <MyBookingCard />
            <MyBookingCard />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default myBookings;
