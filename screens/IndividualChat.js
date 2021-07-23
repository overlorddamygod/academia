import { Feather } from "@expo/vector-icons";
import database from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
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
import { globalStyles, SIZE } from "../styles/globalStyle";

const IndividualChat = ({ navigation, route: { params } }) => {
  const { id, name, photoUrl, conversation } = params;
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
    const partnerId = conversation.participants.filter(
      (id) => id != user.id
    )[0];

    const onAdd = (value) => {
      value = value.val();
      // console.log(value)
      setMessages((oldMessage) => [...oldMessage, value]);
      // if ( messages.length <=5 )
      if (value.userId == partnerId) {
        conversationRef.child(`status/${user.id}`).update({
          seen: value.createdAt,
        });
      }
    };

    const onTyping = (value) => {
      // console.log("HERE",value.val())
      setStatus(value.val());
    };
    conversationRef.child("messages").limitToLast(5).on("child_added", onAdd);

    // console.log(`typing/${conversation.participants.filter(a=>id != user.id)[0]}`)
    conversationRef.child(`status/${partnerId}`).on("value", onTyping);

    const onOnlineStatus = (value) => {
      setOnline(value.val());
    };
    database().ref(`status/${partnerId}`).on("value", onOnlineStatus);

    // const unsubscribe = firestore()
    //   .collection("conversation")
    //   .doc(id)
    //   .collection("meesages")
    //   .orderBy("createdAt")
    //   .limitToLast(10)
    //   .onSnapshot((querySnapshot) => {
    //     setMessages(
    //       querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    //     );
    //     console.log("SIZE", querySnapshot.size);
    //     const partnerMessages = messages.filter(
    //       (message) => message.userId == partnerId
    //     );
    //     if (partnerMessages.length > 0) {
    //       console.log(user.username, partnerMessages);
    //       conversationRef.child(`status/${user.id}`).update({
    //         seen: partnerMessages[partnerMessages.length - 1].createdAt,
    //       });
    //     }
    //   });

    return () => {
      // unsubscribe();
      conversationRef
        .child("messages")
        .limitToLast(5)
        .off("child_added", onAdd);
      conversationRef.child(`status/${partnerId}`).off("value", onTyping);
      database().ref(`status/${partnerId}`).off("value", onOnlineStatus);
      clearTimeout(typingTimeout);
    };
  }, [id]);

  const sendMessage = async () => {
    if (!message) return;
    // firestore().collection("conversation").doc(id).collection("meesages").add({
    //   userId: user.id,
    //   username: user.username,
    //   body: message,
    //   createdAt: Date.now(),
    // });
    try {
      const createdAt = Date.now();
      const addMessage = await conversationRef.child("messages").push({
        userId: user.id,
        username: user.username,
        body: message,
        createdAt,
      });
      firestore().collection("conversation").doc(id).update({
        lastMessage: message,
        lastMessageAt: createdAt,
      });
      conversationRef.child(`status/${user.id}`).update({
        typing: false,
      });
      setMessage("");
    } catch (err) {
      // console.error(err);
    }
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
        title={name}
        showStatus={true}
        online={online}
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
                photoUrl={user.id == item.userId ? user.photoUrl : photoUrl}
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
              justifyContent: "center",
              borderRadius: 30,
            }}
          >
            <Image
              source={{
                uri:
                  photoUrl ||
                  "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
              }}
              style={{
                ...globalStyles.smallavatar,
                ...{
                  height: 40,
                  width: 40,
                },
              }}
            />
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

const ChatMessage = ({ message, me, deleteMessage, seen, photoUrl }) => {
  const { colors, dark } = useTheme();
  const messageItems = [
    <View
      key={`${message.id}1`}
      style={{
        justifyContent: "center",
        borderRadius: 30,
      }}
    >
      <Image
        source={{
          uri:
            photoUrl ||
            "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
        }}
        style={{
          ...globalStyles.smallavatar,
          ...{
            height: 40,
            width: 40,
          },
        }}
      />
    </View>,
    <TouchableOpacity
      key={`${message.id}2`}
      activeOpacity={0.8}
      onLongPress={() => {
        deleteMessage();
      }}
      style={{
        marginHorizontal: SIZE.width / 2,
        backgroundColor: dark ? colors.mainblue : me ? "#F8F8F9" : "#EBF4FF",
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
          <Text style={{ color: colors.text, fontSize: 15 }}>
            {message.body}
          </Text>
        </Hyperlink>
      )}
    </TouchableOpacity>,
    <View key={`${message.id}3`}>
      {/* <Moment date={message.createdAt}><Text></Text></Moment> */}
      <Text style={{ fontSize: 10, color: colors.text }}>
        {moment(new Date(message.createdAt)).fromNow()}
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
