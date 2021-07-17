import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import { useCollectionLazy } from "../hooks/firestore";
import COLORS, { tagColor } from "../styles/colors";
import Hyperlink from "react-native-hyperlink";
import { globalStyles, SIZE } from "../styles/globalStyle";
import CustomFlatList from "../components/CustomFlatList";

const AnnouncementScreen = ({ navigation }) => {
  const [selectedTag, setSelectedTag] = useState("All Items");

  const query = firestore().collection("announcementTemp1");

  const {
    value: announcements,
    loading,
    error,
    getMoreData,
    onRefresh,
    setQuery,
  } = useCollectionLazy(query, "createdAt", "desc", 10);

  const { colors } = useTheme();

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
      <Header title="Notices" navigation={navigation} showSidebar={false} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: colors.mainblue,
          }}
        ></View>
        {/* <AppBar title="Announcements"></AppBar> */}
        <View
          style={{
            ...styles.tags,
            ...styles.shadow,
            backgroundColor: colors.card,
          }}
        >
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
                  onPress={(item) => {
                    setSelectedTag(item);
                  }}
                  key={i}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={{ marginTop: 30, flex: 1 }}>
          <CustomFlatList
            refreshing={loading}
            onRefresh={onRefresh}
            onEndReached={getMoreData}
            onEndReachedThreshold={0.1}
            data={announcements.filter((announcement) =>
              selectedTag == "All Items"
                ? "true"
                : announcement.tag == selectedTag
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Announcement data={item} />}
            ListEmptyComponentText={"No announcements"}
          />
        </View>
      </View>
    </>
  );
};

export default AnnouncementScreen;

const Announcement = ({
  data = { tag: "Classes", title: "Lorem Ipsum", time: "10:00 PM" },
}) => {
  const { colors } = useTheme();

  const [showBody, setShowBody] = useState(false);
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: colors.card,
        borderRadius: 8,
        padding: 8,
        ...styles.shadow,
      }}
      onPress={() => {
        setShowBody(!showBody);
      }}
      underlayColor="#DDDDDD"
    >
      <>
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: tagColor[data.tag] || tagColor["Classes"],
            paddingHorizontal: 5,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: COLORS.white, padding: 3 }}>{data.tag}</Text>
        </View>
        <Text
          style={{
            color: colors.text,
            fontWeight: "bold",
            fontSize: 20,
            marginVertical: 8,
          }}
        >
          {data.title || " "}
        </Text>

        {!!data.body && (
          <Hyperlink
            linkStyle={{ color: "#2980b9", textDecorationLine: "underline" }}
            onPress={(url, text) => {
              Linking.openURL(url);
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
                marginVertical: 8,
              }}
              numberOfLines={showBody ? 0 : 1}
            >
              {data.body || " "}
            </Text>
          </Hyperlink>
        )}

        <Text style={{ color: "#ABABAB" }}>
          {data.createdAt.toDate().toLocaleDateString()}
        </Text>
      </>
    </TouchableOpacity>
  );
};

const Item = ({ name, active, onPress }) => {
  const { colors } = useTheme();
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
