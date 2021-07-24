import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomFlatList from "../components/CustomFlatList";
import Header from "../components/Header";
import { useUserContext } from "../providers/user";
import { globalStyles, SIZE } from "../styles/globalStyle";

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
        data={conversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt)}
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => {
          const chat = getChatName(item, user.id);
          return (
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
                  flex: 1,
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("IndividualChat", {
                    id: item.docId,
                    name: chat.username,
                    photoUrl: chat.photoUrl,
                    conversation: item,
                  });
                }}
              >
                <View>
                  <Image
                    source={{
                      uri: chat.photoUrl || "https://i.ibb.co/fQNrT54/male.png",
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
                    {chat.username}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "grey",
                        width: "60%",
                      }}
                      numberOfLines={1}
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
          );
        }}
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
