import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./BottomTab";
import Login from "../screens/Login";
import Register from "../screens/Register";
import IndividualChat from "../screens/IndividualChat";
import DrawerContent from "./DrawerContent";
import {
  AnnounceStackScreen,
  GalleryStackScreen,
  MaterialStackScreen,
  SettingStackScreen,
  TeacherStackScreen,
  StudentStackScreen,
} from "./Stack";

const Drawer = createDrawerNavigator();

const DrawerTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
    >
      {/* Contains Buttom tab navigator . */}
      <Drawer.Screen name="Home" component={BottomTab} />
      <Drawer.Screen name="Settings" component={SettingStackScreen} />
      <Drawer.Screen name="Gallery" component={GalleryStackScreen} />
      <Drawer.Screen name="Announcements" component={AnnounceStackScreen} />
      <Drawer.Screen name="Materials" component={MaterialStackScreen} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Teacher" component={TeacherStackScreen} />
      <Drawer.Screen name="Student" component={StudentStackScreen} />
      <Drawer.Screen name="IndividualChat" component={IndividualChat} />
    </Drawer.Navigator>
  );
};

export default DrawerTab;
