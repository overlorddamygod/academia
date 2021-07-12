import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View ,PanResponder} from "react-native";
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
        console.log(conversations);
      },
      (error) => console.error(error)
    );

    return unsubscribe;
  }, []);
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  ).current;
  return (
    
    <View  style={{ backgroundColor: colors.background, flex: 1 }} >
     
      <Header
        showBackMenu={false}
        title="Message People"
        navigation={navigation}
      />

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          <>   <View {...panResponder.panHandlers} ></View>
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
                name: getChatName(item, user.id),
                conversation: item,
              });
            }}
          >   
        
            <View>
              <Image
                source={{
                  uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
                }}
                style={globalStyles.smallavatar}
              />
            </View>
            <View style={{ marginLeft: SIZE.width }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.text,
                }}
              >
                {getChatName(item, user.id)}
              </Text>
            </View>
          </TouchableOpacity></>
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
