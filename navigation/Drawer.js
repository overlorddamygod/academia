import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React, { useContext } from "react";
import { ThemeContext } from "../components/Theme";
import AboutCollege from "../screens/AboutCollege";
import DrawerContent from "./DrawerContent";
import MainStack from "./Main";
import {
  AnnounceStackScreen,
  DownloadStackScreen,
  EditProfileScreen,
  GalleryStackScreen,
  HomeStackScreen,
  MaterialStackScreen,
  PersonDetailStackScreen,
  SettingStackScreen,
  SubjectStackScreen,
  VideoStackScreen,
} from "./Stack";

const Drawer = createDrawerNavigator();

const DrawerTab = () => {
  const { isDark } = useContext(ThemeContext);
  const LightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#F0F1F2",
      card: "white",
      btn: "#583EFF",
      msgIcon: "black",
      mainblue: "#403b80",
      buttomtab: "#0E243F",
      border: "lightgray",
      upcoming: "#515a8a",
      drawerBackground: "#414567",
      dialogs: "#202336",
      midBox: "#edf0f5",
      searchDiv: "white",
      secondText:"#666",
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#191b2a",
      card: "#30354d",
      btn: "#6765c2",
      msgIcon: "#393861",
      mainblue: "#343954",
      buttomtab: "#1e1b2e",
      border: "#3e435c",
      upcoming: "#262a3d",
      drawerBackground: "#191b2a",
      dialogs: "#191b2a",
      midBox: "#212538",
      searchDiv: "#39405c",
      secondText:"lightgray",
      
    },
  };

  const themes = isDark ? CustomDarkTheme : LightTheme;
  return (
    <NavigationContainer theme={themes}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Home"
      >
        {/* Contains Buttom tab navigator . */}
        <Drawer.Screen name="Home" component={MainStack} />
        <Drawer.Screen name="Settings" component={SettingStackScreen} />
        <Drawer.Screen name="Gallery" component={GalleryStackScreen} />
        <Drawer.Screen name="Video" component={VideoStackScreen} />
        <Drawer.Screen name="Announcements" component={AnnounceStackScreen} />
        <Drawer.Screen name="Materials" component={MaterialStackScreen} />
        <Drawer.Screen name="GoHome" component={HomeStackScreen} />
        <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
        <Drawer.Screen name="Subjects" component={SubjectStackScreen} />
        <Drawer.Screen name="AboutCollege" component={AboutCollege} />
        <Drawer.Screen name="Downloads" component={DownloadStackScreen} />
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
