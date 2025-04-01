import TopBar from "@/components/TopBar";
import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import { ArrowRight2, Call, Microphone2, Signpost } from "iconsax-react-native";
import React from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HelpCenter = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TopBar title="Help Center" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, gap: 20, paddingHorizontal: 16, paddingTop: 12 }}
          >
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                gap: 12,
                paddingVertical: 30,
              }}
            >
              <View
                style={{
                  padding: 20,
                  aspectRatio: 1,
                  borderRadius: 200,
                  backgroundColor: themeColors.lightBlue,
                  borderWidth: 2,
                  borderColor: themeColors.lightBlueBorder,
                }}
              >
                <Microphone2
                  size={44}
                  color={themeColors.accentBlue}
                />
              </View>

              <Text
                style={[
                  globalStyles.standardText,
                  { textAlign: "center", maxWidth: 300 },
                ]}
              >
                Feel free to ask for help, and we'll get back to you in no time.
              </Text>
            </View>
            <TouchableOpacity
              //@ts-ignore
              onPress={() =>
                Linking.openURL("mailto:vukanvuckovic05@gmail.com")
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Signpost
                  size={20}
                  color="black"
                />
                <Text style={globalStyles.menuLink}>contact@gmail.com</Text>
              </View>
              <ArrowRight2
                size={16}
                color={"#212121"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              //@ts-ignore
              onPress={() => Linking.openURL("tel:+1123123123")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Call
                  size={20}
                  color="black"
                />
                <Text style={globalStyles.menuLink}>+1 234 123 123</Text>
              </View>
              <ArrowRight2
                size={16}
                color={"#212121"}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default HelpCenter;
