import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIZE } from "../styles/globalStyle";

const GalleryRoute = ({ navigation, screen }) => {
  const { colors } = useTheme();
  const [route, setRoute] = useState(screen);
  return (
    <View
      style={{
        flexDirection: "row",
        padding: SIZE.height * 0.2,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.top,
          backgroundColor: route === "photo" ? "#FB616A" : null,
        }}
        onPress={() => {
          navigation.navigate("Gallery", {
            screen: "Gallery",
          });
        }}
      >
        <Text
          style={{
            fontSize: 17,
            color: route != "photo" ? colors.text : "white",
          }}
        >
          Photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.top,
          backgroundColor: route === "video" ? "#FB616A" : null,
        }}
        onPress={() => {
          navigation.navigate("Video", {
            screen: "Video",
          });
        }}
      >
        <Text
          style={{
            fontSize: 17,
            color: route != "video" ? colors.text : "white",
          }}
        >
          Video
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GalleryRoute;

const styles = StyleSheet.create({
  cards: {
    borderRadius: 5,
    padding: SIZE.width * 1.2,
    marginVertical: 5,
  },
  top: {
    padding: 15,
    width: SIZE.screenWidth * 0.45,
    borderRadius: 4,
    marginHorizontal: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
