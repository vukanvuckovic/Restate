import { getProperties } from "@/appwrite/propertyActions";
import ExploreCard from "@/components/ExploreCard";
import FilterBottomSheet from "@/components/FilterBottomSheet";
import { themeColors } from "@/constants/Colors";
import { propertyTypes } from "@/constants/data";
import { globalStyles } from "@/styles/globalStyles";
import { Property } from "@/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrangeHorizontal, NotificationBing, SearchNormal1 } from "iconsax-react-native";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Explore = () => {
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [search, setSearch] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();

  const { propertyType, priceFrom, priceTo, areaFrom, areaTo } = useLocalSearchParams();
  const activeType = (propertyType as string) || "all";

  useEffect(() => {
    const fetchProperties = async () => {
      setProperties(null);
      const result = await getProperties({
        filter: propertyType as string,
        priceFrom: priceFrom as string,
        priceTo: priceTo as string,
        query: search,
        areaFrom: areaFrom as string,
        areaTo: areaTo as string,
      });
      setProperties(result);
    };
    fetchProperties();
  }, [propertyType, priceFrom, priceTo, search, areaFrom, areaTo]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
                <Text style={globalStyles.heading}>Explore</Text>
                <TouchableOpacity>
                  <NotificationBing size={18} color="black" />
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 16 }}>
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
                  <SearchNormal1 size={16} color={themeColors.gray} />
                  <TextInput
                    placeholder="Search for properties"
                    value={search}
                    onChangeText={setSearch}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
                    <ArrangeHorizontal size={16} color={themeColors.gray} />
                  </TouchableOpacity>
                </View>
              </View>

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

              <View style={{ paddingHorizontal: 16 }}>
                <Skeleton show={properties === null} colorMode="light">
                  <Text style={globalStyles.subheading}>
                    Found {properties?.length} properties
                  </Text>
                </Skeleton>
              </View>

              <View style={{ paddingHorizontal: 16, paddingBottom: 20, gap: 18 }}>
                {properties === null ? (
                  <View style={{ gap: 12 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} height={220} width="100%" colorMode="light" />
                    ))}
                  </View>
                ) : properties.length > 0 ? (
                  properties.map((item) => <ExploreCard key={item.$id} property={item} />)
                ) : (
                  <Text style={{ alignSelf: "center" }}>No properties found.</Text>
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
