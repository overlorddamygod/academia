import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./BottomTab";
import DrawerContent from "./DrawerContent";
import {
  DrawerMenuStackScreen,
  StudentStackScreen,
  TeacherStackScreen,
} from "./Stack";

const Drawer = createDrawerNavigator();

const DrawerTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
    >
      {/* Contains Buttom tab navigator . */}
      <Drawer.Screen name="Home" initialParams component={BottomTab} />
      <Drawer.Screen name="Menu" component={DrawerMenuStackScreen} />
      <Drawer.Screen name="Teacher" component={TeacherStackScreen} />
      <Drawer.Screen name="Student" component={StudentStackScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerTab;
