import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Gallery from "../screens/Gallery";
import StudentList from "../screens/StudentList";
import AnnouncementScreen from "../screens/Announcement";
import TeacherList from "../screens/TeachersList";
import Chat from "../screens/Chat";
import Notifications from "../screens/Notifications";
import CalendarScreen from "../screens/calendar";
import IndividualChat from "../screens/IndividualChat";
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
const SettingStack = createStackNavigator()
const MaterialStack = createStackNavigator()

const CalendarStack = createStackNavigator();

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
        headerShown: false,
      }}
    >
      <AnnounceStack.Screen
        name="Announcements"
        component={AnnouncementScreen}
      />
    </AnnounceStack.Navigator>
  )
    };

export function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
      />
    </CalendarStack.Navigator>
  );
}

export function GalleryStackScreen() {
  return (
    <GalleryStack.Navigator
      screenOptions={{
        headerShown: false,
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
        headerShown: false,
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
        headerTitleAlign: "center",
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
        headerTitleAlign: "center",
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
        headerShown: false,
      }}
    >
      <NotificationsStack.Screen
        name="Notifications"
        component={Notifications}
      />
    </NotificationsStack.Navigator>
  );
}

export function ModalStackScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent Connect Screen from opening
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);
  return <></>;
}

export function SettingStackScreen() {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingStack.Screen name="Settings" component={Settings} />
    </SettingStack.Navigator>
  );
}

export function MaterialStackScreen() {
  return (
    <MaterialStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MaterialStack.Screen name="Materials" component={Materials} />
    </MaterialStack.Navigator>
  );
}


