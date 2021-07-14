import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ForgotPassword from "../screens/ForgotPassword";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { OnboardStackScreen } from "./Stack";
import React,{useState,useEffect} from "react";
const AuthStack = createStackNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";

function Auth() {
  const [firstLaunch, setFirstLaunch] = useState(null);
  useEffect(()=>{
    AsyncStorage.getItem('alreadyLaunched')
    .then(value=>{
      if(value ==null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setFirstLaunch(true);
      }else{
        setFirstLaunch(false);
      }
    })
  },[])
  if(firstLaunch===null){
    return null;
  }else if(firstLaunch===true){
    return(
      <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
         <AuthStack.Screen name="Onboard" component={OnboardStackScreen} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      </AuthStack.Navigator>
    </NavigationContainer>
    )
  }
  else{
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
  )
 };
}

export default Auth;
