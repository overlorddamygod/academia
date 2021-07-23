import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { SIZE } from "../styles/globalStyle";
import CustomTab from "./CustomTab";

const GalleryRoute = ({ navigation, screen }) => {
  const { colors } = useTheme();
  const [route, setRoute] = useState(screen);
  return (
    <View
      style={{
        backgroundColor: colors.mainblue,
        paddingHorizontal: SIZE.width * 2,
        flexDirection: "row",
        height: SIZE.height * 1.25,
        boxSizing: "border-box",
      }}
    >
      <CustomTab
        title={"Photo"}
        selected={route === "photo"}
        onPress={() => {
          navigation.navigate("Gallery", {
            screen: "Gallery",
          });
        }}
      />
      <CustomTab
        title={"Video"}
        selected={route == "video"}
        onPress={() => {
          navigation.navigate("Video", {
            screen: "Video",
          });
        }}
      />
    </View>
  );
};

export default GalleryRoute;
