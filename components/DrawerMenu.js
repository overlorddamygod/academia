import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import { AntDesign } from "@expo/vector-icons";

const DrawerMenu = ({ navigation,screen,background, title, iconProvider, iconName }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => {
      navigation.navigate("Menu", {
        screen: `${screen}`,
      });
    }}>
      <View style={{ backgroundColor: `${background}`, ...styles.menus }}>
        {iconProvider === "Feather" && (
          <Feather
            style={{ marginLeft: 17, marginBottom: 5 }}
            name={iconName}
            size={24}
            color="white"
          />
        )}
        {iconProvider === "MaterialIcon" && (
          <MaterialIcons
            style={{ marginLeft: 17, marginBottom: 5 }}
            name={iconName}
            size={24}
            color="white"
          />
        )}
        {iconProvider === "AntDesign" && (
          <AntDesign
            style={{ marginLeft: 17, marginBottom: 5 }}
            name={iconName}
            size={24}
            color="white"
          />
        )}

        <Text style={globalStyles.txt}>{title}</Text>
      </View>
  </TouchableOpacity>
  );
};

export default DrawerMenu;
const styles = StyleSheet.create({
  menus: {
    width: 110,
    padding: 18,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
