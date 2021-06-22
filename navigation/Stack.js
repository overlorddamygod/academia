import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Gallery from "../screens/Gallery";
import StudentList from "../screens/StudentList";
import AnnouncementScreen from "../screens/Announcement";
import TeacherList from "../screens/TeachersList";
import Chat from "../screens/Chat";
import Notifications from "../screens/Notifications";
import COLORS from "../styles/colors";
import ConnectModal from "../screens/ConnectModal";
import Settings from "../screens/Settings";
import Materials from "../screens/Materials";


const HomeStack = createStackNavigator();
const AnnounceStack = createStackNavigator();
const GalleryStack = createStackNavigator();
const StudentStack = createStackNavigator();
const TeacherStack = createStackNavigator();
const ChatStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const ModalStack = createStackNavigator();
const SettingStack = createStackNavigator()
const MaterialStack = createStackNavigator()



export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

export function AnnounceStackScreen() {
  return (
    <AnnounceStack.Navigator
      screenOptions={{
       headerShown:false
      }}
    >
      <AnnounceStack.Screen
        name="Announcements"
        component={AnnouncementScreen}
      />
    </AnnounceStack.Navigator>
  );
}

export function GalleryStackScreen() {
  return (
    <GalleryStack.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <GalleryStack.Screen name="Gallery" component={Gallery} />
    </GalleryStack.Navigator>
  );
}

export function ChatStackScreen() {
  return (
    <ChatStack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <ChatStack.Screen name="Chat" component={Chat} />
    </ChatStack.Navigator>
  );
}

export function StudentStackScreen() {
  return (
    <StudentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.main,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: "white",
      headerTitleAlign: "center"
    }}
    >
      <StudentStack.Screen name="Students" component={StudentList} />
    </StudentStack.Navigator>
  );
}

export function TeacherStackScreen() {
  return (
    <TeacherStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTintColor: "white",
        headerTitleAlign: "center"
      }}
    >
      <TeacherStack.Screen name="Teachers" component={TeacherList} />
    </TeacherStack.Navigator>
  );
}

export function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <NotificationsStack.Screen
        name="Notifications"
        component={Notifications}
      />
    </NotificationsStack.Navigator>
  );
}



export function ModalStackScreen() {
  return (
    <ModalStack.Navigator
        screenOptions={{
          headerShown:false
      }}
    >
      <ModalStack.Screen name="ConnectModal" component={ConnectModal} />
      <ModalStack.Screen name="Teacher" component={TeacherStackScreen} />
      <ModalStack.Screen name="Student" component={StudentStackScreen} />
    </ModalStack.Navigator>
  );
}

export function SettingStackScreen() {
  return (
    <SettingStack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <SettingStack.Screen
        name="Settings"
        component={Settings}
      />
    </SettingStack.Navigator>
  );
}

export function MaterialStackScreen() {
  return (
    <MaterialStack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <MaterialStack.Screen
        name="Materials"
        component={Materials}
      />
    </MaterialStack.Navigator>
  );
}


