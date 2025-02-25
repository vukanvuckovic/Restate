import { getLatestProperties, getProperties } from "@/appwrite/propertyActions";
import FeaturedCard from "@/components/FeaturedCard";
import HomeFlatlistCard from "@/components/HomeFlatlistCard";
import { themeColors } from "@/constants/Colors";
import { propertyTypes } from "@/constants/data";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { globalStyles } from "@/styles/globalStyles";
import { Property } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { NotificationBing } from "iconsax-react-native";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
  const { user, loading } = useGlobalContext();
  const { propertyType } = useLocalSearchParams();
  const router = useRouter();

  const [featuredProperties, setFeaturedProperties] = useState<Property[] | null>(null);
  const [recommendedProperties, setRecommendedProperties] = useState<Property[] | null>(null);

  const activeType = (propertyType as string) || "all";

  useEffect(() => {
    const fetchProperties = async () => {
      setRecommendedProperties(null);
      const [featured, recommended] = await Promise.all([
        getLatestProperties(),
        getProperties({ filter: propertyType as string, limit: 20 }),
      ]);
      setFeaturedProperties(featured);
      setRecommendedProperties(recommended);
    };

    fetchProperties();
  }, [propertyType]);

  const userInitials = user
    ? `${user.name[0]}${user.name.split(" ")[1]?.[0] ?? ""}`
    : "G";

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingTop: 12, gap: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Skeleton colorMode="light" radius="round" show={loading}>
                  <View
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 100,
                      backgroundColor: themeColors.lightBlue,
                      borderWidth: 2,
                      borderColor: themeColors.lightBlueBorder,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "700", color: themeColors.accentBlue }}>
                      {userInitials}
                    </Text>
                  </View>
                </Skeleton>
                <View style={{ gap: 4 }}>
                  <Text style={globalStyles.profileHello}>Good Morning</Text>
                  <Text style={globalStyles.profileName}>{user?.name ?? "Guest"}</Text>
                </View>
              </View>
              {!user ? (
                <TouchableOpacity onPress={() => router.navigate("/")}>
                  <Text style={{ color: themeColors.accentBlue, fontWeight: "600" }}>Log In</Text>
                </TouchableOpacity>
              ) : (
                <NotificationBing size={20} color="black" />
              )}
            </View>

            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                }}
              >
                <Text style={globalStyles.homeHeading}>Featured</Text>
                <Text style={globalStyles.seeAll}>See All</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16 }}>
                  {featuredProperties === null ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} show colorMode="light" height={300} width={220} />
                    ))
                  ) : featuredProperties.length > 0 ? (
                    featuredProperties.map((property) => (
                      <FeaturedCard key={property.$id} property={property} />
                    ))
                  ) : (
                    <Text style={{ alignSelf: "center", paddingVertical: 24 }}>
                      No featured properties
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                }}
              >
                <Text style={globalStyles.homeHeading}>Our Recommendation</Text>
                <Text style={globalStyles.seeAll}>See All</Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ flexDirection: "row", gap: 8, paddingHorizontal: 16 }}>
                    {propertyTypes.map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        onPress={() => router.setParams({ propertyType: item.value })}
                        style={
                          item.value === activeType
                            ? globalStyles.categorySelectedButton
                            : globalStyles.categoryButton
                        }
                      >
                        <Text
                          style={
                            item.value === activeType
                              ? { color: "white", fontWeight: "500" }
                              : undefined
                          }
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              {recommendedProperties === null ? (
                <View style={{ gap: 12, padding: 12 }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} show height={200} width="100%" colorMode="light" />
                  ))}
                </View>
              ) : recommendedProperties.length > 0 ? (
                <FlatList
                  data={recommendedProperties}
                  keyExtractor={(item) => item.$id}
                  numColumns={2}
                  scrollEnabled={false}
                  contentContainerStyle={{ gap: 20, paddingVertical: 20 }}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                    gap: 16,
                    paddingHorizontal: 16,
                  }}
                  renderItem={({ item }) => <HomeFlatlistCard property={item} />}
                />
              ) : (
                <Text style={{ alignSelf: "center" }}>No recommended properties.</Text>
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
