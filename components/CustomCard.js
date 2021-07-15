import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { SIZE } from "../styles/globalStyle";
import { ThemeContext } from "./Theme";

const CustomCard = ({ children, style, onPress }) => {
  const { colors } = useTheme();
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        paddingHorizontal: SIZE.width * 0.8,
        borderBottomWidth: 1,
        paddingVertical: SIZE.height * 0.25,
        borderBottomColor: !isDark ? "#eee" : colors.border,
        ...style,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CustomCard;
