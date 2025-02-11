import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Thumb from "./RangeSliderComps/Thumb";
import Rail from "./RangeSliderComps/Rail";
import RailSelected from "./RangeSliderComps/RailSelected";
import Label from "./RangeSliderComps/Label";
import Notch from "./RangeSliderComps/Notch";
import { themeColors } from "@/constants/Colors";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RnRangeSlider from "rn-range-slider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { propertyTypes } from "@/constants/data";

const FilterBottomSheet = ({
  sheetRef,
}: {
  sheetRef: React.RefObject<BottomSheet>;
}) => {
  const initialFilters = {
    priceFrom: "0",
    priceTo: "10000",
    propertyType: "all",
    adults: "1",
    children: "1",
    fromDate: new Date().getTime(),
    toDate: new Date().getTime(),
    areaFrom: "0",
    areaTo: "0",
  };

  const {
    priceFrom = initialFilters.priceFrom,
    priceTo = initialFilters.priceTo,
    propertyType = initialFilters.propertyType,
    adults = initialFilters.adults,
    children = initialFilters.children,
    fromDate = initialFilters.fromDate,
    toDate = initialFilters.toDate,
    areaFrom = initialFilters.areaFrom,
    areaTo = initialFilters.areaTo,
  } = useLocalSearchParams();

  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [datePicker, setDatePicker] = useState("from");

  const snapPoints = useMemo(() => ["100%"], []);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={value} />,
    []
  );
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low: number, high: number) => {
    router.setParams({
      priceFrom: low.toString(),
      priceTo: high.toString(),
    });
  }, []);
  const handleAreaValueChange = useCallback((low: number, high: number) => {
    router.setParams({
      areaFrom: low.toString(),
      areaTo: high.toString(),
    });
  }, []);

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
          paddingBottom: 0,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flex: 1, paddingBottom: 12 }}>
          <ScrollView
            scrollEnabled={!isDragging}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: 40, paddingVertical: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  Filters
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    router.setParams(initialFilters);
                  }}
                >
                  <Text style={{ color: themeColors.accentBlue }}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  Price range (${priceFrom ?? initialFilters.priceFrom} - $
                  {priceTo ?? initialFilters.priceTo})
                </Text>
                <RnRangeSlider
                  style={{
                    width: "100%",
                  }}
                  min={0}
                  max={1000}
                  step={10}
                  floatingLabel
                  renderThumb={renderThumb}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}
                  onValueChanged={handleValueChange}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                />
              </View>
              <View style={{ gap: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  Property type
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {propertyTypes.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        router.setParams({ propertyType: item.value });
                      }}
                      key={index}
                      style={
                        propertyType === item.value
                          ? globalStyles.categorySelectedButton
                          : globalStyles.categoryButton
                      }
                    >
                      <Text
                        style={
                          propertyType === item.value && {
                            color: "white",
                            fontWeight: 600,
                          }
                        }
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={{ gap: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  Area ({areaFrom ?? initialFilters.areaFrom}sqft -{" "}
                  {areaTo ?? initialFilters.priceTo}sqft)
                </Text>
                <RnRangeSlider
                  style={{
                    width: "100%",
                  }}
                  min={0}
                  max={2000}
                  step={10}
                  floatingLabel
                  renderThumb={renderThumb}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}
                  onValueChanged={handleAreaValueChange}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                />
              </View>
              <View style={{ gap: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>People</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>Adults</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        router.setParams({
                          adults: adults
                            ? Number(adults) > 1
                              ? Number(adults) - 1
                              : adults
                            : Number(initialFilters.adults) > 0
                            ? Number(initialFilters.adults) - 1
                            : Number(initialFilters.adults),
                        })
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
                    <Text style={{ fontSize: 14, fontWeight: 600 }}>
                      {adults ?? initialFilters.adults}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        router.setParams({
                          adults: adults
                            ? Number(adults) < 10
                              ? Number(adults) + 1
                              : Number(adults)
                            : Number(initialFilters.adults) < 10
                            ? Number(initialFilters.adults) + 1
                            : Number(initialFilters.adults),
                        });
                      }}
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>Children</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        router.setParams({
                          children: children
                            ? Number(children) > 0
                              ? Number(children) - 1
                              : Number(children)
                            : Number(initialFilters.children) > 0
                            ? Number(initialFilters.children) - 1
                            : Number(initialFilters.children),
                        });
                      }}
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
                    <Text style={{ fontSize: 14, fontWeight: 600 }}>
                      {children ?? initialFilters.children}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        router.setParams({
                          children: children
                            ? Number(children) < 10
                              ? Number(children) + 1
                              : Number(children)
                            : Number(initialFilters.children) < 10
                            ? Number(initialFilters.children) + 1
                            : Number(initialFilters.children),
                        });
                      }}
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
              </View>
              <View>
                <View style={globalStyles.inputContainer}>
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
                      datePicker === "from"
                        ? new Date(Number(fromDate ?? initialFilters.fromDate))
                        : new Date(Number(toDate ?? initialFilters.toDate))
                    }
                    onChange={(val) => {
                      if (datePicker === "from") {
                        router.setParams({
                          fromDate: val.nativeEvent.timestamp.toString(),
                        });
                      } else {
                        router.setParams({
                          toDate: val.nativeEvent.timestamp.toString(),
                        });
                      }
                    }}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{
              backgroundColor: themeColors.accentBlue,
              borderRadius: 100,
              paddingVertical: 12,
              flexDirection: "row",
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
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterBottomSheet;
