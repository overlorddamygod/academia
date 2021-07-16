import React from "react";
import { TouchableHighlight, Text } from "react-native";

const CustomTab = ({ title, selected, onPress }) => {
  return (
    <TouchableHighlight
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
    </TouchableHighlight>
  );
};

export default CustomTab;
