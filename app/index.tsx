import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const LogIn = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 12 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 8,
            borderWidth: 1,
            borderColor: "red",
            position: "relative",
          }}
        >
          <View style={{ flex: 1, backgroundColor: "blue" }}></View>
          <View style={{ flex: 1, backgroundColor: "blue" }}></View>
          <View style={{ flex: 1, backgroundColor: "blue" }}></View>
          <View
            style={{
              height: 50,
              width: "100%",
              backgroundColor: "red",
              position: "absolute",
              top: 0,
            }}
          />
          <View
            style={{
              height: 50,
              width: "100%",
              backgroundColor: "red",
              position: "absolute",
              bottom: 0,
            }}
          />
        </View>
        <View style={{ alignItems: "center", gap: 12, paddingVertical: 24 }}>
          <Text>Welcome to ReState</Text>
          <Text>Welcome to ReState</Text>
          <Text>Welcome to ReState</Text>
          {/* <TouchableOpacity onPress={() => linkPropertiesWithReviews()}> */}
          <TouchableOpacity onPress={() => router.push("/(tabs)")}>
            <Text>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
