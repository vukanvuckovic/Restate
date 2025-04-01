import { databases } from "@/appwrite/appwrite";
import { config } from "@/appwrite/config";
import BookingBottomSheet from "@/components/BookingBottomSheet";
import ReviewCard from "@/components/ReviewCard";
import { themeColors } from "@/constants/Colors";
import { propertyAttributes } from "@/constants/data";
import { globalStyles } from "@/styles/globalStyles";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft2,
  Call,
  DocumentUpload,
  Heart,
  Location,
  Message,
  Profile,
  Star1,
} from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const PropertyId = () => {
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Models.Document>();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchProp = async () => {
      setProperty(
        await databases.getDocument(config.db, config.properties, id as string)
      );
      setLoading(false);
    };
    fetchProp();
  }, []);

  const data = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    text: `Item ${i + 1}`,
  }));

  const bottomSheetRef = useRef<BottomSheet>(null);
  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const { width } = Dimensions.get("window");

  const router = useRouter();

  if (loading || !property)
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    );

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <SafeAreaView style={{ backgroundColor: themeColors.accentBlue }}>
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft2
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, color: "white", fontWeight: 500 }}>
                Property Details
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 18 }}
            >
              <TouchableOpacity>
                <Heart
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <DocumentUpload
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <SafeAreaView style={{ flex: 1, position: "relative" }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>
              <View style={{ height: 400 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  snapToStart={true}
                  pagingEnabled
                  bounces={false}
                >
                  <View style={{ flexDirection: "row" }}>
                    {property?.images.map((item: string, index: number) => (
                      <Image
                        key={index}
                        source={{ uri: item }}
                        style={{
                          width: width,
                        }}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View
                style={{
                  paddingVertical: 20,
                  gap: 12,
                }}
              >
                <Text style={[globalStyles.heading, { paddingHorizontal: 16 }]}>
                  {property.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                    paddingHorizontal: 16,
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 100,
                      backgroundColor: themeColors.lightBlue,
                    }}
                  >
                    <Text style={globalStyles.propertyType}>
                      {property.category}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      gap: 6,
                    }}
                  >
                    <Star1
                      size={18}
                      color="#FB9400"
                      variant="Bold"
                    />
                    <Text style={globalStyles.smallTextBold}>
                      {property.reviews.length > 0
                        ? `${property.rating} from ${property.reviews.length} reviews`
                        : `No reviews yet.`}
                    </Text>
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
                        alignItems: "center",
                        gap: 20,
                        paddingHorizontal: 16,
                      }}
                    >
                      {propertyAttributes.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <View
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 100,
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: themeColors.lightBlue,
                            }}
                          >
                            {item.icon}
                          </View>
                          <Text style={globalStyles.smallTextBold}>
                            {property[item.name.toLowerCase()]}{" "}
                            {item.name === "Area" ? "sqft" : item.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
              <View style={{ padding: 16, gap: 40 }}>
                <View style={{ gap: 12 }}>
                  <Text style={globalStyles.subheading}>Agent</Text>
                  <View
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
                      <Image
                        source={{ uri: property.agent.image }}
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 100,
                        }}
                      />
                      <View style={{ gap: 6 }}>
                        <Text style={globalStyles.agentName}>
                          {property.agent.name}
                        </Text>
                        <Text style={globalStyles.smallTextBold}>Owner</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 18,
                      }}
                    >
                      <Message
                        size={24}
                        color={themeColors.accentBlue}
                      />
                      <Call
                        size={24}
                        color={themeColors.accentBlue}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ gap: 12 }}>
                  <Text style={globalStyles.subheading}>Overview</Text>
                  <Text style={globalStyles.standardText}>
                    {property.overview}
                  </Text>
                </View>
                <View style={{ gap: 12 }}>
                  <Text style={globalStyles.subheading}>Facilities</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {property.facilities.map((item: any, index: number) => (
                      <View
                        key={index}
                        style={{
                          width: "25%",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 12,
                        }}
                      >
                        <View
                          style={{
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: themeColors.lightBlue,
                          }}
                        >
                          <Profile
                            size={24}
                            color={themeColors.accentBlue}
                          />
                        </View>
                        <Text style={globalStyles.smallText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={{ gap: 12 }}>
                  <Text style={globalStyles.subheading}>Gallery</Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {property.images
                      .slice(0, 3)
                      .map((item: string, index: number) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            flex: 1,
                            aspectRatio: 1,
                            borderRadius: 12,
                            overflow: "hidden",
                            position: "relative",
                          }}
                          onPress={() => router.push(`/gallery/${id}`)}
                        >
                          <Image
                            source={{ uri: item }}
                            style={{ flex: 1 }}
                          />
                          {property.images.length > 3 && index === 2 && (
                            <View
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0,0,0,.5)",
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: 600,
                                  fontSize: 24,
                                }}
                              >
                                +{property.images.length - 3}
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
                <View style={{ gap: 12 }}>
                  <Text style={globalStyles.subheading}>Location</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Location
                      size={18}
                      color={themeColors.accentBlue}
                    />
                    <Text style={globalStyles.smallTextBold}>
                      {property.address}
                    </Text>
                  </View>
                  <MapView
                    initialRegion={{
                      latitude: property.lat,
                      longitude: property.long,
                      latitudeDelta: 0.00922,
                      longitudeDelta: 0.00421,
                    }}
                    style={{ height: 200, width: "100%", borderRadius: 12 }}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    showsBuildings={true}
                    mapType="standard"
                  >
                    <Marker
                      coordinate={{
                        latitude: property.lat,
                        longitude: property.long,
                      }}
                      pinColor="#0061FF"
                    />
                  </MapView>
                </View>
                {property.reviews.length > 0 && (
                  <View style={{ gap: 32 }}>
                    <View
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
                          gap: 10,
                        }}
                      >
                        <Star1
                          size={18}
                          color={themeColors.accentBlue}
                          variant="Bold"
                        />
                        <Text style={globalStyles.subheading}>
                          4.5 ({property.reviews.length} reviews)
                        </Text>
                      </View>
                      <TouchableOpacity>
                        <Text style={globalStyles.seeAll}>See All</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ gap: 30 }}>
                      {property.reviews.map((item: any, index: number) => (
                        <ReviewCard
                          key={index}
                          review={item}
                        />
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: 20,
              borderWidth: 1,
              borderBottomWidth: 0,
              borderColor: themeColors.lightGray,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              flexShrink: 0,
              // display: "none",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: themeColors.gray,
                  fontWeight: 700,
                }}
              >
                PRICE
              </Text>
              <Text style={[globalStyles.price, { fontWeight: 700 }]}>
                $1234
              </Text>
            </View>
            <TouchableOpacity
              onPress={openSheet}
              style={{
                backgroundColor: themeColors.accentBlue,
                paddingHorizontal: 50,
                paddingVertical: 12,
                borderRadius: 100,
                boxShadow: "0px 5px 20px 5px rgba(48, 48, 48, 0.15)",
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            display: "none",
          }}
        />
        <BookingBottomSheet sheetRef={bottomSheetRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PropertyId;
