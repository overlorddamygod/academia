import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Switch, Text, TextInput, View, Picker } from "react-native";
import {
  Button,
  DateTimePicker,
  KeyboardAwareScrollView,
} from "react-native-ui-lib";
import Header from "../components/Header";
import { SIZE } from "../styles/globalStyle";
import { showToast } from "../utils/error";
import { InputContainer, CustomTextInput } from "../components/CustomInput";

const AddAnnouncement = ({ navigation }) => {
  const todaysDate = new Date();
  const { colors } = useTheme();

  const [announcementData, setAnnouncementData] = useState({
    title: "",
    body: "",
    startingDate: todaysDate,
    endingDate: todaysDate,
    tag: "Exams",
    addToCalendar: false,
    sendNotification: false,
    to: "All",
    toSemester: "All",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onAddButtonPress = async () => {
    if (!announcementData.title) {
      showToast("Title is required");
      return;
    }
    setButtonDisabled(true);
    const idToken = await auth().currentUser.getIdToken();

    fetch(
      "https://academiacollege.azurewebsites.net/api/addevent?code=%2F6irg0JmuJqjGbXxEZvRUv7pwDOkqpM6hxCLsHS9AS6VXvOhJFcrwA%3D%3D",
      // "http://192.168.100.4:7071/api/addEvent",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: idToken,
        },
        body: JSON.stringify(announcementData),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setButtonDisabled(false);
        if (!res.error) {
          showToast("Succesfully added an announcement");
          // navigation.goBack();
        } else {
          showToast("Error adding an announcement");
        }
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
      <Header title="New Notice" navigation={navigation} showSidebar={false} />
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
                      endingDate: date,
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

          <View
            style={{
              flexDirection: "row",
              marginTop: -SIZE.height * 0.5,
            }}
          >
            <View style={{ flex: 1 }}>
              <InputContainer
                label="Tag"
                style={{
                  paddingRight: SIZE.width / 5,
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    justifyContent: "center",
                  }}
                >
                  <Picker
                    selectedValue={announcementData.tag}
                    onValueChange={(itemValue, itemIndex) => {
                      setAnnouncementData({
                        ...announcementData,
                        tag: itemValue,
                      });
                    }}
                  >
                    <Picker.Item label="Notice" value="Notice" />
                    <Picker.Item label="Classes" value="Classes" />
                    <Picker.Item label="Exams" value="Exams" />
                    <Picker.Item label="Result" value="Result" />
                    <Picker.Item label="Holiday" value="Holiday" />
                    <Picker.Item label="Project" value="Project" />
                  </Picker>
                </View>
              </InputContainer>
            </View>
            <View style={{ flex: 1 }}>
              <InputContainer
                label="To"
                style={{
                  paddingRight: SIZE.width / 5,
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    justifyContent: "center",
                  }}
                >
                  <Picker
                    selectedValue={announcementData.to}
                    onValueChange={(itemValue, itemIndex) => {
                      setAnnouncementData({
                        ...announcementData,
                        to: itemValue,
                      });
                    }}
                  >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="Students" value="Student" />
                    <Picker.Item label="Teachers" value="Teacher" />
                    {faculty.map((_faculty) => (
                      <Picker.Item
                        label={_faculty}
                        value={_faculty}
                        key={faculty}
                      />
                    ))}
                  </Picker>
                </View>
              </InputContainer>
            </View>
          </View>

          {faculty.includes(announcementData.to) && (
            <InputContainer label="Semester">
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.border,
                  justifyContent: "center",
                }}
              >
                <Picker
                  selectedValue={announcementData.toSemester}
                  onValueChange={(itemValue, itemIndex) => {
                    setAnnouncementData({
                      ...announcementData,
                      toSemester: itemValue,
                    });
                  }}
                >
                  <Picker.Item label="All" value="All" />
                  {Array.from({ length: 8 }, (i, index) => `${index + 1}`).map(
                    (semester) => (
                      <Picker.Item
                        label={semester}
                        value={semester}
                        key={semester}
                      />
                    )
                  )}
                </Picker>
              </View>
            </InputContainer>
          )}

          <InputContainer
            label="Add to Calendar"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: SIZE.height * 0.6,
            }}
          >
            <Switch
              trackColor={{ false: "#767577", true: "#b89ce6" }}
              thumbColor={true ? "#a077d4" : "#f4f3f4"}
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
              trackColor={{ false: "#767577", true: "#b89ce6" }}
              thumbColor={true ? "#a077d4" : "#f4f3f4"}
              value={announcementData.sendNotification}
              onValueChange={(val) =>
                setAnnouncementData({
                  ...announcementData,
                  sendNotification: !announcementData.sendNotification,
                })
              }
            />
          </InputContainer>

          <Button
            label="Add"
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

export default AddAnnouncement;

const faculty = ["Bsc CSIT", "BCA", "BBM", "BBS"];
