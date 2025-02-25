import { login } from "@/appwrite/userActions";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { themeColors } from "@/constants/Colors";
import { propertyImages } from "@/constants/data";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const COLUMN_COUNT = 3;
const IMAGES_PER_COLUMN = 4;

const LogIn = () => {
  const router = useRouter();
  const { user, setUser, loading } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "gray" }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (user) return <Redirect href="/(tabs)/home" />;

  const handleLogin = async () => {
    const loggedInUser = await login();
    if (loggedInUser) setUser(loggedInUser);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, paddingHorizontal: 12 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 12,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {Array.from({ length: COLUMN_COUNT }).map((_, colIndex) => (
            <View key={colIndex} style={{ flex: 1, flexShrink: 0, gap: 12 }}>
              {propertyImages
                .slice(colIndex * IMAGES_PER_COLUMN, (colIndex + 1) * IMAGES_PER_COLUMN)
                .map((uri, imgIndex) => (
                  <Image
                    key={imgIndex}
                    source={{ uri }}
                    style={{
                      objectFit: "cover",
                      borderRadius: 12,
                      height: colIndex === 1 ? 180 : 150,
                      flexShrink: 0,
                    }}
                  />
                ))}
            </View>
          ))}
          <Image
            source={require("@/assets/images/gradient.png")}
            style={{
              height: 50,
              objectFit: "cover",
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            paddingVertical: 24,
            minHeight: 200,
          }}
        >
          <Text
            style={{
              textTransform: "uppercase",
              fontSize: 12,
              color: "gray",
              letterSpacing: 1.8,
            }}
          >
            Welcome to HomeScope
          </Text>
          <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "800", letterSpacing: 1 }}>
            Where <Text style={{ color: themeColors.accentBlue }}>Dreams</Text> Meet Doorsteps!
          </Text>
          <TouchableOpacity
            style={{
              height: 40,
              borderRadius: 100,
              width: "100%",
              maxWidth: 300,
              backgroundColor: "#fff",
              boxShadow: "0px 0px 50px 0px rgba(0,0,0,.1)",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
            onPress={handleLogin}
          >
            <Image
              source={require("@/assets/images/google.png")}
              style={{ height: 14, width: 14, objectFit: "contain" }}
            />
            <Text style={{ fontWeight: "700", fontSize: 14 }}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
            <Text style={{ fontSize: 14, color: "gray" }}>Continue as guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
