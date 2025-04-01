import { Stack, Tabs, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="explore"
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="+not-found" /> */}
    </Tabs>
  );
};

export default TabsLayout;
