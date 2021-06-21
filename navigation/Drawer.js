import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./BottomTab";
import Login from "../screens/Login";
import Register from "../screens/Register";
import DrawerContent from './DrawerContent'
import { DrawerMenuStackScreen } from "./Stack";

const Drawer = createDrawerNavigator();

const DrawerTab = () => {
  return (
    <Drawer.Navigator 
    drawerContent={(props) => <DrawerContent {...props}/>}
    initialRouteName="Home"
    >
      {/* Contains Buttom tab navigator . */}
      <Drawer.Screen name="Home" initialParams component={BottomTab} />
      <Drawer.Screen name="Menu" component={DrawerMenuStackScreen}/>
    </Drawer.Navigator>
  );
};

export default DrawerTab;
