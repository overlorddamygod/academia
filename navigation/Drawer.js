import React,{useContext} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import BottomTab from "./BottomTab";
import Login from "../screens/Login";
import Register from "../screens/Register";
import IndividualChat from "../screens/IndividualChat";
import DrawerContent from "./DrawerContent";
import { ThemeContext } from "../components/Theme";

import {
  AnnounceStackScreen,
  GalleryStackScreen,
  MaterialStackScreen,
  SettingStackScreen,
  TeacherStackScreen,
  PersonDetailStackScreen,
  StudentStackScreen,
} from "./Stack";



const Drawer = createDrawerNavigator();

const DrawerTab = () => {
  const {isDark} = useContext(ThemeContext);

  const LightTheme = {
    ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background:"#edeef2",
    card:'white',
    btn:'#583EFF',
    msgIcon:'black',
    mainblue:'#4C367B',
    buttomtab:'#0E243F',
    border:'lightgray',
  }}

  const CustomDarkTheme = {
    ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    background:"#11042b",
    card:'#393861',
    btn:'#6765c2',
    msgIcon:'#393861',
    mainblue:'#2e2657',
    buttomtab:'#27284a',
    border:'#3e3f73',
  }}

  const themes = isDark?CustomDarkTheme:LightTheme;
  return (
   
    <NavigationContainer theme={themes}>
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
        <Drawer.Screen
          name="PersonDetail"
          component={PersonDetailStackScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
};

export default DrawerTab;
