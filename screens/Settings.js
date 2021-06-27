import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default function Settings({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Header title="Your Settings" navigation={navigation} />
      <View style={{ padding: 20 }}>
        <View>
          <Text style={{ fontSize: 30, color: "#333", fontWeight: "bold" }}>
            Settings
          </Text>
          <Text
            style={{
              ...globalStyles.midText,
              fontWeight: "bold",
              lineHeight: 30,
            }}
          >
            Review Your Settings
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.settingsbtn}>
            {isEnabled ? (
              <Feather name="moon" size={24} color="black" />
            ) : (
              <Feather name="sun" size={24} color="black" />
            )}
            <View>
              <Text style={globalStyles.boldText}>Dark Mode</Text>
              <Text style={globalStyles.midText}>Tap to Change</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#b89ce6" }}
              thumbColor={isEnabled ? "#a077d4" : "#f4f3f4"}
              ios_backgroundColor="lightgray"
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.settingsbtn }}>
            <Feather name="image" size={24} color="black" />
            <View>
              <Text style={globalStyles.boldText}>Edit Profile</Text>
              <Text style={globalStyles.midText}>Tap to Change</Text>
            </View>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.settingsbtn }}>
            <Feather name="book-open" size={24} color="black" />
            <View>
              <Text style={globalStyles.boldText}>Terms & Policy</Text>
              <Text style={globalStyles.midText}>Tap to Read</Text>
            </View>
            <AntDesign name="bulb1" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              ...globalStyles.boldText,
             
              marginTop: 20,
            }}
          >
            More
          </Text>
          <Text style={{...globalStyles.midText,fontWeight:'bold'}}>Read about us too </Text>
          <TouchableOpacity style={{ ...styles.settingsbtn }}>
            <Feather name="meh" size={24} color="black" />
            <View>
              <Text style={globalStyles.boldText}>About Us</Text>
              <Text style={globalStyles.midText}>Tap to Read</Text>
            </View>
            <AntDesign name="meho" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsbtn: {
    marginTop: SIZE.height * 0.6,
    padding: SIZE.width,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: SIZE.width * 0.6,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
