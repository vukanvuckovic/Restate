import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Counter = ({
  title,
  value,
  setValue,
}: {
  title: string;
  value: number;
  setValue: Function;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            setValue((prev: number) =>
              (title === "Adults" ? prev > 1 : prev > 0) ? prev - 1 : prev
            )
          }
          style={globalStyles.counterButton}
        >
          <Text
            style={{
              fontSize: 18,
              color: themeColors.accentBlue,
              fontWeight: 500,
            }}
          >
            -
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>{value}</Text>
        <TouchableOpacity
          onPress={() =>
            setValue((prev: number) => (prev < 10 ? prev + 1 : prev))
          }
          style={globalStyles.counterButton}
        >
          <Text
            style={{
              fontSize: 18,
              color: themeColors.accentBlue,
              fontWeight: 500,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;
