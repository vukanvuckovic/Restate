import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { HeartTick } from "iconsax-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const HomeFlatlistCard = ({ property }: { property: any }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/property/${property.$id}`)}
      style={{
        flex: 1,
        gap: 6,
        padding: 8,
        borderRadius: 12,
        boxShadow: "0px 4px 30px 0px rgba(0,0,0,.05)",
      }}
    >
      <Image
        source={{ uri: property.images[0] }}
        style={{
          height: 150,
          width: "100%",
          borderRadius: 4,
          objectFit: "cover",
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          gap: 12,
          padding: 4,
        }}
      >
        <View>
          <Text style={globalStyles.cardTitle}>{property.name}</Text>
          <Text style={globalStyles.cardDesc}>
            {property.country}, {property.city}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text style={globalStyles.cardPrice}>${property.price}</Text>
          <TouchableOpacity>
            <HeartTick
              size={16}
              color={"gray"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeFlatlistCard;
