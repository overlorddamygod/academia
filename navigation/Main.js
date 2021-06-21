import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Announcement from "../screens/Announcement";

const MainStack = createStackNavigator();

function Main() {
  return (
    <MainStack.Navigator 
        screenOptions={{
            headerShown: false,
        }}
    >
      <MainStack.Screen name="Announcement" component={Announcement} />
    </MainStack.Navigator>
  );
}

export default Main;