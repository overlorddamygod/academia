import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SIZE } from "../styles/globalStyle";

const Header = ({
  title,
  navigation,
  justifyContent,
  showSidebar = true,
  showBackMenu = true,
}) => {
  const { colors } = useTheme();
  return (
    <View style={{ ...styles.headers, backgroundColor: colors.mainblue }}>
      <View style={{ height: StatusBar.currentHeight }}></View>
      <View
        style={{
          ...styles.head,
          ...{
            justifyContent: justifyContent || "center",
            paddingLeft: SIZE.width,
          },
        }}
      >
        {showBackMenu && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: SIZE.width / 1.8 }}
          >
            <Ionicons name="arrow-back-outline" size={32} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.text}>{title}</Text>
        {showSidebar && (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ position: "absolute", right: SIZE.width / 2 }}
          >
            <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headers: {
    // paddingBottom: SIZE.height * 0.8,
    width: "100%",
  },
  head: {
    // flex:1,
    flexDirection: "row",
    alignItems: "center",
    // borderWidth:2,
    marginVertical: SIZE.height * 0.3,
  },
  text: {
    color: "white",
    fontSize: 23,
  },
});
