import React, { useState,useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../components/Theme";
import { useTheme } from '@react-navigation/native';

export default function Settings({ navigation }) {
  const {isDark,toggleTheme} = useContext(ThemeContext);
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Header title="Your Settings" navigation={navigation} />
      <View style={{ padding: 20 }}>
        <View>
          <Text style={{ fontSize: 30, color: "#333", fontWeight: "bold", color:colors.text }}>
            Settings
          </Text>
          <Text
            style={{
              ...globalStyles.midText,
              fontWeight: "bold",
              lineHeight: 30,
              color:colors.text
            }}
          >
            Review Your Settings
          </Text>
        </View>
        <View>
          <TouchableOpacity style={{...styles.settingsbtn,  borderColor: colors.border,}}>
            {isDark?
              <Feather name="moon" size={24} color={colors.text} />
              : <Feather name="sun" size={24} color={colors.text} />
          }
             
            <View>
              <Text style={{...globalStyles.boldText,color:colors.text}}>Color Mode</Text>
              <Text style={{...globalStyles.midText,color:colors.text}}>Currently {isDark?'Dark':'Light'}</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#b89ce6" }}
              thumbColor={isDark ? "#a077d4" : "#f4f3f4"}
              ios_backgroundColor="lightgray"
              onValueChange={() => 
                toggleTheme(isDark)

              }
              value={isDark}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.settingsbtn,    borderColor: colors.border, }}>
            <Feather name="image" size={24} color={colors.text} />
            <View>
              <Text style={{...globalStyles.boldText,color:colors.text}}>Edit Profile</Text>
              <Text style={{...globalStyles.midText,color:colors.text}}>Tap to Change</Text>
            </View>
            <Feather name="edit" size={24} color={colors.text}/>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.settingsbtn,    borderColor: colors.border, }}>
            <Feather name="book-open" size={24} color={colors.text} />
            <View>
              <Text style={{...globalStyles.boldText,color:colors.text}}>Terms & Policy</Text>
              <Text style={{...globalStyles.midText,color:colors.text}}>Tap to Read</Text>
            </View>
            <AntDesign name="bulb1" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              ...globalStyles.boldText,
              color:colors.text ,
              marginTop: 20,
            }}
          >
            More
          </Text>
          <Text style={{...globalStyles.midText,fontWeight:'bold',color:colors.text}}>Read about us too </Text>
          <TouchableOpacity style={{ ...styles.settingsbtn,    borderColor: colors.border}}>
            <Feather name="meh" size={24} color={colors.text} />
            <View>
              <Text style={{...globalStyles.boldText,color:colors.text}}>About Us</Text>
              <Text style={{...globalStyles.midText,color:colors.text}}>Tap to Read</Text>
            </View>
            <AntDesign name="meho" size={24} color={colors.text} />
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
    borderRadius: SIZE.width * 0.6,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
 
  },
});
