import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Header from "../components/Header";

const Notifications = ({ navigation }) => {
  return (
    <>
      <Header title="Notifications" navigation={navigation} />
      <View style={globalStyles.container}>
        <Text style={globalStyles.boldText}>Notifications</Text>
        {/* dummy button to navigate between screens */}
        <Button
          title="Announcements"
          onPress={() => {
            navigation.navigate("Announcement", {
              screen: "Announcement",
            });
          }}
        />
      </View>
    </>
  );
};

export default Notifications;
