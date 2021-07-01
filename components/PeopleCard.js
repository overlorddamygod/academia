import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import COLORS from "../styles/colors";
import { globalStyles } from "../styles/globalStyle";
import firestore from "@react-native-firebase/firestore";
import database from "@react-native-firebase/database";
import { useUserContext } from "../providers/user";
import { useTheme } from "@react-navigation/native";
const PeopleCard = ({ data, navigation }) => {
  const { user } = useUserContext();
  const {colors} = useTheme();
  const startChat = () => {
    console.log([`${user.id}${data.id}`, `${data.id}${user.id}`]);
    firestore()
      .collection("conversation")
      .where("chatId", "in", [`${user.id}${data.id}`, `${data.id}${user.id}`])
      .get()
      .then((a) => {
        if (a.size > 0) {
          const convoDoc = a.docs[0];
          const convoData = convoDoc.data();
          convoData.id = convoDoc.id;
          navigation.navigate("IndividualChat", {
            id: convoData.id,
            name: getChatName(convoData, user.id),
            conversation: convoData,
          });
        } else {
          createNewConversation();
        }
      });
  };

  const createNewConversation = () => {
    const newConvo = {
      chatId: `${user.id}${data.id}`,
      p: {},
      participants: [`${user.id}`, `${data.id}`],
    };
    newConvo.p[`${user.id}`] = user.username;
    newConvo.p[`${data.id}`] = data.username;
    firestore()
      .collection("conversation")
      .add(newConvo)
      .then((addedResult) => {
        addedResult.get().then((getResult) => {
          // const convoDoc = a.docs[0]
          const convoData = getResult.data();
          convoData.id = getResult.id;

          const tempConvo = {};
          tempConvo["1234"] = [];

          database().ref(`/conversations/${convoData.id}`).push({
            lol: 1,
          });

          navigation.navigate("IndividualChat", {
            id: convoData.id,
            name: getChatName(convoData, user.id),
            conversation: convoData,
          });
        });
      });
  };

  return (
    <View
      style={{
        marginHorizontal: 25,
        marginBottom: 10,
        backgroundColor: colors.card,
        borderRadius: 8,
        padding: 12,
        flexDirection: "row",
        ...globalStyles.shadow,
      }}
    >
      <View>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
          }}
          style={styles.avatar}
        />
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text
          style={{
            color: colors.text,
            fontWeight: "bold",
            fontSize: 20,
            marginVertical: 2,
          }}
        >
          {data.username}
        </Text>
        <Text style={{ ...globalStyles.midText, color: "#888" }}>
          {data.email}
        </Text>
        <Text style={{ ...globalStyles.midText, color: "#888" }}>
          Semester : {data.semester}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.msgBtn}
          onPress={startChat}
        >
          <Text style={{ color: "white" }}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PeopleCard;

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  msgBtn: {
    backgroundColor: "#6765c2",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 4,
    width: 90,
  },
});

const getChatName = (convo, userId) => {
  return convo.group
    ? convo.name
    : convo.p[convo.participants.filter((id) => id != userId)[0]];
};
