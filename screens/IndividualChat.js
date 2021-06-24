import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../providers/user";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";
import { Feather } from "@expo/vector-icons";
import Hyperlink from "react-native-hyperlink";

const IndividualChat = ({ navigation, route: { params } }) => {
  const { id, name, conversation } = params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const flatlistRef = useRef();

  const collectionRef = firestore()
    .collection("conversation")
    .doc(`${id}`)
    .collection("message");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = collectionRef
      .orderBy("createdAt")
      .limitToLast(20)
      .onSnapshot(
        { includeMetadataChanges: true },
        (querySnapshot) => {
          setMessages(
            querySnapshot.docs.map((d) => ({ docId: d.id, ...d.data() }))
          );
          setLoading(false);
          if (messages.length > 0)
            flatlistRef.current.scrollToEnd({ animate: true });
        },
        (error) => console.error(error)
      );

    return unsubscribe;
  }, [id]);

  const sendMessage = () => {
    if (!message) return;
    collectionRef.add({
      userId: user.id,
      username: user.username,
      body: message,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  };

  const deleteMessage = (id) => {
    collectionRef.doc(id).update({
      deleted: true,
    });
  };

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Header
        title={name}
        navigation={navigation}
        showSidebar={false}
        showBackMenu
      />

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : messages.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Start A Conversation</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            ref={flatlistRef}
            contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
            keyExtractor={(item) => item.docId}
            renderItem={({ item }) => (
              <ChatMessage
                message={item}
                deleteMessage={() => {
                  if (item.userId == user.id) deleteMessage(item.docId)
                }}
                me={user.id == item.userId}
              />
            )}
          />
        </View>
      )}
      <View
        style={{
          marginHorizontal: SIZE.width * 1.7,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#F6F8FD",
          paddingLeft: SIZE.width * 1.2,
          borderRadius: 30,
          paddingRight: SIZE.width * 0.6,
          marginVertical: SIZE.height / 4,
        }}
      >
        <TextInput
          style={{ flex: 1 }}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message.."
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: "#583EFF",
            height: 35,
            width: 35,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name="send"
            color="white"
            size={23}
            style={{ marginLeft: -2, marginTop: 3 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IndividualChat;

const ChatMessage = ({ message, me, deleteMessage }) => {
  const messageItems = [
    <View
      key={`${message.id}1`}
      style={{
        width: SIZE.width * 2.25,
        height: SIZE.height * 1.1,
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: 30,
      }}
    >
      <Text style={{ textAlign: "center", color: COLORS.white }}>
        {message.username[0]}
      </Text>
    </View>,
    <TouchableOpacity
      key={`${message.id}2`}
      activeOpacity={0.8}
      onLongPress={() => {
        deleteMessage();
      }}
      style={{
        marginHorizontal: SIZE.width / 2,
        backgroundColor: message.deleted
          ? "red"
          : me
          ? "#F8F8F9"
          : "#EBF4FF",
        maxWidth: SIZE.screenWidth * 0.6,
        paddingHorizontal: SIZE.width * 0.6,
        paddingVertical: SIZE.height / 2.6,
        borderBottomLeftRadius: me ? 30 : 0,
        borderBottomEndRadius: me ? 0 : 30,
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
      }}
    >
      {message.deleted ? (
        <Text style={{ color: COLORS.black, fontSize: 15 }}>
          DELETED
        </Text>
      ) : (
        <Hyperlink
          linkStyle={{ color: "#2980b9", textDecorationLine: "underline" }}
          onPress={(url, text) => {
            Linking.openURL(url);
          }}
        >
          <Text style={{ color: COLORS.black, fontSize: 15 }}>
            {message.body}
          </Text>
        </Hyperlink>
      )}
    </TouchableOpacity>,
    <View key={`${message.id}3`}>
      {/* <Moment date={message.createdAt}><Text></Text></Moment> */}
      {/* <Text style={{fontSize:10}}>{message.createdAt.toDate().toLocaleTimeString()}</Text> */}
    </View>,
  ];

  return (
    <View
      style={{
        justifyContent: "center",
        padding: 5,
        alignItems: me ? "flex-end" : "flex-start",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        {me ? messageItems.reverse() : messageItems}
      </View>
    </View>
  );
};
