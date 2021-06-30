import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Header from "../components/Header";
import { useTheme } from '@react-navigation/native';
export default function Materials({ navigation }) {
  const { colors } = useTheme();
  return (
    <>
      <Header title="Your Materials" navigation={navigation} />
      <View style={globalStyles.container}>
        <Text style={{...globalStyles.boldText,color:colors.text}}>Materials</Text>
      </View>
    </>
  );
}
