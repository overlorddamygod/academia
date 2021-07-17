import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { useCollection } from "../hooks/firestore";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../providers/user";

export const route = [
  {
    name: "Find Subject's Course",
    screen: "Materials",
    btnName: "Courses",
  },
  {
    name: "Find Materials ",
    screen: "Downloads",
    btnName: "Materials",
  },
  {
    name: "Check the Calendar ",
    screen: "Calendar",
    btnName: "Calendar",
  },
  {
    name: "Learn More about us",
    screen: "AboutCollege",
    btnName: "About",
  },
  { name: "Customize your Settings", screen: "Settings", btnName: "Settings" },
];

const UpcomingEvent = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useUserContext();

  const to = ["All", user.title];
  if (user.title == "Student") {
    to.push(...[user.faculty, `${user.faculty} ${user.semester}`]);
  }

  const [events] = useCollection(
    firestore()
      .collection("announcementTemp1")
      .where("addToCalendar", "==", true)
      .where("to", "array-contains-any", to)
      .where("startingDate", ">=", new Date())
  );

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            ...globalStyles.card,
            backgroundColor: colors.card,
            ...{ marginRight: SIZE.width * 0.8 },
          }}
        >
          <Text style={{ color: colors.text, fontSize: 16 }}>
            Ongoing Events
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Announcements", { screen: "Announcements" });
          }}
          style={{ ...globalStyles.card, backgroundColor: colors.card }}
        >
          <Text style={{ color: colors.text, fontSize: 16 }}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <FlatList
          ListEmptyComponent={() => (
            <View
              style={{
                width: SIZE.screenWidth * 0.8,
                height: SIZE.height,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: colors.text, textAlign: "center" }}>
                No upcoming events
              </Text>
            </View>
          )}
          horizontal={true}
          data={events}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                ...globalStyles.shadow,
                ...styles.events,
                backgroundColor: colors.upcoming,
                position: "relative",
              }}
            >
              <MaterialIcons
                name="event-available"
                size={34}
                style={{
                  position: "absolute",
                  top: SIZE.width * 0.3,
                  right: SIZE.width * 0.3,
                }}
                color="white"
              />
              <Text
                style={{
                  ...globalStyles.txt,
                  fontSize: SIZE.width * 1.1,
                  textAlign: "center",
                  // height: SIZE.he,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  ...globalStyles.txt,
                  fontSize: 15,
                  marginTop: 3,
                  color: "lightgray",
                }}
              >
                {item.startingDate.toDate().toLocaleDateString()}
              </Text>
              <TouchableOpacity
              onPress={
                ()=>navigation.navigate("Announcements", { screen: "Announcements" })
              }
                activeOpacity={0.5}
                style={{
                  backgroundColor: "#8d81db",
                  padding: 8,
                  marginTop: SIZE.height * 0.25,
                  width: SIZE.screenWidth * 0.2,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ fontSize: 17, color: "white", textAlign: "center" }}
                >
                  All
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export const InfoCard = ({ randomRoute, navigation }) => {
  const { name, screen, btnName } = randomRoute;
  const { colors } = useTheme();
  return (
    <View
      style={{
        ...styles.infocard,
        backgroundColor: colors.homeCard,
        paddingVertical: SIZE.height * 0.3,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: SIZE.width * 1,
            fontWeight: "bold",
          }}
        >
          Welcome to
        </Text>
        <Text style={{ color: colors.text, fontSize: SIZE.width }}>
          Academia,
        </Text>
        <Text
          style={{
            marginTop: SIZE.width * 0.3,
            color: colors.secondText,
            fontSize: SIZE.width * 0.7,
            width: "80%",
          }}
        >
          {name}
        </Text>
        <TouchableOpacity
        activeOpacity={0.7}
          onPress={() => {
            navigation.navigate(`${screen}`, {
              screen: `${screen}`,
            });
          }}
          style={{
            ...globalStyles.btns,
            justifyContent: "space-around",
            marginTop: 6,
          }}
        >
          <Text style={{ color: "#fff" }}>{btnName}</Text>
          <AntDesign name="arrowright" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Image source={require("../images/future.png")} style={styles.image} />
    </View>
  );
};

export default UpcomingEvent;
const styles = StyleSheet.create({
  events: {
    padding: SIZE.width * 0.7,
    marginRight: 6,
    height: SIZE.height * 4.1,
    width: SIZE.screenWidth * 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  infocard: {
    // marginHorizontal: 6,
    // height: SIZE.screenHeight * 0.23,
    // width: SIZE.screenWidth * 0.9,
    backgroundColor: "#f7f7f7",
    borderRadius: SIZE.width,
    flexDirection: "row",
    paddingHorizontal: SIZE.width * 0.8,
    justifyContent: "space-around",
  },
  image: {
    height: "100%",
    width: SIZE.screenHeight * 0.2,
    resizeMode: "cover",
  },
});
