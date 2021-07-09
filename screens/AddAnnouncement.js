import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import COLORS from "../styles/colors";
import { globalStyles, SIZE } from "../styles/globalStyle";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { DateTimePicker, ChipsInput, Button,KeyboardAwareScrollView } from "react-native-ui-lib";
import Header from "../components/Header";
import { useTheme } from "@react-navigation/native";
import { showToast } from "../utils/error";

const AddAnnouncement = ({ navigation }) => {
  const todaysDate = new Date();
  const { colors } = useTheme();

  const [announcementData, setAnnouncementData] = useState({
    title:"",
    body: "",
    startingDate: todaysDate,
    endingDate: todaysDate,
    tag: "Exams",
    addToCalendar: false,
    sendNotification: false,
    to: ["All", "Student"],
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    console.log(announcementData);
  }, [announcementData]);

  const onAddButtonPress = async () => {
    setButtonDisabled(true);
    const idToken = await auth().currentUser.getIdToken();

    fetch("https://academiacollege.azurewebsites.net/api/addevent?code=%2F6irg0JmuJqjGbXxEZvRUv7pwDOkqpM6hxCLsHS9AS6VXvOhJFcrwA%3D%3D", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: idToken,
      },
      body: JSON.stringify(announcementData),
    })
      .then((res) => res.json())
      .then((res) => {
        setButtonDisabled(false);
        if (!res.error) {
          showToast("Succesfully added an announcement");
          navigation.goBack();
        } else {
          showToast("Error adding an announcement");
        }
        console.log(res);
      })
      .catch((err) => {
        setButtonDisabled(false);
        showToast("Error adding an announcement");

        console.log(err);
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
        title="Add Announcement"
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
        {/* <ScrollView>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
            keyboardVerticalOffset={-100}
            behavior={"height"}
          > */}
          <KeyboardAwareScrollView>
            <InputContainer label="Title">
              <CustomTextInput
                placeholder="Title"
                value={announcementData.title}
                onChangeText={(text) => {
                  setAnnouncementData({
                    ...announcementData,
                    title: text,
                  });
                }}
              />
            </InputContainer>

            <InputContainer label="Body">
              <CustomTextInput
                placeholder="Body"
                value={announcementData.body}
                onChangeText={(text) => {
                  setAnnouncementData({
                    ...announcementData,
                    body: text,
                  });
                }}
              />
            </InputContainer>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1 }}>
                <InputContainer label="Starting Date">
                  <DateTimePicker
                    containerStyle={{ paddingHorizontal: 5 }}
                    style={{
                      color: colors.text,
                    }}
                    value={announcementData.startingDate}
                    dateFormat={"YYYY MMM D "}
                    onChange={(date) => {
                      setAnnouncementData({
                        ...announcementData,
                        startingDate: date,
                      });
                    }}
                  />
                </InputContainer>
              </View>
              <View style={{ flex: 1 }}>
                <InputContainer label="Ending Date">
                  <DateTimePicker
                    containerStyle={{ paddingHorizontal: 5 }}
                    style={{
                      color: colors.text,
                    }}
                    value={announcementData.endingDate}
                    dateFormat={"YYYY MMM D "}
                    onChange={(date) => {
                      setAnnouncementData({
                        ...announcementData,
                        endingDate: date,
                      });
                    }}
                  />
                </InputContainer>
              </View>
            </View>

            <InputContainer
              label="Tags"
              style={{
                marginTop: -SIZE.height * 0.5,
              }}
            >
              <CustomTextInput
                placeholder="eg. Classes, Exams, Holiday, etc"
                value={announcementData.tag}
                onChangeText={(tag) => {
                  setAnnouncementData({
                    ...announcementData,
                    tag: tag,
                  });
                }}
              />
            </InputContainer>

            <InputContainer
              label="Add to Calendar"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Switch
                value={announcementData.addToCalendar}
                onValueChange={(val) =>
                  setAnnouncementData({
                    ...announcementData,
                    addToCalendar: !announcementData.addToCalendar,
                  })
                }
              />
            </InputContainer>

            <InputContainer
              label="Send Notification"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Switch
                value={announcementData.sendNotification}
                onValueChange={(val) =>
                  setAnnouncementData({
                    ...announcementData,
                    sendNotification: !announcementData.sendNotification,
                  })
                }
              />
            </InputContainer>

            <InputContainer label="To">
              <CustomChipsInput
                tags={announcementData.to}
                placeholder="eg. Teacher, CSIT etc"
                onChangeTags={(tags) => {
                  setAnnouncementData({
                    ...announcementData,
                    to: tags,
                  });
                }}
              />
            </InputContainer>

            <Button
              label="Add"
              backgroundColor="#FB616A"
              style={{
                marginVertical: SIZE.height * 0.5,
              }}
              onPress={onAddButtonPress}
              disabled={buttonDisabled}
            />
            </KeyboardAwareScrollView>
          {/* </KeyboardAvoidingView>
        </ScrollView> */}
      </View>
    </View>
  );
};

export default AddAnnouncement;

const tags = ["Exams", "Classes", "Holiday", "Result", "Project"];

const Label = ({ text }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 16,
        color: colors.text,
        marginBottom: 3,
      }}
    >
      {text}
    </Text>
  );
};

const CustomTextInput = ({ value, onChangeText, placeholder }) => {
  const { colors } = useTheme();

  return (
    <TextInput
      style={{
        marginVertical: SIZE.height / 8,
        borderWidth: 1,
        paddingHorizontal: SIZE.width * 0.5,
        borderRadius: 10,
        color: colors.text,
        borderColor: "lightgray",
        fontSize: SIZE.width * 0.9,
        height: SIZE.height * 1.25,
      }}
      placeholder={placeholder || ""}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      returnKeyType="next"
    />
  );
};

const CustomChipsInput = ({ tags, placeholder, onChangeTags }) => {
  return (
    <ChipsInput
      tags={tags}
      containerStyle={{
        marginVertical: SIZE.height / 8,
        borderWidth: 1,
        paddingHorizontal: SIZE.width * 0.5,
        borderRadius: 10,
        borderColor: "lightgrey",
        paddingVertical: SIZE.height * 0.15,
        // height: SIZE.height * 1.25,
        justifyContent: "center",
      }}
      placeholder={placeholder}
      onChangeTags={onChangeTags}
    />
  );
};

const InputContainer = ({ label, style = {}, children }) => {
  return (
    <View
      style={{
        marginVertical: 5,
        ...style,
      }}
    >
      <Label text={label} />
      {children}
    </View>
  );
};
