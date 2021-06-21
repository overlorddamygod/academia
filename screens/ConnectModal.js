import React from 'react'
import { View, Text ,StyleSheet, TouchableOpacity} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../styles/colors";
function ConnectModal({navigation}) {
    return (
      <>
      <View style={styles.modalDiv}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
        <TouchableOpacity 
         activeOpacity={.9}
          onPress={() => {
            navigation.navigate('Teacher');
            console.log(navigation)
          }}
        >
          <View style={styles.btntext}>
            <Text style={styles.text}>Connect with Teachers</Text>
            <AntDesign name="right" size={24} color="black" />
          </View>
          </TouchableOpacity>
          <TouchableOpacity 
           activeOpacity={.9}
          onPress={() => {
            navigation.navigate('Student');
            console.log(navigation)
          }}
        >
          <View style={styles.btntext}>
            <Text style={styles.text}>Connect with Student</Text>
            <AntDesign name="right" size={24} color="black" />
          </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cancel}>
        </View>
      </View>
    </View>
    </>
    );
  }

export default ConnectModal

const styles = StyleSheet.create({
    modalDiv: {
      backgroundColor: "#00000016",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      backgroundColor: COLORS.darkblue,
      height: 300,
      width: 300,
      borderRadius: 10,
      padding: 10,
    },
    modalContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: COLORS.darkblue,
      fontSize: 18,
    },
    btntext: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      backgroundColor: "white",
      padding: 14,
      borderRadius: 8,
    },
    cancel: {
      width: 90,
      alignSelf: "flex-end",
    },
   
  });
  
  