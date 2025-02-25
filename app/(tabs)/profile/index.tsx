import { logout } from "@/appwrite/userActions";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { themeColors } from "@/constants/Colors";
import { profileMenuLinks } from "@/constants/data";
import { globalStyles } from "@/styles/globalStyles";
import { Href, Redirect, useRouter } from "expo-router";
import { ArrowRight2, Logout, NotificationBing } from "iconsax-react-native";
import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const router = useRouter();
  const { user, setUser, loading } = useGlobalContext();

  if (!loading && !user) return <Redirect href="/home" />;

  const handleLogout = async () => {
    const success = await logout();
    if (success) setUser(null);
  };

  const userInitials = user
    ? `${user.name[0]}${user.name.split(" ")[1]?.[0] ?? ""}`
    : "";

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12, gap: 32 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={globalStyles.heading}>Profile</Text>
              <TouchableOpacity>
                <NotificationBing size={20} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center", gap: 12 }}>
              <View
                style={{
                  height: 100,
                  aspectRatio: 1,
                  backgroundColor: themeColors.lightBlue,
                  borderWidth: 2,
                  borderColor: themeColors.lightBlueBorder,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 36, fontWeight: "700", color: themeColors.accentBlue }}>
                  {userInitials}
                </Text>
              </View>
              <Text style={globalStyles.subheading}>{user?.name}</Text>
            </View>

            <View style={{ gap: 24 }}>
              {profileMenuLinks.map((item) => (
                <TouchableOpacity
                  key={item.link}
                  onPress={() => router.push(item.link as Href)}
                  style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    {item.icon}
                    <Text style={globalStyles.menuLink}>{item.title}</Text>
                  </View>
                  <ArrowRight2 size={16} color="#212121" />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={handleLogout}
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <Logout size={24} color="#F75555" />
                <Text style={[globalStyles.menuLink, { color: "#F75555" }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Profile;
