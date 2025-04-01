import { getProperty } from "@/appwrite/propertyActions";
import TopBar from "@/components/TopBar";
import { themeColors } from "@/constants/Colors";
import { globalStyles } from "@/styles/globalStyles";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Gallery = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    const getImages = async () => {
      const property = await getProperty({ id: id as string });
      if (property?.images) {
        setImages(property.images);
      }
      setLoading(false);
    };
    getImages();
  }, []);

  // Function to scroll to selected image
  const scrollToImage = (index: number) => {
    setSelectedIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Gallery" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1, gap: 6 }}>
          {/* Large Image Slider */}
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(
                  event.nativeEvent.contentOffset.x / width
                );
                setSelectedIndex(newIndex);
              }}
            >
              {images.length > 0 ? (
                images.map((item, index) => (
                  <Image
                    source={{ uri: item }}
                    key={index}
                    style={{ height: "100%", width: width }}
                  />
                ))
              ) : (
                <Text style={globalStyles.standardText}>No images found.</Text>
              )}
            </ScrollView>
          </View>

          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  height: 100,
                  gap: 6,
                  paddingHorizontal: 6,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {images.length > 0 ? (
                  images.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => scrollToImage(index)}>
                      <Image
                        source={{ uri: item }}
                        style={{
                          height: "100%",
                          width: 100,
                          borderRadius: 4,
                          borderWidth: selectedIndex === index ? 2 : 0,
                          borderColor: selectedIndex === index ? themeColors.accentBlue : "transparent",
                        }}
                      />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={globalStyles.standardText}>No images found.</Text>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Gallery;