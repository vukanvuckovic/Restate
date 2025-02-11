import { Review } from "@/types";
import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import { getElapsedTime } from "@/utils/utils";
import { Heart, Star1 } from "iconsax-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ReviewCard = ({ review }: { review: Review }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
              backgroundColor: themeColors.lightBlue,
              borderWidth: 2,
              borderColor: themeColors.lightBlueBorder,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", color: themeColors.accentBlue }}>
              {review.name[0]}
            </Text>
          </View>
          <Text style={globalStyles.agentName}>{review.name}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={globalStyles.smallTextGray}>{review.rating}</Text>
          <Star1 size={16} color="#FB9400" variant="Bold" />
        </View>
      </View>
      <Text style={globalStyles.standardText}>{review.review}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <TouchableOpacity onPress={() => setLiked((prev) => !prev)}>
            <Heart
              size={16}
              color={liked ? "#FB9400" : themeColors.accentBlue}
              variant={liked ? "Bold" : "Linear"}
            />
          </TouchableOpacity>
          <Text style={globalStyles.smallTextBold}>
            {liked ? review.likes + 1 : review.likes}
          </Text>
        </View>
        <Text style={globalStyles.smallTextGray}>{getElapsedTime(review.$createdAt)}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
