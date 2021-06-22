import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import { AntDesign } from "@expo/vector-icons";

const iconProviderMap = {
  "Feather": Feather,
  "MaterialIcon": MaterialIcons,
  "AntDesign": AntDesign
}

const DrawerMenu = ({ navigation,screen,background, title, iconProvider, iconName }) => {

  const IconProvider = iconProviderMap[iconProvider]

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => {
      navigation.navigate( `${screen}`);
    }}>
      <View style={{ backgroundColor: `${background}`, ...styles.menus }}>
          <IconProvider
            name={iconName}
            size={25}
            color="white"
          />
        <Text style={{...globalStyles.txt, marginTop: 10, fontSize: 16}}>{title}</Text>
      </View>
  </TouchableOpacity>
  );
};

export default DrawerMenu;
const styles = StyleSheet.create({
  menus: {
    width: 110,
    height: 110,
    borderRadius: 4,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center"
  },
});
