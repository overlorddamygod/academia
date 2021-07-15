import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useCollectionLazy } from "../hooks/firestore";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import CustomCard from "../components/CustomCard";

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
        <View>
          <FlatList
            refreshing={loading}
            onRefresh={onRefresh}
            ListEmptyComponent={() => {
              return (
                <View style={{ alignItems: "center", marginTop: 50 }}>
                  <Text style={{ color: colors.text }}>No notifications</Text>
                </View>
              );
            }}
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CustomCard>
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
              </CustomCard>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Notifications;
