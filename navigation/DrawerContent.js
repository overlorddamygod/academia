import auth from "@react-native-firebase/auth";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DrawerMenu from "../components/DrawerMenu";
import { useUserContext } from "../providers/user";
import COLORS from "../styles/colors";
import { globalStyles, SIZE } from "../styles/globalStyle";

const DrawerContent = ({ navigation }) => {
  const { user, logout: _logout } = useUserContext();
  const { colors } = useTheme();
  const logout = () => {
    _logout();
    navigation.closeDrawer();
  };

  const googleData = auth().currentUser.providerData.filter(
    (provider) => provider.providerId == "google.com"
  );

  let googlePhotoUrl =
    googleData.length > 0
      ? googleData[0].photoURL
      : "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png";

  return (
    <View style={{ flex: 1, backgroundColor: colors.drawerBackground }}>
      <View
        style={{
          height: SIZE.height * 5,
          backgroundColor: colors.upcoming,
          borderBottomRightRadius: 90,
        }}
      >
        <View style={{ flex: 1, zIndex: 20, padding: SIZE.height * 0.8 }}>
          <View style={{ marginTop: SIZE.height * 0.1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              style={styles.avatar}
            />
            <Text style={globalStyles.txt}>{user.username || ""}</Text>
            <Text
              style={{
                color: "lightgray",
                fontSize: 18,
                lineHeight: SIZE.height * 0.7,
              }}
            >
              {user.title}
            </Text>
            {user.title == "Student" && (
              <Text
                style={{
                  color: "lightgray",
                  fontSize: 18,
                  lineHeight: SIZE.height * 0.7,
                }}
              >
                Semester : {user.semester}
              </Text>
            )}
          </View>
          <Image
            source={{
              uri: googlePhotoUrl,
            }}
            style={styles.avatar}
          />
        </View>
      </View>
      {/* lower part */}
      <DrawerContentScrollView
        style={{ flex: 1, paddingBottom: SIZE.height * 0.5 }}
      >
        <View style={{ paddingTop: SIZE.height * 0.25, alignItems: "center" }}>
          <View style={{ marginTop: SIZE.height, flexDirection: "row" }}>
            <DrawerMenu
              background="#757BBD"
              title="Gallery"
              iconName="image"
              iconProvider="Feather"
              navigation={navigation}
              screen="Gallery"
            />

            <DrawerMenu
              background="#6066A1"
              title="Settings"
              iconName="settings"
              iconProvider="Feather"
              navigation={navigation}
              screen="Settings"
            />
          </View>
          <View style={styles.menuDiv}>
            <DrawerMenu
              background="#525892"
              title="Courses"
              iconName="library-books"
              iconProvider="MaterialIcon"
              navigation={navigation}
              screen="Materials"
            />
            <DrawerMenu
              background="#636996"
              title="Notice"
              iconName="notification"
              iconProvider="AntDesign"
              navigation={navigation}
              screen="Announcements"
            />
          </View>
          <View style={styles.menuDiv}>
            <DrawerMenu
              background="#6066A1"
              title="Materials"
              iconName="event"
              iconProvider="MaterialIcon"
              navigation={navigation}
              screen="Materials"
            />
            <DrawerMenu
              background="#757BBD"
              title="College Info"
              iconName="box"
              iconProvider="Feather"
              navigation={navigation}
              screen="AboutCollege"
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: SIZE.height / 3,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={logout}
          style={{
            width: "50%",
            backgroundColor: COLORS.mainred,
            borderRadius: 4,
            paddingVertical: SIZE.height * 0.2,
          }}
        >
          <Text style={{ ...globalStyles.txt, textAlign: "center" }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerContent;
const styles = StyleSheet.create({
  avatar: {
    height: SIZE.height * 2.5,
    width: SIZE.width * 5,
    borderRadius: 50,
    resizeMode: "cover",
    position: "absolute",
    bottom: -SIZE.height * 1,
    left: SIZE.width * 4,
  },
  menuDiv: {
    marginTop: SIZE.height / 4,
    flexDirection: "row",
    alignItems: "space-evenly",
    alignItems: "center",
  },
});
