import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, StatusBar } from "react-native";
import COLORS from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { SIZE } from "../styles/globalStyle";

const Header = ({ title, navigation, justifyContent }) => {

  return (
    <View style={styles.headers}>
      <View style={{height: SIZE.height * 1.5}}></View>
      <View style={{...styles.head,...{justifyContent: justifyContent || "center", paddingLeft: SIZE.width}}}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ position: "absolute", right: SIZE.width / 2 }}
        >
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headers: {
    paddingBottom: SIZE.height * 0.8,
    width: "100%",
    backgroundColor: COLORS.main,
  },
  head: {
    flexDirection: "row",
    flex: 1,
    // justifyContent:"center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 23,
  },
});
