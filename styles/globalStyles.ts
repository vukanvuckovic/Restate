import { themeColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: themeColors.lightGray,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  paymentInput: {
    borderBottomWidth: 1,
    borderColor: themeColors.lightGray,
    height: 40,
    paddingHorizontal: 4,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: "#212121",
    marginLeft: 4,
  },
  inputContainer: {
    gap: 4,
  },
  counterButton: {
    height: 28,
    width: 28,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.lightBlue,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "600",
  },
  agentName: {
    fontSize: 18,
    fontWeight: "600",
  },
  standardText: {
    fontSize: 16,
    fontWeight: "400",
    color: themeColors.standardText,
  },
  smallText: {
    fontSize: 14,
    fontWeight: "400",
  },
  smallTextGray: {
    fontSize: 14,
    fontWeight: "400",
    color: themeColors.smallTextGray,
  },
  smallTextBold: {
    fontSize: 14,
    fontWeight: "500",
  },
  priceSubheading: {
    fontSize: 12,
    fontWeight: "500",
    color: themeColors.standardText,
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: themeColors.accentBlue,
  },
  propertyType: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    color: themeColors.accentBlue,
  },
  homeHeading: {
    fontWeight: "600",
    fontSize: 20,
  },
  seeAll: {
    fontWeight: "600",
    fontSize: 16,
    color: themeColors.accentBlue,
  },
  featuredHeading: {
    fontWeight: "700",
    fontSize: 20,
    color: "#fff",
  },
  featuredSubheading: {
    fontWeight: "400",
    fontSize: 16,
    color: "#fff",
  },
  featuredRating: {
    fontWeight: "600",
    fontSize: 12,
    color: themeColors.accentBlue,
  },
  profileHello: {
    fontSize: 12,
    fontWeight: "400",
    color: themeColors.smallTextGray,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "500",
  },
  categoryButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: themeColors.lightBlueBorder,
    backgroundColor: themeColors.lightBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  categorySelectedButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: themeColors.accentBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  cardDesc: {
    fontWeight: "400",
    fontSize: 12,
    color: themeColors.smallTextGray,
  },
  cardPrice: {
    fontWeight: "600",
    fontSize: 16,
    color: themeColors.accentBlue,
  },
  menuLink: {
    fontWeight: "500",
    fontSize: 18,
  },
  barHeading: {
    fontSize: 20,
    fontWeight: "500",
  },
  dateType: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  selectedDateType: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});
