import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View,Text, ScrollView, Image, StyleSheet } from "react-native";

import { SIZE } from "../styles/globalStyle";
const ImageCarousel = ({ images }) => {
    const { colors } = useTheme();
  const [active, setActive] = useState(0);
  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View style={{justifyContent: "center", alignItems: "center" }}>
      <ScrollView
        style={{ width: SIZE.screenWidth * 0.93, marginTop: 4 }}
        horizontal
        pagingEnabled
        onScroll={change}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <Image source={{ uri: image }} style={styles.cover} />
        ))}
      </ScrollView>
      <View style={styles.dotDiv}>
        {images.map((e, f) => (
          <Text key={f} style={f == active ? styles.dotActive : styles.dots}>
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;
const styles = StyleSheet.create({
  cover: {
    width: SIZE.screenWidth * 0.93,
    height: SIZE.height * 6,
    borderRadius: 5,
    resizeMode: "cover",
  },
  dotDiv: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },

  dots: { color: "#888", marginHorizontal: 2 },
  dotActive: { color: "white", fontSize: 17 },
});
