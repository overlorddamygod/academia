import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import COLORS from "../styles/colors";
import DrawerMenu from "../components/DrawerMenu";
import { authStyles } from "../styles/authStyle";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useUserContext } from "../providers/user";
import { SIZE } from "../styles/globalStyle";


const DrawerContent = ({ navigation }) => {
  const { user, logout: _logout } = useUserContext();

  const logout = () => {
    _logout();
    navigation.closeDrawer();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#414567" }}>
      <View
        style={{
          height: SIZE.height * 5,
          backgroundColor: "#636996",
          borderBottomRightRadius: 90,
        }}
      >
        <View style={{ flex: 1, zIndex: 20, padding: SIZE.height * 0.8 }}>

          <View style={{alignItems:"center",marginTop: SIZE.height }}>
            <Image
              source={{
                uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
              }}
              style={styles.avatar}
            />
            <Text style={globalStyles.txt}>{user.username || ""}</Text>
            <Text style={{ color: "lightgray", fontSize: 18, lineHeight: SIZE.height * 0.7 }}>
              {user.title}
            </Text>
            <Text style={{ color: "lightgray", fontSize: 18, lineHeight: SIZE.height * 0.7 }}>
              Semester : {user.semester}
            </Text>
          </View>

        </View>
      </View>
      {/* lower part */}
      <DrawerContentScrollView style={{ flex: 1,paddingBottom:SIZE.height * 0.5 }}>
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
              title="Materials"
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
              title="Events"
              iconName="event"
              iconProvider="MaterialIcon"
              navigation={navigation}
              screen="Announcements"
            />
            <DrawerMenu
              background="#757BBD"
              title="Settings"
              iconName="settings"
              iconProvider="Feather"
              navigation={navigation}
              screen="Settings"
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={logout}
          style={{ ...authStyles.btn, backgroundColor: COLORS.mainred }}
        >
          <Text style={globalStyles.txt}>Log Out</Text>
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
  },
  menuDiv: {
    marginTop: SIZE.height / 4,
    flexDirection: "row",
    alignItems: "space-evenly",
    alignItems: "center",
  },
});
