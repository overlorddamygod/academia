import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../styles/colors";
function ConnectModal({ navigation }) {
  return (
    <>
      <View style={styles.modalDiv}>
        <View style={styles.modal}>
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate("Teacher");
                console.log(navigation);
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
                navigation.navigate("Student");
                console.log(navigation);
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
      </View>
    </>
  );
}

export default ConnectModal;

const styles = StyleSheet.create({
  modalDiv: {
    backgroundColor: "#00000016",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: COLORS.darkblue,
    width: "90%",
    borderRadius: 10,
    padding: 20,
  },
  text: {
    color: COLORS.darkblue,
    fontSize: 18,
  },
  btntext: {
    marginVertical: 10,
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
