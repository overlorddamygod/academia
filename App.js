import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemeProvider from "./components/Theme";
import Auth from "./navigation/Auth";
import DrawerTab from "./navigation/Drawer";
import { UserProvider } from "./providers/user";

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <StatusBar style="light" translucent={true} />
        <UserProvider SignedOutScreen={Auth} SignedInScreen={DrawerTab} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
