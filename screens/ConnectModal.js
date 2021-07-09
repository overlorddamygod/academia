import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";

function ConnectModal({ navigation, setShowDialog }) {
  return (
    <>
      <TouchableOpacity
        style={styles.cancel}
        onPress={() => {
          setShowDialog(false);
        }}
      >
        <Feather
          name="x-circle"
          size={SIZE.height / 1.5}
          color={COLORS.white}
        />
      </TouchableOpacity>

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
    </>
  );
}

export default ConnectModal;

const styles = StyleSheet.create({
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
    padding: SIZE.height / 2.5,
    borderRadius: 8,
  },
  cancel: {
    marginVertical: SIZE.height * 0.3,
    marginRight: 5,
    alignSelf: "flex-end",
  },
});
