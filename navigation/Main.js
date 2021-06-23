import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Announcement from "../screens/Announcement";
import Home from "../screens/Home";
import Gallery from "../screens/Gallery";
import StudentList from "../screens/TeachersList";
import DrawerTab from "./Drawer";
import IndividualChat from "../screens/IndividualChat";

const MainStack = createStackNavigator();

function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      {/* <MainStack.Screen name="Drawer" component={DrawerTab} /> */}
      {/* <MainStack.Screen name="IndividualChat" component={IndividualChat} /> */}
      {/* <MainStack.Screen name="Gallery" component={Gallery} /> */}
      {/* <MainStack.Screen name="StudentList" component={StudentList} /> */}
    </MainStack.Navigator>
  );
}

export default Main;
