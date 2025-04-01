import { themeColors } from "@/constants/Colors";
import { profileMenuLinks } from "@/constants/data";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { ArrowRight2, Logout, NotificationBing } from "iconsax-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12, gap: 32 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={globalStyles.heading}>Profile</Text>
              <TouchableOpacity>
                <NotificationBing
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "center",
                gap: 12,
              }}
            >
              <View
                style={{
                  height: 100,
                  aspectRatio: 1,
                  backgroundColor: "gray",
                  borderRadius: 100,
                }}
              />
              <Text style={globalStyles.subheading}>Vukan Vuckovic</Text>
            </View>
            <View style={{ gap: 24 }}>
              {profileMenuLinks.map((item, index) => (
                <TouchableOpacity
                  //@ts-ignore
                  onPress={() => router.push(item.link)}
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
                    <Text style={globalStyles.menuLink}>{item.title}</Text>
                  </View>
                  <ArrowRight2
                    size={16}
                    color={"#212121"}
                  />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Logout
                  size={24}
                  color="#F75555"
                />
                <Text style={[globalStyles.menuLink, { color: "#F75555" }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Profile;
