import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { Heart, Star, Star1 } from "iconsax-react-native";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const FeaturedCard = ({ property }: { property: any }) => {
  const router = useRouter();
  console.log("property-image", property.images[0]);
  return (
    <TouchableOpacity onPress={() => router.push(`/property/${property.$id}`)}>
      <ImageBackground
        source={{ uri: property.images[0] }} // Ensure property.image is a valid URL
        resizeMode="cover"
        style={{
          height: 300,
          width: 220,
          padding: 12,
          borderRadius: 16,
          overflow: "hidden",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 100,
            backgroundColor: "rgba(255,255,255,.7)",
          }}
        >
          <Star1
            size={14}
            color="#FB9400"
            variant="Bold"
          />
          <Text style={globalStyles.featuredRating}>4.5</Text>
        </View>
        <View style={{ gap: 6 }}>
          <Text style={globalStyles.featuredHeading}>{property.name}</Text>
          <Text style={globalStyles.featuredSubheading}>
            {property.city}, {property.country}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={globalStyles.featuredHeading}>${property.price}</Text>
            <Heart
              size={18}
              color="white"
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
