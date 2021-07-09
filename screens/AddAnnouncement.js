import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Switch, Text, TextInput, View, Picker } from "react-native";
import {
  Button,
  ChipsInput,
  DateTimePicker,
  KeyboardAwareScrollView,
} from "react-native-ui-lib";
import Header from "../components/Header";
import { SIZE } from "../styles/globalStyle";
import { showToast } from "../utils/error";

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

  useEffect(() => {
    console.log(announcementData);
  }, [announcementData]);

  const onAddButtonPress = async () => {
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
                    borderColor: "lightgrey",
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
                    borderColor: "lightgrey",
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
                  borderColor: "lightgrey",
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

const Label = ({ text }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 16,
        color: colors.text,
        marginBottom: SIZE.height / 20,
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

const InputContainer = ({ label, style = {}, children }) => {
  return (
    <View
      style={{
        marginVertical: SIZE.height / 15,
        ...style,
      }}
    >
      <Label text={label} />
      {children}
    </View>
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

const faculty = ["Bsc CSIT", "BCA", "BBM", "BBS"];
