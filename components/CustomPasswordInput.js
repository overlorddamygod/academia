import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SIZE } from "../styles/globalStyle";

const CustomPasswordInput = ({ value, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View
      style={{
        height: SIZE.height * 1.4,
        margin: SIZE.height / 4,
        backgroundColor: "#dfe1f7",
        borderRadius: 6,
        paddingHorizontal: SIZE.height / 4,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="Password"
        autoCompleteType="password"
        secureTextEntry={!showPassword}
        style={{ flex: 1, fontSize: 18 }}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#666"
      />
      <TouchableOpacity onPress={toggleShowPassword}>
        <Ionicons name={showPassword ? "eye-off" : "eye"} size={25} />
      </TouchableOpacity>
    </View>
  );
};
export default CustomPasswordInput;
