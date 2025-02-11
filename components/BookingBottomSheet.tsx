import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, Alert, Easing, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Thumb from "./RangeSliderComps/Thumb";
import Rail from "./RangeSliderComps/Rail";
import RailSelected from "./RangeSliderComps/RailSelected";
import Label from "./RangeSliderComps/Label";
import Notch from "./RangeSliderComps/Notch";
import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RnRangeSlider from "rn-range-slider";
import { MoneySend } from "iconsax-react-native";
import Counter from "./Counter";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { createBooking } from "@/appwrite/bookingActions";
import { getDaysDifference } from "@/utils/utils";
import { Property } from "@/types";

interface BookingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  from: Date;
  to: Date;
  property: string;
  user: string | undefined;
  price: number;
  days: number;
}

interface PaymentInfo {
  holder: string;
  expiry: string;
  cvc: string;
}

const BookingFields = ({
  bookingInfo,
  setBookingInfo,
}: {
  bookingInfo: BookingInfo;
  setBookingInfo: React.Dispatch<React.SetStateAction<BookingInfo>>;
}) => {
  const [datePicker, setDatePicker] = useState<"from" | "to">("from");

  return (
    <View style={{ gap: 30, paddingVertical: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "800" }}>Booking Information</Text>
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={[globalStyles.inputContainer, { flex: 1 }]}>
            <Text style={globalStyles.inputLabel}>First Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="John"
              value={bookingInfo.firstName}
              onChangeText={(val) => setBookingInfo((prev) => ({ ...prev, firstName: val }))}
            />
          </View>
          <View style={[globalStyles.inputContainer, { flex: 1 }]}>
            <Text style={globalStyles.inputLabel}>Last Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Doe"
              value={bookingInfo.lastName}
              onChangeText={(val) => setBookingInfo((prev) => ({ ...prev, lastName: val }))}
            />
          </View>
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>Email</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="johndoe@example.com"
            value={bookingInfo.email}
            onChangeText={(val) => setBookingInfo((prev) => ({ ...prev, email: val }))}
          />
        </View>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>Phone</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="+1 231 456 789"
            value={bookingInfo.phone}
            onChangeText={(val) => setBookingInfo((prev) => ({ ...prev, phone: val }))}
          />
        </View>
        <Counter
          title="Adults"
          value={bookingInfo.adults}
          min={1}
          onChange={(val) => setBookingInfo((prev) => ({ ...prev, adults: val }))}
        />
        <Counter
          title="Children"
          value={bookingInfo.children}
          onChange={(val) => setBookingInfo((prev) => ({ ...prev, children: val }))}
        />
        <View style={[globalStyles.inputContainer, { marginTop: 24 }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <TouchableOpacity
              onPress={() => setDatePicker("from")}
              style={datePicker === "from" ? globalStyles.selectedDateType : globalStyles.dateType}
            >
              <Text style={{ fontSize: 16 }}>From date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDatePicker("to")}
              style={datePicker === "to" ? globalStyles.selectedDateType : globalStyles.dateType}
            >
              <Text style={{ fontSize: 16 }}>To date</Text>
            </TouchableOpacity>
          </View>
          <RNDateTimePicker
            mode="date"
            display="inline"
            value={datePicker === "from" ? bookingInfo.from : bookingInfo.to}
            onChange={(event) => {
              const selected = new Date(event.nativeEvent.timestamp);
              if (datePicker === "from") {
                setBookingInfo((prev) => ({
                  ...prev,
                  from: selected,
                  days: getDaysDifference(selected, prev.to) ?? 0,
                }));
              } else {
                setBookingInfo((prev) => ({
                  ...prev,
                  to: selected,
                  days: getDaysDifference(prev.from, selected) ?? 0,
                }));
              }
            }}
            style={{ alignSelf: "center" }}
          />
          {bookingInfo.days > 0 && (
            <Text style={{ alignSelf: "flex-end", fontSize: 24, fontWeight: "700" }}>
              {bookingInfo.days} day{bookingInfo.days > 1 ? "s" : ""}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const PaymentFields = ({
  paymentInfo,
  bookingInfo,
  setPaymentInfo,
}: {
  paymentInfo: PaymentInfo;
  bookingInfo: BookingInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
}) => {
  const total =
    (bookingInfo.price * bookingInfo.adults +
      bookingInfo.price * bookingInfo.children * 0.9) *
    (bookingInfo.days > 0 ? bookingInfo.days : 1);

  return (
    <View style={{ gap: 30, paddingVertical: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "800" }}>Payment Information</Text>
      <View style={{ gap: 16 }}>
        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.inputLabel}>Card Holder</Text>
          <TextInput
            style={globalStyles.paymentInput}
            placeholder="John Doe"
            value={paymentInfo.holder}
            onChangeText={(val) => setPaymentInfo((prev) => ({ ...prev, holder: val }))}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={[globalStyles.inputContainer, { flex: 1 }]}>
            <Text style={globalStyles.inputLabel}>Expiry</Text>
            <TextInput
              style={globalStyles.paymentInput}
              placeholder="12/28"
              value={paymentInfo.expiry}
              onChangeText={(val) => setPaymentInfo((prev) => ({ ...prev, expiry: val }))}
            />
          </View>
          <View style={[globalStyles.inputContainer, { flex: 1 }]}>
            <Text style={globalStyles.inputLabel}>CVC</Text>
            <TextInput
              style={globalStyles.paymentInput}
              placeholder="123"
              value={paymentInfo.cvc}
              onChangeText={(val) => setPaymentInfo((prev) => ({ ...prev, cvc: val }))}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18 }}>Total</Text>
          <Text style={{ fontWeight: "700", fontSize: 24 }}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const BookingBottomSheet = ({
  sheetRef,
  property,
}: {
  sheetRef: React.RefObject<BottomSheet>;
  property: Property;
}) => {
  const { user } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["95%"], []);
  const opacity = useRef(new Animated.Value(1)).current;

  const [step, setStep] = useState(0);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    firstName: user?.name.split(" ")[0] ?? "",
    lastName: user?.name.split(" ")[1] ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    adults: 1,
    children: 0,
    from: new Date(),
    to: new Date(),
    property: property.$id,
    user: user?.$id,
    price: property.price,
    days: 0,
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    holder: "",
    expiry: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);

  const animateStepChange = (newStep: number) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setStep(newStep);
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePay = async () => {
    setLoading(true);
    const result = await createBooking({ ...bookingInfo, user: user?.$id ?? "" });
    if (result) {
      Alert.alert("Booking completed!", "The booking has been completed successfully.");
    } else {
      Alert.alert("Booking failed", "Please try again.");
    }
    setLoading(false);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      enableDynamicSizing={false}
      style={{
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderColor: themeColors.gray,
      }}
      enableHandlePanningGesture
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity }}>
              {step === 0 ? (
                <BookingFields bookingInfo={bookingInfo} setBookingInfo={setBookingInfo} />
              ) : (
                <PaymentFields
                  paymentInfo={paymentInfo}
                  bookingInfo={bookingInfo}
                  setPaymentInfo={setPaymentInfo}
                />
              )}
            </Animated.View>
          </ScrollView>
          <Animated.View style={{ opacity }}>
            {step === 0 ? (
              <TouchableOpacity
                onPress={() => animateStepChange(1)}
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
                <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
                  Let's pay!
                </Text>
                <MoneySend size={18} color="white" />
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <TouchableOpacity
                  onPress={() => animateStepChange(0)}
                  style={{
                    paddingHorizontal: 40,
                    backgroundColor: themeColors.lightGray,
                    borderRadius: 100,
                    paddingVertical: 12,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: themeColors.gray, fontWeight: "700", fontSize: 18 }}>
                    Back
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handlePay}
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
                  <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
                    {loading ? "Paying..." : "Pay"}
                  </Text>
                  <MoneySend size={18} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BookingBottomSheet;
