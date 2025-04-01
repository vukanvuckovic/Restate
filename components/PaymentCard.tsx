import { globalStyles } from "@/styles/globalStyles";
import {
  Calendar,
  Call,
  Check,
  Money2,
  Profile,
  Signpost,
  Star1,
  TickCircle,
} from "iconsax-react-native";
import React from "react";
import { Text, View } from "react-native";

const PaymentCard = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: "white",
        boxShadow: "0p 4px 20px 0px rgba(0,0,0,.05)",
        gap: 32,
      }}
    >
      <View style={{ gap: 4 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={globalStyles.heading}>Lorem, ipsum dolor.</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Star1
              size={16}
              color="#FB9400"
              variant="Bold"
            />
            <Text style={globalStyles.featuredRating}>4.5</Text>
          </View>
        </View>
        <Text style={globalStyles.smallTextGray}>Beijing, China</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={globalStyles.subheading}>Dates</Text>
          <View style={{ gap: 4 }}>
            <Text style={globalStyles.smallText}>From 21.11.2025.</Text>
            <Text style={globalStyles.smallText}>To 25.11.2025.</Text>
          </View>
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={globalStyles.subheading}>People</Text>
          <View style={{ gap: 4 }}>
            <Text style={globalStyles.smallText}>3 Adults</Text>
            <Text style={globalStyles.smallText}>2 Children</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, gap: 12 }}>
        <Text style={globalStyles.subheading}>Payment information</Text>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Profile
              size={16}
              color="black"
            />
            <Text style={globalStyles.smallText}>Vukan Vuckovic</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Calendar
              size={16}
              color="black"
            />
            <Text style={globalStyles.smallText}>
              Transaction completed on 21.12.2025.
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[globalStyles.subheading, { color: "green", fontWeight: 400 }]}
        >
          Paid
        </Text>

        <Text style={[globalStyles.heading, { color: "green" }]}>$1200.24</Text>
      </View>
    </View>
  );
};

export default PaymentCard;
