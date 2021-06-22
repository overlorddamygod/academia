import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../styles/colors";

function ConnectModal({ navigation, setShowDialog }) {
  return (
    <>
      <View style={styles.modal}>
        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setShowDialog(false);
              navigation.navigate("Teacher");
            }}
          >
            <View style={styles.btntext}>
              <Text style={styles.text}>Connect with Teachers</Text>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setShowDialog(false);
              navigation.navigate("Student");
            }}
          >
            <View style={styles.btntext}>
              <Text style={styles.text}>Connect with Student</Text>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cancel}></View>
      </View>
    </>
  );
}

export default ConnectModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.darkblue,
    borderRadius: 10,
  },
  text: {
    color: COLORS.darkblue,
    fontSize: 18,
  },
  btntext: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
  },
  cancel: {
    width: 90,
    alignSelf: "flex-end",
  },
});
