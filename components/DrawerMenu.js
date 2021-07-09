import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
const iconProviderMap = {
  Feather: Feather,
  MaterialIcon: MaterialIcons,
  AntDesign: AntDesign,
};

const DrawerMenu = ({
  navigation,
  screen,
  background,
  title,
  iconProvider,
  iconName,
}) => {
  const IconProvider = iconProviderMap[iconProvider];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate(`${screen}`);
      }}
    >
      <View style={{ backgroundColor: `${background}`, ...styles.menus }}>
        <IconProvider name={iconName} size={25} color="white" />
        <Text
          style={{
            ...globalStyles.txt,
            marginTop: SIZE.height / 4,
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerMenu;
const styles = StyleSheet.create({
  menus: {
    width: SIZE.width * 5.5,
    height: SIZE.height * 2.8,
    borderRadius: 4,
    marginHorizontal: SIZE.height / 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
