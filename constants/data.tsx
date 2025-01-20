import {
  ArrangeVerticalSquare,
  Calendar,
  Car,
  Coffee,
  Dribbble,
  Drop,
  LanguageCircle,
  LanguageSquare,
  Money2,
  People,
  Pet,
  Profile,
  Weight,
  Wifi,
  Wind2,
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

export const propertyImages = [
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/31391068/pexels-photo-31391068/free-photo-of-contemporary-bathroom-interior-with-modern-design.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/31391066/pexels-photo-31391066/free-photo-of-cozy-living-room-with-fireplace-and-bookshelves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/31391064/pexels-photo-31391064/free-photo-of-modern-kitchen-interior-with-dining-area.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/31376761/pexels-photo-31376761/free-photo-of-spacious-rustic-interior-with-exposed-wood-and-stone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/783745/pexels-photo-783745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/31267713/pexels-photo-31267713/free-photo-of-cozy-modern-bedroom-with-elegant-decor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/31267712/pexels-photo-31267712/free-photo-of-modern-cozy-bedroom-interior-design.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/31267709/pexels-photo-31267709/free-photo-of-modern-kitchen-interior-with-dark-cabinets.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/27683986/pexels-photo-27683986/free-photo-of-a-house-with-a-garden-and-a-fence.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/10430976/pexels-photo-10430976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/9137769/pexels-photo-9137769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/20434021/pexels-photo-20434021/free-photo-of-view-of-houses-at-thomas-harriotlaan-hoofddorp-the-netherlands.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

export const facilitiesSpec = [
  {
    title: "carParking",
    newTitle: "Car Parking",
    icon: (
      <Car
        size={22}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    title: "swimmingPool",
    newTitle: "Pool",
    icon: (
      <Wind2
        size={22}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    title: "gym",
    newTitle: "Gym",
    icon: (
      <Weight
        size={22}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    title: "restaurant",
    newTitle: "Restaurant",
    icon: (
      <Coffee
        size={22}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    title: "wifi",
    newTitle: "Wi-fi",
    icon: (
      <Wifi
        size={22}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    title: "petCenter",
    newTitle: "Pet Center",
    icon: (
      <Pet
        size={22}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    title: "sportCenter",
    newTitle: "Sport Center",
    icon: (
      <Dribbble
        size={22}
        color={themeColors.accentBlue}
      />
    ),
  },
  {
    title: "laundry",
    newTitle: "Laundry",
    icon: (
      <Wind2
        size={22}
        color={themeColors.accentBlue}
      />
    ),
  },
];
