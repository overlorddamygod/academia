import React, { useState, useEffect } from "react";
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
import firestore from "@react-native-firebase/firestore";
import { useTheme } from '@react-navigation/native';
const AnnouncementScreen = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All Items");
  const [refreshing, setRefreshing] = useState(false);
  const {colors} = useTheme()
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    setRefreshing(true);
    firestore()
      .collection("announcement")
      .get()
      .then((snapshot) => {
        setAnnouncements(
          snapshot.docs.map((announcement) => {
            const ann = announcement.data();
            if (ann.time) {
              const date = new Date(ann.time.seconds * 1000);
              ann.time = `${date.toLocaleTimeString()} ${date.toDateString()}`;
            }
            ann.id = announcement.id;
            return ann;
          })
        );
        setRefreshing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onRefresh = () => {
    fetchAnnouncements();
  };

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
      <Header title="Announcement" navigation={navigation} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: colors.background,
          }}
        ></View>
        {/* <AppBar title="Announcements"></AppBar> */}
        <View style={{ ...styles.tags, ...styles.shadow,backgroundColor:colors.card}}>
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
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={announcements.filter((announcement) =>
              selectedTag == "All Items"
                ? true
                : announcement.tag == selectedTag
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Announcement data={item} />}
          />
        </View>
      </View>
    </>
  );
};

export default AnnouncementScreen;

const itemTypes = {
  Exams: "#F05479",
  Classes: "#EBA52A",
  Holiday: "#9336E7",
};

const Announcement = ({
  
  data = { tag: "Classes", title: "Lorem Ipsum", time: "10:00 PM" },
}) => {
  const {colors} =useTheme();
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: colors.card,
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
        <Text style={{ color: colors.text ,padding:3}}>{data.tag}</Text>
      </View>
      <Text style={{color: colors.text , fontWeight: "bold", fontSize: 20, marginVertical: 8 }}>
        {data.title}
      </Text>
      <Text style={{ color: "#ABABAB" }}>{data.time}</Text>
    </View>
  );
};

const Item = ({ name, active, onPress }) => {
  const {colors} = useTheme();
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
          color: !active ? "#ABABAB" : colors.text,
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
