import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import IndividualChat from "../screens/IndividualChat";
import AddAnnouncement from "../screens/AddAnnouncement";
import { StudentStackScreen, TeacherStackScreen } from "./Stack";

const MainStack = createStackNavigator();

function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="BottomTab" component={BottomTab} />
      <MainStack.Screen
        name="IndividualChat"
        component={IndividualChat}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <MainStack.Screen name="AddAnnouncement" component={AddAnnouncement} />
      <MainStack.Screen
        name="Teacher"
        component={TeacherStackScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <MainStack.Screen
        name="Student"
        component={StudentStackScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </MainStack.Navigator>
  );
}

export default Main;
