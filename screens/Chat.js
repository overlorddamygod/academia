import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../providers/user";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";
import database from "@react-native-firebase/database"

const Chat = ({ navigation }) => {
  const { user } = useUserContext();
  const [conversations, setConversations] = useState([]);

  const collectionRef = firestore().collection("conversation").where("participants","array-contains", user.id);
  
  // const conversationRef = database().ref(`/conversations`).where("participants","")

  useEffect(() => {
    const unsubscribe = collectionRef
      .onSnapshot(
        { includeMetadataChanges: true },
        (querySnapshot) => {
          setConversations(
            querySnapshot.docs.map((d) => ({ docId: d.id, ...d.data() }))
          );
          console.log(conversations)
        },
        (error) => console.error(error)
      );

    return unsubscribe;
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Header
        showBackMenu={false}
        title="Message People"
        navigation={navigation}
      />

      <FlatList
        contentContainerStyle={{flex:1}}
        data={conversations}
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: "#EBF4FF",
              marginHorizontal: SIZE.width,
              marginVertical: SIZE.height * 0.3,
              paddingHorizontal: SIZE.width * 0.8,
              paddingVertical: SIZE.height * 0.2,
              borderRadius:10
            }}
            onPress={()=> {
              navigation.navigate("IndividualChat",{
                id: item.docId,
                name: getChatName(item,user.id),
                conversation: item
              })
            }}
          >
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: COLORS.black
            }}>{getChatName(item,user.id)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Chat;

const getChatName = (convo, userId) => {
  return convo.group ? convo.name : convo.p[convo.participants.filter(id=> id != userId)[0]]
}
