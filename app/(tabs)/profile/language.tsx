import MyBookingCard from "@/components/MyBookingCard";
import TopBar from "@/components/TopBar";
import { languages } from "@/constants/data";
import { globalStyles } from "@/styles/globalStyles";
import { TickCircle } from "iconsax-react-native";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const Language = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopBar title="Language" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, gap: 16, paddingHorizontal: 16, paddingTop: 12 }}
          >
            {languages.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  {item.icon}
                  <Text style={globalStyles.subheading}>{item.language}</Text>
                </View>
                <TickCircle
                  size={18}
                  color="black"
                />
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Language;
