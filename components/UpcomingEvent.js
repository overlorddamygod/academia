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

const UpcomingEvent = () => {
  const { colors } = useTheme();
  const [events, setEvents] = useState([
    { name: "App Event", date: "May 12" },
    { name: "Sports Event", date: "May 24" },
    { name: "Dancer Event", date: "June 3" },
  ]);
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ ...globalStyles.card, backgroundColor: colors.card }}>
          <Text style={{ color: colors.text, fontSize: 16 }}>
            Upcoming Event
          </Text>
        </View>

        <View style={{ ...globalStyles.card, backgroundColor: colors.card }}>
          <Text style={{ color: colors.text, fontSize: 16 }}>Show All</Text>
        </View>
      </View>
      <View style={{ width: "100%", padding: SIZE.width * 0.7 }}>
        <FlatList
          horizontal={true}
          data={events}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View
              style={{
                ...globalStyles.shadow,
                ...styles.events,
                backgroundColor: colors.upcoming,
              }}
            >
              <Ionicons name="american-football" size={34} color="white" />
              <Text style={{ ...globalStyles.txt, fontSize: 20 }}>
                {item.name}{" "}
              </Text>
              <Text
                style={{
                  ...globalStyles.txt,
                  fontSize: 17,
                  // marginTop: 5,
                  color: "lightgray",
                }}
              >
                {item.date}{" "}
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
