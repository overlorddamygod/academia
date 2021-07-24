import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import Hyperlink from "react-native-hyperlink";
import CustomFlatList from "../components/CustomFlatList";
import Header from "../components/Header";
import { useCollectionLazy } from "../hooks/firestore";
import { useUserContext } from "../providers/user";
import { globalStyles, SIZE } from "../styles/globalStyle";

const Notifications = ({ navigation }) => {
  const { clearNotificationCount } = useUserContext();

  const query = firestore()
    .collection("user")
    .doc(auth().currentUser.uid)
    .collection("notification");

  const {
    value: notifications,
    loading,
    getMoreData,
    onRefresh,
    error,
  } = useCollectionLazy(query, "createdAt", "desc", 10);

  useEffect(() => {
    if (!loading && !error) {
      clearNotificationCount();
    }
  }, [loading, error]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Notifications"
        navigation={navigation}
        showBackMenu={false}
      />
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 10 }}>
          <CustomFlatList
            refreshing={loading}
            onRefresh={onRefresh}
            ListEmptyComponentText={"No notifications"}
            onEndReached={getMoreData}
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <NotificationCard item={item} />}
          />
        </View>
      </View>
    </View>
  );
};

export default Notifications;

const NotificationCard = ({ item }) => {
  const { colors } = useTheme();
  const [showBody, setShowBody] = useState(false);

  return (
    <TouchableOpacity
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
      activeOpacity={0.5}
      onPress={() => setShowBody(!showBody)}
    >
      <Ionicons name="notifications-circle" size={40} color={colors.text} />
      <View style={{ flex: 1, marginLeft: 20, justifyContent: "center" }}>
        <Text
          style={{
            color: colors.text,
            fontWeight: "bold",
            fontSize: 16,
            marginVertical: 2,
            width: "99%",
          }}
        >
          {item.title}
        </Text>
        {!!item.body && (
          <Hyperlink
            linkStyle={{ color: "#2980b9", textDecorationLine: "underline" }}
            onPress={(url, text) => {
              Linking.openURL(url);
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 15,
                marginVertical: 2,
                width: "99%",
              }}
              numberOfLines={showBody ? 0 : 2}
            >
              {item.body}
            </Text>
          </Hyperlink>
        )}
        <Text style={{ ...globalStyles.midText, color: "#888" }}>
          {item.createdAt.toDate().toDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
