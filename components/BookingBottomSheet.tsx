import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Thumb from "./RangeSliderComps/Thumb";
import Rail from "./RangeSliderComps/Rail";
import RailSelected from "./RangeSliderComps/RailSelected";
import Label from "./RangeSliderComps/Label";
import Notch from "./RangeSliderComps/Notch";
import { themeColors } from "@/constants/Colors";
import {
  Animated,
  Easing,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RnRangeSlider from "rn-range-slider";
import {
  Money,
  Money3,
  Money4,
  MoneyAdd,
  MoneySend,
  MoneyTick,
  Paypal,
} from "iconsax-react-native";
import Counter from "./Counter";
import { useLocalSearchParams } from "expo-router";

const PaymentFields = () => {
  return (
    <View style={{ gap: 30, paddingVertical: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 800,
        }}
      >
        Payment Information
      </Text>
      <View style={{ gap: 16 }}>
        <View style={[globalStyles.inputContainer, { flex: 1 }]}>
          <Text style={globalStyles.inputLabel}>Card Holder</Text>
          <TextInput
            style={globalStyles.paymentInput}
            placeholder="John Doe"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={[globalStyles.inputContainer, { flex: 1 }]}>
            <Text style={globalStyles.inputLabel}>Expiry</Text>
            <TextInput
              style={globalStyles.paymentInput}
              placeholder="12/28"
            />
          </View>
          <View style={[globalStyles.inputContainer, { flex: 1 }]}>
            <Text style={globalStyles.inputLabel}>CVC</Text>
            <TextInput
              style={globalStyles.paymentInput}
              placeholder="123"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const BookingFields = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [datePicker, setDatePicker] = useState("from");
  const [bookingInfo, setBookingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    adults: adults,
    children: children,
    fromDate: new Date(),
    toDate: new Date(),
  });
  return (
    <View style={{ gap: 30, paddingVertical: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 800,
        }}
      >
        Booking Information
      </Text>
      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={[globalStyles.inputContainer, { flex: 1 }]}>
            <Text style={globalStyles.inputLabel}>First Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="John"
            />
          </View>
          <View style={[globalStyles.inputContainer, { flex: 1 }]}>
            <Text style={globalStyles.inputLabel}>Last Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Doe"
            />
          </View>
        </View>
        <View style={[globalStyles.inputContainer, { flex: 1 }]}>
          <Text style={globalStyles.inputLabel}>Email</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="johndoe@example.com"
          />
        </View>
        <View style={[globalStyles.inputContainer, { flex: 1 }]}>
          <Text style={globalStyles.inputLabel}>Phone</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="+1 231 456 789"
          />
        </View>
        <Counter
          title={"Adults"}
          value={adults}
          setValue={setAdults}
        />
        <Counter
          title={"Children"}
          value={children}
          setValue={setChildren}
        />
        <View style={[globalStyles.inputContainer, { marginTop: 24 }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => setDatePicker("from")}
              style={
                datePicker === "from"
                  ? globalStyles.selectedDateType
                  : globalStyles.dateType
              }
            >
              <Text style={{ fontSize: 16 }}>From date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDatePicker("to")}
              style={
                datePicker === "to"
                  ? globalStyles.selectedDateType
                  : globalStyles.dateType
              }
            >
              <Text style={{ fontSize: 16 }}>To date</Text>
            </TouchableOpacity>
          </View>
          <RNDateTimePicker
            mode="date"
            display="inline"
            value={
              datePicker === "from" ? bookingInfo.fromDate : bookingInfo.toDate
            }
            onChange={(val) => {
              if (datePicker === "from") {
                setBookingInfo((prev) => ({
                  ...prev,
                  fromDate: new Date(val.nativeEvent.timestamp),
                }));
              } else {
                setBookingInfo((prev) => ({
                  ...prev,
                  toDate: new Date(val.nativeEvent.timestamp),
                }));
              }
            }}
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
    </View>
  );
};

const NextButton = ({ setStep }: { setStep: Function }) => {
  return (
    <TouchableOpacity
      onPress={() => setStep(1)}
      style={{
        backgroundColor: themeColors.accentBlue,
        borderRadius: 100,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: 18,
        }}
      >
        Let's pay!
      </Text>
      <MoneySend
        size={18}
        color="white"
      />
    </TouchableOpacity>
  );
};

const PaymentButtons = ({ setStep }: { setStep: Function }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <TouchableOpacity
        onPress={() => setStep(0)}
        style={{
          paddingHorizontal: 40,
          backgroundColor: themeColors.lightGray,
          borderRadius: 100,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: themeColors.gray,
            fontWeight: "700",
            fontSize: 18,
          }}
        >
          Back
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: themeColors.accentBlue,
          borderRadius: 100,
          paddingVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 18,
          }}
        >
          Pay
        </Text>
        <MoneySend
          size={18}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const BookingBottomSheet = ({
  sheetRef,
}: {
  sheetRef: React.RefObject<BottomSheet>;
}) => {
  const [step, setStep] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  const snapPoints = useMemo(() => ["95%"], []);

  // Function to animate fade transition
  const animateStepChange = (newStep: number) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setStep(newStep); // Change step AFTER fade out completes
      opacity.setValue(0); // Ensure opacity is 0 before fading in

      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  // useEffect(() => {
  //   animateStepChange();
  // }, [step]);

  const insets = useSafeAreaInsets();

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      style={{
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderColor: themeColors.gray,
      }}
      enableHandlePanningGesture={true}
      enableContentPanningGesture={false}
    >
      <BottomSheetView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingBottom: insets.bottom,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={{ opacity }}>
              {step === 0 ? <BookingFields /> : <PaymentFields />}
            </Animated.View>
          </ScrollView>
          <Animated.View style={{ opacity }}>
            {step === 0 ? (
              <NextButton setStep={animateStepChange} />
            ) : (
              <PaymentButtons setStep={animateStepChange} />
            )}
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BookingBottomSheet;
