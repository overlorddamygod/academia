import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, KeyboardAwareScrollView } from "react-native-ui-lib";
import { CustomTextInput, InputContainer } from "../components/CustomInput";
import Header from "../components/Header";
import { SIZE } from "../styles/globalStyle";
import { showToast } from "../utils/error";

const SendNotification = ({ navigation, route: { params } }) => {
  const { id, username } = params;

  const { colors } = useTheme();

  const [notificationPayload, setNotificationPayload] = useState({
    title: "",
    body: "",
    to: id,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onAddButtonPress = async () => {
    if (!notificationPayload.title || !notificationPayload.body) {
      showToast("Please fill all the fields");
      return;
    }
    setButtonDisabled(true);
    const idToken = await auth().currentUser.getIdToken();

    fetch(
      "https://academiacollege.azurewebsites.net/api/sendindividualnotification?code=qxnyM10tLAadiG3Vsu7QW75q4FUUOY%2FJExkDdsX1WpupHpaIINl8kg%3D%3D",
      //   "http://192.168.100.4:7071/api/sendIndividualNotification",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: idToken,
        },
        body: JSON.stringify(notificationPayload),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setButtonDisabled(false);
        // console.log(res);
        if (!res.error) {
          showToast("Succesfully sent notification");
          // navigation.goBack();
        } else {
          showToast("Error sending notification");
        }
      })
      .catch((err) => {
        setButtonDisabled(false);
        showToast("Error sending notification");

        // console.log(err);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.mainblue,
      }}
    >
      <Header
        title="Send Notification"
        navigation={navigation}
        showSidebar={false}
      />
      <View
        style={{
          backgroundColor: colors.background,
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopEndRadius: 40,
          paddingTop: SIZE.height,
          paddingHorizontal: SIZE.width * 1.5,
          marginTop: SIZE.height / 5,
        }}
      >
        <KeyboardAwareScrollView>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginVertical: SIZE.height * 0.3,
              color: colors.text,
            }}
          >
            To : {username}
          </Text>
          <InputContainer label="Title">
            <CustomTextInput
              placeholder="Title"
              value={notificationPayload.title}
              onChangeText={(text) => {
                setNotificationPayload({
                  ...notificationPayload,
                  title: text,
                });
              }}
            />
          </InputContainer>

          <InputContainer label="Body">
            <CustomTextInput
              placeholder="Body"
              value={notificationPayload.body}
              onChangeText={(text) => {
                setNotificationPayload({
                  ...notificationPayload,
                  body: text,
                });
              }}
            />
          </InputContainer>

          <Button
            label="Send"
            backgroundColor="#FB616A"
            style={{
              marginVertical: SIZE.height * 0.45,
            }}
            onPress={onAddButtonPress}
            disabled={buttonDisabled}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default SendNotification;

const faculty = ["Bsc CSIT", "BCA", "BBM", "BBS"];
