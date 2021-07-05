import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import ImageCarousel from "../components/ImageCarousel";
import { images } from "../styles/colors";

import storage from "@react-native-firebase/storage";
import ImageSelect from "../components/ImageSelect";

const Gallery = ({ navigation }) => {
  const [visible, setIsVisible] = useState(false);
  const [imageuri, setImageuri] = useState("");

  const [imageSet, setImages] = useState(null);
  const [option, setOption] = useState(false);
  const [uploading, setUploading] = useState(false);




  const uploadImage = async () => {
    const { uri } = imageSet;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

    setUploading(true);
    const task = storage().ref(filename).putFile(uploadUri);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      "Photo uploaded!",
      "Your photo has been uploaded Successfully!"
    );
    setImages(null);
    setOption(false);
  };

  const openCamera = () => {
    const options = {
      storageOptions: {
        mediaType: "photo",
        path: "images",
      },
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImages({ uri: source });
      }
    });
  };
  const openGallery = () => {
    const options = {
      storageOptions: {
        mediaType: "photo",
        path: "images",
      },
      // includeBase64:true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImages({ uri: source });

        // console.log("Ref is  " ,createStorageReferenceToFile(response.assets[0]))
      }
    });
  };

  return (
    <>
      <Header title="Academia Gallery" navigation={navigation} />
      <ScrollView>
        <View
          style={{ justifyContent: "center", alignItems: "center", padding: 6 }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.btns,
            }}
            onPress={() => setOption(true)}
          >
            <Text style={{ ...globalStyles.midText, color: "white" }}>
              Add Image
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          onRequestClose={() => setOption(false)}
          visible={option}
          animationType="fade"
        >
          <ImageSelect
            imageSet={imageSet}
            openCamera={openCamera}
            openGallery={openGallery}
            uploadImage={uploadImage}
            setImages={setImages}
            setOption={setOption}
            uploading={uploading}
          />
        </Modal>

        {/* caruousel */}
        <ImageCarousel images={images} />
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
                    width: SIZE.screenWidth / 2.18,
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
                style={{ position: "relative", width: "100%" }}
              >
                <Ionicons
                  style={{ marginTop: 10, alignSelf: "flex-end" }}
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
  btns: {
    width: SIZE.screenWidth * 0.3,
    padding: 8,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#FB616A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
});
