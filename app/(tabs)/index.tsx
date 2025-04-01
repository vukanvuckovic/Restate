import { getLatestProperties, getProperties } from "@/appwrite/propertyActions";
import FeaturedCard from "@/components/FeaturedCard";
import HomeFlatlistCard from "@/components/HomeFlatlistCard";
import { propertyTypes } from "@/constants/data";
import { globalStyles } from "@/styles/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Notification,
  Notification1,
  NotificationBing,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [featuredProperties, setFeaturedProperties] =
    useState<Models.Document[]>();
  const [recommendedProperties, setRecommendedProperties] =
    useState<Models.Document[]>();

  const { propertyType } = useLocalSearchParams();

  useEffect(() => {
    const fetchProperties = async () => {
      setFeaturedProperties(await getLatestProperties());
      setRecommendedProperties(await getProperties({ limit: 20 }));
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const router = useRouter();

  const data = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    text: `Item ${i + 1}`,
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
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
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <View
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 100,
                    backgroundColor: "gray",
                  }}
                />
                <View style={{ gap: 4 }}>
                  <Text style={globalStyles.profileHello}>Good Morning</Text>
                  <Text style={globalStyles.profileName}>
                    Vukan Vuckovic - prop - {propertyType}
                  </Text>
                </View>
              </View>
              <NotificationBing
                size={20}
                color="black"
              />
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
              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      paddingHorizontal: 16,
                    }}
                  >
                    {featuredProperties ? (
                      featuredProperties.length > 0 ? (
                        featuredProperties.map((property, index) => (
                          <FeaturedCard
                            property={property}
                            key={index}
                          />
                        ))
                      ) : (
                        <Text
                          style={{ alignSelf: "center", paddingVertical: 24 }}
                        >
                          No Featured Properties
                        </Text>
                      )
                    ) : (
                      Array.from({ length: 6 }).map((_, index) => (
                        <View
                          key={index}
                          style={{
                            height: 300,
                            width: 220,
                            borderRadius: 16,
                          }}
                        />
                      ))
                    )}
                  </View>
                </ScrollView>
              </View>
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
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      paddingHorizontal: 16,
                    }}
                  >
                    {propertyTypes.map((item, index) => (
                      <TouchableOpacity
                        onPress={() =>
                          router.setParams({ propertyType: item.value })
                        }
                        key={index}
                        style={
                          propertyType
                            ? item.value === propertyType
                              ? globalStyles.categorySelectedButton
                              : globalStyles.categoryButton
                            : item.value === "all"
                            ? globalStyles.categorySelectedButton
                            : globalStyles.categoryButton
                        }
                      >
                        <Text
                          style={
                            propertyType
                              ? item.value === propertyType && {
                                  color: "white",
                                  fontWeight: 500,
                                }
                              : item.value === "all" && {
                                  color: "white",
                                  fontWeight: 500,
                                }
                          }
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              {!loading && (
                <FlatList
                  data={recommendedProperties}
                  keyExtractor={(item) => item.$id.toString()}
                  numColumns={2}
                  scrollEnabled={false}
                  contentContainerStyle={{ gap: 20, paddingVertical: 20 }}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                    gap: 16,
                    paddingHorizontal: 16,
                  }}
                  renderItem={({ item }) => (
                    <HomeFlatlistCard property={item} />
                  )}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
