import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const TopBar = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.05)",
        zIndex: 1,
      }}
    >
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft2
            size={22}
            color="black"
          />
        </TouchableOpacity>
        <Text style={globalStyles.barHeading}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default TopBar;
