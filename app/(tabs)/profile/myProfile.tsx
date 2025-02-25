import { updateUser } from "@/appwrite/userActions";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import TopBar from "@/components/TopBar";
import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

const MyProfile = () => {
  const { user, setUser } = useGlobalContext();
  const [saving, setSaving] = useState(false);

  const initialState = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  };

  const [userInfo, setUserInfo] = useState(initialState);

  const hasChanges =
    userInfo.name !== initialState.name ||
    userInfo.email !== initialState.email ||
    userInfo.phone !== initialState.phone;

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const updated = await updateUser(userInfo, user.$id);
    if (updated) {
      setUser(updated);
      Alert.alert("Info updated!", "Your info has been updated.");
    } else {
      Alert.alert("Update failed.", "Please try again.");
    }
    setSaving(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <TopBar title="My Profile" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 12 }}>
          <View style={{ flex: 1, gap: 20 }}>
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.inputLabel}>Name</Text>
              <TextInput
                placeholder="John"
                style={[globalStyles.input, { backgroundColor: "#fff" }]}
                value={userInfo.name}
                onChangeText={(val) => setUserInfo((prev) => ({ ...prev, name: val }))}
              />
            </View>
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.inputLabel}>Email</Text>
              <TextInput
                placeholder="johndoe@example.com"
                style={[globalStyles.input, { backgroundColor: "#fff" }]}
                value={userInfo.email}
                onChangeText={(val) => setUserInfo((prev) => ({ ...prev, email: val }))}
              />
            </View>
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.inputLabel}>Phone</Text>
              <TextInput
                placeholder="+1 123 234 543"
                style={[globalStyles.input, { backgroundColor: "#fff" }]}
                value={userInfo.phone}
                onChangeText={(val) => setUserInfo((prev) => ({ ...prev, phone: val }))}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!hasChanges}
            style={{
              height: 40,
              backgroundColor: themeColors.accentBlue,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              opacity: hasChanges ? 1 : 0.7,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 18, color: "white" }}>
              {saving ? "Saving changes..." : "Save changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MyProfile;
