import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomTab = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.99}
      style={{
        flex: 1,
        justifyContent: "center",
        borderBottomColor: "white",
        borderBottomWidth: selected ? 3 : 0,
      }}
      underlayColor="#999"
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 17,
          color: "white",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomTab;
