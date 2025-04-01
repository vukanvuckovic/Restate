import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import { Heart, Star1 } from "iconsax-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              height: 44,
              width: 44,
              borderRadius: 100,
              backgroundColor: "gray",
            }}
          />
          <Text style={globalStyles.agentName}>{review.name}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={globalStyles.smallTextGray}>{review.rating}</Text>
          <Star1
            size={16}
            color="#FB9400"
            variant="Bold"
          />
        </View>
      </View>
      <Text style={globalStyles.standardText}>{review.review}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <TouchableOpacity>
            <Heart
              size={16}
              color={themeColors.accentBlue}
            />
          </TouchableOpacity>
          <Text style={globalStyles.smallTextBold}>{review.likes}</Text>
        </View>
        <Text style={globalStyles.smallTextGray}>6 days ago</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
