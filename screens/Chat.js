import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Header from "../components/Header";

const Chat = ({ navigation }) => {
  return (
    <>
    <Header title="Message People" navigation={navigation}/>
    <View style={globalStyles.container}>
      <Text style={globalStyles.boldText}>Chat</Text>
      {/* dummy button to navigate between screens */}
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("Home", {
            screen: "Home",
          });
        }}
      />
    </View>
    </>
  );
};

export default Chat;
