import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, StatusBar } from "react-native";
import COLORS from "../styles/colors";
import { globalStyles } from "../styles/globalStyle";
import { Ionicons } from "@expo/vector-icons";
const Header = ({ title, navigation }) => {
  return (
    <View style={styles.headers}>
      <View style={{height:StatusBar.currentHeight*1.5}}></View>
      <View style={styles.head}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ position: "absolute", right: 10 }}
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
    paddingBottom: 30,
    width: "100%",
    backgroundColor: COLORS.main,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent:"center"
  },
  text: {
    color: "white",
    fontSize: 23,
  },
});
