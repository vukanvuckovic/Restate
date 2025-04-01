import TopBar from "@/components/TopBar";
import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const myProfile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopBar title="My Profile" />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 12 }}>
          <View style={{ flex: 1, gap: 20 }}>
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.inputLabel}>First Name</Text>
              <TextInput
                placeholder="John"
                style={globalStyles.input}
              />
            </View>
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.inputLabel}>Last Name</Text>
              <TextInput
                placeholder="Doe"
                style={globalStyles.input}
              />
            </View>
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.inputLabel}>Email</Text>
              <TextInput
                placeholder="johndoe@example.com"
                style={globalStyles.input}
              />
            </View>
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.inputLabel}>Phone</Text>
              <TextInput
                placeholder="+1 123 234 543"
                style={globalStyles.input}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: themeColors.accentBlue,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 18, color: "white" }}>
              Save changes
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default myProfile;
