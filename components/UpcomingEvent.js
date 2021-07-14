import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { useCollection } from "../hooks/firestore";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../providers/user";

const UpcomingEvent = () => {
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

  // console.log("USER", user);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ ...globalStyles.card, backgroundColor: colors.card }}>
          <Text style={{ color: colors.text, fontSize: 16 }}>
            Upcoming Events
          </Text>
        </View>

        <View style={{ ...globalStyles.card, backgroundColor: colors.card }}>
          <Text style={{ color: colors.text, fontSize: 16 }}>Show All</Text>
        </View>
      </View>
      <View style={{ width: "100%", padding: SIZE.width * 0.7 }}>
        <FlatList
          ListEmptyComponent={() => (
            <View
              style={{
                borderWidth: 2,
                width: SIZE.screenWidth * 0.9,
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
              }}
            >
              <Ionicons name="american-football" size={34} color="white" />
              <Text
                style={{
                  ...globalStyles.txt,
                  fontSize: 20,
                  // height: SIZE.he,
                }}
              >
                {item.title}{" "}
              </Text>
              <Text
                style={{
                  ...globalStyles.txt,
                  fontSize: 17,
                  // marginTop: 5,
                  color: "lightgray",
                }}
              >
                {item.startingDate.toDate().toLocaleDateString()}{" "}
              </Text>
              <TouchableOpacity
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
                  Join
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default UpcomingEvent;
const styles = StyleSheet.create({
  events: {
    // padding: SIZE.width * 0.7,
    marginHorizontal: 6,
    height: SIZE.screenHeight * 0.23,
    width: SIZE.screenWidth * 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
