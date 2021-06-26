import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Header from "../components/Header";
export default function Settings({ navigation }) {
  return (
    <>
      <Header title="Your Settings" navigation={navigation} />
      <View style={globalStyles.container}>
        <Text style={globalStyles.boldText}>Settings</Text>
      </View>
    </>
  );
}
