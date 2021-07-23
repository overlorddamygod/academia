import database from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserContext } from "../providers/user";
import { globalStyles } from "../styles/globalStyle";
import { showToast } from "../utils/error";

const PeopleCard = ({ data, navigation }) => {
  const { user } = useUserContext();
  const { colors } = useTheme();
  const [startingChat, setStartingChat] = useState(false);

  const startChat = () => {
    setStartingChat(true);
    firestore()
      .collection("conversation")
      .where("chatId", "in", [`${user.id}${data.id}`, `${data.id}${user.id}`])
      .get()
      .then((a) => {
        if (a.size > 0) {
          const convoDoc = a.docs[0];
          const convoData = convoDoc.data();
          convoData.id = convoDoc.id;
          setStartingChat(false);
          navigation.navigate("IndividualChat", {
            id: convoData.id,
            name: getChatName(convoData, user.id).username,
            photoUrl: getChatName(convoData, user.id).photoUrl,
            conversation: convoData,
          });
        } else {
          createNewConversation();
        }
      })
      .catch((err) => {
        showToast("An error occured");
        setStartingChat(false);
      });
  };

  const createNewConversation = () => {
    const newConvo = {
      chatId: `${user.id}${data.id}`,
      p: {},
      participants: [`${user.id}`, `${data.id}`],
    };
    newConvo.p[`${user.id}`] = {
      username: user.username,
      photoUrl:
        user.photoUrl ||
        "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
    };
    newConvo.p[`${data.id}`] = {
      username: data.username,
      photoUrl:
        data.photoUrl ||
        "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
    };
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
            name: getChatName(convoData, user.id).username,
            photoUrl: getChatName(convoData, user.id.photoUrl),
            conversation: convoData,
          });
          setStartingChat(false);
        });
      })
      .catch((err) => {
        showToast("An error occured");
        setStartingChat(false);
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
            uri:
              data.photoUrl ||
              "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
          }}
          style={styles.avatar}
        />
      </View>
      <View style={{ marginLeft: 20, flex: 1 }}>
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
        <Text
          style={{ ...globalStyles.midText, color: colors.secondText }}
          numberOfLines={2}
        >
          {data.email}
        </Text>
        {data.title == "Student" && (
          <Text style={{ ...globalStyles.midText, color: colors.secondText }}>
            Semester : {data.semester}
          </Text>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.msgBtn}
          onPress={startChat}
        >
          {startingChat ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white" }}>Message</Text>
          )}
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
