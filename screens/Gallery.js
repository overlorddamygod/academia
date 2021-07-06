import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import ImageCarousel from "../components/ImageCarousel";
import { useUserContext } from "../providers/user";
import storage from "@react-native-firebase/storage";
import ImageSelect from "../components/ImageSelect";
import { showToast, getErrorMessage } from "../utils/error";
import GalleryRoute from "../components/GalleryRoute";

const Gallery = ({ navigation }) => {
  const [visible, setIsVisible] = useState(false);
  const [imageuri, setImageuri] = useState("");
  const { user } = useUserContext();
  const [imageSet, setImages] = useState(null);
  const [option, setOption] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [allImages, setallImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchImages = () => {
    const ref = storage().ref("images");
    ref.list().then((res) => {
      setallImages([]);
      res.items.forEach((itemsRef) => {
        itemsRef.getDownloadURL().then((downloadUrl) => {
          setallImages((prev) => [...prev, downloadUrl]);
          setLoading(false);
          setRefreshing(false);
        });
      });
    });
  };
  useEffect(() => {
    fetchImages();
  }, []);


  const uploadImage = async () => {
    const { uri } = imageSet;
    const filename = "images/" + uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

    setUploading(true);

    const task = storage().ref(filename).putFile(uploadUri);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    showToast("Image was successfully Uploaded !")
    setImages(null);
    setallImages((prev) => [uri, ...prev]);
    setOption(false);
  
  };

  const deleteImage = (image) => {
    var desertRef = storage().refFromURL(image);
    desertRef.delete()
    setIsVisible(false)
    setallImages(prev => prev.filter(a => a !== image))
    showToast("Successfully deleted !")
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
      <Header title="Academia Gallery" navigation={navigation} />
      <GalleryRoute navigation={navigation} screen="photo"/>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchImages} />
        }
      >
{/* shoudl be teacher to let only teacher to add photo */}
        {user.title === 'Student'&&
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
        }
      

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
                  {user.title === 'Student'&&  <TouchableOpacity
                      onPress={()=>deleteImage(imageuri)}
                      style={styles.close}
                    >
                      <Ionicons name="trash" size={34} color="#ed8085" />
                    </TouchableOpacity>}
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
  btns: {
    width: SIZE.screenWidth * 0.3,
    padding: 8,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#6765c2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  close: {
    position: "relative",
    marginTop: 10,
    marginLeft: 10,
  },
});
