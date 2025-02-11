import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CounterProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const Counter = ({ title, value, onChange, min = 0, max = 10 }: CounterProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity
          onPress={() => value > min && onChange(value - 1)}
          style={globalStyles.counterButton}
        >
          <Text style={{ fontSize: 18, color: themeColors.accentBlue, fontWeight: "500" }}>
            -
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>{value}</Text>
        <TouchableOpacity
          onPress={() => value < max && onChange(value + 1)}
          style={globalStyles.counterButton}
        >
          <Text style={{ fontSize: 18, color: themeColors.accentBlue, fontWeight: "500" }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;
