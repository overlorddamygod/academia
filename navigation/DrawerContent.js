import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import COLORS from "../styles/colors";

import DrawerMenu from "../components/DrawerMenu";
import { authStyles } from "../styles/authStyle";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const DrawerContent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#414567" }}>
      <View
        style={{
          height: 200,
          backgroundColor: "#636996",
          borderBottomRightRadius: 90,
        }}
      >
        <View style={{ flex: 1, zIndex: 20, padding: 30 }}>
          <View style={{ marginTop: 20 }}>
            <Text style={globalStyles.txt}>Naruto Uzumaki</Text>
            <Text style={{ color: "lightgray", fontSize: 18, lineHeight: 30 }}>
              3rd Semester
            </Text>
          </View>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
            }}
            style={styles.avatar}
          />
        </View>
      </View>
      {/* lower part */}
      <DrawerContentScrollView style={{ flex: 1 }}>
        <View style={{ paddingTop: 10, alignItems: "center" }}>
          <View style={{ marginTop: 40, flexDirection: "row" }}>
            <DrawerMenu
              background="#8A54BA"
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
              background="#00B0DD"
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
              background="#555B95"
              title="Events"
              iconName="event"
              iconProvider="MaterialIcon"
              navigation={navigation}
              screen="Announcements"
            />
            <DrawerMenu
              background="#714DBE"
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
    height: 100,
    width: 100,
    position: "absolute",
    bottom: -40,
    left: 80,
    borderRadius: 50,
    resizeMode: "cover",
  },
  menuDiv: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "space-evenly",
    alignItems: "center",
  },
});
