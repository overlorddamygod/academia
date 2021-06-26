import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Dialog } from "react-native-ui-lib";

import {
  HomeStackScreen,
  ChatStackScreen,
  NotificationsStackScreen,
  ModalStackScreen,
  CalendarStackScreen
} from "./Stack";
import COLORS from "../styles/colors";
import ConnectModal from "../screens/ConnectModal";
import { SIZE } from "../styles/globalStyle";

const Tabs = createBottomTabNavigator();

const BottomTab = (props) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Tabs.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            // position: "absolute",
            // bottom: 5,
            // left: 10,
            // right: 10,
            backgroundColor: "#0E243F",
            elevation: 4,
            height: SIZE.height * 1.6,
            // borderRadius: 15,
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
              <TouchableOpacity
                onPress={() => {
                  setShowDialog(true);
                }}
              >
                <View style={styles.middleIcon}>
                  <Feather
                    name="users"
                    size={focused ? 29 : 24}
                    color={focused ? "pink" : "white"}
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="Calendar"
          component={CalendarStackScreen}
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
      <Dialog
        migrate
        useSafeArea
        bottom={true}
        panDirection={"Down"}
        containerStyle={{
          backgroundColor: "#0E243F",
          justifyContent: "space-between",
          paddingVertical: SIZE.height/2,
          borderTopRightRadius:30,
          borderTopLeftRadius:30,
        }}
        width="100%"
        visible={showDialog}
        onDismiss={() => setShowDialog(false)}
      >
        <View style={{ paddingHorizontal: SIZE.width * 0.9 }}>
          <ConnectModal setShowDialog={setShowDialog} {...props} />
        </View>
      </Dialog>
    </>
  );
};

export default BottomTab;
const styles = StyleSheet.create({
  middleIcon: {
    height: SIZE.height * 2,
    width: SIZE.height * 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.mainred,
  },
});
