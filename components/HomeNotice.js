import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { useTheme } from "@react-navigation/native";
import { color } from "react-native-reanimated";
const HomeNotice = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View style={{ ...styles.events, backgroundColor: colors.card }}>
        <View>
          <View style={{ width: "60%" }}>
            <Text
              style={{
                ...globalStyles.txt,
                fontWeight: "bold",
                color: colors.text,
              }}
            >
              Hello Friend
            </Text>
            <Text
              style={{
                ...globalStyles.midText,
                color: "#888",
                marginTop: 5,
                color: colors.text,
              }}
            >
              How are you?
            </Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{ color: "white", fontSize: 16 }}>Achievements</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ ...styles.midView, backgroundColor: colors.midBox }}>
            <View style={{}}>
              <Text style={{ ...styles.midNum, color: colors.text }}>602+</Text>
              <Text style={{ fontSize: 16, color: colors.text }}>Students</Text>
            </View>
            <View style={{borderLeftColor:'gray',borderLeftWidth:2,paddingLeft:10,borderRightColor:'gray',borderRightWidth:2,paddingRight:10}}>
            <Text style={{ ...styles.midNum, color: colors.text }}>309+</Text>
              <Text style={{ fontSize: 16, color: colors.text }}>Graduates</Text>
            </View>
            <View>
            <Text style={{ ...styles.midNum, color: colors.text }}>16+</Text>
              <Text style={{ fontSize: 16, color: colors.text }}>Teachers</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Announcements")}
        style={{ marginTop: SIZE.height * 0.4 }}
      >
        <Text style={{ ...styles.btnText, color: colors.text }}>
          See All Pages
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeNotice;
const styles = StyleSheet.create({
  events: {
    padding: SIZE.width,
    position: "relative",
    marginTop: SIZE.width * 0.4,
    width: SIZE.screenWidth * 0.91,
    borderRadius: 9,
  },
  btn: {
    position: "absolute",
    right: SIZE.width * 0.5,
    bottom: SIZE.width * 0.5,
    borderTopEndRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "#F05479",
    padding: SIZE.width * 0.5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  midView: {
    width: "100%",
    height: 80,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  midNum: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
