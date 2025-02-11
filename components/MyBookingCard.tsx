import { Booking } from "@/types";
import { globalStyles } from "@/styles/globalStyles";
import { formatDate } from "@/utils/utils";
import { Call, Signpost, Star1 } from "iconsax-react-native";
import React from "react";
import { Text, View } from "react-native";

const MyBookingCard = ({ booking }: { booking: Booking }) => {
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={globalStyles.heading}>{booking.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Star1 size={16} color="#FB9400" variant="Bold" />
            <Text style={globalStyles.featuredRating}>{booking.property.rating}</Text>
          </View>
        </View>
        <Text style={globalStyles.smallTextGray}>
          {booking.property.city}, {booking.property.country}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={globalStyles.subheading}>Dates</Text>
          <View style={{ gap: 4 }}>
            <Text style={globalStyles.smallText}>From {formatDate(booking.from)}</Text>
            <Text style={globalStyles.smallText}>To {formatDate(booking.to)}</Text>
          </View>
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={globalStyles.subheading}>People</Text>
          <View style={{ gap: 4 }}>
            <Text style={globalStyles.smallText}>
              {booking.adults} Adult{booking.adults > 1 ? "s" : ""}
            </Text>
            {booking.children > 0 && (
              <Text style={globalStyles.smallText}>{booking.children} Children</Text>
            )}
          </View>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={globalStyles.subheading}>Contact information</Text>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Call size={16} color="black" />
            <Text style={globalStyles.smallText}>{booking.phone}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Signpost size={16} color="black" />
            <Text style={globalStyles.smallText}>{booking.email}</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[globalStyles.subheading, { color: "#212121", fontWeight: "400" }]}>
          Total
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>{booking.days} days</Text>
          <Text style={globalStyles.heading}>${booking.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyBookingCard;
