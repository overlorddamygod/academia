import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { SIZE } from "../styles/globalStyle";

const Label = ({ text }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 16,
        color: colors.text,
        marginBottom: SIZE.height / 20,
      }}
    >
      {text}
    </Text>
  );
};

const CustomTextInput = ({ value, onChangeText, placeholder }) => {
  const { colors } = useTheme();

  return (
    <TextInput
      style={{
        marginVertical: SIZE.height / 8,
        borderWidth: 1,
        paddingHorizontal: SIZE.width * 0.5,
        borderRadius: 10,
        color: colors.text,
        borderColor: colors.border,
        fontSize: SIZE.width * 0.9,
        height: SIZE.height * 1.25,
      }}
      placeholder={placeholder || ""}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      returnKeyType="next"
    />
  );
};

const InputContainer = ({ label, style = {}, children }) => {
  return (
    <View
      style={{
        marginVertical: SIZE.height / 15,
        ...style,
      }}
    >
      <Label text={label} />
      {children}
    </View>
  );
};

export { Label, CustomTextInput, InputContainer };
