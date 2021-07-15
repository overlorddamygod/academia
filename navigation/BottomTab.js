import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Dialog } from "react-native-ui-lib";
import ConnectModal from "../screens/ConnectModal";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";
import {
  CalendarStackScreen,
  ChatStackScreen,
  HomeStackScreen,
  ModalStackScreen,
  NotificationsStackScreen,
  OnboardStackScreen,
} from "./Stack";

const Tabs = createBottomTabNavigator();

const BottomTab = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const { colors } = useTheme();
  return (
    <>
      <Tabs.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: colors.buttomtab,
            elevation: 4,
            height: SIZE.height * 1.6,
          },
        }}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeStackScreen}
          
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.middleIcon : null}>
                <AntDesign
                  name="home"
                  size={focused ? 29 : 24}
                  color={"white"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="Chat"
          component={ChatStackScreen}
          // component={OnboardStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.middleIcon : null}>
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={focused ? 29 : 24}
                  color={"white"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="ConnectModal"
          component={ModalStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowDialog(true);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: SIZE.height * 2,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.mainred,
                  }}
                >
                  <Feather
                    name="users"
                    size={focused ? 29 : 24}
                    color={"white"}
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
              <View style={focused ? styles.middleIcon : null}>
                <AntDesign
                  name="calendar"
                  size={focused ? 29 : 24}
                  color={"white"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="Notifications"
          component={NotificationsStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.middleIcon : null}>
                <Ionicons
                  name="notifications-outline"
                  size={focused ? 29 : 24}
                  color={"white"}
                />
              </View>
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
          backgroundColor: colors.dialogs,
          justifyContent: "space-between",
          paddingBottom: SIZE.height / 2,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
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
    flex: 1,
    width: SIZE.height * 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#534db0",
  },
});
