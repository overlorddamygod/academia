import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";

const images = [
  "https://academiacollege.edu.np/img/landing.jpg",
  "https://i.pinimg.com/564x/bf/fa/c1/bffac152b96db8c2290c8e3f09699301.jpg",
  "https://honeysanime.com/wp-content/uploads/2018/11/Golden-Kamuy-Wallpaper-1-500x445.jpg",
  "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
  "https://academiacollege.edu.np/img/abt.jpg",
  "https://academiacollege.edu.np/storage/sports/cover/1623690510-d.JPG",
];

const Gallery = ({ navigation }) => {
  const [active, setActive] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [imageuri, setImageuri] = useState("");

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <>
      <ScrollView>
        <Header title="Academia Gallary" navigation={navigation} />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ScrollView
            style={{ width: SIZE.screenWidth * 0.97, marginTop: 4 }}
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
              <Text
                key={f}
                style={f == active ? styles.dotActive : styles.dots}
              >
                ⬤
              </Text>
            ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {images.map((image, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                  setImageuri(image);
                }}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: image }}
                  style={{
                    width: SIZE.screenWidth / 2.1,
                    height: 200,
                    resizeMode: "cover",
                    marginTop: 5,
                    marginHorizontal: 2,
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}

          <Modal onRequestClose={() => setIsVisible(false)} visible={visible}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#111",
              }}
            >
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={{position: "relative", width: "100%" }}
              >
                <Ionicons
                  style={{
                    marginTop:10,
                    alignSelf:'flex-end'
                  }}
                  name="close"
                  size={34}
                  color="white"
                />
              </TouchableOpacity>

              <ReactNativeZoomableView
                maxZoom={2}
                minZoom={1}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                captureEvent={true}
              >
                <Image
                  source={{ uri: `${imageuri}` }}
                  style={{
                    width: SIZE.screenWidth,
                    height: "100%",
                    resizeMode: "contain",
                    marginTop: 5,
                    marginHorizontal: 2,
                  }}
                />
              </ReactNativeZoomableView>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  cover: {
    width: SIZE.screenWidth * 0.97,
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
  dots: {
    color: "#888",
    marginHorizontal: 2,
  },
  dotActive: {
    color: "white",
    fontSize: 17,
  },
});
