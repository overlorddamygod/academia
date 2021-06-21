import React from "react";
import { StyleSheet, View, Text, Modal, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import {
  HomeStackScreen,
  ChatStackScreen,
  AnnounceStackScreen,
  NotificationsStackScreen,
  ModalStackScreen,
  DrawerMenuStackScreen
  
} from "./Stack";
import COLORS from "../styles/colors";


const Tabs = createBottomTabNavigator();

const BottomTab = () => {

  return (
    <>
      <Tabs.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            position: "absolute",
            bottom: 5,
            left: 10,
            right: 10,
            backgroundColor: "#0E243F",
            elevation: 4,
            height: 70,
            borderRadius: 15,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={focused ? 29 : 24}
                color={focused ? "pink" : "white"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Chat"
          component={ChatStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="chatbox-ellipses-outline"
                size={focused ? 29 : 24}
                color={focused ? "pink" : "white"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ConnectModal"
          component={ModalStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.middleIcon}>
                <Feather
                  name="users"
                  size={focused ? 29 : 24}
                  color={focused ? "pink" : "white"}
                />
              </View>
            ),
          }}
        
        />

        <Tabs.Screen
          name="Announcement"
          component={AnnounceStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="calendar"
                size={focused ? 29 : 24}
                color={focused ? "pink" : "white"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Notifications"
          component={NotificationsStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="notifications-outline"
                size={focused ? 29 : 24}
                color={focused ? "pink" : "white"}
              />
            ),
          }}
        />
      </Tabs.Navigator>
     
      
    </>
  );
};

export default BottomTab;
const styles = StyleSheet.create({
  middleIcon: {
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: COLORS.mainred,
  },
});