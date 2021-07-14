import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import AboutCollege from "../screens/AboutCollege";
import AnnouncementScreen from "../screens/Announcement";
import CalendarScreen from "../screens/Calendar";
import Chat from "../screens/Chat";
import downloadLink from "../screens/downloadLink";
import EditProfile from "../screens/EditProfile";
import Gallery from "../screens/Gallery";
import Home from "../screens/Home";
import Materials from "../screens/Materials";
import Notifications from "../screens/Notifications";
import Onboard from "../screens/Onboarding";
import PersonDetail from "../screens/PersonDetail";
import SendNotification from "../screens/SendNotification";
import Settings from "../screens/Settings";
import StudentList from "../screens/StudentList";
import Subject from "../screens/Subject";
import TeacherList from "../screens/TeachersList";
import Videos from "../screens/Video";

const HomeStack = createStackNavigator();
const AnnounceStack = createStackNavigator();
const GalleryStack = createStackNavigator();
const StudentStack = createStackNavigator();
const TeacherStack = createStackNavigator();
const ChatStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const SettingStack = createStackNavigator();
const MaterialStack = createStackNavigator();
const PersonDetailStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const SubjectStack = createStackNavigator();
const VideoStack = createStackNavigator();
const EditProfileStack = createStackNavigator();
const AboutCollegeStack = createStackNavigator();
const DownloadStack = createStackNavigator();
const OnboardStack = createStackNavigator();
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
  );
}

export function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CalendarStack.Screen name="Calendar" component={CalendarScreen} />
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
export function VideoStackScreen() {
  return (
    <VideoStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <VideoStack.Screen name="Video" component={Videos} />
    </VideoStack.Navigator>
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
        headerShown: false,
      }}
    >
      <StudentStack.Screen name="Students" component={StudentList} />
    </StudentStack.Navigator>
  );
}
export function PersonDetailStackScreen() {
  return (
    <PersonDetailStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PersonDetailStack.Screen name="PersonDetail" component={PersonDetail} />
      <PersonDetailStack.Screen
        name="SendNotification"
        component={SendNotification}
      />
    </PersonDetailStack.Navigator>
  );
}
export function TeacherStackScreen() {
  return (
    <TeacherStack.Navigator
      screenOptions={{
        headerShown: false,
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
export function EditProfileScreen() {
  return (
    <EditProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <EditProfileStack.Screen name="EditProfile" component={EditProfile} />
    </EditProfileStack.Navigator>
  );
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
export function AboutColegeStackScreen() {
  return (
    <AboutCollegeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AboutCollegeStack.Screen name="AboutCollege" component={AboutCollege} />
    </AboutCollegeStack.Navigator>
  );
}
export function SubjectStackScreen() {
  return (
    <MaterialStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MaterialStack.Screen name="Subjects" component={Subject} />
    </MaterialStack.Navigator>
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
export function DownloadStackScreen() {
  return (
    <DownloadStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DownloadStack.Screen name="Downloads" component={downloadLink} />
    </DownloadStack.Navigator>
  );
}
export function OnboardStackScreen() {
  return (
    <OnboardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardStack.Screen name="Onboard" component={Onboard} />
    </OnboardStack.Navigator>
  );
}
