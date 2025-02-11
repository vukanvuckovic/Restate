import { Booking } from "@/types";
import { globalStyles } from "@/styles/globalStyles";
import { formatDate } from "@/utils/utils";
import { Calendar, Profile, Star1 } from "iconsax-react-native";
import React from "react";
import { Text, View } from "react-native";

const PaymentCard = ({ payment }: { payment: Booking }) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: "white",
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,.05)",
        gap: 32,
      }}
    >
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>{payment.$id}</Text>
          {payment.property.rating > 0 && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Star1 size={16} color="#FB9400" variant="Bold" />
              <Text style={globalStyles.featuredRating}>{payment.property.rating}</Text>
            </View>
          )}
        </View>
        <Text style={globalStyles.smallTextGray}>
          {payment.property.city}, {payment.property.country}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={globalStyles.subheading}>Dates</Text>
          <View style={{ gap: 4 }}>
            <Text style={globalStyles.smallText}>From {formatDate(payment.from)}</Text>
            <Text style={globalStyles.smallText}>To {formatDate(payment.to)}</Text>
          </View>
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={globalStyles.subheading}>People</Text>
          <View style={{ gap: 4 }}>
            <Text style={globalStyles.smallText}>
              {payment.adults} Adult{payment.adults > 1 ? "s" : ""}
            </Text>
            {payment.children > 0 && (
              <Text style={globalStyles.smallText}>{payment.children} Children</Text>
            )}
          </View>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={globalStyles.subheading}>Payment information</Text>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Profile size={16} color="black" />
            <Text style={globalStyles.smallText}>{payment.name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Calendar size={16} color="black" />
            <Text style={globalStyles.smallText}>
              Transaction completed on {formatDate(payment.$createdAt)}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[globalStyles.subheading, { color: "green", fontWeight: "400" }]}>Paid</Text>
        <Text style={[globalStyles.heading, { color: "green" }]}>
          ${payment.price.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default PaymentCard;
