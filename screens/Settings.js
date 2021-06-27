import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { SIZE, globalStyles } from "../styles/globalStyle";
import { useUserContext } from "../providers/user"

export default function Settings({ navigation }) {

  const { linkWithGoogle } = useUserContext()

  return (
    <>
      <Header title="Your Settings" navigation={navigation} />
      <View style={globalStyles.container}>
        <Text style={globalStyles.boldText}>Settings</Text>
        <LinkButton provider="Google" onPress={()=> {
          linkWithGoogle()
        }}/>
      </View>
    </>
  );
}

const LinkButton = ({ provider, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flxe:1,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZE.height,
          paddingVertical: SIZE.height * 0.2,
          ...globalStyles.shadow,
        }}
      >
        <Ionicons
          name={`logo-${provider.toLowerCase() || "google"}`}
          size={32}
        />
        <Text>Link with {provider}</Text>
      </View>
    </TouchableOpacity>
  );
};
