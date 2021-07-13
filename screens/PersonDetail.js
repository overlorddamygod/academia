import { AntDesign } from "@expo/vector-icons";
import database from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Header from "../components/Header";
import { useUserContext } from "../providers/user";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { Icons } from "./AboutCollege";

const PersonDetail = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { user } = useUserContext();
  const { data } = route.params;
  console.log(data);
  useEffect(() => {}, []);

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
    <>
      <Header title={`${data.username}'s  Profile`} navigation={navigation} />

      <View style={styles.top}>
        <ImageBackground
          source={{ uri: "https://academiacollege.edu.np/img/landing.jpg" }}
          style={styles.cover}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
            }}
            style={styles.image}
          />
        </ImageBackground>
      </View>
      <View style={styles.bg}>
        <View
          style={{
            position: "absolute",
            top: 10,
            left: SIZE.screenWidth * 0.4,
          }}
        >
          <Text style={{ ...styles.name, color: colors.text }}>
            {data.username}
          </Text>
        </View>
        <View style={{ marginTop: SIZE.height }}>
          <Text style={{ fontSize: 16, color: colors.text }}>
            Semester : {data.semester}
          </Text>
          <Text style={{ lineHeight: 20, fontSize: 16, color: colors.text }}>
            Email : {data.email}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View animation="fadeInUp">
            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity style={styles.msgbtn} onPress={startChat}>
                <Text style={{ color: colors.text, fontSize: 16 }}>
                  Message
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.msgbtn}>
                <AntDesign name="home" size={22} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.msgbtn}>
                <AntDesign name="user" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
              <TouchableOpacity activeOpacity={0.6} style={styles.msgbtn}>
                <Text style={{ color: colors.text, fontSize: 16 }}>
                  See 3rd Semester Syllabus
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ ...styles.msgbtn, backgroundColor: "#757BBD" }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  See 3rd Semester Course
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
          <Animatable.View animation="bounceIn" delay={200}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  ...globalStyles.boldText,
                  color: colors.text,
                  fontSize: 24,
                }}
              >
                Social Links
              </Text>
              <View
                style={{ height: 3, width: "65%", backgroundColor: "#845cb8" }}
              ></View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 40,
              }}
            >
              
              {!!data.facebook_link && (
                <Icons
                  icon="facebook"
                  color="#2a51bf"
                  link={data.facebook_link}
                />
              )}
              {!!data.linkedin_link && (
                <Icons
                  icon="linkedin"
                  color="#1c1a1b"
                  link={data.linkedin_link}
                />
              )}
              {!!data.github_link && (
                <Icons icon="github" color="#1c1a1b" link={data.github_link} />
              )}
            </View>
          </Animatable.View>
        </ScrollView>
      </View>
    </>
  );
};

export default PersonDetail;
const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 20,
  },
  top: {
    // backgroundColor: "#757BBD",
    borderBottomRightRadius: 20,
    height: 200,
    borderBottomLeftRadius: 20,
    position: "relative",
    zIndex: 2,
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: "cover",
    position: "absolute",
    top: 150,
    left: 20,
    zIndex: 2,
    borderWidth: 4,
    borderColor: "#00000078",
  },
  name: {
    fontSize: 22,
    color: "#222",
    fontWeight: "900",
  },
  cover: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  msgbtn: {
    borderColor: "#999",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: 3,
    height: 40,
    padding: 10,
    marginTop: 5,
  },
});

const getChatName = (convo, userId) => {
  return convo.group
    ? convo.name
    : convo.p[convo.participants.filter((id) => id != userId)[0]];
};
