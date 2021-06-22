import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Header from "../components/Header";

const Gallery = ({ navigation }) => {
  return (
    <>
      <Header title="Academia Gallary" navigation={navigation} />
      <View style={globalStyles.container}>
        <Text style={globalStyles.boldText}>Gallery</Text>
      </View>
    </>
  );
};

export default Gallery;
