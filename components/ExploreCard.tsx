import { Property } from "@/types";
import { themeColors } from "@/constants/Colors";
import { propertyAttributes } from "@/constants/data";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { Heart } from "iconsax-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ExploreCard = ({ property }: { property: Property }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/property/${property.$id}`)}
      style={{
        flexDirection: "row",
        height: 140,
        borderRadius: 12,
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,.05)",
        padding: 8,
        gap: 8,
      }}
    >
      <Image
        source={{ uri: property.images[0] }}
        style={{ aspectRatio: 1, borderRadius: 4 }}
      />
      <View style={{ flex: 1, flexDirection: "row", padding: 4, gap: 10 }}>
        <View style={{ gap: 10, flex: 1, justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{property.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {propertyAttributes.map((attr, index) => (
              <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: themeColors.lightBlue,
                  }}
                >
                  {attr.smallIcon}
                </View>
                <Text style={{ fontSize: 14, color: "#212121" }}>
                  {property[attr.name.toLowerCase() as keyof Property] as string}
                </Text>
              </View>
            ))}
          </View>
          <Text style={globalStyles.smallTextGray}>
            {property.city}, {property.country}
          </Text>
        </View>
        <View style={{ flexShrink: 0, alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
          <TouchableOpacity style={{ flexShrink: 0 }}>
            <Heart size={16} color={themeColors.gray} />
          </TouchableOpacity>
          <Text style={globalStyles.cardPrice}>${property.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExploreCard;
