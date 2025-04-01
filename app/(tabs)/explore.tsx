import { getProperties } from "@/appwrite/propertyActions";
import ExploreCard from "@/components/ExploreCard";
import FilterBottomSheet from "@/components/FilterBottomSheet";
import { themeColors } from "@/constants/Colors";
import { propertyTypes } from "@/constants/data";
import { globalStyles } from "@/styles/globalStyles";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrangeHorizontal,
  NotificationBing,
  SearchNormal1,
} from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView, View } from "react-native";
import { Models } from "react-native-appwrite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Models.Document[]>();
  const [search, setSearch] = useState("");

  const { propertyType, priceFrom, priceTo, areaFrom, areaTo } =
    useLocalSearchParams();

  useEffect(() => {
    const fetchProperties = async () => {
      setProperties(
        await getProperties({
          filter: propertyType as string,
          priceFrom: priceFrom as string,
          priceTo: priceTo as string,
          query: search,
          areaFrom: areaFrom as string,
          areaTo: areaTo as string,
        })
      );
      setLoading(false);
    };
    fetchProperties();
  }, [propertyType, priceFrom, priceTo, search, areaFrom, areaTo]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const router = useRouter();

  if (loading)
    return (
      <SafeAreaView>
        <Text>loading</Text>
      </SafeAreaView>
    );

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1, gap: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  paddingTop: 12,
                }}
              >
                <Text style={globalStyles.heading}>Explore - {propertyType}</Text>
                <TouchableOpacity>
                  <NotificationBing
                    size={18}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingHorizontal: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderColor: themeColors.lightBlueBorder,
                    borderRadius: 8,
                    backgroundColor: themeColors.lightBlue,
                  }}
                >
                  <SearchNormal1
                    size={16}
                    color={themeColors.gray}
                  />
                  <TextInput
                    placeholder="Search for properties"
                    value={search}
                    onChangeText={(val) => setSearch(val)}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity onPress={openSheet}>
                    <ArrangeHorizontal
                      size={16}
                      color={themeColors.gray}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
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
              {properties && (
                <Text
                  style={[globalStyles.subheading, { paddingHorizontal: 16 }]}
                >
                  Found {properties.length} properties
                </Text>
              )}
              <View
                style={{ paddingHorizontal: 16, paddingBottom: 20, gap: 18 }}
              >
                {properties ? (
                  properties.length > 0 ? (
                    properties.map((item, index) => (
                      <ExploreCard
                        key={index}
                        property={item}
                      />
                    ))
                  ) : (
                    <Text>No properties</Text>
                  )
                ) : (
                  <Text>loading</Text>
                )}
              </View>
            </View>
          </ScrollView>
          <FilterBottomSheet sheetRef={bottomSheetRef} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Explore;
