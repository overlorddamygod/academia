import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import ImageCarousel from "../components/ImageCarousel";
import { images } from "../styles/colors";

const Gallery = ({ navigation }) => {
  
  const [visible, setIsVisible] = useState(false);
  const [imageuri, setImageuri] = useState("");

  return (
    <>
      
      <ScrollView>
        
        <Header title="Academia Gallary" navigation={navigation} />
        {/* Image Carousel component */}
        <ImageCarousel images ={images}/>
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
