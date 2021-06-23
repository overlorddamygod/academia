import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./navigation/Auth";
import DrawerTab from "./navigation/Drawer";
import { useUserContext } from "./providers/user";

export default function App() {
  const { user } = useUserContext();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        {user ? <DrawerTab /> : <Auth />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop:34,
  },
});
