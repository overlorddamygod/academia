import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Header from "../components/Header";

const AnnouncementScreen = ({navigation}) => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [selectedTag, setSelectedTag] = useState("All Items");

  const items = [
    "All Items",
    "Exams",
    "Classes",
    "Holiday",
    "Result",
    "Project",
  ];

  return (
    <>
     <Header title="Announcement" navigation={navigation}/>
    <View style={{ flex: 1 }}>
      <View
        style={{ height: StatusBar.currentHeight, backgroundColor: "#4C367B" }}
      ></View>
      {/* <AppBar title="Announcements"></AppBar> */}
      <View style={{ ...styles.tags, ...styles.shadow }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ height: "100%" }}
        >
          {items.map((itemName, i) => {
            return (
              <Item
                name={itemName}
                active={selectedTag == itemName}
                onPress={setSelectedTag}
                key={i}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={{ marginTop: 30, flex: 1 }}>
        <FlatList
          data={announcements.filter((announcement) =>
            selectedTag == "All Items" ? true: announcement.tag == selectedTag
          )}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Announcement data={item} key={item.title} />
          )}
        />
      </View>
      
    </View>
    </>
  );
};

export default AnnouncementScreen;

const announcementsData = [
  {
    tag: "Exams",
    title: "1st Semester Exam scheduled on 19th June",
    time: "10:30 AM",
  },
  {
    tag: "Holiday",
    title: "Ghode Jatra Holiday ",
    time: "5:20 AM",
  },
  {
    tag: "Classes",
    title: "Project Classes starting from 22th June, 2021",
    time: "9:00 AM",
  },
];

const itemTypes = {
  Exams: "#F05479",
  Classes: "#EBA52A",
  Holiday: "#9336E7",
};

const Announcement = ({
  data = { tag: "Classes", title: "Lorem Ipsum", time: "10:00 PM" },
}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        ...styles.shadow,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: itemTypes[data.tag],
          paddingHorizontal: 5,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white" }}>{data.tag}</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginVertical: 8 }}>
        {data.title}
      </Text>
      <Text style={{ color: "#ABABAB" }}>{data.time}</Text>
    </View>
  );
};

const Item = ({ name, active, onPress }) => {
  return (
    <TouchableOpacity
      style={{ alignItems: "center", textAlign: "center", marginRight: 15 }}
      onPress={() => {
        onPress(name);
      }}
    >
      <Text
        style={{
          fontWeight: active ? "bold" : "normal",
          color: !active ? "#ABABAB" : "black",
          alignItems: "center",
        }}
      >
        {name}
      </Text>
      {active && (
        <View style={{ width: 10, height: 3, backgroundColor: "black" }}></View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    height: 60,
    marginTop: -30,
    marginLeft: 40,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
