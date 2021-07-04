import React,{useContext} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import DrawerContent from "./DrawerContent";
import { ThemeContext } from "../components/Theme";
import MainStack from "./Main";
import {
  AnnounceStackScreen,
  GalleryStackScreen,
  MaterialStackScreen,
  SettingStackScreen,
  PersonDetailStackScreen,
  HomeStackScreen,
  SubjectStackScreen,
} from "./Stack";



const Drawer = createDrawerNavigator();

const DrawerTab = () => {
  const {isDark} = useContext(ThemeContext);
  // 1e1b2e #191b2a 262a3d c05fff 232232
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
    upcoming:'#323752',
    drawerBackground:'#414567',
    dialogs:'#202336',
    midBox:'#edf0f5'
  }}

  const CustomDarkTheme = {
    ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    background:"#191b2a",
    card:'#30354d',
    btn:'#6765c2',
    msgIcon:'#393861',
    mainblue:'#343954',
    buttomtab:'#1e1b2e',
    border:'#2b2e3d',
    upcoming:'#262a3d',
    drawerBackground:'#191b2a',
    dialogs:'#191b2a',
    midBox:'#212538'
  }}

  const themes = isDark?CustomDarkTheme:LightTheme;
  return (
   
    <NavigationContainer theme={themes}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Home"
      >
        {/* Contains Buttom tab navigator . */}
        <Drawer.Screen name="Home" component={MainStack}/>
        <Drawer.Screen name="Settings" component={SettingStackScreen} />
        <Drawer.Screen name="Gallery" component={GalleryStackScreen} />
        <Drawer.Screen name="Announcements" component={AnnounceStackScreen} />
        <Drawer.Screen name="Materials" component={MaterialStackScreen} />
        <Drawer.Screen name="GoHome" component={HomeStackScreen} />
        
        <Drawer.Screen name="Subjects" component={SubjectStackScreen} />
        {/* <Drawer.Screen name="Login" component={Login} /> */}
        {/* <Drawer.Screen name="Register" component={Register} /> */}
        {/* <Drawer.Screen name="IndividualChat" component={IndividualChat} /> */}
        <Drawer.Screen
          name="PersonDetail"
          component={PersonDetailStackScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
};

export default DrawerTab;
