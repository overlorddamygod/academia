import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Announcement from "../screens/Announcement";
import Home from "../screens/Home";
import Gallery from "../screens/Gallery";
import StudentList from "../screens/TeachersList";

const MainStack = createStackNavigator();

function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Announcement" component={Announcement} />
      <MainStack.Screen name="Gallery" component={Gallery} />
      <MainStack.Screen name="StudentList" component={StudentList} />
    </MainStack.Navigator>
  );
}

export default Main;
