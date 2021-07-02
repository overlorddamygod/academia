import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
const AuthStack = createStackNavigator();

function Auth() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default Auth;
