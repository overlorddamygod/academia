import { useTheme } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import GalleryRoute from "../components/GalleryRoute";
import Header from "../components/Header";
import { SIZE } from "../styles/globalStyle";

const videoLinks = [
  "https://www.youtube.com/embed/EQMVuQvat-c",
  "https://www.youtube.com/embed/o6cCTwLTPbM",
  "https://www.youtube.com/embed/K4TiqJRfVJ4",
  "https://www.youtube.com/embed/UB_XB_VIj6A",
  "https://www.youtube.com/embed/VcFgE3xablo",
  "https://www.youtube.com/embed/FllfavYZVyg",
  "https://www.youtube.com/embed/TIPepqphlg0",
  "https://www.youtube.com/embed/JZG3sNywrzA",
];

const Videos = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Academia Video"
        navigation={navigation}
        showSidebar={false}
      />
      <GalleryRoute navigation={navigation} screen="video" />
      <ScrollView style={{ height: 1000 }}>
        {/* <View style={{ backgroundColor: "red", flex: 1 }}> */}
        {videoLinks.map((link, index) => (
          <WebView
            style={{
              height: SIZE.screenWidth * 0.5625,
              backgroundColor: colors.main,
            }}
            key={index}
            source={{
              html: `<iframe
          width="100%"
        height="100%"
        src="${link}"
        title="YouTube video player"
        frameborder="0"
        allowFullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>`,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Videos;
var styles = StyleSheet.create({
  backgroundVideo: {
    width: SIZE.screenWidth,
    height: 300,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
    marginTop: 80,
  },
});
