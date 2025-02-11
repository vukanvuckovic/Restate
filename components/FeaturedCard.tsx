import { Property } from "@/types";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { Heart, Star1 } from "iconsax-react-native";
import React from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

const FeaturedCard = ({ property }: { property: Property }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{ position: "relative", overflow: "hidden" }}
      onPress={() => router.push(`/property/${property.$id}`)}
    >
      <ImageBackground
        source={{ uri: property.images[0] }}
        resizeMode="cover"
        style={{
          height: 300,
          width: 220,
          borderRadius: 16,
          overflow: "hidden",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("@/assets/images/black-gradient.png")}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <View
          style={{
            alignSelf: "flex-end",
            margin: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 100,
            backgroundColor: "rgba(255,255,255,.7)",
          }}
        >
          <Star1 size={14} color="#FB9400" variant="Bold" />
          <Text style={globalStyles.featuredRating}>
            {property.rating > 0 ? property.rating : 4.2}
          </Text>
        </View>
        <View style={{ gap: 6, padding: 14 }}>
          <Text style={globalStyles.featuredHeading}>{property.name}</Text>
          <Text style={globalStyles.featuredSubheading}>
            {property.city}, {property.country}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <Text style={globalStyles.featuredHeading}>${property.price}</Text>
            <Heart size={18} color="white" />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
