import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import GalleryRoute from "../components/GalleryRoute";
import Header from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";
import ImageSelect from "../components/ImageSelect";
import useGallery from "../hooks/useGallery";
import { useUserContext } from "../providers/user";
import { globalStyles, SIZE } from "../styles/globalStyle";

const Gallery = ({ navigation }) => {
  const [imageuri, setImageuri] = useState("");
  const { user } = useUserContext();
  const [imageSet, setImages] = useState(null);
  const [allImages, setallImages] = useState([]);

  // custom hookes to upload,retrieve and delete image
  const {
    fetchData,
    uploadData,
    uploading,
    loading,
    deleteData,
    refreshing,
    setIsVisible,
    visible,
    option,
    setOption,
  } = useGallery(setImages, setallImages);

  useEffect(() => {
    fetchData("images");
  }, []);

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
      }
    });
  };

  return (
    <>
      <Header
        title="Academia Gallery"
        navigation={navigation}
        showSidebar={false}
      />
      <GalleryRoute navigation={navigation} screen="photo" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchData("images")}
          />
        }
      >
        {/* shoudl be teacher to let only teacher to add photo */}
        {user.admin && (
          <View
            style={{
              marginLeft: SIZE.width,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...globalStyles.btns,
              }}
              onPress={() => setOption(true)}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={{ ...globalStyles.midText, color: "white" }}>
                Add Image
              </Text>
            </TouchableOpacity>
          </View>
        )}

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
            uploadImage={uploadData}
            setImages={setImages}
            setOption={setOption}
            uploading={uploading}
          />
        </Modal>

        {/* caruousel */}
        <ImageCarousel images={allImages} />
        {loading ? (
          <ActivityIndicator color="#f44" size={24} />
        ) : (
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              {allImages.map((image, index) => (
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
              <Modal
                onRequestClose={() => setIsVisible(false)}
                visible={visible}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#111",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setIsVisible(false)}
                      style={styles.close}
                    >
                      <Ionicons name="arrow-back" size={34} color="white" />
                    </TouchableOpacity>

                    {/* only teacher can delete post  */}
                    {user.admin && (
                      <TouchableOpacity
                        // onPress={() => deleteData(imageuri)}
                        onPress={() => {
                          Alert.alert(
                            "Delete Image ",
                            "Are you sure you want to delete this ?",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancelled!"),
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () => deleteData(imageuri),
                              },
                            ],
                            { cancelable: true }
                          );
                        }}
                        style={styles.close}
                      >
                        <Ionicons name="trash" size={34} color="#ed8085" />
                      </TouchableOpacity>
                    )}
                  </View>
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
          </View>
        )}
      </ScrollView>
    </>
  );
};
export default Gallery;

const styles = StyleSheet.create({
  close: {
    position: "relative",
    marginTop: 10,
    marginLeft: 10,
  },
});
