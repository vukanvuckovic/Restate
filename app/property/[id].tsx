import { getProperty } from "@/appwrite/propertyActions";
import BookingBottomSheet from "@/components/BookingBottomSheet";
import ReviewCard from "@/components/ReviewCard";
import { themeColors } from "@/constants/Colors";
import { facilitiesSpec, propertyAttributes } from "@/constants/data";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { globalStyles } from "@/styles/globalStyles";
import { Property } from "@/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft2,
  Call,
  DocumentUpload,
  Heart,
  Location,
  Message,
  Star1,
} from "iconsax-react-native";
import { Skeleton } from "moti/skeleton";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const PropertyDetail = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const { id } = useLocalSearchParams();
  const { width } = Dimensions.get("window");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { user } = useGlobalContext();

  const openBookingSheet = () => {
    if (!user) {
      router.push("/");
      return;
    }
    bottomSheetRef.current?.expand();
  };

  useEffect(() => {
    getProperty(id as string).then(setProperty);
  }, [id]);

  const reviewCount = property?.reviews.length ?? 0;
  const ratingLabel =
    reviewCount > 0
      ? `${property!.rating} from ${reviewCount} review${reviewCount > 1 ? "s" : ""}`
      : "No reviews yet.";

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
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft2 size={20} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, color: "white", fontWeight: "500" }}>
                Property Details
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
              <TouchableOpacity>
                <Heart size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <DocumentUpload size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <SafeAreaView style={{ flex: 1, position: "relative" }}>
        <View style={{ flex: 1 }}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
              <Skeleton colorMode="light" show={!property}>
                <View style={{ height: 400 }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                  >
                    <View style={{ flexDirection: "row" }}>
                      {property?.images.map((uri, index) => (
                        <Image key={index} source={{ uri }} style={{ width }} />
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </Skeleton>

              <View style={{ paddingVertical: 20, gap: 12 }}>
                <Skeleton show={!property} colorMode="light">
                  <Text style={[globalStyles.heading, { paddingHorizontal: 16 }]}>
                    {property?.name}
                  </Text>
                </Skeleton>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                    paddingHorizontal: 16,
                  }}
                >
                  <Skeleton show={!property} colorMode="light" width={!property ? 100 : 0}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 100,
                        backgroundColor: themeColors.lightBlue,
                      }}
                    >
                      <Text style={globalStyles.propertyType}>{property?.category}</Text>
                    </View>
                  </Skeleton>
                  <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6 }}>
                    <Star1 size={18} color="#FB9400" variant="Bold" />
                    <Skeleton show={!property} colorMode="light">
                      <Text style={globalStyles.smallTextBold}>{ratingLabel}</Text>
                    </Skeleton>
                  </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 20, paddingHorizontal: 16 }}>
                    {propertyAttributes.map((attr, index) => (
                      <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
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
                          {attr.icon}
                        </View>
                        <Skeleton show={!property} colorMode="light" width={50} height={20}>
                          {property && (
                            <Text style={globalStyles.smallTextBold}>
                              {property[attr.name.toLowerCase() as keyof Property] as string}{" "}
                              {attr.name === "Area" ? "sqft" : attr.name}
                            </Text>
                          )}
                        </Skeleton>
                      </View>
                    ))}
                  </View>
                </ScrollView>
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
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                      <Skeleton show={!property} colorMode="light" radius="round">
                        <Image
                          source={{ uri: property?.agent.image }}
                          style={{ height: 60, width: 60, borderRadius: 100 }}
                        />
                      </Skeleton>
                      <View style={{ gap: 6 }}>
                        <Skeleton show={!property} colorMode="light" width={120}>
                          <Text style={globalStyles.agentName}>{property?.agent.name}</Text>
                        </Skeleton>
                        <Skeleton show={!property} colorMode="light">
                          <Text style={globalStyles.smallTextBold}>Owner</Text>
                        </Skeleton>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
                      <Message size={24} color={themeColors.accentBlue} />
                      <Call size={24} color={themeColors.accentBlue} />
                    </View>
                  </View>
                </View>

                <View style={{ gap: 12 }}>
                  <Text style={globalStyles.subheading}>Overview</Text>
                  <Skeleton show={!property} colorMode="light" height={150}>
                    <Text style={globalStyles.standardText}>{property?.overview}</Text>
                  </Skeleton>
                </View>

                <View style={{ gap: 24 }}>
                  <Text style={globalStyles.subheading}>Facilities</Text>
                  <Skeleton
                    show={!property}
                    colorMode="light"
                    height={!property ? 150 : 0}
                    width="100%"
                  >
                    {property && (
                      <View style={{ gap: 8 }}>
                        {Array.from({ length: Math.ceil(property.facilities.length / 4) }).map(
                          (_, rowIndex) => (
                            <View key={rowIndex} style={{ flexDirection: "row", alignItems: "center" }}>
                              {property.facilities
                                .slice(rowIndex * 4, (rowIndex + 1) * 4)
                                .map((facility, colIndex) => {
                                  const spec = facilitiesSpec.find((f) => f.title === facility);
                                  return (
                                    <View
                                      key={colIndex}
                                      style={{
                                        flex: 1,
                                        maxWidth: "25%",
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
                                        {spec?.icon}
                                      </View>
                                      <Text style={{ fontSize: 12, color: "black" }}>
                                        {spec?.newTitle}
                                      </Text>
                                    </View>
                                  );
                                })}
                            </View>
                          )
                        )}
                      </View>
                    )}
                  </Skeleton>
                </View>

                <View style={{ gap: 12 }}>
                  <Text style={globalStyles.subheading}>Gallery</Text>
                  <Skeleton show={!property} colorMode="light" height={120}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      {property?.images.slice(0, 3).map((uri, index) => (
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
                          <Image source={{ uri }} style={{ flex: 1 }} />
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
                              <Text style={{ color: "white", fontWeight: "600", fontSize: 24 }}>
                                +{property.images.length - 2}
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </Skeleton>
                </View>

                <View style={{ gap: 12 }}>
                  <Text style={globalStyles.subheading}>Location</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Location size={18} color={themeColors.accentBlue} />
                    <Skeleton show={!property} colorMode="light" width={150}>
                      <Text style={globalStyles.smallTextBold}>{property?.address}</Text>
                    </Skeleton>
                  </View>
                  <Skeleton show={!property} colorMode="light">
                    {property && (
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
                        showsBuildings
                        mapType="standard"
                      >
                        <Marker
                          coordinate={{ latitude: property.lat, longitude: property.long }}
                          pinColor="#0061FF"
                        />
                      </MapView>
                    )}
                  </Skeleton>
                </View>

                {reviewCount > 0 && (
                  <View style={{ gap: 32 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Star1 size={18} color={themeColors.accentBlue} variant="Bold" />
                        <Text style={globalStyles.subheading}>
                          {property!.rating} ({reviewCount} review{reviewCount > 1 ? "s" : ""})
                        </Text>
                      </View>
                      <TouchableOpacity>
                        <Text style={globalStyles.seeAll}>See All</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ gap: 30 }}>
                      {property!.reviews.map((review) => (
                        <ReviewCard key={review.$id} review={review} />
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          {property && (
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
              }}
            >
              <View>
                <Text style={{ fontSize: 12, color: themeColors.gray, fontWeight: "700" }}>
                  PRICE
                </Text>
                <Text style={[globalStyles.price, { fontWeight: "700" }]}>${property.price}</Text>
              </View>
              <TouchableOpacity
                onPress={openBookingSheet}
                style={{
                  backgroundColor: themeColors.accentBlue,
                  paddingHorizontal: 50,
                  paddingVertical: 12,
                  borderRadius: 100,
                  boxShadow: "0px 5px 20px 5px rgba(48, 48, 48, 0.15)",
                }}
              >
                <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>Book Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {property && (
          <BookingBottomSheet property={property} sheetRef={bottomSheetRef} />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PropertyDetail;
