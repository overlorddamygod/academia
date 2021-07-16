import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useCollectionLazy } from "../hooks/firestore";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import CustomFlatList from "../components/CustomFlatList";

const dummyLists = [
  { notifications: "Sandeep Maharjan Messaged You .", date: "20-3-23" },
  { notifications: "Academia Posted Event", date: "20-1-1" },
  { notifications: "Result is Updated", date: "20-1-18" },
  { notifications: "Academia Posted Compotetition", date: "20-1-7" },
];

const Notifications = ({ navigation }) => {
  const [lists, setLists] = useState(dummyLists);
  const { colors } = useTheme();

  const query = firestore()
    .collection("user")
    .doc(auth().currentUser.uid)
    .collection("notification");

  const {
    value: notifications,
    loading,
    error,
    getMoreData,
    onRefresh,
    setQuery,
  } = useCollectionLazy(query, "createdAt", "desc", 10);
  return (
    <>
      <Header
        title="Notifications"
        navigation={navigation}
        showBackMenu={false}
      />
      <View>
        <View style={{ marginTop: 10 }}>
          <CustomFlatList
            refreshing={loading}
            onRefresh={onRefresh}
            ListEmptyComponentText={"No notifications"}
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 10,
                  backgroundColor: colors.card,
                  borderRadius: 8,
                  paddingHorizontal: SIZE.width,
                  paddingVertical: SIZE.height * 0.2,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="notifications-circle"
                  size={40}
                  color={colors.text}
                />
                <View
                  style={{ flex: 1, marginLeft: 20, justifyContent: "center" }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: "bold",
                      fontSize: 20,
                      marginVertical: 2,
                      width: "99%",
                    }}
                  >
                    {item.title}
                  </Text>
                  {!!item.body && (
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 15,
                        marginVertical: 2,
                        width: "99%",
                      }}
                    >
                      {item.body}
                    </Text>
                  )}
                  <Text style={{ ...globalStyles.midText, color: "#888" }}>
                    {item.createdAt.toDate().toDateString()}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
