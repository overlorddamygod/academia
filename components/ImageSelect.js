import React,{useState} from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet,ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles, SIZE } from "../styles/globalStyle";
const ImageSelect = (props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000097",
      }}
    >
      <View
        style={{
          backgroundColor: colors.card,
          width: SIZE.screenWidth * 0.9,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: SIZE.width,
          paddingVertical: SIZE.width,
        }}
      >
        <Text style={{ ...globalStyles.boldText, color: "white" }}>
          Choose Option
        </Text>
        <TouchableOpacity onPress={()=>{props.setOption(false)}} style={styles.close}>
          <AntDesign name="close" size={27} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.btns,
            padding: 14,
            width: "70%",
            marginTop:20
          }}
          onPress={props.openGallery}
        >
          <AntDesign name="picture" size={24} color="white" />
          <Text
            style={{ ...globalStyles.midText, marginLeft: 6, color: "white" }}
          >
            Open Library
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.btns,
            padding: 14,
            width: "70%",
            backgroundColor: "#6765c2",
          }}
          onPress={props.openCamera}
        >
          <AntDesign name="camera" size={24} color="white" />
          <Text
            style={{ ...globalStyles.midText, marginLeft: 6, color: "white" }}
          >
            Open Camera
          </Text>
        </TouchableOpacity>

        {props.imageSet && (
          <>
            <View style={{ padding: 10 }}>
              <Image
                source={props.imageSet}
                style={{ height: 300, width: SIZE.screenWidth*0.82, resizeMode: "contain" }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
           
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.btns,
                  backgroundColor: "#6765c2",
                }}
                onPress={props.uploadImage}
              >
                <Text style={{ ...globalStyles.midText, color: "white" }}>
                 {props.uploading?<ActivityIndicator color="white" />: "Upload Image"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.btns,
                  marginLeft: 4,
                }}
                onPress={() => {
                  props.setImages(null);
                  props.setOption(false);
                }}
              >
                <Text style={{ ...globalStyles.midText, color: "white" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ImageSelect;

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
  close: {
    position: "absolute",
    zIndex: 2,
    top: SIZE.width * 0.6,
    right: SIZE.width,
  },
});
