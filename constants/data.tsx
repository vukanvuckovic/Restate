import {
  ArrangeVerticalSquare,
  Calendar,
  Drop,
  LanguageCircle,
  LanguageSquare,
  Money2,
  People,
  Profile,
} from "iconsax-react-native";
import { Image } from "react-native";
import { themeColors } from "./Colors";

export const profileMenuLinks = [
  {
    title: "My Bookings",
    link: "/profile/myBookings",
    icon: (
      <Calendar
        size={24}
        color="black"
      />
    ),
  },
  {
    title: "Payments",
    link: "/profile/payments",
    icon: (
      <Money2
        size={24}
        color="black"
      />
    ),
  },
  {
    title: "My Profile",
    link: "/profile/myProfile",
    icon: (
      <Profile
        size={24}
        color="black"
      />
    ),
  },
  {
    title: "Language",
    link: "/profile/language",
    icon: (
      <LanguageSquare
        size={24}
        color="black"
      />
    ),
  },
  {
    title: "Help Center",
    link: "/profile/helpCenter",
    icon: (
      <Profile
        size={24}
        color="black"
      />
    ),
  },
  {
    title: "Invite Friends",
    link: "/profile",
    icon: (
      <People
        size={24}
        color="black"
      />
    ),
  },
];

export const propertyAttributes = [
  {
    name: "Beds",
    icon: (
      <Profile
        size={18}
        color={themeColors.accentBlue}
      />
    ),
    smallIcon: (
      <Profile
        size={14}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    name: "Bathrooms",
    icon: (
      <Drop
        size={18}
        color={themeColors.accentBlue}
      />
    ),
    smallIcon: (
      <Drop
        size={14}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    name: "Area",
    icon: (
      <ArrangeVerticalSquare
        size={18}
        color={themeColors.accentBlue}
      />
    ),
    smallIcon: (
      <ArrangeVerticalSquare
        size={14}
        color={themeColors.accentBlue}
      />
    ),
  },
];

export const languages = [
  {
    language: "Serbian",
    icon: (
      <Image
        source={require("@/assets/flags/srb.png")}
        style={{ height: 32, width: 32, objectFit: "contain" }}
      />
    ),
  },
  {
    language: "English",
    icon: (
      <Image
        source={require("@/assets/flags/us.png")}
        style={{ height: 32, width: 32, objectFit: "contain" }}
      />
    ),
  },
  {
    language: "Russian",
    icon: (
      <Image
        source={require("@/assets/flags/rus.png")}
        style={{ height: 32, width: 32, objectFit: "contain" }}
      />
    ),
  },
  {
    language: "French",
    icon: (
      <Image
        source={require("@/assets/flags/fr.png")}
        style={{ height: 32, width: 32, objectFit: "contain" }}
      />
    ),
  },
];

export const propertyTypes = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Apartment",
    value: "apartment",
  },
  {
    name: "House",
    value: "house",
  },
  {
    name: "Villa",
    value: "villa",
  },
  {
    name: "Duplex",
    value: "duplex",
  },
  {
    name: "Penthouse",
    value: "penthouse",
  },
  {
    name: "Beachfront",
    value: "beachfront",
  },
  {
    name: "Mansion",
    value: "mansion",
  },
];
