import { AntDesign } from "@expo/vector-icons";
import database from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { showToast } from "../utils/error";

const PersonDetail = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { user } = useUserContext();
  const [startingChat, setStartingChat] = useState(false);

  const { data } = route.params;
  console.log(data);
  useEffect(() => {}, []);

  const startChat = () => {
    setStartingChat(true);
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
            photoUrl: getChatName(convoData, user.id).photoUrl,
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

  const sendPersonalNotification = () => {
    navigation.navigate("SendNotification", {
      id: data.id,
      username: data.username,
    });
  };

  return (
    <>
      <Header
        title={`${data.username}'s  Profile`}
        showSidebar={false}
        navigation={navigation}
      />

      <View style={styles.top}>
        <ImageBackground
          source={{ uri: "https://academiacollege.edu.np/img/landing.jpg" }}
          style={styles.cover}
        >
          <Image
            source={{
              uri:
                data.photoUrl ||
                "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
            }}
            style={styles.image}
          />
        </ImageBackground>
      </View>
      <View style={styles.bg}>
        <View style={{ marginTop: SIZE.height }}>
          <Text style={{ ...styles.name, color: colors.text }}>
            {data.username}
          </Text>
          {data.title === "Student" && (
            <>
              <Text
                style={{
                  textAlign: "center",
                  lineHeight: 20,
                  fontWeight: "bold",
                  fontSize: 16,
                  color: colors.text,
                }}
              >
                {data.faculty}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 16,
                  color: colors.text,
                }}
              >
                Semester : {data.semester}
              </Text>
            </>
          )}

          <Text
            style={{
              textAlign: "center",
              lineHeight: 20,
              fontWeight: "bold",
              fontSize: 19,
              color: "grey",
            }}
          >
            " {data.bio} "
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View animation="fadeInUp">
            <View
              style={{
                marginTop: SIZE.width * 0.6,
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ ...styles.msgbtn }}
                onPress={startChat}
              >
                {startingChat ? (
                  <ActivityIndicator color="#7f8ee3" />
                ) : (
                  <Text
                    style={{
                      color: "#7f8ee3",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Message
                  </Text>
                )}
              </TouchableOpacity>
              {user.admin && (
                <TouchableOpacity
                  style={{ ...styles.msgbtn, backgroundColor: "#7f8ee3" }}
                  onPress={sendPersonalNotification}
                >
                  <AntDesign name="notification" size={22} color="white" />
                </TouchableOpacity>
              )}
            </View>

            {data.title === "Student" && (
              <View style={{ padding: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Materials", { screen: "Materials" });
                  }}
                  activeOpacity={0.6}
                  style={{ ...styles.msgbtn, borderColor: "#999" }}
                >
                  <Text style={{ color: colors.text, fontSize: 16 }}>
                    SEE {data.faculty} COURSE
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                activeOpacity={0.8}
                style={{ ...styles.msgbtn, backgroundColor: "#757BBD" }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  See 3rd Semester Course
                </Text>
              </TouchableOpacity> */}
              </View>
            )}
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
    padding: SIZE.height,
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
    height: SIZE.screenHeight * 0.15,
    width: SIZE.screenHeight * 0.15,
    borderRadius: SIZE.width,
    resizeMode: "cover",
    position: "absolute",
    top: SIZE.screenHeight * 0.2,
    left: SIZE.screenWidth * 0.34,
    zIndex: 2,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  name: {
    fontSize: 27,
    color: "#222",
    fontWeight: "bold",
    textAlign: "center",
  },
  cover: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  msgbtn: {
    borderColor: "#6074e6",
    borderWidth: 1.4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZE.width * 1.3,
    marginHorizontal: 3,
    height: 40,
    padding: SIZE.width * 1.2,
    marginTop: 5,
  },
});

const getChatName = (convo, userId) => {
  return convo.group
    ? convo.name
    : convo.p[convo.participants.filter((id) => id != userId)[0]];
};
