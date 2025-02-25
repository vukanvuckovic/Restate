import { themeColors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Home, Profile, SearchFavorite } from "iconsax-react-native";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.accentBlue,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home size={18} color={focused ? themeColors.accentBlue : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <SearchFavorite size={18} color={focused ? themeColors.accentBlue : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <Profile size={18} color={focused ? themeColors.accentBlue : "gray"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
