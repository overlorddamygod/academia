import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
} from "react-native";
import Header from "../components/Header";
import { useUserContext } from "../providers/user";
import { globalStyles, SIZE } from "../styles/globalStyle";
import CustomFlatList from "../components/CustomFlatList";
import moment from "moment";

const Chat = ({ navigation }) => {
  const { user } = useUserContext();
  const [conversations, setConversations] = useState([]);
  const { colors } = useTheme();
  const collectionRef = firestore()
    .collection("conversation")
    .where("participants", "array-contains", user.id);

  // const conversationRef = database().ref(`/conversations`).where("participants","")

  useEffect(() => {
    const unsubscribe = collectionRef.onSnapshot(
      { includeMetadataChanges: true },
      (querySnapshot) => {
        setConversations(
          querySnapshot.docs.map((d) => ({ docId: d.id, ...d.data() }))
        );
        console.log(conversations);
      },
      (error) => console.error(error)
    );

    return unsubscribe;
  }, []);
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Header
        showBackMenu={false}
        title="Message People"
        navigation={navigation}
      />

      <CustomFlatList
        ListEmptyComponentText={"No conversations"}
        data={conversations}
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: colors.card,
                marginHorizontal: SIZE.width,
                marginVertical: SIZE.height * 0.2,
                paddingHorizontal: SIZE.width * 1,
                paddingVertical: SIZE.height * 0.3,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("IndividualChat", {
                  id: item.docId,
                  name: getChatName(item, user.id).username,
                  photoUrl: getChatName(item, user.id).photoUrl,
                  conversation: item,
                });
              }}
            >
              <View>
                <Image
                  source={{
                    uri:
                      getChatName(item, user.id).photoUrl ||
                      "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
                  }}
                  style={globalStyles.smallavatar}
                />
              </View>
              <View style={{ marginLeft: SIZE.width, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text,
                  }}
                >
                  {getChatName(item, user.id).username}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "grey",
                    }}
                  >
                    {item.lastMessage || "Start a conversation"}
                  </Text>
                  {!!item.lastMessageAt && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "grey",
                      }}
                    >
                      {moment(item.lastMessageAt).fromNow() || " "}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
};

export default Chat;

const getChatName = (convo, userId) => {
  return convo.group
    ? convo.name
    : convo.p[convo.participants.filter((id) => id != userId)[0]];
};
