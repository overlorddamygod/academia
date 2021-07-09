import { Feather } from "@expo/vector-icons";
import database from "@react-native-firebase/database";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import Header from "../components/Header";
import { useUserContext } from "../providers/user";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";

const IndividualChat = ({ navigation, route: { params } }) => {
  const { id, name, conversation } = params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const flatlistRef = useRef();
  const [status, setStatus] = useState(false);
  const [online, setOnline] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(false);
  const { colors } = useTheme();
  const conversationRef = database().ref(`/conversations/${id}`);

  useEffect(() => {
    setLoading(false);
    setMessages([]);

    const onAdd = (value) => {
      value = value.val();
      // console.log(value)
      setMessages((oldMessage) => [...oldMessage, value]);
      // if ( messages.length <=5 )
      conversationRef.child(`status/${user.id}`).update({
        seen: value.createdAt,
      });
    };

    const onTyping = (value) => {
      // console.log("HERE",value.val())
      setStatus(value.val());
    };
    conversationRef.child("messages").limitToLast(5).on("child_added", onAdd);
    const partnerId = conversation.participants.filter(
      (id) => id != user.id
    )[0];
    // console.log(`typing/${conversation.participants.filter(a=>id != user.id)[0]}`)
    conversationRef.child(`status/${partnerId}`).on("value", onTyping);

    const onOnlineStatus = (value) => {
      setOnline(value.val());
    };
    database().ref(`status/${partnerId}`).on("value", onOnlineStatus);

    return () => {
      conversationRef
        .child("messages")
        .limitToLast(5)
        .off("child_added", onAdd);
      conversationRef.child(`status/${partnerId}`).off("value", onTyping);
      database().ref(`status/${partnerId}`).off("value", onOnlineStatus);
      clearTimeout(typingTimeout);
    };
  }, [id]);

  const sendMessage = () => {
    if (!message) return;
    conversationRef.child("messages").push({
      userId: user.id,
      username: user.username,
      body: message,
      createdAt: Date.now(),
    });
    conversationRef.child(`status/${user.id}`).update({
      typing: false,
    });
    setMessage("");
  };

  const startTyping = () => {
    if (!!typingTimeout) return;
    // setT(true)
    // setTypingTimeout(1)
    conversationRef.child(`status/${user.id}`).update({
      typing: true,
    });
    setTypingTimeout(
      setTimeout(() => {
        conversationRef.child(`status/${user.id}`).update({
          typing: false,
        });
        clearTimeout(typingTimeout);
        setTypingTimeout(0);
      }, 1500)
    );
  };

  const deleteMessage = (id) => {
    // collectionRef.doc(id).update({
    //   deleted: true,
    // });
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Header
        title={name + `${online ? " Online" : ""}`}
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
          <Text style={{ fontSize: 20, color: colors.text }}>
            Start A Conversation
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            ref={flatlistRef}
            contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
            keyExtractor={(item) => `${item.createdAt}`}
            renderItem={({ item }) => (
              <ChatMessage
                message={item}
                deleteMessage={() => {
                  if (item.userId == user.id) deleteMessage(item.docId);
                }}
                seen={status ? status.seen : false}
                me={user.id == item.userId}
              />
            )}
          />
        </View>
      )}
      {status && status.typing && (
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: SIZE.width * 2,
              height: SIZE.width * 2,
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: 30,
            }}
          >
            <Text style={{ textAlign: "center", color: COLORS.white }}>
              {name[0]}
            </Text>
          </View>
          <Text style={{ color: colors.text }}> {name + " "}is typing...</Text>
        </View>
      )}
      <View
        style={{
          marginHorizontal: SIZE.width * 1.7,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: colors.card,
          paddingLeft: SIZE.width * 1.2,
          borderRadius: 30,
          paddingRight: SIZE.width * 0.6,
          marginVertical: SIZE.height / 4,
        }}
      >
        <TextInput
          style={{ flex: 1, color: colors.text }}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message.."
          placeholderTextColor={colors.text}
          onChange={() => {
            startTyping();
          }}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: colors.btn,
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

const ChatMessage = ({ message, me, deleteMessage, seen }) => {
  const { colors } = useTheme();
  const messageItems = [
    <View
      key={`${message.id}1`}
      style={{
        width: SIZE.width * 2.25,
        height: SIZE.height * 1.1,
        justifyContent: "center",
        backgroundColor: colors.msgIcon,
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
        backgroundColor: message.deleted ? "red" : me ? "#F8F8F9" : "#EBF4FF",
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
        <Text style={{ color: COLORS.black, fontSize: 15 }}>DELETED</Text>
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
      <Text style={{ fontSize: 10, color: colors.text }}>
        {new Date(message.createdAt).toLocaleTimeString()}
      </Text>
      {me && message.createdAt == seen && (
        <Text style={{ fontSize: 12, color: colors.text }}>Seen</Text>
      )}
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
